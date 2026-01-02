#!/bin/bash
# Script om te zoeken naar de modal tekst op de server

echo "Zoeken naar modal teksten in alle bestanden op de server..."
echo ""

# Zoek naar de specifieke teksten
SEARCH_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"

echo "Zoeken in: $SEARCH_DIR"
echo ""

# Zoek naar "Wijzig je wachtwoord voor extra veiligheid"
echo "=== Zoeken naar 'Wijzig je wachtwoord voor extra veiligheid' ==="
grep -r "Wijzig je wachtwoord voor extra veiligheid" "$SEARCH_DIR" 2>/dev/null | head -20
echo ""

# Zoek naar "voor extra beveiliging"
echo "=== Zoeken naar 'voor extra beveiliging' ==="
grep -r "voor extra beveiliging" "$SEARCH_DIR" 2>/dev/null | head -20
echo ""

# Zoek naar "Wachtwoord Instellen Vereist"
echo "=== Zoeken naar 'Wachtwoord Instellen Vereist' ==="
grep -r "Wachtwoord Instellen Vereist" "$SEARCH_DIR" 2>/dev/null | head -20
echo ""

# Zoek naar password-change-modal
echo "=== Zoeken naar 'password-change-modal' ==="
grep -r "password-change-modal" "$SEARCH_DIR" 2>/dev/null | head -20
echo ""

# Zoek naar createElement met modal
echo "=== Zoeken naar createElement.*modal ==="
grep -r "createElement.*modal\|createElement.*Modal" "$SEARCH_DIR" 2>/dev/null | head -20
echo ""

# Check welke HTML bestanden er zijn
echo "=== HTML bestanden op server ==="
find "$SEARCH_DIR" -name "*.html" -type f 2>/dev/null | head -20
echo ""

# Check welke JS bestanden er zijn
echo "=== JavaScript bestanden op server ==="
find "$SEARCH_DIR" -name "*.js" -type f 2>/dev/null | head -30
echo ""

echo "✅ Zoeken voltooid!"

