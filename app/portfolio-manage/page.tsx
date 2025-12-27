'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
// Image component not needed here - using regular img tags
import Link from 'next/link'
import { useAuth, canAccessPortfolio, mustChangePassword } from '@/lib/auth'
import { getMemberPhotos, savePhotoMetadata, updatePhotoMetadata, deletePhotoMetadata, updatePhotoOrder } from '@/lib/supabase'

function PortfolioManageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isLoggedIn, currentUser, checkAuth } = useAuth()
  const memberParam = searchParams.get('member') || ''
  
  const [photos, setPhotos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showUploadPreview, setShowUploadPreview] = useState(false)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [uploadTitle, setUploadTitle] = useState('')
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)
  const lastMemberRef = useRef<string>('')

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

      // Check if user must change password
      if (mustChangePassword()) {
        router.push('/change-password')
        return
      }

      // Check if user can access this portfolio
      if (memberParam && !canAccessPortfolio(memberParam)) {
        return
      }

      const memberName = memberParam || currentUser
      
      // Reset loading ref als member is veranderd
      if (lastMemberRef.current !== memberName) {
        lastMemberRef.current = memberName
        loadingRef.current = false
        // Laad foto's voor nieuwe member
        loadPhotos(memberName)
      } else if (!loadingRef.current && photos.length === 0) {
        // Als er geen foto's zijn geladen, probeer opnieuw
        loadPhotos(memberName)
      }
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [isLoggedIn, currentUser, memberParam, router])

  const loadPhotos = async (memberName: string) => {
    setLoading(true)
    
    try {
      // Probeer eerst foto's van Supabase te laden
      const supabasePhotos = await getMemberPhotos(memberName)
      
      if (supabasePhotos.length > 0) {
        // Converteer Supabase data naar portfolio formaat
        const portfolioPhotos = supabasePhotos.map((photo) => ({
          src: photo.cloudinary_url,
          title: photo.title,
          publicId: photo.cloudinary_public_id,
          id: photo.id,
          isUserUploaded: true,
        }))
        setPhotos(portfolioPhotos)
        setLoading(false)
        return
      }
      
      // Fallback: gebruik loadPortfolioData van portfolio-data.js
      if (typeof window !== 'undefined' && (window as any).loadPortfolioData) {
        const portfolioData = (window as any).loadPortfolioData(memberName)
        if (portfolioData && portfolioData.photos && portfolioData.photos.length > 0) {
          setPhotos(portfolioData.photos)
          setLoading(false)
          return
        }
      }
      
      // Laatste fallback: localStorage (voor backwards compatibility)
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
      
      setPhotos(orderedPhotos)
      setLoading(false)
    } catch (e) {
      console.error('Error loading photos:', e)
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

    setUploading(true)
    const memberName = memberParam || currentUser
    const newPhotos: any[] = []
    let uploadCount = 0

    try {
      for (const file of pendingFiles) {
        const photoTitle = uploadTitle.trim() || file.name.replace(/\.[^/.]+$/, '')

        // Upload naar Cloudinary via API
        const formData = new FormData()
        formData.append('file', file)
        formData.append('memberName', memberName)
        formData.append('title', photoTitle)

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          throw new Error(errorData.error || 'Upload mislukt')
        }

        const uploadData = await uploadResponse.json()

        if (uploadData.success) {
          // Sla metadata op in Supabase
          const currentPhotoCount = photos.length + uploadCount
          const metadataResult = await savePhotoMetadata({
            member_name: memberName,
            cloudinary_url: uploadData.url,
            cloudinary_public_id: uploadData.publicId,
            title: photoTitle,
            display_order: currentPhotoCount,
          })

          const newPhoto = {
            src: uploadData.url,
            title: photoTitle,
            publicId: uploadData.publicId,
            id: metadataResult.data?.id,
            isUserUploaded: true,
          }

          newPhotos.push(newPhoto)
          uploadCount++
        }
      }

      // Update UI
      setPhotos(prev => [...prev, ...newPhotos])
      setPendingFiles([])
      setShowUploadPreview(false)
      setUploadTitle('')
      if (fileInputRef.current) fileInputRef.current.value = ''

      alert(`${uploadCount} foto${uploadCount === 1 ? '' : '\'s'} toegevoegd!`)
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(`Fout bij uploaden: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (photo: any) => {
    if (!confirm('Weet je zeker dat je deze foto wilt verwijderen?')) return

    try {
      // Als het een Cloudinary foto is (heeft publicId)
      if (photo.publicId) {
        // Verwijder van Cloudinary
        const deleteResponse = await fetch('/api/delete-photo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ publicId: photo.publicId }),
        })

        if (!deleteResponse.ok) {
          throw new Error('Verwijderen van Cloudinary mislukt')
        }

        // Verwijder metadata van Supabase
        if (photo.id) {
          await deletePhotoMetadata(photo.id)
        }
      } else {
        // Fallback voor oude localStorage foto's
        const memberName = memberParam || currentUser
        const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}')
        const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}')
        
        if (userData[memberName]) {
          userData[memberName] = userData[memberName].filter((p: any) => p.src !== photo.src)
        }
        if (orderData[memberName]) {
          orderData[memberName] = orderData[memberName].filter((src: string) => src !== photo.src)
        }

        localStorage.setItem('portfolioData', JSON.stringify(userData))
        localStorage.setItem('portfolioOrder', JSON.stringify(orderData))
      }

      // Update UI
      setPhotos(prev => prev.filter(p => p.src !== photo.src))
      alert('Foto verwijderd')
    } catch (error: any) {
      console.error('Delete error:', error)
      alert(`Fout bij verwijderen: ${error.message}`)
    }
  }

  const handleEditTitle = (photo: any, currentTitle: string) => {
    setEditingPhoto(photo.src)
    setEditTitle(currentTitle)
  }

  const saveTitle = async (photo: any) => {
    const newTitle = editTitle.trim() || photo.title

    try {
      // Als het een Cloudinary foto is (heeft id)
      if (photo.id) {
        // Update in Supabase
        const result = await updatePhotoMetadata(photo.id, { title: newTitle })
        if (!result.success) {
          throw new Error(result.error || 'Opslaan mislukt')
        }
      } else {
        // Fallback voor oude localStorage foto's
        const memberName = memberParam || currentUser
        const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}')
        
        if (userData[memberName]) {
          const photoData = userData[memberName].find((p: any) => p.src === photo.src)
          if (photoData) {
            photoData.title = newTitle
            localStorage.setItem('portfolioData', JSON.stringify(userData))
          }
        }
      }

      // Update UI
      setPhotos(prev => prev.map(p => p.src === photo.src ? { ...p, title: newTitle } : p))
      setEditingPhoto(null)
      setEditTitle('')
    } catch (error: any) {
      console.error('Save title error:', error)
      alert(`Fout bij opslaan: ${error.message}`)
    }
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

  // Drag and drop handlers voor herordenen van foto's
  const handlePhotoDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    // Voeg een kleine delay toe zodat de drag start
    setTimeout(() => {
      if (e.currentTarget instanceof HTMLElement) {
        e.currentTarget.style.opacity = '0.5'
      }
    }, 0)
  }

  const handlePhotoDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1'
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handlePhotoDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handlePhotoDragLeave = () => {
    setDragOverIndex(null)
  }

  const handlePhotoDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    setDragOverIndex(null)

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      return
    }

    const memberName = memberParam || currentUser
    const newPhotos = [...photos]
    const draggedPhoto = newPhotos[draggedIndex]

    // Verwijder het item van de oude positie
    newPhotos.splice(draggedIndex, 1)
    // Voeg het toe op de nieuwe positie
    newPhotos.splice(dropIndex, 0, draggedPhoto)

    // Update de UI direct
    setPhotos(newPhotos)

    // Update de volgorde in Supabase als alle foto's IDs hebben
    const allHaveIds = newPhotos.every(p => p.id)
    if (allHaveIds) {
      try {
        const photoIds = newPhotos.map(p => p.id).filter(Boolean) as string[]
        const result = await updatePhotoOrder(memberName, photoIds)
        
        if (!result.success) {
          console.error('Fout bij updaten volgorde:', result.error)
          // Herlaad foto's om de originele volgorde te herstellen
          loadPhotos(memberName)
          alert('Fout bij opslaan van nieuwe volgorde. Probeer het opnieuw.')
        }
      } catch (error: any) {
        console.error('Error updating order:', error)
        // Herlaad foto's om de originele volgorde te herstellen
        loadPhotos(memberName)
        alert(`Fout bij opslaan van nieuwe volgorde: ${error.message}`)
      }
    } else {
      // Fallback voor oude localStorage foto's
      const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}')
      orderData[memberName] = newPhotos.map(p => p.src)
      localStorage.setItem('portfolioOrder', JSON.stringify(orderData))
    }

    setDraggedIndex(null)
  }

  // Wacht tot auth check compleet is om flickering te voorkomen
  if (!authChecked) {
    return (
      <section className="portfolio-manage-page">
        <div className="container">
          <div style={{ padding: '3rem', textAlign: 'center' }}>Laden...</div>
        </div>
      </section>
    )
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

  // Check if user must change password - redirect in useEffect, maar toon hier niets om flickering te voorkomen
  if (mustChangePassword()) {
    return (
      <section className="portfolio-manage-page">
        <div className="container">
          <div style={{ padding: '3rem', textAlign: 'center' }}>Je wordt doorgestuurd...</div>
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
                <div 
                  key={photo.id || photo.src || index} 
                  className={`photo-item ${draggedIndex === index ? 'dragging' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
                  draggable
                  onDragStart={(e) => handlePhotoDragStart(e, index)}
                  onDragEnd={handlePhotoDragEnd}
                  onDragOver={(e) => handlePhotoDragOver(e, index)}
                  onDragLeave={handlePhotoDragLeave}
                  onDrop={(e) => handlePhotoDrop(e, index)}
                  style={{ cursor: 'move' }}
                >
                  <div className="photo-item-image">
                    <img
                      src={photo.src.startsWith('data:') ? photo.src : photo.src.startsWith('http') ? photo.src : `/${photo.src}`}
                      alt={photo.title || 'Foto'}
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="photo-drag-handle" title="Sleep om te verplaatsen">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="9" y1="5" x2="9" y2="19"></line>
                        <line x1="15" y1="5" x2="15" y2="19"></line>
                      </svg>
                    </div>
                  </div>
                  <div className="photo-item-actions">
                    {editingPhoto === photo.src ? (
                      <div className="edit-title-form">
                        <input
                          type="text"
                          name="photoTitle"
                          autoComplete="off"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              saveTitle(photo)
                            }
                          }}
                          autoFocus
                        />
                        <button onClick={() => saveTitle(photo)} className="btn btn-small">Opslaan</button>
                        <button onClick={() => { setEditingPhoto(null); setEditTitle('') }} className="btn btn-small btn-secondary">Annuleren</button>
                      </div>
                    ) : (
                      <>
                        <p className="photo-item-title">{photo.title || 'Geen titel'}</p>
                        <div className="photo-item-buttons">
                          <button
                            onClick={() => handleEditTitle(photo, photo.title || '')}
                            className="btn btn-small"
                          >
                            Bewerken
                          </button>
                          <button
                            onClick={() => handleDelete(photo)}
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
                  name="photoTitle"
                  autoComplete="off"
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
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? 'Uploaden...' : 'Foto\'s Toevoegen'}
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
