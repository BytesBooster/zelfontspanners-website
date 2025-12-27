'use client'

import React, { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth, getCurrentUser } from '@/lib/auth'
import { loadPortfolioData, getPhotoId, getPhotoLikes, getPhotoComments, isPhotoLikedByUser, toggleLike, PortfolioPhoto } from '@/lib/portfolio'
import { PortfolioPhoto as SupabasePortfolioPhoto } from '@/lib/supabase'
import { getMemberPhoto, getInitials } from '@/lib/members'
import { getMemberPhotos, addPhotoComment, getBatchPhotoLikes, getBatchPhotoComments } from '@/lib/supabase'

// Portfolio Item Component - zorgt ervoor dat deze opnieuw wordt gerenderd wanneer likes/comments veranderen
function PortfolioItem({ 
  photo, 
  index, 
  photoLikes, 
  totalComments, 
  isLoggedIn, 
  onOpenModal 
}: { 
  photo: PortfolioPhoto
  index: number
  photoLikes: string[]
  totalComments: number
  isLoggedIn: boolean
  onOpenModal: (index: number) => void
}) {
  // Force re-render door de waarden expliciet te gebruiken
  const likesCount = photoLikes.length
  const commentsCount = totalComments
  
  return (
    <div
      className="portfolio-item"
      onClick={() => onOpenModal(index)}
    >
      <div className="portfolio-item-image">
        <img
          src={photo.src.startsWith('data:') || photo.src.startsWith('http') ? photo.src : `/${photo.src}`}
          alt={photo.title || 'Foto'}
          loading="lazy"
        />
        <div className="portfolio-item-overlay">
          <div className="portfolio-item-info">
            <h3>{photo.title || 'Foto'}</h3>
            {isLoggedIn && (
              <div className="portfolio-item-social">
                <span className="portfolio-item-likes">❤️ {likesCount}</span>
                <span className="portfolio-item-comments">💬 {commentsCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PortfolioContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isLoggedIn, currentUser, checkAuth } = useAuth()
  const memberName = searchParams.get('member') || ''
  
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [likes, setLikes] = useState<Record<string, string[]>>({})
  const [comments, setComments] = useState<Record<string, any[]>>({})
  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [renderKey, setRenderKey] = useState(0)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [authChecked, setAuthChecked] = useState(false)
  const modalImageRef = useRef<HTMLImageElement>(null)
  const modalSocialRef = useRef<HTMLDivElement>(null)
  const modalContainerRef = useRef<HTMLDivElement>(null)

  // Stabiliseer auth state om flickering te voorkomen
  useEffect(() => {
    checkAuth()
    
    const timeoutId = setTimeout(() => {
      setAuthChecked(true)
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [checkAuth])

  const nextPhoto = async () => {
    const newIndex = (currentIndex + 1) % photos.length
    setCurrentIndex(newIndex)
    // Laad likes/comments voor de nieuwe foto
    const photo = photos[newIndex]
    if (photo) {
      const photoId = getPhotoIdForPhoto(photo)
      const photoLikes = await getPhotoLikes(photoId)
      const photoComments = await getPhotoComments(photoId)
      setLikes(prev => ({ ...prev, [photoId]: photoLikes }))
      setComments(prev => ({ ...prev, [photoId]: photoComments }))
    }
    // Comments blijven open
  }

  const prevPhoto = async () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length
    setCurrentIndex(newIndex)
    // Laad likes/comments voor de nieuwe foto
    const photo = photos[newIndex]
    if (photo) {
      const photoId = getPhotoIdForPhoto(photo)
      const photoLikes = await getPhotoLikes(photoId)
      const photoComments = await getPhotoComments(photoId)
      setLikes(prev => ({ ...prev, [photoId]: photoLikes }))
      setComments(prev => ({ ...prev, [photoId]: photoComments }))
    }
    // Comments blijven open
  }

  const closeModal = () => {
    setShowModal(false)
    setShowComments(false)
  }

  // Keyboard navigation voor modal
  useEffect(() => {
    if (!showModal) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevPhoto()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextPhoto()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showModal, photos.length, currentIndex])

  // Synchroniseer de breedte van de social sectie met de afbeelding
  useEffect(() => {
    if (!showModal || !modalImageRef.current || !modalSocialRef.current || !modalContainerRef.current) return

    const syncWidth = () => {
      const img = modalImageRef.current
      const social = modalSocialRef.current
      const container = modalContainerRef.current
      
      if (img && social && container) {
        // Wacht tot de afbeelding volledig is geladen
        if (img.complete && img.naturalWidth > 0) {
          const imgWidth = img.offsetWidth
          if (imgWidth > 0) {
            social.style.width = `${imgWidth}px`
            container.style.width = `${imgWidth}px`
          }
        } else {
          // Als de afbeelding nog niet is geladen, wacht op het load event
          img.onload = () => {
            const imgWidth = img.offsetWidth
            if (imgWidth > 0) {
              social.style.width = `${imgWidth}px`
              container.style.width = `${imgWidth}px`
            }
          }
        }
      }
    }

    // Voer synchronisatie uit na een korte delay om ervoor te zorgen dat de DOM is bijgewerkt
    const timeoutId = setTimeout(syncWidth, 100)
    
    // Luister ook naar resize events
    window.addEventListener('resize', syncWidth)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', syncWidth)
    }
  }, [showModal, currentIndex, photos])

  useEffect(() => {
    if (!memberName) {
      router.push('/leden')
      return
    }

    // Load portfolio data - eerst van Supabase, dan fallback naar andere bronnen
    const loadData = async () => {
      try {
        let portfolioData = null
        
        // Probeer eerst foto's van Supabase te laden
        const supabasePhotos = await getMemberPhotos(memberName)
        if (supabasePhotos.length > 0) {
          // Converteer Supabase data naar portfolio formaat
          // Bewaar ook de public_id en id voor correcte photoId matching
          const portfolioPhotos = supabasePhotos.map((photo) => ({
            src: photo.cloudinary_url,
            title: photo.title,
            category: 'all',
            isUserUploaded: true,
            cloudinary_public_id: photo.cloudinary_public_id,
            photo_id: photo.id, // Bewaar Supabase id voor referentie
          }))
          portfolioData = {
            name: memberName,
            photos: portfolioPhotos
          }
        }
        
        // Als geen Supabase foto's, probeer andere bronnen
        if (!portfolioData && typeof window !== 'undefined') {
          // Try the new wrapper function first
          if ((window as any).loadPortfolioData) {
            portfolioData = (window as any).loadPortfolioData(memberName)
          }
          
          // Fallback: try loading all data and extracting member data
          if (!portfolioData && (window as any).loadAllPortfolioData) {
            const allData = (window as any).loadAllPortfolioData()
            if (allData && allData[memberName]) {
              portfolioData = {
                name: allData[memberName].name,
                photos: allData[memberName].photos || []
              }
            }
          }
          
          // Fallback: try static data directly
          if (!portfolioData && (window as any).STATIC_PORTFOLIO_DATA) {
            const staticData = (window as any).STATIC_PORTFOLIO_DATA
            if (staticData[memberName]) {
              portfolioData = {
                name: staticData[memberName].name,
                photos: staticData[memberName].photos || []
              }
            }
          }
        }
        
        // Final fallback to localStorage if function not available
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
          // Maak een nieuwe array referentie om ervoor te zorgen dat React de wijziging detecteert
          setPhotos([...portfolioData.photos])
        } else {
          console.warn('No portfolio data found for:', memberName)
        }
      } catch (e) {
        console.error('Error loading portfolio:', e)
      }
    }
    
    loadData()
    
    // Also check for portfolio-data.js for static photos
    let attempts = 0
    const maxAttempts = 10
    let timeoutId: NodeJS.Timeout | null = null
    
    const checkAndLoad = () => {
      if (typeof window !== 'undefined' && ((window as any).loadPortfolioData || (window as any).loadAllPortfolioData || (window as any).STATIC_PORTFOLIO_DATA)) {
        // Reload to merge static photos with Supabase photos
        loadData()
      } else if (attempts < maxAttempts) {
        attempts++
        timeoutId = setTimeout(checkAndLoad, 200)
      }
    }
    
    // Start checking for static photos
    checkAndLoad()
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadData()
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [memberName, router])

  // Helper functie om public_id te extraheren uit Cloudinary URL
  const extractPublicIdFromUrl = (url: string): string => {
    try {
      // Format: https://res.cloudinary.com/cloud_name/image/upload/v123/public_id.jpg
      const urlObj = new URL(url)
      const pathParts = urlObj.pathname.split('/')
      const uploadIndex = pathParts.indexOf('upload')
      
      if (uploadIndex !== -1 && pathParts.length > uploadIndex + 2) {
        // Skip 'v123' versie nummer, neem alles daarna en verwijder extensie
        const publicId = pathParts.slice(uploadIndex + 2).join('/').replace(/\.[^/.]+$/, '')
        return publicId
      }
    } catch (e) {
      // Ignore
    }
    return ''
  }

  // Helper functie om consistent photoId te berekenen
  const getPhotoIdForPhoto = (photo: PortfolioPhoto): string => {
    if ((photo as any).cloudinary_public_id) {
      return (photo as any).cloudinary_public_id
    } else if (photo.src.includes('cloudinary.com')) {
      const extracted = extractPublicIdFromUrl(photo.src)
      return extracted || getPhotoId(photo.src)
    } else {
      return getPhotoId(photo.src)
    }
  }

  // Ref om bij te houden welke loading actief is
  const loadingIdRef = useRef(0)
  const photosRef = useRef<string>('')
  const loadingPromiseRef = useRef<Promise<void> | null>(null)
  
  // Load likes and comments wanneer photos veranderen
  useEffect(() => {
    if (photos.length === 0) {
      console.log('No photos to load likes/comments for')
      return
    }

    // Check of photos daadwerkelijk zijn veranderd
    const photosKey = photos.map(p => getPhotoIdForPhoto(p)).join(',')
    if (photosRef.current === photosKey) {
      console.log('Photos unchanged, skipping...')
      return
    }

    // Verhoog loading ID om vorige loadings te annuleren
    loadingIdRef.current += 1
    const currentLoadingId = loadingIdRef.current
    photosRef.current = photosKey

    console.log('Loading likes/comments for', photos.length, 'photos (loadingId:', currentLoadingId, ')')
    
    const loadLikesAndComments = async () => {
      // Check of deze loading nog actief is
      if (loadingIdRef.current !== currentLoadingId) {
        console.log('Loading cancelled (new loading started)')
        return
      }
      
      // Verzamel alle photo IDs
      const photoIds = photos.map(photo => getPhotoIdForPhoto(photo))
      
      try {
        // Laad alle likes en comments in parallel met batch requests
        const [likesMap, commentsMap] = await Promise.all([
          getBatchPhotoLikes(photoIds),
          getBatchPhotoComments(photoIds)
        ])
        
        // Check opnieuw of deze loading nog actief is
        if (loadingIdRef.current === currentLoadingId) {
          // Update state in één keer voor alle foto's
          setLikes(prev => {
            const updated = { ...prev, ...likesMap }
            return updated
          })
          setComments(prev => {
            const updated = { ...prev, ...commentsMap }
            return updated
          })
        }
      } catch (error) {
        if (loadingIdRef.current === currentLoadingId) {
          console.error('Error loading batch likes/comments:', error)
          // Fallback: laad individueel als batch faalt
          console.log('Falling back to individual loading...')
          for (let i = 0; i < photos.length; i++) {
            if (loadingIdRef.current !== currentLoadingId) break
            
            const photo = photos[i]
            const photoId = getPhotoIdForPhoto(photo)
            
            try {
              const photoLikes = await getPhotoLikes(photoId)
              const photoComments = await getPhotoComments(photoId)
              
              if (loadingIdRef.current === currentLoadingId) {
                setLikes(prev => ({ ...prev, [photoId]: photoLikes }))
                setComments(prev => ({ ...prev, [photoId]: photoComments }))
              }
            } catch (err) {
              console.error('Error loading likes/comments for photo:', photoId, err)
            }
          }
        }
      }
    }
    
    // Sla de promise op zodat we kunnen wachten tot deze is voltooid
    loadingPromiseRef.current = loadLikesAndComments()
    loadingPromiseRef.current.catch(err => {
      console.error('Error in loadLikesAndComments:', err)
    })
  }, [photos])

  // Debounce re-render wanneer likes of comments veranderen om knipperen te voorkomen
  useEffect(() => {
    const likesKeys = Object.keys(likes).length
    const commentsKeys = Object.keys(comments).length
    if (likesKeys > 0 || commentsKeys > 0) {
      // Debounce de renderKey update om te voorkomen dat er te veel re-renders zijn
      const timeoutId = setTimeout(() => {
        setRenderKey(prev => prev + 1)
      }, 100) // Wacht 100ms voordat we re-renderen
      
      return () => clearTimeout(timeoutId)
    }
  }, [likes, comments])

  const openModal = async (index: number) => {
    setCurrentIndex(index)
    setShowModal(true)
    setShowComments(true) // Automatisch comments uitklappen
    
    // Laad likes/comments voor deze foto direct als ze nog niet beschikbaar zijn
    const photo = photos[index]
    if (photo) {
      const photoId = getPhotoIdForPhoto(photo)
      
      // Laad altijd likes/comments voor deze foto om ervoor te zorgen dat ze beschikbaar zijn
      const photoLikes = await getPhotoLikes(photoId)
      const photoComments = await getPhotoComments(photoId)
      
      setLikes(prev => ({ ...prev, [photoId]: photoLikes }))
      setComments(prev => ({ ...prev, [photoId]: photoComments }))
    }
  }


  const handleLike = async () => {
    if (!stableIsLoggedIn || !currentUser) {
      alert('Je moet ingelogd zijn om foto\'s te liken.')
      return
    }

    const currentPhoto = photos[currentIndex]
    if (!currentPhoto) return

    const photoId = getPhotoIdForPhoto(currentPhoto)
    
    await toggleLike(photoId, currentUser)
    
    // Update local state
    const updatedLikes = { ...likes }
    updatedLikes[photoId] = await getPhotoLikes(photoId)
    setLikes(updatedLikes)
  }

  const handleAddComment = async () => {
    if (!stableIsLoggedIn || !currentUser || !commentText.trim()) return

    const currentPhoto = photos[currentIndex]
    if (!currentPhoto) return

    const photoId = getPhotoIdForPhoto(currentPhoto)
    
    const comment = await addPhotoComment(photoId, currentUser, commentText.trim())
    
    if (comment) {
      setCommentText('')
      
      // Update local state
      const updatedComments = { ...comments }
      updatedComments[photoId] = await getPhotoComments(photoId)
      setComments(updatedComments)
    }
  }

  const handleAddReply = async (parentCommentId: string) => {
    if (!stableIsLoggedIn || !currentUser || !replyText.trim()) return

    const currentPhoto = photos[currentIndex]
    if (!currentPhoto) return

    const photoId = getPhotoIdForPhoto(currentPhoto)
    
    const reply = await addPhotoComment(photoId, currentUser, replyText.trim(), parentCommentId)
    
    if (reply) {
      setReplyText('')
      setReplyingTo(null)
      
      // Update local state
      const updatedComments = { ...comments }
      updatedComments[photoId] = await getPhotoComments(photoId)
      setComments(updatedComments)
    }
  }

  const currentPhoto = photos[currentIndex]
  const currentPhotoId = currentPhoto ? getPhotoIdForPhoto(currentPhoto) : ''
  
  // Gebruik useMemo om ervoor te zorgen dat currentLikes en currentComments worden geüpdatet wanneer de state verandert
  const currentLikes = React.useMemo(() => {
    return currentPhotoId ? (likes[currentPhotoId] || []) : []
  }, [currentPhotoId, likes])
  
  const currentComments = React.useMemo(() => {
    return currentPhotoId ? (comments[currentPhotoId] || []) : []
  }, [currentPhotoId, comments])
  const [isLiked, setIsLiked] = useState(false)
  
  useEffect(() => {
    if (currentPhotoId && currentUser) {
      isPhotoLikedByUser(currentPhotoId, currentUser).then(setIsLiked)
    } else {
      setIsLiked(false)
    }
  }, [currentPhotoId, currentUser])

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Onbekende datum'
    
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return 'Onbekende datum'
      }
      return date.toLocaleDateString('nl-NL', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (e) {
      return 'Onbekende datum'
    }
  }

  const memberPhoto = memberName ? getMemberPhoto(memberName) : ''
  const photoCount = photos.length

  // Gebruik alleen isLoggedIn na auth check om flickering te voorkomen
  const stableIsLoggedIn = authChecked ? isLoggedIn : false

  return (
    <section className="portfolio-page">
      <div className="container">
        <div className="section-header">
          <h1 id="memberName">{memberName || 'Portfolio'}</h1>
          <p className="section-subtitle">Bekijk het werk van deze fotograaf</p>
        </div>

        {/* Member Info Card */}
        {memberName && (
          <div className="portfolio-member-card">
            <div className="portfolio-member-photo">
              {memberPhoto.startsWith('http') ? (
                <img
                  src={memberPhoto}
                  alt={memberName}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(memberName)}&size=150&background=1a1a1a&color=d4af37&bold=true&font-size=0.5`
                  }}
                />
              ) : (
                <Image
                  src={memberPhoto}
                  alt={memberName}
                  width={150}
                  height={150}
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(memberName)}&size=150&background=1a1a1a&color=d4af37&bold=true&font-size=0.5`
                  }}
                />
              )}
            </div>
            <div className="portfolio-member-details">
              <h2>{memberName}</h2>
              <p className="portfolio-photo-count">{photoCount} foto{photoCount !== 1 ? "'s" : ''}</p>
            </div>
          </div>
        )}

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
                const photoId = getPhotoIdForPhoto(photo)
                // Gebruik de state direct - React zal automatisch opnieuw renderen wanneer de state verandert
                const photoLikes = likes[photoId] || []
                const photoComments = comments[photoId] || []
                const totalComments = photoComments.length + photoComments.reduce((sum, c) => sum + (c.replies?.length || 0), 0)

                // Gebruik alleen photoId en counts in de key - React zal automatisch re-renderen wanneer props veranderen
                return (
                  <PortfolioItem
                    key={`${photoId}-${photoLikes.length}-${totalComments}`}
                    photo={photo}
                    index={index}
                    photoLikes={photoLikes}
                    totalComments={totalComments}
                    isLoggedIn={stableIsLoggedIn}
                    onOpenModal={openModal}
                  />
                )
              })}
            </div>

            <div className="portfolio-back">
              <Link href="/leden" className="btn btn-primary">Terug naar Leden</Link>
            </div>
          </>
        )}
      </div>

      {/* Modal - Modern & Beautiful */}
      {showModal && photos.length > 0 && photos[currentIndex] && (
        <div className="image-modal" id="imageModal" onClick={closeModal}>
          <span 
            className="modal-close" 
            onClick={closeModal}
            title="Sluiten (ESC)"
            aria-label="Sluiten"
          >
            &times;
          </span>
          <button
            className="modal-prev" 
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            title="Vorige foto (←)"
            aria-label="Vorige foto"
          >
            <span className="modal-arrow-icon">&#10094;</span>
          </button>
          <button
            className="modal-next" 
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            title="Volgende foto (→)"
            aria-label="Volgende foto"
          >
            <span className="modal-arrow-icon">&#10095;</span>
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {photos[currentIndex] && (
              <div className="modal-image-container" ref={modalContainerRef}>
                <div className="modal-image-wrapper">
                  <img
                    id="modalImage"
                    ref={modalImageRef}
                    src={photos[currentIndex].src.startsWith('data:') || photos[currentIndex].src.startsWith('http') ? photos[currentIndex].src : `/${photos[currentIndex].src}`}
                    alt={photos[currentIndex].title || 'Foto'}
                    loading="eager"
                    onLoad={() => {
                      // Synchroniseer breedte wanneer afbeelding is geladen
                      if (modalImageRef.current && modalSocialRef.current && modalContainerRef.current) {
                        const imgWidth = modalImageRef.current.offsetWidth
                        if (imgWidth > 0) {
                          modalSocialRef.current.style.width = `${imgWidth}px`
                          modalContainerRef.current.style.width = `${imgWidth}px`
                        }
                      }
                    }}
                  />
                  <div className="modal-caption">
                    <h3 id="modalTitle">{photos[currentIndex].title || 'Foto'}</h3>
                    <p id="modalCounter">{currentIndex + 1} / {photos.length}</p>
                  </div>
                </div>
                
                {stableIsLoggedIn && (
                  <div className="modal-social" ref={modalSocialRef}>
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
                        currentComments.map((comment: any, index: number) => {
                          // Gebruik index als fallback key als id niet beschikbaar is
                          const commentKey = comment.id || `comment-${index}`
                          return (
                            <div key={commentKey} className="comment-item">
                              <div className="comment-header">
                                <strong>{comment.user || comment.user_name}</strong>
                                <span className="comment-date">{formatDate(comment.date || comment.created_at)}</span>
                              </div>
                              <div className="comment-text">{comment.text}</div>
                              {stableIsLoggedIn && (
                                <button 
                                  className="btn-reply"
                                  onClick={() => {
                                    const commentId = comment.id || commentKey
                                    setReplyingTo(replyingTo === commentId ? null : commentId)
                                  }}
                                >
                                  {replyingTo === (comment.id || commentKey) ? 'Annuleren' : 'Reageren'}
                                </button>
                              )}
                              {replyingTo === (comment.id || commentKey) && (
                                <div className="reply-form">
                                  <input
                                    type="text"
                                    className="reply-input"
                                    name="reply"
                                    autoComplete="off"
                                    placeholder="Schrijf een reactie..."
                                    maxLength={500}
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        handleAddReply(comment.id || commentKey)
                                      }
                                    }}
                                  />
                                  <div className="reply-form-actions">
                                    <button 
                                      className="btn-reply-submit"
                                      onClick={() => handleAddReply(comment.id || commentKey)}
                                    >
                                      Plaatsen
                                    </button>
                                    <button 
                                      className="btn-reply-cancel"
                                      onClick={() => {
                                        setReplyingTo(null)
                                        setReplyText('')
                                      }}
                                    >
                                      Annuleren
                                    </button>
                                  </div>
                                </div>
                              )}
                              {comment.replies && comment.replies.length > 0 && (
                                <div className="comment-replies">
                                  {comment.replies.map((reply: any, replyIndex: number) => {
                                    const replyKey = reply.id || `reply-${index}-${replyIndex}`
                                    return (
                                      <div key={replyKey} className="comment-reply">
                                        <div className="comment-header">
                                          <strong>{reply.user || reply.user_name}</strong>
                                          <span className="comment-date">{formatDate(reply.date || reply.created_at)}</span>
                                        </div>
                                        <div className="comment-text">{reply.text}</div>
                                      </div>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          )
                        })
                      )}
                    </div>
                    <div className="comment-form">
                      <input
                        type="text"
                        id="commentInput"
                        name="comment"
                        autoComplete="off"
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
