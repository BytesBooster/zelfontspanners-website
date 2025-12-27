'use client'

import { useState, useEffect } from 'react'

interface MemberProgress {
  memberName: string
  staticCount: number
  migratedCount: number
  percentage: number
}

interface StatusData {
  success: boolean
  summary?: {
    totalStatic: number
    totalMigrated: number
    totalMembers: number
    membersMigrated: number
    percentage: number
    debug?: {
      totalInDatabase: number
      localUrlCount: number
      staticPublicIdCount: number
      matchesUrlCount: number
      debugInfo: string[]
    }
  }
  members?: MemberProgress[]
  error?: string
}

export default function MigrateStatusPage() {
  const [status, setStatus] = useState<StatusData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/migrate-static-photos')
      const data = await response.json()
      setStatus(data)
    } catch (error: any) {
      setStatus({
        success: false,
        error: error.message || 'Kon status niet laden',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStatus()
  }, [])

  if (loading) {
    return (
      <section className="portfolio-manage-page">
        <div className="container">
          <div className="section-header">
            <h1>Migratie Status</h1>
            <p className="section-subtitle">Laden...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!status || !status.success) {
    return (
      <section className="portfolio-manage-page">
        <div className="container">
          <div className="section-header">
            <h1>Migratie Status</h1>
            <p className="section-subtitle">Fout bij laden</p>
          </div>
          <div className="manage-section">
            <p style={{ color: '#f44336' }}>{status?.error || 'Onbekende fout'}</p>
            <button onClick={loadStatus} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Opnieuw Proberen
            </button>
          </div>
        </div>
      </section>
    )
  }

  const { summary, members } = status

  return (
    <section className="portfolio-manage-page">
      <div className="container">
        <div className="section-header">
          <h1>Migratie Status</h1>
          <p className="section-subtitle">Voortgang van statische foto migratie</p>
        </div>

        {/* Summary */}
        <div className="manage-section">
          <h2>Overzicht</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem',
            marginTop: '1.5rem'
          }}>
            <div style={{
              background: 'rgba(212, 175, 55, 0.1)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
            }}>
              <h3 style={{ color: '#d4af37', fontSize: '2rem', marginBottom: '0.5rem' }}>
                {summary?.totalStatic || 0}
              </h3>
              <p style={{ color: '#b8b8b8' }}>Totaal Statische Foto's</p>
            </div>

            <div style={{
              background: 'rgba(76, 175, 80, 0.1)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(76, 175, 80, 0.3)',
            }}>
              <h3 style={{ color: '#4caf50', fontSize: '2rem', marginBottom: '0.5rem' }}>
                {summary?.totalMigrated || 0}
              </h3>
              <p style={{ color: '#b8b8b8' }}>Gemigreerd</p>
            </div>

            <div style={{
              background: 'rgba(33, 150, 243, 0.1)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(33, 150, 243, 0.3)',
            }}>
              <h3 style={{ color: '#2196f3', fontSize: '2rem', marginBottom: '0.5rem' }}>
                {summary?.percentage || 0}%
              </h3>
              <p style={{ color: '#b8b8b8' }}>Voortgang</p>
            </div>

            <div style={{
              background: 'rgba(156, 39, 176, 0.1)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(156, 39, 176, 0.3)',
            }}>
              <h3 style={{ color: '#9c27b0', fontSize: '2rem', marginBottom: '0.5rem' }}>
                {summary?.membersMigrated || 0} / {summary?.totalMembers || 0}
              </h3>
              <p style={{ color: '#b8b8b8' }}>Leden Gemigreerd</p>
            </div>
          </div>

          {/* Progress Bar */}
          {summary && summary.totalStatic > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '10px',
                height: '30px',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <div style={{
                  background: 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)',
                  height: '100%',
                  width: `${summary.percentage}%`,
                  transition: 'width 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                }}>
                  {summary.percentage}%
                </div>
              </div>
            </div>
          )}

          {/* Debug Info */}
          {summary?.debug && (
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(33, 150, 243, 0.1)', borderRadius: '8px' }}>
              <h3 style={{ color: '#2196f3', marginBottom: '0.5rem', fontSize: '1rem' }}>
                🔍 Debug Informatie
              </h3>
              <ul style={{ color: '#b8b8b8', fontSize: '0.85rem', paddingLeft: '1.5rem', fontFamily: 'monospace' }}>
                {summary.debug.debugInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Member Details */}
        <div className="manage-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Voortgang per Lid</h2>
            <button onClick={loadStatus} className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
              🔄 Vernieuwen
            </button>
          </div>

          {members && members.length > 0 ? (
            <div style={{
              display: 'grid',
              gap: '1rem',
              maxHeight: '600px',
              overflowY: 'auto',
              paddingRight: '0.5rem',
            }}>
              {members.map((member) => (
                <div
                  key={member.memberName}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ color: '#ffffff', fontSize: '1.1rem', margin: 0 }}>
                      {member.memberName}
                    </h3>
                    <span style={{
                      color: member.percentage === 100 ? '#4caf50' : member.percentage > 0 ? '#ff9800' : '#b8b8b8',
                      fontWeight: 'bold',
                    }}>
                      {member.percentage}%
                    </span>
                  </div>
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '5px',
                    height: '8px',
                    overflow: 'hidden',
                    marginBottom: '0.5rem',
                  }}>
                    <div style={{
                      background: member.percentage === 100 
                        ? 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)'
                        : member.percentage > 0
                        ? 'linear-gradient(90deg, #ff9800 0%, #ffc107 100%)'
                        : 'rgba(212, 175, 55, 0.3)',
                      height: '100%',
                      width: `${member.percentage}%`,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                  <p style={{ color: '#b8b8b8', fontSize: '0.85rem', margin: 0 }}>
                    {member.migratedCount} van {member.staticCount} foto's gemigreerd
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#b8b8b8' }}>Geen leden gevonden</p>
          )}
        </div>

        {/* Actions */}
        <div className="manage-section">
          <h2>Acties</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/migrate" className="btn btn-primary">
              Start Migratie
            </a>
            <button onClick={loadStatus} className="btn btn-secondary">
              Status Vernieuwen
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

