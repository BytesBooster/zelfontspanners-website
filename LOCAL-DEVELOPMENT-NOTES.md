# Lokale Development Notities

## 404 Errors voor Portfolio Afbeeldingen

Tijdens lokale development zie je 404 errors voor portfolio afbeeldingen zoals:
```
GET http://192.168.2.48:3000/images/portfolio/karin-kalmar/Renkums-Beekdal-5692.jpg 404 (Not Found)
```

**Dit is normaal!** De portfolio afbeeldingen staan alleen op de server, niet lokaal.

## Oplossingen

### Optie 1: Download Afbeeldingen van Server (Aanbevolen)

**Via Git Bash:**
```bash
# Download alle portfolio afbeeldingen
scp -r root@185.255.131.147:/var/www/vhosts/zelfontspanners.nl/nodejs/public/images/portfolio public/images/
```

**Via PowerShell Script:**
```powershell
.\download-portfolio-images.ps1
```

**Via SFTP Client (FileZilla):**
1. Verbind met server: `185.255.131.147`
2. Ga naar: `/var/www/vhosts/zelfontspanners.nl/nodejs/public/images/portfolio`
3. Download naar: `C:\Users\jrdhn\Desktop\websites\zelfontspanner.nl\public\images\portfolio`

### Optie 2: Accepteer 404 Errors (Sneller)

De 404 errors zijn **niet kritisch** voor development:
- ✅ Functionaliteit werkt nog steeds
- ✅ Je kunt code testen
- ✅ Database verbinding werkt
- ✅ Login/logout werkt
- ❌ Alleen afbeeldingen worden niet getoond

Dit is prima voor het testen van functionaliteit!

## Andere 404 Errors

### Favicon.ico
```
GET http://192.168.2.48:3000/favicon.ico 404 (Not Found)
```

**Oplossing:** Voeg een favicon toe aan `public/favicon.ico` (optioneel, niet kritisch)

## Wat Werkt Zonder Afbeeldingen

- ✅ Login/Logout functionaliteit
- ✅ Database queries
- ✅ API endpoints
- ✅ Portfolio data laden
- ✅ Leden pagina
- ✅ Agenda
- ✅ Foto van de maand
- ✅ Alle andere functionaliteit

## Development Workflow

1. **Test functionaliteit lokaal** (met of zonder afbeeldingen)
2. **Als alles werkt** → commit en push
3. **Deploy naar server** → daar werken afbeeldingen wel

## Tips

- **Ignore 404 errors** tijdens development als je alleen functionaliteit test
- **Download afbeeldingen** alleen als je de volledige UI wilt testen
- **Test op live server** voor finale UI/UX verificatie

## Snelle Commando's

```powershell
# Start development server
npm run dev:network

# Stop server
Ctrl + C

# Check of afbeeldingen bestaan
Test-Path "public/images/portfolio/karin-kalmar"
```

