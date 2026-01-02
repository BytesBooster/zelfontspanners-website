# Definitieve Fix: Environment Variables voor Next.js Standalone

## Probleem
PM2 geeft de environment variables door, maar Next.js standalone builds lezen ze niet tijdens runtime.

## Oplossing: Maak .env bestand

Next.js leest automatisch `.env` bestanden tijdens runtime. Maak dit bestand op de server:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
nano .env
```

Voeg deze regels toe (zonder quotes):
```
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
CLOUDINARY_CLOUD_NAME=dp9lcxbfu
CLOUDINARY_API_KEY=877964424671325
CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0
```

**BELANGRIJK:** Geen quotes rond de waarden, alleen de key=value format.

Sla op:
- Ctrl+O (opslaan)
- Enter (bevestig bestandsnaam)
- Ctrl+X (sluit editor)

## Herstart PM2

```bash
pm2 restart zelfontspanners
```

## Verifieer

```bash
pm2 logs zelfontspanners --lines 30
```

Je zou geen "No database configuration found" errors meer moeten zien.

## Test

Open de website en check de browser console. De 500 errors zouden nu moeten verdwijnen.

