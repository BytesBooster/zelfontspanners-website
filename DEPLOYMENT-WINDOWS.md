# Windows Deployment Guide

## Upload en Herstart Scripts

Er zijn verschillende batch scripts beschikbaar voor Windows deployment:

### 1. `upload-en-herstart.bat` (Basis)

Dit script:
- ✅ Controleert Git status
- ✅ Commit wijzigingen
- ✅ Push naar Git repository
- ✅ Geeft instructies voor server deployment

**Gebruik:**
```cmd
.\upload-en-herstart.bat
```

### 2. `deploy-via-ssh.bat` (Automatisch via SSH)

Dit script:
- ✅ Push naar Git
- ✅ Verbindt automatisch via SSH
- ✅ Voert `git pull` uit op server
- ✅ Voert `deploy.sh` uit op server

**Vereisten:**
- PuTTY (plink.exe) of OpenSSH geïnstalleerd
- SSH toegang tot server
- SSH key of wachtwoord configuratie

**Gebruik:**
```cmd
.\deploy-via-ssh.bat
```

### 3. WinSCP Script (`winscp-upload.txt`)

Voor gebruik met WinSCP:
1. Installeer WinSCP
2. Pas `winscp-upload.txt` aan met je server gegevens
3. Run: `upload-en-herstart.bat` (detecteert WinSCP automatisch)

---

## Deployment Methoden

### Methode 1: Via Git + Plesk (Aanbevolen)

**Stappen:**

1. **Lokaal (Windows):**
   ```cmd
   .\upload-en-herstart.bat
   ```

2. **In Plesk:**
   - Log in op Plesk
   - Ga naar **Websites & Domains** → **zelfontspanners.nl**
   - Klik op **Git**
   - Klik op **Pull now**

3. **Deploy script wordt automatisch uitgevoerd** (als geconfigureerd in Plesk Git)

**Voordelen:**
- ✅ Eenvoudig
- ✅ Geen SSH nodig
- ✅ Automatisch via Plesk interface

---

### Methode 2: Via SSH (Automatisch)

**Stappen:**

1. **Configureer SSH toegang:**
   - Installeer PuTTY of gebruik Windows OpenSSH
   - Configureer SSH key of wachtwoord

2. **Run deployment script:**
   ```cmd
   .\deploy-via-ssh.bat
   ```

**Voordelen:**
- ✅ Volledig automatisch
- ✅ Geen handmatige stappen

---

### Methode 3: Via WinSCP (Handmatig)

**Stappen:**

1. **Open WinSCP**
2. **Verbind met server:**
   - Host: `185.255.131.147`
   - Username: `root`
   - Protocol: SFTP

3. **Upload bestanden:**
   - Navigeer naar `/var/www/vhosts/zelfontspanners.nl/nodejs`
   - Upload gewijzigde bestanden

4. **SSH naar server:**
   - Klik op "Open Terminal" in WinSCP
   - Voer uit: `cd /var/www/vhosts/zelfontspanners.nl/nodejs && git pull && ./deploy.sh`

---

## Configuratie

### Server Instellingen Aanpassen

Pas deze variabelen aan in de batch scripts:

```batch
set SERVER_HOST=185.255.131.147
set SERVER_USER=root
set SERVER_PATH=/var/www/vhosts/zelfontspanners.nl/nodejs
```

### SSH Key Setup (Optioneel)

Voor passwordless SSH:

1. **Genereer SSH key:**
   ```cmd
   ssh-keygen -t rsa -b 4096
   ```

2. **Copy key naar server:**
   ```cmd
   type %USERPROFILE%\.ssh\id_rsa.pub | ssh root@185.255.131.147 "cat >> ~/.ssh/authorized_keys"
   ```

---

## Troubleshooting

### "Git is niet geïnitialiseerd"
- Run: `git init`
- Configureer Git: `git config user.name "Jouw Naam"` en `git config user.email "jouw@email.nl"`

### "Push gefaald"
- Controleer Git remote: `git remote -v`
- Voeg remote toe: `git remote add origin [jouw-git-url]`

### "SSH verbinding gefaald"
- Controleer server IP en gebruikersnaam
- Test SSH handmatig: `ssh root@185.255.131.147`
- Controleer firewall instellingen

### "Deploy script werkt niet op server"
- Check permissies: `chmod +x deploy.sh`
- Check of PM2 is geïnstalleerd: `pm2 --version`
- Check logs: `pm2 logs zelfontspanners`

---

## Snelle Deployment

Voor snelle deployment zonder scripts:

```cmd
REM Lokaal
git add .
git commit -m "Update"
git push

REM Dan in Plesk: Git > Pull now
```

Of via SSH:

```cmd
ssh root@185.255.131.147 "cd /var/www/vhosts/zelfontspanners.nl/nodejs && git pull && ./deploy.sh"
```

---

## Belangrijk

- ✅ Zorg dat `.env.local` op de server staat met Supabase credentials
- ✅ Zorg dat database schema is uitgevoerd
- ✅ Test altijd eerst lokaal: `npm run build`
- ✅ Check PM2 status na deployment: `pm2 status`


