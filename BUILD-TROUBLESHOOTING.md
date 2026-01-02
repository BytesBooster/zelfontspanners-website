# Build Troubleshooting Guide

## Build Error: "Build failed because of webpack errors"

Als je deze error krijgt tijdens deployment, volg deze stappen:

### Stap 1: Check Build Lokaal

Test eerst of de build lokaal werkt:

```cmd
npm install
npm run build
```

Als dit lokaal faalt, los eerst de lokale errors op.

### Stap 2: Check Server Logs

SSH naar de server en check de build output:

```bash
ssh root@185.255.131.147
cd /var/www/vhosts/zelfontspanners.nl/nodejs
npm run build
```

Dit toont de specifieke webpack errors.

### Stap 3: Veelvoorkomende Oorzaken

#### 1. Missing Dependencies
```bash
# Op server
cd /var/www/vhosts/zelfontspanners.nl/nodejs
npm install
```

#### 2. TypeScript Errors
```bash
# Check TypeScript errors
npm run lint
```

#### 3. Environment Variables Missing
Zorg dat `.env.local` bestaat op de server met:
```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

#### 4. Node.js Versie
Check Node.js versie op server:
```bash
node --version
```
Moet 18+ zijn.

### Stap 4: Deploy Script Verbeterd

Het deploy script (`deploy.sh`) is nu verbeterd:
- ✅ Stopt als build faalt
- ✅ Herstart PM2 niet als build faalt
- ✅ Toont duidelijke error messages
- ✅ Installeert dependencies automatisch

### Stap 5: Handmatig Deployen

Als automatisch deployen niet werkt:

```bash
# SSH naar server
ssh root@185.255.131.147

# Ga naar project directory
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Pull laatste wijzigingen
git pull

# Installeer dependencies
npm install

# Test build
npm run build

# Als build succesvol is, herstart PM2
pm2 restart zelfontspanners
```

### Stap 6: Check PM2 Logs

Als applicatie draait maar errors geeft:

```bash
pm2 logs zelfontspanners --lines 50
```

### Stap 7: Reset en Opnieuw Builden

Als niets werkt, reset de build:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Verwijder oude build
rm -rf .next
rm -rf node_modules

# Herinstalleer alles
npm install

# Build opnieuw
npm run build

# Herstart PM2
pm2 restart zelfontspanners
```

## Belangrijk

- ✅ **Build moet succesvol zijn** voordat PM2 wordt herstart
- ✅ **Oude versie blijft draaien** als build faalt (veiliger)
- ✅ **Check altijd logs** als er problemen zijn

## Hulp

Als je de specifieke webpack error ziet, deel deze dan zodat we het kunnen oplossen.


