'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Event {
  id: string
  title: string
  date: string
  time?: string
  location?: string
  description?: string
  icon?: string
}

export function EventsSection() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadEvents = () => {
        try {
          const eventsData = localStorage.getItem('agendaEvents')
          if (eventsData) {
            const parsed = JSON.parse(eventsData)
            const futureEvents = parsed
              .filter((event: Event) => {
                if (!event.date) return false
                const eventDate = new Date(event.date)
                return eventDate >= new Date()
              })
              .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 4)
            setEvents(futureEvents)
          }
        } catch (e) {
          console.error('Error loading events:', e)
        }
      }
      loadEvents()
      window.addEventListener('storage', loadEvents)
      return () => window.removeEventListener('storage', loadEvents)
    }
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-NL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <section id="events" className="portfolio-page">
      <div className="container">
        <div className="section-header">
          <h1>Komende Evenementen</h1>
          <p className="section-subtitle">Bekijk onze agenda</p>
        </div>
        {events.length > 0 ? (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-icon">{event.icon || '📅'}</div>
                <h3>{event.title}</h3>
                <p className="event-date">
                  {formatDate(event.date)}
                  {event.time && ` om ${event.time}`}
                </p>
                {event.location && <p className="event-location">📍 {event.location}</p>}
                {event.description && <p className="event-description">{event.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>Er zijn nog geen evenementen gepland.</p>
        )}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/agenda" className="btn btn-primary">
            Bekijk Volledige Agenda
          </Link>
        </div>
      </div>
    </section>
  )
}
