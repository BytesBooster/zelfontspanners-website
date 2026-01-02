# ⚠️ URGENT: Deployment Uitvoeren

## Probleem
- Geen updates zichtbaar op live website
- Alle static files geven 404 errors
- Portfolio afbeeldingen geven 404 errors

## Oorzaak
De deployment is nog niet uitgevoerd op de server. De nieuwe code staat alleen lokaal en in Git.

## OPLOSSING - VOER DIT NU UIT:

### Stap 1: SSH naar de server

```bash
ssh root@185.255.131.147
# Of gebruik je eigen SSH credentials
```

### Stap 2: Voer deployment uit

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Pull laatste code (met verbeterde deploy script)
git pull origin main

# Voer deployment uit
chmod +x deploy.sh
bash deploy.sh
```

### Stap 3: Verifieer deployment

Na de deployment, check:

1. **Check of static files zijn gekopieerd:**
   ```bash
   ls -la .next/standalone/.next/static/chunks/ | head -5
   ls -la .next/standalone/.next/static/css/ | head -5
   ```

2. **Check of portfolio afbeeldingen zijn gekopieerd:**
   ```bash
   ls -la .next/standalone/public/images/portfolio/ | head -5
   ```

3. **Check PM2 status:**
   ```bash
   pm2 status zelfontspanners
   pm2 logs zelfontspanners --lines 20
   ```

4. **Test website:**
   - Open https://zelfontspanners.nl
   - Open DevTools (F12)
   - Check Network tab
   - Geen 404 errors meer voor:
     - `/_next/static/chunks/*.js`
     - `/_next/static/css/*.css`
     - `/images/portfolio/*.jpg`

## Als deployment faalt:

### Check 1: Environment variables
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
cat .env
# Zorg dat NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY zijn ingesteld
```

### Check 2: Build errors
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
npm run build
# Check voor errors
```

### Check 3: Disk space
```bash
df -h
# Zorg dat er genoeg ruimte is
```

### Check 4: Permissions
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
ls -la .next/standalone/
# Zorg dat PM2 de files kan lezen
```

## Belangrijk

- **De portfolio afbeeldingen moeten op de server staan** in `public/images/portfolio/`
- Deze worden automatisch gekopieerd naar `.next/standalone/public/images/portfolio/` tijdens deployment
- Als de afbeeldingen niet op de server staan, moeten ze eerst worden geüpload

## Upload portfolio afbeeldingen naar server (als nodig):

Als de portfolio afbeeldingen niet op de server staan:

```bash
# Vanaf je lokale machine (Windows PowerShell):
cd C:\Users\jrdhn\Desktop\websites\zelfontspanner.nl

# Upload public/images/portfolio naar server
scp -r public/images/portfolio root@185.255.131.147:/var/www/vhosts/zelfontspanners.nl/nodejs/public/images/
```

Of gebruik een FTP/SFTP client zoals FileZilla.

## Na deployment:

1. **Hard refresh browser:**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Check console voor errors:**
   - Open DevTools (F12)
   - Check Console tab
   - Geen 404 errors meer

3. **Test functionaliteit:**
   - Portfolio pagina's laden
   - Afbeeldingen worden getoond
   - Login werkt
   - API calls werken

