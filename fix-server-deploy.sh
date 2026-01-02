#!/bin/bash
# Script om deployment problemen op te lossen

cd /var/www/vhosts/zelfontspanners.nl/nodejs

echo "🔧 Fixing deployment issues..."

# 1. Stash lokale wijzigingen
echo "📦 Stashing lokale wijzigingen..."
git stash push -m "Auto-stash before deploy - $(date)"

# 2. Pull updates
echo "⬇️  Pulling updates..."
git pull origin main

# 3. Maak deploy.sh uitvoerbaar
echo "🔐 Making deploy.sh executable..."
chmod +x deploy.sh

# 4. Run deployment
echo "🚀 Running deployment..."
./deploy.sh


