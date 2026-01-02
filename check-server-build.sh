#!/bin/bash
# Check welke build files er op de server staan

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "=========================================="
echo "CHECKING SERVER BUILD FILES"
echo "=========================================="
echo ""

echo "🔍 Checking for old layout file (94f0854bcc52beb1)..."
if find .next -name "*94f0854bcc52beb1*" 2>/dev/null | grep -q .; then
    echo "❌ OUDE BUILD FILE GEVONDEN!"
    find .next -name "*94f0854bcc52beb1*" -type f
    echo ""
    echo "Deze file moet verwijderd worden!"
else
    echo "✅ Oude build file NIET gevonden (goed!)"
fi

echo ""
echo "📁 Current layout files in .next/static/chunks/app/:"
ls -lh .next/static/chunks/app/layout*.js 2>/dev/null || echo "Geen layout files gevonden"

echo ""
echo "🔍 Checking for 'Safari fallback' in build files..."
if grep -r "Safari fallback" .next/static/chunks/app/ 2>/dev/null | grep -q .; then
    echo "❌ 'Safari fallback' GEVONDEN in build!"
    grep -r "Safari fallback" .next/static/chunks/app/ 2>/dev/null | head -3
else
    echo "✅ 'Safari fallback' NIET gevonden in build (goed!)"
fi

echo ""
echo "🔍 Checking for 'Auth state update' in build files..."
if grep -r "Auth state update" .next/static/chunks/app/ 2>/dev/null | grep -q .; then
    echo "❌ 'Auth state update' GEVONDEN in build!"
    grep -r "Auth state update" .next/static/chunks/app/ 2>/dev/null | head -3
else
    echo "✅ 'Auth state update' NIET gevonden in build (goed!)"
fi

echo ""
echo "📊 Build directory size:"
du -sh .next 2>/dev/null || echo "Geen .next directory"

echo ""
echo "📅 Last modified times:"
find .next/static/chunks/app/layout*.js -type f -exec ls -lh {} \; 2>/dev/null | head -5

