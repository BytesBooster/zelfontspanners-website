'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
// Image component not needed here - using regular img tags
import Link from 'next/link'
import { useAuth, canAccessPortfolio, requiresPasswordChange, changePassword } from '@/lib/auth'
import { loadPortfolioData, addPortfolioPhoto, deletePortfolioPhoto, updatePortfolioOrder, PortfolioPhoto } from '@/lib/portfolio'

function PortfolioManageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isLoggedIn, currentUser } = useAuth()
  const memberParam = searchParams.get('member') || ''
  
  const [photos, setPhotos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadPreview, setShowUploadPreview] = useState(false)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [uploadTitle, setUploadTitle] = useState('')
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false)
  const modalShownRef = useRef(false)
  const [passwordChangeForm, setPasswordChangeForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordChangeMessage, setPasswordChangeMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Single ref to track if password check has been done
  const passwordCheckDoneRef = useRef(false)
  const passwordCheckInProgressRef = useRef(false)

  // Password check effect - runs only once when user logs in
  useEffect(() => {
    // Only run if logged in and check hasn't been done yet
    if (!isLoggedIn || !currentUser || passwordCheckDoneRef.current) {
      return
    }

    // Prevent multiple simultaneous checks
    if (passwordCheckInProgressRef.current) {
      return
    }

    passwordCheckInProgressRef.current = true

    const checkPassword = async () => {
      try {
        const needsChange = await requiresPasswordChange(currentUser)
        passwordCheckDoneRef.current = true
        
        if (needsChange) {
          // Show modal only once - prevent duplicate modals
          if (!modalShownRef.current && !showPasswordChangeModal) {
            modalShownRef.current = true
            setShowPasswordChangeModal(true)
          }
        } else {
          // Password is OK, load photos
          const memberName = memberParam || currentUser
          if (!memberParam || canAccessPortfolio(memberParam)) {
            loadPhotos(memberName)
          }
        }
      } catch (error) {
        console.error('Error checking password requirement:', error)
        // On error, allow access (don't block user)
        const memberName = memberParam || currentUser
        if (!memberParam || canAccessPortfolio(memberParam)) {
          loadPhotos(memberName)
        }
      } finally {
        passwordCheckInProgressRef.current = false
      }
    }

    checkPassword()
  }, [isLoggedIn, currentUser]) // Removed memberParam from dependencies to prevent re-runs

  // Effect to handle page unload/visibility change when password reset is pending
  useEffect(() => {
    if (!showPasswordChangeModal) {
      return // Only active when modal is showing
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Remove session if user leaves page without changing password
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentSession')
      }
    }

    const handleVisibilityChange = () => {
      // If page becomes hidden (user switches tab, minimizes, etc.) and modal is still showing
      // Remove session after a short delay to allow for navigation
      if (document.hidden && showPasswordChangeModal) {
        setTimeout(() => {
          if (showPasswordChangeModal && typeof window !== 'undefined') {
            localStorage.removeItem('currentSession')
            // Redirect to login page
            window.location.href = '/login'
          }
        }, 100)
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
  }, [showPasswordChangeModal])

  // Load photos effect - runs when modal is closed
  useEffect(() => {
    // Only load photos if:
    // 1. User is logged in
    // 2. Password check is done
    // 3. Modal is not showing
    // 4. User has access
    if (!isLoggedIn || !currentUser || !passwordCheckDoneRef.current || showPasswordChangeModal) {
      return
    }

    if (memberParam && !canAccessPortfolio(memberParam)) {
      return
    }

    const memberName = memberParam || currentUser
    loadPhotos(memberName)
  }, [isLoggedIn, currentUser, memberParam, showPasswordChangeModal])

  const loadPhotos = async (memberName: string) => {
    setLoading(true)
    try {
      const portfolioData = await loadPortfolioData(memberName)
      
      if (portfolioData && portfolioData.photos) {
        setPhotos(portfolioData.photos)
      }
    } catch (e) {
      console.error('Error loading photos:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const validFiles: File[] = []
    Array.from(files).forEach(file => {
      if (!file.type.match(/^image\/(jpeg|jpg)$/i)) {
        alert(`${file.name}: Geen JPEG bestand`)
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}: Te groot (max 5MB)`)
        return
      }
      validFiles.push(file)
    })

    if (validFiles.length === 0) return

    if (validFiles.length > 5) {
      alert('Maximaal 5 foto\'s tegelijk. Alleen de eerste 5 worden geselecteerd.')
      validFiles.splice(5)
    }

    setPendingFiles(validFiles)
    setShowUploadPreview(true)
  }

  const handleUpload = async () => {
    if (pendingFiles.length === 0 || !currentUser) return

    const memberName = memberParam || currentUser
    const newPhotos: PortfolioPhoto[] = []

    for (const file of pendingFiles) {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          // Compress image
          const img = document.createElement('img')
          img.onload = () => {
            const canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height
            if (width > 1920) {
              height = (height * 1920) / width
              width = 1920
            }
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height)
              resolve(canvas.toDataURL('image/jpeg', 0.8))
            } else {
              resolve(result)
            }
          }
          img.src = result
        }
        reader.readAsDataURL(file)
      })

      const photoTitle = uploadTitle.trim() || file.name.replace(/\.[^/.]+$/, '')
      const newPhoto: PortfolioPhoto = {
        src: base64,
        title: photoTitle,
        category: 'all',
        isUserUploaded: true
      }

      const success = await addPortfolioPhoto(memberName, newPhoto)
      if (success) {
        newPhotos.push(newPhoto)
      }
    }

    // Reload photos
    await loadPhotos(memberName)
    
    setPendingFiles([])
    setShowUploadPreview(false)
    setUploadTitle('')
    if (fileInputRef.current) fileInputRef.current.value = ''

    alert(`${newPhotos.length} foto${newPhotos.length === 1 ? '' : '\'s'} toegevoegd!`)
  }

  const handleDelete = async (photoSrc: string) => {
    if (!confirm('Weet je zeker dat je deze foto wilt verwijderen?')) return

    const memberName = memberParam || currentUser
    const success = await deletePortfolioPhoto(memberName, photoSrc)
    
    if (success) {
      // Reload photos
      await loadPhotos(memberName)
    }
  }

  const handleEditTitle = (photoSrc: string, currentTitle: string) => {
    setEditingPhoto(photoSrc)
    setEditTitle(currentTitle)
  }

  const saveTitle = async (photoSrc: string) => {
    const memberName = memberParam || currentUser
    
    // Update photo title locally
    setPhotos(prev => prev.map(p => p.src === photoSrc ? { ...p, title: editTitle.trim() || p.title } : p))
    
    // TODO: Add API endpoint for updating photo title
    // For now, we'll just update locally
    
    setEditingPhoto(null)
    setEditTitle('')
  }

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordChangeMessage(null)

    if (!passwordChangeForm.currentPassword || !passwordChangeForm.newPassword || !passwordChangeForm.confirmPassword) {
      setPasswordChangeMessage({ text: 'Vul alle velden in', type: 'error' })
      return
    }

    if (passwordChangeForm.newPassword !== passwordChangeForm.confirmPassword) {
      setPasswordChangeMessage({ text: 'De nieuwe wachtwoorden komen niet overeen', type: 'error' })
      return
    }

    if (passwordChangeForm.newPassword.length < 6) {
      setPasswordChangeMessage({ text: 'Nieuw wachtwoord moet minimaal 6 tekens lang zijn', type: 'error' })
      return
    }

    if (!currentUser) {
      setPasswordChangeMessage({ text: 'Geen gebruiker gevonden', type: 'error' })
      return
    }

    setPasswordChangeLoading(true)
    const result = await changePassword(currentUser, passwordChangeForm.currentPassword, passwordChangeForm.newPassword)

    if (result.success) {
      setPasswordChangeMessage({ text: 'Wachtwoord succesvol gewijzigd!', type: 'success' })
      // Check if password change is still required
      const stillRequired = await requiresPasswordChange(currentUser)
      if (!stillRequired) {
        // Password changed successfully, update session to remove pendingPasswordChange flag
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
        
        // Reset flags and close modal
        passwordCheckDoneRef.current = false
        modalShownRef.current = false
        setShowPasswordChangeModal(false)
        // Clear form
        setPasswordChangeForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        // Reload page to refresh state
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    } else {
      setPasswordChangeMessage({ text: result.message || 'Er is een fout opgetreden', type: 'error' })
    }
    setPasswordChangeLoading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('drag-over')
    }
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add('drag-over')
    }
  }

  const handleDragLeave = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('drag-over')
    }
  }

  if (!isLoggedIn || !currentUser) {
    return (
      <section className="portfolio-manage-page">
        <div className="container">
          <div className="auth-error-card">
            <h2>Toegang Geweigerd</h2>
            <p>Je hebt geen toegang tot deze pagina of je sessie is verlopen.</p>
            <Link href="/login" className="btn btn-primary">Naar Login</Link>
          </div>
        </div>
      </section>
    )
  }

  // Password check happens in useEffect (async)

  const memberName = memberParam || currentUser
  if (memberParam && !canAccessPortfolio(memberParam)) {
    return (
      <section className="portfolio-manage-page">
        <div className="container">
          <div className="auth-error-card">
            <h2>Toegang Geweigerd</h2>
            <p>Je kunt alleen je eigen portfolio beheren.</p>
            <Link href="/leden" className="btn btn-primary">Terug naar Leden</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Password Change Modal - Cannot be closed until password is changed */}
      {showPasswordChangeModal && (
        <div 
          className="password-change-modal" 
          style={{ display: 'flex' }}
          onClick={(e) => {
            // Prevent closing when clicking outside
            e.stopPropagation()
          }}
        >
          <div 
            className="password-change-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>⚠️ Wachtwoord Wijzigen Verplicht</h2>
            <p>Je wachtwoord is gereset door een administrator. Je moet je wachtwoord wijzigen voordat je verder kunt gaan.</p>
            <p style={{ color: '#d4af37', fontWeight: '500' }}>Dit venster kan niet worden gesloten totdat je wachtwoord is gewijzigd.</p>
            
            {passwordChangeMessage && (
              <div className={`form-message ${passwordChangeMessage.type}`} style={{ display: 'block', marginTop: '1rem' }}>
                {passwordChangeMessage.text}
              </div>
            )}

            <form className="login-form" onSubmit={handlePasswordChangeSubmit} style={{ marginTop: '2rem' }}>
              <div className="form-group">
                <label htmlFor="modalCurrentPassword">Huidig Wachtwoord</label>
                <input
                  type="password"
                  id="modalCurrentPassword"
                  required
                  placeholder="Voer je huidige wachtwoord in"
                  value={passwordChangeForm.currentPassword}
                  onChange={(e) => setPasswordChangeForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  disabled={passwordChangeLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="modalNewPassword">Nieuw Wachtwoord</label>
                <input
                  type="password"
                  id="modalNewPassword"
                  required
                  placeholder="Minimaal 6 tekens"
                  value={passwordChangeForm.newPassword}
                  onChange={(e) => setPasswordChangeForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  disabled={passwordChangeLoading}
                  minLength={6}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="modalConfirmPassword">Bevestig Nieuw Wachtwoord</label>
                <input
                  type="password"
                  id="modalConfirmPassword"
                  required
                  placeholder="Bevestig je nieuwe wachtwoord"
                  value={passwordChangeForm.confirmPassword}
                  onChange={(e) => setPasswordChangeForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  disabled={passwordChangeLoading}
                  minLength={6}
                />
              </div>
              
              <button type="submit" className="btn btn-primary" disabled={passwordChangeLoading} style={{ width: '100%', marginTop: '1rem' }}>
                {passwordChangeLoading ? 'Wijzigen...' : 'Wachtwoord Wijzigen'}
              </button>
            </form>
          </div>
        </div>
      )}

      <section className="portfolio-manage-page">
        <div className="container">
        <div className="section-header">
          <h1>Portfolio Beheer</h1>
          <p className="section-subtitle">Beheer je portfolio foto's - {memberName}</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <Link href={`/portfolio?member=${encodeURIComponent(memberName)}`} className="btn btn-secondary">
            Bekijk Portfolio
          </Link>
        </div>

        {/* Current Photos */}
        <div className="manage-section">
          <h2>Huidige Foto's <span className="photo-count">({photos.length})</span></h2>
          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Foto's laden...</p>
            </div>
          ) : photos.length === 0 ? (
            <p>Nog geen foto's in je portfolio.</p>
          ) : (
            <div className="photos-grid">
              {photos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <div className="photo-item-image">
                    <img
                      src={photo.src.startsWith('data:') ? photo.src : `/${photo.src}`}
                      alt={photo.title || 'Foto'}
                      loading="lazy"
                    />
                  </div>
                  <div className="photo-item-actions">
                    {editingPhoto === photo.src ? (
                      <div className="edit-title-form">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              saveTitle(photo.src)
                            }
                          }}
                          autoFocus
                        />
                        <button onClick={() => saveTitle(photo.src)} className="btn btn-small">Opslaan</button>
                        <button onClick={() => { setEditingPhoto(null); setEditTitle('') }} className="btn btn-small btn-secondary">Annuleren</button>
                      </div>
                    ) : (
                      <>
                        <p className="photo-item-title">{photo.title || 'Geen titel'}</p>
                        <div className="photo-item-buttons">
                          <button
                            onClick={() => handleEditTitle(photo.src, photo.title || '')}
                            className="btn btn-small"
                          >
                            Bewerken
                          </button>
                          <button
                            onClick={() => handleDelete(photo.src)}
                            className="btn btn-small btn-danger"
                          >
                            Verwijderen
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add New Photos */}
        <div className="manage-section">
          <h2>Nieuwe Foto's Toevoegen</h2>
          <div
            ref={dropZoneRef}
            className="drop-zone"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="drop-zone-content">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p>Sleep foto's hierheen of klik om te selecteren</p>
              <small>JPEG bestanden, max 5MB per foto, maximaal 5 tegelijk</small>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              id="photoFiles"
              multiple
              accept="image/jpeg,image/jpg"
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </div>

          {showUploadPreview && (
            <div className="upload-preview">
              <h3>Te uploaden foto's:</h3>
              <div className="preview-grid">
                {pendingFiles.map((file, index) => (
                  <div key={index} className="preview-item">
                    <img src={URL.createObjectURL(file)} alt={file.name} />
                    <p>{file.name}</p>
                    <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label htmlFor="photoTitle">Titel voor alle foto's (optioneel)</label>
                <input
                  type="text"
                  id="photoTitle"
                  placeholder="Geef een titel aan je foto's"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                />
              </div>
              <div className="upload-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setPendingFiles([])
                    setShowUploadPreview(false)
                    setUploadTitle('')
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                >
                  Annuleren
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpload}>
                  Foto's Toevoegen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  )
}

export default function PortfolioManagePage() {
  return (
    <Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center' }}>Laden...</div>}>
      <PortfolioManageContent />
    </Suspense>
  )
}
