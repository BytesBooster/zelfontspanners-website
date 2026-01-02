'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const heroImages = [
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg',
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())

  useEffect(() => {
    // Check if images exist by trying to load them
    heroImages.forEach((src, index) => {
      const img = new window.Image()
      img.onload = () => {
        setImagesLoaded((prev) => new Set(prev).add(index))
      }
      img.onerror = () => {
        setImageErrors((prev) => new Set(prev).add(index))
      }
      img.src = src
    })
  }, [])

  useEffect(() => {
    // Only start slider if we have at least one valid image
    const validImages = heroImages.filter((_, index) => imagesLoaded.has(index))
    if (validImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        // Skip to next valid image
        let next = (prev + 1) % heroImages.length
        while (imageErrors.has(next) && next !== prev) {
          next = (next + 1) % heroImages.length
        }
        return next
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [imagesLoaded, imageErrors])

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index))
    setImagesLoaded((prev) => {
      const newSet = new Set(prev)
      newSet.delete(index)
      return newSet
    })
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  // If all images failed to load or no images loaded, show gradient background
  const hasValidImages = imagesLoaded.size > 0
  const allImagesFailed = imageErrors.size === heroImages.length && imagesLoaded.size === 0

  if (allImagesFailed || !hasValidImages) {
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
        {heroImages.map((src, index) => {
          const isValid = imagesLoaded.has(index) && !imageErrors.has(index)
          const isActive = index === currentSlide && isValid
          
          return (
            <div
              key={index}
              className={`hero-slide ${isActive ? 'active' : ''}`}
              style={{ 
                display: isActive ? 'block' : 'none',
                background: !isValid
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : undefined
              }}
            >
              {isValid && (
                <Image
                  src={src}
                  alt={`Hero slide ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                  onError={() => handleImageError(index)}
                />
              )}
            </div>
          )
        })}
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
