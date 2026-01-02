# Server Environment Variables Setup

## Probleem

Als je `500 (Internal Server Error)` krijgt voor alle API calls (`/api/accounts`, `/api/agenda`, `/api/foto-van-de-maand`), betekent dit dat de Supabase environment variables niet zijn ingesteld op de server.

## Oplossing

### Stap 1: Voeg environment variables toe aan ecosystem.config.js

Open `ecosystem.config.js` en voeg de Supabase credentials toe aan de `env` sectie:

```javascript
module.exports = {
  apps: [
    {
      name: 'zelfontspanners',
      script: '.next/standalone/server.js',
      instances: 1,
      exec_mode: 'fork',
      cwd: '/var/www/vhosts/zelfontspanners.nl/nodejs',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        // VOEG DEZE TOE:
        NEXT_PUBLIC_SUPABASE_URL: 'https://jouw-project.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'jouw-anon-key-hier',
      },
      // ... rest van config
    },
  ],
}
```

### Stap 2: Vind je Supabase credentials

1. Ga naar [supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecteer je project
3. Ga naar **Settings** > **API**
4. Kopieer:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Stap 3: Herstart PM2 met nieuwe environment variables

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
pm2 restart zelfontspanners --update-env
```

Of als je de configuratie hebt aangepast:

```bash
pm2 delete zelfontspanners
pm2 start ecosystem.config.js
```

### Stap 4: Verifieer dat het werkt

Run het check script:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
node scripts/check-env.js
```

Je zou nu moeten zien:
```
✅ NEXT_PUBLIC_SUPABASE_URL: https://...
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: eyJhbGc...
✅ All required environment variables are set!
```

## Alternatief: Gebruik .env.local bestand

Als je liever een `.env.local` bestand gebruikt (niet aanbevolen voor productie, maar werkt wel):

1. Maak `.env.local` in de project root:
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
nano .env.local
```

2. Voeg toe:
```
NEXT_PUBLIC_SUPABASE_URL=https://jouw-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key-hier
```

3. Herstart PM2:
```bash
pm2 restart zelfontspanners
```

**Let op:** Next.js laadt `.env.local` automatisch, maar PM2 moet wel opnieuw worden gestart.

## Troubleshooting

### Check PM2 logs

```bash
pm2 logs zelfontspanners --lines 50
```

Zoek naar errors zoals:
- "Database configuration missing"
- "No database configuration found"
- "Failed to initialize database client"

### Test database connectie

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
node scripts/check-env.js
```

### Check of environment variables zijn geladen

In PM2:
```bash
pm2 env zelfontspanners
```

Je zou `NEXT_PUBLIC_SUPABASE_URL` en `NEXT_PUBLIC_SUPABASE_ANON_KEY` moeten zien.

## Belangrijk

- ✅ Gebruik NOOIT de `service_role` key in de frontend
- ✅ Gebruik alleen de `anon` key voor client-side code
- ✅ `.env.local` wordt NIET gecommit naar Git (staat in .gitignore)
- ✅ Voor productie: gebruik `ecosystem.config.js` of server environment variables

