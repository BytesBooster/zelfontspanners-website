# 🚀 Deployment via Server Commands

## ✅ Pre-Deployment Checklist

- [x] Alle wijzigingen zijn gecommit en gepusht naar GitHub
- [x] Je hebt SSH toegang tot de server
- [x] Node.js 18+ is geïnstalleerd op de server
- [x] PM2 is geïnstalleerd op de server
- [x] Nginx/Apache is geconfigureerd als reverse proxy

---

## 📋 Stap-voor-Stap Deployment

### Stap 1: Push naar GitHub (als nog niet gedaan)

```bash
# Lokaal op je computer
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Stap 2: SSH naar Server

```bash
ssh root@jouw-server-ip
# Of
ssh gebruiker@jouw-server-ip
```

### Stap 3: Ga naar Project Directory

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
# Of waar je project ook staat:
cd /path/to/zelfontspanners.nl
```

### Stap 4: Pull Laatste Wijzigingen

```bash
git pull origin main
```

### Stap 5: Zet Environment Variables

```bash
# Check of .env.local bestaat
ls -la .env.local

# Als het niet bestaat, maak het aan:
nano .env.local
```

Voeg toe:
```env
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
```

Sla op: `Ctrl+X`, dan `Y`, dan `Enter`

### Stap 6: Run Deployment Script

```bash
# Maak script uitvoerbaar
chmod +x deploy.sh

# Run deployment script
./deploy.sh
```

Het script doet automatisch:
- ✅ Pull laatste wijzigingen
- ✅ Installeer dependencies (`npm install --legacy-peer-deps`)
- ✅ Build de applicatie (`npm run build`)
- ✅ Herstart PM2

### Stap 7: Verifieer Deployment

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs zelfontspanners --lines 30

# Check of website draait
curl http://localhost:3001
```

### Stap 8: Test Website

Open in browser:
- https://zelfontspanners.nl
- Test login
- Test portfolio bekijken
- Test portfolio upload

---

## 🔄 Toekomstige Updates Deployen

Voor toekomstige updates:

```bash
# SSH naar server
ssh root@jouw-server-ip

# Ga naar project directory
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Pull updates
git pull origin main

# Run deployment script
./deploy.sh
```

Dat is alles! Het script doet de rest automatisch.

---

## 🐛 Troubleshooting

### Build faalt?

```bash
# Check Node.js versie (moet 18+ zijn)
node --version

# Check memory
free -h

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### PM2 start niet?

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs zelfontspanners --lines 50

# Herstart PM2
pm2 restart zelfontspanners

# Of start opnieuw
pm2 delete zelfontspanners
pm2 start ecosystem.config.js
```

### Website laadt niet?

```bash
# Check of PM2 draait
pm2 status

# Check poort
ss -tlnp | grep 3001
# Of
netstat -tlnp | grep 3001

# Check Nginx/Apache config
# Nginx: /etc/nginx/sites-available/zelfontspanners.nl
# Apache: /etc/apache2/sites-available/zelfontspanners.nl.conf
```

### Database errors?

```bash
# Controleer .env.local
cat .env.local

# Check of Supabase credentials correct zijn
# Test connectie (als je curl hebt):
curl https://emhidjqtxjnnrlgbbmyi.supabase.co/rest/v1/
```

---

## 📝 Nginx Configuratie (Als je Nginx gebruikt)

Als je Nginx als reverse proxy gebruikt, zorg dat deze configuratie bestaat:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name zelfontspanners.nl www.zelfontspanners.nl;

    # Redirect naar HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name zelfontspanners.nl www.zelfontspanners.nl;

    # SSL certificaat (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/zelfontspanners.nl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/zelfontspanners.nl/privkey.pem;

    # Proxy naar Next.js app
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Serve Next.js static files
    location ^~ /_next/static {
        alias /var/www/vhosts/zelfontspanners.nl/nodejs/.next/static;
        expires 365d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Serve public files
    location /images {
        alias /var/www/vhosts/zelfontspanners.nl/nodejs/public/images;
        expires 30d;
        access_log off;
    }
}
```

Na configuratie:
```bash
# Test Nginx config
sudo nginx -t

# Herlaad Nginx
sudo systemctl reload nginx
```

---

## 📝 Apache Configuratie (Als je Apache gebruikt)

Als je Apache als reverse proxy gebruikt:

```apache
<VirtualHost *:80>
    ServerName zelfontspanners.nl
    ServerAlias www.zelfontspanners.nl
    
    # Redirect naar HTTPS
    Redirect permanent / https://zelfontspanners.nl/
</VirtualHost>

<VirtualHost *:443>
    ServerName zelfontspanners.nl
    ServerAlias www.zelfontspanners.nl

    # SSL certificaat
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/zelfontspanners.nl/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/zelfontspanners.nl/privkey.pem

    # Proxy naar Next.js app
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3001/
    ProxyPassReverse / http://127.0.0.1:3001/

    # Headers
    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Forwarded-Port "443"
</VirtualHost>
```

Na configuratie:
```bash
# Test Apache config
sudo apache2ctl configtest

# Herlaad Apache
sudo systemctl reload apache2
```

---

## ✅ Deployment Checklist

- [ ] Code gepusht naar GitHub
- [ ] SSH verbinding met server
- [ ] Git pull uitgevoerd
- [ ] `.env.local` bestaat op server met juiste credentials
- [ ] `deploy.sh` uitgevoerd zonder errors
- [ ] PM2 draait (`pm2 status` toont `online`)
- [ ] Website laadt in browser
- [ ] Login werkt
- [ ] Portfolio's worden geladen
- [ ] Foto upload werkt

---

## 🚀 Eerste Keer Setup (Als project nog niet bestaat)

Als je het project voor de eerste keer op de server zet:

```bash
# 1. Maak project directory aan
sudo mkdir -p /var/www/vhosts/zelfontspanners.nl/nodejs
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# 2. Clone repository
sudo git clone https://github.com/BytesBooster/zelfontspanners-website.git .

# 3. Stel permissies in
sudo chown -R $USER:$USER /var/www/vhosts/zelfontspanners.nl/nodejs

# 4. Maak .env.local aan
nano .env.local
# Voeg Supabase credentials toe

# 5. Installeer dependencies
npm install --legacy-peer-deps

# 6. Build applicatie
npm run build

# 7. Start PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Volg instructies voor auto-start bij reboot

# 8. Configureer Nginx/Apache (zie boven)
```

---

## 📞 Hulp Nodig?

Als er problemen zijn:
1. Check PM2 logs: `pm2 logs zelfontspanners`
2. Check build output: kijk naar output van `./deploy.sh`
3. Check Supabase dashboard voor database errors
4. Check webserver logs: `sudo tail -f /var/log/nginx/error.log` (Nginx) of `sudo tail -f /var/log/apache2/error.log` (Apache)

