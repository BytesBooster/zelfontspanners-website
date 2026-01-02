#!/bin/bash
# Force browser to reload by changing build hash

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "🔥 FORCING BROWSER RELOAD - Changing build to force new hash..."

# Stop PM2
pm2 stop zelfontspanners 2>/dev/null || true

# Remove ALL builds
rm -rf .next

# Add a small change to force new hash (touch a file)
touch app/layout.tsx

# Pull latest
git stash
git pull origin main

# Build
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Restart PM2
pm2 restart zelfontspanners || pm2 start ecosystem.config.js

echo "✅ New build created with new hash"
echo "Check the new layout file:"
ls -lh .next/static/chunks/app/layout*.js

