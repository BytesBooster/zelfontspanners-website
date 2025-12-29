# 🚀 Quick Start Guide - De Zelfontspanners Website

## ✅ Wat is er al gedaan?

- ✅ Next.js conversie compleet
- ✅ Git repository geïnitialiseerd
- ✅ Eerste commits gemaakt
- ✅ Documentatie toegevoegd
- ✅ PM2 configuratie klaar
- ✅ Deployment scripts aanwezig

---

## 📋 Lokale Development

### Start Development Server
```bash
cd "c:\Users\jrdhn\Desktop\foto club wijchen"
npm install
npm run dev
```
Open: http://localhost:3000

### Build voor Productie
```bash
npm run build
npm start
```

---

## 🔗 GitHub Setup (Nog te doen)

### 1. Maak GitHub Repository
- Ga naar https://github.com/new
- Repository naam: `zelfontspanners-website`
- **NIET** initialiseren met README/.gitignore
- Klik "Create repository"

### 2. Koppel Lokale Repository
```bash
cd "c:\Users\jrdhn\Desktop\foto club wijchen"

# Voeg remote toe (vervang URL met jouw GitHub URL)
git remote add origin https://github.com/JouwGebruikersnaam/zelfontspanners-website.git

# Push naar GitHub
git push -u origin main
```

---

## 🌐 Server Deployment (Plesk)

### Via Git (Aanbevolen)
```bash
# SSH naar server
ssh root@185.255.131.147

# Ga naar project directory
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Clone repository (eerste keer)
git clone [jouw-github-url] .

# Of pull updates (volgende keren)
git pull origin main

# Installeer dependencies
npm install

# Build en deploy
./deploy.sh
```

### Handmatig Upload
1. Upload alle bestanden naar `/var/www/vhosts/zelfontspanners.nl/nodejs`
2. SSH naar server
3. Run: `npm install && npm run build && pm2 restart zelfontspanners`

---

## 📝 Handige Commands

### Git
```bash
# Status bekijken
git status

# Wijzigingen committen
git add .
git commit -m "Beschrijving"
git push

# Pull updates
git pull
```

### PM2
```bash
# Start app
pm2 start ecosystem.config.js

# Herstart app
pm2 restart zelfontspanners

# Stop app
pm2 stop zelfontspanners

# Bekijk logs
pm2 logs zelfontspanners

# Status
pm2 status
```

### Next.js
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint check
npm run lint
```

---

## 📁 Belangrijke Bestanden

- `package.json` - Project dependencies
- `next.config.js` - Next.js configuratie
- `ecosystem.config.js` - PM2 configuratie
- `deploy.sh` - Deployment script
- `.gitignore` - Git ignore regels
- `.gitattributes` - Line ending configuratie

---

## 📚 Documentatie

- `README.md` - Project overzicht
- `GIT-SETUP.md` - Git/GitHub setup handleiding
- `NEXTJS-DEPLOYMENT.md` - Deployment naar Plesk
- `CONVERSIE-COMPLEET.md` - Conversie overzicht
- `SETUP-COMPLEET.md` - Setup status

---

## ⚙️ Configuratie

### EmailJS (Contactformulier)
- Service ID: `service_isuw6qv`
- Template ID: `template_xpgqnpc`
- Public Key: `4-mPMWIQkgVmyQLgm`

### PM2
- App naam: `zelfontspanners`
- Poort: `3001`
- Logs: `/var/www/vhosts/zelfontspanners.nl/logs/`

---

## 🆘 Troubleshooting

### Port al in gebruik
```bash
# Zoek proces op poort 3001
lsof -i :3001  # Linux/Mac
netstat -ano | findstr :3001  # Windows

# Stop PM2 proces
pm2 stop zelfontspanners
```

### Build errors
```bash
# Verwijder node_modules en rebuild
rm -rf node_modules .next
npm install
npm run build
```

### Git errors
```bash
# Reset naar laatste commit
git reset --hard HEAD

# Pull met overwrite
git fetch origin
git reset --hard origin/main
```

---

## ✅ Volgende Stappen

1. ✅ **Git repository** - Klaar
2. ⏳ **GitHub repository** - Maak aan en koppel
3. ⏳ **Server deployment** - Deploy naar Plesk
4. ⏳ **Testen** - Test alle functionaliteit
5. ⏳ **Live gaan** - Website online!

---

**Alles is klaar voor deployment! 🎉**
