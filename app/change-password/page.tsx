'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, changePassword, requiresPasswordChange } from '@/lib/auth'

export default function ChangePasswordPage() {
  const router = useRouter()
  const { isLoggedIn, currentUser } = useAuth()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const check = async () => {
      // Redirect if not logged in
      if (!isLoggedIn || !currentUser) {
        router.push('/login')
        return
      }

      // Check if password change is actually required
      const needsChange = await requiresPasswordChange(currentUser)
      if (!needsChange) {
        // Password already changed, redirect to portfolio
        router.push(`/portfolio-manage?member=${encodeURIComponent(currentUser)}`)
      }
    }
    check()
  }, [isLoggedIn, currentUser, router])

  // Remove session if user leaves page without changing password
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Remove session if user leaves page without changing password
      if (typeof window !== 'undefined') {
        const sessionStr = localStorage.getItem('currentSession')
        if (sessionStr) {
          try {
            const session = JSON.parse(sessionStr)
            // Only remove if session has pendingPasswordChange flag
            if (session.pendingPasswordChange) {
              localStorage.removeItem('currentSession')
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }

    const handleVisibilityChange = () => {
      // If page becomes hidden, check if we should remove session
      if (document.hidden && typeof window !== 'undefined') {
        const sessionStr = localStorage.getItem('currentSession')
        if (sessionStr) {
          try {
            const session = JSON.parse(sessionStr)
            // Only remove if session has pendingPasswordChange flag
            if (session.pendingPasswordChange) {
              setTimeout(() => {
                // Double check after delay
                const checkSession = localStorage.getItem('currentSession')
                if (checkSession) {
                  try {
                    const checkSessionObj = JSON.parse(checkSession)
                    if (checkSessionObj.pendingPasswordChange) {
                      localStorage.removeItem('currentSession')
                      window.location.href = '/login'
                    }
                  } catch (e) {
                    // Ignore
                  }
                }
              }, 500)
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage({ text: 'Vul alle velden in', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: 'De nieuwe wachtwoorden komen niet overeen', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
      return
    }

    if (formData.newPassword.length < 6) {
      setMessage({ text: 'Nieuw wachtwoord moet minimaal 6 tekens lang zijn', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
      return
    }

    if (!currentUser) {
      setMessage({ text: 'Geen gebruiker gevonden', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
      return
    }

    setLoading(true)
    const result = await changePassword(currentUser, formData.currentPassword, formData.newPassword)

    if (result.success) {
      // Update session to remove pendingPasswordChange flag
      if (typeof window !== 'undefined' && currentUser) {
        const sessionStr = localStorage.getItem('currentSession')
        if (sessionStr) {
          try {
            const session = JSON.parse(sessionStr)
            // Remove pendingPasswordChange flag to make session permanent
            delete session.pendingPasswordChange
            localStorage.setItem('currentSession', JSON.stringify(session))
          } catch (e) {
            console.error('Error updating session:', e)
          }
        }
      }
      
      setMessage({ text: 'Wachtwoord succesvol gewijzigd! Je wordt doorgestuurd...', type: 'success' })
      setTimeout(() => {
        router.push(`/portfolio-manage?member=${encodeURIComponent(currentUser)}`)
      }, 2000)
    } else {
      setMessage({ text: result.message || 'Er is een fout opgetreden', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
      setLoading(false)
    }
  }

  if (!isLoggedIn || !currentUser) {
    return null // Will redirect
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
                disabled={loading}
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
                disabled={loading}
                minLength={6}
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
                disabled={loading}
                minLength={6}
              />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Wijzigen...' : 'Wachtwoord Wijzigen'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

