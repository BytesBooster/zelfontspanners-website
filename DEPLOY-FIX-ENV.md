# Quick Fix: Environment Variables op Server

## Probleem
De environment variables worden niet geladen door PM2.

## Oplossing

### Stap 1: Pull de laatste wijzigingen
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
git pull origin main
```

### Stap 2: Verifieer dat ecosystem.config.js is geüpdatet
```bash
cat ecosystem.config.js | grep SUPABASE
```

Je zou moeten zien:
```
NEXT_PUBLIC_SUPABASE_URL: 'https://emhidjqtxjnnrlgbbmyi.supabase.co',
NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGc...',
```

### Stap 3: Herstart PM2 met de nieuwe configuratie
```bash
pm2 delete zelfontspanners
pm2 start ecosystem.config.js
```

### Stap 4: Verifieer dat het werkt
```bash
node scripts/check-env.js
```

Je zou nu moeten zien:
```
✅ NEXT_PUBLIC_SUPABASE_URL: https://...
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: eyJhbGc...
✅ All required environment variables are set!
```

### Alternatief: Als git pull niet werkt

Als `git pull` problemen geeft, kun je handmatig de environment variables toevoegen:

1. Open ecosystem.config.js:
```bash
nano ecosystem.config.js
```

2. Voeg toe aan de `env` sectie:
```javascript
env: {
  NODE_ENV: 'production',
  PORT: 3001,
  NEXT_PUBLIC_SUPABASE_URL: 'https://emhidjqtxjnnrlgbbmyi.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds',
},
```

3. Sla op (Ctrl+O, Enter, Ctrl+X)

4. Herstart PM2:
```bash
pm2 delete zelfontspanners
pm2 start ecosystem.config.js
```

5. Verifieer:
```bash
node scripts/check-env.js
pm2 logs zelfontspanners --lines 20
```

