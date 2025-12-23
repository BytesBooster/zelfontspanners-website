# 🔐 GitHub Authenticatie Setup

## ⚠️ Probleem
Je bent ingelogd als `Henshadix` maar probeert te pushen naar `BytesBooster` repository.

---

## ✅ Oplossingen

### Optie 1: GitHub Credential Manager (Aanbevolen)

1. **Verwijder oude credentials:**
   ```powershell
   git credential-manager-core erase
   ```
   Of via Windows Credential Manager:
   - Open "Credential Manager" in Windows
   - Ga naar "Windows Credentials"
   - Zoek naar "git:https://github.com"
   - Verwijder de oude credentials

2. **Push opnieuw (je wordt gevraagd om in te loggen):**
   ```bash
   git push -u origin main
   ```
   - Log in met je **BytesBooster** GitHub account
   - Of gebruik een **Personal Access Token** als wachtwoord

---

### Optie 2: Personal Access Token (Meest Betrouwbaar)

1. **Maak een Personal Access Token:**
   - Ga naar: https://github.com/settings/tokens
   - Klik "Generate new token" → "Generate new token (classic)"
   - Geef een naam: `zelfontspanners-website`
   - Selecteer scope: `repo` (volledige toegang)
   - Klik "Generate token"
   - **Kopieer de token** (je ziet hem maar 1x!)

2. **Push met token:**
   ```bash
   git push -u origin main
   ```
   - Username: `BytesBooster` (of je GitHub username)
   - Password: **Plak je Personal Access Token**

---

### Optie 3: SSH (Voor Lange Termijn)

1. **Genereer SSH key (als je die nog niet hebt):**
   ```bash
   ssh-keygen -t ed25519 -C "vanzijderveld@gmail.com"
   ```

2. **Voeg SSH key toe aan GitHub:**
   - Kopieer de public key: `cat ~/.ssh/id_ed25519.pub`
   - Ga naar: https://github.com/settings/keys
   - Klik "New SSH key"
   - Plak de key en sla op

3. **Wijzig remote naar SSH:**
   ```bash
   git remote set-url origin git@github.com:BytesBooster/zelfontspanners-website.git
   git push -u origin main
   ```

---

### Optie 4: GitHub CLI (Eenvoudig)

1. **Installeer GitHub CLI:**
   ```powershell
   winget install GitHub.cli
   ```

2. **Login:**
   ```bash
   gh auth login
   ```
   - Selecteer GitHub.com
   - Selecteer HTTPS
   - Login met je BytesBooster account

3. **Push:**
   ```bash
   git push -u origin main
   ```

---

## 🚀 Na Authenticatie

Zodra je succesvol hebt gepusht, kun je:

```bash
# Toekomstige updates pushen
git add .
git commit -m "Beschrijving"
git push

# Status bekijken
git status
git log --oneline
```

---

## 📝 Repository URL

Je repository staat op:
**https://github.com/BytesBooster/zelfontspanners-website**

---

**Kies een optie hierboven en voer de commando's uit! 🎯**
