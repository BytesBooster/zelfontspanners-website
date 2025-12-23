# Git Repository Setup - De Zelfontspanners

## ✅ Git Repository Aangemaakt

Het Git repository is geïnitialiseerd en de eerste commit is gemaakt.

---

## 📋 Huidige Status

- ✅ Git repository geïnitialiseerd
- ✅ .gitignore geconfigureerd
- ✅ Eerste commit gemaakt

---

## 🔗 GitHub Repository Koppelen

### Stap 1: Maak een GitHub Repository

1. Ga naar [GitHub](https://github.com)
2. Klik op **"New repository"**
3. Vul in:
   - **Repository name**: `zelfontspanners-website` (of een andere naam)
   - **Description**: "De Zelfontspanners website - Next.js"
   - **Visibility**: Private of Public (jouw keuze)
   - **DON'T** initialize with README, .gitignore, or license (we hebben deze al)
4. Klik op **"Create repository"**

### Stap 2: Koppel Lokale Repository aan GitHub

```bash
cd "c:\Users\jrdhn\Desktop\foto club wijchen"

# Voeg remote repository toe (vervang met jouw GitHub URL)
git remote add origin https://github.com/JouwGebruikersnaam/zelfontspanners-website.git

# Push naar GitHub
git branch -M main
git push -u origin main
```

**Of via SSH:**
```bash
git remote add origin git@github.com:JouwGebruikersnaam/zelfontspanners-website.git
git branch -M main
git push -u origin main
```

---

## 📝 Git Commands

### Basis Commands

```bash
# Status bekijken
git status

# Wijzigingen toevoegen
git add .

# Commit maken
git commit -m "Beschrijving van wijzigingen"

# Push naar GitHub
git push

# Pull van GitHub
git pull
```

### Handige Commands

```bash
# Bekijk commit geschiedenis
git log --oneline

# Bekijk wijzigingen
git diff

# Maak nieuwe branch
git checkout -b feature-naam

# Wissel tussen branches
git checkout main
```

---

## 🔄 Workflow voor Updates

### Lokale Wijzigingen Maken en Pushen

```bash
# 1. Wijzigingen maken in je code

# 2. Wijzigingen toevoegen
git add .

# 3. Commit maken
git commit -m "Beschrijving van wijzigingen"

# 4. Push naar GitHub
git push
```

### Op Server (Plesk) - Pull Updates

```bash
ssh root@185.255.131.147
cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Pull laatste wijzigingen
git pull origin main

# Run deployment script
./deploy.sh
```

---

## 📁 Wat wordt NIET gecommit (via .gitignore)

- `node_modules/` - Dependencies
- `.next/` - Build output
- `*.log` - Log bestanden
- Development scripts (create-portfolio-folders.js, etc.)
- Test HTML bestanden
- Documentatie bestanden (optioneel)

---

## ✅ Volgende Stappen

1. **Maak GitHub repository** (zie Stap 1 hierboven)
2. **Koppel remote repository** (zie Stap 2 hierboven)
3. **Push eerste commit** naar GitHub
4. **Configureer Plesk Git** om automatisch te pullen

---

**Git repository is klaar! 🎉**
