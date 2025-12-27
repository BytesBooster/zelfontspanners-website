# 🔑 Plesk Wachtwoord Resetten

## 🔐 Plesk Admin Wachtwoord Resetten

### Op Ubuntu Server:

```bash
# Reset Plesk admin wachtwoord
sudo /usr/local/psa/bin/admin --set-password -passwd "jouw-nieuwe-wachtwoord"
```

**Vervang `"jouw-nieuwe-wachtwoord"` met je gewenste wachtwoord.**

---

## 📋 Stappen

### Stap 1: Log in op Server
- Via SSH of hosting provider terminal

### Stap 2: Reset Wachtwoord
```bash
sudo /usr/local/psa/bin/admin --set-password -passwd "mijn-nieuwe-wachtwoord-123"
```

### Stap 3: Check Admin Username
```bash
# Bekijk huidige admin username
sudo /usr/local/psa/bin/admin --show
```

### Stap 4: Log in op Plesk
- Open: `https://185.255.131.147:8443`
- Username: Meestal `admin` (of wat je ziet bij `--show`)
- Password: Het nieuwe wachtwoord dat je hebt ingesteld

---

## 🔍 Check Admin Username

Als je niet zeker weet wat de admin username is:

```bash
# Bekijk admin info
sudo /usr/local/psa/bin/admin --show

# Of check Plesk configuratie
sudo cat /etc/psa/.admin_passwd
```

---

## ✅ Voorbeeld

```bash
# Reset naar "MijnWachtwoord123!"
sudo /usr/local/psa/bin/admin --set-password -passwd "MijnWachtwoord123!"

# Check of het werkt
sudo /usr/local/psa/bin/admin --show
```

---

## 🎯 Na Resetten

1. **Open Plesk:** `https://185.255.131.147:8443`
2. **Username:** `admin` (of wat je ziet bij `--show`)
3. **Password:** Het nieuwe wachtwoord dat je hebt ingesteld

---

**Voer dit commando uit op je server! 🔐**
