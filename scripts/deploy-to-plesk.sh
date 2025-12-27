#!/bin/bash
# Deployment script voor Plesk server
# Gebruik: ./scripts/deploy-to-plesk.sh [server-ip] [username] [domain-path]

set -e

# Colors voor output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuratie
SERVER_IP=${1:-""}
USERNAME=${2:-""}
DOMAIN_PATH=${3:-"/var/www/vhosts/jouw-domein.nl/httpdocs"}

if [ -z "$SERVER_IP" ] || [ -z "$USERNAME" ]; then
    echo -e "${RED}❌ Gebruik: ./scripts/deploy-to-plesk.sh [server-ip] [username] [domain-path]${NC}"
    echo -e "${YELLOW}Voorbeeld: ./scripts/deploy-to-plesk.sh 123.456.789.0 username /var/www/vhosts/domein.nl/httpdocs${NC}"
    exit 1
fi

echo -e "${GREEN}🚀 Start deployment naar Plesk server...${NC}"

# 1. Build maken
echo -e "${YELLOW}📦 Build maken...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build gefaald!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build succesvol!${NC}"

# 2. Bestanden uploaden via rsync
echo -e "${YELLOW}📤 Uploaden naar server...${NC}"

# Upload standalone build
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '*.md' \
    --exclude 'scripts' \
    .next/standalone/ \
    ${USERNAME}@${SERVER_IP}:${DOMAIN_PATH}/

# Upload public folder
rsync -avz --delete \
    public/ \
    ${USERNAME}@${SERVER_IP}:${DOMAIN_PATH}/public/

# Upload package.json
scp package.json ${USERNAME}@${SERVER_IP}:${DOMAIN_PATH}/

echo -e "${GREEN}✅ Bestanden geüpload!${NC}"

# 3. Dependencies installeren op server
echo -e "${YELLOW}📥 Dependencies installeren op server...${NC}"
ssh ${USERNAME}@${SERVER_IP} "cd ${DOMAIN_PATH} && npm install --production"

echo -e "${GREEN}✅ Dependencies geïnstalleerd!${NC}"

# 4. Herstart Node.js app (als PM2 wordt gebruikt)
echo -e "${YELLOW}🔄 App herstarten...${NC}"
echo -e "${YELLOW}⚠️  Let op: Je moet de app handmatig herstarten in Plesk of via PM2${NC}"
echo -e "${YELLOW}   PM2: ssh ${USERNAME}@${SERVER_IP} 'pm2 restart zelfontspanners'${NC}"

echo -e "${GREEN}✨ Deployment voltooid!${NC}"
echo -e "${GREEN}🌐 Test je website op: https://jouw-domein.nl${NC}"


