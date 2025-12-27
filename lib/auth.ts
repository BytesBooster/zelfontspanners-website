'use client'

import { useState, useEffect } from 'react'
import { getAllMembers } from './members'
import { 
  getUserAccount, 
  createUserAccount, 
  updateUserPassword, 
  checkUserMustChangePassword 
} from './supabase'

interface Account {
  password: string // Dit is nu een hash, niet het plaintext wachtwoord
  memberName: string
  createdAt: string
}

interface Session {
  memberName: string
  timestamp: string
  mustChangePassword?: boolean
}

// Hash een wachtwoord met Web Crypto API (SHA-256)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

// Verifieer een wachtwoord tegen een hash
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized) {
      setInitialized(true)
      // Check auth eerst (sneller)
      checkAuth()
      // Initialize accounts in de achtergrond (niet-blokkerend)
      initializeAccounts().catch(() => {
        // Negeer errors - accounts worden in localStorage opgeslagen als fallback
      })
    }
  }, [initialized])

  const checkAuth = () => {
    try {
      const session = JSON.parse(localStorage.getItem('currentSession') || 'null')
      if (!session) {
        setIsLoggedIn(false)
        setCurrentUser(null)
        return
      }
      const sessionTime = new Date(session.timestamp)
      const now = new Date()
      const hoursDiff = (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60)
      const valid = hoursDiff <= 24
      setIsLoggedIn(valid)
      setCurrentUser(valid ? session.memberName : null)
      
      if (!valid) {
        localStorage.removeItem('currentSession')
      }
    } catch {
      setIsLoggedIn(false)
      setCurrentUser(null)
    }
  }

  return { isLoggedIn, currentUser, checkAuth }
}

export function mustChangePassword(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const session = JSON.parse(localStorage.getItem('currentSession') || 'null')
    return session?.mustChangePassword === true
  } catch {
    return false
  }
}

// Flag om te voorkomen dat initializeAccounts meerdere keren tegelijk wordt aangeroepen
let initializingAccounts = false
let accountsInitialized = false

export async function initializeAccounts(): Promise<Record<string, Account>> {
  if (typeof window === 'undefined') return {}
  
  // Voorkom meerdere gelijktijdige initialisaties
  if (initializingAccounts) {
    // Wacht tot de huidige initialisatie klaar is
    while (initializingAccounts) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    return JSON.parse(localStorage.getItem('memberAccounts') || '{}')
  }
  
  // Als al geïnitialiseerd, return cached accounts
  if (accountsInitialized) {
    return JSON.parse(localStorage.getItem('memberAccounts') || '{}')
  }
  
  initializingAccounts = true
  
  try {
    const members = getAllMembers()
    const accounts = JSON.parse(localStorage.getItem('memberAccounts') || '{}')
    const defaultPassword = 'test123'
    const defaultPasswordHash = await hashPassword(defaultPassword)
    
    // Maak accounts aan in Supabase als ze nog niet bestaan (niet-blokkerend)
    // Doe dit in de achtergrond zonder te wachten op alle requests
    Promise.all(members.map(async (member) => {
      try {
        const supabaseAccount = await getUserAccount(member)
        
        if (!supabaseAccount) {
          // Maak account aan in Supabase met standaard wachtwoord
          // createUserAccount handelt duplicate key errors zelf af
          await createUserAccount(member, defaultPasswordHash)
        }
      } catch (error) {
        // Negeer errors - account bestaat mogelijk al of Supabase is niet beschikbaar
        // Dit blokkeert de initialisatie niet
      }
    })).catch(() => {
      // Negeer errors - accounts worden in localStorage opgeslagen als fallback
    })
    
    // Behoud backward compatibility met localStorage
    for (const member of members) {
      if (!accounts[member]) {
        accounts[member] = {
          password: defaultPasswordHash,
          memberName: member,
          createdAt: new Date().toISOString()
        }
      } else {
        // Als het wachtwoord nog niet gehasht is, hash het
        if (accounts[member].password.length < 64 || accounts[member].password === defaultPassword) {
          accounts[member].password = defaultPasswordHash
        }
      }
    }
    
    localStorage.setItem('memberAccounts', JSON.stringify(accounts))
    accountsInitialized = true
    return accounts
  } finally {
    initializingAccounts = false
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const session = JSON.parse(localStorage.getItem('currentSession') || 'null')
    if (!session) return false
    const sessionTime = new Date(session.timestamp)
    const now = new Date()
    const hoursDiff = (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60)
    
    if (hoursDiff > 24) {
      localStorage.removeItem('currentSession')
      return false
    }
    
    return true
  } catch {
    return false
  }
}

export function getCurrentUser(): string | null {
  if (!isAuthenticated()) return null
  try {
    const session = JSON.parse(localStorage.getItem('currentSession') || 'null')
    return session ? session.memberName : null
  } catch {
    return null
  }
}

export async function login(memberName: string, password: string): Promise<{ success: boolean; message?: string; memberName?: string; mustChangePassword?: boolean }> {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Niet beschikbaar op server' }
  }
  
  // Probeer eerst Supabase account
  const supabaseAccount = await getUserAccount(memberName)
  
  if (supabaseAccount) {
    // Verifieer wachtwoord tegen Supabase hash
    const isValid = await verifyPassword(password, supabaseAccount.password_hash)
    
    if (!isValid) {
      return { success: false, message: 'Onjuist wachtwoord' }
    }
    
    // Check of gebruiker wachtwoord moet wijzigen
    const mustChangePassword = supabaseAccount.must_change_password || false
    
    const session: Session = {
      memberName: memberName,
      timestamp: new Date().toISOString(),
      mustChangePassword
    }
    
    localStorage.setItem('currentSession', JSON.stringify(session))
    
    return { 
      success: true, 
      memberName: memberName,
      mustChangePassword 
    }
  }
  
  // Fallback naar localStorage voor backward compatibility
  const accounts = JSON.parse(localStorage.getItem('memberAccounts') || '{}')
  
  if (!accounts[memberName]) {
    return { success: false, message: 'Gebruiker niet gevonden' }
  }
  
  // Verifieer het wachtwoord tegen de hash
  const isValid = await verifyPassword(password, accounts[memberName].password)
  
  if (!isValid) {
    return { success: false, message: 'Onjuist wachtwoord' }
  }
  
  const session: Session = {
    memberName: memberName,
    timestamp: new Date().toISOString(),
    mustChangePassword: false
  }
  
  localStorage.setItem('currentSession', JSON.stringify(session))
  
  return { success: true, memberName: memberName, mustChangePassword: false }
}

export async function changePassword(memberName: string, newPassword: string): Promise<{ success: boolean; message?: string }> {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Niet beschikbaar op server' }
  }
  
  const newPasswordHash = await hashPassword(newPassword)
  
  // Update in Supabase
  const success = await updateUserPassword(memberName, newPasswordHash)
  
  if (success) {
    // Update ook localStorage voor backward compatibility
    const accounts = JSON.parse(localStorage.getItem('memberAccounts') || '{}')
    if (accounts[memberName]) {
      accounts[memberName].password = newPasswordHash
      localStorage.setItem('memberAccounts', JSON.stringify(accounts))
    }
    
    // Update session om mustChangePassword te verwijderen
    const session = JSON.parse(localStorage.getItem('currentSession') || 'null')
    if (session && session.memberName === memberName) {
      session.mustChangePassword = false
      localStorage.setItem('currentSession', JSON.stringify(session))
    }
    
    return { success: true }
  }
  
  return { success: false, message: 'Fout bij wijzigen van wachtwoord' }
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentSession')
    window.location.href = '/login'
  }
}

export function canAccessPortfolio(portfolioMemberName: string): boolean {
  const currentUser = getCurrentUser()
  if (!currentUser) return false
  return currentUser === portfolioMemberName
}
