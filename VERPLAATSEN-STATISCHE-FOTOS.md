# 📸 Statische Foto's Verplaatsen

Handleiding voor het verplaatsen van alle statische portfolio foto's naar een map op je bureaublad.

---

## 🎯 Waarom?

Alle statische portfolio foto's zijn nu gemigreerd naar Supabase database. De originele foto's op de server zijn niet meer nodig omdat:

- ✅ Alle foto's staan in Supabase
- ✅ Portfolio pagina's laden foto's van Supabase
- ✅ Foto's werken nog steeds (via database URLs)

---

## 📋 Stappen

### Stap 1: Kopieer Alle Foto's

Run het script om alle foto's te kopiëren naar je bureaublad:

```bash
npx tsx scripts/move-static-photos.ts
```

Dit maakt een map aan op je bureaublad: `zelfontspanners-statische-fotos`

### Stap 2: Controleer de Map

Ga naar je bureaublad en open de map `zelfontspanners-statische-fotos`

Controleer:
- ✅ Alle leden hebben hun eigen map
- ✅ Alle foto's zijn gekopieerd
- ✅ Foto's zijn compleet

### Stap 3: (Optioneel) Verwijder Originele Foto's

**WAARSCHUWING:** Dit verwijdert de originele foto's van de server!

Alleen doen als je zeker weet dat:
- ✅ Alle foto's correct zijn gekopieerd
- ✅ De database werkt correct
- ✅ Je een backup hebt

```bash
npx tsx scripts/move-static-photos.ts --delete
```

---

## 📁 Map Structuur

De foto's worden gekopieerd naar:

```
Desktop/
└── zelfontspanners-statische-fotos/
    ├── willeke-buijssen/
    │   ├── PA152229-b.JPG
    │   ├── PA152238.JPG
    │   └── ...
    ├── tim-cobussen/
    │   ├── 109be227-d5de-4634-b046-660a36e24f4e.jpeg
    │   └── ...
    └── ...
```

---

## ⚠️ Belangrijk

### Voordat je verwijdert:

1. ✅ Test de portfolio pagina's
2. ✅ Controleer of alle foto's zichtbaar zijn
3. ✅ Maak een backup van de map op je bureaublad
4. ✅ Test op productie server voordat je daar verwijdert

### Na het verwijderen:

- Foto's blijven werken via Supabase database
- Portfolio pagina's laden foto's van Supabase
- Nieuwe foto's worden opgeslagen in Cloudinary/Supabase

---

## 🔄 Rollback

Als je de foto's terug wilt:

1. Kopieer de map terug naar `public/images/portfolio/`
2. Of gebruik de database URLs (die blijven werken)

---

## 📊 Verwacht Resultaat

- **~2798 foto's** worden gekopieerd
- **31 leden mappen** worden aangemaakt
- **Map grootte:** ~2-5 GB (afhankelijk van foto grootte)

---

**Laatste update:** December 2024



