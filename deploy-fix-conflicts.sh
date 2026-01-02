#!/bin/bash
# Fix Git conflicts script
# Dit script lost automatisch merge conflicts op door lokale wijzigingen te overschrijven

export PATH="/usr/bin:/usr/local/bin:/bin:$PATH"
cd /var/www/vhosts/zelfontspanners.nl/nodejs

echo "=========================================="
echo "Git Conflicts Oplossen"
echo "=========================================="
echo

# Stash lokale wijzigingen
echo "[1/4] Stashing lokale wijzigingen..."
git stash push -m "Auto-stash before deploy - $(date)" 2>/dev/null
echo "OK"
echo

# Fetch laatste wijzigingen
echo "[2/4] Ophalen laatste wijzigingen van Git..."
git fetch origin
echo "OK"
echo

# Reset naar remote state (overschrijf lokale wijzigingen)
echo "[3/4] Resetten naar remote state..."
git reset --hard origin/main 2>/dev/null || git reset --hard origin/master 2>/dev/null
echo "OK"
echo

# Pull laatste wijzigingen
echo "[4/4] Pullen laatste wijzigingen..."
git pull origin main 2>/dev/null || git pull origin master 2>/dev/null
echo "OK"
echo

echo "=========================================="
echo "Git conflicts opgelost!"
echo "Je kunt nu ./deploy.sh uitvoeren"
echo "=========================================="


