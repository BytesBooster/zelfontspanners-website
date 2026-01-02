'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { resetPassword, resetAllPasswords, getAllMembers } from '@/lib/auth'
import { getAllMembers as getMembersList } from '@/lib/members'

export default function AdminResetPasswordPage() {
  const router = useRouter()
  const [adminPassword, setAdminPassword] = useState('')
  const [selectedMember, setSelectedMember] = useState('')
  const [newPassword, setNewPassword] = useState('welkom2026!')
  const [members, setMembers] = useState<string[]>([])
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const allMembers = getMembersList()
    const sorted = [...allMembers].sort((a, b) => a.localeCompare(b, 'nl', { sensitivity: 'base' }))
    setMembers(sorted)
  }, [])

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === 'Welkom2026!' || adminPassword === 'welkom2026!') {
      setIsAuthenticated(true)
      setMessage({ text: 'Admin toegang verleend', type: 'success' })
      setTimeout(() => setMessage(null), 3000)
    } else {
      setMessage({ text: 'Onjuist admin wachtwoord', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleResetSingle = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!selectedMember || !newPassword) {
      setMessage({ text: 'Vul alle velden in', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
      return
    }

    if (newPassword.length < 6) {
      setMessage({ text: 'Nieuw wachtwoord moet minimaal 6 tekens lang zijn', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
      return
    }

    setLoading(true)
    const result = await resetPassword(selectedMember, adminPassword, newPassword)

    if (result.success) {
      setMessage({ text: result.message || 'Wachtwoord succesvol gereset', type: 'success' })
      setSelectedMember('')
      setNewPassword('welkom2026!')
    } else {
      setMessage({ text: result.message || 'Er is een fout opgetreden', type: 'error' })
    }
    setLoading(false)
    setTimeout(() => setMessage(null), 5000)
  }

  const handleResetAll = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!confirm(`Weet je zeker dat je alle ${members.length} wachtwoorden wilt resetten naar "${newPassword}"?`)) {
      return
    }

    setLoading(true)
    const result = await resetAllPasswords(adminPassword, newPassword)

    if (result.success) {
      setMessage({ text: result.message || 'Alle wachtwoorden succesvol gereset', type: 'success' })
      setNewPassword('welkom2026!')
    } else {
      setMessage({ text: result.message || 'Er is een fout opgetreden', type: 'error' })
    }
    setLoading(false)
    setTimeout(() => setMessage(null), 5000)
  }

  if (!isAuthenticated) {
    return (
      <section className="login-page">
        <div className="container">
          <div className="login-card">
            <h1>Admin Toegang</h1>
            <p className="login-subtitle">Voer het admin wachtwoord in om wachtwoorden te resetten</p>
            
            {message && (
              <div className={`form-message ${message.type}`} style={{ display: 'block' }}>
                {message.text}
              </div>
            )}
            
            <form className="login-form" onSubmit={handleAdminAuth}>
              <div className="form-group">
                <label htmlFor="adminPassword">Admin Wachtwoord</label>
                <input
                  type="password"
                  id="adminPassword"
                  required
                  placeholder="Voer admin wachtwoord in"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <button type="submit" className="btn btn-primary" disabled={loading}>
                Inloggen
              </button>
            </form>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="login-page">
      <div className="container">
        <div className="login-card" style={{ maxWidth: '800px' }}>
          <h1>Wachtwoorden Resetten</h1>
          <p className="login-subtitle">Reset wachtwoorden voor leden accounts</p>
          
          {message && (
            <div className={`form-message ${message.type}`} style={{ display: 'block' }}>
              {message.text}
            </div>
          )}

          <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <h3 style={{ marginBottom: '1rem', color: '#d4af37' }}>Reset Alle Wachtwoorden</h3>
            <form onSubmit={handleResetAll}>
              <div className="form-group">
                <label htmlFor="resetAllPassword">Nieuw Wachtwoord voor Alle Accounts</label>
                <input
                  type="text"
                  id="resetAllPassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  minLength={6}
                />
                <small style={{ color: '#c8c8c8', display: 'block', marginTop: '0.5rem' }}>
                  Dit wachtwoord wordt toegepast op alle {members.length} accounts
                </small>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
                {loading ? 'Resetten...' : `Reset Alle ${members.length} Wachtwoorden`}
              </button>
            </form>
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <h3 style={{ marginBottom: '1rem', color: '#d4af37' }}>Reset Enkel Account</h3>
            <form onSubmit={handleResetSingle}>
              <div className="form-group">
                <label htmlFor="memberSelect">Selecteer Lid</label>
                <select
                  id="memberSelect"
                  required
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Selecteer een lid...</option>
                  {members.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="singlePassword">Nieuw Wachtwoord</label>
                <input
                  type="text"
                  id="singlePassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  minLength={6}
                />
              </div>
              
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Resetten...' : 'Reset Wachtwoord'}
              </button>
            </form>
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <button 
              onClick={() => {
                setIsAuthenticated(false)
                setAdminPassword('')
                setMessage(null)
              }} 
              className="btn btn-secondary"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

