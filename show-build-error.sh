#!/bin/bash
# Script om de volledige build error te tonen

export PATH="/usr/bin:/usr/local/bin:/bin:$PATH"
cd /var/www/vhosts/zelfontspanners.nl/nodejs

echo "=========================================="
echo "Build Error Details"
echo "=========================================="
echo ""

# Check of build-output.log bestaat
if [ -f "build-output.log" ]; then
    echo "Laatste build output gevonden:"
    echo "----------------------------------------"
    tail -100 build-output.log
    echo "----------------------------------------"
    echo ""
fi

# Check .next build directory voor errors
if [ -d ".next" ]; then
    echo "Build directory (.next) bestaat"
    if [ -f ".next/BUILD_ID" ]; then
        echo "Build ID: $(cat .next/BUILD_ID)"
    fi
else
    echo "Geen .next directory gevonden (build niet gestart)"
fi

echo ""
echo "=========================================="
echo "Proberen build opnieuw met volledige output..."
echo "=========================================="
echo ""

# Probeer build opnieuw met volledige output
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
    export NODE_OPTIONS="--max-old-space-size=4096"
    echo "Memory limit: 4GB"
    echo "Starting build..."
    echo ""
    $NPM_PATH run build 2>&1 | tee build-full-output.log
    BUILD_EXIT_CODE=${PIPESTATUS[0]}
    
    echo ""
    echo "=========================================="
    if [ $BUILD_EXIT_CODE -eq 0 ]; then
        echo "✓ Build succesvol!"
    else
        echo "✗ Build gefaald!"
        echo ""
        echo "Laatste 100 regels met errors:"
        echo "----------------------------------------"
        grep -i "error\|failed\|fail" build-full-output.log | tail -50
        echo "----------------------------------------"
        echo ""
        echo "Volledige output opgeslagen in: build-full-output.log"
    fi
    echo "=========================================="
else
    echo "npm niet gevonden!"
fi


