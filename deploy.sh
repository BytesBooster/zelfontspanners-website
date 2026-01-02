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

# Remove old files that might contain modals - AGGRESSIVE
echo "🗑️  Removing ALL old HTML/JS files that might contain modals..."
rm -f *.html
rm -f login.html portfolio-manage.html index.html portfolio.html
rm -f leden.html contact.html agenda.html over-ons.html
rm -f sponsors.html foto-van-de-maand.html
rm -f add-2026-excursies.html fix-2025-to-2026.html
rm -f test-mock-data.html remove-test-event.html
rm -f auth.js login.js portfolio-manage.js portfolio-manage-drag.js
rm -f components.js script.js portfolio.js agenda.js
rm -f contact.js foto-van-de-maand.js leden.js over-ons.js
rm -f add-albert-photos-to-portfolio.js download-albert-photos.js
rm -f download-all-portfolios.js create-portfolio-folders.js
rm -f load-mock-data.js clear-mock-data.js remove-alfred-account.js
rm -f reset-passwords.js
echo "✅ Alle oude bestanden verwijderd"

# Stop PM2 temporarily
echo "⏸️  Stopping PM2..."
pm2 stop zelfontspanners 2>/dev/null || true

# Remove old build to force fresh build - AGGRESSIVE
echo "🗑️  Removing old .next build completely..."
rm -rf .next
# Also remove specific old layout chunks that might contain modals (before .next exists)
echo "🗑️  Removing any remaining old layout chunks..."
find . -name "*layout-94f0854bcc52beb1*" -type f -delete 2>/dev/null || true
find . -name "*94f0854bcc52beb1*" -type f -delete 2>/dev/null || true

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

# Load environment variables BEFORE build (required for NEXT_PUBLIC_* vars)
echo "📋 Loading environment variables..."
if [ -f .env ]; then
    echo "✅ .env file found, loading variables..."
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "⚠️  WARNING: .env file NOT found!"
    echo "Creating .env file with default values..."
    cat > .env << 'EOF'
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
CLOUDINARY_CLOUD_NAME=dp9lcxbfu
CLOUDINARY_API_KEY=877964424671325
CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0
EOF
    export $(cat .env | grep -v '^#' | xargs)
fi

# Verify critical env vars are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "❌ ERROR: Critical environment variables missing!"
    echo "NEXT_PUBLIC_SUPABASE_URL: ${NEXT_PUBLIC_SUPABASE_URL:-NOT SET}"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY: ${NEXT_PUBLIC_SUPABASE_ANON_KEY:-NOT SET}"
    exit 1
fi

# Build with extra memory AND environment variables
echo "🔨 Building Next.js app (with env vars)..."
export NODE_OPTIONS="--max-old-space-size=4096"
export BUILD_VERSION=$(date +%s)  # Unix timestamp for unique build version
BUILD_OUTPUT=$($NPM_CMD run build 2>&1)
BUILD_EXIT=$?

# Verify PasswordResetModal is NOT in the new build
if [ $BUILD_EXIT -eq 0 ]; then
  echo "🔍 Verifying PasswordResetModal is NOT in build..."
  if grep -r "PasswordResetModal" .next 2>/dev/null | head -1; then
    echo "⚠️  WARNING: PasswordResetModal STILL IN BUILD! Removing..."
    find .next -type f -name "*.js" -exec grep -l "PasswordResetModal" {} \; 2>/dev/null | xargs rm -f 2>/dev/null || true
    echo "⚠️  Oude modal-bestanden verwijderd, maar rebuild nodig!"
  else
    echo "✅ PasswordResetModal NOT in build (goed!)"
  fi
fi

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

# CRITICAL: Copy static files to standalone build (Next.js doesn't do this automatically)
echo "📁 Copying static files to standalone build..."
if [ -d ".next/static" ]; then
    echo "   Source: .next/static/"
    echo "   Target: .next/standalone/.next/static/"
    
    # Remove old static files first
    rm -rf .next/standalone/.next/static 2>/dev/null || true
    
    # Create directory structure
    mkdir -p .next/standalone/.next/static
    
    # Copy with verbose output
    echo "   Copying files..."
    cp -rv .next/static/* .next/standalone/.next/static/ 2>&1 | head -20 || {
        echo "⚠️  Warning: Some files failed to copy, but continuing..."
    }
    
    # Verify copy was successful
    if [ -d ".next/standalone/.next/static/chunks" ]; then
        echo "✅ Static files copied successfully"
        echo "   Found chunks directory"
        ls -la .next/standalone/.next/static/chunks/ | head -5
    else
        echo "❌ ERROR: Static files not copied correctly!"
        echo "   Checking source..."
        ls -la .next/static/ | head -5
        exit 1
    fi
else
    echo "❌ ERROR: .next/static directory not found!"
    echo "   Build may have failed. Check build output above."
    exit 1
fi

# Copy public folder to standalone
echo "📁 Copying public folder to standalone..."
if [ -d "public" ]; then
    mkdir -p .next/standalone/public
    cp -rv public/* .next/standalone/public/ 2>&1 | head -10 || {
        echo "⚠️  Warning: Some public files failed to copy"
    }
    echo "✅ Public files copied to standalone"
else
    echo "⚠️  Warning: public directory not found"
fi

# Verify critical files exist
echo ""
echo "🔍 Verifying standalone build structure..."
if [ ! -d ".next/standalone/.next/static" ]; then
    echo "❌ ERROR: Static files directory not found in standalone build!"
    echo "   Build may be incomplete. Check build logs above."
    exit 1
fi

if [ ! -f ".next/standalone/server.js" ]; then
    echo "❌ ERROR: server.js not found in standalone build!"
    exit 1
fi

echo "✅ Standalone build structure verified"
echo "   - server.js: ✅"
echo "   - .next/static/: ✅"
echo "   - public/: ✅"

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
