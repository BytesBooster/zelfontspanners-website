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

  // Remove any modals/overlays on mount
  useEffect(() => {
    const removeModals = () => {
      // Remove password modals
      document.querySelectorAll('#password-change-modal, .password-change-modal, [id*="password-change"], [class*="password-change-modal"]').forEach(el => el.remove())
      
      // Remove blocking overlays
      document.querySelectorAll('[style*="z-index: 99999"], [style*="z-index: 100000"]').forEach(el => {
        const id = el.id || ''
        const cls = el.className || ''
        if (id.includes('password') || cls.includes('password') || cls.includes('modal')) {
          el.remove()
        }
      })
      
      // Enable clicks
      if (document.body) {
        document.body.style.pointerEvents = 'auto'
        document.body.style.overflow = ''
      }
    }
    
    removeModals()
    const interval = setInterval(removeModals, 100)
    return () => clearInterval(interval)
  }, [])

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
