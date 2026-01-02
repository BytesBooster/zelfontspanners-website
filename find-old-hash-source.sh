#!/bin/bash
# Zoek waar de oude hash vandaan komt

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "=========================================="
echo "ZOEK BRON VAN OUDE HASH"
echo "=========================================="
echo ""

# Check alle mogelijke locaties
echo "🔍 Checking all possible locations..."
echo ""

# 1. Check standalone build manifesten
echo "1. Checking standalone build manifests..."
find .next/standalone -name "*manifest*" -type f 2>/dev/null | while read file; do
    if grep -q "94f0854bcc52beb1" "$file" 2>/dev/null; then
        echo "❌ GEVONDEN in: $file"
        grep -o "94f0854bcc52beb1" "$file" | head -1
    fi
done

# 2. Check standalone static files
echo ""
echo "2. Checking standalone static files..."
if [ -d ".next/standalone/.next/static" ]; then
    find .next/standalone/.next/static -name "*94f0854bcc52beb1*" -type f 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "❌ Oude file gevonden in standalone static!"
    else
        echo "✅ Geen oude file in standalone static"
    fi
fi

# 3. Check server-side render cache
echo ""
echo "3. Checking server render cache..."
find .next -name "*cache*" -type d 2>/dev/null | while read dir; do
    if find "$dir" -name "*94f0854bcc52beb1*" -type f 2>/dev/null | grep -q .; then
        echo "❌ Oude hash gevonden in cache: $dir"
    fi
done

# 4. Check .next/server voor HTML templates
echo ""
echo "4. Checking .next/server for HTML templates..."
find .next/server -name "*.html" -o -name "*.js" 2>/dev/null | while read file; do
    if grep -q "94f0854bcc52beb1" "$file" 2>/dev/null; then
        echo "❌ GEVONDEN in: $file"
        grep -o "layout-[^\"']*94f0854bcc52beb1[^\"']*\.js" "$file" | head -1
    fi
done

# 5. Check standalone server voor HTML generation code
echo ""
echo "5. Checking standalone server for HTML generation..."
if [ -f ".next/standalone/server.js" ]; then
    # Check of server.js naar oude static files verwijst
    if grep -q "94f0854bcc52beb1" .next/standalone/server.js 2>/dev/null; then
        echo "❌ Server.js verwijst naar oude hash!"
        grep -o "94f0854bcc52beb1" .next/standalone/server.js | head -3
    else
        echo "✅ Server.js verwijst niet naar oude hash"
    fi
fi

# 6. Check of er een reverse proxy cache is
echo ""
echo "6. Checking if reverse proxy might be caching..."
echo "PM2 process info:"
pm2 describe zelfontspanners | grep -E "script|pid|status" | head -5

# 7. Check welke static files de server kan serveren
echo ""
echo "7. Checking what static files are available..."
if [ -d ".next/standalone/.next/static/chunks/app" ]; then
    echo "Available layout files in standalone:"
    ls -lh .next/standalone/.next/static/chunks/app/layout*.js 2>/dev/null || echo "Geen layout files gevonden"
else
    echo "⚠️  Standalone static directory niet gevonden!"
    echo "Dit kan betekenen dat de standalone build niet compleet is."
fi

# 8. Check de HTML die de server serveert vs wat er in de build staat
echo ""
echo "8. Comparing server HTML with build..."
HTML=$(curl -s http://localhost:3001 2>/dev/null)
LAYOUT_IN_HTML=$(echo "$HTML" | grep -o 'layout-[^"'\'']*\.js' | head -1)
echo "Layout file in HTML: $LAYOUT_IN_HTML"

if [ -d ".next/standalone/.next/static/chunks/app" ]; then
    LAYOUT_IN_BUILD=$(ls .next/standalone/.next/static/chunks/app/layout*.js 2>/dev/null | head -1 | xargs basename)
    echo "Layout file in build: $LAYOUT_IN_BUILD"
    
    if [ "$LAYOUT_IN_HTML" != "$LAYOUT_IN_BUILD" ]; then
        echo "❌ MISMATCH! HTML verwijst naar andere file dan in build!"
    else
        echo "✅ Match - HTML verwijst naar juiste file"
    fi
fi

echo ""

