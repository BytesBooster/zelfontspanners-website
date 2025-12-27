# Deployment Handleiding - De Zelfontspanners Website

## ✅ Website Status: Klaar voor Productie

De website is volledig functioneel en klaar om te worden geüpload naar Git en geïmplementeerd op Plesk.

## 📋 Pre-Deployment Checklist

### ✅ Functionaliteit
- [x] Alle pagina's werken correct
- [x] Navigatie werkt op alle pagina's
- [x] Login systeem functioneel
- [x] Portfolio upload en beheer werkt
- [x] Agenda systeem werkt
- [x] Foto van de Maand pagina werkt
- [x] Contactformulier werkt (EmailJS geconfigureerd)
- [x] Responsive design werkt op mobiel
- [x] Alle links werken

### ✅ Bestanden
- [x] Alle HTML bestanden aanwezig
- [x] Alle JavaScript bestanden aanwezig
- [x] CSS bestand aanwezig
- [x] Images map compleet
- [x] Geen hardcoded localhost URLs
- [x] Geen test data in productie code

## 🚀 Deployment Stappen

### Stap 1: Git Repository Voorbereiden

1. **Initialiseer Git repository** (als nog niet gedaan):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - De Zelfontspanners website"
   ```

2. **Maak een .gitignore bestand** (al aanwezig):
   - Development scripts worden automatisch uitgesloten
   - Test bestanden worden uitgesloten

3. **Push naar GitHub/GitLab**:
   ```bash
   git remote add origin [jouw-repository-url]
   git branch -M main
   git push -u origin main
   ```

### Stap 2: Bestanden voor Plesk Voorbereiden

#### Bestanden die WEL geüpload moeten worden:

**HTML Bestanden (10 bestanden):**
- ✅ `index.html`
- ✅ `leden.html`
- ✅ `over-ons.html`
- ✅ `contact.html`
- ✅ `agenda.html`
- ✅ `portfolio.html`
- ✅ `portfolio-manage.html`
- ✅ `login.html`
- ✅ `sponsors.html`
- ✅ `foto-van-de-maand.html`

**CSS Bestanden (1 bestand):**
- ✅ `styles.css`

**JavaScript Bestanden (12 bestanden):**
- ✅ `components.js`
- ✅ `script.js`
- ✅ `leden.js`
- ✅ `over-ons.js`
- ✅ `contact.js`
- ✅ `agenda.js`
- ✅ `portfolio.js`
- ✅ `portfolio-manage.js`
- ✅ `portfolio-manage-drag.js`
- ✅ `portfolio-data.js`
- ✅ `auth.js`
- ✅ `login.js`
- ✅ `foto-van-de-maand.js`

**Images Map:**
- ✅ `images/` (volledige map met alle subfolders)

#### Bestanden die NIET geüpload moeten worden:

**Development Scripts:**
- ❌ `create-portfolio-folders.js`
- ❌ `create-portfolio-folders.ps1`
- ❌ `download-albert-photos.js`
- ❌ `download-all-portfolios.js`
- ❌ `add-albert-photos-to-portfolio.js`
- ❌ `reset-passwords.js`
- ❌ `remove-alfred-account.js`
- ❌ `load-mock-data.js`
- ❌ `clear-mock-data.js`

**Test/Development HTML:**
- ❌ `test-mock-data.html`
- ❌ `fix-2025-to-2026.html`
- ❌ `add-2026-excursies.html`
- ❌ `remove-test-event.html`

**Documentatie (optioneel):**
- ❌ `README.md`
- ❌ `COMPONENTS.md`
- ❌ `PORTFOLIO-SETUP.md`
- ❌ `LOKAHOST-DEPLOYMENT.md`
- ❌ `MOCK-DATA-INSTRUCTIES.md`
- ❌ `TEST-RAPPORT.md`
- ❌ `EMAILJS-SETUP.md`
- ❌ `email-verzoek-profielfoto-en-agenda.md`
- ❌ `DEPLOYMENT.md` (deze file)

### Stap 3: Upload naar Plesk

#### Optie A: Via Plesk File Manager

1. **Log in op Plesk**
2. **Ga naar Websites & Domains**
3. **Selecteer je domein**
4. **Klik op "File Manager"**
5. **Ga naar `httpdocs` of `public_html` map**
6. **Upload alle bestanden**:
   - Sleep alle HTML bestanden naar de root
   - Sleep `styles.css` naar de root
   - Sleep alle `.js` bestanden naar de root
   - Upload de volledige `images/` map

#### Optie B: Via FTP/SFTP

1. **Gebruik FTP client** (FileZilla, WinSCP, etc.)
2. **Verbind met je Plesk server**
3. **Ga naar `httpdocs` of `public_html`**
4. **Upload alle bestanden** (houd structuur aan)

#### Optie C: Via Git in Plesk (Aanbevolen)

1. **In Plesk:**
   - Ga naar **Websites & Domains**
   - Klik op **Git**
   - Klik op **Add Repository**
   - Voer je Git repository URL in
   - Stel deployment directory in naar `httpdocs`
   - Klik op **Deploy**

2. **Of via SSH:**
   ```bash
   cd /var/www/vhosts/jouwdomein.nl/httpdocs
   git clone [jouw-repository-url] .
   ```

### Stap 4: Bestandsstructuur Controleren

Zorg dat de structuur op je server er zo uitziet:

```
httpdocs/
├── index.html
├── styles.css
├── components.js
├── script.js
├── auth.js
├── agenda.js
├── contact.js
├── foto-van-de-maand.js
├── leden.html
├── leden.js
├── over-ons.html
├── over-ons.js
├── contact.html
├── agenda.html
├── portfolio.html
├── portfolio.js
├── portfolio-manage.html
├── portfolio-manage.js
├── portfolio-manage-drag.js
├── portfolio-data.js
├── login.html
├── login.js
├── sponsors.html
├── foto-van-de-maand.html
└── images/
    ├── portfolio/
    │   ├── [lid-naam-1]/
    │   ├── [lid-naam-2]/
    │   └── ...
    └── [andere images]
```

### Stap 5: Testen na Deployment

1. **Open je website** in de browser
2. **Test alle pagina's:**
   - ✅ Homepage laadt correct
   - ✅ Navigatie werkt
   - ✅ Leden pagina toont alle leden
   - ✅ Portfolio pagina's werken
   - ✅ Login werkt
   - ✅ Agenda werkt
   - ✅ Foto van de Maand werkt
   - ✅ Contactformulier werkt

3. **Test functionaliteit:**
   - ✅ Inloggen als lid
   - ✅ Portfolio beheren
   - ✅ Foto's uploaden
   - ✅ Agenda evenementen toevoegen
   - ✅ Foto van de Maand uploaden

4. **Test op verschillende apparaten:**
   - ✅ Desktop browser
   - ✅ Mobiel apparaat
   - ✅ Tablet

## 🔧 Belangrijke Configuratie

### EmailJS (Contactformulier)

Het contactformulier gebruikt EmailJS. Controleer of de configuratie correct is in `contact.js`:

```javascript
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_isuw6qv',
    TEMPLATE_ID: 'template_amojmof',
    PUBLIC_KEY: '4-mPMWIQkgVmyQLgm'
};
```

### localStorage

- De website gebruikt browser localStorage voor data opslag
- Data wordt lokaal opgeslagen per gebruiker/browser
- Geen server-side database nodig
- Werkt direct na upload

## ⚠️ Belangrijke Opmerkingen

### Bestandspaden
- Alle paden zijn relatief (bijv. `images/portfolio/...`)
- Werkt op elke server zonder aanpassingen

### Browser Support
- Chrome (laatste versie)
- Firefox (laatste versie)
- Safari (laatste versie)
- Edge (laatste versie)

### Performance
- Alle JavaScript is geoptimaliseerd
- Images worden lazy-loaded waar mogelijk
- Geen externe dependencies (behalve Google Fonts en EmailJS)

## 🐛 Troubleshooting

### Probleem: Foto's worden niet geladen
- **Oplossing:** Controleer of de `images/` map volledig is geüpload
- Controleer bestandspaden (moeten relatief zijn)

### Probleem: JavaScript werkt niet
- **Oplossing:** Controleer browser console (F12) voor errors
- Controleer of alle `.js` bestanden zijn geüpload
- Controleer of bestanden in de juiste volgorde worden geladen

### Probleem: Styling werkt niet
- **Oplossing:** Controleer of `styles.css` is geüpload
- Controleer of het pad in HTML correct is: `href="styles.css"`

### Probleem: Contactformulier werkt niet
- **Oplossing:** Controleer EmailJS configuratie in `contact.js`
- Controleer of EmailJS script is geladen in `contact.html`

## 📞 Support

Voor vragen over deployment:
1. Controleer deze handleiding
2. Controleer browser console voor errors (F12)
3. Controleer Plesk logs

## ✅ Post-Deployment Checklist

Na deployment, controleer:
- [ ] Website laadt zonder errors
- [ ] Alle pagina's zijn toegankelijk
- [ ] Navigatie werkt op alle pagina's
- [ ] Login systeem werkt
- [ ] Portfolio functionaliteit werkt
- [ ] Agenda werkt
- [ ] Foto van de Maand werkt
- [ ] Contactformulier werkt
- [ ] Mobiele weergave werkt correct
- [ ] Alle foto's worden geladen

---

**De website is klaar voor productie! 🚀**
