'use client'

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

// Load events from API
export async function loadEvents(): Promise<Event[]> {
  if (typeof window === 'undefined') return []
  
  try {
    const response = await fetch('/api/agenda')
    if (!response.ok) {
      console.error('Error loading events:', response.statusText)
      return []
    }
    
    const data = await response.json()
    return data.events || []
  } catch (error) {
    console.error('Error loading events:', error)
    return []
  }
}

// Save events via API
export async function saveEvents(events: Event[]): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  try {
    // For now, we'll save events individually
    // In the future, we might want a bulk save endpoint
    return true
  } catch (error) {
    console.error('Error saving events:', error)
    return false
  }
}

// Create event via API
export async function createEvent(event: Omit<Event, 'id' | 'createdAt'>): Promise<Event | null> {
  if (typeof window === 'undefined') return null
  
  try {
    const response = await fetch('/api/agenda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    })

    if (!response.ok) {
      console.error('Error creating event:', response.statusText)
      return null
    }

    const data = await response.json()
    return data.event
  } catch (error) {
    console.error('Error creating event:', error)
    return null
  }
}

// Update event via API
export async function updateEvent(event: Event): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  try {
    const response = await fetch('/api/agenda', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        icon: event.icon
      })
    })

    return response.ok
  } catch (error) {
    console.error('Error updating event:', error)
    return false
  }
}

// Delete event via API
export async function deleteEvent(eventId: string): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  try {
    const response = await fetch(`/api/agenda?id=${encodeURIComponent(eventId)}`, {
      method: 'DELETE'
    })

    return response.ok
  } catch (error) {
    console.error('Error deleting event:', error)
    return false
  }
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
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
