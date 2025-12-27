# 🚀 Stap-voor-Stap Deployment naar Plesk

## 📋 Overzicht

We gaan de website deployen naar je Plesk server via Git. Dit is de beste manier omdat:
- ✅ Makkelijk updates te maken
- ✅ Versie controle
- ✅ Automatische deployments mogelijk
- ✅ Makkelijker terug te draaien bij problemen

---

## STAP 1: Git Repository Voorbereiden

### 1.1 Check Git Status

```bash
git status
```

**Wat we verwachten:**
- Alle belangrijke bestanden zijn gecommit
- Geen belangrijke wijzigingen die nog gecommit moeten worden

### 1.2 Maak Git Repository (als nog niet gedaan)

Als je nog geen Git repository hebt:

```bash
git init
git add .
git commit -m "Initial commit - Ready for deployment"
```

### 1.3 Maak Remote Repository

**Optie A: GitHub (Aanbevolen)**
1. Ga naar https://github.com
2. Maak een nieuwe repository aan (bijv. `zelfontspanners-website`)
3. **BELANGRIJK**: Maak het **PRIVATE** (niet public!)
4. Kopieer de repository URL

**Optie B: GitLab**
1. Ga naar https://gitlab.com
2. Maak een nieuwe repository aan
3. Kopieer de repository URL

**Optie C: Bitbucket**
1. Ga naar https://bitbucket.org
2. Maak een nieuwe repository aan
3. Kopieer de repository URL

### 1.4 Voeg Remote Toe

```bash
git remote add origin [JE_REPOSITORY_URL]
git branch -M main
git push -u origin main
```

**Voorbeeld:**
```bash
git remote add origin https://github.com/jouw-username/zelfontspanners-website.git
git branch -M main
git push -u origin main
```

---

## STAP 2: Server Voorbereiden (Plesk)

### 2.1 SSH Toegang

Je hebt SSH toegang nodig. Check dit in Plesk:
1. Ga naar **"Tools & Settings"**
2. Klik op **"SSH Access"**
3. Zet **"SSH access"** aan
4. Noteer je SSH credentials

### 2.2 Connect via SSH

**Windows (PowerShell of Git Bash):**
```bash
ssh username@jouw-server-ip
```

**Of via Plesk Terminal:**
- Ga naar **"Tools & Settings"** → **"Terminal"**
- Klik op **"Open Terminal"**

### 2.3 Maak Directory Structuur

```bash
# Navigeer naar je domain directory
cd /var/www/vhosts/jouw-domein.nl

# Maak httpdocs directory (als deze niet bestaat)
mkdir -p httpdocs

# Ga naar httpdocs
cd httpdocs
```

---

## STAP 3: Git Clone op Server

### 3.1 Clone Repository

```bash
# Zorg dat je in /var/www/vhosts/jouw-domein.nl/httpdocs bent
cd /var/www/vhosts/jouw-domein.nl/httpdocs

# Clone je repository
git clone [JE_REPOSITORY_URL] .

# Of als de directory al bestaat:
git clone [JE_REPOSITORY_URL] temp
mv temp/* .
mv temp/.git .
rmdir temp
```

**Voorbeeld:**
```bash
git clone https://github.com/jouw-username/zelfontspanners-website.git .
```

### 3.2 Check Bestanden

```bash
ls -la
```

Je zou moeten zien:
- `package.json`
- `next.config.js`
- `app/` directory
- `public/` directory
- `.git/` directory

---

## STAP 4: Dependencies Installeren

### 4.1 Installeer Node.js (als nog niet geïnstalleerd)

**Check Node.js versie:**
```bash
node --version
```

**Als Node.js niet geïnstalleerd is:**
- In Plesk: Ga naar **"Node.js"** → **"Install Node.js"**
- Kies versie 18.x of 20.x LTS

### 4.2 Installeer NPM Dependencies

```bash
# Zorg dat je in de juiste directory bent
cd /var/www/vhosts/jouw-domein.nl/httpdocs

# Installeer dependencies (alleen production)
npm install --production
```

**Dit kan even duren...**

### 4.3 Check Installatie

```bash
npm list --depth=0
```

Je zou moeten zien:
- `next`
- `react`
- `react-dom`
- `@supabase/supabase-js`
- `cloudinary`

---

## STAP 5: Build Maken op Server

### 5.1 Build

```bash
# Zorg dat je in de juiste directory bent
cd /var/www/vhosts/jouw-domein.nl/httpdocs

# Maak build
npm run build
```

**Dit kan 2-5 minuten duren...**

### 5.2 Check Build Output

```bash
# Check dat standalone directory bestaat
ls -la .next/standalone/

# Check dat static bestanden zijn gekopieerd
ls -la .next/standalone/.next/static/
```

Je zou moeten zien:
- `server.js`
- `.next/` directory
- `node_modules/` directory
- `public/` directory

---

## STAP 6: Plesk Node.js App Configureren

### 6.1 Maak Node.js App

1. **Login op Plesk**
2. Ga naar je **domain**
3. Klik op **"Node.js"** in het menu
4. Klik op **"Add Node.js App"**

### 6.2 App Instellingen

Vul in:
- **App name**: `zelfontspanners-website`
- **App root**: `/var/www/vhosts/jouw-domein.nl/httpdocs`
- **App startup file**: `server.js`
- **Node.js version**: Kies 18.x of 20.x LTS
- **Application mode**: `production`
- **Application URL**: Laat leeg (voor root domain) of `https://jouw-domein.nl`

### 6.3 Environment Variables

Klik op **"Environment Variables"** en voeg toe:

```
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
CLOUDINARY_CLOUD_NAME=dp9lcxbfu
CLOUDINARY_API_KEY=877964424671325
CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0
```

**BELANGRIJK**: 
- Vervang de Supabase key als je die hebt aangepast
- Zet deze variabelen NIET in een `.env` bestand
- Gebruik Plesk's environment variables feature

### 6.4 Start App

Klik op **"Start App"** of **"Restart App"**

---

## STAP 7: SSL Certificaat Instellen

### 7.1 Let's Encrypt Certificaat

1. Ga naar **"SSL/TLS Certificates"** in Plesk
2. Klik op **"Get a free certificate from Let's Encrypt"**
3. Vul in:
   - **Domain name**: `jouw-domein.nl`
   - **Email**: jouw-email@example.com
   - **Include www domain**: ✅ (aanbevolen)
4. Klik op **"Install"**

### 7.2 SSL Activeren

1. Ga naar **"Hosting Settings"**
2. Zet **"SSL/TLS support"** aan
3. Selecteer je Let's Encrypt certificaat
4. Zet **"Redirect from HTTP to HTTPS"** aan
5. Klik op **"OK"**

---

## STAP 8: DNS Instellingen

### 8.1 DNS Records Instellen

Ga naar je **Domain Registrar** (bijv. TransIP, Mijndomein.nl, etc.)

**A Record voor root domain:**
```
Type: A
Name: @ (of leeg)
Value: [JE_SERVER_IP_ADRES]
TTL: 3600
```

**A Record voor www:**
```
Type: A
Name: www
Value: [JE_SERVER_IP_ADRES]
TTL: 3600
```

### 8.2 DNS Propagation Checken

Na het instellen, wacht 5-30 minuten en check:

**Online tool:**
- https://www.whatsmydns.net/
- Voer je domain in en check of het naar je server IP wijst

**Via command line:**
```bash
nslookup jouw-domein.nl
```

---

## STAP 9: Testen

### 9.1 Test Website

1. Open browser
2. Ga naar `https://jouw-domein.nl`
3. Check:
   - ✅ Website laadt
   - ✅ SSL certificaat werkt (groen slotje)
   - ✅ Geen console errors

### 9.2 Test Functionaliteit

- [ ] Homepage laadt
- [ ] Portfolio pagina's werken
- [ ] Login werkt
- [ ] Foto upload werkt
- [ ] Database connectie werkt

### 9.3 Check Logs

**In Plesk:**
- Ga naar **"Node.js"** → Je app → **"Logs"**
- Check voor errors

**Via SSH:**
```bash
tail -f /var/www/vhosts/jouw-domein.nl/logs/error_log
```

---

## STAP 10: Updates Deployen (Toekomst)

### 10.1 Lokaal Wijzigingen Maken

```bash
# Maak wijzigingen
# ...

# Commit en push
git add .
git commit -m "Beschrijving van wijzigingen"
git push origin main
```

### 10.2 Op Server Pullen

```bash
# SSH naar server
ssh username@jouw-server-ip

# Ga naar app directory
cd /var/www/vhosts/jouw-domein.nl/httpdocs

# Pull laatste wijzigingen
git pull origin main

# Installeer nieuwe dependencies (als nodig)
npm install --production

# Rebuild
npm run build

# Herstart app in Plesk (of via PM2)
```

**Of gebruik PM2 voor automatisch herstarten:**

```bash
# Installeer PM2
npm install -g pm2

# Start app met PM2
pm2 start .next/standalone/server.js --name zelfontspanners

# Zet PM2 op om automatisch te starten
pm2 startup
pm2 save

# Bij updates:
git pull origin main
npm install --production
npm run build
pm2 restart zelfontspanners
```

---

## 🆘 Troubleshooting

### Probleem: Git clone faalt

**Oplossing:**
- Check SSH keys of credentials
- Check of repository bestaat
- Check of je toegang hebt tot de repository

### Probleem: npm install faalt

**Oplossing:**
- Check Node.js versie: `node --version`
- Check npm versie: `npm --version`
- Probeer: `npm cache clean --force`
- Probeer: `npm install --production --legacy-peer-deps`

### Probleem: Build faalt

**Oplossing:**
- Check of alle dependencies zijn geïnstalleerd
- Check Node.js versie (moet 18.x of hoger zijn)
- Check logs voor specifieke errors
- Probeer: `rm -rf .next node_modules && npm install --production && npm run build`

### Probleem: App start niet

**Oplossing:**
- Check environment variables in Plesk
- Check logs in Plesk
- Check of port 3000 beschikbaar is
- Check of `server.js` bestaat: `ls -la .next/standalone/server.js`

### Probleem: SSL werkt niet

**Oplossing:**
- Wacht 5-10 minuten na installatie
- Check of certificaat is geïnstalleerd
- Check of "Redirect HTTP to HTTPS" is aan
- Check DNS instellingen

### Probleem: Website laadt niet

**Oplossing:**
- Check DNS propagation: https://www.whatsmydns.net/
- Check of app draait in Plesk
- Check logs voor errors
- Test met IP adres: `http://[SERVER_IP]:3000`

---

## ✅ Checklist

- [ ] Git repository aangemaakt en code gepusht
- [ ] SSH toegang tot server geregeld
- [ ] Repository gekloond op server
- [ ] Dependencies geïnstalleerd
- [ ] Build gemaakt op server
- [ ] Node.js app aangemaakt in Plesk
- [ ] Environment variables ingesteld
- [ ] SSL certificaat geïnstalleerd
- [ ] DNS records ingesteld
- [ ] Website werkt op HTTPS
- [ ] Alle functionaliteit getest

---

## 📝 Notities

- **Git Repository**: ________________
- **Server IP**: ________________
- **Domain**: ________________
- **SSH Username**: ________________
- **Plesk Versie**: ________________
- **Node.js Versie**: ________________
- **Deployment Datum**: ________________

---

**Succes met de deployment! 🚀**


