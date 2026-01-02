# Fix ChunkLoadError - Oude chunks verwijderen

## Probleem
De browser probeert oude JavaScript chunks te laden die niet meer bestaan:
- `ChunkLoadError: Loading chunk 931 failed`
- `Failed to load resource: page-428df1a947879250.js (404)`

Dit gebeurt omdat:
1. De browser heeft oude HTML/JS in cache met oude chunk hashes
2. Na een nieuwe build hebben de chunks nieuwe hashes
3. De browser probeert oude chunks te laden die niet meer bestaan

## Oplossing

### Stap 1: Clean rebuild op de server

SSH naar de server en voer uit:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Stop PM2
pm2 stop zelfontspanners

# Verwijder ALLE oude builds en caches
rm -rf .next
rm -rf node_modules/.cache
rm -rf .next/cache 2>/dev/null || true

# Pull laatste code (met fixes)
git pull origin main

# Zorg dat .env bestaat
if [ ! -f .env ]; then
  cat > .env << 'EOF'
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
CLOUDINARY_CLOUD_NAME=dp9lcxbfu
CLOUDINARY_API_KEY=877964424671325
CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0
EOF
fi

# Installeer dependencies
npm install --legacy-peer-deps

# Build met env vars
export NODE_OPTIONS="--max-old-space-size=4096"
export BUILD_VERSION=$(date +%s)
export $(cat .env | grep -v '^#' | xargs)
npm run build

# CRITICAL: Kopieer static files naar standalone
mkdir -p .next/standalone/.next/static
cp -r .next/static/* .next/standalone/.next/static/ 2>/dev/null || true

# Kopieer public folder
mkdir -p .next/standalone/public
cp -r public/* .next/standalone/public/ 2>/dev/null || true

# Herstart PM2
pm2 restart zelfontspanners

# Check logs
pm2 logs zelfontspanners --lines 20
```

### Stap 2: Browser cache legen

Na de deployment moet je de browser cache legen:

**Chrome/Edge:**
1. Open DevTools (F12)
2. Rechts-klik op de refresh knop
3. Selecteer "Empty Cache and Hard Reload"

**Of gebruik:**
- Ctrl+Shift+Delete → Clear browsing data → Cached images and files
- Of gebruik Incognito/Private mode om te testen

### Stap 3: Verifieer dat nieuwe chunks worden geladen

1. Open browser DevTools (F12)
2. Ga naar Network tab
3. Herlaad de pagina
4. Check of nieuwe chunk files worden geladen (geen 404 errors)
5. Check of de build-version meta tag een nieuwe timestamp heeft

## Snelle fix (alles in één keer)

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs && \
pm2 stop zelfontspanners && \
rm -rf .next node_modules/.cache && \
git pull origin main && \
npm install --legacy-peer-deps && \
export NODE_OPTIONS="--max-old-space-size=4096" && \
export BUILD_VERSION=$(date +%s) && \
export $(cat .env | grep -v '^#' | xargs) && \
npm run build && \
mkdir -p .next/standalone/.next/static .next/standalone/public && \
cp -r .next/static/* .next/standalone/.next/static/ 2>/dev/null || true && \
cp -r public/* .next/standalone/public/ 2>/dev/null || true && \
pm2 restart zelfontspanners && \
pm2 logs zelfontspanners --lines 20
```

## Troubleshooting

Als je nog steeds ChunkLoadError krijgt:

1. **Check of static files bestaan:**
   ```bash
   ls -la .next/standalone/.next/static/chunks/app/
   ```

2. **Check PM2 logs voor errors:**
   ```bash
   pm2 logs zelfontspanners --lines 50
   ```

3. **Check of de server de static files serveert:**
   ```bash
   curl -I https://zelfontspanners.nl/_next/static/chunks/webpack-8cdd32b92ee5d080.js
   ```

4. **Force browser reload:**
   - Gebruik Ctrl+Shift+R (hard refresh)
   - Of gebruik Incognito mode

5. **Check build versie in HTML:**
   ```bash
   curl https://zelfontspanners.nl | grep "build-version"
   ```

