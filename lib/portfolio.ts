'use client'

// This will load the portfolio data from the existing portfolio-data.js
// For now, we'll create a wrapper that can use the existing JS functions

export interface PortfolioPhoto {
  src: string
  title: string
  category?: string
  isUserUploaded?: boolean
}

export interface PortfolioData {
  name: string
  photos: PortfolioPhoto[]
}

declare global {
  interface Window {
    loadPortfolioData?: (memberName: string) => PortfolioData | null
    STATIC_PORTFOLIO_DATA?: Record<string, PortfolioData>
  }
}

export function loadPortfolioData(memberName: string): PortfolioData | null {
  if (typeof window === 'undefined') return null
  
  // Try to use existing function if available
  if (window.loadPortfolioData) {
    return window.loadPortfolioData(memberName)
  }
  
  // Fallback: load from localStorage userData
  try {
    const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}')
    const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}')
    const hiddenPhotos = JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}')
    
    const memberData = userData[memberName] || []
    const memberOrder = orderData[memberName] || []
    const hiddenForMember = hiddenPhotos[memberName] || []
    
    // Filter out hidden photos
    const visiblePhotos = memberData.filter((photo: PortfolioPhoto) => {
      return !hiddenForMember.some((hiddenSrc: string) => photo.src === hiddenSrc)
    })
    
    // Sort by order
    const orderedPhotos = memberOrder
      .map((src: string) => visiblePhotos.find((p: PortfolioPhoto) => p.src === src))
      .filter(Boolean)
      .concat(visiblePhotos.filter((p: PortfolioPhoto) => !memberOrder.includes(p.src)))
    
    return {
      name: memberName,
      photos: orderedPhotos
    }
  } catch (e) {
    console.error('Error loading portfolio data:', e)
    return null
  }
}

export function getPhotoId(photoSrc: string): string {
  if (!photoSrc) return ''
  
  if (photoSrc.startsWith('data:image')) {
    const hash = photoSrc.substring(0, 100).split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0)
    }, 0)
    return `base64_${Math.abs(hash)}`
  }
  
  let normalizedSrc = photoSrc
  try {
    if (photoSrc.includes('://')) {
      const url = new URL(photoSrc)
      normalizedSrc = url.pathname
    } else if (photoSrc.startsWith('//')) {
      normalizedSrc = photoSrc.substring(photoSrc.indexOf('/', 2))
    }
    normalizedSrc = normalizedSrc.replace(/^\/+/, '')
    normalizedSrc = normalizedSrc.split('?')[0].split('#')[0]
    normalizedSrc = normalizedSrc.replace(/\\/g, '/')
    normalizedSrc = normalizedSrc.replace(/\/+$/, '')
  } catch (e) {
    normalizedSrc = photoSrc.replace(/\\/g, '/').replace(/^\/+/, '').split('?')[0].split('#')[0]
  }
  
  return normalizedSrc.replace(/[^a-zA-Z0-9\/]/g, '_').replace(/\//g, '_')
}

export function getPhotoLikes(photoId: string): string[] {
  if (typeof window === 'undefined') return []
  const likesData = JSON.parse(localStorage.getItem('photoLikes') || '{}')
  return likesData[photoId] || []
}

export function getPhotoComments(photoId: string): any[] {
  if (typeof window === 'undefined') return []
  const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}')
  return commentsData[photoId] || []
}

export function isPhotoLikedByUser(photoId: string, currentUser: string | null): boolean {
  if (!currentUser) return false
  const likes = getPhotoLikes(photoId)
  return likes.includes(currentUser)
}

export function toggleLike(photoId: string, currentUser: string | null): void {
  if (!currentUser || typeof window === 'undefined') return
  
  const likesData = JSON.parse(localStorage.getItem('photoLikes') || '{}')
  if (!likesData[photoId]) {
    likesData[photoId] = []
  }
  
  const likes = likesData[photoId]
  const index = likes.indexOf(currentUser)
  
  if (index > -1) {
    likes.splice(index, 1)
  } else {
    likes.push(currentUser)
  }
  
  localStorage.setItem('photoLikes', JSON.stringify(likesData))
}
