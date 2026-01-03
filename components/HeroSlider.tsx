'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface PortfolioPhoto {
  src: string
  title?: string
  category?: string
}

export function HeroSlider() {
  const [heroImages, setHeroImages] = useState<string[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Load random portfolio photos from database
  useEffect(() => {
    async function loadRandomPhotos() {
      try {
        const response = await fetch('/api/portfolio/random?count=10')
        if (!response.ok) {
          console.error('Error loading random photos:', response.statusText)
          // Fallback to empty array
          setHeroImages([])
          setIsLoading(false)
          return
        }
        
        const data = await response.json()
        const photos: PortfolioPhoto[] = data.photos || []
        
        // Extract image sources and ensure they load from server, not local
        const imageSrcs = photos
          .map(photo => {
            let src = photo.src
            // If it's a local path (images/portfolio/...), load from live server
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
              // In development, load from live server; in production, use relative path
              if (typeof window !== 'undefined' && window.location.hostname === 'localhost' || window.location.hostname.includes('192.168.')) {
                // Development mode - load from live server
                src = `https://zelfontspanners.nl/${src.startsWith('/') ? src.substring(1) : src}`
              } else {
                // Production mode - use relative path (will load from same server)
                src = src.startsWith('/') ? src : '/' + src
              }
            }
            return src
          })
          .filter(Boolean)
        
        setHeroImages(imageSrcs)
      } catch (error) {
        console.error('Error loading random portfolio photos:', error)
        setHeroImages([])
      } finally {
        setIsLoading(false)
      }
    }

    loadRandomPhotos()
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

  // Show loading or fallback if no images
  if (isLoading) {
    return (
      <section id="home" className="home-hero">
        <div className="home-hero-slider" id="heroSlider">
          <div className="hero-slide active" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'block'
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

  // If no images loaded, show gradient background
  if (heroImages.length === 0) {
    return (
      <section id="home" className="home-hero">
        <div className="home-hero-slider" id="heroSlider">
          <div className="hero-slide active" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'block'
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
        {heroImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ display: index === currentSlide ? 'block' : 'none' }}
          >
            <Image
              src={src}
              alt={`Hero slide ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
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
