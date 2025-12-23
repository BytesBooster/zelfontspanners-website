# Component Systeem - Handleiding

Dit component systeem maakt het mogelijk om herbruikbare secties (zoals de header, footer, etc.) op één plek te beheren. Als je bijvoorbeeld de header aanpast, wordt deze automatisch overal bijgewerkt.

## Hoe het werkt

Alle componenten worden beheerd in het bestand **`components.js`**. Dit bestand bevat templates voor:
- **Navigation** (header/navigatie)
- **Footer**

## Componenten aanpassen

### Navigation aanpassen

Open `components.js` en zoek naar de `navigation` functie. Hier kun je:
- Links toevoegen of verwijderen
- Teksten aanpassen
- Styling aanpassen (via CSS)
- Structuur wijzigen

**Voorbeeld:** Als je een nieuwe link wilt toevoegen:

```javascript
navigation: (activePage = 'home') => {
    const navLinks = {
        home: { href: 'index.html#home', text: 'Home' },
        // Voeg hier een nieuwe link toe:
        nieuw: { href: 'nieuw.html', text: 'Nieuw' },
        // ... rest van de links
    };
    // ... rest van de code
}
```

En voeg het toe aan de navigatie lijst:
```javascript
<li><a href="${navLinks.nieuw.href}" class="nav-link">${navLinks.nieuw.text}</a></li>
```

### Footer aanpassen

Open `components.js` en zoek naar de `footer` functie. Hier kun je:
- Teksten aanpassen
- Links wijzigen
- Contactgegevens updaten
- Nieuwe secties toevoegen

**Voorbeeld:** Contactgegevens aanpassen:

```javascript
footer: () => {
    return `
        <footer class="footer">
            <!-- ... -->
            <div class="footer-section">
                <h4>Contact</h4>
                <p><a href="mailto:nieuw@email.nl">nieuw@email.nl</a></p>
                <p><a href="tel:0612345678">06 12345678</a> (Nieuwe naam)</p>
            </div>
            <!-- ... -->
        </footer>
    `;
}
```

## Nieuwe componenten toevoegen

1. Voeg een nieuwe functie toe aan `Components` object in `components.js`:

```javascript
const Components = {
    // ... bestaande componenten
    
    // Nieuwe component
    hero: () => {
        return `
            <section class="hero">
                <h1>Nieuwe Hero Sectie</h1>
            </section>
        `;
    }
};
```

2. Laad het component in je HTML:

```html
<div id="hero-placeholder"></div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        loadComponent('hero', '#hero-placeholder');
    });
</script>
```

## Actieve pagina instellen

Voor de navigation component kun je aangeven welke pagina actief is:

```javascript
// In index.html
loadComponent('navigation', '#navigation-placeholder', 'home');

// In leden.html
loadComponent('navigation', '#navigation-placeholder', 'leden');
```

Beschikbare pagina's: `'home'`, `'blog'`, `'fotoVanDeMaand'`, `'agenda'`, `'leden'`, `'about'`, `'contact'`

## Voordelen

✅ **Centraal beheer**: Pas één keer aan, werkt overal  
✅ **Consistentie**: Alle pagina's hebben dezelfde header/footer  
✅ **Onderhoud**: Makkelijk te updaten  
✅ **Geen duplicatie**: Code wordt niet herhaald

## Belangrijk

- Componenten worden geladen via JavaScript, dus ze zijn zichtbaar zodra de pagina laadt
- Als je CSS aanpast, werkt dit automatisch voor alle componenten
- Zorg dat `components.js` altijd vóór andere scripts wordt geladen







