'use client'

import { loadEvents, Event } from './agenda'
import { getFotoSubmissions as getFotoSubmissionsFromSupabase, addFotoSubmission as addFotoSubmissionToSupabase, getFotoVotes, toggleFotoVote, deleteFotoSubmission, FotoSubmission as SupabaseFotoSubmission } from './supabase'

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

export async function loadSubmissions(): Promise<Record<string, MonthData>> {
  if (typeof window === 'undefined') return {}
  
  // Probeer eerst Supabase
  try {
    const allSubmissions: Record<string, MonthData> = {}
    
    // Haal submissions op voor alle maanden (we moeten weten welke maanden er zijn)
    // Voor nu gebruiken we de huidige maand en de laatste 12 maanden
    const currentMonthKey = getCurrentMonthKey()
    const monthKeys: string[] = [currentMonthKey]
    
    // Voeg laatste 12 maanden toe
    for (let i = 1; i <= 12; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      monthKeys.push(`${year}-${month}`)
    }
    
    // Haal submissions op voor elke maand
    for (const monthKey of monthKeys) {
      const supabaseSubmissions = await getFotoSubmissionsFromSupabase(monthKey)
      
      if (supabaseSubmissions.length > 0) {
        // Converteer Supabase submissions naar FotoSubmission formaat
        const submissions: FotoSubmission[] = []
        
        for (const sub of supabaseSubmissions) {
          // Haal votes op voor deze submission
          const votes = await getFotoVotes(sub.id || '')
          
          submissions.push({
            id: sub.id || '',
            photographer: sub.photographer,
            title: sub.title,
            imageSrc: sub.cloudinary_url,
            votes: votes,
            uploadDate: sub.upload_date || new Date().toISOString(),
            excursionId: sub.excursion_id,
            excursionTitle: sub.excursion_title,
            excursionLocation: sub.excursion_location,
            excursionDate: sub.excursion_date
          })
        }
        
        allSubmissions[monthKey] = {
          submissions,
          winner: null
        }
      }
    }
    
    // Als er Supabase data is, gebruik die
    if (Object.keys(allSubmissions).length > 0) {
      return allSubmissions
    }
  } catch (error) {
    console.error('Error loading submissions from Supabase:', error)
  }
  
  // Fallback naar localStorage
  return JSON.parse(localStorage.getItem('fotoVanDeMaandSubmissions') || '{}')
}

export async function saveSubmissions(data: Record<string, MonthData>): Promise<void> {
  if (typeof window === 'undefined') return
  
  // Voor nu slaan we alleen nieuwe submissions op in Supabase
  // Bestaande submissions worden niet overschreven
  // Dit is een vereenvoudigde implementatie - volledige sync zou complexer zijn
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
  if (!currentUser) return 0
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
