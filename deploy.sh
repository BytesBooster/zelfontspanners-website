#!/bin/bash
# Deployment script voor zelfontspanners.nl

set -e  # Exit on error

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "=========================================="
echo "Deploying zelfontspanners.nl"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json niet gevonden in $APP_DIR"
    exit 1
fi

# Check if build script exists
if ! grep -q '"build"' package.json; then
    echo "❌ Error: Geen build script gevonden in package.json"
    exit 1
fi

# Find npm
if command -v npm &> /dev/null; then
    NPM_CMD="npm"
elif [ -f "/usr/local/bin/npm" ]; then
    NPM_CMD="/usr/local/bin/npm"
elif [ -f "/usr/bin/npm" ]; then
    NPM_CMD="/usr/bin/npm"
else
    echo "❌ Error: npm niet gevonden"
    exit 1
fi

echo "Gebruikte npm: $NPM_CMD"
echo "Node versie: $($NPM_CMD --version)"
echo ""

# Pull latest code
echo "📥 Pulling latest code from Git..."
git pull origin main || {
    echo "⚠️  Git pull failed, maar we gaan door..."
}

# Stop PM2 temporarily
echo "⏸️  Stopping PM2..."
pm2 stop zelfontspanners 2>/dev/null || true

# Remove old build to force fresh build
echo "🗑️  Removing old .next build..."
rm -rf .next

# Install dependencies
echo "📦 Installing dependencies..."
$NPM_CMD install --legacy-peer-deps || {
    echo "⚠️  npm install had warnings, maar we gaan door..."
}

# Check for @supabase/supabase-js
if ! $NPM_CMD list @supabase/supabase-js &> /dev/null; then
    echo "⚠️  @supabase/supabase-js niet gevonden, installeren..."
    $NPM_CMD install @supabase/supabase-js --legacy-peer-deps
fi

# Build with extra memory
echo "🔨 Building Next.js app..."
export NODE_OPTIONS="--max-old-space-size=4096"
BUILD_OUTPUT=$($NPM_CMD run build 2>&1)
BUILD_EXIT=$?

if [ $BUILD_EXIT -ne 0 ]; then
    echo "❌ Build failed!"
    echo "$BUILD_OUTPUT" | tail -50
    echo ""
    echo "=========================================="
    echo "Als build faalt, check:"
    echo "1. PM2 logs: pm2 logs zelfontspanners --lines 50"
    echo "2. Node memory: node --max-old-space-size=4096 (voor memory issues)"
    echo "3. Reinstall: rm -rf node_modules package-lock.json && npm install"
    echo "=========================================="
    pm2 start ecosystem.config.js 2>/dev/null || pm2 restart zelfontspanners 2>/dev/null || true
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Restart PM2
echo "🔄 Restarting PM2..."
pm2 restart zelfontspanners || pm2 start ecosystem.config.js

echo ""
echo "✅ Deployment voltooid!"
echo ""
echo "PM2 Status:"
pm2 status zelfontspanners
echo ""
echo "Laatste logs:"
pm2 logs zelfontspanners --lines 10 --nostream
