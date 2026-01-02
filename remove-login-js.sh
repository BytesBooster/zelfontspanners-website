#!/bin/bash
# Script om login.js te verwijderen van de server

SERVER_DIR="/var/www/vhosts/zelfontspanners.nl/nodejs"
LOGIN_JS="$SERVER_DIR/login.js"

echo "Verwijderen van login.js van de server..."

if [ -f "$LOGIN_JS" ]; then
    echo "❌ login.js gevonden op: $LOGIN_JS"
    echo "Verwijderen..."
    rm -f "$LOGIN_JS"
    
    if [ ! -f "$LOGIN_JS" ]; then
        echo "✅ login.js succesvol verwijderd!"
    else
        echo "❌ Fout: login.js kon niet worden verwijderd"
        exit 1
    fi
else
    echo "ℹ️  login.js bestaat niet (al verwijderd?)"
fi

echo ""
echo "Herstart PM2 om wijzigingen door te voeren:"
echo "pm2 restart zelfontspanners"

