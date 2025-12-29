'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
// Image component not needed here - using regular img tags
import Link from 'next/link'
import { useAuth, canAccessPortfolio } from '@/lib/auth'

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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoggedIn || !currentUser) {
      return
    }

    // Check if user can access this portfolio
    if (memberParam && !canAccessPortfolio(memberParam)) {
      return
    }

    const memberName = memberParam || currentUser
    loadPhotos(memberName)
  }, [isLoggedIn, currentUser, memberParam])

  const loadPhotos = (memberName: string) => {
    setLoading(true)
    try {
      // Use loadPortfolioData from portfolio-data.js
      let portfolioData = null
      
      if (typeof window !== 'undefined' && (window as any).loadPortfolioData) {
        portfolioData = (window as any).loadPortfolioData(memberName)
      }
      
      // Fallback to localStorage
      if (!portfolioData) {
        const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}')
        const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}')
        const hiddenPhotos = JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}')
        
        const memberData = userData[memberName] || []
        const memberOrder = orderData[memberName] || []
        const hiddenForMember = hiddenPhotos[memberName] || []
        
        const visiblePhotos = memberData.filter((photo: any) => {
          return !hiddenForMember.some((hiddenSrc: string) => photo.src === hiddenSrc)
        })
        
        const orderedPhotos = memberOrder
          .map((src: string) => visiblePhotos.find((p: any) => p.src === src))
          .filter(Boolean)
          .concat(visiblePhotos.filter((p: any) => !memberOrder.includes(p.src)))
        
        portfolioData = {
          name: memberName,
          photos: orderedPhotos
        }
      }
      
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
    const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}')
    const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}')
    
    if (!userData[memberName]) {
      userData[memberName] = []
    }
    if (!orderData[memberName]) {
      orderData[memberName] = []
    }

    const newPhotos: any[] = []

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
      const newPhoto = {
        src: base64,
        title: photoTitle,
        category: 'all',
        isUserUploaded: true
      }

      newPhotos.push(newPhoto)
      userData[memberName].push(newPhoto)
      orderData[memberName].push(base64)
    }

    localStorage.setItem('portfolioData', JSON.stringify(userData))
    localStorage.setItem('portfolioOrder', JSON.stringify(orderData))

    setPhotos(prev => [...prev, ...newPhotos])
    setPendingFiles([])
    setShowUploadPreview(false)
    setUploadTitle('')
    if (fileInputRef.current) fileInputRef.current.value = ''

    alert(`${newPhotos.length} foto${newPhotos.length === 1 ? '' : '\'s'} toegevoegd!`)
  }

  const handleDelete = (photoSrc: string) => {
    if (!confirm('Weet je zeker dat je deze foto wilt verwijderen?')) return

    const memberName = memberParam || currentUser
    const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}')
    const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}')
    
    if (userData[memberName]) {
      userData[memberName] = userData[memberName].filter((p: any) => p.src !== photoSrc)
    }
    if (orderData[memberName]) {
      orderData[memberName] = orderData[memberName].filter((src: string) => src !== photoSrc)
    }

    localStorage.setItem('portfolioData', JSON.stringify(userData))
    localStorage.setItem('portfolioOrder', JSON.stringify(orderData))

    setPhotos(prev => prev.filter(p => p.src !== photoSrc))
  }

  const handleEditTitle = (photoSrc: string, currentTitle: string) => {
    setEditingPhoto(photoSrc)
    setEditTitle(currentTitle)
  }

  const saveTitle = (photoSrc: string) => {
    const memberName = memberParam || currentUser
    const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}')
    
    if (userData[memberName]) {
      const photo = userData[memberName].find((p: any) => p.src === photoSrc)
      if (photo) {
        photo.title = editTitle.trim() || photo.title
        localStorage.setItem('portfolioData', JSON.stringify(userData))
        setPhotos(prev => prev.map(p => p.src === photoSrc ? { ...p, title: photo.title } : p))
      }
    }

    setEditingPhoto(null)
    setEditTitle('')
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
  )
}

export default function PortfolioManagePage() {
  return (
    <Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center' }}>Laden...</div>}>
      <PortfolioManageContent />
    </Suspense>
  )
}
