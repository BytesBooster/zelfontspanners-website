'use client'

import { getAgendaEvents, addAgendaEvent, deleteAgendaEvent, AgendaEventSupabase } from '@/lib/supabase'

export interface Event {
  id: string
  title: string
  date: string
  time?: string | null
  location?: string | null
  description?: string | null
  icon?: string
  createdBy?: string
  createdAt?: string
}

// Converteer Supabase event naar Event interface
function convertSupabaseEventToEvent(supabaseEvent: AgendaEventSupabase): Event {
  return {
    id: supabaseEvent.id,
    title: supabaseEvent.title,
    date: supabaseEvent.date,
    time: supabaseEvent.time,
    location: supabaseEvent.location,
    description: supabaseEvent.description,
    icon: supabaseEvent.icon,
    createdBy: supabaseEvent.created_by,
    createdAt: supabaseEvent.created_at
  }
}

export async function loadEvents(): Promise<Event[]> {
  // Probeer eerst Supabase
  try {
    const supabaseEvents = await getAgendaEvents()
    if (supabaseEvents.length > 0) {
      return supabaseEvents.map(convertSupabaseEventToEvent)
    }
  } catch (e) {
    console.error('Error loading events from Supabase:', e)
  }

  // Fallback naar localStorage voor backward compatibility
  if (typeof window === 'undefined') return []
  
  const eventsData = localStorage.getItem('agendaEvents')
  if (eventsData) {
    try {
      const events = JSON.parse(eventsData)
      // Filter out test event automatically
      return events.filter((event: Event) => {
        return !(event.title === 'test' && event.date === '2026-07-21')
      })
    } catch (e) {
      console.error('Error loading events from localStorage:', e)
      return []
    }
  }
  return []
}

export async function saveEvents(events: Event[]): Promise<boolean> {
  // Deze functie wordt alleen gebruikt voor localStorage fallback
  // Nieuwe events worden direct naar Supabase opgeslagen via addAgendaEvent
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.setItem('agendaEvents', JSON.stringify(events))
    return true
  } catch (e) {
    console.error('Error saving events to localStorage:', e)
    alert('Er is een fout opgetreden bij het opslaan van het evenement.')
    return false
  }
}

export async function addEvent(event: Omit<Event, 'id' | 'createdAt'>): Promise<Event | null> {
  try {
    const supabaseEvent = await addAgendaEvent({
      title: event.title,
      date: event.date,
      time: event.time || null,
      location: event.location || null,
      description: event.description || null,
      icon: event.icon || '📅',
      created_by: event.createdBy || 'Unknown'
    })

    if (supabaseEvent) {
      return convertSupabaseEventToEvent(supabaseEvent)
    }
  } catch (e) {
    console.error('Error adding event to Supabase:', e)
  }

  // Fallback naar localStorage
  if (typeof window === 'undefined') return null
  
  const newEvent: Event = {
    ...event,
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString()
  }
  
  const existingEvents = await loadEvents()
  const updatedEvents = [...existingEvents, newEvent]
  
  if (saveEvents(updatedEvents)) {
    return newEvent
  }
  
  return null
}

export async function removeEvent(eventId: string): Promise<boolean> {
  // Probeer eerst Supabase
  try {
    const success = await deleteAgendaEvent(eventId)
    if (success) {
      return true
    }
  } catch (e) {
    console.error('Error deleting event from Supabase:', e)
  }

  // Fallback naar localStorage
  const existingEvents = await loadEvents()
  const filteredEvents = existingEvents.filter(event => event.id !== eventId)
  return saveEvents(filteredEvents)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('nl-NL', options)
}

export function formatDateTime(dateString: string, timeString?: string | null): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  let formatted = date.toLocaleDateString('nl-NL', options)
  
  if (timeString) {
    formatted += ` om ${timeString}`
  }
  
  return formatted
}

export function isPastEvent(event: Event): boolean {
  const eventDate = new Date(event.date)
  if (event.time) {
    const [hours, minutes] = event.time.split(':')
    eventDate.setHours(parseInt(hours), parseInt(minutes))
  }
  return eventDate < new Date()
}

export function escapeHtml(text: string): string {
  if (typeof window === 'undefined') {
    // Server-side: basic HTML escaping
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
