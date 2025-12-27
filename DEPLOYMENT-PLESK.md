# 🚀 Deployment Guide - Plesk Server

## 📋 Pre-Deployment Checklist

- [x] Build werkt lokaal (`npm run build`)
- [x] Static bestanden worden gekopieerd naar standalone
- [ ] Environment variables zijn klaar
- [ ] Database is geconfigureerd (Supabase)
- [ ] Cloudinary account is actief
- [ ] Domain naam is geregistreerd

---

## 🔧 Stap 1: Lokale Build Voorbereiden

### 1.1 Build maken
```bash
npm run build
```

Dit maakt:
- `.next/standalone/` - Standalone server
- `.next/static/` - Static assets (worden automatisch gekopieerd)

### 1.2 Controleer build output
```bash
# Controleer dat deze bestanden bestaan:
ls .next/standalone/server.js
ls .next/standalone/.next/static/chunks/
ls .next/standalone/.next/static/css/
```

---

## 📦 Stap 2: Bestanden Voorbereiden voor Upload

### 2.1 Maak deployment package

**Optie A: Via FTP/SFTP (aanbevolen)**
- Upload de volgende mappen/bestanden naar je server:
  ```
  .next/standalone/          → /var/www/vhosts/jouw-domein.nl/httpdocs/
  public/                     → /var/www/vhosts/jouw-domein.nl/httpdocs/public/
  package.json               → /var/www/vhosts/jouw-domein.nl/httpdocs/package.json
  ```

**Optie B: Via Git (aanbevolen voor updates)**
- Push code naar Git repository
- Pull op server
- Run `npm install --production`
- Run `npm run build`

### 2.2 Bestanden die NIET geüpload hoeven te worden:
- `node_modules/` (installeer op server)
- `.next/` (behalve standalone)
- `.env.local` (gebruik Plesk environment variables)
- `scripts/` (niet nodig op productie)
- `*.md` bestanden

---

## 🖥️ Stap 3: Plesk Server Configuratie

### 3.1 Node.js App Aanmaken in Plesk

1. **Login op Plesk**
   - Ga naar je Plesk dashboard
   - Selecteer je domain

2. **Node.js App Aanmaken**
   - Ga naar **"Node.js"** in het menu
   - Klik op **"Add Node.js App"**
   - Vul in:
     - **App name**: `zelfontspanners-website`
     - **App root**: `/var/www/vhosts/jouw-domein.nl/httpdocs`
     - **App startup file**: `server.js`
     - **Node.js version**: Kies de nieuwste LTS versie (18.x of 20.x)
     - **Application mode**: `production`
     - **Application URL**: `https://jouw-domein.nl` (of laat leeg voor root)

3. **Document Root Instellen**
   - Ga naar **"Hosting Settings"**
   - **Document root**: `/var/www/vhosts/jouw-domein.nl/httpdocs`
   - **Additional directives**: (laat leeg voor nu)

### 3.2 Environment Variables Instellen

1. **In Plesk Node.js App:**
   - Ga naar je Node.js app
   - Klik op **"Environment Variables"** of **"App Settings"**
   - Voeg de volgende variabelen toe:

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
   - Vervang de Supabase key met je eigen key (als je die hebt aangepast)
   - Zet deze variabelen NIET in een `.env` bestand op de server
   - Gebruik Plesk's environment variables feature

### 3.3 Server.js Pad Aanpassen

**Als Plesk een andere structuur verwacht:**

1. **Check waar Plesk de app verwacht:**
   - Kijk in Plesk Node.js settings naar "App root"
   - Dit is meestal: `/var/www/vhosts/jouw-domein.nl/httpdocs`

2. **Pas server.js aan (indien nodig):**
   - Als je bestanden in `standalone/` staan, moet je mogelijk de paths aanpassen
   - Of verplaats alle bestanden uit `standalone/` naar de root

---

## 🔒 Stap 4: SSL Certificaat Toevoegen

### 4.1 Let's Encrypt SSL (Gratis)

1. **In Plesk:**
   - Ga naar **"SSL/TLS Certificates"**
   - Klik op **"Get a free certificate from Let's Encrypt"**
   - Vul in:
     - **Domain name**: `jouw-domein.nl`
     - **Email**: jouw-email@example.com
     - **Include www domain**: ✅ (aanbevolen)
   - Klik op **"Install"**

2. **SSL Instellen:**
   - Ga naar **"Hosting Settings"**
   - **SSL/TLS support**: ✅ Aan
   - **SSL/TLS certificate**: Selecteer je Let's Encrypt certificaat
   - **Redirect from HTTP to HTTPS**: ✅ Aan (aanbevolen)

### 4.2 Alternatief: Betaald SSL Certificaat

Als je een betaald certificaat hebt:
1. Upload het certificaat via **"SSL/TLS Certificates"** → **"Add SSL/TLS Certificate"**
2. Upload:
   - Certificate file (.crt)
   - Private key file (.key)
   - CA bundle (indien nodig)

---

## 🌐 Stap 5: DNS Instellingen

### 5.1 DNS Records Instellen

**Bij je Domain Registrar (bijv. TransIP, Mijndomein.nl, etc.):**

1. **A Record (IPv4):**
   ```
   Type: A
   Name: @ (of leeg voor root domain)
   Value: [Je server IP adres]
   TTL: 3600 (of automatisch)
   ```

2. **A Record voor www:**
   ```
   Type: A
   Name: www
   Value: [Je server IP adres]
   TTL: 3600
   ```

3. **AAAA Record (IPv6) - Optioneel:**
   ```
   Type: AAAA
   Name: @
   Value: [Je server IPv6 adres]
   TTL: 3600
   ```

### 5.2 DNS Propagation Checken

Na het instellen van DNS:
- Wacht 5-30 minuten voor propagation
- Check met: https://www.whatsmydns.net/
- Of via command line: `nslookup jouw-domein.nl`

---

## ⚙️ Stap 6: Node.js App Starten

### 6.1 Via Plesk Interface

1. **In Plesk Node.js App:**
   - Ga naar je Node.js app
   - Klik op **"Restart App"** of **"Start App"**
   - Check de logs voor errors

### 6.2 Via SSH (Alternatief)

Als je SSH toegang hebt:

```bash
# Navigeer naar app directory
cd /var/www/vhosts/jouw-domein.nl/httpdocs

# Installeer dependencies (alleen production)
npm install --production

# Start de app (als Plesk dit niet automatisch doet)
# Plesk gebruikt meestal zijn eigen process manager
# Maar je kunt ook PM2 gebruiken:

# Installeer PM2 globaal
npm install -g pm2

# Start app met PM2
pm2 start .next/standalone/server.js --name zelfontspanners

# Zet PM2 op om automatisch te starten bij reboot
pm2 startup
pm2 save
```

---

## 🔍 Stap 7: Testing & Troubleshooting

### 7.1 Test Checklist

- [ ] Website laadt op `https://jouw-domein.nl`
- [ ] SSL certificaat werkt (groen slotje in browser)
- [ ] Alle pagina's laden correct
- [ ] Foto's worden geladen (Cloudinary)
- [ ] Database queries werken (Supabase)
- [ ] Login werkt
- [ ] Foto upload werkt
- [ ] Geen console errors

### 7.2 Logs Bekijken

**In Plesk:**
- Ga naar **"Node.js"** → Je app → **"Logs"**
- Check voor errors

**Via SSH:**
```bash
# Plesk logs
tail -f /var/www/vhosts/jouw-domein.nl/logs/error_log

# PM2 logs (als je PM2 gebruikt)
pm2 logs zelfontspanners
```

### 7.3 Veelvoorkomende Problemen

**Probleem: 404 errors voor static bestanden**
- **Oplossing**: Zorg dat `.next/standalone/.next/static/` bestaat en is geüpload
- Check: `ls -la .next/standalone/.next/static/`

**Probleem: Environment variables werken niet**
- **Oplossing**: Zet ze in Plesk Node.js environment variables, niet in `.env` bestand
- Herstart de app na het toevoegen van variabelen

**Probleem: Port conflict**
- **Oplossing**: Plesk gebruikt meestal poort 3000, maar check in Node.js app settings
- Zorg dat `PORT` environment variable correct is ingesteld

**Probleem: Database connectie faalt**
- **Oplossing**: Check Supabase URL en key in environment variables
- Check Supabase dashboard voor IP whitelist (indien nodig)

**Probleem: SSL werkt niet**
- **Oplossing**: 
  - Check dat certificaat is geïnstalleerd
  - Check dat "Redirect HTTP to HTTPS" is aangezet
  - Wacht 5-10 minuten na installatie

---

## 🔄 Stap 8: Updates Deployen

### 8.1 Update Proces

1. **Lokaal:**
   ```bash
   git pull origin main
   npm install
   npm run build
   ```

2. **Upload naar server:**
   - Via FTP/SFTP: Upload alleen gewijzigde bestanden
   - Via Git: `git pull` op server, dan `npm run build`

3. **Op server:**
   ```bash
   cd /var/www/vhosts/jouw-domein.nl/httpdocs
   npm install --production
   npm run build
   ```

4. **Herstart app:**
   - In Plesk: Klik op "Restart App"
   - Of via SSH: `pm2 restart zelfontspanners`

---

## 📊 Stap 9: Monitoring & Onderhoud

### 9.1 Monitoring Setup

**Plesk Monitoring:**
- Ga naar **"Statistics"** → **"Web Statistics"**
- Monitor traffic, errors, etc.

**PM2 Monitoring (als je PM2 gebruikt):**
```bash
pm2 monit
pm2 status
```

### 9.2 Backups

**Plesk Backups:**
- Ga naar **"Backup Manager"**
- Stel automatische backups in
- Backup: Database, bestanden, configuratie

**Database Backups:**
- Supabase heeft automatische backups
- Maar je kunt ook handmatig exporteren via Supabase dashboard

---

## ✅ Post-Deployment Checklist

- [ ] Website werkt op productie URL
- [ ] SSL certificaat is actief
- [ ] DNS is correct geconfigureerd
- [ ] Environment variables zijn ingesteld
- [ ] Database connectie werkt
- [ ] Foto upload werkt
- [ ] Login werkt
- [ ] Geen console errors
- [ ] Performance is goed
- [ ] Backups zijn ingesteld

---

## 🆘 Support & Hulp

**Als je problemen hebt:**

1. **Check logs** (zie Stap 7.2)
2. **Test lokaal** - Zorg dat alles lokaal werkt eerst
3. **Check Plesk documentatie** - https://docs.plesk.com/
4. **Supabase support** - https://supabase.com/docs/guides/platform/troubleshooting
5. **Cloudinary support** - https://support.cloudinary.com/

---

## 📝 Notities

- **Server IP**: [Vul hier je server IP in]
- **Domain**: [Vul hier je domain in]
- **Plesk versie**: [Vul hier je Plesk versie in]
- **Node.js versie**: [Vul hier Node.js versie in]
- **Deployment datum**: [Vul hier datum in]

---

**Succes met de deployment! 🚀**


