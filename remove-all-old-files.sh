#!/bin/bash
# Script om ALLE oude HTML en JS bestanden te verwijderen die modals kunnen veroorzaken

echo "=========================================="
echo "Verwijderen van ALLE oude bestanden"
echo "=========================================="
echo ""

cd /var/www/vhosts/zelfontspanners.nl/nodejs || exit 1

# Verwijder oude HTML bestanden
echo "🗑️  Verwijderen oude HTML bestanden..."
rm -f login.html
rm -f portfolio-manage.html
rm -f index.html
rm -f portfolio.html
rm -f leden.html
rm -f contact.html
rm -f agenda.html
rm -f over-ons.html
rm -f sponsors.html
rm -f foto-van-de-maand.html
rm -f add-2026-excursies.html
rm -f fix-2025-to-2026.html
rm -f test-mock-data.html
rm -f remove-test-event.html

# Verwijder oude JS bestanden die modals gebruiken
echo "🗑️  Verwijderen oude JS bestanden..."
rm -f auth.js
rm -f login.js
rm -f portfolio-manage.js
rm -f portfolio-manage-drag.js
rm -f components.js
rm -f script.js
rm -f portfolio.js
rm -f agenda.js
rm -f contact.js
rm -f foto-van-de-maand.js
rm -f leden.js
rm -f over-ons.js
rm -f add-albert-photos-to-portfolio.js
rm -f download-albert-photos.js
rm -f download-all-portfolios.js
rm -f create-portfolio-folders.js
rm -f load-mock-data.js
rm -f clear-mock-data.js
rm -f remove-alfred-account.js
rm -f reset-passwords.js

# Verwijder oude build chunks die modals kunnen bevatten
echo "🗑️  Controleren op oude build chunks..."
if [ -d ".next" ]; then
    # Zoek naar oude layout chunks die modals kunnen bevatten
    find .next -name "layout-*.js" -type f -exec grep -l "PasswordResetModal\|password-change-modal\|wijzig.*wachtwoord.*voor.*extra" {} \; 2>/dev/null | while read file; do
        echo "⚠️  Oude build chunk gevonden: $file"
        rm -f "$file"
    done
fi

echo ""
echo "✅ Alle oude bestanden verwijderd!"
echo ""
echo "📋 Controleren of er nog oude bestanden zijn..."
if [ -f "login.js" ] || [ -f "auth.js" ] || [ -f "login.html" ]; then
    echo "⚠️  WAARSCHUWING: Er zijn nog oude bestanden aanwezig!"
    ls -la login.js auth.js login.html 2>/dev/null
else
    echo "✅ Geen oude login bestanden meer gevonden"
fi

echo ""
echo "🔄 Herstart PM2 om wijzigingen door te voeren:"
echo "   pm2 restart zelfontspanners"

