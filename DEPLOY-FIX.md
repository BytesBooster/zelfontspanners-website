# DEPLOYMENT FIX - Nieuwe versie deployen

## Probleem
De live website draait een oude versie omdat:
1. De build wordt uitgevoerd ZONDER environment variables
2. Next.js standalone builds hebben `NEXT_PUBLIC_*` vars nodig TIJDENS de build
3. De nieuwe API routes (`/api/portfolio/likes`, etc.) werken niet omdat Supabase niet geconfigureerd is

## Oplossing

### Stap 1: Zorg dat `.env` file bestaat op de server

SSH naar de server en voer uit:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Maak .env file aan (als deze niet bestaat)
cat > .env << 'EOF'
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
CLOUDINARY_CLOUD_NAME=dp9lcxbfu
CLOUDINARY_API_KEY=877964424671325
CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0
EOF

# Verifieer dat .env bestaat
cat .env
```

### Stap 2: Voer een CLEAN rebuild uit

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Stop PM2
pm2 stop zelfontspanners

# Verwijder oude build
rm -rf .next
rm -rf node_modules/.cache

# Pull laatste code
git pull origin main

# Installeer dependencies
npm install --legacy-peer-deps

# Build MET environment variables beschikbaar
export NODE_OPTIONS="--max-old-space-size=4096"
export $(cat .env | grep -v '^#' | xargs)
npm run build

# Herstart PM2
pm2 restart zelfontspanners

# Check status
pm2 status
pm2 logs zelfontspanners --lines 20
```

### Stap 3: Verifieer dat alles werkt

1. Check of nieuwe API routes werken:
   - Open browser console
   - Ga naar een portfolio pagina
   - Check of `/api/portfolio/likes` calls werken (geen 500 errors)

2. Check of login werkt:
   - Ga naar `/login`
   - Probeer in te loggen
   - Check of redirect naar `/change-password` werkt als nodig

## Snelle fix (alles in één keer)

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs && \
pm2 stop zelfontspanners && \
rm -rf .next node_modules/.cache && \
git pull origin main && \
npm install --legacy-peer-deps && \
export NODE_OPTIONS="--max-old-space-size=4096" && \
export $(cat .env | grep -v '^#' | xargs) && \
npm run build && \
pm2 restart zelfontspanners && \
pm2 logs zelfontspanners --lines 20
```

## Troubleshooting

Als je nog steeds 500 errors krijgt:

1. **Check of .env file bestaat:**
   ```bash
   ls -la /var/www/vhosts/zelfontspanners.nl/nodejs/.env
   cat /var/www/vhosts/zelfontspanners.nl/nodejs/.env
   ```

2. **Check PM2 logs:**
   ```bash
   pm2 logs zelfontspanners --lines 50
   ```

3. **Check of nieuwe API routes bestaan in build:**
   ```bash
   ls -la /var/www/vhosts/zelfontspanners.nl/nodejs/.next/server/app/api/portfolio/likes/
   ```

4. **Test database connectie:**
   ```bash
   cd /var/www/vhosts/zelfontspanners.nl/nodejs
   node -e "require('dotenv').config(); const {createClient} = require('@supabase/supabase-js'); const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY); supabase.from('accounts').select('count').then(r => console.log('DB OK:', r)).catch(e => console.error('DB ERROR:', e))"
   ```

