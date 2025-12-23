# Lokahost Deployment Handleiding

## Overzicht
Deze website is een statische website die volledig client-side werkt. Alle data wordt opgeslagen in de browser's localStorage.

## Bestanden die nodig zijn voor Lokahost

### HTML Bestanden (9 bestanden)
- ✅ `index.html` - Hoofdpagina
- ✅ `leden.html` - Leden overzicht
- ✅ `over-ons.html` - Over ons pagina
- ✅ `contact.html` - Contact pagina
- ✅ `agenda.html` - Agenda pagina
- ✅ `portfolio.html` - Portfolio bekijken pagina
- ✅ `portfolio-manage.html` - Portfolio beheer pagina
- ✅ `login.html` - Login pagina
- ✅ `sponsors.html` - Sponsors pagina

### CSS Bestanden (1 bestand)
- ✅ `styles.css` - Alle styling

### JavaScript Bestanden voor Website (10 bestanden)
- ✅ `components.js` - Navigatie en footer componenten
- ✅ `script.js` - Hoofdpagina functionaliteit (hero slider)
- ✅ `leden.js` - Leden pagina functionaliteit
- ✅ `over-ons.js` - Over ons pagina functionaliteit
- ✅ `contact.js` - Contact pagina functionaliteit
- ✅ `agenda.js` - Agenda functionaliteit
- ✅ `portfolio.js` - Portfolio bekijken functionaliteit
- ✅ `portfolio-manage.js` - Portfolio beheer functionaliteit
- ✅ `portfolio-manage-drag.js` - Drag & drop functionaliteit
- ✅ `portfolio-data.js` - Portfolio data beheer
- ✅ `auth.js` - Authenticatie systeem
- ✅ `login.js` - Login pagina functionaliteit

### Images Map
- ✅ `images/` - Alle afbeeldingen (portfolio foto's, logo's, etc.)

## Bestanden die NIET nodig zijn voor Lokahost

### Development Scripts (kunnen worden weggelaten)
- ❌ `create-portfolio-folders.js` - Node.js script voor development
- ❌ `create-portfolio-folders.ps1` - PowerShell script voor development
- ❌ `download-albert-photos.js` - Node.js script voor development
- ❌ `download-all-portfolios.js` - Node.js script voor development
- ❌ `add-albert-photos-to-portfolio.js` - Node.js script voor development
- ❌ `reset-passwords.js` - Browser console script voor development

### Documentatie (optioneel)
- ❌ `README.md` - Documentatie
- ❌ `COMPONENTS.md` - Component documentatie
- ❌ `PORTFOLIO-SETUP.md` - Portfolio setup documentatie
- ❌ `LOKAHOST-DEPLOYMENT.md` - Deze handleiding

## Upload Instructies voor Lokahost

### Stap 1: Bestanden voorbereiden
1. Maak een nieuwe map aan (bijvoorbeeld `website-files`)
2. Kopieer alle benodigde bestanden naar deze map:
   - Alle `.html` bestanden
   - `styles.css`
   - Alle `.js` bestanden (behalve de development scripts)
   - De hele `images/` map

### Stap 2: Upload naar Lokahost
1. Log in op je Lokahost account
2. Ga naar File Manager of gebruik FTP
3. Upload alle bestanden naar de `public_html` of `www` map
4. Zorg dat de structuur behouden blijft:
   ```
   public_html/
   ├── index.html
   ├── styles.css
   ├── components.js
   ├── script.js
   ├── leden.html
   ├── leden.js
   ├── ... (andere HTML/JS bestanden)
   └── images/
       └── portfolio/
           └── (alle leden folders)
   ```

### Stap 3: Controleer
1. Open je website in de browser
2. Controleer of alle pagina's werken
3. Test de navigatie
4. Test het portfolio systeem

## Belangrijke Opmerkingen

### localStorage
- De website gebruikt browser localStorage voor data opslag
- Dit betekent dat data lokaal wordt opgeslagen per gebruiker/browser
- Als je data wilt delen tussen gebruikers, heb je een backend nodig

### Portfolio Foto's
- Alle portfolio foto's staan in `images/portfolio/[lid-naam]/`
- Deze moeten allemaal geüpload worden
- Controleer of alle foto's correct zijn geüpload

### JavaScript Dependencies
- De website gebruikt geen externe JavaScript libraries
- Alle functionaliteit is custom JavaScript
- Werkt in alle moderne browsers

## Troubleshooting

### Probleem: Foto's worden niet geladen
- Controleer of de `images/` map correct is geüpload
- Controleer de bestandspaden (moeten relatief zijn: `images/portfolio/...`)

### Probleem: JavaScript werkt niet
- Controleer of alle `.js` bestanden zijn geüpload
- Open browser console (F12) om errors te zien
- Controleer of bestanden in de juiste volgorde worden geladen

### Probleem: Styling werkt niet
- Controleer of `styles.css` is geüpload
- Controleer of het pad in HTML correct is: `href="styles.css"`

## Contact
Voor vragen over deployment, controleer de Lokahost documentatie of neem contact op met Lokahost support.

