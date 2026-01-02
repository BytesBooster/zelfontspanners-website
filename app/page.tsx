'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { HeroSlider } from '@/components/HeroSlider'
import { AboutSection } from '@/components/AboutSection'
import { EventsSection } from '@/components/EventsSection'
import { FotoVanDeMaandSection } from '@/components/FotoVanDeMaandSection'

export default function Home() {
  const router = useRouter()
  const { isLoggedIn, currentUser, requiresPasswordChange, isLoading } = useAuth()

  // Redirect to change-password if password reset required
  useEffect(() => {
    if (!isLoading && isLoggedIn && currentUser && requiresPasswordChange) {
      router.push('/change-password')
    }
  }, [isLoading, isLoggedIn, currentUser, requiresPasswordChange, router])

  return (
    <>
      <HeroSlider />
      <AboutSection />
      <EventsSection />
      <FotoVanDeMaandSection />
    </>
  )
}
