# De Zelfontspanners Website

Een moderne, responsive website voor De Zelfontspanners gebouwd met HTML, CSS en JavaScript. Deze website vervangt de oude WordPress site en biedt een snellere, modernere ervaring.

## Features

- 🎨 Modern en responsive design
- 📱 Volledig mobiel-vriendelijk
- 📝 Blog sectie met nieuws en updates
- 🏆 Foto van de maand sectie met winnaars
- 📅 Agenda met komende activiteiten
- 👥 Leden Portfolio galerij
- 🖼️ Interactieve fotogalerij met filters
- 📧 Contactformulier met echte contactgegevens
- ✨ Smooth scrolling en animaties
- 🎯 SEO-vriendelijk

## Structuur

```
foto club wijchen/
├── index.html      # Hoofdpagina
├── leden.html      # Leden pagina
├── styles.css      # Styling
├── script.js       # Interactiviteit voor index.html
├── leden.js        # Interactiviteit voor leden.html
├── images/         # (optioneel) Map voor foto's
│   └── leden/      # (optioneel) Map voor profielfoto's
└── README.md       # Deze file
```

## Installatie & Gebruik

### Lokale ontwikkeling

1. Clone of download deze repository
2. Open `index.html` in je browser
3. Of gebruik een lokale server:

**Met Python:**
```bash
python -m http.server 8000
```

**Met Node.js (http-server):**
```bash
npx http-server
```

**Met PHP:**
```bash
php -S localhost:8000
```

4. Open `http://localhost:8000` in je browser

## Aanpassingen

### Leden profielfoto's toevoegen

1. Maak een `images/leden/` map aan
2. Voeg profielfoto's toe met de naam van het lid (bijv. `dennis-ammersingh.jpg`)
3. Update de `memberPhotos` object in `leden.js`:

```javascript
const memberPhotos = {
    'Dennis Ammersingh': 'images/leden/dennis-ammersingh.jpg',
    'Robert Broeke': 'images/leden/robert-broeke.jpg',
    // ... voeg alle leden toe
};
```

**Tip:** Zorg dat de bestandsnamen overeenkomen met de exacte naam zoals die in de ledenlijst staat.

### Foto's toevoegen aan Portfolio

1. Voeg je foto's toe aan een `images/` map
2. Update de `galleryData` array in `script.js` met je eigen foto's:

```javascript
const galleryData = [
    { 
        src: 'images/jouw-foto.jpg', 
        category: 'nature', 
        title: 'Jouw Foto Titel' 
    },
    // ... meer foto's
];
```

### Blog posts toevoegen

Update de `blogData` array in `script.js`:

```javascript
const blogData = [
    {
        title: 'Jouw Blog Titel',
        date: 'Datum',
        author: 'Auteur',
        excerpt: 'Korte samenvatting',
        fullText: 'Volledige tekst van het blog bericht',
        image: 'url-naar-afbeelding'
    },
    // ... meer blog posts
];
```

### Foto van de maand toevoegen

Update de `fotoVanDeMaandData` array in `script.js`:

```javascript
const fotoVanDeMaandData = [
    {
        month: 'Maand Jaar',
        theme: 'Thema',
        winner: 'Naam winnaar',
        image: 'url-naar-afbeelding',
        date: 'Datum'
    },
    // ... meer winnaars
];
```

### Evenementen/Agenda aanpassen

Update de `eventsData` array in `script.js`:

```javascript
const eventsData = [
    {
        title: 'Jouw Evenement',
        date: 'Datum',
        description: 'Beschrijving',
        icon: '📷'
    },
    // ... meer evenementen
];
```

### Contactgegevens

De huidige contactgegevens (in `index.html`):
- Email: secretariaatfcw@gmail.com
- Telefoon: 06 44124696 (Marium Lahm)
- Adres: Wijchen, Nederland

Pas deze aan in `index.html` (sectie `#contact`) indien nodig.

### Kleuren aanpassen

Wijzig de CSS variabelen in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #e74c3c;
    --accent-color: #3498db;
    /* ... meer kleuren */
}
```

## Contactformulier

Het contactformulier werkt momenteel met een simpele alert. Voor productie gebruik:

1. **Backend integratie**: Voeg server-side code toe om emails te versturen
2. **Email service**: Gebruik een service zoals EmailJS, Formspree, of Netlify Forms
3. **PHP script**: Maak een `contact.php` bestand voor email verzending

Voorbeeld met EmailJS (gratis):
- Registreer op [EmailJS](https://www.emailjs.com/)
- Voeg de EmailJS script toe aan `index.html`
- Update de form submit handler in `script.js`

## Deployment

### GitHub Pages

1. Push je code naar GitHub
2. Ga naar Settings > Pages
3. Selecteer je branch en folder
4. Je site is live op `https://jouwusername.github.io/repository-naam`

### Netlify

1. Sleep de map naar [Netlify Drop](https://app.netlify.com/drop)
2. Of verbind met GitHub voor automatische deployments

### Andere hosting

Upload alle bestanden naar je webhost via FTP of cPanel.

## Browser Support

- Chrome (laatste versie)
- Firefox (laatste versie)
- Safari (laatste versie)
- Edge (laatste versie)

## Licentie

Dit project is gemaakt voor De Zelfontspanners.

## Ondersteuning

Voor vragen of problemen, neem contact op met de ontwikkelaar.

