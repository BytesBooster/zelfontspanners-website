# Deploy Script Probleem Oplossen

## Probleem
Het `deploy.sh` script werkt niet meer of bestaat niet op de server.

## Oplossing

### Stap 1: Lokaal controleren
1. Controleer of `deploy.sh` bestaat in de root van je project
2. Voer lokaal uit: `npm run build` om te testen of de build werkt

### Stap 2: Script naar server pushen
Voer uit op Windows:
```batch
fix-deploy-script.bat
```

Of handmatig:
```batch
git add deploy.sh
git commit -m "Fix deploy.sh script"
git push
```

### Stap 3: Op de server controleren
SSH in op de server:
```bash
ssh root@185.255.131.147
cd /var/www/vhosts/zelfontspanners.nl/nodejs
```

Voer de checker uit:
```bash
git pull
chmod +x deploy.sh
chmod +x check-deploy-script.sh
bash check-deploy-script.sh
```

### Stap 4: Deploy script uitvoeren
Als alle checks slagen:
```bash
./deploy.sh
```

## Veelvoorkomende Problemen

### Probleem: npm niet gevonden
**Oplossing:**
```bash
# Zoek npm locatie
which npm
# Of
find /usr -name npm 2>/dev/null
find /opt -name npm 2>/dev/null

# Als npm in /opt/plesk/node/18/bin/npm staat:
# Pas deploy.sh aan om het juiste pad te gebruiken
```

### Probleem: deploy.sh heeft geen execute permissies
**Oplossing:**
```bash
chmod +x deploy.sh
chown psaadm:psaserv deploy.sh
```

### Probleem: package.json bestaat niet
**Oplossing:**
```bash
# Controleer of je in de juiste directory bent
pwd
# Moet zijn: /var/www/vhosts/zelfontspanners.nl/nodejs

# Pull laatste wijzigingen
git pull
```

### Probleem: Build script niet in package.json
**Oplossing:**
Controleer of `package.json` dit bevat:
```json
{
  "scripts": {
    "build": "next build"
  }
}
```

## Verbeteringen in deploy.sh

Het nieuwe `deploy.sh` script heeft:
- ✅ Automatische detectie van npm locatie
- ✅ Betere foutafhandeling
- ✅ Controle of package.json bestaat
- ✅ Controle of build script bestaat
- ✅ Duidelijke error messages

## Test Lokaal

Voer uit om te testen of de build werkt:
```batch
check-build-errors.bat
```

Of handmatig:
```bash
npm install
npm run build
```

## Hulp Nodig?

Als het probleem blijft bestaan:
1. Check de PM2 logs: `pm2 logs zelfontspanners`
2. Check de build output op de server
3. Controleer of Node.js correct geïnstalleerd is: `node --version`
4. Controleer of npm correct geïnstalleerd is: `npm --version`

