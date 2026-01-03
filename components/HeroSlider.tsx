'use client'

import { useEffect, useState } from 'react'

interface PortfolioPhoto {
  src: string
  title?: string
  category?: string
}

export function HeroSlider() {
  const [heroImages, setHeroImages] = useState<string[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const [workingImages, setWorkingImages] = useState<string[]>([])

  // Load random portfolio photos from database
  useEffect(() => {
    async function loadRandomPhotos() {
      try {
        const response = await fetch('/api/portfolio/random?count=10')
        if (!response.ok) {
          console.error('[HeroSlider] Error loading random photos:', response.statusText)
          // Fallback to empty array
          setHeroImages([])
          setIsLoading(false)
          return
        }
        
        const data = await response.json()
        const photos: PortfolioPhoto[] = data.photos || []
        
        console.log('[HeroSlider] Loaded photos from API:', photos.length)
        
        // Extract image sources - prioritize base64 images (from database)
        const imageSrcs = photos
          .map(photo => {
            let src = photo.src
            
            // If it's base64, use it directly (works everywhere - no server files needed!)
            if (src && src.startsWith('data:image')) {
              console.log('[HeroSlider] Using base64 image (from database)')
              return src
            }
            
            // If it's already a full URL, use it directly
            if (src && src.startsWith('http')) {
              console.log('[HeroSlider] Using full URL:', src)
              return src
            }
            
            // For relative paths, we need to load from server
            // But ideally all photos should be base64 in the database
            const cleanSrc = src.startsWith('/') ? src.substring(1) : src
            
            // In development, try to load from live server first
            if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.includes('192.168.'))) {
              // Development mode - load from live server
              src = `https://zelfontspanners.nl/${cleanSrc}`
              console.log('[HeroSlider] Development mode - using live server URL:', src)
            } else {
              // Production mode - use relative path (will load from same server)
              src = `/${cleanSrc}`
              console.log('[HeroSlider] Production mode - using relative path:', src)
            }
            
            return src
          })
          .filter(Boolean)
          // Prioritize base64 images - they don't need server files
          .sort((a, b) => {
            const aIsBase64 = a.startsWith('data:image')
            const bIsBase64 = b.startsWith('data:image')
            if (aIsBase64 && !bIsBase64) return -1
            if (!aIsBase64 && bIsBase64) return 1
            return 0
          })
        
        console.log('[HeroSlider] Final image sources:', imageSrcs)
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
    const displayImages = heroImages.filter(src => !failedImages.has(src))
    if (displayImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length, failedImages.size])

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

  // Filter to only show images that haven't failed
  const displayImages = heroImages.filter(src => !failedImages.has(src))
  
  // If no working images, show gradient fallback
  if (displayImages.length === 0 && !isLoading) {
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
        {displayImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              display: index === currentSlide ? 'block' : 'none',
              position: 'relative',
              width: '100%',
              height: '100%'
            }}
          >
            {failedImages.has(src) ? (
              // Show gradient fallback if image failed to load
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', opacity: 0.7 }}>Foto niet beschikbaar</span>
              </div>
            ) : (
              <img
                src={src}
                alt={`Hero slide ${index + 1}`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
                onError={(e) => {
                  console.error('[HeroSlider] Error loading image:', src)
                  setFailedImages(prev => new Set(prev).add(src))
                  // Hide broken image
                  const target = e.target as HTMLImageElement
                  if (target) {
                    target.style.display = 'none'
                  }
                }}
                onLoad={() => {
                  console.log('[HeroSlider] Image loaded successfully:', src)
                  setLoadedImages(prev => {
                    const newSet = new Set(prev).add(src)
                    // Update working images list
                    setWorkingImages(prev => {
                      if (!prev.includes(src)) {
                        return [...prev, src]
                      }
                      return prev
                    })
                    return newSet
                  })
                }}
              />
            )}
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
        {displayImages.map((_, index) => (
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
