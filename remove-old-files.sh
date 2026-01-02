#!/bin/bash
# Script om oude HTML en JS bestanden te verwijderen die modals veroorzaken

echo "Verwijderen van oude HTML en JS bestanden..."

cd /var/www/vhosts/zelfontspanners.nl/nodejs || exit 1

# Verwijder oude HTML bestanden
echo "Verwijderen oude HTML bestanden..."
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

# Verwijder oude JS bestanden die modals gebruiken
echo "Verwijderen oude JS bestanden..."
rm -f auth.js
rm -f login.js
rm -f portfolio-manage.js
rm -f components.js

echo "✅ Oude bestanden verwijderd!"
echo ""
echo "Herstart PM2 om wijzigingen door te voeren:"
echo "pm2 restart zelfontspanners"

