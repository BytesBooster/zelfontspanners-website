# Check .env Bestand

## Probleem
De environment variables worden nog steeds niet geladen.

## Check of .env bestaat

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
ls -la .env
```

Als het bestand niet bestaat, maak het dan aan:

```bash
cat > .env << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
CLOUDINARY_CLOUD_NAME=dp9lcxbfu
CLOUDINARY_API_KEY=877964424671325
CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0
EOF
```

## Check de inhoud

```bash
cat .env
```

## Belangrijk: Voor Next.js Standalone

Next.js standalone builds lezen `.env` bestanden alleen tijdens build tijd, niet tijdens runtime. We moeten een andere aanpak gebruiken.

## Oplossing: Gebruik een wrapper script

Maak een script dat de env vars laadt voordat de server start.

