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

# Build de applicatie met extra memory voor webpack
echo ""
echo "Building applicatie..."
echo "Memory check:"
free -h | head -2
echo ""

# Check Node.js versie voor memory flag
NODE_PATH=$(which node 2>/dev/null || echo "")
if [ -z "$NODE_PATH" ]; then
    if [ -f "/usr/bin/node" ]; then
        NODE_PATH="/usr/bin/node"
    elif [ -f "/usr/local/bin/node" ]; then
        NODE_PATH="/usr/local/bin/node"
    elif [ -f "/opt/plesk/node/18/bin/node" ]; then
        NODE_PATH="/opt/plesk/node/18/bin/node"
    fi
fi

# Probeer build met extra memory (voor webpack memory issues)
if [ -n "$NODE_PATH" ]; then
    echo "Using Node.js: $NODE_PATH"
    echo "Node version: $($NODE_PATH --version)"
    
    # Set NODE_OPTIONS voor extra memory
    export NODE_OPTIONS="--max-old-space-size=4096"
    echo "Memory limit: 4GB (via NODE_OPTIONS)"
fi

# Build met verbose output voor betere error messages
echo ""
echo "Starting build (dit kan even duren)..."
$NPM_PATH run build 2>&1 | tee build-output.log

# Check of build succesvol was
BUILD_EXIT_CODE=${PIPESTATUS[0]}
if [ $BUILD_EXIT_CODE -ne 0 ]; then
    echo ""
    echo "=========================================="
    echo "ERROR: Build gefaald!"
    echo "=========================================="
    echo ""
    echo "Laatste 50 regels van build output:"
    echo "----------------------------------------"
    tail -50 build-output.log
    echo "----------------------------------------"
    echo ""
    echo "PM2 wordt NIET herstart om oude werkende versie te behouden."
    echo ""
    echo "Mogelijke oplossingen:"
    echo "1. Check memory: free -h"
    echo "2. Reinstall dependencies: rm -rf node_modules package-lock.json && npm install"
    echo "3. Check Node.js versie: node --version"
    echo "4. Voer diagnose uit: bash diagnose-build-error.sh"
    echo ""
    exit 1
fi

# Cleanup build log als succesvol
rm -f build-output.log

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
