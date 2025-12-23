# De Zelfontspanners Website - Plesk Deployment Handleiding

## Overzicht
Deze handleiding beschrijft hoe je de De Zelfontspanners statische website toevoegt aan de Plesk server naast bytesbooster.nl.

**Belangrijk:** Dit is een **statische website** (HTML/CSS/JS), geen Next.js applicatie. Geen PM2 of Node.js nodig!

---

## Vereisten
- Nieuwe domain of subdomain (bijv. `zelfontspanners.nl` of `zelfontspanners.bytesbooster.nl`)
- Toegang tot Plesk
- GitHub repository (of maak er een aan)

---

## Stap 1: Domain Toevoegen in Plesk

### Via Plesk Interface:

1. **Log in op Plesk** (via SSH tunnel: `https://localhost:8443`)
2. Klik op **"Add Domain"** (of **"Add Subdomain"**)
3. Vul in:
   - **Domain name**: `zelfontspanners.nl` (of je domein)
   - **Hosting type**: **"Website Hosting"** ✅
   - **Document root**: `/var/www/vhosts/zelfontspanners.nl/httpdocs` (standaard)
4. Klik op **OK**

### SSL Certificaat Installeren:

1. Ga naar **SSL/TLS Certificates**
2. Klik op **"Install a free basic certificate provided by Let's Encrypt"**
3. Selecteer:
   - ✅ Secure the domain name
   - ✅ Include a "www" subdomain
4. Klik op **"Get it free"**

---

## Stap 2: Git Repository Setup

### Lokaal (Windows):

```powershell
# Ga naar project folder
cd "C:\Users\jrdhn\Desktop\foto club wijchen"

# Initialiseer Git (als nog niet gedaan)
git init

# Voeg GitHub repository toe
git remote add origin https://github.com/JouwGebruikersnaam/zelfontspanners-website.git

# Maak eerste commit
git add .
git commit -m "Initial commit - De Zelfontspanners website"

# Push naar GitHub
git push -u origin main
```

---

## Stap 3: Upload naar Plesk

### Optie A: Via Plesk File Manager (Eenvoudigst)

1. **Log in op Plesk**
2. Ga naar **Websites & Domains** → **zelfontspanners.nl**
3. Klik op **"File Manager"**
4. Ga naar `httpdocs` map
5. **Upload alle bestanden:**
   - Alle `.html` bestanden (10 bestanden)
   - `styles.css`
   - Alle `.js` bestanden (12 bestanden)
   - De volledige `images/` map (met alle subfolders)

**Bestandsstructuur:**
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

### Optie B: Via Git in Plesk (Aanbevolen voor updates)

1. **In Plesk:**
   - Ga naar **Websites & Domains** → **zelfontspanners.nl**
   - Klik op **Git**
   - Klik op **Enable Git**
   - Vul in:
     - **Repository URL**: `https://github.com/JouwGebruikersnaam/zelfontspanners-website.git`
     - **Branch**: `main`
     - **Deployment path**: `/var/www/vhosts/zelfontspanners.nl/httpdocs`
     - **Update repository by**: `Pulling changes`
   - Klik op **OK**
   - Klik op **Pull now** voor eerste pull

2. **Of via SSH:**
   ```bash
   ssh root@185.255.131.147
   cd /var/www/vhosts/zelfontspanners.nl/httpdocs
   git clone https://github.com/JouwGebruikersnaam/zelfontspanners-website.git .
   ```

### Optie C: Via FTP/SFTP

1. **Gebruik FTP client** (FileZilla, WinSCP, etc.)
2. **Verbind met je Plesk server**
3. **Ga naar `httpdocs`**
4. **Upload alle bestanden** (houd structuur aan)

---

## Stap 4: Bestandsstructuur Controleren

Zorg dat alle bestanden correct zijn geüpload:

### HTML Bestanden (10 bestanden):
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

### JavaScript Bestanden (12 bestanden):
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

### CSS Bestanden (1 bestand):
- ✅ `styles.css`

### Images Map:
- ✅ `images/` (volledige map met alle subfolders)

---

## Stap 5: Permissies Instellen

### Via SSH (optioneel):

```bash
ssh root@185.255.131.147

# Stel juiste permissies in
chown -R psaadm:psaserv /var/www/vhosts/zelfontspanners.nl/httpdocs
chmod -R 755 /var/www/vhosts/zelfontspanners.nl/httpdocs
```

---

## Stap 6: Testen

### In Browser:
1. Open `https://zelfontspanners.nl`
2. Controleer of de homepage laadt
3. Test alle pagina's:
   - ✅ Homepage
   - ✅ Leden pagina
   - ✅ Portfolio pagina's
   - ✅ Agenda
   - ✅ Foto van de Maand
   - ✅ Contact
   - ✅ Login

### Functionaliteit Testen:
- ✅ Navigatie werkt op alle pagina's
- ✅ Login systeem werkt
- ✅ Portfolio upload werkt (na inloggen)
- ✅ Agenda evenementen kunnen worden toegevoegd
- ✅ Foto van de Maand upload werkt
- ✅ Contactformulier werkt (EmailJS)

### Mobiel Testen:
- ✅ Website werkt op mobiel apparaat
- ✅ Responsive design werkt correct

---

## Stap 7: Automatische Updates (Git)

### Voor toekomstige updates:

**Via Plesk Git:**
1. Maak wijzigingen lokaal
2. Commit en push naar GitHub:
   ```bash
   git add .
   git commit -m "Update beschrijving"
   git push
   ```
3. In Plesk: Ga naar **Git** → **Pull now**

**Of via SSH:**
```bash
ssh root@185.255.131.147
cd /var/www/vhosts/zelfontspanners.nl/httpdocs
git pull origin main
```

---

## Checklist voor Deployment

- [ ] Domain toegevoegd in Plesk
- [ ] SSL certificaat geïnstalleerd
- [ ] Git repository aangemaakt en gepusht
- [ ] Alle HTML bestanden geüpload (10 bestanden)
- [ ] Alle JavaScript bestanden geüpload (12 bestanden)
- [ ] CSS bestand geüpload (`styles.css`)
- [ ] Images map volledig geüpload
- [ ] Bestandsstructuur correct
- [ ] Permissies ingesteld (optioneel)
- [ ] Website getest in browser
- [ ] Alle functionaliteit getest
- [ ] Mobiele weergave getest
- [ ] Plesk Git geconfigureerd (voor updates)

---

## Belangrijke Notities

### Statische Website
- ✅ Geen server-side code nodig
- ✅ Geen PM2 of Node.js nodig
- ✅ Werkt direct na upload
- ✅ Geen build proces nodig

### localStorage
- De website gebruikt browser localStorage voor data opslag
- Data wordt lokaal opgeslagen per gebruiker/browser
- Geen database nodig

### EmailJS
- Contactformulier gebruikt EmailJS
- Configuratie staat in `contact.js`
- Geen server-side email configuratie nodig

### Bestandspaden
- Alle paden zijn relatief (bijv. `images/portfolio/...`)
- Werkt op elke server zonder aanpassingen

---

## Troubleshooting

### Website laadt niet?
- Controleer of alle bestanden zijn geüpload
- Controleer bestandspaden (moeten relatief zijn)
- Controleer browser console voor errors (F12)

### Foto's worden niet geladen?
- Controleer of de `images/` map volledig is geüpload
- Controleer bestandspaden in code
- Controleer browser console voor 404 errors

### JavaScript werkt niet?
- Controleer of alle `.js` bestanden zijn geüpload
- Controleer browser console voor errors (F12)
- Controleer of bestanden in de juiste volgorde worden geladen

### Styling werkt niet?
- Controleer of `styles.css` is geüpload
- Controleer of het pad in HTML correct is: `href="styles.css"`

### Contactformulier werkt niet?
- Controleer EmailJS configuratie in `contact.js`
- Controleer of EmailJS script is geladen in `contact.html`
- Controleer browser console voor errors

---

## Belangrijk: Bestanden die NIET geüpload moeten worden

De volgende bestanden worden automatisch uitgesloten via `.gitignore`:

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

**Documentatie:**
- ❌ `README.md`
- ❌ `COMPONENTS.md`
- ❌ `PORTFOLIO-SETUP.md`
- ❌ `LOKAHOST-DEPLOYMENT.md`
- ❌ `MOCK-DATA-INSTRUCTIES.md`
- ❌ `TEST-RAPPORT.md`
- ❌ `EMAILJS-SETUP.md`
- ❌ `email-verzoek-profielfoto-en-agenda.md`
- ❌ `DEPLOYMENT.md`
- ❌ `PLESK-DEPLOYMENT.md` (deze file)

---

**De website is klaar voor productie! 🚀**

**Laatste update**: December 2025
