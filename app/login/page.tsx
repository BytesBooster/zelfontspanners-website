'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, login, initializeAccounts } from '@/lib/auth'
import { getAllMembers } from '@/lib/members'

export default function LoginPage() {
  const router = useRouter()
  const { isLoggedIn, currentUser, requiresPasswordChange, isLoading } = useAuth()
  const [members, setMembers] = useState<string[]>([])
  const [formData, setFormData] = useState({
    memberName: '',
    password: ''
  })
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const memberSelectRef = useRef<HTMLSelectElement>(null)

  // Remove any modals/overlays on mount
  useEffect(() => {
    const removeModals = () => {
      // Remove password modals
      document.querySelectorAll('#password-change-modal, .password-change-modal, [id*="password-change"], [class*="password-change-modal"]').forEach(el => el.remove())
      
      // Remove blocking overlays
      document.querySelectorAll('[style*="z-index: 99999"], [style*="z-index: 100000"]').forEach(el => {
        const id = el.id || ''
        const cls = el.className || ''
        if (id.includes('password') || cls.includes('password') || cls.includes('modal')) {
          el.remove()
        }
      })
      
      // Enable clicks
      if (document.body) {
        document.body.style.pointerEvents = 'auto'
        document.body.style.overflow = ''
      }
    }
    
    removeModals()
    const interval = setInterval(removeModals, 100)
    return () => clearInterval(interval)
  }, [])

  // Initialize members list
  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)
        await initializeAccounts()
        const allMembers = getAllMembers()
        const sorted = [...allMembers].sort((a, b) => a.localeCompare(b, 'nl', { sensitivity: 'base' }))
        setMembers(sorted)
      } catch (error) {
        console.error('Error initializing:', error)
        setMessage({ text: 'Er is een fout opgetreden bij het laden. Ververs de pagina.', type: 'error' })
      } finally {
        setIsInitializing(false)
      }
    }
    init()
  }, [])

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && !isInitializing && isLoggedIn && currentUser) {
      if (requiresPasswordChange) {
        router.push('/change-password')
      } else {
        router.push('/')
      }
    }
  }, [isLoading, isInitializing, isLoggedIn, currentUser, requiresPasswordChange, router])

  // Focus password field when member is selected
  useEffect(() => {
    if (formData.memberName && passwordInputRef.current) {
      passwordInputRef.current.focus()
    }
  }, [formData.memberName])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    
    // Validation
    if (!formData.memberName.trim()) {
      setMessage({ text: 'Selecteer je naam', type: 'error' })
      memberSelectRef.current?.focus()
      return
    }
    
    if (!formData.password.trim()) {
      setMessage({ text: 'Voer je wachtwoord in', type: 'error' })
      passwordInputRef.current?.focus()
      return
    }

    setIsSubmitting(true)

    try {
      const result = await login(formData.memberName.trim(), formData.password)

      if (result.success) {
        if (result.requiresPasswordChange) {
          // Redirect immediately - NO MODAL
          router.push('/change-password')
        } else {
          router.push('/')
        }
      } else {
        setMessage({ text: result.message || 'Onjuiste gegevens. Probeer het opnieuw.', type: 'error' })
        setFormData(prev => ({ ...prev, password: '' }))
        passwordInputRef.current?.focus()
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setMessage({ text: 'Er is een fout opgetreden. Probeer het opnieuw.', type: 'error' })
      setFormData(prev => ({ ...prev, password: '' }))
      passwordInputRef.current?.focus()
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || isInitializing) {
    return (
      <section className="login-page">
        <div className="container">
          <div className="login-card">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
              <p style={{ color: '#c8c8c8' }}>Laden...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="login-page">
      <div className="container">
        <div className="login-card">
          <h1>Leden Login</h1>
          <p className="login-subtitle">Log in om je portfolio te beheren</p>
          
          {message && (
            <div 
              className={`form-message ${message.type}`} 
              style={{ display: 'block', marginBottom: '1rem' }}
              role="alert"
            >
              {message.text}
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="memberName">Naam</label>
              <select
                ref={memberSelectRef}
                id="memberName"
                required
                value={formData.memberName}
                onChange={(e) => setFormData(prev => ({ ...prev, memberName: e.target.value }))}
                disabled={isSubmitting}
                autoFocus
              >
                <option value="">Selecteer je naam...</option>
                {members.map(member => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Wachtwoord</label>
              <input
                ref={passwordInputRef}
                type="password"
                id="password"
                required
                placeholder="Voer je wachtwoord in"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting || !formData.memberName || !formData.password}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {isSubmitting ? 'Inloggen...' : 'Inloggen'}
            </button>
          </form>
          
          <div className="login-help">
            <p>Geen account? Neem contact op met het bestuur om toegang te krijgen.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
