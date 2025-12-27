'use client'

import { useState } from 'react'

export default function AdminMigratePage() {
  const [migrating, setMigrating] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    migrated?: number
    errors?: number
    errorDetails?: string[]
    error?: string
  } | null>(null)

  const handleMigrate = async () => {
    if (!confirm('Weet je zeker dat je alle statische portfolio foto\'s wilt migreren naar Supabase?')) {
      return
    }

    setMigrating(true)
    setResult(null)

    try {
      const response = await fetch('/api/migrate-static-photos', {
        method: 'POST',
      })

      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Migratie mislukt',
      })
    } finally {
      setMigrating(false)
    }
  }

  return (
    <section className="portfolio-manage-page">
      <div className="container">
        <div className="section-header">
          <h1>Migreer Statische Portfolio Foto's</h1>
          <p className="section-subtitle">
            Migreer alle statische foto's uit portfolio-data.js naar Supabase database
          </p>
        </div>

        <div className="manage-section">
          <h2>Migratie</h2>
          <p style={{ color: '#b8b8b8', marginBottom: '2rem' }}>
            Dit script migreert alle statische portfolio foto's naar Supabase. 
            Bestaande foto's worden overgeslagen.
          </p>

          <button
            onClick={handleMigrate}
            disabled={migrating}
            className="btn btn-primary"
            style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
          >
            {migrating ? 'Migreren...' : 'Start Migratie'}
          </button>

          {result && (
            <div
              style={{
                marginTop: '2rem',
                padding: '1.5rem',
                borderRadius: '10px',
                background: result.success
                  ? 'rgba(76, 175, 80, 0.1)'
                  : 'rgba(244, 67, 54, 0.1)',
                border: `1px solid ${
                  result.success
                    ? 'rgba(76, 175, 80, 0.3)'
                    : 'rgba(244, 67, 54, 0.3)'
                }`,
              }}
            >
              {result.success ? (
                <>
                  <h3 style={{ color: '#4caf50', marginBottom: '1rem' }}>
                    ✅ Migratie Succesvol!
                  </h3>
                  <p style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                    <strong>{result.migrated}</strong> foto's gemigreerd
                  </p>
                  {result.errors && result.errors > 0 && (
                    <p style={{ color: '#ff9800', marginTop: '0.5rem' }}>
                      ⚠️ {result.errors} fouten opgetreden
                    </p>
                  )}
                  {result.errorDetails && result.errorDetails.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <p style={{ color: '#ff9800', marginBottom: '0.5rem' }}>
                        Eerste fouten:
                      </p>
                      <ul style={{ color: '#b8b8b8', paddingLeft: '1.5rem' }}>
                        {result.errorDetails.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 style={{ color: '#f44336', marginBottom: '1rem' }}>
                    ❌ Migratie Mislukt
                  </h3>
                  <p style={{ color: '#ffffff' }}>{result.error}</p>
                </>
              )}
            </div>
          )}

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px' }}>
            <h3 style={{ color: '#d4af37', marginBottom: '0.5rem', fontSize: '1rem' }}>
              ℹ️ Informatie
            </h3>
            <ul style={{ color: '#b8b8b8', fontSize: '0.9rem', paddingLeft: '1.5rem' }}>
              <li>Statische foto's gebruiken hun huidige URLs (images/portfolio/...)</li>
              <li>Bestaande foto's worden automatisch overgeslagen</li>
              <li>Je kunt dit script veilig meerdere keren uitvoeren</li>
              <li>Foto's blijven werken omdat ze op de server staan</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}



