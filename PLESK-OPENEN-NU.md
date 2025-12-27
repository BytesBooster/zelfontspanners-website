# 🚀 Plesk Nu Openen

## ✅ Status: Firewall Poort Geopend!

Je hebt de firewall poort 8443 geopend. Plesk draait en is nu toegankelijk!

---

## 🌐 Plesk Openen in Browser

### Stap 1: Open je Browser
- Chrome, Firefox, Edge, of welke browser je ook gebruikt

### Stap 2: Ga naar Plesk
Open deze URL:
```
https://185.255.131.147:8443
```

### Stap 3: Accepteer SSL Waarschuwing
Je krijgt een **beveiligingswaarschuwing** (dit is normaal):
1. Klik op **"Advanced"** of **"Geavanceerd"**
2. Klik op **"Proceed to 185.255.131.147"** of **"Doorgaan naar 185.255.131.147"**
3. Of klik op **"Accept the Risk"** / **"Risico accepteren"**

### Stap 4: Log In
- **Username**: Meestal `admin` of je root username
- **Password**: Je Plesk admin wachtwoord

---

## 🔐 Als Je Wachtwoord Niet Weet

### Op de Server (via SSH/Terminal):

```bash
# Reset Plesk admin wachtwoord
/usr/local/psa/bin/admin --set-password -passwd "jouw-nieuwe-wachtwoord"

# Of bekijk huidige admin username
/usr/local/psa/bin/admin --show
```

---

## ✅ Na Inloggen

Je ziet het Plesk dashboard met:
- **Websites & Domains** - Beheer je websites
- **Files** - Bestandsbeheer  
- **Git** - Git repository beheer
- **SSL/TLS Certificates** - SSL certificaten

---

## 🎯 Voor De Zelfontspanners Website

Na het inloggen:

1. **Ga naar "Websites & Domains"**
2. **Klik op "Add Domain"**
3. **Vul in:**
   - Domain name: `zelfontspanners.nl`
   - Hosting type: **"No hosting"** (voor Next.js met PM2)
   - Document root: `/var/www/vhosts/zelfontspanners.nl/nodejs`
4. **Klik op OK**

Volg daarna de instructies in `NEXTJS-DEPLOYMENT.md`

---

## ⚠️ Belangrijk: Sluit Firewall Na Gebruik!

Na het werken in Plesk, sluit de firewall poort weer voor veiligheid:

```bash
# Op de server uitvoeren:
firewall-cmd --remove-port=8443/tcp --permanent
firewall-cmd --reload
```

Of gebruik een SSH tunnel voor toekomstige toegang (veiliger).

---

## 🔄 Voor Toekomstige Toegang

### Optie 1: SSH Tunnel (Veiliger)
```bash
# Op je PC:
ssh -L 8443:localhost:8443 root@185.255.131.147

# Open dan: https://localhost:8443
```

### Optie 2: Firewall Tijdelijk Openen
```bash
# Op server:
firewall-cmd --add-port=8443/tcp --permanent
firewall-cmd --reload

# Na gebruik:
firewall-cmd --remove-port=8443/tcp --permanent
firewall-cmd --reload
```

---

**Open nu: https://185.255.131.147:8443 🚀**
