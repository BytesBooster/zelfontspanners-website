# Portfolio Folders

Deze map bevat portfolio folders voor elk lid van Fotoclub Wijchen.

## Structuur

Elk lid heeft een eigen folder met hun naam (in kleine letters, met streepjes):
- `dennis-ammersingh/`
- `robert-broeke/`
- `huub-geerlings/`
- etc.

## Foto's toevoegen

1. Ga naar de folder van het lid (bijv. `dennis-ammersingh/`)
2. Voeg je foto's toe met beschrijvende namen:
   - `natuur-landschap-1.jpg`
   - `portret-2024.jpg`
   - `straatfotografie-1.jpg`
   - etc.

3. Update `portfolio.js` om de foto's te laden:

```javascript
const portfolioData = {
    'Dennis Ammersingh': {
        name: 'Dennis Ammersingh',
        photos: [
            { 
                src: 'images/portfolio/dennis-ammersingh/natuur-landschap-1.jpg', 
                title: 'Natuur Landschap', 
                category: 'nature' 
            },
            // ... meer foto's
        ]
    },
    // ... meer leden
};
```

## Ondersteunde bestandsformaten

- `.jpg` / `.jpeg`
- `.png`
- `.webp`

## Tips

- Gebruik beschrijvende bestandsnamen
- Houd foto's geoptimaliseerd voor web (max 2MB per foto)
- Gebruik consistente naamgeving binnen een portfolio







