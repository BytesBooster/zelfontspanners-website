# Cache Legen en Nieuwe Versie Zien

Als je nog steeds de oude login pagina of modals ziet, volg deze stappen:

## 1. Hard Refresh Browser
- **Windows/Linux**: `Ctrl + Shift + R` of `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`
- Dit leegt de browser cache en laadt de nieuwe versie

## 2. Controleer of Deployment Geslaagd Is
Op de server:
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
git pull
bash deploy.sh
```

## 3. Controleer Build Output
Kijk of de build succesvol is:
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs zelfontspanners --lines 50
```

## 4. Verwijder Browser Cache Volledig
Als hard refresh niet werkt:
- Open Developer Tools (F12)
- Rechtsklik op de refresh knop
- Selecteer "Empty Cache and Hard Reload"

## 5. Test in Incognito/Private Mode
Open de website in een incognito/private venster om te zien of het probleem cache-gerelateerd is.

## Wat is er Veranderd?

✅ **Geen modals meer** - Password reset gebeurt nu via een normale pagina (`/change-password`)
✅ **Nieuwe login pagina** - Volledig herschreven met betere UX
✅ **Simpelere auth flow** - Geen complexe state management meer
✅ **Betere error handling** - Duidelijke foutmeldingen

## Als het Nog Steeds Niet Werkt

1. Check browser console voor errors (F12 → Console tab)
2. Check network tab om te zien welke bestanden geladen worden
3. Controleer of de nieuwe bestanden op de server staan:
   ```bash
   ls -la app/login/page.tsx
   ls -la app/change-password/page.tsx
   ls -la lib/auth.ts
   ```

