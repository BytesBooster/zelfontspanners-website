'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { activeMembers, getMemberPhoto, getInitials } from '@/lib/members'

export default function LedenPage() {
  const sortedMembers = useMemo(() => {
    return [...activeMembers].sort((a, b) => a.localeCompare(b, 'nl', { sensitivity: 'base' }))
  }, [])

  const fallbackSvg = (initials: string) => {
    return `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%231a1a1a%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%23d4af37%22 font-family=%22Arial%22 font-size=%2280%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22central%22%3E${initials}%3C/text%3E%3C/svg%3E`
  }

  return (
    <section className="members-page">
      <div className="container">
        <div className="section-header">
          <h1>Onze Leden</h1>
          <p className="section-subtitle">Ontmoet de fotografieliefhebbers van De Zelfontspanners</p>
        </div>
        
        <div className="members-section">
          <h2 className="members-category-title">Actieve Leden</h2>
          <div className="members-grid">
            {sortedMembers.map((name) => {
              const initials = getInitials(name)
              const imageUrl = getMemberPhoto(name)
              const fallback = fallbackSvg(initials)
              
              return (
                <Link 
                  key={name}
                  href={`/portfolio?member=${encodeURIComponent(name)}`}
                  className="member-card"
                >
                  <div className="member-photo">
                    <Image
                      src={imageUrl}
                      alt={name}
                      width={200}
                      height={200}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = fallback
                      }}
                    />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{name}</h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
