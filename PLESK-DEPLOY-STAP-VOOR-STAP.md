# 🚀 Plesk Deployment - Stap voor Stap

## ✅ Je zit nu in Plesk!

Volg deze stappen om de De Zelfontspanners website te deployen.

---

## 📋 Stap 1: Domain Toevoegen

### In Plesk:

1. **Klik op "Websites & Domains"** (links in het menu)
2. **Klik op "Add Domain"** (groene knop rechtsboven)
3. **Vul in:**
   - **Domain name**: `zelfontspanners.nl` (of je domein)
   - **Hosting type**: **"No hosting"** ✅ (belangrijk voor Next.js met PM2)
   - **Document root**: `/var/www/vhosts/zelfontspanners.nl/nodejs`
4. **Klik op "OK"**

---

## 📋 Stap 2: SSL Certificaat Installeren

### In Plesk:

1. **Ga naar:** Websites & Domains → **zelfontspanners.nl**
2. **Klik op:** "SSL/TLS Certificates"
3. **Klik op:** "Install a free basic certificate provided by Let's Encrypt"
4. **Selecteer:**
   - ✅ Secure the domain name
   - ✅ Include a "www" subdomain
5. **Klik op:** "Get it free"

---

## 📋 Stap 3: Project Folder Aanmaken (Via SSH/Terminal)

Je moet nu via SSH of terminal op de server:

```bash
# Maak project folder aan
sudo mkdir -p /var/www/vhosts/zelfontspanners.nl/nodejs

# Stel juiste permissies in
sudo chown -R psaadm:psaserv /var/www/vhosts/zelfontspanners.nl
sudo chmod -R 755 /var/www/vhosts/zelfontspanners.nl
```

**Of via Plesk File Manager:**
1. Ga naar **Files** → **zelfontspanners.nl**
2. Maak map aan: `nodejs`
3. Stel permissies in (via "Change Permissions")

---

## 📋 Stap 4: Git Repository Clonen

### Via SSH/Terminal:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Clone repository
sudo git clone https://github.com/BytesBooster/zelfontspanners-website.git .

# Stel permissies in
sudo chown -R psaadm:psaserv /var/www/vhosts/zelfontspanners.nl/nodejs
```

### Of Via Plesk Git (Aanbevolen):

1. **In Plesk:** Ga naar **Websites & Domains** → **zelfontspanners.nl**
2. **Klik op:** "Git"
3. **Klik op:** "Enable Git"
4. **Vul in:**
   - **Repository URL**: `https://github.com/BytesBooster/zelfontspanners-website.git`
   - **Branch**: `main`
   - **Deployment path**: `/var/www/vhosts/zelfontspanners.nl/nodejs`
   - **Update repository by**: `Pulling changes`
5. **Scroll naar:** "Additional deployment actions"
6. **Voeg toe:**
   ```bash
   cd /var/www/vhosts/zelfontspanners.nl/nodejs
   chmod +x deploy.sh 2>/dev/null || true
   /var/www/vhosts/zelfontspanners.nl/nodejs/deploy.sh
   ```
7. **Klik op:** "OK"
8. **Klik op:** "Pull now" voor eerste pull

---

## 📋 Stap 5: Dependencies Installeren & Build

### Via SSH/Terminal:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Installeer dependencies
sudo npm install

# Bouw applicatie
sudo npm run build

# Kopieer public folder en .next/server naar standalone
sudo cp -r public .next/standalone/ 2>/dev/null || true
sudo mkdir -p .next/standalone/.next
sudo cp -r .next/server .next/standalone/.next/ 2>/dev/null || true
sudo cp -r .next/static .next/standalone/.next/ 2>/dev/null || true

# Stel permissies in
sudo chown -R psaadm:psaserv /var/www/vhosts/zelfontspanners.nl/nodejs
```

---

## 📋 Stap 6: PM2 Starten

### Via SSH/Terminal:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Start PM2
sudo pm2 start ecosystem.config.js

# Check status
sudo pm2 status
sudo pm2 logs zelfontspanners --lines 30
```

---

## 📋 Stap 7: Nginx Configuratie in Plesk

### In Plesk:

1. **Ga naar:** Websites & Domains → **zelfontspanners.nl**
2. **Klik op:** "Apache & nginx Settings"
3. **Scroll naar:** "Additional nginx directives"
4. **Voeg toe:**

```nginx
# Proxy naar Next.js app
location ~ ^/(?!mailconfig|autodiscover|plesk-stat|awstats-icon|webstat|webstat-ssl|ftpstat|anon_ftpstat|internal-nginx-static-location|_next) {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Origin $http_origin;
    proxy_set_header Referer $http_referer;
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}

# Serve Next.js static files
location ^~ /_next/static {
    alias /var/www/vhosts/zelfontspanners.nl/nodejs/.next/static;
    expires 365d;
    add_header Cache-Control "public, immutable";
    access_log off;
}
```

5. **Klik op:** "OK"

---

## ✅ Checklist

- [ ] Domain toegevoegd in Plesk (`zelfontspanners.nl`)
- [ ] SSL certificaat geïnstalleerd
- [ ] Project folder aangemaakt (`/var/www/vhosts/zelfontspanners.nl/nodejs`)
- [ ] Git repository gekloond (via Plesk Git of SSH)
- [ ] Dependencies geïnstalleerd (`npm install`)
- [ ] Build uitgevoerd (`npm run build`)
- [ ] Public folder gekopieerd naar standalone
- [ ] `.next/server` gekopieerd naar standalone
- [ ] `.next/static` gekopieerd naar standalone
- [ ] PM2 gestart (`pm2 start ecosystem.config.js`)
- [ ] Nginx configuratie toegevoegd in Plesk
- [ ] Website getest in browser

---

## 🎯 Volgende Stap

**Begin met Stap 1: Domain Toevoegen in Plesk!**

Klik op "Websites & Domains" → "Add Domain" en vul de gegevens in.

---

**Laat weten als je klaar bent met een stap! 🚀**
