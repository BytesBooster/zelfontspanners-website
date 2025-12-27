'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, login, initializeAccounts } from '@/lib/auth'
import { getAllMembers } from '@/lib/members'

export default function LoginPage() {
  const router = useRouter()
  const { isLoggedIn, currentUser } = useAuth()
  const [members, setMembers] = useState<string[]>([])
  const [formData, setFormData] = useState({
    memberName: '',
    password: ''
  })
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    // Laad leden direct, zonder te wachten op initializeAccounts
    const allMembers = getAllMembers()
    const sorted = [...allMembers].sort((a, b) => a.localeCompare(b, 'nl', { sensitivity: 'base' }))
    setMembers(sorted)
    
    // Initialize accounts wordt al aangeroepen door useAuth, niet hier opnieuw doen
    
    if (isLoggedIn && currentUser) {
      router.push(`/portfolio-manage?member=${encodeURIComponent(currentUser)}`)
    }
  }, [isLoggedIn, currentUser, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.memberName || !formData.password) {
      setMessage({ text: 'Vul alle velden in', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
      return
    }

    const result = await login(formData.memberName, formData.password)

    if (result.success) {
      if (result.mustChangePassword) {
        // Redirect naar wachtwoord wijzigen pagina
        setMessage({ text: 'Je moet eerst je wachtwoord wijzigen', type: 'success' })
        setTimeout(() => {
          router.push('/change-password')
        }, 1000)
      } else {
        setMessage({ text: 'Succesvol ingelogd! Je wordt doorgestuurd...', type: 'success' })
        setTimeout(() => {
          router.push(`/portfolio-manage?member=${encodeURIComponent(formData.memberName)}`)
        }, 1000)
      }
    } else {
      setMessage({ text: result.message || 'Er is een fout opgetreden', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <section className="login-page">
      <div className="container">
        <div className="login-card">
          <h1>Leden Login</h1>
          <p className="login-subtitle">Log in om je portfolio te beheren</p>
          
          {message && (
            <div className={`form-message ${message.type}`} style={{ display: 'block' }}>
              {message.text}
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="memberName">Naam</label>
              <select
                id="memberName"
                name="memberName"
                autoComplete="username"
                required
                value={formData.memberName}
                onChange={(e) => setFormData(prev => ({ ...prev, memberName: e.target.value }))}
              >
                <option value="">Selecteer je naam...</option>
                {members.map(member => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Wachtwoord</label>
              {/* Hidden username field for accessibility and password managers */}
              <input
                type="text"
                name="username"
                autoComplete="username"
                value={formData.memberName}
                readOnly
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                tabIndex={-1}
                aria-hidden="true"
              />
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Voer je wachtwoord in"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            
            <button type="submit" className="btn btn-primary">Inloggen</button>
          </form>
          
          <div className="login-help">
            <p>Geen account? Neem contact op met het bestuur om toegang te krijgen.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
