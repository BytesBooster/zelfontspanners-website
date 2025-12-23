'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth'

export function Navigation() {
  const pathname = usePathname()
  const { isLoggedIn, currentUser } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navbarShadow, setNavbarShadow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setNavbarShadow(window.pageYOffset > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', text: 'Home', key: 'home' },
    { href: '/agenda', text: 'Agenda', key: 'agenda' },
    { href: '/leden', text: 'Leden', key: 'leden' },
    { href: '/foto-van-de-maand', text: 'Foto van de Maand', key: 'foto-van-de-maand' },
    { href: '/over-ons', text: 'Over Ons', key: 'about' },
    { href: '/sponsors', text: 'Sponsors', key: 'sponsors' },
    { href: '/contact', text: 'Contact', key: 'contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentSession')
      window.location.href = '/login'
    }
  }

  return (
    <nav className="navbar" id="navbar" style={{ boxShadow: navbarShadow ? '0 2px 20px rgba(0, 0, 0, 0.15)' : '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1>
                <span className="logo-line1">De</span>
                <span className="logo-line2">Zelfontspanners</span>
              </h1>
            </Link>
          </div>
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} id="navMenu">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link 
                  href={link.href} 
                  className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            {isLoggedIn ? (
              <>
                <li>
                  <Link 
                    href={`/portfolio-manage?member=${encodeURIComponent(currentUser || '')}`}
                    className="nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mijn Portfolio
                  </Link>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault()
                      handleLogout()
                    }}
                    className="nav-link"
                  >
                    Uitloggen
                  </a>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  href="/login" 
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
