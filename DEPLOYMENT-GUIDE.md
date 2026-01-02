# Deployment Guide - De Zelfontspanners Website

## Overzicht

Deze Next.js applicatie kan worden gedeployed op verschillende platforms. Deze guide beschrijft de stappen voor de meest gebruikte opties.

## Vereisten

- ✅ Supabase database is ingesteld en tabellen zijn aangemaakt
- ✅ Environment variables zijn bekend
- ✅ Git repository (optioneel maar aanbevolen)

## Environment Variables

Je hebt de volgende environment variables nodig:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Je vindt deze in je Supabase project onder **Settings > API**.

---

## Optie 1: Vercel (Aanbevolen - Eenvoudigst)

Vercel is gemaakt door de makers van Next.js en is de eenvoudigste manier om Next.js apps te deployen.

### Stappen:

1. **Maak een Vercel account**
   - Ga naar [vercel.com](https://vercel.com)
   - Maak een gratis account (of log in met GitHub)

2. **Import je project**
   - Klik op "Add New Project"
   - Import je Git repository (GitHub/GitLab/Bitbucket)
   - Of upload de code direct

3. **Configureer Environment Variables**
   - In het project dashboard, ga naar **Settings > Environment Variables**
   - Voeg toe:
     - `NEXT_PUBLIC_SUPABASE_URL` = je Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = je Supabase anon key
   - Selecteer alle environments (Production, Preview, Development)

4. **Deploy**
   - Klik op "Deploy"
   - Vercel bouwt en deployt automatisch
   - Je krijgt een URL zoals `jouw-project.vercel.app`

5. **Custom Domain (optioneel)**
   - Ga naar **Settings > Domains**
   - Voeg je eigen domein toe
   - Volg de DNS instructies

### Voordelen Vercel:
- ✅ Gratis tier beschikbaar
- ✅ Automatische deployments bij Git push
- ✅ SSL certificaten automatisch
- ✅ Edge network voor snelle laadtijden
- ✅ Preview deployments voor elke branch

---

## Optie 2: Netlify

Netlify is een alternatief platform dat ook Next.js ondersteunt.

### Stappen:

1. **Maak een Netlify account**
   - Ga naar [netlify.com](https://netlify.com)
   - Maak een gratis account

2. **Deploy via Git**
   - Klik op "Add new site" > "Import an existing project"
   - Kies je Git provider
   - Selecteer je repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Of gebruik de Netlify Next.js plugin

4. **Environment Variables**
   - Ga naar **Site settings > Environment variables**
   - Voeg toe:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. **Deploy**
   - Klik op "Deploy site"
   - Netlify bouwt en deployt automatisch

---

## Optie 3: Eigen Server (VPS/Dedicated)

Als je een eigen server hebt (bijv. via Lokahost, TransIP, etc.)

### Vereisten:
- Node.js 18+ geïnstalleerd
- PM2 voor process management (aanbevolen)
- Nginx of Apache als reverse proxy

### Stappen:

1. **Upload code naar server**
   ```bash
   # Via Git
   git clone je-repository-url
   cd zelfontspanner.nl
   
   # Of via FTP/SFTP upload
   ```

2. **Installeer dependencies**
   ```bash
   npm install --production
   ```

3. **Maak .env bestand**
   ```bash
   nano .env.local
   ```
   Voeg toe:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

4. **Build de applicatie**
   ```bash
   npm run build
   ```

5. **Start met PM2**
   ```bash
   # Installeer PM2 (als je het nog niet hebt)
   npm install -g pm2
   
   # Start de applicatie
   pm2 start npm --name "zelfontspanners" -- start
   
   # Sla PM2 configuratie op
   pm2 save
   pm2 startup
   ```

6. **Configureer Nginx (reverse proxy)**
   Maak een configuratie bestand: `/etc/nginx/sites-available/zelfontspanners`
   ```nginx
   server {
       listen 80;
       server_name zelfontspanner.nl www.zelfontspanner.nl;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Activeer de configuratie:
   ```bash
   sudo ln -s /etc/nginx/sites-available/zelfontspanners /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

7. **SSL certificaat (Let's Encrypt)**
   ```bash
   sudo certbot --nginx -d zelfontspanner.nl -d www.zelfontspanner.nl
   ```

---

## Optie 4: Docker

Als je Docker gebruikt:

### Dockerfile:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### docker-compose.yml:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
    restart: unless-stopped
```

---

## Pre-Deployment Checklist

Voordat je deployt, controleer:

- [ ] Supabase database is ingesteld
- [ ] Database schema is uitgevoerd (`database/schema.sql`)
- [ ] Accounts zijn aangemaakt (`database/sync-accounts-to-db.sql`)
- [ ] Environment variables zijn bekend
- [ ] `npm run build` werkt lokaal zonder errors
- [ ] Alle dependencies zijn geïnstalleerd
- [ ] Git repository is up-to-date (als je Git gebruikt)

---

## Post-Deployment Checklist

Na deployment:

- [ ] Test login functionaliteit
- [ ] Test portfolio upload
- [ ] Test agenda events
- [ ] Test foto van de maand
- [ ] Controleer console voor errors
- [ ] Test op verschillende browsers
- [ ] Test op mobile devices

---

## Troubleshooting

### Build errors
- Controleer of alle dependencies zijn geïnstalleerd
- Controleer Node.js versie (moet 18+ zijn)
- Controleer TypeScript errors: `npm run lint`

### Runtime errors
- Controleer environment variables
- Controleer Supabase connectie
- Controleer browser console voor errors
- Controleer server logs

### Database errors
- Controleer of Supabase project actief is
- Controleer of tabellen zijn aangemaakt
- Controleer of environment variables correct zijn

---

## Aanbevolen: Vercel

Voor de meeste gebruikers is **Vercel de beste keuze** omdat:
- ✅ Gratis tier
- ✅ Automatische deployments
- ✅ SSL automatisch
- ✅ Snelle setup
- ✅ Goede Next.js integratie

---

## Hulp nodig?

Als je problemen hebt met deployment:
1. Controleer de logs (Vercel/Netlify dashboard of server logs)
2. Test lokaal eerst: `npm run build && npm start`
3. Controleer environment variables
4. Controleer Supabase connectie


