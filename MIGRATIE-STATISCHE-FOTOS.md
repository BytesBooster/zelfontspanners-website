# 📸 Migratie Statische Portfolio Foto's naar Supabase

Deze handleiding helpt je om alle statische portfolio foto's uit `portfolio-data.js` te migreren naar Supabase.

---

## 🎯 Wat Doet Dit Script?

Het migratiescript:
1. ✅ Leest alle statische portfolio data uit `public/portfolio-data.js`
2. ✅ Controleert welke foto's al in Supabase staan
3. ✅ Voegt ontbrekende foto's toe aan Supabase
4. ✅ Gebruikt de huidige foto URLs (images/portfolio/...)
5. ✅ Behoudt de volgorde en titels

---

## 📋 Vereisten

1. ✅ Supabase is ingesteld en werkt
2. ✅ Database tabel `portfolio_photos` bestaat
3. ✅ `.env.local` bevat Supabase credentials
4. ✅ Node.js en npm zijn geïnstalleerd

---

## 🚀 Stap 1: Dependencies Installeren

```bash
npm install
```

Dit installeert `tsx` en `dotenv` voor het migratiescript.

---

## 🚀 Stap 2: Migratie Uitvoeren

### Optie A: Via Script (Aanbevolen)

```bash
npx tsx scripts/migrate-static-photos.ts
```

### Optie B: Via API Route

1. Start development server:
```bash
npm run dev
```

2. Open in browser of gebruik curl:
```bash
curl -X POST http://localhost:3000/api/migrate-static-photos
```

---

## 📊 Wat Gebeurt Er?

Het script:
- ✅ Loopt door alle leden in `STATIC_PORTFOLIO_DATA`
- ✅ Controleert of foto's al bestaan in Supabase
- ✅ Voegt alleen nieuwe foto's toe
- ✅ Slaat metadata op: lid naam, URL, titel, volgorde
- ✅ Toont voortgang en resultaten

---

## 📝 Output Voorbeeld

```
🚀 Start migratie van statische portfolio foto's...

📖 Lees portfolio data van: .../public/portfolio-data.js
📊 Gevonden 40 leden met portfolio's

👤 Willeke Buijssen: 15 foto's gevonden
  ✅ Willeke Buijssen: 15 nieuwe foto's gemigreerd

👤 Tim Cobussen: 8 foto's gevonden
  ✅ Tim Cobussen: 8 nieuwe foto's gemigreerd

...

============================================================
📊 Migratie Resultaten:
  ✅ Succesvol gemigreerd: 450
  ⏭️  Overgeslagen (al aanwezig): 0
  ❌ Fouten: 0

✨ Migratie voltooid!
```

---

## ⚠️ Belangrijk

### Foto URLs
- Statische foto's gebruiken hun huidige URLs (`/images/portfolio/...`)
- Deze werken nog steeds omdat ze op de server staan
- Later kunnen we deze naar Cloudinary migreren als nodig

### Public IDs
- Het script genereert tijdelijke `public_id` waarden
- Deze beginnen met `static/` om aan te geven dat het statische foto's zijn
- Als je later naar Cloudinary migreert, worden deze vervangen

### Duplicaten
- Het script controleert op duplicaten
- Bestaande foto's worden overgeslagen
- Je kunt het script veilig meerdere keren uitvoeren

---

## 🔄 Later: Migreren naar Cloudinary

Als je later de statische foto's naar Cloudinary wilt uploaden:

1. Upload foto's naar Cloudinary
2. Update `cloudinary_url` en `cloudinary_public_id` in Supabase
3. Verwijder oude statische foto's van server (optioneel)

---

## 🐛 Troubleshooting

### Fout: "Supabase credentials niet gevonden"
**Oplossing:** Controleer of `.env.local` bestaat en correct is ingesteld.

### Fout: "Kon STATIC_PORTFOLIO_DATA niet vinden"
**Oplossing:** Controleer of `public/portfolio-data.js` bestaat en de juiste structuur heeft.

### Fout: "duplicate key value violates unique constraint"
**Oplossing:** Dit is normaal - het script skipt duplicaten automatisch.

### Fout: "relation 'portfolio_photos' does not exist"
**Oplossing:** Zorg dat je de SQL query uit `CLOUDINARY-SETUP.md` hebt uitgevoerd om de tabel aan te maken.

---

## ✅ Na Migratie

Na succesvolle migratie:
1. ✅ Alle statische foto's staan in Supabase
2. ✅ Portfolio pagina's laden foto's van Supabase
3. ✅ Foto's zijn zichtbaar voor alle bezoekers
4. ✅ Volgorde en titels zijn behouden

---

## 📞 Hulp Nodig?

Als je problemen ondervindt:
- Controleer browser console voor errors
- Controleer Supabase Dashboard → Table Editor
- Email: vanzijderveld@gmail.com

---

**Laatste update:** December 2024



