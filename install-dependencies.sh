#!/bin/bash
# Script om dependencies correct te installeren

export PATH="/usr/bin:/usr/local/bin:/bin:$PATH"
cd /var/www/vhosts/zelfontspanners.nl/nodejs

echo "=========================================="
echo "Dependencies Installeren"
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

echo "Using npm: $NPM_PATH"
echo "npm version: $($NPM_PATH --version)"
echo ""

# Verwijder node_modules en package-lock.json
echo "[1/3] Opschonen oude dependencies..."
rm -rf node_modules
rm -f package-lock.json
echo "✓ Opgeschoond"
echo ""

# Installeer dependencies
echo "[2/3] Installeren dependencies..."
$NPM_PATH install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo "Install met --legacy-peer-deps gefaald, probeer zonder..."
    $NPM_PATH install
    if [ $? -ne 0 ]; then
        echo "✗ npm install gefaald!"
        exit 1
    fi
fi
echo "✓ Dependencies geïnstalleerd"
echo ""

# Verifieer belangrijke dependencies
echo "[3/3] Verifiëren belangrijke dependencies..."
MISSING_DEPS=0

if [ ! -d "node_modules/@supabase/supabase-js" ]; then
    echo "⚠ @supabase/supabase-js niet gevonden!"
    echo "  Probeer handmatig te installeren..."
    $NPM_PATH install @supabase/supabase-js --legacy-peer-deps || $NPM_PATH install @supabase/supabase-js
    if [ ! -d "node_modules/@supabase/supabase-js" ]; then
        echo "  ✗ Kon @supabase/supabase-js niet installeren!"
        MISSING_DEPS=1
    else
        echo "  ✓ @supabase/supabase-js nu geïnstalleerd"
    fi
else
    echo "✓ @supabase/supabase-js geïnstalleerd"
fi

if [ ! -d "node_modules/next" ]; then
    echo "⚠ next niet gevonden!"
    MISSING_DEPS=1
else
    echo "✓ next geïnstalleerd"
fi

if [ ! -d "node_modules/react" ]; then
    echo "⚠ react niet gevonden!"
    MISSING_DEPS=1
else
    echo "✓ react geïnstalleerd"
fi

echo ""
if [ $MISSING_DEPS -eq 1 ]; then
    echo "=========================================="
    echo "⚠ Sommige dependencies ontbreken!"
    echo "=========================================="
    echo ""
    echo "Probeer handmatig:"
    echo "  npm install --legacy-peer-deps"
    echo ""
    exit 1
else
    echo "=========================================="
    echo "✓ Alle dependencies correct geïnstalleerd!"
    echo "=========================================="
    echo ""
    echo "Je kunt nu proberen te builden:"
    echo "  npm run build"
    echo ""
fi

