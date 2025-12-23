# Portfolio Setup Instructies

## Folder Structuur Aanmaken

Er zijn twee manieren om de portfolio folders aan te maken:

### Methode 1: Handmatig (Aanbevolen)

1. Ga naar de `images/portfolio/` map
2. Maak voor elk lid een folder aan met hun naam (kleine letters, streepjes):
   - `dennis-ammersingh`
   - `robert-broeke`
   - `huub-geerlings`
   - `henk-graveth`
   - `marium-lahm`
   - `richard-schoonderwoerd`
   - `sacha-van-der-veen-van-zijp`
   - `monica-zimmermans`
   - `willy-van-dreumel`
   - `theo-gerritsen`
   - `rob-jansen`
   - `jolanda-kuijsters`
   - `henriette-veldman`
   - `rob-peters`
   - `mieke-steins`
   - `elja-trum`
   - `bram-visser`
   - `roland-smanski`
   - `john-van-heumen`
   - `lodewijk-joha`
   - `melissa-van-zuijlen-giesbers`
   - `geert-broeks`
   - `gerda-dappers`
   - `loes-schook`
   - `johan-brouwers`
   - `peter-schook`
   - `bert-van-os` (erelid)

### Methode 2: Met Node.js Script

Als je Node.js hebt geïnstalleerd:

```bash
node create-portfolio-folders.js
```

Dit script maakt automatisch alle folders aan.

## Foto's Toevoegen

1. Voeg foto's toe aan de juiste folder (bijv. `images/portfolio/dennis-ammersingh/`)
2. Update `portfolio.js` om de foto's te laden:

```javascript
const portfolioData = {
    'Dennis Ammersingh': {
        name: 'Dennis Ammersingh',
        photos: [
            { 
                src: 'images/portfolio/dennis-ammersingh/foto-1.jpg', 
                title: 'Mijn Foto Titel', 
                category: 'nature' 
            },
            { 
                src: 'images/portfolio/dennis-ammersingh/foto-2.jpg', 
                title: 'Nog een Foto', 
                category: 'portrait' 
            },
        ]
    },
    // Voeg hier meer leden toe...
};
```

## Folder Naam Conversie

De folder naam moet overeenkomen met de naam conversie:
- Spaties worden streepjes: `Dennis Ammersingh` → `dennis-ammersingh`
- Alles wordt kleine letters
- Speciale tekens worden verwijderd

De functie `sanitizeFolderName()` in `portfolio.js` doet dit automatisch.

## Testen

1. Voeg een test foto toe aan een folder
2. Update `portfolio.js` met de foto referentie
3. Open `portfolio.html?member=Dennis%20Ammersingh` in je browser
4. De foto zou moeten verschijnen!







