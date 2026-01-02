# Fix 404 Errors voor Static Files

## Probleem
Alle Next.js static files geven 404 errors:
- `/_next/static/css/...` 
- `/_next/static/chunks/...`
- `/images/hero1.jpg`

Dit betekent dat de static files niet correct worden geserveerd.

## Oplossing

### Stap 1: Check of de build correct is

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Check of .next/standalone bestaat
ls -la .next/standalone/

# Check of static files bestaan
ls -la .next/standalone/.next/static/
```

### Stap 2: Check de web server configuratie

Voor Next.js standalone builds moeten de static files worden geserveerd vanuit `.next/standalone/.next/static/`.

Als je Nginx gebruikt, moet de configuratie er zo uitzien:

```nginx
location /_next/static/ {
    alias /var/www/vhosts/zelfontspanners.nl/nodejs/.next/standalone/.next/static/;
    expires 365d;
    add_header Cache-Control "public, immutable";
}

location /images/ {
    alias /var/www/vhosts/zelfontspanners.nl/nodejs/public/images/;
}
```

### Stap 3: Rebuild en deploy

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Stop PM2
pm2 stop zelfontspanners

# Clean build
rm -rf .next

# Rebuild
npm run build

# Check of static files zijn gemaakt
ls -la .next/standalone/.next/static/

# Start PM2
pm2 start ecosystem.config.js
```

### Stap 4: Check web server logs

```bash
# Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

## Alternatief: Check of Next.js zelf de static files serveert

Next.js standalone server zou zelf de static files moeten serveren. Check of de server correct draait:

```bash
pm2 logs zelfontspanners --lines 50
```

Als je errors ziet over "Cannot find module" of "ENOENT", betekent dit dat de build niet correct is.

## Belangrijk

Voor Next.js standalone builds:
- Static files moeten in `.next/standalone/.next/static/` staan
- De server moet deze files kunnen serveren
- Of de web server (Nginx/Apache) moet deze files serveren voordat ze naar de Next.js server gaan

