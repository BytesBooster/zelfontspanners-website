# 🚀 Code naar GitHub Pushen

## Optie 1: Via PowerShell Script (Aanbevolen)

1. Open PowerShell in de projectmap
2. Voer uit:
   ```powershell
   .\push-to-github.ps1
   ```
3. Voer je GitHub URL in wanneer daarom wordt gevraagd

---

## Optie 2: Handmatig (Direct)

Vervang `JOUW-GITHUB-URL` met je echte GitHub repository URL:

```bash
cd "c:\Users\jrdhn\Desktop\foto club wijchen"

# Voeg remote toe
git remote add origin JOUW-GITHUB-URL

# Push naar GitHub
git push -u origin main
```

**Voorbeeld:**
```bash
git remote add origin https://github.com/jouwgebruikersnaam/zelfontspanners-website.git
git push -u origin main
```

---

## ⚠️ Troubleshooting

### Remote bestaat al
Als je de foutmelding krijgt "remote origin already exists":
```bash
git remote set-url origin JOUW-GITHUB-URL
git push -u origin main
```

### Authenticatie vereist
GitHub vraagt mogelijk om authenticatie:
- **HTTPS**: Gebruik GitHub Personal Access Token als wachtwoord
- **SSH**: Zorg dat je SSH keys zijn ingesteld

### Eerste keer pushen
Als je de foutmelding krijgt over "unrelated histories":
```bash
git push -u origin main --force
```
⚠️ **Let op**: Dit overschrijft alles op GitHub. Gebruik alleen als de GitHub repository leeg is.

---

## ✅ Na succesvol pushen

Je code staat nu op GitHub! Je kunt:
- De code bekijken op GitHub
- Op je server clonen: `git clone JOUW-GITHUB-URL`
- Updates pushen met: `git push`

---

**Geef de GitHub URL door en ik voer het direct uit! 🚀**
