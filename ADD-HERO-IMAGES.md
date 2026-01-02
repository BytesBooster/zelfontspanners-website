# Hero Images Toevoegen

## Wat je nodig hebt

De hero slider heeft 3 hero images nodig:
- `hero1.jpg`
- `hero2.jpg`
- `hero3.jpg`

## Stap 1: Voeg de images toe aan public/images/

Plaats de hero images in de `public/images/` directory:

```
public/
  images/
    hero1.jpg  ← Voeg deze toe
    hero2.jpg  ← Voeg deze toe
    hero3.jpg  ← Voeg deze toe
```

## Stap 2: Commit en push

```bash
git add public/images/hero*.jpg
git commit -m "Add hero images for hero slider"
git push origin main
```

## Stap 3: Deploy naar server

Op de server:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Pull de laatste wijzigingen
git pull origin main

# Kopieer public files naar standalone build
mkdir -p .next/standalone/public/images
cp -r public/images/* .next/standalone/public/images/

# Herstart PM2
pm2 restart zelfontspanners
```

## Alternatief: Upload direct naar server

Als je de images direct naar de server wilt uploaden:

```bash
# Op de server
cd /var/www/vhosts/zelfontspanners.nl/nodejs/public/images

# Upload de images (via SCP, FTP, of Plesk File Manager)
# Plaats hero1.jpg, hero2.jpg, hero3.jpg hier

# Kopieer naar standalone build
cd /var/www/vhosts/zelfontspanners.nl/nodejs
mkdir -p .next/standalone/public/images
cp -r public/images/* .next/standalone/public/images/

# Herstart PM2
pm2 restart zelfontspanners
```

## Verifieer

Na het toevoegen van de images:
1. Refresh de website
2. Check de browser console - er zouden geen 404 errors meer moeten zijn voor hero images
3. De hero slider zou nu moeten werken met de images

## Image Requirements

Voor beste resultaten:
- **Formaat**: JPG of PNG
- **Resolutie**: Minimaal 1920x1080 (Full HD) voor goede kwaliteit
- **Grootte**: Optimaliseer de images (max 500KB per image voor snelle laadtijden)
- **Aspect ratio**: 16:9 werkt het beste voor hero sliders

