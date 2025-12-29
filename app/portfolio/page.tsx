'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth, getCurrentUser } from '@/lib/auth'
import { loadPortfolioData, getPhotoId, getPhotoLikes, getPhotoComments, isPhotoLikedByUser, toggleLike, PortfolioPhoto } from '@/lib/portfolio'

function PortfolioContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isLoggedIn, currentUser } = useAuth()
  const memberName = searchParams.get('member') || ''
  
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [likes, setLikes] = useState<Record<string, string[]>>({})
  const [comments, setComments] = useState<Record<string, any[]>>({})
  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    if (!memberName) {
      router.push('/leden')
      return
    }

    // Load portfolio data using loadPortfolioData from portfolio-data.js
    const loadData = () => {
      try {
        // Try to use loadPortfolioData function from portfolio-data.js
        let portfolioData = null
        
        if (typeof window !== 'undefined' && (window as any).loadPortfolioData) {
          portfolioData = (window as any).loadPortfolioData(memberName)
        }
        
        // Fallback to localStorage if function not available
        if (!portfolioData) {
          const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}')
          const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}')
          const hiddenPhotos = JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}')
          
          const memberData = userData[memberName] || []
          const memberOrder = orderData[memberName] || []
          const hiddenForMember = hiddenPhotos[memberName] || []
          
          const visiblePhotos = memberData.filter((photo: PortfolioPhoto) => {
            return !hiddenForMember.some((hiddenSrc: string) => photo.src === hiddenSrc)
          })
          
          const orderedPhotos = memberOrder
            .map((src: string) => visiblePhotos.find((p: PortfolioPhoto) => p.src === src))
            .filter(Boolean)
            .concat(visiblePhotos.filter((p: PortfolioPhoto) => !memberOrder.includes(p.src)))
          
          portfolioData = {
            name: memberName,
            photos: orderedPhotos
          }
        }
        
        if (portfolioData && portfolioData.photos) {
          setPhotos(portfolioData.photos)
          
          // Load likes and comments
          const likesData: Record<string, string[]> = {}
          const commentsData: Record<string, any[]> = {}
          
          portfolioData.photos.forEach((photo: PortfolioPhoto) => {
            const photoId = getPhotoId(photo.src)
            likesData[photoId] = getPhotoLikes(photoId)
            commentsData[photoId] = getPhotoComments(photoId)
          })
          
          setLikes(likesData)
          setComments(commentsData)
        }
      } catch (e) {
        console.error('Error loading portfolio:', e)
      }
    }
    
    // Wait a bit for portfolio-data.js to load
    const timer = setTimeout(() => {
      loadData()
    }, 100)
    
    loadData()
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadData()
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [memberName, router])

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setShowModal(true)
    setShowComments(false)
  }

  const closeModal = () => {
    setShowModal(false)
    setShowComments(false)
  }

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
    setShowComments(false)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    setShowComments(false)
  }

  const handleLike = () => {
    if (!isLoggedIn || !currentUser) {
      alert('Je moet ingelogd zijn om foto\'s te liken.')
      return
    }

    const currentPhoto = photos[currentIndex]
    if (!currentPhoto) return

    const photoId = getPhotoId(currentPhoto.src)
    toggleLike(photoId, currentUser)
    
    // Update local state
    const updatedLikes = { ...likes }
    updatedLikes[photoId] = getPhotoLikes(photoId)
    setLikes(updatedLikes)
  }

  const handleAddComment = () => {
    if (!isLoggedIn || !currentUser || !commentText.trim()) return

    const currentPhoto = photos[currentIndex]
    if (!currentPhoto) return

    const photoId = getPhotoId(currentPhoto.src)
    const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}')
    
    if (!commentsData[photoId]) {
      commentsData[photoId] = []
    }

    const comment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user: currentUser,
      text: commentText.trim(),
      date: new Date().toISOString(),
      replies: []
    }

    commentsData[photoId].push(comment)
    localStorage.setItem('photoComments', JSON.stringify(commentsData))

    setCommentText('')
    
    // Update local state
    const updatedComments = { ...comments }
    updatedComments[photoId] = getPhotoComments(photoId)
    setComments(updatedComments)
  }

  const currentPhoto = photos[currentIndex]
  const currentPhotoId = currentPhoto ? getPhotoId(currentPhoto.src) : ''
  const currentLikes = likes[currentPhotoId] || []
  const currentComments = comments[currentPhotoId] || []
  const isLiked = currentPhoto ? isPhotoLikedByUser(currentPhotoId, currentUser) : false

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-NL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <section className="portfolio-page">
      <div className="container">
        <div className="section-header">
          <h1 id="memberName">{memberName || 'Portfolio'}</h1>
          <p className="section-subtitle">Bekijk het werk van deze fotograaf</p>
        </div>

        {photos.length === 0 ? (
          <div style={{ padding: '3rem 0', textAlign: 'center' }}>
            <p>Geen foto's gevonden voor dit portfolio.</p>
            <Link href="/leden" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Terug naar Leden
            </Link>
          </div>
        ) : (
          <>
            <div className="portfolio-gallery">
              {photos.map((photo, index) => {
                const photoId = getPhotoId(photo.src)
                const photoLikes = likes[photoId] || []
                const photoComments = comments[photoId] || []
                const totalComments = photoComments.length + photoComments.reduce((sum, c) => sum + (c.replies?.length || 0), 0)

                return (
                  <div
                    key={index}
                    className="portfolio-item"
                    onClick={() => openModal(index)}
                  >
                    <div className="portfolio-item-image">
                      <img
                        src={photo.src.startsWith('data:') ? photo.src : `/${photo.src}`}
                        alt={photo.title || 'Foto'}
                        loading="lazy"
                      />
                      <div className="portfolio-item-overlay">
                        <div className="portfolio-item-info">
                          <h3>{photo.title || 'Foto'}</h3>
                          {photoLikes.length > 0 && (
                            <span className="portfolio-item-likes">❤️ {photoLikes.length}</span>
                          )}
                          {totalComments > 0 && (
                            <span className="portfolio-item-comments">💬 {totalComments}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="portfolio-back">
              <Link href="/leden" className="btn btn-primary">Terug naar Leden</Link>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && currentPhoto && (
        <div className="image-modal" id="imageModal" onClick={closeModal}>
          <span className="modal-close" onClick={closeModal}>&times;</span>
          <span className="modal-prev" onClick={(e) => { e.stopPropagation(); prevPhoto(); }}>&#10094;</span>
          <span className="modal-next" onClick={(e) => { e.stopPropagation(); nextPhoto(); }}>&#10095;</span>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              id="modalImage"
              src={currentPhoto.src.startsWith('data:') ? currentPhoto.src : `/${currentPhoto.src}`}
              alt={currentPhoto.title || 'Foto'}
            />
            <div className="modal-caption">
              <h3 id="modalTitle">{currentPhoto.title || 'Foto'}</h3>
              <p id="modalCounter">{currentIndex + 1} / {photos.length}</p>
            </div>
            
            {isLoggedIn && (
              <div className="modal-social">
                <div className="modal-social-actions">
                  <button
                    className={`btn-like ${isLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                  >
                    <span className="like-icon">{isLiked ? '❤️' : '♡'}</span>
                    <span className="like-count">{currentLikes.length}</span>
                  </button>
                  <button
                    className="btn-comment"
                    onClick={() => setShowComments(!showComments)}
                  >
                    <span className="comment-icon">💬</span>
                    <span className="comment-count">
                      {currentComments.length + currentComments.reduce((sum, c) => sum + (c.replies?.length || 0), 0)}
                    </span>
                  </button>
                </div>
                
                {showComments && (
                  <div className="modal-comments">
                    <div className="comments-list">
                      {currentComments.length === 0 ? (
                        <p style={{ padding: '1rem', color: '#888' }}>Nog geen reacties. Wees de eerste!</p>
                      ) : (
                        currentComments.map((comment) => (
                          <div key={comment.id} className="comment-item">
                            <div className="comment-header">
                              <strong>{comment.user}</strong>
                              <span className="comment-date">{formatDate(comment.date)}</span>
                            </div>
                            <div className="comment-text">{comment.text}</div>
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="comment-replies">
                                {comment.replies.map((reply: any) => (
                                  <div key={reply.id} className="comment-reply">
                                    <div className="comment-header">
                                      <strong>{reply.user}</strong>
                                      <span className="comment-date">{formatDate(reply.date)}</span>
                                    </div>
                                    <div className="comment-text">{reply.text}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                    <div className="comment-form">
                      <input
                        type="text"
                        id="commentInput"
                        placeholder="Schrijf een reactie..."
                        maxLength={500}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddComment()
                          }
                        }}
                      />
                      <button onClick={handleAddComment}>Plaatsen</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center' }}>Laden...</div>}>
      <PortfolioContent />
    </Suspense>
  )
}
