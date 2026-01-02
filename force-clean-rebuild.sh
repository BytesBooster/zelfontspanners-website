#!/bin/bash
# Force clean rebuild - verwijdert ALLES en bouwt opnieuw

cd /var/www/vhosts/zelfontspanners.nl/nodejs || exit 1

echo "=========================================="
echo "FORCE CLEAN REBUILD"
echo "=========================================="
echo ""

# Stop PM2
echo "⏸️  Stopping PM2..."
pm2 stop zelfontspanners 2>/dev/null || true

# Remove ALL build artifacts
echo "🗑️  Removing ALL build artifacts..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .next/cache 2>/dev/null || true

# Remove node_modules (optional but ensures clean install)
echo "🗑️  Removing node_modules..."
rm -rf node_modules

# Remove package-lock.json to force fresh dependency resolution
echo "🗑️  Removing package-lock.json..."
rm -f package-lock.json

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies fresh
echo "📦 Installing dependencies fresh..."
npm install --legacy-peer-deps

# Check for @supabase/supabase-js
if ! npm list @supabase/supabase-js &> /dev/null; then
    echo "⚠️  @supabase/supabase-js niet gevonden, installeren..."
    npm install @supabase/supabase-js --legacy-peer-deps
fi

# Build with extra memory
echo "🔨 Building Next.js app (this may take a while)..."
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Check build result
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    pm2 start ecosystem.config.js 2>/dev/null || pm2 restart zelfontspanners 2>/dev/null || true
    exit 1
fi

# Verify PasswordResetModal is NOT in build
echo ""
echo "🔍 Verifying build..."
if grep -r "PasswordResetModal" .next 2>/dev/null | head -1; then
    echo "❌ ERROR: PasswordResetModal STILL IN BUILD!"
    echo "Dit betekent dat er nog code is die deze component gebruikt."
    exit 1
else
    echo "✅ PasswordResetModal NOT in build (good!)"
fi

if grep -r "PasswordResetGuard" .next 2>/dev/null | head -1; then
    echo "❌ ERROR: PasswordResetGuard STILL IN BUILD!"
    exit 1
else
    echo "✅ PasswordResetGuard NOT in build (good!)"
fi

# Start PM2
echo ""
echo "🔄 Starting PM2..."
pm2 restart zelfontspanners || pm2 start ecosystem.config.js

echo ""
echo "✅ Force clean rebuild completed!"
echo ""
pm2 status zelfontspanners


