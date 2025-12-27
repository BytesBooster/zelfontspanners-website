'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAllPhotos } from '@/lib/supabase'

interface HeroPhoto {
  src: string
  title: string
  member: string
}

export function HeroSlider() {
  const [heroImages, setHeroImages] = useState<HeroPhoto[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // Load portfolio photos for hero slider - eerst van Supabase, dan fallback
    const loadHeroPhotos = async () => {
      let allPhotos: HeroPhoto[] = []

      // Probeer eerst foto's van Supabase te laden
      try {
        const supabasePhotos = await getAllPhotos()
        if (supabasePhotos.length > 0) {
          // Filter alleen foto's met Cloudinary URLs (niet lokale URLs)
          const cloudinaryPhotos = supabasePhotos
            .filter(photo => photo.cloudinary_url && photo.cloudinary_url.startsWith('http'))
            .map(photo => ({
              src: photo.cloudinary_url,
              title: photo.title || 'Foto',
              member: photo.member_name
            }))
          
          allPhotos = cloudinaryPhotos
        }
      } catch (e) {
        console.error('Error loading photos from Supabase for hero:', e)
      }

      // Fallback: gebruik lokale data als Supabase geen foto's heeft
      if (allPhotos.length === 0 && typeof window !== 'undefined') {
        // Try to use loadAllPortfolioData function
        if ((window as any).loadAllPortfolioData) {
          try {
            const portfolioData = (window as any).loadAllPortfolioData()
            
            // Check if portfolioData is valid
            if (portfolioData && typeof portfolioData === 'object') {
              // Collect all photos from all members
              Object.keys(portfolioData).forEach((memberName: string) => {
                const member = portfolioData[memberName]
                if (member && member.photos && Array.isArray(member.photos)) {
                  member.photos.forEach((photo: any) => {
                    if (photo && photo.src) {
                      allPhotos.push({
                        src: photo.src,
                        title: photo.title || 'Foto',
                        member: memberName
                      })
                    }
                  })
                }
              })
            }
          } catch (e) {
            console.error('Error loading portfolio data for hero:', e)
          }
        }

        // Fallback: try STATIC_PORTFOLIO_DATA
        if (allPhotos.length === 0 && (window as any).STATIC_PORTFOLIO_DATA) {
          try {
            const staticData = (window as any).STATIC_PORTFOLIO_DATA
            
            // Check if staticData is valid
            if (staticData && typeof staticData === 'object') {
              Object.keys(staticData).forEach((memberName: string) => {
                const member = staticData[memberName]
                if (member && member.photos && Array.isArray(member.photos)) {
                  member.photos.forEach((photo: any) => {
                    if (photo && photo.src) {
                      allPhotos.push({
                        src: photo.src,
                        title: photo.title || 'Foto',
                        member: memberName
                      })
                    }
                  })
                }
              })
            }
          } catch (e) {
            console.error('Error loading static portfolio data for hero:', e)
          }
        }
      }

      // Shuffle and select random photos (max 10 for performance)
      if (allPhotos.length > 0) {
        const shuffled = [...allPhotos].sort(() => Math.random() - 0.5)
        const selected = shuffled.slice(0, Math.min(10, shuffled.length))
        setHeroImages(selected)
      }
    }

    loadHeroPhotos()
  }, [])

  useEffect(() => {
    if (heroImages.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  // If no images loaded, show a gradient background
  if (heroImages.length === 0) {
    return (
      <section id="home" className="home-hero">
        <div className="home-hero-slider" id="heroSlider">
          <div className="hero-slide active" style={{ 
            background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)'
          }} />
        </div>
        <div className="home-hero-overlay"></div>
        <div className="home-hero-content">
          <h1 className="home-hero-title">De Zelfontspanners</h1>
          <p className="home-hero-subtitle">Ontdek de kunst van fotografie samen met gelijkgestemden</p>
          <div className="home-hero-actions">
            <a href="/over-ons" className="btn btn-secondary">Meer Weten</a>
            <a href="/leden" className="btn btn-secondary">Bekijk Leden</a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="home" className="home-hero">
      <div className="home-hero-slider" id="heroSlider">
        {heroImages.map((photo, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ display: index === currentSlide ? 'block' : 'none' }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={
                  photo.src.startsWith('data:') 
                    ? photo.src 
                    : photo.src.startsWith('http') 
                    ? photo.src 
                    : `/${photo.src}`
                }
                alt={photo.title || `Hero slide ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
                unoptimized={photo.src.startsWith('data:')}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="home-hero-overlay"></div>
      <div className="home-hero-content">
        <h1 className="home-hero-title">De Zelfontspanners</h1>
        <p className="home-hero-subtitle">Ontdek de kunst van fotografie samen met gelijkgestemden</p>
        <div className="home-hero-actions">
          <a href="/over-ons" className="btn btn-secondary">Meer Weten</a>
          <a href="/leden" className="btn btn-secondary">Bekijk Leden</a>
        </div>
      </div>
      <div className="home-hero-nav">
        <button 
          className="hero-slider-prev" 
          onClick={prevSlide}
          aria-label="Vorige foto"
        >
          ‹
        </button>
        <button 
          className="hero-slider-next" 
          onClick={nextSlide}
          aria-label="Volgende foto"
        >
          ›
        </button>
      </div>
      <div className="home-hero-dots" id="heroSliderDots">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ga naar slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
