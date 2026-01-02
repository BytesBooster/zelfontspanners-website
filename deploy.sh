#!/bin/bash
export PATH="/usr/bin:/usr/local/bin:/bin:$PATH"
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Fix script permissies
chmod +x deploy.sh 2>/dev/null || true
chown psaadm:psaserv deploy.sh 2>/dev/null || true

# Stash lokale wijzigingen voordat we pullen (om merge conflicts te voorkomen)
echo "Stashing lokale wijzigingen..."
git stash push -m "Auto-stash before deploy - $(date)" 2>/dev/null || true

# Reset naar remote state als er nog steeds conflicten zijn
echo "Pulling laatste wijzigingen..."
git fetch origin
git reset --hard origin/main 2>/dev/null || git reset --hard origin/master 2>/dev/null || true

# Pull laatste wijzigingen
git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || true

# Check of npm beschikbaar is
echo "Checking npm availability..."
NPM_PATH=$(which npm 2>/dev/null || echo "")
if [ -z "$NPM_PATH" ]; then
    # Probeer verschillende locaties
    if [ -f "/usr/bin/npm" ]; then
        NPM_PATH="/usr/bin/npm"
    elif [ -f "/usr/local/bin/npm" ]; then
        NPM_PATH="/usr/local/bin/npm"
    elif [ -f "/opt/plesk/node/18/bin/npm" ]; then
        NPM_PATH="/opt/plesk/node/18/bin/npm"
    else
        echo ""
        echo "=========================================="
        echo "ERROR: npm niet gevonden!"
        echo "=========================================="
        echo "Zoek naar npm met: which npm"
        echo "Of installeer Node.js/npm op de server."
        exit 1
    fi
fi

echo "Using npm: $NPM_PATH"
echo "npm version: $($NPM_PATH --version)"

# Installeer dependencies eerst (voor het geval er nieuwe zijn)
echo ""
echo "Installing dependencies..."
$NPM_PATH install --production=false

if [ $? -ne 0 ]; then
    echo ""
    echo "=========================================="
    echo "ERROR: npm install gefaald!"
    echo "=========================================="
    exit 1
fi

# Check of package.json bestaat en build script aanwezig is
if [ ! -f "package.json" ]; then
    echo ""
    echo "=========================================="
    echo "ERROR: package.json niet gevonden!"
    echo "=========================================="
    exit 1
fi

# Check of build script bestaat in package.json
if ! grep -q '"build"' package.json; then
    echo ""
    echo "=========================================="
    echo "ERROR: build script niet gevonden in package.json!"
    echo "=========================================="
    exit 1
fi

# Build de applicatie
echo ""
echo "Building applicatie..."
$NPM_PATH run build

# Check of build succesvol was
BUILD_EXIT_CODE=$?
if [ $BUILD_EXIT_CODE -ne 0 ]; then
    echo ""
    echo "=========================================="
    echo "ERROR: Build gefaald!"
    echo "=========================================="
    echo "Controleer de build errors hierboven."
    echo "PM2 wordt NIET herstart om oude werkende versie te behouden."
    echo ""
    echo "Om de build errors te zien, voer handmatig uit:"
    echo "  cd $PWD"
    echo "  npm run build"
    echo ""
    exit 1
fi

echo ""
echo "✓ Build succesvol!"
echo ""

# Kopieer public folder en .next/server naar standalone build
if [ -d ".next/standalone" ]; then
    if [ -d "public" ]; then
        cp -r public .next/standalone/
    fi
    
    if [ -d ".next/server" ]; then
        mkdir -p .next/standalone/.next
        cp -r .next/server .next/standalone/.next/
    fi
    
    if [ -d ".next/static" ]; then
        mkdir -p .next/standalone/.next
        cp -r .next/static .next/standalone/.next/
    fi
fi

# Herstart PM2 alleen als build succesvol was
echo "Herstarten PM2 applicatie..."
/usr/bin/pm2 restart zelfontspanners

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✓ Deployment completed successfully!"
    echo "=========================================="
    echo ""
    echo "Applicatie is geüpdatet en herstart."
    echo "Check status met: pm2 status"
    echo "Check logs met: pm2 logs zelfontspanners"
    echo ""
else
    echo ""
    echo "ERROR: PM2 restart gefaald!"
    echo "Check PM2 status: pm2 status"
    echo "Check PM2 logs: pm2 logs zelfontspanners"
    exit 1
fi
