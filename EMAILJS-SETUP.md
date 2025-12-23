# EmailJS Setup Instructies

Het contactformulier is nu geconfigureerd om emails direct naar Bert's email adres te versturen via EmailJS.

## Stap 1: Account aanmaken

1. Ga naar https://www.emailjs.com/
2. Klik op "Sign Up" en maak een gratis account aan
3. Bevestig je email adres

## Stap 2: Email Service configureren

1. Log in op je EmailJS account
2. Ga naar "Email Services" in het menu
3. Klik op "Add New Service"
4. Kies "Gmail" (of een andere email provider)
5. Volg de instructies om je Gmail account te verbinden
6. Noteer de **Service ID** (bijvoorbeeld: `service_abc123`)

## Stap 3: Email Template maken

1. Ga naar "Email Templates" in het menu
2. Klik op "Create New Template"
3. Gebruik de volgende instellingen:

**Template Naam:** Contactformulier De Zelfontspanners

**Subject:** Nieuw contactformulier bericht - {{from_name}}

**Content (HTML):**
```html
<p>Nieuw contactformulier bericht van De Zelfontspanners website</p>

<p><strong>Naam:</strong> {{from_name}}</p>
<p><strong>E-mail:</strong> {{from_email}}</p>
<p><strong>Telefoonnummer:</strong> {{phone}}</p>

<p><strong>Bericht:</strong></p>
<p>{{message}}</p>

<p><strong>Aantal bijgevoegde foto's:</strong> {{photo_count}}</p>
```

**To Email:** vanzijderveld@gmail.com

**From Name:** De Zelfontspanners Website

4. Klik op "Save"
5. Noteer de **Template ID** (bijvoorbeeld: `template_xyz789`)

## Stap 4: Public Key ophalen

1. Ga naar "Account" → "General"
2. Scroll naar "API Keys"
3. Kopieer je **Public Key** (bijvoorbeeld: `abcdefghijklmnop`)

## Stap 5: Configuratie toevoegen aan contact.js

Open `contact.js` en vervang de volgende waarden:

1. Zoek naar `const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';`
   - Vervang `YOUR_SERVICE_ID` met je Service ID uit Stap 2

2. Zoek naar `const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';`
   - Vervang `YOUR_TEMPLATE_ID` met je Template ID uit Stap 3

3. Zoek naar `const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';`
   - Vervang `YOUR_PUBLIC_KEY` met je Public Key uit Stap 4

**Voorbeeld:**
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
const EMAILJS_PUBLIC_KEY = 'abcdefghijklmnop';
```

## Stap 6: Testen

1. Open de website
2. Ga naar de contact pagina
3. Vul het formulier in
4. Verstuur het formulier
5. Controleer of je een email ontvangt op vanzijderveld@gmail.com

## Troubleshooting

- **Email komt niet aan:** Controleer of alle IDs correct zijn ingevuld
- **JavaScript errors:** Open de browser console (F12) en controleer op errors
- **Service niet gevonden:** Zorg dat je EmailJS account actief is en de service correct is geconfigureerd

## Gratis Limiet

EmailJS gratis account:
- 200 emails per maand
- Perfect voor een fotoclub website

Als je meer emails nodig hebt, kun je upgraden naar een betaald plan.

## Fallback

Als EmailJS niet is geconfigureerd, valt het formulier terug op de oude `mailto:` methode die de email client van de gebruiker opent.
