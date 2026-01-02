# URGENT FIX: Alle Static Files geven 404

## Probleem
Alle Next.js static files geven 404 errors:
- `/_next/static/chunks/webpack-*.js` → 404
- `/_next/static/chunks/app/layout-*.js` → 404
- `/_next/static/css/*.css` → 404

Dit betekent dat de static files niet worden geserveerd.

## Oorzaak
Next.js standalone builds kopiëren static files NIET automatisch naar `.next/standalone/.next/static/`. Deze moeten handmatig worden gekopieerd.

## Oplossing - VOER DIT NU UIT OP DE SERVER:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Stop PM2
pm2 stop zelfontspanners

# Verwijder oude standalone build
rm -rf .next/standalone

# Rebuild (zorg dat .env bestaat!)
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

# Pull laatste code
git pull origin main

# Installeer dependencies
npm install --legacy-peer-deps

# Build met env vars
export NODE_OPTIONS="--max-old-space-size=4096"
export BUILD_VERSION=$(date +%s)
export $(cat .env | grep -v '^#' | xargs)
npm run build

# CRITICAL: Kopieer static files naar standalone
echo "Kopiëren van static files..."
rm -rf .next/standalone/.next/static
mkdir -p .next/standalone/.next/static
cp -r .next/static/* .next/standalone/.next/static/

# Kopieer public folder
mkdir -p .next/standalone/public
cp -r public/* .next/standalone/public/

# Verifieer dat files zijn gekopieerd
echo "Verificatie..."
ls -la .next/standalone/.next/static/chunks/ | head -5
ls -la .next/standalone/.next/static/css/ | head -5

# Herstart PM2
pm2 restart zelfontspanners

# Check logs
pm2 logs zelfontspanners --lines 20
```

## Snelle één-liner:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs && pm2 stop zelfontspanners && rm -rf .next/standalone && git pull origin main && npm install --legacy-peer-deps && export NODE_OPTIONS="--max-old-space-size=4096" && export BUILD_VERSION=$(date +%s) && export $(cat .env | grep -v '^#' | xargs) && npm run build && rm -rf .next/standalone/.next/static && mkdir -p .next/standalone/.next/static .next/standalone/public && cp -r .next/static/* .next/standalone/.next/static/ && cp -r public/* .next/standalone/public/ && pm2 restart zelfontspanners && pm2 logs zelfontspanners --lines 20
```

## Verificatie na deployment:

1. **Check of static files bestaan:**
   ```bash
   ls -la .next/standalone/.next/static/chunks/webpack-*.js
   ls -la .next/standalone/.next/static/css/*.css
   ```

2. **Test of server ze serveert:**
   ```bash
   curl -I http://localhost:3001/_next/static/chunks/webpack-8cdd32b92ee5d080.js
   ```

3. **Check browser console:**
   - Open website
   - Open DevTools (F12)
   - Check Network tab
   - Herlaad pagina
   - Geen 404 errors meer voor static files

## Als het nog steeds niet werkt:

Check of de web server (Nginx/Apache) de static files serveert voordat ze naar Next.js gaan. De Next.js standalone server zou ze zelf moeten serveren, maar soms doet de web server dit.

