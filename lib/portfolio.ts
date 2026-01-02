'use client'

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

// Load portfolio data from API with fallback to portfolio-data.js
export async function loadPortfolioData(memberName: string): Promise<PortfolioData | null> {
  if (typeof window === 'undefined') return null
  
  try {
    // First try API (database)
    const response = await fetch(`/api/portfolio?memberName=${encodeURIComponent(memberName)}`)
    if (response.ok) {
      const data = await response.json()
      // If API returns photos, use it
      if (data && data.photos && data.photos.length > 0) {
        return data
      }
    }
    
    // Fallback to portfolio-data.js if API is empty or fails
    if (typeof window !== 'undefined' && typeof (window as any).loadPortfolioData === 'function') {
      const allPortfolioData = (window as any).loadPortfolioData()
      if (allPortfolioData && allPortfolioData[memberName]) {
        return {
          name: memberName,
          photos: allPortfolioData[memberName].photos || []
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error loading portfolio data:', error)
    
    // Fallback to portfolio-data.js on error
    if (typeof window !== 'undefined' && typeof (window as any).loadPortfolioData === 'function') {
      try {
        const allPortfolioData = (window as any).loadPortfolioData()
        if (allPortfolioData && allPortfolioData[memberName]) {
          return {
            name: memberName,
            photos: allPortfolioData[memberName].photos || []
          }
        }
      } catch (fallbackError) {
        console.error('Error loading portfolio from fallback:', fallbackError)
      }
    }
    
    return null
  }
}

// Get photo likes from API
export async function getPhotoLikes(photoId: string): Promise<string[]> {
  if (typeof window === 'undefined') return []
  
  try {
    const response = await fetch(`/api/portfolio/likes?photoId=${encodeURIComponent(photoId)}`)
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    return data.likes || []
  } catch (error) {
    console.error('Error loading likes:', error)
    return []
  }
}

// Get photo comments from API
export async function getPhotoComments(photoId: string): Promise<any[]> {
  if (typeof window === 'undefined') return []
  
  try {
    const response = await fetch(`/api/portfolio/comments?photoId=${encodeURIComponent(photoId)}`)
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    return data.comments || []
  } catch (error) {
    console.error('Error loading comments:', error)
    return []
  }
}

// Check if photo is liked by user
export async function isPhotoLikedByUser(photoId: string, currentUser: string | null): Promise<boolean> {
  if (!currentUser) return false
  const likes = await getPhotoLikes(photoId)
  return likes.includes(currentUser)
}

// Toggle like via API
export async function toggleLike(photoId: string, currentUser: string | null): Promise<void> {
  if (!currentUser || typeof window === 'undefined') return
  
  try {
    const response = await fetch('/api/portfolio/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoId, memberName: currentUser })
    })

    if (!response.ok) {
      console.error('Error toggling like:', response.statusText)
    }
  } catch (error) {
    console.error('Error toggling like:', error)
  }
}

// Add portfolio photo via API
export async function addPortfolioPhoto(memberName: string, photo: PortfolioPhoto): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  try {
    const response = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberName, photo })
    })

    return response.ok
  } catch (error) {
    console.error('Error adding portfolio photo:', error)
    return false
  }
}

// Delete portfolio photo via API
export async function deletePortfolioPhoto(memberName: string, photoSrc: string): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  try {
    const response = await fetch(`/api/portfolio?memberName=${encodeURIComponent(memberName)}&photoSrc=${encodeURIComponent(photoSrc)}`, {
      method: 'DELETE'
    })

    return response.ok
  } catch (error) {
    console.error('Error deleting portfolio photo:', error)
    return false
  }
}

// Update portfolio order via API
export async function updatePortfolioOrder(memberName: string, photoOrder: string[]): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  try {
    const response = await fetch('/api/portfolio', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberName, action: 'updateOrder', photoOrder })
    })

    return response.ok
  } catch (error) {
    console.error('Error updating portfolio order:', error)
    return false
  }
}

// Add comment via API
export async function addComment(photoId: string, memberName: string, comment: string): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  try {
    const response = await fetch('/api/portfolio/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoId, memberName, comment })
    })

    return response.ok
  } catch (error) {
    console.error('Error adding comment:', error)
    return false
  }
}
