#!/bin/bash
# Script om build errors te diagnosticeren op de server

export PATH="/usr/bin:/usr/local/bin:/bin:$PATH"
cd /var/www/vhosts/zelfontspanners.nl/nodejs

echo "=========================================="
echo "Build Error Diagnose"
echo "=========================================="
echo ""

# Check 1: Node.js versie
echo "[1/7] Node.js versie..."
NODE_VERSION=$(node --version 2>/dev/null || echo "NIET GEVONDEN")
echo "Node.js: $NODE_VERSION"

# Check 2: npm versie
echo ""
echo "[2/7] npm versie..."
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

if [ -n "$NPM_PATH" ]; then
    NPM_VERSION=$($NPM_PATH --version 2>/dev/null || echo "VERSION CHECK GEFAALD")
    echo "npm: $NPM_VERSION (locatie: $NPM_PATH)"
else
    echo "npm: NIET GEVONDEN"
fi

# Check 3: Memory beschikbaar
echo ""
echo "[3/7] Memory beschikbaar..."
FREE_MEM=$(free -m | awk 'NR==2{printf "%.1f GB", $7/1024}')
echo "Vrije memory: $FREE_MEM"

# Check 4: Disk space
echo ""
echo "[4/7] Disk space..."
DF_OUTPUT=$(df -h . | tail -1)
echo "$DF_OUTPUT"

# Check 5: package.json bestaat
echo ""
echo "[5/7] package.json check..."
if [ -f "package.json" ]; then
    echo "✓ package.json bestaat"
    PACKAGE_NODE=$(grep -o '"node": "[^"]*"' package.json || echo "")
    PACKAGE_NEXT=$(grep -o '"next": "[^"]*"' package.json || echo "")
    echo "  Node requirement: $PACKAGE_NODE"
    echo "  Next.js versie: $PACKAGE_NEXT"
else
    echo "✗ package.json bestaat NIET!"
fi

# Check 6: node_modules bestaat
echo ""
echo "[6/7] node_modules check..."
if [ -d "node_modules" ]; then
    MODULE_COUNT=$(find node_modules -maxdepth 1 -type d 2>/dev/null | wc -l)
    echo "✓ node_modules bestaat ($MODULE_COUNT modules)"
    
    # Check of belangrijke packages geïnstalleerd zijn
    if [ -d "node_modules/next" ]; then
        NEXT_VERSION=$(cat node_modules/next/package.json 2>/dev/null | grep -o '"version": "[^"]*"' | head -1 || echo "")
        echo "  Next.js geïnstalleerd: $NEXT_VERSION"
    else
        echo "  ⚠ Next.js NIET geïnstalleerd!"
    fi
    
    if [ -d "node_modules/webpack" ]; then
        WEBPACK_VERSION=$(cat node_modules/webpack/package.json 2>/dev/null | grep -o '"version": "[^"]*"' | head -1 || echo "")
        echo "  Webpack geïnstalleerd: $WEBPACK_VERSION"
    else
        echo "  ⚠ Webpack NIET geïnstalleerd!"
    fi
else
    echo "✗ node_modules bestaat NIET!"
    echo "  Voer uit: npm install"
fi

# Check 7: Environment variables
echo ""
echo "[7/7] Environment variables..."
if [ -f ".env.local" ]; then
    echo "✓ .env.local bestaat"
    ENV_VARS=$(grep -v '^#' .env.local | grep -v '^$' | wc -l)
    echo "  Aantal variabelen: $ENV_VARS"
else
    echo "⚠ .env.local bestaat NIET (kan nodig zijn voor Supabase)"
fi

echo ""
echo "=========================================="
echo "Nu proberen we de build met verbose output..."
echo "=========================================="
echo ""

# Probeer build met meer output
if [ -n "$NPM_PATH" ]; then
    echo "Voer uit: $NPM_PATH run build"
    echo ""
    $NPM_PATH run build 2>&1 | head -100
else
    echo "npm niet gevonden, kan build niet uitvoeren"
fi

echo ""
echo "=========================================="
echo "Als build faalt, check:"
echo "1. PM2 logs: pm2 logs zelfontspanners --lines 50"
echo "2. Node memory: node --max-old-space-size=4096 (voor memory issues)"
echo "3. Reinstall: rm -rf node_modules package-lock.json && npm install"
echo "=========================================="


