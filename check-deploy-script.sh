#!/bin/bash
# Script om te controleren of deploy.sh correct werkt op de server
# Voer dit uit op de server: bash check-deploy-script.sh

export PATH="/usr/bin:/usr/local/bin:/bin:$PATH"
cd /var/www/vhosts/zelfontspanners.nl/nodejs

echo "=========================================="
echo "Deploy Script Checker"
echo "=========================================="
echo ""

# Check 1: Bestaat deploy.sh?
echo "[1/6] Controleren of deploy.sh bestaat..."
if [ -f "deploy.sh" ]; then
    echo "✓ deploy.sh bestaat"
else
    echo "✗ deploy.sh bestaat NIET!"
    echo "  Maak het script aan of kopieer het van Git."
    exit 1
fi

# Check 2: Heeft deploy.sh execute permissies?
echo ""
echo "[2/6] Controleren permissies van deploy.sh..."
if [ -x "deploy.sh" ]; then
    echo "✓ deploy.sh heeft execute permissies"
else
    echo "⚠ deploy.sh heeft GEEN execute permissies"
    echo "  Probeer: chmod +x deploy.sh"
    chmod +x deploy.sh
    if [ -x "deploy.sh" ]; then
        echo "  ✓ Permissies nu gefixed"
    else
        echo "  ✗ Kon permissies niet fixen"
    fi
fi

# Check 3: Bestaat package.json?
echo ""
echo "[3/6] Controleren of package.json bestaat..."
if [ -f "package.json" ]; then
    echo "✓ package.json bestaat"
else
    echo "✗ package.json bestaat NIET!"
    exit 1
fi

# Check 4: Bestaat build script in package.json?
echo ""
echo "[4/6] Controleren of build script bestaat in package.json..."
if grep -q '"build"' package.json; then
    echo "✓ build script gevonden in package.json"
    BUILD_CMD=$(grep -A 1 '"build"' package.json | head -2 | grep -o '".*"' | head -1 | tr -d '"')
    echo "  Build command: $BUILD_CMD"
else
    echo "✗ build script NIET gevonden in package.json!"
    exit 1
fi

# Check 5: Is npm beschikbaar?
echo ""
echo "[5/6] Controleren of npm beschikbaar is..."
NPM_PATH=$(which npm 2>/dev/null || echo "")
if [ -z "$NPM_PATH" ]; then
    if [ -f "/usr/bin/npm" ]; then
        NPM_PATH="/usr/bin/npm"
    elif [ -f "/usr/local/bin/npm" ]; then
        NPM_PATH="/usr/local/bin/npm"
    elif [ -f "/opt/plesk/node/18/bin/npm" ]; then
        NPM_PATH="/opt/plesk/node/18/bin/npm"
    else
        echo "✗ npm niet gevonden!"
        echo "  Zoek met: which npm"
        echo "  Of: find /usr -name npm 2>/dev/null"
        exit 1
    fi
fi
echo "✓ npm gevonden: $NPM_PATH"
echo "  npm version: $($NPM_PATH --version 2>/dev/null || echo 'version check gefaald')"

# Check 6: Zijn dependencies geïnstalleerd?
echo ""
echo "[6/6] Controleren of node_modules bestaat..."
if [ -d "node_modules" ]; then
    echo "✓ node_modules bestaat"
    MODULE_COUNT=$(find node_modules -maxdepth 1 -type d | wc -l)
    echo "  Aantal modules: $MODULE_COUNT"
else
    echo "⚠ node_modules bestaat NIET"
    echo "  Voer uit: npm install"
fi

echo ""
echo "=========================================="
echo "Check Compleet!"
echo "=========================================="
echo ""
echo "Als alle checks geslaagd zijn, probeer dan:"
echo "  ./deploy.sh"
echo ""

