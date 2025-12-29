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

export function loadSubmissions(): Record<string, MonthData> {
  if (typeof window === 'undefined') return {}
  return JSON.parse(localStorage.getItem('fotoVanDeMaandSubmissions') || '{}')
}

export function saveSubmissions(data: Record<string, MonthData>): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('fotoVanDeMaandSubmissions', JSON.stringify(data))
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

export function getCurrentMonthExcursion(): Event | null {
  try {
    const events = loadEvents()
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

export function getUserSubmissionsForMonth(monthKey: string, currentUser: string | null): FotoSubmission[] {
  if (!currentUser) return []
  const submissions = loadSubmissions()
  const monthData = submissions[monthKey] || { submissions: [] }
  return monthData.submissions.filter(sub => sub.photographer === currentUser)
}

export function canUserUpload(currentUser: string | null): boolean {
  if (!currentUser) return false
  const currentMonthKey = getCurrentMonthKey()
  const userSubmissions = getUserSubmissionsForMonth(currentMonthKey, currentUser)
  return userSubmissions.length < 5
}

export function getRemainingUploadSlots(currentUser: string | null): number {
  const currentMonthKey = getCurrentMonthKey()
  const userSubmissions = getUserSubmissionsForMonth(currentMonthKey, currentUser)
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
