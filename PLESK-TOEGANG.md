# 🔐 Plesk Toegang Handleiding

## 🌐 Hoe Open Je Plesk?

Plesk is een web hosting control panel dat je via een browser kunt openen. Er zijn verschillende manieren om toegang te krijgen:

---

## ✅ Methode 1: Via SSH Tunnel (Aanbevolen & Veiligste)

Dit is de veiligste methode omdat Plesk niet direct vanaf internet toegankelijk is.

### Stap 1: SSH Tunnel Aanmaken

**Windows (PowerShell):**
```powershell
ssh -L 8443:localhost:8443 root@185.255.131.147
```

**Windows (PuTTY):**
1. Open PuTTY
2. Host: `185.255.131.147`
3. Port: `22`
4. Ga naar **Connection → SSH → Tunnels**
5. Source port: `8443`
6. Destination: `localhost:8443`
7. Klik **Add**
8. Klik **Open** en log in

**Mac/Linux:**
```bash
ssh -L 8443:localhost:8443 root@185.255.131.147
```

### Stap 2: Plesk Openen in Browser

1. **Open je browser** (Chrome, Firefox, Edge, etc.)
2. Ga naar: **https://localhost:8443**
3. Je krijgt een **beveiligingswaarschuwing** (dit is normaal)
   - Klik op **"Advanced"** of **"Geavanceerd"**
   - Klik op **"Proceed to localhost"** of **"Doorgaan naar localhost"**
4. Log in met je **Plesk inloggegevens**

---

## ✅ Methode 2: Direct via IP (Als Geconfigureerd)

Als Plesk direct toegankelijk is gemaakt:

1. Open je browser
2. Ga naar: **https://185.255.131.147:8443**
3. Log in met je Plesk inloggegevens

⚠️ **Let op:** Dit is alleen mogelijk als de firewall dit toestaat.

---

## ✅ Methode 3: Via Domain (Als Geconfigureerd)

Sommige servers hebben Plesk beschikbaar via een subdomain:

1. Open je browser
2. Ga naar: **https://plesk.bytesbooster.nl** (of je geconfigureerde domain)
3. Log in met je Plesk inloggegevens

---

## 🔑 Plesk Inloggegevens

Je hebt de volgende gegevens nodig:
- **Username**: (meestal `admin` of je root username)
- **Password**: (je root wachtwoord of Plesk admin wachtwoord)

Als je deze niet weet:
- Check je server documentatie
- Of reset via SSH:
  ```bash
  ssh root@185.255.131.147
  /usr/local/psa/bin/admin --set-password -passwd "nieuw-wachtwoord"
  ```

---

## 🛠️ Troubleshooting

### "Connection Refused" of "Can't Connect"

**Probleem:** SSH tunnel werkt niet of Plesk draait niet.

**Oplossing:**
```bash
# Check of SSH tunnel actief is
# Zorg dat je SSH sessie open blijft!

# Check of Plesk draait op server
ssh root@185.255.131.147
systemctl status psa
```

### "SSL Certificate Error"

**Probleem:** Browser waarschuwt voor SSL certificaat.

**Oplossing:**
- Dit is **normaal** bij localhost
- Klik op **"Advanced"** → **"Proceed to localhost"**
- Of accepteer het certificaat

### "This site can't be reached"

**Probleem:** Browser kan localhost:8443 niet bereiken.

**Oplossing:**
1. Check of SSH tunnel actief is
2. Zorg dat je SSH sessie **open blijft** tijdens gebruik
3. Probeer opnieuw: `https://localhost:8443`

### Poort 8443 Al In Gebruik

**Probleem:** Poort 8443 is al bezet.

**Oplossing:**
```powershell
# Gebruik een andere lokale poort
ssh -L 8444:localhost:8443 root@185.255.131.147

# Open dan: https://localhost:8444
```

---

## 📋 Snelle Referentie

### SSH Tunnel Starten
```bash
ssh -L 8443:localhost:8443 root@185.255.131.147
```

### Plesk Openen
```
https://localhost:8443
```

### Server IP
```
185.255.131.147
```

---

## ✅ Eerste Keer Plesk Gebruiken

Na het inloggen zie je het Plesk dashboard:

1. **Websites & Domains** - Beheer je websites
2. **Files** - Bestandsbeheer
3. **Databases** - Database beheer
4. **Git** - Git repository beheer
5. **SSL/TLS Certificates** - SSL certificaten

---

## 🎯 Voor De Zelfontspanners Website

Na het inloggen:

1. Ga naar **"Websites & Domains"**
2. Klik op **"Add Domain"** (of selecteer bestaande domain)
3. Volg de instructies in `NEXTJS-DEPLOYMENT.md`

---

**Plesk is nu toegankelijk! 🚀**

**Tip:** Laat de SSH tunnel open tijdens het werken in Plesk!
