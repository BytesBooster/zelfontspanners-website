'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, changePassword } from '@/lib/auth'

export default function ChangePasswordPage() {
  const router = useRouter()
  const { isLoggedIn, currentUser, requiresPasswordChange, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not logged in or password change not required
  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn || !currentUser) {
        router.push('/login')
        return
      }
      
      if (!requiresPasswordChange) {
        router.push('/')
        return
      }
    }
  }, [isLoading, isLoggedIn, currentUser, requiresPasswordChange, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage({ text: 'Vul alle velden in', type: 'error' })
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: 'De nieuwe wachtwoorden komen niet overeen', type: 'error' })
      return
    }

    if (formData.newPassword.length < 6) {
      setMessage({ text: 'Nieuw wachtwoord moet minimaal 6 tekens lang zijn', type: 'error' })
      return
    }

    if (!currentUser) {
      setMessage({ text: 'Geen gebruiker gevonden', type: 'error' })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await changePassword(
        currentUser, 
        formData.currentPassword, 
        formData.newPassword
      )

      if (result.success) {
        setMessage({ text: 'Wachtwoord succesvol gewijzigd! Je wordt doorgestuurd...', type: 'success' })
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } else {
        setMessage({ text: result.message || 'Er is een fout opgetreden', type: 'error' })
        setIsSubmitting(false)
      }
    } catch (error: any) {
      setMessage({ text: 'Er is een fout opgetreden. Probeer het opnieuw.', type: 'error' })
      setIsSubmitting(false)
    }
  }

  // Show loading or redirect
  if (isLoading || !isLoggedIn || !currentUser || !requiresPasswordChange) {
    return (
      <section className="login-page">
        <div className="container">
          <div className="login-card">
            <p>Laden...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="login-page">
      <div className="container">
        <div className="login-card">
          <h1>Wachtwoord Wijzigen</h1>
          <p className="login-subtitle">
            Je gebruikt nog het standaard wachtwoord. Wijzig je wachtwoord om verder te gaan.
          </p>
          
          {message && (
            <div className={`form-message ${message.type}`} style={{ display: 'block' }}>
              {message.text}
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword">Huidig Wachtwoord</label>
              <input
                type="password"
                id="currentPassword"
                required
                placeholder="Voer je huidige wachtwoord in"
                value={formData.currentPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">Nieuw Wachtwoord</label>
              <input
                type="password"
                id="newPassword"
                required
                placeholder="Minimaal 6 tekens"
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                disabled={isSubmitting}
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Bevestig Nieuw Wachtwoord</label>
              <input
                type="password"
                id="confirmPassword"
                required
                placeholder="Bevestig je nieuwe wachtwoord"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                disabled={isSubmitting}
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Wijzigen...' : 'Wachtwoord Wijzigen'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
