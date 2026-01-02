'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, login, initializeAccounts, requiresPasswordChange } from '@/lib/auth'
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
    const init = async () => {
      await initializeAccounts()
      const allMembers = getAllMembers()
      const sorted = [...allMembers].sort((a, b) => a.localeCompare(b, 'nl', { sensitivity: 'base' }))
      setMembers(sorted)
      
      if (isLoggedIn && currentUser) {
        // Always redirect to portfolio-manage, it will handle password change modal
        router.push(`/portfolio-manage?member=${encodeURIComponent(currentUser)}`)
      }
    }
    init()
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
      if (result.requiresPasswordChange) {
        // Redirect to portfolio-manage which will show the modal
        setMessage({ text: 'Je moet je wachtwoord wijzigen voordat je verder kunt gaan.', type: 'error' })
        setTimeout(() => {
          router.push(`/portfolio-manage?member=${encodeURIComponent(formData.memberName)}`)
        }, 500)
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
              <input
                type="password"
                id="password"
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
