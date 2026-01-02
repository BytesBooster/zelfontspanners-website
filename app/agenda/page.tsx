'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { loadEvents, createEvent, deleteEvent, formatDateTime, formatDate, isPastEvent, escapeHtml, Event } from '@/lib/agenda'
import Link from 'next/link'

export default function AgendaPage() {
  const { isLoggedIn, currentUser } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    icon: '📅'
  })

  useEffect(() => {
    loadAndDisplayEvents()
  }, [])

  const loadAndDisplayEvents = async () => {
    const loadedEvents = await loadEvents()
    const sorted = [...loadedEvents].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      
      if (dateA.getTime() === dateB.getTime()) {
        if (a.time && b.time) {
          return a.time.localeCompare(b.time)
        }
        return 0
      }
      
      return dateA.getTime() - dateB.getTime()
    })
    setEvents(sorted)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isLoggedIn) {
      alert('Je moet ingelogd zijn om evenementen toe te voegen.')
      return
    }

    const eventData = {
      title: formData.title.trim(),
      date: formData.date,
      time: formData.time || null,
      location: formData.location ? formData.location.trim() : null,
      description: formData.description ? formData.description.trim() : null,
      icon: formData.icon || '📅',
      createdBy: currentUser || 'Unknown'
    }

    const newEvent = await createEvent(eventData)
    if (newEvent) {
      await loadAndDisplayEvents()
      setShowModal(false)
      setFormData({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        icon: '📅'
      })
    }
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm('Weet je zeker dat je dit evenement wilt verwijderen?')) {
      return
    }

    const success = await deleteEvent(eventId)
    if (success) {
      await loadAndDisplayEvents()
    }
  }

  const openModal = () => {
    if (!isLoggedIn) {
      alert('Je moet ingelogd zijn om evenementen toe te voegen.')
      return
    }
    
    // Set default date to 2026
    const currentYear = new Date().getFullYear()
    if (currentYear < 2026) {
      setFormData(prev => ({ ...prev, date: '2026-01-01' }))
    } else {
      const today = new Date().toISOString().split('T')[0]
      setFormData(prev => ({ ...prev, date: today }))
    }
    
    setShowModal(true)
  }

  return (
    <section className="portfolio-page">
      <div className="container">
        <div className="section-header">
          <h1>Agenda</h1>
          <p className="section-subtitle">Bekijk en voeg evenementen toe aan de agenda</p>
        </div>
        
        {isLoggedIn && (
          <div className="agenda-add-section">
            <button onClick={openModal} className="btn btn-primary">+ Evenement Toevoegen</button>
          </div>
        )}

        {showModal && (
          <div className="agenda-modal" style={{ display: 'flex' }} onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false)
          }}>
            <div className="agenda-modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="agenda-modal-close" onClick={() => setShowModal(false)}>&times;</span>
              <h2>Nieuw Evenement Toevoegen</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="eventTitle">Titel *</label>
                  <input
                    type="text"
                    id="eventTitle"
                    required
                    maxLength={100}
                    placeholder="Bijv. Maandelijkse vergadering"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventDate">Datum *</label>
                  <input
                    type="date"
                    id="eventDate"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventTime">Tijd</label>
                  <input
                    type="time"
                    id="eventTime"
                    placeholder="Bijv. 19:00"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventLocation">Locatie</label>
                  <input
                    type="text"
                    id="eventLocation"
                    maxLength={200}
                    placeholder="Bijv. Clubhuis, Wijchen"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventDescription">Beschrijving</label>
                  <textarea
                    id="eventDescription"
                    rows={4}
                    maxLength={500}
                    placeholder="Beschrijf het evenement..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventIcon">Icoon (emoji)</label>
                  <input
                    type="text"
                    id="eventIcon"
                    maxLength={2}
                    placeholder="📅"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Annuleren
                  </button>
                  <button type="submit" className="btn btn-primary">Evenement Toevoegen</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="agenda-grid" id="agendaGrid">
          {events.length === 0 ? (
            <div className="agenda-empty">
              <p>Er zijn nog geen evenementen in de agenda.</p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
                {isLoggedIn ? 'Klik op de knop hierboven om een evenement toe te voegen.' : 'Log in om een evenement toe te voegen.'}
              </p>
            </div>
          ) : (
            events.map((event) => {
              const past = isPastEvent(event)
              const formattedDate = event.time 
                ? formatDateTime(event.date, event.time)
                : formatDate(event.date)
              
              return (
                <div key={event.id} className={`agenda-item ${past ? 'agenda-item-past' : ''}`}>
                  <div className="agenda-item-icon">{event.icon || '📅'}</div>
                  <div className="agenda-item-content">
                    <div className="agenda-item-header">
                      <h3 className="agenda-item-title" dangerouslySetInnerHTML={{ __html: escapeHtml(event.title) }} />
                      {isLoggedIn && currentUser === event.createdBy && (
                        <div className="agenda-item-actions">
                          <button 
                            className="agenda-item-delete" 
                            onClick={() => handleDelete(event.id)}
                            title="Verwijder evenement"
                          >
                            🗑️
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="agenda-item-date">{formattedDate}</div>
                    {event.location && (
                      <div className="agenda-item-location" dangerouslySetInnerHTML={{ __html: `📍 ${escapeHtml(event.location)}` }} />
                    )}
                    {event.description && (
                      <div className="agenda-item-description" dangerouslySetInnerHTML={{ __html: escapeHtml(event.description) }} />
                    )}
                    {past && <div className="agenda-item-badge">Afgelopen</div>}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
