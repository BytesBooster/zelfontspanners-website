# Test Environment Variables Script

## Probleem
De wrapper script werkt mogelijk niet correct. Laat me een test maken.

## Test het script handmatig

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Check of het script bestaat en executable is
ls -la start-server.sh
chmod +x start-server.sh

# Test of de env vars worden geladen
bash -x start-server.sh &
# Stop het proces na een paar seconden
pkill -f "node .next/standalone/server.js"
```

## Alternatief: Test direct met node

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Export de env vars
export NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
export NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds

# Test of ze beschikbaar zijn
node -e "console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)"
```

Als dit werkt, betekent het dat PM2 de env vars niet correct doorgeeft.

## Belangrijk: Next.js Standalone Builds

Voor Next.js standalone builds moeten `NEXT_PUBLIC_*` variabelen tijdens BUILD tijd beschikbaar zijn, niet alleen tijdens runtime. We moeten de app opnieuw builden met de environment variables.

## Oplossing: Rebuild met env vars

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Export env vars voor build
export NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
export NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds

# Rebuild
npm run build

# Herstart PM2
pm2 restart zelfontspanners
```

Dit is de definitieve oplossing voor Next.js standalone builds.

