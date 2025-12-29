import Link from 'next/link'

export function AboutSection() {
  return (
    <section id="about" className="portfolio-page">
      <div className="container">
        <div className="section-header">
          <h1>Over Ons</h1>
          <p className="section-subtitle">Passie voor fotografie</p>
        </div>
        <div className="about-single-box">
          <div className="about-content">
            <p>
              Welkom bij De Zelfontspanners! Wij zijn een actieve vereniging van fotografieliefhebbers 
              die elkaar inspireren en helpen groeien in de kunst van fotografie.
            </p>
            <p>
              Onze vereniging organiseert regelmatig excursies, workshops en bijeenkomsten waar leden 
              hun passie voor fotografie kunnen delen en ontwikkelen.
            </p>
            <Link href="/over-ons" className="btn btn-primary">
              Lees Meer
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
