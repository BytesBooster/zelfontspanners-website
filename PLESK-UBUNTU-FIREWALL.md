# 🔥 Plesk Firewall - Ubuntu Server

## 🐧 Ubuntu Server: UFW Firewall

Voor Ubuntu servers gebruik je **UFW** (Uncomplicated Firewall) in plaats van firewall-cmd.

---

## ✅ Poort 8443 Openen op Ubuntu

### Stap 1: Check UFW Status

```bash
# Check of UFW actief is
sudo ufw status

# Check of UFW enabled is
sudo ufw status verbose
```

### Stap 2: Open Poort 8443

```bash
# Open poort 8443 voor TCP
sudo ufw allow 8443/tcp

# Of specifiek voor HTTPS
sudo ufw allow 8443/tcp comment 'Plesk HTTPS'

# Check of het is toegevoegd
sudo ufw status | grep 8443
```

### Stap 3: Reload UFW (Als Nodig)

```bash
# UFW werkt direct, maar je kunt checken:
sudo ufw reload
```

---

## 🔍 Troubleshooting

### Check Of Poort Open Is

```bash
# Check UFW regels
sudo ufw status numbered

# Check specifiek poort 8443
sudo ufw status | grep 8443

# Check waar Plesk op luistert
sudo ss -tlnp | grep 8443
# Of
sudo netstat -tlnp | grep 8443
```

### Als Poort Nog Steeds Niet Werkt

#### 1. Check Plesk Luistert Op Juiste Interface

```bash
# Check waar Plesk op luistert
sudo ss -tlnp | grep 8443

# Als het alleen op 127.0.0.1 luistert, moet je Plesk configureren
# om op alle interfaces te luisteren (0.0.0.0)
```

#### 2. Check iptables Direct (Als UFW Niet Werkt)

```bash
# Check iptables regels
sudo iptables -L -n | grep 8443

# Als nodig, voeg direct toe aan iptables:
sudo iptables -A INPUT -p tcp --dport 8443 -j ACCEPT
sudo iptables-save | sudo tee /etc/iptables/rules.v4
```

#### 3. Check Plesk Eigen Firewall

Plesk heeft vaak zijn eigen firewall:

```bash
# Check Plesk firewall status
/usr/local/psa/bin/server_pref --show | grep firewall

# Voeg poort toe aan Plesk firewall
sudo /usr/local/psa/bin/firewall --add-port 8443 -protocol tcp
```

#### 4. Check Contabo Firewall (Als Applicable)

Als je Contabo gebruikt, check ook hun control panel firewall:
1. Log in op Contabo Customer Panel
2. Ga naar je server
3. Check "Firewall" of "Security" tab
4. Voeg poort 8443 TCP toe

---

## ✅ Complete Setup Script

Voer dit uit op je Ubuntu server:

```bash
#!/bin/bash

# 1. Check UFW status
echo "=== UFW Status ==="
sudo ufw status

# 2. Open poort 8443
echo "=== Opening port 8443 ==="
sudo ufw allow 8443/tcp comment 'Plesk HTTPS'

# 3. Check of Plesk luistert
echo "=== Checking Plesk listening ==="
sudo ss -tlnp | grep 8443

# 4. Check Plesk firewall
echo "=== Checking Plesk firewall ==="
sudo /usr/local/psa/bin/server_pref --show | grep firewall

# 5. Voeg toe aan Plesk firewall (als nodig)
echo "=== Adding to Plesk firewall ==="
sudo /usr/local/psa/bin/firewall --add-port 8443 -protocol tcp

# 6. Final check
echo "=== Final UFW status ==="
sudo ufw status | grep 8443
```

---

## 🎯 Snelle Commando's

```bash
# Open poort
sudo ufw allow 8443/tcp

# Check status
sudo ufw status | grep 8443

# Check waar Plesk luistert
sudo ss -tlnp | grep 8443

# Voeg toe aan Plesk firewall
sudo /usr/local/psa/bin/firewall --add-port 8443 -protocol tcp
```

---

## ⚠️ Na Gebruik: Poort Sluiten

Voor veiligheid, sluit de poort weer na gebruik:

```bash
# Sluit poort 8443
sudo ufw delete allow 8443/tcp

# Of specifiek:
sudo ufw delete allow 8443/tcp comment 'Plesk HTTPS'

# Check
sudo ufw status | grep 8443
```

---

## 📋 Checklist

- [ ] `sudo ufw allow 8443/tcp` uitgevoerd
- [ ] `sudo ufw status | grep 8443` toont de regel
- [ ] `sudo ss -tlnp | grep 8443` toont dat Plesk luistert op `0.0.0.0:8443`
- [ ] Plesk firewall regel toegevoegd (als nodig)
- [ ] Contabo firewall gecheckt (als applicable)
- [ ] Test: `https://185.255.131.147:8443` werkt

---

**Voer deze commando's uit op je Ubuntu server! 🚀**
