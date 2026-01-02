# 🔥 DEFINITIEVE BROWSER CACHE FIX

## Het Probleem
De browser cached de oude build file (`layout-94f0854bcc52beb1.js`) agressief, zelfs na deployment.

## Oplossing: Force Browser Reload

### Stap 1: Deploy de nieuwe code (met cache-busting meta tags)

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
git pull origin main
npm run build
pm2 restart zelfontspanners
```

### Stap 2: Browser cache VOLLEDIG legen

#### Chrome/Edge (MEEST EFFECTIEF):
1. **Open Developer Tools** (F12)
2. **Rechtsklik op de refresh knop** (naast de adresbalk)
3. Selecteer **"Empty Cache and Hard Reload"**
4. **OF** gebruik: `Ctrl + Shift + Delete` → Selecteer "All time" → "Cached images and files" → Clear

#### Als dat niet werkt - NUCLEAR OPTION:
1. Sluit ALLE browser tabs
2. Sluit de browser volledig
3. Open browser opnieuw
4. `Ctrl + Shift + Delete`
5. Selecteer "All time"
6. Vink ALLES aan (Cookies, Cache, etc.)
7. Klik "Clear data"
8. Heropen browser en ga naar website

### Stap 3: Test in Incognito
Open website in **incognito/private venster** - dit bewijst dat het een cache probleem is.

### Stap 4: Check Network Tab
1. F12 → Network tab
2. Vink **"Disable cache"** aan
3. Herlaad pagina
4. Check welke layout file wordt geladen - moet `layout-e66c94eca32e1e0c.js` zijn (NIET `layout-94f0854bcc52beb1.js`)

## Als het NOG STEEDS niet werkt:

### Check Service Worker:
1. F12 → Application tab → Service Workers
2. Als er een service worker actief is → Klik "Unregister"
3. Herlaad pagina

### Check welke file wordt geladen:
1. F12 → Network tab
2. Filter op "layout"
3. Check welke file wordt geladen
4. Als het nog steeds `layout-94f0854bcc52beb1.js` is, dan is er een probleem op de server

## Verificatie op Server:

```bash
# Check welke layout files er zijn
ls -lh .next/static/chunks/app/layout*.js

# Check of oude file nog bestaat (moet leeg zijn)
find .next -name "*94f0854bcc52beb1*" 2>/dev/null

# Check HTML output
curl https://zelfontspanners.nl | grep -o "layout-[^.]*\.js" | head -1
```

De output moet `layout-e66c94eca32e1e0c.js` zijn (of een andere nieuwe hash), NIET `layout-94f0854bcc52beb1.js`.

