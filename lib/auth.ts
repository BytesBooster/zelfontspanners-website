'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAllMembers } from './members'

// Export getAllMembers for admin use
export { getAllMembers }

interface Session {
  memberName: string
  timestamp: string
  requiresPasswordChange?: boolean
}

const SESSION_KEY = 'currentSession'
const SESSION_DURATION_HOURS = 24

// Simple session management
function getSession(): Session | null {
  if (typeof window === 'undefined') return null
  
  try {
    const sessionStr = localStorage.getItem(SESSION_KEY)
    if (!sessionStr) return null
    
    const session: Session = JSON.parse(sessionStr)
    const sessionTime = new Date(session.timestamp)
    const now = new Date()
    const hoursDiff = (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60)
    
    // Session expired
    if (hoursDiff > SESSION_DURATION_HOURS) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    
    return session
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

function setSession(memberName: string, requiresPasswordChange: boolean = false): void {
  if (typeof window === 'undefined') return
  
  const session: Session = {
    memberName,
    timestamp: new Date().toISOString(),
    requiresPasswordChange
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY)
  }
}

// Auth hook - simple and reliable
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [requiresPasswordChange, setRequiresPasswordChange] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = useCallback(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    const session = getSession()
    
    if (session) {
      setIsLoggedIn(true)
      setCurrentUser(session.memberName)
      setRequiresPasswordChange(session.requiresPasswordChange || false)
    } else {
      setIsLoggedIn(false)
      setCurrentUser(null)
      setRequiresPasswordChange(false)
    }
    
    setIsLoading(false)
  }, [])

  useEffect(() => {
    checkAuth()
    
    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SESSION_KEY) {
        checkAuth()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [checkAuth])

  return { isLoggedIn, currentUser, requiresPasswordChange, isLoading, checkAuth }
}

// Initialize accounts in database (create if they don't exist)
export async function initializeAccounts(): Promise<void> {
  if (typeof window === 'undefined') return
  
  try {
    const members = getAllMembers()
    
    // Create accounts that don't exist yet (in background, don't wait)
    for (const member of members) {
      fetch(`/api/accounts?memberName=${encodeURIComponent(member)}`)
        .then(res => res.json())
        .then(data => {
          if (!data.account) {
            // Account doesn't exist, create it
            fetch('/api/accounts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                memberName: member,
                password: 'Welkom2026!'
              })
            }).catch(err => console.error(`Failed to create account for ${member}:`, err))
          }
        })
        .catch(err => console.error(`Error checking account for ${member}:`, err))
    }
  } catch (error) {
    console.error('Error initializing accounts:', error)
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export function getCurrentUser(): string | null {
  const session = getSession()
  return session?.memberName || null
}

export async function requiresPasswordChange(memberName: string): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  try {
    const response = await fetch(`/api/accounts?memberName=${encodeURIComponent(memberName)}`)
    const data = await response.json()
    
    if (!data.account) return false
    
    // Check password_reset_required flag first
    if (data.account.password_reset_required === true) {
      return true
    }
    
    // Check for default passwords
    const defaultPasswords = ['test123', 'welkom2026!', 'Welkom2026!']
    return defaultPasswords.includes(data.account.password)
  } catch {
    return false
  }
}

export async function login(memberName: string, password: string): Promise<{ 
  success: boolean
  message?: string
  memberName?: string
  requiresPasswordChange?: boolean
}> {
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

    // Store session
    setSession(data.memberName, data.requiresPasswordChange || false)
    
    // Trigger storage event for multi-tab support
    window.dispatchEvent(new StorageEvent('storage', {
      key: SESSION_KEY,
      newValue: localStorage.getItem(SESSION_KEY)
    }))

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
  clearSession()
  
  // Trigger storage event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new StorageEvent('storage', {
      key: SESSION_KEY,
      newValue: null
    }))
    window.location.href = '/login'
  }
}

export function canAccessPortfolio(portfolioMemberName: string): boolean {
  const currentUser = getCurrentUser()
  if (!currentUser) return false
  return currentUser === portfolioMemberName
}

export async function changePassword(
  memberName: string, 
  oldPassword: string, 
  newPassword: string
): Promise<{ success: boolean; message?: string }> {
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

    // Update session to remove requiresPasswordChange flag
    const session = getSession()
    if (session && session.memberName === memberName) {
      setSession(memberName, false)
      window.dispatchEvent(new StorageEvent('storage', {
        key: SESSION_KEY,
        newValue: localStorage.getItem(SESSION_KEY)
      }))
    }

    return { success: true, message: data.message || 'Wachtwoord succesvol gewijzigd' }
  } catch (error: any) {
    return { success: false, message: error.message || 'Er is een fout opgetreden' }
  }
}

export async function resetPassword(
  memberName: string, 
  adminPassword: string, 
  newPassword: string
): Promise<{ success: boolean; message?: string }> {
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

export async function resetAllPasswords(
  adminPassword: string, 
  newPassword: string = 'Welkom2026!'
): Promise<{ success: boolean; message?: string; count?: number }> {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Niet beschikbaar op server' }
  }
  
  try {
    const members = getAllMembers()
    let resetCount = 0
    let errors: string[] = []

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
