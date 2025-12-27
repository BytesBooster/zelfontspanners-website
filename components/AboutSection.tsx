'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPhotos } from '@/lib/supabase'

export function AboutSection() {
  const [aboutPhoto, setAboutPhoto] = useState<string | null>(null)

  useEffect(() => {
    // Laad een willekeurige foto uit de database voor de about sectie
    const loadAboutPhoto = async () => {
      try {
        const allPhotos = await getAllPhotos()
        // Filter alleen Cloudinary foto's (niet lokale URLs)
        const cloudinaryPhotos = allPhotos.filter(
          photo => photo.cloudinary_url && photo.cloudinary_url.startsWith('http')
        )
        
        if (cloudinaryPhotos.length > 0) {
          // Kies een willekeurige foto
          const randomPhoto = cloudinaryPhotos[Math.floor(Math.random() * cloudinaryPhotos.length)]
          setAboutPhoto(randomPhoto.cloudinary_url)
        } else {
          // Fallback naar lokale afbeelding als er geen Cloudinary foto's zijn
          setAboutPhoto('/images/about-club.png')
        }
      } catch (error) {
        console.error('Error loading about photo:', error)
        // Fallback naar lokale afbeelding bij fout
        setAboutPhoto('/images/about-club.png')
      }
    }

    loadAboutPhoto()
  }, [])

  return (
    <section id="about" className="portfolio-page">
      <div className="container">
        <div className="section-header">
          <h1>Over Ons</h1>
          <p className="section-subtitle">Passie voor fotografie</p>
        </div>
        <div className="about-single-box">
          <div className="about-content">
            <p className="about-intro-text">
              Welkom bij De Zelfontspanners! Wij zijn een actieve vereniging van fotografieliefhebbers 
              die elkaar inspireren en helpen groeien in de kunst van fotografie.
            </p>
            
            {/* About Photo */}
            {aboutPhoto && (
              <div className="about-photo-container" style={{ margin: '2rem 0', textAlign: 'center' }}>
                <Image
                  src={aboutPhoto}
                  alt="De Zelfontspanners - Leden aan het fotograferen"
                  width={800}
                  height={400}
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)'
                  }}
                />
              </div>
            )}

            <p>
              Onze vereniging organiseert regelmatig excursies, workshops en bijeenkomsten waar leden 
              hun passie voor fotografie kunnen delen en ontwikkelen. Elke maand gaan we op zondagochtend 
              gezamenlijk naar een mooie locatie om naar hartenlust te fotograferen.
            </p>

            <div className="about-features" style={{ marginTop: '3rem' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                marginBottom: '2rem', 
                color: '#d4af37',
                textAlign: 'center',
                fontWeight: 600,
                textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'
              }}>
                Wat wij bieden
              </h2>
              <div className="about-features-grid" style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
              }}>
                <div style={{ 
                  padding: '1.5rem',
                  background: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)'
                }}
                >
                  <h3 style={{ 
                    color: '#d4af37', 
                    fontSize: '1.25rem',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    lineHeight: '1.4'
                  }}>
                    Maandelijkse Excursies
                  </h3>
                  <p style={{ 
                    color: '#c8c8c8',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Elke maand op pad naar mooie fotolocaties. We verkennen samen interessante plekken en genieten van het fotograferen in gezelschap.
                  </p>
                </div>
                <div style={{ 
                  padding: '1.5rem',
                  background: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)'
                }}
                >
                  <h3 style={{ 
                    color: '#d4af37', 
                    fontSize: '1.25rem',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    lineHeight: '1.4'
                  }}>
                    Foto van de Maand
                  </h3>
                  <p style={{ 
                    color: '#c8c8c8',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Maandelijkse wedstrijd waarbij leden hun beste foto's kunnen inzenden. De winnaar wordt gekozen door de leden zelf.
                  </p>
                </div>
                <div style={{ 
                  padding: '1.5rem',
                  background: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)'
                }}
                >
                  <h3 style={{ 
                    color: '#d4af37', 
                    fontSize: '1.25rem',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    lineHeight: '1.4'
                  }}>
                    Kennis Delen
                  </h3>
                  <p style={{ 
                    color: '#c8c8c8',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Leren van elkaar en feedback krijgen op je foto's. We delen tips, technieken en inspiratie tijdens onze bijeenkomsten.
                  </p>
                </div>
                <div style={{ 
                  padding: '1.5rem',
                  background: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)'
                }}
                >
                  <h3 style={{ 
                    color: '#d4af37', 
                    fontSize: '1.25rem',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    lineHeight: '1.4'
                  }}>
                    Gezellige Gemeenschap
                  </h3>
                  <p style={{ 
                    color: '#c8c8c8',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Alles mag en er moet niets. We zijn een gezellige groep fotografieliefhebbers die samen genieten van fotografie zonder verplichtingen.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link href="/over-ons" className="btn btn-primary">
                Lees Meer Over Ons
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
