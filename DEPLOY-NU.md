# 🚀 Deployment Handleiding - Live Zetten

## ✅ Pre-Deployment Checklist

Voordat je deployt, controleer:

- [x] Alle wijzigingen zijn gecommit en gepusht naar GitHub
- [x] `.env.local` bestaat met Supabase credentials
- [x] Database is gemigreerd (portfolio's staan in database)
- [x] Alle accounts zijn aangemaakt
- [x] Geen errors in lokale build (`npm run build` werkt)

---

## 📋 Stap-voor-Stap Deployment

### Stap 1: Push naar GitHub (als nog niet gedaan)

```bash
# Controleer status
git status

# Voeg alle wijzigingen toe
git add .

# Commit
git commit -m "Ready for production deployment"

# Push naar GitHub
git push origin main
```

### Stap 2: SSH naar Server

```bash
ssh root@185.255.131.147
```

Of via Plesk Terminal:
- Ga naar **Tools & Settings** → **SSH Terminal**

### Stap 3: Ga naar Project Directory

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
```

### Stap 4: Pull Laatste Wijzigingen

```bash
git pull origin main
```

### Stap 5: Zet Environment Variables

Controleer of `.env.local` bestaat op de server:

```bash
# Check of .env.local bestaat
ls -la .env.local

# Als het niet bestaat, maak het aan:
nano .env.local
```

Voeg toe (vervang met je echte waarden):
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
- ✅ Installeer dependencies
- ✅ Build de applicatie
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
- Test portfolio upload
- Test portfolio bekijken

---

## 🔄 Toekomstige Updates Deployen

Voor toekomstige updates:

### Optie A: Via SSH (Snelste)

```bash
ssh root@185.255.131.147
cd /var/www/vhosts/zelfontspanners.nl/nodejs
git pull origin main
./deploy.sh
```

### Optie B: Via Plesk Git (Automatisch)

1. Push wijzigingen naar GitHub
2. Ga naar Plesk → **Websites & Domains** → **zelfontspanners.nl** → **Git**
3. Klik **Pull now**
4. Het deployment script wordt automatisch uitgevoerd

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

# Check Nginx config in Plesk
# Ga naar: Websites & Domains → zelfontspanners.nl → Apache & nginx Settings
```

### Database errors?

- Controleer of `.env.local` correct is ingesteld op server
- Controleer Supabase credentials
- Check Supabase logs in dashboard

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

## 📞 Hulp Nodig?

Als er problemen zijn:
1. Check PM2 logs: `pm2 logs zelfontspanners`
2. Check build output in `deploy.sh` output
3. Check Supabase dashboard voor database errors
4. Controleer Nginx configuratie in Plesk


