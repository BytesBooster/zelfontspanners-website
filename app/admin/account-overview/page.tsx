'use client'

import { useEffect, useState } from 'react'
import { getAllMembers, requiresPasswordChange } from '@/lib/auth'
import { requiresPasswordChange as checkPasswordChange } from '@/lib/auth'
import { getAllMembers as getMembersList } from '@/lib/members'

interface AccountInfo {
  memberName: string
  hasAccount: boolean
  passwordChanged: boolean
  createdAt?: string
  updatedAt?: string
}

export default function AccountOverviewPage() {
  const [adminPassword, setAdminPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accounts, setAccounts] = useState<AccountInfo[]>([])
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      loadAccountInfo()
    }
  }, [isAuthenticated])

  const loadAccountInfo = async () => {
    if (typeof window === 'undefined') return

    try {
      const members = getMembersList()
      const accountInfos: AccountInfo[] = []

      for (const member of members) {
        const response = await fetch(`/api/accounts?memberName=${encodeURIComponent(member)}`)
        const data = await response.json()
        const account = data.account

        const needsChange = account ? await checkPasswordChange(member) : false

        accountInfos.push({
          memberName: member,
          hasAccount: !!account,
          passwordChanged: account ? !needsChange : false,
          createdAt: account?.createdAt,
          updatedAt: account?.updatedAt
        })
      }

      setAccounts(accountInfos.sort((a, b) => a.memberName.localeCompare(b.memberName, 'nl', { sensitivity: 'base' })))
    } catch (error) {
      console.error('Error loading account info:', error)
    }
  }

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

  const accountsWithPasswordChanged = accounts.filter(a => a.passwordChanged).length
  const accountsNeedingPasswordChange = accounts.filter(a => a.hasAccount && !a.passwordChanged).length
  const accountsNotCreated = accounts.filter(a => !a.hasAccount).length

  if (!isAuthenticated) {
    return (
      <section className="login-page">
        <div className="container">
          <div className="login-card">
            <h1>Account Overzicht</h1>
            <p className="login-subtitle">Voer het admin wachtwoord in om accounts te bekijken</p>
            
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
                />
              </div>
              
              <button type="submit" className="btn btn-primary">
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
        <div className="login-card" style={{ maxWidth: '1000px' }}>
          <h1>Account Overzicht</h1>
          <p className="login-subtitle">Overzicht van alle lid accounts</p>
          
          {message && (
            <div className={`form-message ${message.type}`} style={{ display: 'block' }}>
              {message.text}
            </div>
          )}

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem', 
            marginBottom: '2rem' 
          }}>
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(212, 175, 55, 0.1)', 
              borderRadius: '8px', 
              border: '1px solid rgba(212, 175, 55, 0.2)' 
            }}>
              <h3 style={{ margin: 0, color: '#d4af37' }}>Totaal Accounts</h3>
              <p style={{ fontSize: '2rem', margin: '0.5rem 0', fontWeight: 'bold' }}>{accounts.length}</p>
            </div>
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(76, 175, 80, 0.1)', 
              borderRadius: '8px', 
              border: '1px solid rgba(76, 175, 80, 0.2)' 
            }}>
              <h3 style={{ margin: 0, color: '#4caf50' }}>Wachtwoord Gewijzigd</h3>
              <p style={{ fontSize: '2rem', margin: '0.5rem 0', fontWeight: 'bold' }}>{accountsWithPasswordChanged}</p>
            </div>
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(255, 152, 0, 0.1)', 
              borderRadius: '8px', 
              border: '1px solid rgba(255, 152, 0, 0.2)' 
            }}>
              <h3 style={{ margin: 0, color: '#ff9800' }}>Moet Wijzigen</h3>
              <p style={{ fontSize: '2rem', margin: '0.5rem 0', fontWeight: 'bold' }}>{accountsNeedingPasswordChange}</p>
            </div>
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(158, 158, 158, 0.1)', 
              borderRadius: '8px', 
              border: '1px solid rgba(158, 158, 158, 0.2)' 
            }}>
              <h3 style={{ margin: 0, color: '#9e9e9e' }}>Nog Niet Aangemaakt</h3>
              <p style={{ fontSize: '2rem', margin: '0.5rem 0', fontWeight: 'bold' }}>{accountsNotCreated}</p>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#d4af37' }}>Alle Accounts</h3>
            <div style={{ 
              maxHeight: '600px', 
              overflowY: 'auto',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '8px',
              padding: '1rem'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#d4af37' }}>Lid</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#d4af37' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#d4af37' }}>Aangemaakt</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#d4af37' }}>Bijgewerkt</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account, index) => (
                    <tr 
                      key={account.memberName} 
                      style={{ 
                        borderBottom: index < accounts.length - 1 ? '1px solid rgba(212, 175, 55, 0.1)' : 'none' 
                      }}
                    >
                      <td style={{ padding: '0.75rem' }}>{account.memberName}</td>
                      <td style={{ padding: '0.75rem' }}>
                        {!account.hasAccount ? (
                          <span style={{ color: '#9e9e9e' }}>Nog niet aangemaakt</span>
                        ) : account.passwordChanged ? (
                          <span style={{ color: '#4caf50' }}>✓ Wachtwoord gewijzigd</span>
                        ) : (
                          <span style={{ color: '#ff9800' }}>⚠ Moet wijzigen</span>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#c8c8c8' }}>
                        {account.createdAt ? new Date(account.createdAt).toLocaleDateString('nl-NL') : '-'}
                      </td>
                      <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#c8c8c8' }}>
                        {account.updatedAt ? new Date(account.updatedAt).toLocaleDateString('nl-NL') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            <button 
              onClick={() => loadAccountInfo()} 
              className="btn btn-primary"
              style={{ marginLeft: '1rem' }}
            >
              Ververs
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

