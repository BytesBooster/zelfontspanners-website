#!/bin/bash
# Script om te checken welke bestanden op de server staan die modals kunnen veroorzaken

echo "=== CHECKING SERVER FILES FOR MODAL SOURCES ==="
echo ""

SERVER_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"

if [ ! -d "$SERVER_DIR" ]; then
    echo "❌ Server directory niet gevonden: $SERVER_DIR"
    echo "Pas het pad aan in dit script"
    exit 1
fi

echo "Zoeken in: $SERVER_DIR"
echo ""

# Check HTML files
echo "=== HTML BESTANDEN ==="
find "$SERVER_DIR" -name "*.html" -type f 2>/dev/null | while read file; do
    echo "📄 $file"
    if grep -q "Wachtwoord Wijzigen\|Wachtwoord Instellen\|voor extra" "$file" 2>/dev/null; then
        echo "  ⚠️  BEVAT MODAL TEKST!"
        grep -n "Wachtwoord Wijzigen\|Wachtwoord Instellen\|voor extra" "$file" 2>/dev/null | head -5
    fi
done
echo ""

# Check JS files
echo "=== JAVASCRIPT BESTANDEN ==="
find "$SERVER_DIR" -name "*.js" -type f 2>/dev/null | while read file; do
    echo "📜 $file"
    if grep -q "Wachtwoord Wijzigen\|Wachtwoord Instellen\|voor extra\|password-change-modal\|createElement.*modal" "$file" 2>/dev/null; then
        echo "  ⚠️  BEVAT MODAL CODE!"
        grep -n "Wachtwoord Wijzigen\|Wachtwoord Instellen\|voor extra\|password-change-modal\|createElement.*modal" "$file" 2>/dev/null | head -5
    fi
done
echo ""

# Check public directory
echo "=== PUBLIC DIRECTORY ==="
if [ -d "$SERVER_DIR/public" ]; then
    find "$SERVER_DIR/public" -type f \( -name "*.html" -o -name "*.js" \) 2>/dev/null | while read file; do
        echo "📁 $file"
        if grep -q "Wachtwoord Wijzigen\|Wachtwoord Instellen\|voor extra" "$file" 2>/dev/null; then
            echo "  ⚠️  BEVAT MODAL TEKST!"
        fi
    done
fi
echo ""

# Check .next directory for built files
echo "=== NEXT.JS BUILD OUTPUT (.next) ==="
if [ -d "$SERVER_DIR/.next" ]; then
    find "$SERVER_DIR/.next" -name "*.html" -o -name "*.js" 2>/dev/null | head -10 | while read file; do
        if grep -q "Wachtwoord Wijzigen\|Wachtwoord Instellen\|voor extra" "$file" 2>/dev/null; then
            echo "⚠️  $file BEVAT MODAL TEKST!"
        fi
    done
fi
echo ""

echo "✅ Check voltooid!"
echo ""
echo "TIP: Open browser console (F12) en kijk naar [DEBUG] logs om te zien waar modals vandaan komen"


