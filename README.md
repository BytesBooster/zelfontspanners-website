# De Zelfontspanners Website - Next.js

Een moderne, responsive website voor De Zelfontspanners gebouwd met Next.js, React en TypeScript.

## 🚀 Features

- 🎨 Modern en responsive design
- 📱 Volledig mobiel-vriendelijk
- 📝 Agenda met CRUD functionaliteit
- 🏆 Foto van de Maand met upload en stemmen
- 👥 Leden Portfolio galerij
- 🖼️ Interactieve fotogalerij met likes en comments
- 📧 Contactformulier met EmailJS integratie
- 🔐 Leden authenticatie systeem
- ✨ Smooth scrolling en animaties
- 🎯 SEO-vriendelijk

## 🛠️ Technologie Stack

- **Next.js 14** - React framework
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library
- **PM2** - Process manager voor production
- **localStorage** - Client-side data storage

## 📦 Installatie

### Vereisten
- Node.js 18+ 
- npm of yarn

### Stappen

1. **Clone repository**
   ```bash
   git clone [repository-url]
   cd foto-club-wijchen
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Development server starten**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Build & Production

### Build maken
```bash
npm run build
```

### Production server starten
```bash
npm start
```

### PM2 (Production)
```bash
pm2 start ecosystem.config.js
```

## 📁 Project Structuur

```
foto club wijchen/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── agenda/            # Agenda pagina
│   ├── leden/             # Leden pagina
│   ├── contact/           # Contact pagina
│   ├── login/             # Login pagina
│   ├── portfolio/         # Portfolio bekijken
│   └── portfolio-manage/  # Portfolio beheer
├── components/            # React components
├── lib/                   # Utilities
├── public/                # Static files
│   ├── images/            # Images
│   └── portfolio-data.js  # Portfolio data
├── package.json
├── next.config.js
├── ecosystem.config.js    # PM2 configuratie
└── deploy.sh              # Deployment script
```

## 🌐 Deployment

Zie `NEXTJS-DEPLOYMENT.md` voor volledige deployment instructies naar Plesk.

### Quick Start
1. Upload naar server
2. `npm install`
3. `npm run build`
4. `pm2 start ecosystem.config.js`
5. Configureer Nginx proxy naar poort 3001

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Maak production build
- `npm start` - Start production server (standalone mode: `node .next/standalone/server.js`)
- `npm run lint` - Run linter

**Belangrijk:** Met `output: standalone` in next.config.js gebruik je `node .next/standalone/server.js` in plaats van `next start`. De `npm start` script is hierop aangepast.

## 🔧 Configuratie

### EmailJS (Contactformulier)
Configuratie staat in `app/contact/page.tsx`:
- SERVICE_ID: `service_isuw6qv`
- TEMPLATE_ID: `template_amojmof`
- PUBLIC_KEY: `4-mPMWIQkgVmyQLgm`

### PM2
- App naam: `zelfontspanners`
- Poort: `3001`
- Logs: `/var/www/vhosts/zelfontspanners.nl/logs/`

## 📚 Documentatie

- `NEXTJS-DEPLOYMENT.md` - Deployment handleiding
- `GIT-SETUP.md` - Git repository setup
- `CONVERSIE-COMPLEET.md` - Conversie overzicht
- `SETUP-COMPLEET.md` - Setup status

## 👥 Leden

De website ondersteunt authenticatie voor alle actieve leden. Standaard wachtwoord: `test123`

## 📞 Contact

Voor vragen of ondersteuning:
- Email: vanzijderveld@gmail.com
- Contactpersoon: Bert van Zijderveld

## 📄 Licentie

Dit project is gemaakt voor De Zelfontspanners.

---

**De website is klaar voor productie! 🚀**
