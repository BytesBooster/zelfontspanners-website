#!/bin/bash
export PATH="/usr/bin:/usr/local/bin:/bin:$PATH"
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Fix script permissies
chmod +x deploy.sh 2>/dev/null || true
chown psaadm:psaserv deploy.sh 2>/dev/null || true

# Stash lokale wijzigingen voordat we pullen (om merge conflicts te voorkomen)
echo "Stashing lokale wijzigingen..."
git stash push -m "Auto-stash before deploy - $(date)" 2>/dev/null || true

# Reset naar remote state als er nog steeds conflicten zijn
echo "Pulling laatste wijzigingen..."
git fetch origin
git reset --hard origin/main 2>/dev/null || git reset --hard origin/master 2>/dev/null || true

# Pull laatste wijzigingen
git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || true

/usr/bin/npm run build

# Kopieer public folder en .next/server naar standalone build
if [ -d ".next/standalone" ]; then
    if [ -d "public" ]; then
        cp -r public .next/standalone/
    fi
    
    if [ -d ".next/server" ]; then
        mkdir -p .next/standalone/.next
        cp -r .next/server .next/standalone/.next/
    fi
    
    if [ -d ".next/static" ]; then
        mkdir -p .next/standalone/.next
        cp -r .next/static .next/standalone/.next/
    fi
fi

/usr/bin/pm2 restart zelfontspanners
echo "Deployment completed successfully!"
