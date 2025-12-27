# 🔐 Plesk Toegang - Alternatieve Methoden

## ⚠️ Probleem: SSH Connection Timed Out

Als je de fout krijgt: `Connection timed out` bij SSH, probeer dan deze alternatieven:

---

## ✅ Methode 1: Direct via Browser (Als Beschikbaar)

Sommige Plesk installaties zijn direct toegankelijk via HTTPS:

### Probeer deze URLs:

1. **Via IP met poort:**
   ```
   https://185.255.131.147:8443
   ```

2. **Via domain (als geconfigureerd):**
   ```
   https://plesk.bytesbooster.nl:8443
   https://plesk.zelfontspanners.nl:8443
   ```

3. **Via standaard Plesk poort:**
   ```
   https://185.255.131.147:8447
   ```

**Let op:** Je krijgt mogelijk een SSL certificaat waarschuwing - dit is normaal.

---

## ✅ Methode 2: Via Plesk Web Admin (Als Beschikbaar)

Sommige servers hebben Plesk beschikbaar op poort 8447:

```
https://185.255.131.147:8447
```

---

## ✅ Methode 3: Via Hosting Provider Panel

Als je server via een hosting provider is:
- Log in op je hosting provider panel (bijv. cPanel, DirectAdmin, of hun eigen panel)
- Zoek naar "Plesk" of "Server Management"
- Open Plesk vanuit daar

---

## ✅ Methode 4: VPN of Andere Netwerk

### Mogelijke Oorzaken van SSH Timeout:

1. **Firewall blokkeert poort 22**
   - Je ISP blokkeert mogelijk SSH
   - Je lokale firewall blokkeert SSH
   - Bedrijfsnetwerk blokkeert SSH

2. **Server is niet bereikbaar**
   - Server is offline
   - IP adres is veranderd
   - Server heeft andere poort voor SSH

### Oplossingen:

**Check of server online is:**
```powershell
# Ping test
ping 185.255.131.147

# Port check (als je telnet hebt)
Test-NetConnection -ComputerName 185.255.131.147 -Port 22
```

**Probeer andere SSH poort:**
```powershell
# Sommige servers gebruiken poort 2222 of andere
ssh -p 2222 -L 8443:localhost:8443 root@185.255.131.147
```

---

## ✅ Methode 5: Via FTP/File Manager

Als SSH niet werkt, kun je mogelijk via FTP of Plesk File Manager:

### FTP Toegang:
- **Host:** `185.255.131.147` of `ftp.bytesbooster.nl`
- **Poort:** `21` (FTP) of `22` (SFTP)
- **Username:** Je FTP username
- **Password:** Je FTP wachtwoord

Gebruik een FTP client zoals:
- FileZilla
- WinSCP
- Cyberduck

---

## ✅ Methode 6: Contact Server Beheerder

Als niets werkt:
1. **Contact je server beheerder** of hosting provider
2. Vraag naar:
   - Correcte Plesk toegangs URL
   - SSH poort (mogelijk niet 22)
   - VPN toegang (als beschikbaar)
   - Directe Plesk URL

---

## 🔍 Diagnose Stappen

### 1. Check Server Status
```powershell
# Ping test
ping 185.255.131.147

# Als ping werkt maar SSH niet, is poort 22 mogelijk geblokkeerd
```

### 2. Check Poorten
```powershell
# Test verschillende poorten
Test-NetConnection -ComputerName 185.255.131.147 -Port 22   # SSH
Test-NetConnection -ComputerName 185.255.131.147 -Port 8443 # Plesk HTTPS
Test-NetConnection -ComputerName 185.255.131.147 -Port 8447 # Plesk alternatief
```

### 3. Probeer Direct Browser Toegang
Open deze URLs in je browser:
- `https://185.255.131.147:8443`
- `https://185.255.131.147:8447`
- `http://185.255.131.147:8880` (HTTP Plesk, niet aanbevolen)

---

## 📞 Contact Informatie

Als je de server beheerder bent of contact hebt:
- Vraag naar de **correcte Plesk toegangs URL**
- Vraag naar **SSH poort** (als niet 22)
- Vraag naar **VPN toegang** (als beschikbaar)

---

## 🎯 Voor Nu: Alternatieve Deployment

Als Plesk niet toegankelijk is, kun je ook:

### Optie A: Via GitHub + Server Git
1. Push code naar GitHub (✅ al gedaan)
2. Configureer Git op server (als je daar toegang hebt)
3. Pull automatisch op server

### Optie B: Via FTP Upload
1. Upload bestanden via FTP
2. Configureer handmatig op server

### Optie C: Wacht tot Server Toegang Beschikbaar Is
- Contact server beheerder
- Wacht op correcte toegangsgegevens

---

## ✅ Snelle Checklist

- [ ] Probeer `https://185.255.131.147:8443` direct in browser
- [ ] Probeer `https://185.255.131.147:8447` in browser
- [ ] Check ping: `ping 185.255.131.147`
- [ ] Probeer andere SSH poort (2222, 22222, etc.)
- [ ] Contact server beheerder voor toegangsgegevens
- [ ] Check hosting provider panel voor Plesk link

---

**Probeer eerst de directe browser URLs hierboven! 🚀**
