# Rebuild Next.js met Environment Variables

## Probleem
Next.js standalone builds bakken `NEXT_PUBLIC_*` variabelen tijdens build tijd in. Als ze niet tijdens build tijd beschikbaar waren, moeten we opnieuw builden.

## Oplossing: Rebuild met Environment Variables

Voer dit uit op de server:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Stop PM2
pm2 stop zelfontspanners

# Export environment variables VOOR de build
export NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
export NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
export CLOUDINARY_CLOUD_NAME=dp9lcxbfu
export CLOUDINARY_API_KEY=877964424671325
export CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0

# Rebuild (dit kan even duren)
npm run build

# Start PM2 opnieuw
pm2 start ecosystem.config.js

# Check logs
pm2 logs zelfontspanners --lines 30
```

## Alternatief: Maak .env bestand en rebuild

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Maak .env bestand
cat > .env << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
CLOUDINARY_CLOUD_NAME=dp9lcxbfu
CLOUDINARY_API_KEY=877964424671325
CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0
EOF

# Stop PM2
pm2 stop zelfontspanners

# Rebuild (Next.js leest .env automatisch tijdens build)
npm run build

# Start PM2
pm2 start ecosystem.config.js
```

## Verifieer

Na de rebuild, check de logs:
```bash
pm2 logs zelfontspanners --lines 50
```

Je zou geen "No database configuration found" errors meer moeten zien.

Test ook in de browser - de 500 errors zouden nu moeten verdwijnen.

