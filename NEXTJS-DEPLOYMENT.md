# Next.js Deployment Handleiding - De Zelfontspanners

## ✅ Status: Website omgebouwd naar Next.js

De website is nu omgebouwd naar Next.js met PM2 ondersteuning.

---

## 📁 Project Structuur

```
foto club wijchen/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── agenda/            # Agenda pagina
│   ├── leden/             # Leden pagina
│   ├── contact/           # Contact pagina
│   └── ...                # Andere pagina's
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                   # Utilities
│   └── auth.ts            # Authentication helpers
├── public/                # Static files
│   └── images/            # Images (kopieer van root/images)
├── package.json
├── next.config.js
├── tsconfig.json
├── ecosystem.config.js    # PM2 configuratie
└── deploy.sh              # Deployment script
```

---

## 🚀 Installatie & Setup

### Stap 1: Dependencies Installeren

```bash
npm install
```

### Stap 2: Images Map Kopiëren

Kopieer de `images/` map naar `public/images/`:

```bash
# Windows PowerShell
Copy-Item -Path "images" -Destination "public\images" -Recurse

# Linux/Mac
cp -r images public/
```

### Stap 3: Development Server Starten

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

---

## 📦 Build & Production

### Build Maken

```bash
npm run build
```

Dit maakt een production build in `.next/` folder.

### Production Server Starten

```bash
npm start
```

---

## 🔧 PM2 Configuratie

### Ecosystem Configuratie

Het bestand `ecosystem.config.js` is al aangemaakt met de juiste configuratie:

- **App naam**: `zelfontspanners`
- **Poort**: `3001` (anders dan bytesbooster.nl op 3000)
- **Logs**: `/var/www/vhosts/zelfontspanners.nl/logs/`

### PM2 Commands

```bash
# Start app
pm2 start ecosystem.config.js

# Restart app
pm2 restart zelfontspanners

# Stop app
pm2 stop zelfontspanners

# Check status
pm2 status

# View logs
pm2 logs zelfontspanners
```

---

## 🌐 Deployment naar Plesk

### Stap 1: Domain Toevoegen in Plesk

1. Log in op Plesk
2. Klik op **"Add Domain"**
3. Vul in:
   - **Domain name**: `zelfontspanners.nl`
   - **Hosting type**: **"No hosting"** (we gebruiken Next.js met PM2)
   - **Document root**: `/var/www/vhosts/zelfontspanners.nl/nodejs`

### Stap 2: SSL Certificaat Installeren

1. Ga naar **SSL/TLS Certificates**
2. Klik op **"Install a free basic certificate provided by Let's Encrypt"**
3. Selecteer:
   - ✅ Secure the domain name
   - ✅ Include a "www" subdomain
4. Klik op **"Get it free"**

### Stap 3: Project Folder Aanmaken

```bash
ssh root@185.255.131.147

# Maak project folder aan
mkdir -p /var/www/vhosts/zelfontspanners.nl/nodejs

# Stel juiste permissies in
chown -R psaadm:psaserv /var/www/vhosts/zelfontspanners.nl
chmod -R 755 /var/www/vhosts/zelfontspanners.nl
```

### Stap 4: Git Repository Clonen

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Clone repository
git clone https://github.com/JouwGebruikersnaam/zelfontspanners-website.git .

# Of als je al een bestaand project hebt:
git init
git remote add origin https://github.com/JouwGebruikersnaam/zelfontspanners-website.git
git pull origin main
```

### Stap 5: Dependencies Installeren & Build

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Installeer dependencies
npm install

# Bouw applicatie
npm run build

# Kopieer public folder en .next/server naar standalone
cp -r public .next/standalone/ 2>/dev/null || true
mkdir -p .next/standalone/.next
cp -r .next/server .next/standalone/.next/ 2>/dev/null || true
cp -r .next/static .next/standalone/.next/ 2>/dev/null || true
```

### Stap 6: PM2 Starten

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Start PM2
pm2 start ecosystem.config.js

# Check status
pm2 status
pm2 logs zelfontspanners --lines 30
```

### Stap 7: Nginx Configuratie in Plesk

1. Ga naar **Websites & Domains** → **zelfontspanners.nl**
2. Klik op **"Apache & nginx Settings"**
3. Scroll naar **"Additional nginx directives"**
4. Voeg toe:

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

5. Klik op **OK**

### Stap 8: Plesk Git Configureren

1. Ga naar **Websites & Domains** → **zelfontspanners.nl**
2. Klik op **Git**
3. Klik op **Enable Git**
4. Vul in:
   - **Repository URL**: `https://github.com/JouwGebruikersnaam/zelfontspanners-website.git`
   - **Branch**: `main`
   - **Deployment path**: `/var/www/vhosts/zelfontspanners.nl/nodejs`
   - **Update repository by**: `Pulling changes`
5. Scroll naar **"Additional deployment actions"**
6. Voeg toe:
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
chmod +x deploy.sh 2>/dev/null || true
/var/www/vhosts/zelfontspanners.nl/nodejs/deploy.sh
```
7. Klik op **OK**
8. Klik op **Pull now** voor eerste pull

---

## 🔄 Updates Deployen

### Via Plesk Git:

1. Maak wijzigingen lokaal
2. Commit en push naar GitHub:
   ```bash
   git add .
   git commit -m "Update beschrijving"
   git push
   ```
3. In Plesk: Ga naar **Git** → **Pull now**

### Via SSH:

```bash
ssh root@185.255.131.147
cd /var/www/vhosts/zelfontspanners.nl/nodejs
git pull origin main
chmod +x deploy.sh
./deploy.sh
```

---

## ✅ Checklist voor Deployment

- [ ] Domain toegevoegd in Plesk
- [ ] SSL certificaat geïnstalleerd
- [ ] Project folder aangemaakt (`/var/www/vhosts/zelfontspanners.nl/nodejs`)
- [ ] Git repository gekloond/geïnitialiseerd
- [ ] Dependencies geïnstalleerd (`npm install`)
- [ ] Build uitgevoerd (`npm run build`)
- [ ] Public folder gekopieerd naar standalone
- [ ] `.next/server` gekopieerd naar standalone
- [ ] `.next/static` gekopieerd naar standalone
- [ ] PM2 gestart (`pm2 start ecosystem.config.js`)
- [ ] Nginx configuratie toegevoegd in Plesk
- [ ] Plesk Git geconfigureerd
- [ ] Eerste pull uitgevoerd
- [ ] Website getest in browser

---

## 🐛 Troubleshooting

### Website laadt niet?

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs zelfontspanners --lines 50

# Check of poort open is
ss -tlnp | grep 3001

# Herstart PM2
pm2 restart zelfontspanners
```

### Nginx geeft 502 Bad Gateway?

- Check of PM2 draait: `pm2 status`
- Check of de juiste poort wordt gebruikt in Nginx config (3001)
- Check PM2 logs voor errors

### Build faalt?

- Check of alle dependencies zijn geïnstalleerd: `npm install`
- Check Node.js versie (moet 18+ zijn): `node --version`
- Check build logs voor specifieke errors

### Images worden niet geladen?

- Check of `public/images/` map bestaat
- Check of images zijn gekopieerd naar `public/images/`
- Check bestandspaden in code (moeten beginnen met `/images/`)

---

## 📝 Belangrijke Notities

### Poorten:
- **bytesbooster.nl**: Poort 3000
- **zelfontspanners.nl**: Poort 3001
- **volgende website**: Poort 3002, etc.

### PM2 App Namen:
- Gebruik unieke namen voor elke website
- Bijv: `bytesbooster`, `zelfontspanners`, `website3`, etc.

### Folders:
- Elke website heeft zijn eigen folder: `/var/www/vhosts/[domain]/nodejs`
- Elke website heeft zijn eigen logs: `/var/www/vhosts/[domain]/logs/`

### localStorage:
- De website gebruikt nog steeds browser localStorage
- Werkt hetzelfde als voorheen
- Geen database nodig

---

**De website is nu klaar voor Next.js deployment! 🚀**

**Laatste update**: December 2025
