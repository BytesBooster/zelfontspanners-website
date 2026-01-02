#!/bin/bash
# Script om uitvoerrechten te geven aan deployment scripts

cd /var/www/vhosts/zelfontspanners.nl/nodejs || exit 1

echo "Geef uitvoerrechten aan scripts..."
chmod +x deploy.sh
chmod +x remove-all-old-files.sh
chmod +x remove-old-files.sh

echo "✅ Uitvoerrechten toegekend!"
echo ""
echo "Nu kun je uitvoeren:"
echo "  ./deploy.sh"
echo "  of"
echo "  ./remove-all-old-files.sh"

