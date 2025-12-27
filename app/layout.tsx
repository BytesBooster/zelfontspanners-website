import '../styles.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import Script from 'next/script'

export const metadata = {
  title: 'De Zelfontspanners',
  description: 'Ontdek de kunst van fotografie met ons',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="icon" href="/images/foto-roos-logo.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="dark-page">
        {/* Load portfolio-data.js for portfolio pages */}
        <Script src="/portfolio-data.js" strategy="afterInteractive" />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
