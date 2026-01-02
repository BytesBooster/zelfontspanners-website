# 🚀 Quick Deploy via SSH

## Stap 1: SSH naar Server

Open PowerShell of Terminal en voer uit:

```bash
ssh root@185.255.131.147
```

(Of gebruik je eigen SSH gebruiker/ip als die anders is)

## Stap 2: Ga naar Project Directory

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
```

## Stap 3: Pull Laatste Wijzigingen

```bash
git pull origin main
```

## Stap 4: Run Deployment Script

```bash
chmod +x deploy.sh
bash deploy.sh
```

Het script doet automatisch:
- ✅ Verwijdert oude build (.next folder)
- ✅ Installeert dependencies
- ✅ Bouwt de applicatie
- ✅ Herstart PM2

## Stap 5: Verifieer

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs zelfontspanners --lines 20
```

## Klaar! 🎉

De website zou nu live moeten zijn met alle fixes.

---

## Option 2: Alles in één commando

Als je alles in één keer wilt doen:

```bash
ssh root@185.255.131.147 "cd /var/www/vhosts/zelfontspanners.nl/nodejs && git pull origin main && chmod +x deploy.sh && bash deploy.sh"
```

---

## Troubleshooting

Als er problemen zijn:

```bash
# Check of PM2 draait
pm2 status

# Check logs voor errors
pm2 logs zelfontspanners --lines 50

# Handmatig herstarten
pm2 restart zelfontspanners
```

