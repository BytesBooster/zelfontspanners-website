#!/bin/bash
# Check wat de HTML output bevat - welke layout file wordt gerefereerd?

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "=========================================="
echo "CHECK HTML OUTPUT - WELKE LAYOUT FILE?"
echo "=========================================="
echo ""

# Check of PM2 draait
if ! pm2 list | grep -q "zelfontspanners.*online"; then
    echo "⚠️  PM2 draait niet of app is niet online"
    echo "Start eerst: pm2 restart zelfontspanners"
    exit 1
fi

# Get port from PM2
PORT=$(pm2 jlist | grep -o '"port":[0-9]*' | head -1 | cut -d: -f2 || echo "3000")

echo "🔍 Testing HTML output op localhost:$PORT..."
echo ""

# Fetch HTML and check for layout references
HTML_OUTPUT=$(curl -s "http://localhost:$PORT" 2>/dev/null)

if [ -z "$HTML_OUTPUT" ]; then
    echo "❌ Kon geen HTML ophalen van localhost:$PORT"
    echo "Check of de app draait: pm2 status zelfontspanners"
    exit 1
fi

echo "📄 Layout file referenties in HTML:"
echo "$HTML_OUTPUT" | grep -o 'layout-[^\"']*\.js' | sort -u | head -10

echo ""
echo "🔍 Check of oude hash (94f0854bcc52beb1) in HTML zit:"
if echo "$HTML_OUTPUT" | grep -q "94f0854bcc52beb1"; then
    echo "❌ OUDE HASH GEVONDEN IN HTML OUTPUT!"
    echo "$HTML_OUTPUT" | grep -o 'layout-[^\"']*94f0854bcc52beb1[^\"']*\.js' | head -5
    echo ""
    echo "Dit betekent dat de server nog steeds de oude build serveert!"
else
    echo "✅ Oude hash NIET gevonden in HTML (goed!)"
fi

echo ""
echo "🔍 Check voor 'Safari fallback' in HTML (zou er NIET moeten zijn):"
if echo "$HTML_OUTPUT" | grep -qi "safari fallback"; then
    echo "❌ 'Safari fallback' GEVONDEN IN HTML!"
    echo "$HTML_OUTPUT" | grep -i "safari fallback" | head -3
else
    echo "✅ 'Safari fallback' NIET gevonden in HTML (goed!)"
fi

echo ""
echo "=========================================="
echo "VERIFICATIE:"
echo "=========================================="
echo "Als je 'layout-94f0854bcc52beb1.js' ziet, dan:"
echo "1. De server heeft nog de oude build"
echo "2. Run: bash force-clean-rebuild-deploy.sh"
echo ""

