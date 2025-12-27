# 🔥 Plesk Firewall Check & Fix

## ⚠️ Probleem: Poort 8443 Nog Niet Bereikbaar

De firewall regel is toegevoegd, maar de poort is nog niet bereikbaar. Dit kan verschillende oorzaken hebben.

---

## ✅ Check & Fix Op Server

Voer deze commando's uit op de server:

### Stap 1: Check Firewall Status

```bash
# Check of firewall-cmd werkt
firewall-cmd --state

# Check of poort 8443 is toegevoegd
firewall-cmd --list-ports

# Check alle firewall regels
firewall-cmd --list-all
```

### Stap 2: Check iptables (Als firewall-cmd niet werkt)

```bash
# Check iptables regels
iptables -L -n | grep 8443

# Als iptables wordt gebruikt, voeg regel toe:
iptables -A INPUT -p tcp --dport 8443 -j ACCEPT
iptables-save > /etc/iptables/rules.v4  # Of waar je regels worden opgeslagen
```

### Stap 3: Check Plesk Firewall (Plesk heeft eigen firewall!)

Plesk heeft vaak zijn eigen firewall. Check dit:

```bash
# Check Plesk firewall status
/usr/local/psa/bin/server_pref --show | grep firewall

# Of via Plesk CLI:
plesk bin server_pref --show
```

### Stap 4: Open Poort in Plesk Firewall

```bash
# Voeg poort toe aan Plesk firewall
/usr/local/psa/bin/server_pref --update -firewall-type custom
/usr/local/psa/bin/firewall --add-port 8443 -protocol tcp
```

---

## 🔧 Alternatieve Oplossingen

### Optie 1: Check Welke Firewall Actief Is

```bash
# Check systemd firewall
systemctl status firewalld

# Check iptables
iptables -L

# Check ufw (als Ubuntu/Debian)
ufw status
```

### Optie 2: Contabo Firewall Panel

Als je Contabo gebruikt:
1. Log in op Contabo Customer Panel
2. Ga naar je server
3. Check **"Firewall"** sectie
4. Voeg poort **8443 TCP** toe

### Optie 3: Check Plesk Luistert Op Juiste Interface

```bash
# Check waar Plesk op luistert
netstat -tlnp | grep 8443
# Of
ss -tlnp | grep 8443

# Als het alleen op 127.0.0.1 luistert, moet je Plesk configureren
# om op alle interfaces te luisteren
```

---

## ✅ Snelle Fix: Contabo Panel

Als je Contabo gebruikt:

1. **Log in:** https://www.contabo.com/en/customer/
2. **Ga naar:** Servers → Je Server
3. **Klik op:** "Firewall" of "Security"
4. **Voeg toe:** Poort `8443` TCP
5. **Sla op**

---

## 🎯 Meest Waarschijnlijke Oplossing

Contabo heeft vaak een **firewall in hun control panel** die los staat van de server firewall:

1. Log in op Contabo Customer Panel
2. Ga naar je server
3. Open "Firewall" of "Security" tab
4. Voeg poort **8443 TCP** toe
5. Probeer dan: `https://185.255.131.147:8443`

---

## 📋 Commando's Om Uit Te Voeren Op Server

```bash
# 1. Check firewall status
firewall-cmd --state
firewall-cmd --list-ports

# 2. Check iptables
iptables -L -n | grep 8443

# 3. Check waar Plesk luistert
ss -tlnp | grep 8443

# 4. Check Plesk firewall
/usr/local/psa/bin/server_pref --show | grep firewall

# 5. Voeg toe aan Plesk firewall (als nodig)
/usr/local/psa/bin/firewall --add-port 8443 -protocol tcp
```

---

**Voer deze checks uit en laat weten wat je ziet! 🔍**
