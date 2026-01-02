#!/bin/bash
# FORCE CLEAN REBUILD - Verwijdert ALLES en bouwt opnieuw
# Dit script verwijdert specifiek de oude layout-94f0854bcc52beb1.js file

set -e # Exit on error

APP_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
cd "$APP_DIR" || exit 1

echo "=========================================="
echo "FORCE CLEAN REBUILD - OUDE BUILD VERWIJDEREN"
echo "=========================================="
echo ""

# Stop PM2
echo "⏸️  Stopping PM2..."
pm2 stop zelfontspanners 2>/dev/null || true
sleep 2

# VERWIJDER ALLES - zeer agressief
echo "🗑️  Removing ALL build artifacts..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .next/cache 2>/dev/null || true
rm -rf .next/static 2>/dev/null || true

# Verwijder specifiek de problematische oude layout chunks
echo "🗑️  Removing specific old layout file: layout-94f0854bcc52beb1.js..."
find . -name "*layout-94f0854bcc52beb1*" -type f -delete 2>/dev/null || true
find . -name "*94f0854bcc52beb1*" -type f -delete 2>/dev/null || true
rm -rf .next/static/chunks/app/layout-94f0854bcc52beb1.js 2>/dev/null || true

# Verwijder ALLE layout chunks om zeker te zijn
echo "🗑️  Removing ALL old layout chunks..."
rm -rf .next/static/chunks/app/layout-*.js 2>/dev/null || true

# Verwijder node_modules voor schone installatie
echo "🗑️  Removing node_modules for clean install..."
rm -rf node_modules
rm -f package-lock.json

# Pull laatste code
echo "📥 Pulling latest code from Git..."
git fetch origin
git reset --hard origin/main
git pull origin main

# Installeer dependencies opnieuw
echo "📦 Installing dependencies fresh..."
npm install --legacy-peer-deps

# Build met extra geheugen
echo "🔨 Building Next.js app (this may take a while)..."
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Check build resultaat
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    pm2 start ecosystem.config.js 2>/dev/null || pm2 restart zelfontspanners 2>/dev/null || true
    exit 1
fi

echo "✅ Build successful!"
echo ""

# VERIFIEER dat de oude layout file NIET in de nieuwe build zit
echo "🔍 Verifying old layout file (94f0854bcc52beb1) is NOT in new build..."
if find .next -name "*94f0854bcc52beb1*" 2>/dev/null | grep -q .; then
    echo "❌ ERROR: Old layout file (94f0854bcc52beb1) STILL IN BUILD!"
    echo "Attempting to remove again..."
    find .next -name "*94f0854bcc52beb1*" -type f -exec rm -f {} \; 2>/dev/null || true
    echo "Please check manually and rebuild if needed."
    exit 1
else
    echo "✅ Old layout file (94f0854bcc52beb1) NOT found in new build (good!)"
fi

echo ""
echo "Current layout files in build:"
ls -lh .next/static/chunks/app/layout*.js 2>/dev/null || echo "No layout files found (this is OK)"

# Check of er nog oude console.log statements in de nieuwe build zitten
echo ""
echo "🔍 Checking for old console.log statements in new build..."
if grep -r "Safari fallback" .next/static/chunks/app/ 2>/dev/null | grep -q .; then
    echo "⚠️  WARNING: 'Safari fallback' found in new build!"
    grep -r "Safari fallback" .next/static/chunks/app/ 2>/dev/null | head -5
else
    echo "✅ 'Safari fallback' NOT found in new build (good!)"
fi

# Herstart PM2
echo ""
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

echo ""
echo "=========================================="
echo "VERIFICATIE:"
echo "=========================================="
echo "1. Check de website in een incognito venster"
echo "2. Open Developer Tools (F12)"
echo "3. Check Network tab - je zou NIET layout-94f0854bcc52beb1.js moeten zien"
echo "4. Check Console - je zou NIET '[Navigation] Safari fallback' moeten zien"
echo ""

