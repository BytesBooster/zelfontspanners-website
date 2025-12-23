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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <section id="home" className="home-hero">
      <div className="home-hero-slider" id="heroSlider">
        {heroImages.map((src, index) => (
          <div
            key={index}
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
