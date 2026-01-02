#!/bin/bash
# Fix PM2 to use correct server.js path

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "=========================================="
echo "FIX PM2 SERVER PATH"
echo "=========================================="
echo ""

# Check huidige PM2 config
echo "🔍 Current PM2 config:"
pm2 describe zelfontspanners | grep -E "script path|script args" | head -2

echo ""
echo "🔍 Checking for old server.js in httpdocs..."
if [ -f "/var/www/vhosts/zelfontspanners.nl/httpdocs/server.js" ]; then
    echo "❌ OUDE SERVER.JS GEVONDEN in httpdocs!"
    if grep -q "94f0854bcc52beb1" /var/www/vhosts/zelfontspanners.nl/httpdocs/server.js 2>/dev/null; then
        echo "❌ OUDE HASH GEVONDEN in httpdocs/server.js!"
        echo "Dit is het probleem!"
    fi
    echo ""
    echo "Verwijderen van oude server.js..."
    rm -f /var/www/vhosts/zelfontspanners.nl/httpdocs/server.js
    echo "✅ Oude server.js verwijderd"
fi

# Check of standalone server.js bestaat
if [ ! -f ".next/standalone/server.js" ]; then
    echo ""
    echo "❌ Standalone server.js niet gevonden!"
    echo "Bouwen van standalone build..."
    npm run build
fi

# Stop PM2
echo ""
echo "⏸️  Stopping PM2..."
pm2 stop zelfontspanners 2>/dev/null || true
sleep 2

# Delete PM2 process om opnieuw te starten met juiste config
echo ""
echo "🗑️  Deleting PM2 process..."
pm2 delete zelfontspanners 2>/dev/null || true

# Start PM2 opnieuw met ecosystem.config.js (gebruikt juiste pad)
echo ""
echo "🔄 Starting PM2 with ecosystem.config.js..."
pm2 start ecosystem.config.js

echo ""
echo "✅ PM2 herstart met juiste config"
echo ""
echo "PM2 Status:"
pm2 status zelfontspanners

echo ""
echo "🔍 Verifying PM2 uses correct server.js..."
pm2 describe zelfontspanners | grep -E "script path" | head -1

echo ""

