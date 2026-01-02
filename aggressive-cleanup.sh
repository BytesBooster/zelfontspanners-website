#!/bin/bash
# AGGRESSIVE cleanup van oude build files

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "🔥 AGGRESSIVE CLEANUP - Removing ALL old build files..."

# Stop PM2
pm2 stop zelfontspanners 2>/dev/null || true

# Remove ALL .next builds
echo "🗑️  Removing .next folder..."
rm -rf .next

# Remove ALL oude layout files (niet alleen de specifieke hash)
echo "🗑️  Removing ALL old layout files..."
find . -name "*layout-*.js" -type f -delete 2>/dev/null || true
find . -name "*layout*.js" -path "*/.next/*" -type f -delete 2>/dev/null || true

# Remove specifieke oude file
find . -name "*94f0854bcc52beb1*" -type f -delete 2>/dev/null || true

# Remove node_modules cache
echo "🗑️  Clearing npm cache..."
npm cache clean --force 2>/dev/null || true

# Pull latest code
echo "📥 Pulling latest code..."
git stash
git pull origin main

# Remove package-lock om fresh install te forceren
rm -f package-lock.json

# Fresh install
echo "📦 Fresh install..."
npm install --legacy-peer-deps

# Build met nieuwe hash
echo "🔨 Building with fresh hash..."
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Verify oude file is WEG
echo "🔍 Verifying old file is removed..."
if find .next -name "*94f0854bcc52beb1*" 2>/dev/null | grep -q .; then
    echo "❌ OUDE FILE NOG STEEDS GEVONDEN! Force removing..."
    find .next -name "*94f0854bcc52beb1*" -type f -exec rm -f {} \; 2>/dev/null || true
    # Rebuild again
    npm run build
fi

# List alle layout files om te zien wat er nu is
echo "📋 Current layout files:"
ls -lh .next/static/chunks/app/layout*.js 2>/dev/null || echo "Geen layout files gevonden"

# Restart PM2
echo "🔄 Restarting PM2..."
pm2 restart zelfontspanners || pm2 start ecosystem.config.js

echo ""
echo "✅ AGGRESSIVE CLEANUP COMPLETE!"
echo "Check de nieuwe layout file hierboven - het zou NIET layout-94f0854bcc52beb1.js moeten zijn"

