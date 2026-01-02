# Quick Fix: PM2 Start met Environment Variables

## Probleem
PM2 process bestaat niet meer of is gestopt.

## Oplossing

### Stap 1: Check of ecosystem.config.js is geüpdatet
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
git pull origin main
cat ecosystem.config.js | grep -A 5 "env:"
```

Je zou moeten zien:
```javascript
env: {
  NODE_ENV: 'production',
  PORT: 3001,
  NEXT_PUBLIC_SUPABASE_URL: 'https://emhidjqtxjnnrlgbbmyi.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGc...',
```

### Stap 2: Start PM2 met ecosystem.config.js
```bash
pm2 start ecosystem.config.js
```

### Stap 3: Check PM2 status
```bash
pm2 status
pm2 logs zelfontspanners --lines 30
```

### Stap 4: Verifieer environment variables
```bash
pm2 env zelfontspanners | grep SUPABASE
```

Je zou nu moeten zien:
```
NEXT_PUBLIC_SUPABASE_URL: 'https://emhidjqtxjnnrlgbbmyi.supabase.co'
NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGc...'
```

## Als ecosystem.config.js nog niet is geüpdatet

Als `git pull` niet werkt of het bestand nog niet is geüpdatet, voeg handmatig toe:

```bash
nano ecosystem.config.js
```

Zorg dat de `env` sectie er zo uitziet:
```javascript
env: {
  NODE_ENV: 'production',
  PORT: 3001,
  NEXT_PUBLIC_SUPABASE_URL: 'https://emhidjqtxjnnrlgbbmyi.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds',
  CLOUDINARY_CLOUD_NAME: 'dp9lcxbfu',
  CLOUDINARY_API_KEY: '877964424671325',
  CLOUDINARY_API_SECRET: 'jEZWkfFP9CTxvcqHdbuBgaL9tS0',
},
```

Sla op (Ctrl+O, Enter, Ctrl+X) en start dan:
```bash
pm2 start ecosystem.config.js
```

