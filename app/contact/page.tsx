'use client'

import { useEffect, useState, useRef } from 'react'
import Script from 'next/script'

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_isuw6qv',
  TEMPLATE_ID: 'template_xpgqnpc',
  PUBLIC_KEY: '4-mPMWIQkgVmyQLgm'
}

declare global {
  interface Window {
    emailjs?: {
      init: (key: string) => void
      send: (serviceId: string, templateId: string, params: Record<string, string>) => Promise<any>
    }
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [files, setFiles] = useState<File[]>([])
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailjsReady, setEmailjsReady] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.emailjs) {
      window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
      setEmailjsReady(true)
    }
  }, [])

  const validateField = (field: HTMLInputElement | HTMLTextAreaElement): boolean => {
    let isValid = true
    const errorElement = document.getElementById(field.id + 'Error')
    
    field.classList.remove('error', 'success')
    
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false
      if (errorElement) errorElement.textContent = 'Dit veld is verplicht'
    } else if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(field.value)) {
        isValid = false
        if (errorElement) errorElement.textContent = 'Voer een geldig e-mailadres in'
      }
    } else if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[0-9\s\-+()]+$/
      if (!phoneRegex.test(field.value)) {
        isValid = false
        if (errorElement) errorElement.textContent = 'Voer een geldig telefoonnummer in'
      }
    } else if (field.hasAttribute('minlength')) {
      const minLength = parseInt(field.getAttribute('minlength') || '0')
      if (field.value.length < minLength) {
        isValid = false
        if (errorElement) errorElement.textContent = `Minimaal ${minLength} tekens vereist`
      }
    }
    
    if (isValid) {
      field.classList.add('success')
      if (errorElement) errorElement.textContent = ''
    } else {
      field.classList.add('error')
    }
    
    return isValid
  }

  const validateForm = (): boolean => {
    const nameField = document.getElementById('name') as HTMLInputElement
    const emailField = document.getElementById('email') as HTMLInputElement
    const messageField = document.getElementById('message') as HTMLTextAreaElement
    
    const nameValid = validateField(nameField)
    const emailValid = validateField(emailField)
    const messageValid = validateField(messageField)
    
    return nameValid && emailValid && messageValid
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validFiles = selectedFiles.filter(file => {
      if (!file.type.match(/^image\/(jpeg|jpg)$/i)) {
        alert(`${file.name}: Geen JPEG bestand`)
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}: Te groot (max 5MB)`)
        return false
      }
      return true
    })
    
    const totalFiles = files.length + validFiles.length
    if (totalFiles > 5) {
      alert('Maximaal 5 foto\'s toegestaan')
      const remaining = 5 - files.length
      setFiles(prev => [...prev, ...validFiles.slice(0, remaining)])
    } else {
      setFiles(prev => [...prev, ...validFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setMessage({ text: 'Controleer de verplichte velden en probeer het opnieuw.', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      if (emailjsReady && window.emailjs) {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Niet opgegeven',
          message: formData.message,
          photo_count: files.length > 0 ? files.length.toString() : 'Geen foto\'s',
          to_email: 'vanzijderveld@gmail.com'
        }
        
        await window.emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
        
        setMessage({ text: `Bedankt voor je bericht, ${formData.name}! Je bericht is verzonden.`, type: 'success' })
        setFormData({ name: '', email: '', phone: '', message: '' })
        setFiles([])
        if (fileInputRef.current) fileInputRef.current.value = ''
      } else {
        // Fallback to mailto
        let emailBody = `Nieuw contactformulier bericht van De Zelfontspanners website\n\n`
        emailBody += `Naam: ${formData.name}\n`
        emailBody += `E-mail: ${formData.email}\n`
        if (formData.phone) emailBody += `Telefoonnummer: ${formData.phone}\n`
        if (formData.message) emailBody += `\nBericht:\n${formData.message}\n`
        if (files.length > 0) emailBody += `\nAantal bijgevoegde foto's: ${files.length}\n`
        
        const mailtoLink = `mailto:vanzijderveld@gmail.com?subject=Contactformulier De Zelfontspanners - ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(emailBody)}`
        window.location.href = mailtoLink
        
        setTimeout(() => {
          setMessage({ text: `Bedankt voor je bericht, ${formData.name}! Je email client zou nu moeten openen.`, type: 'success' })
          setFormData({ name: '', email: '', phone: '', message: '' })
          setFiles([])
        }, 1000)
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setMessage({ text: 'Er ging iets mis bij het verzenden. Probeer het later opnieuw.', type: 'error' })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setMessage(null), 10000)
    }
  }

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        onLoad={() => {
          if (window.emailjs) {
            window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
            setEmailjsReady(true)
          }
        }}
      />
      <section className="portfolio-page">
        <div className="container">
          <div className="section-header">
            <h1>Contact</h1>
            <p className="section-subtitle">Contact opnemen en/of lid worden?</p>
          </div>

          <div className="contact-single-box">
            <div className="contact-box-content">
              <div className="contact-info-section">
                <h2>Lid worden?</h2>
                <p>
                  Ben je geïnteresseerd in fotografie en lijkt het je leuk om samen met anderen op pad te gaan? Dan ben je van harte welkom bij De Zelfontspanners!
                </p>
                <p>
                  Wij zijn een gezellige fotoclub waar alles mag en er niets moet. Elke maand gaan we op zondagochtend gezamenlijk naar een mooie locatie om naar hartenlust te fotograferen. Er is geen druk, geen verplichtingen - alleen de passie voor fotografie en het plezier van samen op pad zijn.
                </p>
                <p>
                  Wil je meer weten of een keer mee komen kennismaken? Stuur ons gerust een bericht via het contactformulier hiernaast of neem contact op via <a href="mailto:vanzijderveld@gmail.com">vanzijderveld@gmail.com</a>. We vertellen je graag meer over onze activiteiten en beantwoorden al je vragen.
                </p>
                <p>
                  Je kunt natuurlijk ook een keer meegaan tijdens een van onze fotowandelingen om te zien of het wat voor je is. Gewoon gezellig meelopen en kennismaken met de groep - zonder verplichtingen!
                </p>
                <p className="contact-cta-simple">
                  Heb je vragen of wil je meer informatie? Aarzel niet en neem contact met ons op!
                </p>

                <div className="contact-divider"></div>

                <h2>Contactgegevens</h2>
                <div className="contact-simple-details">
                  <div className="contact-simple-item">
                    <strong>Contactpersoon:</strong> Bert<br />
                    <a href="mailto:vanzijderveld@gmail.com">vanzijderveld@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="contact-form-section">
                <h2>Stuur een bericht</h2>
                {message && (
                  <div className={`form-message ${message.type}`} style={{ display: 'block' }}>
                    {message.text}
                  </div>
                )}
                <form className="contact-form-new" onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="name">Naam *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      minLength={2}
                      placeholder="Je volledige naam"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }))
                        validateField(e.target)
                      }}
                      onBlur={(e) => validateField(e.target)}
                    />
                    <span className="error-message" id="nameError"></span>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">E-mail adres *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="jouw@email.nl"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }))
                        validateField(e.target)
                      }}
                      onBlur={(e) => validateField(e.target)}
                    />
                    <span className="error-message" id="emailError"></span>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Telefoonnummer (optioneel)</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="06 12345678"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, phone: e.target.value }))
                        validateField(e.target)
                      }}
                      onBlur={(e) => validateField(e.target)}
                    />
                    <span className="error-message" id="phoneError"></span>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Bericht *</label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Vertel ons iets over jezelf, je interesse in fotografie, of stel je vraag..."
                      required
                      value={formData.message}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, message: e.target.value }))
                        validateField(e.target)
                      }}
                      onBlur={(e) => validateField(e.target)}
                    />
                    <span className="error-message" id="messageError"></span>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="photos">Foto's bijvoegen (optioneel - max 5 foto's)</label>
                    <div className="file-upload-wrapper">
                      <input
                        type="file"
                        id="photos"
                        ref={fileInputRef}
                        multiple
                        accept="image/jpeg,image/jpg"
                        onChange={handleFileSelect}
                      />
                      <label htmlFor="photos" className="file-upload-label">
                        <span className="file-upload-icon">📷</span>
                        <span className="file-upload-text">Kies foto's of sleep ze hierheen</span>
                        <span className="file-upload-hint">Maximaal 5 JPEG bestanden</span>
                      </label>
                      {files.length > 0 && (
                        <div className="file-list">
                          {files.map((file, index) => (
                            <div key={index} className="file-item">
                              <span>{file.name}</span>
                              <button type="button" onClick={() => removeFile(index)}>×</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <small>Je kunt optioneel een aantal foto's delen zodat we je stijl kunnen zien. JPEG formaat, maximaal 5MB per foto.</small>
                  </div>
                  
                  <div className="form-submit-wrapper">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      <span className="btn-text" style={{ display: isSubmitting ? 'none' : 'inline' }}>
                        Verstuur bericht
                      </span>
                      <span className="btn-loading" style={{ display: isSubmitting ? 'inline' : 'none' }}>
                        Verzenden...
                      </span>
                    </button>
                    <p className="form-note">* Verplichte velden</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
