#!/bin/bash
# Fix standalone build to include static files

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "=========================================="
echo "FIX STANDALONE STATIC FILES"
echo "=========================================="
echo ""

# Check of standalone build bestaat
if [ ! -d ".next/standalone" ]; then
    echo "❌ Standalone build niet gevonden!"
    echo "Bouwen van standalone build..."
    npm run build
fi

# Check of static files bestaan in .next/static
if [ ! -d ".next/static" ]; then
    echo "❌ Static files niet gevonden in .next/static!"
    echo "Rebuild nodig..."
    npm run build
fi

# Kopieer static files naar standalone build
echo "📁 Copying static files to standalone build..."
if [ -d ".next/static" ]; then
    # Maak directory aan als deze niet bestaat
    mkdir -p .next/standalone/.next/static
    
    # Kopieer alle static files
    echo "Copying .next/static to .next/standalone/.next/static..."
    cp -r .next/static/* .next/standalone/.next/static/ 2>/dev/null || true
    
    # Kopieer ook public files als die er zijn
    if [ -d "public" ]; then
        echo "Copying public files to standalone..."
        mkdir -p .next/standalone/public
        cp -r public/* .next/standalone/public/ 2>/dev/null || true
    fi
    
    echo "✅ Static files gekopieerd"
else
    echo "❌ Geen static files gevonden om te kopiëren!"
fi

# Verifieer dat files gekopieerd zijn
echo ""
echo "🔍 Verifying static files in standalone..."
if [ -f ".next/standalone/.next/static/chunks/app/layout-e66c94eca32e1e0c.js" ]; then
    echo "✅ Layout file gevonden in standalone!"
    ls -lh .next/standalone/.next/static/chunks/app/layout*.js 2>/dev/null | head -3
else
    echo "❌ Layout file NIET gevonden in standalone!"
    echo "Probeer opnieuw te bouwen..."
fi

# Herstart PM2
echo ""
echo "🔄 Restarting PM2..."
pm2 restart zelfontspanners

echo ""
echo "✅ Klaar! Test de website opnieuw."

