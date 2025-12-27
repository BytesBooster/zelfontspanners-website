'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, changePassword, mustChangePassword } from '@/lib/auth'

export default function ChangePasswordPage() {
  const router = useRouter()
  const { isLoggedIn, currentUser, checkAuth } = useAuth()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [isChanging, setIsChanging] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    // Check auth status eerst
    checkAuth()
    
    // Wacht even om auth state te stabiliseren
    const timeoutId = setTimeout(() => {
      setAuthChecked(true)
      
      if (!isLoggedIn || !currentUser) {
        router.push('/login')
        return
      }

      // Als gebruiker niet verplicht is om wachtwoord te wijzigen, redirect naar portfolio
      if (!mustChangePassword()) {
        router.push(`/portfolio-manage?member=${encodeURIComponent(currentUser)}`)
      }
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [isLoggedIn, currentUser, router, checkAuth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChanging(true)
    setMessage(null)

    if (!formData.newPassword || !formData.confirmPassword) {
      setMessage({ text: 'Vul alle velden in', type: 'error' })
      setIsChanging(false)
      return
    }

    if (formData.newPassword.length < 6) {
      setMessage({ text: 'Nieuw wachtwoord moet minimaal 6 karakters lang zijn', type: 'error' })
      setIsChanging(false)
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: 'Nieuwe wachtwoorden komen niet overeen', type: 'error' })
      setIsChanging(false)
      return
    }

    if (!currentUser) {
      setMessage({ text: 'Geen gebruiker gevonden', type: 'error' })
      setIsChanging(false)
      return
    }

    const result = await changePassword(currentUser, formData.newPassword)

    if (result.success) {
      setMessage({ text: 'Wachtwoord succesvol gewijzigd! Je wordt doorgestuurd...', type: 'success' })
      setTimeout(() => {
        router.push(`/portfolio-manage?member=${encodeURIComponent(currentUser)}`)
      }, 1500)
    } else {
      setMessage({ text: result.message || 'Er is een fout opgetreden bij het wijzigen van het wachtwoord', type: 'error' })
      setIsChanging(false)
    }
  }

  // Wacht tot auth check compleet is om flickering te voorkomen
  if (!authChecked) {
    return (
      <section className="login-page">
        <div className="container">
          <div className="login-card">
            <div style={{ padding: '3rem', textAlign: 'center' }}>Laden...</div>
          </div>
        </div>
      </section>
    )
  }

  if (!isLoggedIn || !currentUser) {
    return (
      <section className="login-page">
        <div className="container">
          <div className="login-card">
            <div style={{ padding: '3rem', textAlign: 'center' }}>Je wordt doorgestuurd...</div>
          </div>
        </div>
      </section>
    )
  }

  // Als gebruiker niet verplicht is om wachtwoord te wijzigen, toon loading tijdens redirect
  if (!mustChangePassword()) {
    return (
      <section className="login-page">
        <div className="container">
          <div className="login-card">
            <div style={{ padding: '3rem', textAlign: 'center' }}>Je wordt doorgestuurd...</div>
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
            Je moet je wachtwoord wijzigen voordat je verder kunt gaan
          </p>
          
          {message && (
            <div className={`form-message ${message.type}`} style={{ display: 'block' }}>
              {message.text}
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="newPassword">Nieuw Wachtwoord *</label>
              {/* Hidden username field for accessibility and password managers */}
              <input
                type="text"
                name="username"
                autoComplete="username"
                value={currentUser || ''}
                readOnly
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                tabIndex={-1}
                aria-hidden="true"
              />
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="Minimaal 6 karakters"
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                disabled={isChanging}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Bevestig Nieuw Wachtwoord *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="Herhaal het nieuwe wachtwoord"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                disabled={isChanging}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isChanging}
            >
              {isChanging ? 'Wijzigen...' : 'Wachtwoord Wijzigen'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

