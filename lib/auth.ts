'use client'

import { useState, useEffect } from 'react'
import { getAllMembers } from './members'

interface Account {
  password: string
  memberName: string
  createdAt: string
}

interface Session {
  memberName: string
  timestamp: string
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeAccounts()
      checkAuth()
    }
  }, [])

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

export function initializeAccounts(): Record<string, Account> {
  if (typeof window === 'undefined') return {}
  
  const members = getAllMembers()
  const accounts = JSON.parse(localStorage.getItem('memberAccounts') || '{}')
  
  members.forEach(member => {
    if (!accounts[member]) {
      accounts[member] = {
        password: 'test123',
        memberName: member,
        createdAt: new Date().toISOString()
      }
    } else {
      accounts[member].password = 'test123'
    }
  })
  
  localStorage.setItem('memberAccounts', JSON.stringify(accounts))
  return accounts
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

export function login(memberName: string, password: string): { success: boolean; message?: string; memberName?: string } {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Niet beschikbaar op server' }
  }
  
  const accounts = JSON.parse(localStorage.getItem('memberAccounts') || '{}')
  
  if (!accounts[memberName]) {
    return { success: false, message: 'Gebruiker niet gevonden' }
  }
  
  if (accounts[memberName].password !== password) {
    return { success: false, message: 'Onjuist wachtwoord' }
  }
  
  const session: Session = {
    memberName: memberName,
    timestamp: new Date().toISOString()
  }
  
  localStorage.setItem('currentSession', JSON.stringify(session))
  
  return { success: true, memberName: memberName }
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
