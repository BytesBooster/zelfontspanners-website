import Link from 'next/link'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>De Zelfontspanners</h3>
            <p>Passie voor fotografie</p>
          </div>
          <div className="footer-section">
            <h4>Navigatie</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/agenda">Agenda</Link></li>
              <li><Link href="/leden">Leden</Link></li>
              <li><Link href="/over-ons">Over Ons</Link></li>
              <li><Link href="/sponsors">Sponsors</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p><a href="mailto:vanzijderveld@gmail.com">vanzijderveld@gmail.com</a></p>
            <p>Bert van Zijderveld</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 De Zelfontspanners. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}
