'use client'

import { loadEvents, Event } from './agenda'

export interface FotoSubmission {
  id: string
  photographer: string
  title: string
  imageSrc: string
  votes: string[]
  uploadDate: string
  excursionId?: string | null
  excursionTitle?: string | null
  excursionLocation?: string | null
  excursionDate?: string | null
}

export interface MonthData {
  submissions: FotoSubmission[]
  winner?: FotoSubmission | null
}

// Load submissions from API
export async function loadSubmissions(): Promise<Record<string, MonthData>> {
  if (typeof window === 'undefined') return {}
  
  try {
    // Get current month and a few months back/forward
    const now = new Date()
    const months: Record<string, MonthData> = {}
    
    // Load last 3 months, current month, and next 3 months
    for (let i = -3; i <= 3; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1)
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const monthKey = `${year}-${String(month).padStart(2, '0')}`
      
      const response = await fetch(`/api/foto-van-de-maand?month=${month}&year=${year}`)
      if (response.ok) {
        const data = await response.json()
        months[monthKey] = {
          submissions: data.submissions || [],
          winner: data.winner || null
        }
      }
    }
    
    return months
  } catch (error) {
    console.error('Error loading submissions:', error)
    return {}
  }
}

// Load submissions for specific month
export async function loadSubmissionsForMonth(month: number, year: number): Promise<MonthData> {
  if (typeof window === 'undefined') return { submissions: [], winner: null }
  
  try {
    const response = await fetch(`/api/foto-van-de-maand?month=${month}&year=${year}`)
    if (!response.ok) {
      return { submissions: [], winner: null }
    }
    
    const data = await response.json()
    return {
      submissions: data.submissions || [],
      winner: data.winner || null
    }
  } catch (error) {
    console.error('Error loading submissions for month:', error)
    return { submissions: [], winner: null }
  }
}

// Save submission via API
export async function saveSubmission(submission: Omit<FotoSubmission, 'id' | 'uploadDate'>): Promise<FotoSubmission | null> {
  if (typeof window === 'undefined') return null
  
  try {
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    
    const response = await fetch('/api/foto-van-de-maand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memberName: submission.photographer,
        imageSrc: submission.imageSrc,
        title: submission.title,
        month,
        year,
        excursionId: submission.excursionId,
        excursionTitle: submission.excursionTitle,
        excursionLocation: submission.excursionLocation,
        excursionDate: submission.excursionDate
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to save submission')
    }

    const data = await response.json()
    return {
      id: data.submission.id.toString(),
      photographer: data.submission.memberName,
      title: data.submission.title || '',
      imageSrc: data.submission.imageSrc,
      votes: data.submission.votes || [],
      uploadDate: data.submission.createdAt,
      excursionId: data.submission.excursionId,
      excursionTitle: data.submission.excursionTitle,
      excursionLocation: data.submission.excursionLocation,
      excursionDate: data.submission.excursionDate
    }
  } catch (error: any) {
    console.error('Error saving submission:', error)
    throw error
  }
}

// Vote for submission via API
export async function voteForSubmission(submissionId: string, memberName: string): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  try {
    const response = await fetch('/api/foto-van-de-maand', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId, memberName })
    })

    return response.ok
  } catch (error) {
    console.error('Error voting for submission:', error)
    return false
  }
}

export function getCurrentMonthKey(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function getMonthName(monthKey: string): string {
  const monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 
                     'juli', 'augustus', 'september', 'oktober', 'november', 'december']
  const month = parseInt(monthKey.split('-')[1]) - 1
  return monthNames[month] || monthKey
}

export async function getCurrentMonthExcursion(): Promise<Event | null> {
  try {
    const events = await loadEvents()
    const currentMonthKey = getCurrentMonthKey()
    const [year, month] = currentMonthKey.split('-').map(Number)
    
    const monthEvents = events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getFullYear() === year && 
             eventDate.getMonth() + 1 === month
    })
    
    monthEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
    return monthEvents.length > 0 ? monthEvents[0] : null
  } catch (e) {
    console.error('Error loading current month excursion:', e)
    return null
  }
}

export async function getUserSubmissionsForMonth(monthKey: string, currentUser: string | null): Promise<FotoSubmission[]> {
  if (!currentUser) return []
  const submissions = await loadSubmissions()
  const monthData = submissions[monthKey] || { submissions: [] }
  return monthData.submissions.filter(sub => sub.photographer === currentUser)
}

export async function canUserUpload(currentUser: string | null): Promise<boolean> {
  if (!currentUser) return false
  const currentMonthKey = getCurrentMonthKey()
  const userSubmissions = await getUserSubmissionsForMonth(currentMonthKey, currentUser)
  return userSubmissions.length < 5
}

export async function getRemainingUploadSlots(currentUser: string | null): Promise<number> {
  const currentMonthKey = getCurrentMonthKey()
  const userSubmissions = await getUserSubmissionsForMonth(currentMonthKey, currentUser)
  return Math.max(0, 5 - userSubmissions.length)
}

export function compressImage(base64: string, callback: (compressed: string) => void, quality = 0.8, maxWidth = 1920): void {
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    let width = img.width
    let height = img.height
    
    if (width > maxWidth) {
      height = (height * maxWidth) / width
      width = maxWidth
    }
    
    canvas.width = width
    canvas.height = height
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(img, 0, 0, width, height)
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
      callback(compressedBase64)
    }
  }
  img.src = base64
}
