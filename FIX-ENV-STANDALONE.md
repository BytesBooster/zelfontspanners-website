# Fix: Environment Variables voor Next.js Standalone Build

## Probleem

Next.js standalone builds laden environment variables anders dan normale builds. De `NEXT_PUBLIC_*` variabelen moeten tijdens build tijd worden ingebouwd, maar voor server-side code moeten ze tijdens runtime beschikbaar zijn.

## Oplossing: Gebruik .env bestand

Voor Next.js standalone builds moeten we een `.env` bestand gebruiken (niet `.env.local`) dat Next.js kan lezen tijdens runtime.

### Stap 1: Maak .env bestand op de server

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
nano .env
```

Voeg toe:
```
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
CLOUDINARY_CLOUD_NAME=dp9lcxbfu
CLOUDINARY_API_KEY=877964424671325
CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0
```

Sla op (Ctrl+O, Enter, Ctrl+X)

### Stap 2: Herstart PM2

```bash
pm2 restart zelfontspanners
```

### Stap 3: Verifieer

```bash
pm2 logs zelfontspanners --lines 20
```

Je zou geen "No database configuration found" errors meer moeten zien.

## Alternatief: Export environment variables voor PM2

Als .env niet werkt, kunnen we ze exporteren voordat PM2 start:

```bash
export NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
export NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
pm2 restart zelfontspanners
```

Maar dit werkt alleen voor de huidige sessie. Beter is om een startup script te maken.

## Beste Oplossing: Update ecosystem.config.js met env_file

PM2 kan een `.env` bestand automatisch laden. Update `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'zelfontspanners',
      script: '.next/standalone/server.js',
      instances: 1,
      exec_mode: 'fork',
      cwd: '/var/www/vhosts/zelfontspanners.nl/nodejs',
      env_file: '.env', // Voeg dit toe
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        // ... rest blijft hetzelfde
      },
    },
  ],
}
```

Maar PM2 ondersteunt `env_file` niet standaard. We moeten een andere aanpak gebruiken.

## Aanbevolen Oplossing: dotenv in server.js

We kunnen dotenv gebruiken om .env te laden. Maar voor Next.js standalone moeten we dit anders doen.

## Meest Eenvoudige Oplossing: Rebuild met environment variables

De `NEXT_PUBLIC_*` variabelen moeten tijdens build tijd beschikbaar zijn. Rebuild de app met de environment variables:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
export NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
export NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
npm run build
pm2 restart zelfontspanners
```

Maar dit is niet ideaal omdat we bij elke wijziging moeten rebuilden.

## Definitieve Oplossing: Gebruik .env en laad het in de code

Voor Next.js standalone moeten we de environment variables tijdens runtime laden. We kunnen dit doen door de .env file te lezen in de server code, maar dat is complex.

**Eenvoudigste werkende oplossing:**
1. Maak `.env` bestand op de server
2. Gebruik `dotenv` package om het te laden (maar Next.js heeft dit al ingebouwd)
3. Of gebruik een startup script dat de variabelen exporteert

Laat me een startup script maken dat dit automatisch doet.

