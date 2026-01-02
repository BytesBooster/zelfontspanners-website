#!/bin/bash
# Force remove oude build files inclusief layout-94f0854bcc52beb1.js

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "🗑️  Force removing oude build files..."

# Stop PM2
pm2 stop zelfontspanners 2>/dev/null || true

# Remove ALL .next builds
rm -rf .next

# Remove specifieke oude layout file
find . -name "*layout-94f0854bcc52beb1*" -type f -delete 2>/dev/null || true
find . -name "*94f0854bcc52beb1*" -type f -delete 2>/dev/null || true

# Remove oude static chunks
rm -rf .next/static/chunks/app/layout-94f0854bcc52beb1.js 2>/dev/null || true

# Pull latest code
echo "📥 Pulling latest code..."
git stash
git pull origin main

# Rebuild
echo "🔨 Rebuilding..."
export NODE_OPTIONS="--max-old-space-size=4096"
npm install --legacy-peer-deps
npm run build

# Verify oude file is weg
if find .next -name "*94f0854bcc52beb1*" 2>/dev/null | grep -q .; then
    echo "⚠️  Oude file nog steeds gevonden, force removing..."
    find .next -name "*94f0854bcc52beb1*" -type f -delete 2>/dev/null || true
fi

# Restart PM2
pm2 restart zelfontspanners || pm2 start ecosystem.config.js

echo "✅ Done! Oude build verwijderd en nieuwe build gemaakt."

