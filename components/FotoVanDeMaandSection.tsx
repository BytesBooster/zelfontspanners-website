import Link from 'next/link'

export function FotoVanDeMaandSection() {
  return (
    <section id="foto-van-de-maand" className="portfolio-page">
      <div className="container">
        <div className="section-header">
          <h1>Foto van de Maand</h1>
          <p className="section-subtitle">De mooiste foto's van onze leden</p>
        </div>
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p>Bekijk de winnaars van onze maandelijkse fotowedstrijd.</p>
          <Link href="/foto-van-de-maand" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Bekijk Foto van de Maand
          </Link>
        </div>
      </div>
    </section>
  )
}
