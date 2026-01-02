# Deployment Instructies

## Probleem: Oude Build met PasswordResetModal

Als je nog steeds `PasswordResetModal` of `PasswordResetGuard` ziet in de console, betekent dit dat er een **oude build** op de server staat.

## Oplossing: Clean Rebuild

Voer op de server uit:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
git pull
bash deploy.sh
```

De `deploy.sh` script verwijdert automatisch de oude `.next` directory voordat er gebouwd wordt.

## Browser Cache Clearen

Na deployment moet je de **browser cache clearen**:

### Chrome/Edge:
1. Druk `Ctrl+Shift+Delete` (Windows) of `Cmd+Shift+Delete` (Mac)
2. Selecteer "Cached images and files"
3. Klik "Clear data"
4. Of gebruik Hard Refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

### Safari:
1. Safari → Preferences → Advanced
2. Vink "Show Develop menu" aan
3. Develop → Empty Caches
4. Of gebruik Hard Refresh: `Cmd+Option+R`

### Firefox:
1. Druk `Ctrl+Shift+Delete` (Windows) of `Cmd+Shift+Delete` (Mac)
2. Selecteer "Cache"
3. Klik "Clear Now"
4. Of gebruik Hard Refresh: `Ctrl+F5` (Windows) / `Cmd+Shift+R` (Mac)

## Verificatie

Na cache clear en rebuild zou je:
- ✅ GEEN `PasswordResetModal` logs meer moeten zien
- ✅ GEEN `PasswordResetGuard` logs meer moeten zien
- ✅ GEEN `[Navigation] Safari fallback` infinite loop meer moeten zien
- ✅ Wel een redirect naar `/change-password` moeten zien als password reset vereist is

## Als het nog steeds niet werkt:

1. **Check of de nieuwe build is gedeployed:**
   ```bash
   ls -la /var/www/vhosts/zelfontspanners.nl/nodejs/.next/server/app/layout.js
   ```
   Check de timestamp - moet recent zijn.

2. **Check PM2 logs:**
   ```bash
   pm2 logs zelfontspanners --lines 50
   ```

3. **Forceer een volledige rebuild:**
   ```bash
   cd /var/www/vhosts/zelfontspanners.nl/nodejs
   rm -rf .next node_modules
   npm install --legacy-peer-deps
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   pm2 restart zelfontspanners
   ```

4. **Test in incognito/private mode** om cache te omzeilen

