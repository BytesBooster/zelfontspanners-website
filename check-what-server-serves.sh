#!/bin/bash
# Check wat de server daadwerkelijk serveert

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "=========================================="
echo "CHECK WAT SERVER SERVEERT"
echo "=========================================="
echo ""

# Check 1: Welke layout files zijn er in de build?
echo "📁 Layout files in .next/static/chunks/app/:"
ls -lh .next/static/chunks/app/layout*.js 2>/dev/null || echo "Geen layout files gevonden"

echo ""
echo "🔍 Check of oude file (94f0854bcc52beb1) nog bestaat:"
if find .next -name "*94f0854bcc52beb1*" 2>/dev/null | grep -q .; then
    echo "❌ OUDE FILE NOG STEEDS AANWEZIG!"
    find .next -name "*94f0854bcc52beb1*" -type f
else
    echo "✅ Oude file niet gevonden in build"
fi

echo ""
echo "🔍 Check build manifest (.next/BUILD_ID):"
if [ -f ".next/BUILD_ID" ]; then
    echo "Build ID: $(cat .next/BUILD_ID)"
else
    echo "Geen BUILD_ID gevonden"
fi

echo ""
echo "🔍 Check .next/static/chunks/app/_buildManifest.js:"
if [ -f ".next/static/chunks/app/_buildManifest.js" ]; then
    echo "Build manifest gevonden"
    if grep -q "94f0854bcc52beb1" .next/static/chunks/app/_buildManifest.js 2>/dev/null; then
        echo "❌ OUDE HASH GEVONDEN IN BUILD MANIFEST!"
        grep "94f0854bcc52beb1" .next/static/chunks/app/_buildManifest.js | head -3
    else
        echo "✅ Oude hash NIET gevonden in build manifest"
    fi
else
    echo "Geen build manifest gevonden"
fi

echo ""
echo "🔍 Check .next/server/app/layout.js (server-side):"
if [ -f ".next/server/app/layout.js" ]; then
    if grep -q "94f0854bcc52beb1" .next/server/app/layout.js 2>/dev/null; then
        echo "❌ OUDE HASH GEVONDEN IN SERVER LAYOUT!"
        grep "94f0854bcc52beb1" .next/server/app/layout.js | head -3
    else
        echo "✅ Oude hash NIET gevonden in server layout"
    fi
else
    echo "Geen server layout gevonden"
fi

echo ""
echo "🔍 Check .next/server/app/_buildManifest.js:"
if [ -f ".next/server/app/_buildManifest.js" ]; then
    if grep -q "94f0854bcc52beb1" .next/server/app/_buildManifest.js 2>/dev/null; then
        echo "❌ OUDE HASH GEVONDEN IN SERVER BUILD MANIFEST!"
        grep "94f0854bcc52beb1" .next/server/app/_buildManifest.js | head -3
    else
        echo "✅ Oude hash NIET gevonden in server build manifest"
    fi
else
    echo "Geen server build manifest gevonden"
fi

echo ""
echo "🔍 Check alle .next/server/app/*.js files voor oude hash:"
if grep -r "94f0854bcc52beb1" .next/server/app/*.js 2>/dev/null | grep -q .; then
    echo "❌ OUDE HASH GEVONDEN IN SERVER FILES!"
    grep -r "94f0854bcc52beb1" .next/server/app/*.js 2>/dev/null | head -5
else
    echo "✅ Oude hash NIET gevonden in server files"
fi

echo ""
echo "=========================================="
echo "TEST: Wat serveert de server?"
echo "=========================================="
echo ""
echo "Test de HTML output met:"
echo "curl -s http://localhost:3000 | grep -o 'layout-[^\"']*\.js' | head -5"
echo ""
echo "Of check PM2 logs:"
echo "pm2 logs zelfontspanners --lines 20 --nostream"
echo ""

