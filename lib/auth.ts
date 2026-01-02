'use client'

import { useState, useEffect } from 'react'
import { getAllMembers } from './members'

// Export getAllMembers for admin use
export { getAllMembers }

interface Account {
  password: string
  memberName: string
  createdAt: string
  updatedAt?: string
}

interface Session {
  memberName: string
  timestamp: string
  pendingPasswordChange?: boolean // Flag to indicate session is temporary until password is changed
}

// Session storage key (still using localStorage for session token, but account data from DB)
const SESSION_KEY = 'currentSession'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeAccounts()
      checkAuth()
    }
  }, [])

  const checkAuth = async () => {
    try {
      const sessionStr = localStorage.getItem(SESSION_KEY)
      if (!sessionStr) {
        setIsLoggedIn(false)
        setCurrentUser(null)
        return
      }

      const session: Session = JSON.parse(sessionStr)
      
      // If session has pendingPasswordChange flag, remove it (user must change password)
      if (session.pendingPasswordChange) {
        localStorage.removeItem(SESSION_KEY)
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
        localStorage.removeItem(SESSION_KEY)
      }
    } catch {
      setIsLoggedIn(false)
      setCurrentUser(null)
    }
  }

  return { isLoggedIn, currentUser, checkAuth }
}

// Initialize accounts in database (create if they don't exist)
export async function initializeAccounts(): Promise<void> {
  if (typeof window === 'undefined') return
  
  try {
    const members = getAllMembers()
    
    // Create accounts that don't exist yet
    for (const member of members) {
      try {
        const response = await fetch(`/api/accounts?memberName=${encodeURIComponent(member)}`)
        const data = await response.json()
        
        if (!data.account) {
          // Account doesn't exist, create it with default password
          const createResponse = await fetch('/api/accounts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              memberName: member,
              password: 'Welkom2026!',
              createdAt: new Date().toISOString()
            })
          })
          
          if (!createResponse.ok) {
            console.error(`Failed to create account for ${member}:`, await createResponse.text())
          }
        }
      } catch (error) {
        console.error(`Error checking/creating account for ${member}:`, error)
      }
    }
  } catch (error) {
    console.error('Error initializing accounts:', error)
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const sessionStr = localStorage.getItem(SESSION_KEY)
    if (!sessionStr) return false
    
    const session = JSON.parse(sessionStr)
    const sessionTime = new Date(session.timestamp)
    const now = new Date()
    const hoursDiff = (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60)
    
    if (hoursDiff > 24) {
      localStorage.removeItem(SESSION_KEY)
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
    const sessionStr = localStorage.getItem(SESSION_KEY)
    const session = sessionStr ? JSON.parse(sessionStr) : null
    return session ? session.memberName : null
  } catch {
    return null
  }
}

export async function requiresPasswordChange(memberName: string): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  try {
    const response = await fetch(`/api/accounts?memberName=${encodeURIComponent(memberName)}`)
    const data = await response.json()
    
    if (!data.account) return false
    
    // Check password_reset_required flag first (most reliable)
    if (data.account.password_reset_required === true) {
      return true
    }
    
    // Fallback: check for default passwords
    const defaultPasswords = ['test123', 'welkom2026!', 'Welkom2026!']
    return defaultPasswords.includes(data.account.password)
  } catch {
    return false
  }
}

export async function login(memberName: string, password: string): Promise<{ success: boolean; message?: string; memberName?: string; requiresPasswordChange?: boolean }> {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Niet beschikbaar op server' }
  }
  
  try {
    const response = await fetch('/api/accounts/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberName, password })
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      return { success: false, message: data.message || 'Login mislukt' }
    }

    // Store session locally (session data is in database, but we keep token locally)
    // Mark session as pending password change if required
    const session: Session = {
      memberName: data.memberName,
      timestamp: new Date().toISOString(),
      pendingPasswordChange: data.requiresPasswordChange || false
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))

    return { 
      success: true, 
      memberName: data.memberName, 
      requiresPasswordChange: data.requiresPasswordChange || false 
    }
  } catch (error: any) {
    return { success: false, message: error.message || 'Er is een fout opgetreden' }
  }
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY)
    window.location.href = '/login'
  }
}

export function canAccessPortfolio(portfolioMemberName: string): boolean {
  const currentUser = getCurrentUser()
  if (!currentUser) return false
  return currentUser === portfolioMemberName
}

export async function changePassword(memberName: string, oldPassword: string, newPassword: string): Promise<{ success: boolean; message?: string }> {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Niet beschikbaar op server' }
  }
  
  try {
    const response = await fetch('/api/accounts/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberName, oldPassword, newPassword })
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      return { success: false, message: data.message || data.error || 'Wachtwoord wijzigen mislukt' }
    }

    return { success: true, message: data.message || 'Wachtwoord succesvol gewijzigd' }
  } catch (error: any) {
    return { success: false, message: error.message || 'Er is een fout opgetreden' }
  }
}

export async function resetPassword(memberName: string, adminPassword: string, newPassword: string): Promise<{ success: boolean; message?: string }> {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Niet beschikbaar op server' }
  }
  
  try {
    const response = await fetch('/api/accounts/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberName, adminPassword, newPassword })
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      return { success: false, message: data.message || data.error || 'Reset mislukt' }
    }

    return { success: true, message: data.message || `Wachtwoord voor ${memberName} succesvol gereset` }
  } catch (error: any) {
    return { success: false, message: error.message || 'Er is een fout opgetreden' }
  }
}

export async function resetAllPasswords(adminPassword: string, newPassword: string = 'Welkom2026!'): Promise<{ success: boolean; message?: string; count?: number }> {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Niet beschikbaar op server' }
  }
  
  try {
    const members = getAllMembers()
    let resetCount = 0
    let errors: string[] = []

    // Reset each account individually
    for (const member of members) {
      const result = await resetPassword(member, adminPassword, newPassword)
      if (result.success) {
        resetCount++
      } else {
        errors.push(`${member}: ${result.message}`)
      }
    }

    if (errors.length > 0) {
      return { 
        success: resetCount > 0, 
        message: `${resetCount} wachtwoorden gereset. Fouten: ${errors.join('; ')}`, 
        count: resetCount 
      }
    }

    return { success: true, message: `${resetCount} wachtwoorden succesvol gereset`, count: resetCount }
  } catch (error: any) {
    return { success: false, message: error.message || 'Er is een fout opgetreden' }
  }
}
