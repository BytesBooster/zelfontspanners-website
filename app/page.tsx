'use client'

import { useEffect } from 'react'
import { HeroSlider } from '@/components/HeroSlider'
import { AboutSection } from '@/components/AboutSection'
import { EventsSection } from '@/components/EventsSection'
import { FotoVanDeMaandSection } from '@/components/FotoVanDeMaandSection'

export default function Home() {
  useEffect(() => {
    // Initialize any client-side functionality
    if (typeof window !== 'undefined') {
      // Any initialization code
    }
  }, [])

  return (
    <>
      <HeroSlider />
      <AboutSection />
      <EventsSection />
      <FotoVanDeMaandSection />
    </>
  )
}
