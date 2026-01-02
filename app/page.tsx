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

  // Remove any modals/overlays on mount - AGGRESSIVE
  useEffect(() => {
    const removeModals = () => {
      // Remove by text content
      const texts = ['Wachtwoord Wijzigen', 'Wachtwoord Instellen Vereist', 'Wijzig je wachtwoord', 'Je wachtwoord is gereset'];
      texts.forEach(text => {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
          if (el.textContent && el.textContent.includes(text)) {
            const style = window.getComputedStyle(el);
            if ((style.position === 'fixed' || style.position === 'absolute') && parseInt(style.zIndex) >= 1000) {
              el.remove();
            }
          }
        });
      });
      
      // Remove password modals
      document.querySelectorAll('#password-change-modal, .password-change-modal, [id*="password-change"], [class*="password-change-modal"], [id*="password-reset"], [class*="password-reset"]').forEach(el => el.remove())
      
      // Remove blocking overlays
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        const zIndex = parseInt(style.zIndex) || 0;
        const position = style.position;
        const text = el.textContent || '';
        
        if ((position === 'fixed' || position === 'absolute') && zIndex >= 1000) {
          if (text.includes('Wachtwoord') || text.includes('wachtwoord') || text.includes('password')) {
            el.remove();
          }
        }
      });
      
      // Enable clicks
      if (document.body) {
        document.body.style.pointerEvents = 'auto'
        document.body.style.overflow = ''
      }
    }
    
    removeModals()
    const interval = setInterval(removeModals, 25)
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
