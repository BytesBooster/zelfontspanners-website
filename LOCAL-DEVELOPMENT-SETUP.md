# Lokale Development Setup

## Overzicht

Dit document legt uit hoe je het project lokaal kunt draaien op je computer, toegankelijk via je IP-adres, zodat je eerst kunt testen voordat je live gaat.

## Voordelen

✅ **Test eerst lokaal** - Test alle wijzigingen voordat je live gaat  
✅ **Toegankelijk via IP** - Andere apparaten op je netwerk kunnen ook testen  
✅ **Snelle iteratie** - Wijzigingen zijn direct zichtbaar  
✅ **Geen impact op live** - Live website blijft gewoon werken  

## Stap 1: Installeer Dependencies

```bash
cd C:\Users\jrdhn\Desktop\websites\zelfontspanner.nl
npm install --legacy-peer-deps
```

## Stap 2: Maak .env.local Bestand

Kopieer `.env.local.example` naar `.env.local`:

```bash
# Windows PowerShell:
Copy-Item .env.local.example .env.local

# Of handmatig:
# Maak een nieuw bestand genaamd .env.local
```

De `.env.local` bevat al de juiste Supabase credentials, dus je hoeft niets aan te passen (tenzij je een andere database wilt gebruiken voor testing).

## Stap 3: Vind je IP-adres

### Windows:

```powershell
# PowerShell:
ipconfig

# Zoek naar "IPv4 Address" onder je netwerk adapter
# Bijvoorbeeld: 192.168.1.100
```

Of gebruik dit commando:
```powershell
(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*"}).IPAddress
```

## Stap 4: Start Development Server

### Optie A: Alleen localhost (standaard)
```bash
npm run dev
```
Toegankelijk op: `http://localhost:3000`

### Optie B: Via IP-adres (aanbevolen voor netwerk toegang)
```bash
npm run dev:network
```
Toegankelijk op:
- `http://localhost:3000` (lokaal)
- `http://192.168.1.100:3000` (vervang met jouw IP, andere apparaten op netwerk)

## Stap 5: Test de Verbinding

1. Open je browser op je computer: `http://localhost:3000`
2. Open op een ander apparaat (telefoon/tablet): `http://[jouw-ip]:3000`
   - Bijvoorbeeld: `http://192.168.1.100:3000`

## Stap 6: Development Workflow

### 1. Maak wijzigingen
- Pas code aan in je editor
- Next.js herlaadt automatisch (Hot Module Replacement)

### 2. Test lokaal
- Test alle functionaliteit
- Check console voor errors
- Test op verschillende apparaten/browsers

### 3. Als alles werkt: Deploy naar live
```bash
# Commit wijzigingen
git add .
git commit -m "Beschrijving van wijzigingen"
git push origin main

# Deploy naar server (via SSH)
ssh root@185.255.131.147
cd /var/www/vhosts/zelfontspanners.nl/nodejs
git pull origin main
bash deploy.sh
```

## Belangrijke Notities

### Database Verbinding

- **Lokaal gebruikt dezelfde database als productie** (Supabase)
- Dit betekent dat wijzigingen in de database direct zichtbaar zijn op beide omgevingen
- **Wees voorzichtig** met test data - gebruik eventueel een test database

### Firewall

Als andere apparaten je lokale server niet kunnen bereiken:

**Windows Firewall:**
1. Open Windows Defender Firewall
2. Klik "Allow an app through firewall"
3. Voeg Node.js toe of maak een regel voor poort 3000

Of via PowerShell (als Administrator):
```powershell
New-NetFirewallRule -DisplayName "Node.js Dev Server" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

### Poort Conflict

Als poort 3000 al in gebruik is:
```bash
# Gebruik een andere poort:
PORT=3001 npm run dev:network
```

Of pas `.env.local` aan:
```
PORT=3001
```

## Troubleshooting

### "Cannot connect to database"
- Check of `.env.local` bestaat en correct is
- Verifieer Supabase credentials
- Check internet verbinding

### "Port already in use"
- Stop andere processen op poort 3000
- Of gebruik een andere poort (zie boven)

### "Other devices can't connect"
- Check firewall instellingen
- Check of je op hetzelfde netwerk zit
- Verifieer IP-adres met `ipconfig`

### "Changes not reflecting"
- Hard refresh: `Ctrl + Shift + R` (Windows) of `Cmd + Shift + R` (Mac)
- Check console voor build errors
- Herstart dev server: `Ctrl + C` en dan `npm run dev:network`

## Veiligheid

⚠️ **BELANGRIJK:**
- `.env.local` bevat gevoelige credentials - deel dit NOOIT
- `.env.local` staat in `.gitignore` en wordt niet gecommit
- Gebruik alleen voor development/testing
- Test nooit met productie data zonder backup

## Snelle Commando's

```bash
# Start development server (netwerk toegang)
npm run dev:network

# Stop server
Ctrl + C

# Check IP adres (Windows PowerShell)
ipconfig | findstr IPv4

# Check of poort in gebruik is
netstat -ano | findstr :3000
```

## Next Steps

1. ✅ Setup lokale development omgeving
2. ✅ Test lokaal
3. ✅ Maak wijzigingen
4. ✅ Test alles grondig
5. ✅ Deploy naar live als alles werkt

Veel succes met development! 🚀

