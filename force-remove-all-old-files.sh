#!/bin/bash
# AGGRESSIVE script om ALLE oude bestanden te verwijderen die modals kunnen veroorzaken

echo "=========================================="
echo "FORCE REMOVING ALL OLD FILES"
echo "=========================================="
echo ""

cd /var/www/vhosts/zelfontspanners.nl/nodejs || exit 1

# Stop PM2 first
echo "⏸️  Stopping PM2..."
pm2 stop zelfontspanners 2>/dev/null || true

# Remove ALL old HTML files
echo "🗑️  Removing ALL old HTML files..."
rm -f *.html
rm -f login.html portfolio-manage.html index.html portfolio.html
rm -f leden.html contact.html agenda.html over-ons.html
rm -f sponsors.html foto-van-de-maand.html
rm -f add-2026-excursies.html fix-2025-to-2026.html
rm -f test-mock-data.html remove-test-event.html

# Remove ALL old JS files
echo "🗑️  Removing ALL old JS files..."
rm -f auth.js login.js portfolio-manage.js portfolio-manage-drag.js
rm -f components.js script.js portfolio.js agenda.js
rm -f contact.js foto-van-de-maand.js leden.js over-ons.js
rm -f add-albert-photos-to-portfolio.js download-albert-photos.js
rm -f download-all-portfolios.js create-portfolio-folders.js
rm -f load-mock-data.js clear-mock-data.js remove-alfred-account.js
rm -f reset-passwords.js

# Remove old build completely
echo "🗑️  Removing old .next build..."
rm -rf .next

# Remove node_modules and reinstall to be sure
echo "🗑️  Cleaning node_modules..."
rm -rf node_modules
rm -f package-lock.json

echo ""
echo "✅ All old files removed!"
echo ""
echo "Now run:"
echo "  npm install --legacy-peer-deps"
echo "  npm run build"
echo "  pm2 start ecosystem.config.js"

