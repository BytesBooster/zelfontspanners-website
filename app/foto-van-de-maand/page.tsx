'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useAuth, getCurrentUser } from '@/lib/auth'
import {
  loadSubmissions,
  saveSubmissions,
  getCurrentMonthKey,
  getMonthName,
  getCurrentMonthExcursion,
  canUserUpload,
  getRemainingUploadSlots,
  compressImage,
  FotoSubmission,
  MonthData
} from '@/lib/foto-van-de-maand'
import { formatDate } from '@/lib/agenda'

export default function FotoVanDeMaandPage() {
  const { isLoggedIn, currentUser } = useAuth()
  const [submissions, setSubmissions] = useState<Record<string, MonthData>>({})
  const [currentMonthKey, setCurrentMonthKey] = useState('')
  const [excursion, setExcursion] = useState<any>(null)
  const [showUploadPreview, setShowUploadPreview] = useState(false)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [uploadTitle, setUploadTitle] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [modalTitle, setModalTitle] = useState('')
  const [modalPhotographer, setModalPhotographer] = useState('')
  const [modalDate, setModalDate] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const monthKey = getCurrentMonthKey()
    setCurrentMonthKey(monthKey)
    
    const loaded = loadSubmissions()
    setSubmissions(loaded)
    
    const currentExcursion = getCurrentMonthExcursion()
    setExcursion(currentExcursion)
  }, [])

  const monthData = submissions[currentMonthKey] || { submissions: [] }
  const userSubmissions = monthData.submissions.filter(sub => sub.photographer === currentUser)
  const remaining = getRemainingUploadSlots(currentUser)

  // Find winner (most votes)
  const winner = monthData.submissions.length > 0
    ? [...monthData.submissions].sort((a, b) => (b.votes || []).length - (a.votes || []).length)[0]
    : null

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return
    
    if (!canUserUpload(currentUser)) {
      alert('Je hebt het maximum van 5 foto\'s bereikt voor deze maand.')
      return
    }

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

    if (validFiles.length > remaining) {
      alert(`Je kunt nog maar ${remaining} foto${remaining === 1 ? '' : '\'s'} uploaden deze maand. Alleen de eerste ${remaining} foto${remaining === 1 ? '' : '\'s'} worden geselecteerd.`)
      validFiles.splice(remaining)
    }

    setPendingFiles(validFiles)
    setShowUploadPreview(true)
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
    if (canUserUpload(currentUser) && dropZoneRef.current) {
      dropZoneRef.current.classList.add('drag-over')
    }
  }

  const handleDragLeave = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('drag-over')
    }
  }

  const handleUpload = async () => {
    if (pendingFiles.length === 0 || !currentUser) return

    const updatedSubmissions = { ...submissions }
    const monthData = updatedSubmissions[currentMonthKey] || { submissions: [] }
    
    const uploadedCount = pendingFiles.length

    for (const file of pendingFiles) {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          compressImage(result, (compressed) => {
            resolve(compressed)
          })
        }
        reader.readAsDataURL(file)
      })

      const photoTitle = uploadTitle.trim() || file.name.replace(/\.[^/.]+$/, '')
      const currentExcursion = getCurrentMonthExcursion()

      const submission: FotoSubmission = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        photographer: currentUser,
        title: photoTitle,
        imageSrc: base64,
        votes: [],
        uploadDate: new Date().toISOString(),
        excursionId: currentExcursion ? currentExcursion.id : null,
        excursionTitle: currentExcursion ? currentExcursion.title : null,
        excursionLocation: currentExcursion ? currentExcursion.location : null,
        excursionDate: currentExcursion ? currentExcursion.date : null
      }

      monthData.submissions.push(submission)
    }

    updatedSubmissions[currentMonthKey] = monthData
    saveSubmissions(updatedSubmissions)
    setSubmissions(updatedSubmissions)

    setPendingFiles([])
    setShowUploadPreview(false)
    setUploadTitle('')
    if (fileInputRef.current) fileInputRef.current.value = ''

    alert(`${uploadedCount} foto${uploadedCount === 1 ? '' : '\'s'} ingezonden!`)
  }

  const handleVote = (fotoId: string) => {
    if (!currentUser) {
      alert('Je moet ingelogd zijn om te stemmen.')
      return
    }

    const updatedSubmissions = { ...submissions }
    const monthData = updatedSubmissions[currentMonthKey] || { submissions: [] }
    
    const submission = monthData.submissions.find(s => s.id === fotoId)
    if (!submission) return

    const votes = submission.votes || []
    const hasVoted = votes.includes(currentUser)

    if (hasVoted) {
      submission.votes = votes.filter(v => v !== currentUser)
    } else {
      submission.votes = [...votes, currentUser]
    }

    updatedSubmissions[currentMonthKey] = monthData
    saveSubmissions(updatedSubmissions)
    setSubmissions(updatedSubmissions)
  }

  const openModal = (submission: FotoSubmission) => {
    setModalImage(submission.imageSrc)
    setModalTitle(submission.title)
    setModalPhotographer(submission.photographer)
    const uploadDate = new Date(submission.uploadDate)
    setModalDate(uploadDate.toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' }))
    setShowModal(true)
  }

  const sortedSubmissions = [...monthData.submissions].sort((a, b) => {
    return (b.votes || []).length - (a.votes || []).length
  })

  const archived = Object.keys(submissions)
    .filter(key => {
      const data = submissions[key]
      return data.winner && key !== currentMonthKey
    })
    .map(key => ({
      key,
      ...submissions[key].winner!
    }))
    .sort((a, b) => {
      const yearA = parseInt(a.key.split('-')[0])
      const monthA = parseInt(a.key.split('-')[1])
      const yearB = parseInt(b.key.split('-')[0])
      const monthB = parseInt(b.key.split('-')[1])
      if (yearA !== yearB) return yearB - yearA
      return monthB - monthA
    })

  const monthName = getMonthName(currentMonthKey)
  const year = currentMonthKey.split('-')[0]

  return (
    <section className="foto-van-de-maand-page">
      <div className="container">
        <div className="section-header">
          <h1>Foto van de Maand</h1>
          <p className="section-subtitle">De mooiste foto's van onze leden</p>
        </div>

        {/* Current Winner */}
        <div className="foto-van-de-maand-current" id="currentFoto">
          {winner ? (
            <div className="foto-van-de-maand-image-container">
              <img
                src={winner.imageSrc}
                alt={winner.title || 'Foto'}
                className="foto-van-de-maand-image"
                onClick={() => openModal(winner)}
                style={{ cursor: 'pointer' }}
              />
              <div className="foto-van-de-maand-overlay">
                <div className="foto-van-de-maand-info">
                  <h2 className="foto-van-de-maand-title">{winner.title || 'Foto van de Maand'}</h2>
                  <p className="foto-van-de-maand-photographer">Door: {winner.photographer}</p>
                  {winner.excursionTitle && (
                    <p className="foto-van-de-maand-excursion">
                      📷 {winner.excursionTitle}{winner.excursionLocation ? ` - ${winner.excursionLocation}` : ''}
                    </p>
                  )}
                  <p className="foto-van-de-maand-date">{monthName} {year}</p>
                  <p className="foto-van-de-maand-votes">
                    {(winner.votes || []).length} {(winner.votes || []).length === 1 ? 'stem' : 'stemmen'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="foto-van-de-maand-image-container">
              <div className="foto-van-de-maand-placeholder">
                <p>Nog geen winnaar deze maand</p>
                <small>Stem op je favoriete foto!</small>
              </div>
              <div className="foto-van-de-maand-overlay">
                <div className="foto-van-de-maand-info">
                  <h2 className="foto-van-de-maand-title">Foto van de Maand</h2>
                  <p className="foto-van-de-maand-date">{monthName} {year}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Excursion Info */}
        {excursion && (
          <div className="foto-van-de-maand-excursion-info">
            <h2>Excursie van deze Maand</h2>
            <div className="excursion-details">
              <div className="excursion-card">
                <div className="excursion-icon">{excursion.icon || '📷'}</div>
                <div className="excursion-content">
                  <h3>{excursion.title || 'Excursie'}</h3>
                  <p className="excursion-date">
                    📅 {formatDate(excursion.date)}{excursion.time ? ` om ${excursion.time}` : ''}
                  </p>
                  {excursion.location && (
                    <p className="excursion-location">📍 {excursion.location}</p>
                  )}
                  {excursion.description && (
                    <p className="excursion-description">{excursion.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Section */}
        {isLoggedIn && (
          <div className="foto-van-de-maand-upload-section">
            <h2>Stuur je foto in voor deze maand</h2>
            <p className="upload-info">Upload maximaal 5 foto's per maand van de excursie. Alleen mogelijk in de huidige maand.</p>
            <div className="upload-count">
              {userSubmissions.length === 0 ? (
                <p className="upload-count-text">Je hebt nog geen foto's ingezonden deze maand. Je kunt nog <strong>5 foto's</strong> uploaden.</p>
              ) : (
                <p className="upload-count-text">
                  Je hebt <strong>{userSubmissions.length}</strong> foto{userSubmissions.length === 1 ? '' : '\'s'} ingezonden. Je kunt nog <strong>{remaining}</strong> foto{remaining === 1 ? '' : '\'s'} uploaden.
                </p>
              )}
              {remaining === 0 && (
                <p className="upload-count-text error">Je hebt het maximum van 5 foto's bereikt voor deze maand.</p>
              )}
            </div>

            {remaining > 0 && (
              <>
                <div
                  ref={dropZoneRef}
                  className={`foto-van-de-maand-dropzone ${remaining === 0 ? 'disabled' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  style={{ opacity: remaining === 0 ? 0.5 : 1, pointerEvents: remaining === 0 ? 'none' : 'auto' }}
                >
                  <div className="dropzone-content">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <p>Sleep foto's hierheen of klik om te selecteren</p>
                    <small>JPEG bestanden, max 5MB per foto, maximaal 5 foto's deze maand</small>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="fotoUploadInput"
                    multiple
                    accept="image/jpeg,image/jpg"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileSelect(e.target.files)}
                  />
                </div>

                {showUploadPreview && (
                  <div className="foto-van-de-maand-upload-preview">
                    <h3>Te uploaden foto's:</h3>
                    <div className="foto-van-de-maand-preview-grid">
                      {pendingFiles.map((file, index) => (
                        <div key={index} className="preview-item">
                          <img src={URL.createObjectURL(file)} alt={file.name} />
                          <p>{file.name}</p>
                          <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                        </div>
                      ))}
                    </div>
                    <div className="form-group">
                      <label htmlFor="uploadFotoTitle">Titel voor alle foto's (optioneel)</label>
                      <input
                        type="text"
                        id="uploadFotoTitle"
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
                        Foto's Inzenden
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Submitted Fotos */}
        <div className="foto-van-de-maand-submitted">
          <h2>Ingezonden Foto's van deze Maand</h2>
          <div className="foto-van-de-maand-submitted-grid">
            {sortedSubmissions.length === 0 ? (
              <p className="no-fotos">Nog geen foto's ingezonden deze maand.</p>
            ) : (
              sortedSubmissions.map((submission) => {
                const voteCount = (submission.votes || []).length
                const hasVoted = currentUser && (submission.votes || []).includes(currentUser)
                const isOwnPhoto = currentUser && submission.photographer === currentUser

                return (
                  <div key={submission.id} className="foto-van-de-maand-submission-item">
                    <div className="submission-image-container">
                      <img
                        src={submission.imageSrc}
                        alt={submission.title || 'Foto'}
                        loading="lazy"
                        onClick={() => openModal(submission)}
                        style={{ cursor: 'pointer' }}
                      />
                      {voteCount > 0 && (
                        <div className="vote-badge">
                          {voteCount} {voteCount === 1 ? 'stem' : 'stemmen'}
                        </div>
                      )}
                    </div>
                    <div className="submission-info">
                      <h3>{submission.title || 'Foto'}</h3>
                      <p>Door: {submission.photographer}</p>
                      {submission.excursionTitle && (
                        <p className="submission-excursion">
                          📷 {submission.excursionTitle}{submission.excursionLocation ? ` - ${submission.excursionLocation}` : ''}
                        </p>
                      )}
                      {currentUser && !isOwnPhoto && (
                        <button
                          className={`btn-vote ${hasVoted ? 'voted' : ''}`}
                          onClick={() => handleVote(submission.id)}
                        >
                          {hasVoted ? '✓ Gestemd' : 'Stem op deze foto'}
                        </button>
                      )}
                      {isOwnPhoto && <p className="own-photo">Je eigen foto</p>}
                      {!currentUser && <p className="login-to-vote">Log in om te stemmen</p>}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Archive */}
        <div className="foto-van-de-maand-archive">
          <h2 className="archive-title">Archief - Winnaars</h2>
          <div className="foto-van-de-maand-grid">
            {archived.length === 0 ? (
              <p className="no-fotos">Nog geen archief beschikbaar.</p>
            ) : (
              archived.map((foto) => {
                const monthName = getMonthName(foto.key)
                const year = foto.key.split('-')[0]

                return (
                  <div key={foto.key} className="foto-van-de-maand-item">
                    <div className="foto-van-de-maand-item-image">
                      <img
                        src={foto.imageSrc}
                        alt={foto.title || 'Foto'}
                        loading="lazy"
                        onClick={() => openModal(foto)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    <div className="foto-van-de-maand-item-info">
                      <h3>{foto.title || 'Foto van de Maand'}</h3>
                      <p>Door: {foto.photographer || 'Onbekend'}</p>
                      {foto.excursionTitle && (
                        <p className="foto-excursion">
                          📷 {foto.excursionTitle}{foto.excursionLocation ? ` - ${foto.excursionLocation}` : ''}
                        </p>
                      )}
                      <p className="foto-date">{monthName} {year}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && modalImage && (
        <div className="image-modal" id="fotoModal" onClick={() => setShowModal(false)}>
          <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img id="fotoModalImage" src={modalImage} alt={modalTitle} />
            <div className="modal-caption">
              <h3 id="fotoModalTitle">{modalTitle}</h3>
              <p id="fotoModalPhotographer">{modalPhotographer}</p>
              <p id="fotoModalDate">{modalDate}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
