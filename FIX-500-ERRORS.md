# Fix voor 500 Internal Server Errors

## Probleem

Alle API endpoints retourneren `500 (Internal Server Error)`:
- `/api/accounts`
- `/api/accounts/login`
- `/api/foto-van-de-maand`
- `/api/agenda`

Ook is er een `404 (Not Found)` voor `/images/hero1.jpg`.

## Oorzaak

### 1. Missing Environment Variables (500 Errors)

De Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL` en `NEXT_PUBLIC_SUPABASE_ANON_KEY`) zijn niet ingesteld op de productie server. Wanneer `getDbClient()` wordt aangeroepen, gooit het een error omdat deze variabelen ontbreken.

### 2. Missing Hero Images (404 Error)

De hero slider probeert `hero1.jpg`, `hero2.jpg`, en `hero3.jpg` te laden, maar deze bestanden bestaan niet in `public/images/`.

## Oplossing

### Stap 1: Voeg Environment Variables toe aan Server

**Optie A: Via ecosystem.config.js (Aanbevolen)**

1. Open `ecosystem.config.js` op de server
2. Voeg de Supabase credentials toe:

```javascript
module.exports = {
  apps: [
    {
      name: 'zelfontspanners',
      // ... andere config
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        NEXT_PUBLIC_SUPABASE_URL: 'https://jouw-project.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'jouw-anon-key-hier',
      },
    },
  ],
}
```

3. Herstart PM2:
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
pm2 restart zelfontspanners --update-env
```

**Optie B: Via .env.local bestand**

1. Maak `.env.local` op de server:
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

### Stap 2: Verifieer Environment Variables

Run het check script:
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
node scripts/check-env.js
```

Je zou moeten zien:
```
✅ NEXT_PUBLIC_SUPABASE_URL: https://...
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: eyJhbGc...
✅ All required environment variables are set!
```

### Stap 3: Hero Images (Optioneel)

De hero slider is nu aangepast om gracefully om te gaan met ontbrekende images. Als de images niet bestaan, wordt een gradient background getoond.

Als je de hero images wilt toevoegen:
1. Upload `hero1.jpg`, `hero2.jpg`, en `hero3.jpg` naar `public/images/`
2. Of pas `components/HeroSlider.tsx` aan om andere images te gebruiken

## Testen

Na het instellen van de environment variables:

1. **Check PM2 logs:**
```bash
pm2 logs zelfontspanners --lines 50
```

2. **Test API endpoints:**
- Open browser console
- Check of er nog 500 errors zijn
- Test login functionaliteit

3. **Check hero slider:**
- Refresh de homepage
- Controleer of er geen 404 errors meer zijn voor hero images

## Troubleshooting

### Environment Variables worden niet geladen

Check of PM2 de variabelen heeft:
```bash
pm2 env zelfontspanners
```

Als ze niet zichtbaar zijn:
```bash
pm2 delete zelfontspanners
pm2 start ecosystem.config.js
```

### Database connectie faalt nog steeds

1. Check Supabase credentials in dashboard
2. Verifieer dat de database tabellen bestaan (run `database/schema.sql`)
3. Check PM2 logs voor specifieke error messages

### Images worden nog steeds niet gevonden

1. Check of images in `public/images/` staan (niet in `public/`)
2. Check file permissions op de server
3. Clear browser cache en hard refresh (Ctrl+Shift+R)

## Belangrijk

- ✅ Gebruik NOOIT de `service_role` key in de frontend
- ✅ Gebruik alleen de `anon` key voor client-side code
- ✅ `.env.local` wordt NIET gecommit naar Git
- ✅ Voor productie: gebruik `ecosystem.config.js` of server environment variables

