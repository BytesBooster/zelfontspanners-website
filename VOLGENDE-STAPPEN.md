# ✅ Wat is Al Gedaan

## ✅ Cloudinary Setup
- ✅ Cloudinary account aangemaakt
- ✅ Credentials toegevoegd aan `.env.local`:
  - Cloud Name: `dp9lcxbfu`
  - API Key: `877964424671325`
  - API Secret: (veilig opgeslagen)

## ✅ Supabase Setup
- ✅ Supabase account aangemaakt
- ✅ Project aangemaakt: `zelfontspanners-portfolio`
- ✅ Database tabel `portfolio_photos` aangemaakt (SQL query uitgevoerd)
- ✅ Credentials toegevoegd aan `.env.local`:
  - Project URL: `https://emhidjqtxjnnrlgbbmyi.supabase.co`
  - Anon Key: (veilig opgeslagen)

## ✅ Code Implementatie
- ✅ Backend API routes gemaakt (`/api/upload`, `/api/delete-photo`)
- ✅ Supabase integratie (`lib/supabase.ts`)
- ✅ Frontend aangepast (`app/portfolio-manage/page.tsx`, `app/portfolio/page.tsx`)
- ✅ Dependencies geïnstalleerd (`cloudinary`, `@supabase/supabase-js`)

---

# 🚀 Wat Moet Je Nu Doen

## Stap 1: Testen Lokaal

### 1.1 Start Development Server
```bash
npm run dev
```

### 1.2 Test Portfolio Upload
1. Open http://localhost:3000
2. Log in met je account (wachtwoord: `test123`)
3. Ga naar **Portfolio Beheer**
4. Upload een test foto
5. Controleer of:
   - ✅ Foto wordt geüpload zonder errors
   - ✅ Foto verschijnt in je portfolio
   - ✅ Foto is zichtbaar in Cloudinary Dashboard → Media Library
   - ✅ Metadata is zichtbaar in Supabase Dashboard → Table Editor → `portfolio_photos`

### 1.3 Test Portfolio Weergave
1. Ga naar **Leden** pagina
2. Klik op je naam
3. Controleer of je geüploade foto zichtbaar is

### 1.4 Test Foto Verwijderen
1. Ga terug naar **Portfolio Beheer**
2. Klik op **Verwijderen** bij een foto
3. Controleer of:
   - ✅ Foto wordt verwijderd uit portfolio
   - ✅ Foto wordt verwijderd van Cloudinary
   - ✅ Metadata wordt verwijderd uit Supabase

---

## Stap 2: Environment Variables op Server Instellen

### Optie A: Via Plesk (Aanbevolen)

1. Log in op Plesk
2. Ga naar **Websites & Domains** → **zelfontspanners.nl**
3. Klik op **"Environment Variables"** (of zoek naar "Environment")
4. Voeg de volgende variabelen toe:

```
CLOUDINARY_CLOUD_NAME = dp9lcxbfu
CLOUDINARY_API_KEY = 877964424671325
CLOUDINARY_API_SECRET = jEZWkfFP9CTxvcqHdbuBgaL9tS0
NEXT_PUBLIC_SUPABASE_URL = https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
```

5. Klik op **OK**

### Optie B: Via PM2 Ecosystem Config

Open `ecosystem.config.js` en voeg toe aan `env`:

```javascript
env: {
  NODE_ENV: 'production',
  PORT: 3001,
  CLOUDINARY_CLOUD_NAME: 'dp9lcxbfu',
  CLOUDINARY_API_KEY: '877964424671325',
  CLOUDINARY_API_SECRET: 'jEZWkfFP9CTxvcqHdbuBgaL9tS0',
  NEXT_PUBLIC_SUPABASE_URL: 'https://emhidjqtxjnnrlgbbmyi.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds',
}
```

---

## Stap 3: Deployment naar Server

### 3.1 Build Maken
```bash
npm run build
```

### 3.2 Upload naar Server
- Via Git (als je Git hebt ingesteld op server)
- Of upload handmatig:
  - `.next/standalone/` folder
  - `.next/static/` folder
  - `public/` folder
  - `package.json`
  - `ecosystem.config.js`

### 3.3 PM2 Herstarten
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
pm2 restart zelfontspanners
# Of
pm2 start ecosystem.config.js
```

### 3.4 Testen op Server
1. Open https://zelfontspanners.nl
2. Test portfolio upload
3. Controleer of alles werkt

---

## Stap 4: (Optioneel) Bestaande Foto's Migreren

Als je bestaande foto's in localStorage hebt die je wilt migreren naar Cloudinary:

1. Exporteer foto's uit localStorage
2. Upload ze via Portfolio Beheer
3. Oude localStorage data kan worden verwijderd

---

## ✅ Checklist

- [ ] Lokaal getest (upload werkt)
- [ ] Lokaal getest (verwijderen werkt)
- [ ] Lokaal getest (portfolio weergave werkt)
- [ ] Environment variables ingesteld op server
- [ ] Build gemaakt (`npm run build`)
- [ ] Gedeployed naar server
- [ ] PM2 herstart
- [ ] Getest op productie server

---

## 🆘 Problemen?

### Fout: "Cloudinary configuratie niet gevonden"
- Controleer of `.env.local` bestaat en correct is
- Controleer of environment variables zijn ingesteld op server

### Fout: "Supabase niet geconfigureerd"
- Controleer of `NEXT_PUBLIC_SUPABASE_URL` en `NEXT_PUBLIC_SUPABASE_ANON_KEY` zijn ingesteld
- Controleer of de tabel `portfolio_photos` bestaat in Supabase

### Fout: "Upload mislukt"
- Controleer Cloudinary credentials
- Controleer bestandsgrootte (max 5MB)
- Controleer bestandsformaat (alleen JPEG)

### Foto's worden niet getoond
- Controleer browser console voor errors
- Controleer of foto's in Cloudinary staan
- Controleer of metadata in Supabase staat

---

## 📞 Hulp Nodig?

- Email: vanzijderveld@gmail.com
- Cloudinary Docs: https://cloudinary.com/documentation
- Supabase Docs: https://supabase.com/docs

---

**Je bent bijna klaar! Test eerst lokaal, dan deploy je naar de server.** 🚀



