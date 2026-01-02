#!/bin/bash
# Check if old build files are still on server

cd /var/www/vhosts/zelfontspanners.nl/nodejs || exit 1

echo "=== CHECKING FOR OLD BUILD FILES ==="
echo ""

echo "🔍 Looking for old layout file (94f0854bcc52beb1):"
find .next -name "*94f0854bcc52beb1*" -type f 2>/dev/null | head -5

echo ""
echo "🔍 Current layout files:"
find .next -name "layout*.js" -type f | head -5

echo ""
echo "🔍 Checking if old hash is referenced anywhere:"
grep -r "94f0854bcc52beb1" .next 2>/dev/null | head -3 || echo "Old hash not found (good!)"

echo ""
echo "✅ If old hash is not found, the problem is browser cache."
echo "   User needs to clear browser cache completely."

