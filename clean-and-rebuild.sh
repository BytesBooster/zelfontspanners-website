#!/bin/bash
# Script om oude build te verwijderen en opnieuw te bouwen

echo "=== CLEANING OLD BUILD AND REBUILDING ==="
echo ""

cd /var/www/vhosts/zelfontspanners.nl/nodejs || exit 1

# Stop PM2
echo "Stoppen van PM2..."
pm2 stop zelfontspanners 2>/dev/null || true

# Verwijder oude build
echo "Verwijderen van oude .next directory..."
rm -rf .next

# Verwijder oude node_modules (optioneel, maar kan helpen)
echo "Verwijderen van node_modules..."
rm -rf node_modules

# Reinstall dependencies
echo "Installeren van dependencies..."
npm install --legacy-peer-deps

# Build nieuwe versie
echo "Bouwen van nieuwe versie..."
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Start PM2
echo "Starten van PM2..."
pm2 start ecosystem.config.js || pm2 restart zelfontspanners

echo ""
echo "✅ Build voltooid!"
echo ""
echo "Check PM2 status:"
pm2 status zelfontspanners
echo ""
echo "Check logs:"
pm2 logs zelfontspanners --lines 20

