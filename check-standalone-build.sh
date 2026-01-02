#!/bin/bash
# Check wat er in de standalone build staat

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "=========================================="
echo "CHECK STANDALONE BUILD"
echo "=========================================="
echo ""

if [ ! -d ".next/standalone" ]; then
    echo "❌ Standalone build directory niet gevonden!"
    echo "Run eerst: npm run build"
    exit 1
fi

echo "🔍 Check standalone build voor oude hash..."
echo ""

# Check server.js
if [ -f ".next/standalone/server.js" ]; then
    echo "📄 Checking .next/standalone/server.js..."
    if grep -q "94f0854bcc52beb1" .next/standalone/server.js 2>/dev/null; then
        echo "❌ OUDE HASH GEVONDEN in standalone/server.js!"
        grep -o "94f0854bcc52beb1" .next/standalone/server.js | head -3
    else
        echo "✅ Oude hash NIET gevonden in standalone/server.js"
    fi
fi

# Check HTML templates in standalone
echo ""
echo "🔍 Checking HTML templates in standalone build..."
find .next/standalone -name "*.html" -type f | while read file; do
    if grep -q "94f0854bcc52beb1" "$file" 2>/dev/null; then
        echo "❌ OUDE HASH GEVONDEN in: $file"
        grep -o "layout-[^\"']*94f0854bcc52beb1[^\"']*\.js" "$file" | head -3
    fi
done

# Check alle JS files in standalone
echo ""
echo "🔍 Checking JS files in standalone build..."
find .next/standalone -name "*.js" -type f | while read file; do
    if grep -q "94f0854bcc52beb1" "$file" 2>/dev/null; then
        echo "❌ OUDE HASH GEVONDEN in: $file"
        grep -o "94f0854bcc52beb1" "$file" | head -3
    fi
done

# Check static files
echo ""
echo "🔍 Checking static files in standalone..."
if [ -d ".next/standalone/.next/static" ]; then
    echo "📁 Static files directory found"
    find .next/standalone/.next/static -name "*94f0854bcc52beb1*" -type f 2>/dev/null | head -5
fi

echo ""
echo "=========================================="
echo "CHECK HTML OUTPUT VAN SERVER"
echo "=========================================="
echo ""
echo "Fetching HTML from server..."
HTML=$(curl -s http://localhost:3001 2>/dev/null)
if [ ! -z "$HTML" ]; then
    echo "HTML length: ${#HTML} bytes"
    echo ""
    echo "Layout references in HTML:"
    echo "$HTML" | grep -o 'layout-[^"'\'']*\.js' | sort -u | head -5
    echo ""
    if echo "$HTML" | grep -q "94f0854bcc52beb1"; then
        echo "❌ OUDE HASH IN HTML OUTPUT!"
        echo "First occurrence:"
        echo "$HTML" | grep -o 'layout-[^"'\'']*94f0854bcc52beb1[^"'\'']*\.js' | head -1
    else
        echo "✅ Oude hash NIET in HTML output"
    fi
else
    echo "❌ Kon geen HTML ophalen"
fi

echo ""

