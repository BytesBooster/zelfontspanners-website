# 🚨 FORCE CLEAN DEPLOYMENT - Oude Build Verwijderen

## Het Probleem
Je ziet nog steeds `layout-94f0854bcc52beb1.js` in de browser. Dit betekent dat de **server nog steeds de oude build file serveert**.

## Oplossing: Force Clean Rebuild

### Stap 1: Commit en Push de Nieuwe Scripts

```bash
git add force-clean-rebuild-deploy.sh check-server-build.sh
git commit -m "Add force clean rebuild script to remove old build files"
git push origin main
```

### Stap 2: Check Wat Er Op De Server Staat

SSH naar de server en check:

```bash
ssh root@185.255.131.147
cd /var/www/vhosts/zelfontspanners.nl/nodejs
chmod +x check-server-build.sh
bash check-server-build.sh
```

Dit laat zien:
- Of de oude build file er nog is
- Welke layout files er zijn
- Of er oude console.log statements in zitten

### Stap 3: Force Clean Rebuild Uitvoeren

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
git pull origin main
chmod +x force-clean-rebuild-deploy.sh
bash force-clean-rebuild-deploy.sh
```

Dit script:
- ✅ Stopt PM2
- ✅ Verwijdert ALLE oude build files (inclusief `layout-94f0854bcc52beb1.js`)
- ✅ Verwijdert node_modules voor schone installatie
- ✅ Pullt laatste code
- ✅ Installeert dependencies opnieuw
- ✅ Bouwt een nieuwe versie
- ✅ Verifieert dat de oude file weg is
- ✅ Herstart PM2

### Stap 4: Verificatie

Na deployment:

1. **Open website in incognito venster** (om browser cache te omzeilen)
2. **Open Developer Tools (F12)**
3. **Check Network tab:**
   - Je zou NIET `layout-94f0854bcc52beb1.js` moeten zien
   - Je zou een NIEUWE layout file moeten zien (bijv. `layout-d7e744bd97b76674.js`)
4. **Check Console:**
   - Je zou NIET `[Navigation] Safari fallback` moeten zien
   - Je zou NIET `[Navigation] Auth state update` infinite loop moeten zien
   - Je zou WEL `[MODAL-KILLER] Script loaded` moeten zien (eenmalig)

### Stap 5: Als Het Nog Steeds Niet Werkt

Als je nog steeds de oude file ziet:

1. **Check of de server de nieuwe build heeft:**
   ```bash
   ssh root@185.255.131.147
   cd /var/www/vhosts/zelfontspanners.nl/nodejs
   bash check-server-build.sh
   ```

2. **Check PM2 logs:**
   ```bash
   pm2 logs zelfontspanners --lines 50
   ```

3. **Check of PM2 de juiste build serveert:**
   ```bash
   pm2 restart zelfontspanners
   pm2 status zelfontspanners
   ```

4. **Forceer browser cache clear:**
   - Hard refresh: `Ctrl + Shift + R` (Windows) of `Cmd + Shift + R` (Mac)
   - Of: Developer Tools > Network tab > Rechtsklik refresh > "Empty Cache and Hard Reload"

## Snelle Commando's (Alles In Één)

Vanaf je lokale machine:

```powershell
# Check wat er op server staat
ssh root@185.255.131.147 "cd /var/www/vhosts/zelfontspanners.nl/nodejs && git pull origin main && chmod +x check-server-build.sh && bash check-server-build.sh"

# Force clean rebuild
ssh root@185.255.131.147 "cd /var/www/vhosts/zelfontspanners.nl/nodejs && git pull origin main && chmod +x force-clean-rebuild-deploy.sh && bash force-clean-rebuild-deploy.sh"
```

## Wat Het Script Doet

1. **Stopt PM2** - Zorgt dat de oude build niet meer wordt geserveerd
2. **Verwijdert .next directory** - Verwijdert ALLE oude build files
3. **Verwijdert specifieke oude file** - Verwijdert `layout-94f0854bcc52beb1.js` expliciet
4. **Verwijdert node_modules** - Zorgt voor schone dependency installatie
5. **Pullt laatste code** - Haalt de nieuwste code op (inclusief fixes)
6. **Installeert dependencies** - Schone installatie
7. **Bouwt nieuwe versie** - Nieuwe build met alle fixes
8. **Verifieert** - Checkt dat de oude file weg is
9. **Herstart PM2** - Start de nieuwe build

## Troubleshooting

### "Permission denied" bij chmod
```bash
chmod +x force-clean-rebuild-deploy.sh
chmod +x check-server-build.sh
```

### "File not found" bij git pull
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
git pull origin main
```

### Build faalt
```bash
# Check logs
pm2 logs zelfontspanners --lines 50

# Probeer handmatig
cd /var/www/vhosts/zelfontspanners.nl/nodejs
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run build
pm2 restart zelfontspanners
```

