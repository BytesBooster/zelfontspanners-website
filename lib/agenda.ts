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

export function loadEvents(): Event[] {
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
      console.error('Error loading events:', e)
      return []
    }
  }
  return []
}

export function saveEvents(events: Event[]): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.setItem('agendaEvents', JSON.stringify(events))
    return true
  } catch (e) {
    console.error('Error saving events:', e)
    alert('Er is een fout opgetreden bij het opslaan van het evenement.')
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
