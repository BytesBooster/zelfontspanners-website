#!/bin/bash
# Script om veelvoorkomende build issues automatisch op te lossen

export PATH="/usr/bin:/usr/local/bin:/bin:$PATH"
cd /var/www/vhosts/zelfontspanners.nl/nodejs

echo "=========================================="
echo "Build Issues Oplossen"
echo "=========================================="
echo ""

NPM_PATH=$(which npm 2>/dev/null || echo "")
if [ -z "$NPM_PATH" ]; then
    if [ -f "/usr/bin/npm" ]; then
        NPM_PATH="/usr/bin/npm"
    elif [ -f "/usr/local/bin/npm" ]; then
        NPM_PATH="/usr/local/bin/npm"
    elif [ -f "/opt/plesk/node/18/bin/npm" ]; then
        NPM_PATH="/opt/plesk/node/18/bin/npm"
    fi
fi

if [ -z "$NPM_PATH" ]; then
    echo "ERROR: npm niet gevonden!"
    exit 1
fi

# Stap 1: Cleanup oude build artifacts
echo "[1/5] Opschonen oude build artifacts..."
rm -rf .next
rm -rf node_modules/.cache
rm -f build-output.log
rm -f build-full-output.log
echo "✓ Opgeschoond"
echo ""

# Stap 2: Cleanup package lock en node_modules (optioneel, alleen als nodig)
read -p "Wil je node_modules opnieuw installeren? (j/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[JjYy]$ ]]; then
    echo "[2/5] Verwijderen node_modules en package-lock.json..."
    rm -rf node_modules
    rm -f package-lock.json
    echo "✓ Verwijderd"
    echo ""
    
    echo "[3/5] Opnieuw installeren dependencies..."
    $NPM_PATH install --production=false
    if [ $? -ne 0 ]; then
        echo "✗ npm install gefaald!"
        exit 1
    fi
    echo "✓ Dependencies geïnstalleerd"
    echo ""
else
    echo "[2/5] Dependencies bijwerken..."
    $NPM_PATH install --production=false
    if [ $? -ne 0 ]; then
        echo "✗ npm install gefaald!"
        exit 1
    fi
    echo "✓ Dependencies bijgewerkt"
    echo ""
fi

# Stap 4: Check TypeScript errors
echo "[4/5] TypeScript errors controleren..."
if [ -f "tsconfig.json" ]; then
    $NPM_PATH run lint 2>&1 | head -50
    echo ""
fi

# Stap 5: Build met extra memory
echo "[5/5] Build uitvoeren met extra memory..."
export NODE_OPTIONS="--max-old-space-size=4096"
echo "Memory limit: 4GB"
echo ""

$NPM_PATH run build 2>&1 | tee build-output.log
BUILD_EXIT_CODE=${PIPESTATUS[0]}

echo ""
echo "=========================================="
if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo "✓ Build succesvol!"
    echo "=========================================="
    echo ""
    echo "Je kunt nu ./deploy.sh uitvoeren of PM2 herstarten:"
    echo "  pm2 restart zelfontspanners"
else
    echo "✗ Build nog steeds gefaald!"
    echo "=========================================="
    echo ""
    echo "Laatste errors:"
    echo "----------------------------------------"
    grep -i "error\|failed\|fail" build-output.log | tail -30
    echo "----------------------------------------"
    echo ""
    echo "Volledige output: build-output.log"
    echo ""
    echo "Probeer handmatig:"
    echo "  bash show-build-error.sh"
fi
echo ""

