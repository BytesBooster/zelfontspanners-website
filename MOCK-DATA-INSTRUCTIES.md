# Mock Data Instructies

## Mock Data Laden

Om te zien hoe het Foto van de Maand systeem eruit ziet met data voor een heel jaar:

### Methode 1: Via Browser Console (Aanbevolen)

1. Open de website in je browser
2. Ga naar de **Foto van de Maand** pagina
3. Druk op **F12** om de Developer Tools te openen
4. Ga naar het **Console** tabblad
5. Kopieer de hele inhoud van `load-mock-data.js`
6. Plak het in de console en druk op **Enter**
7. De pagina wordt automatisch ververst na 2 seconden

### Methode 2: Direct Script Laden

1. Open `load-mock-data.js` in een teksteditor
2. Kopieer alle code
3. Open de browser console (F12)
4. Plak de code en druk op Enter

## Wat wordt er geladen?

### Agenda Events
- 12 excursies voor het hele jaar (2025)
- Elke maand één excursie op de eerste zondag
- Verschillende locaties (Oosterbeek, Nijmegen, Wijchen, etc.)
- Realistische data met tijd, locatie en beschrijving

### Foto Submissions
- Per maand: 3-8 leden uploaden foto's
- Elke lid: 1-3 foto's per maand
- Random stemmen van andere leden
- Winnaar wordt automatisch bepaald (meeste stemmen)
- Alle foto's zijn gekoppeld aan de excursie van die maand

### Statistieken
- Totaal: ~60-80 foto's voor het hele jaar
- Gemiddeld: ~5-7 foto's per maand
- Elke foto heeft 0-7 stemmen

## Mock Data Verwijderen

Om alle mock data te verwijderen:

1. Open de browser console (F12)
2. Kopieer de inhoud van `clear-mock-data.js`
3. Plak het in de console en druk op Enter
4. Bevestig de verwijdering

**Let op:** Dit verwijdert alleen mock data. Echte agenda events en foto submissions blijven behouden.

## Wat zie je na het laden?

- **Excursie Info**: Bovenaan zie je de excursie van de huidige maand
- **Winnaar**: De foto met de meeste stemmen wordt getoond als "Foto van de Maand"
- **Ingezonden Foto's**: Alle foto's van de huidige maand met stemmen
- **Archief**: Winnaars van alle vorige maanden met excursie informatie

## Tips

- Log in met een account om te zien hoe het upload systeem werkt
- Probeer te stemmen op foto's om te zien hoe het beoordelingssysteem werkt
- Bekijk het archief om te zien hoe winnaars van vorige maanden worden getoond
