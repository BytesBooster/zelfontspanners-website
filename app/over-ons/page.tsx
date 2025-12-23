import Image from 'next/image'

export default function OverOnsPage() {
  return (
    <section className="portfolio-page">
      <div className="container">
        <div className="section-header">
          <h1>Over Ons</h1>
          <p className="section-subtitle">Wil je graag meer weten over De Zelfontspanners?</p>
        </div>

        <div className="about-single-box">
          <div className="about-content">
            <p className="about-intro-text">
              Lees dan even verder, misschien kan de volgende informatie je op weg helpen.
            </p>

            <div className="about-photo-container">
              <Image
                src="/images/about-club.png"
                alt="De Zelfontspanners - Leden aan het fotograferen"
                width={800}
                height={600}
                className="about-photo"
              />
            </div>

            <div className="about-section">
              <h2>Onze Geschiedenis</h2>
              <p>
                In 2009 vonden acht cursisten van een fotocursus bij Foto Roos het leuk om er af en toe gezamenlijk op uit te trekken en te gaan fotograferen. In 2011 hebben Cor van den Berg en Bert Panhuizen samen de leiding genomen om mooie fotolocaties te regelen. Het was een gezellige vriendenclub met als motto: alles mag en er moet niets.
              </p>
              <p>
                Al die jaren had de club geen naam. Foto Roos organiseerde in oktober 2013 een wedstrijd om een geschikte naam voor deze fotoclub te bedenken. Op 6 november 2013 was de uitslag bekend en met de meeste stemmen werd de door Bert van Zijderveld bedachte naam "De Zelfontspanners" aangenomen.
              </p>
              <p>
                Fotoclub "De Zelfontspanners" was geboren.
              </p>
              <p>
                Sinds 2014 is Bert van Zijderveld voorzitter van De Zelfontspanners. Inmiddels zijn we uitgegroeid tot ongeveer 40 leden.
              </p>
              <p>
                Vanaf 2017 levert onze website met sponsoring van het jaarlijkse.
              </p>
              <p>
                In mei 2017 hadden we onze eerste in hartje Nijmegen bij Dekker van de Vegt Boekhandel.
              </p>
              <p>
                Elke maand gaan we op zondagochtend gezamenlijk naar een locatie om naar hartenlust te fotograferen. Gebruik het menu op de website om onze activiteiten en te zien.
              </p>
              <p>
                Al deze jaren heeft sponsor onze fotoclub een warm hart toe gedragen en we hopen voor de toekomst dat dit nog lang zo mag blijven.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
