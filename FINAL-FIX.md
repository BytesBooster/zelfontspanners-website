# 🔥 FINALE OPLOSSING - Voer dit uit op de server

## Stap 1: Run het agressieve cleanup script

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
chmod +x aggressive-cleanup.sh
bash aggressive-cleanup.sh
```

Dit script:
- ✅ Verwijdert ALLE .next builds
- ✅ Verwijdert ALLE oude layout files
- ✅ Verwijdert specifiek layout-94f0854bcc52beb1.js
- ✅ Cleared npm cache
- ✅ Fresh install
- ✅ Fresh build met nieuwe hash
- ✅ Verifieert dat oude file weg is
- ✅ Herstart PM2

## Stap 2: Verifieer dat oude file WEG is

```bash
# Check of oude file nog bestaat (moet NIETS teruggeven)
find .next -name "*94f0854bcc52beb1*" 2>/dev/null

# Check welke layout files er NU zijn
ls -lh .next/static/chunks/app/layout*.js
```

Je zou `layout-d7e744bd97b76674.js` (of andere hash) moeten zien, maar NIET `layout-94f0854bcc52beb1.js`.

## Stap 3: Force PM2 restart

```bash
pm2 restart zelfontspanners
pm2 logs zelfontspanners --lines 20
```

## Stap 4: Browser cache VOLLEDIG legen

### Chrome/Edge:
1. `Ctrl + Shift + Delete`
2. Selecteer "All time"
3. Vink "Cached images and files" aan
4. Klik "Clear data"
5. Sluit browser volledig
6. Heropen en ga naar website

### Of Developer Tools:
1. F12 → Network tab
2. Vink "Disable cache" aan
3. Rechtsklik refresh → "Empty Cache and Hard Reload"

## Stap 5: Test in Incognito

Open website in incognito/private venster om te verifiëren dat het werkt zonder cache.

## Als het NOG STEEDS niet werkt:

```bash
# Check of er misschien een CDN of reverse proxy cache is
# Check nginx/apache config voor cache headers

# Force verwijder ALLE oude files handmatig
cd /var/www/vhosts/zelfontspanners.nl/nodejs
rm -rf .next
find . -name "*94f0854bcc52beb1*" -type f -delete 2>/dev/null
npm run build
pm2 restart zelfontspanners
```

