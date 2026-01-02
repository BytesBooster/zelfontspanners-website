#!/bin/bash
# Script om te checken welke build versie er op de server staat

cd /var/www/vhosts/zelfontspanners.nl/nodejs || exit 1

echo "=== CHECKING BUILD VERSION ==="
echo ""

# Check if .next exists
if [ ! -d ".next" ]; then
    echo "❌ .next directory niet gevonden!"
    exit 1
fi

# Find layout.js files
echo "📁 Layout files in .next:"
find .next -name "layout*.js" -type f | head -5

echo ""
echo "📅 Build timestamp:"
ls -la .next/BUILD_ID 2>/dev/null || echo "Geen BUILD_ID gevonden"

echo ""
echo "📦 Package.json versie:"
grep '"version"' package.json || echo "Geen versie gevonden"

echo ""
echo "🔍 Check of PasswordResetModal nog in build staat:"
MATCHES=$(grep -ri "passwordresetmodal" .next 2>/dev/null | head -3)
if [ -n "$MATCHES" ]; then
    echo "⚠️  PasswordResetModal GEVONDEN in build!"
    echo "   Locaties:"
    grep -ril "passwordresetmodal" .next 2>/dev/null | head -5
else
    echo "✅ PasswordResetModal NIET gevonden in build (goed!)"
fi

echo ""
echo "🔍 Check of PasswordResetGuard nog in build staat:"
MATCHES=$(grep -ri "passwordresetguard" .next 2>/dev/null | head -3)
if [ -n "$MATCHES" ]; then
    echo "⚠️  PasswordResetGuard GEVONDEN in build!"
    echo "   Locaties:"
    grep -ril "passwordresetguard" .next 2>/dev/null | head -5
else
    echo "✅ PasswordResetGuard NIET gevonden in build (goed!)"
fi

echo ""
echo "🔍 Check of 'Safari fallback' logs nog in build staan:"
MATCHES=$(grep -ri "safari fallback" .next 2>/dev/null | head -3)
if [ -n "$MATCHES" ]; then
    echo "⚠️  Safari fallback logs GEVONDEN in build!"
    echo "   Locaties:"
    grep -ril "safari fallback" .next 2>/dev/null | head -5
else
    echo "✅ Safari fallback logs NIET gevonden in build (goed!)"
fi

