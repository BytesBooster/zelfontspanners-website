# 🚀 Deploy Nu - Simpel

## Het Probleem
Je ziet een **oude build** in je browser. De logs `[Navigation] Safari fallback` komen uit een oude JavaScript file (`layout-94f0854bcc52beb1.js`).

## Oplossing: Deploy naar Server

### Optie 1: Via PowerShell Script (Aanbevolen)

Open PowerShell in deze folder en run:

```powershell
powershell -ExecutionPolicy Bypass -File deploy-via-ssh.ps1
```

Dit script:
- ✅ Connecteert naar de server via SSH
- ✅ Pullt de laatste code
- ✅ Bouwt de nieuwe versie
- ✅ Herstart de applicatie

### Optie 2: Handmatig via SSH

**Stap 1:** Open PowerShell en SSH naar de server:
```powershell
ssh root@185.255.131.147
```

**Stap 2:** Ga naar de project folder:
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
```

**Stap 3:** Pull en deploy:
```bash
git pull origin main
chmod +x deploy.sh
bash deploy.sh
```

### Optie 3: Alles in één commando

Vanaf je lokale machine:
```powershell
ssh root@185.255.131.147 "cd /var/www/vhosts/zelfontspanners.nl/nodejs && git pull origin main && chmod +x deploy.sh && bash deploy.sh"
```

## Na Deployment

1. **Hard Refresh Browser:**
   - Windows: `Ctrl + Shift + R` of `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Of leeg cache volledig:**
   - Open Developer Tools (F12)
   - Rechtsklik op refresh knop
   - Selecteer "Empty Cache and Hard Reload"

3. **Test in Incognito:**
   - Open website in incognito/private venster om te verifiëren

## Verificatie

Na deployment zou je NIET meer moeten zien:
- ❌ `[Navigation] Safari fallback` logs
- ❌ `[Navigation] Auth state update` logs  
- ❌ `[PasswordResetModal]` logs
- ❌ Infinite loops in console

Je zou WEL moeten zien:
- ✅ `[MODAL-KILLER] Script loaded` (eenmalig)
- ✅ Normale website functionaliteit

## Troubleshooting

Als het nog steeds niet werkt:

1. **Check of deployment geslaagd is:**
   ```bash
   ssh root@185.255.131.147
   cd /var/www/vhosts/zelfontspanners.nl/nodejs
   pm2 status
   pm2 logs zelfontspanners --lines 20
   ```

2. **Check of nieuwe build bestaat:**
   ```bash
   ls -la .next/static/chunks/layout-*.js
   ```
   De nieuwe build zou een ANDERE hash moeten hebben (niet `94f0854bcc52beb1`).

3. **Forceer browser cache clear:**
   - Sluit alle browser tabs
   - Clear browser cache volledig
   - Herstart browser
   - Open website opnieuw

