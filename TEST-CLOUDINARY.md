# 🧪 Cloudinary Test Checklist

## ✅ Configuratie Status

### Cloudinary Credentials
- ✅ Cloud Name: `dp9lcxbfu`
- ✅ API Key: `877964424671325`
- ✅ API Secret: `jEZWkfFP9CTxvcqHdbuBgaL9tS0`
- ✅ Opgeslagen in `.env.local`

### Supabase Credentials
- ✅ Project URL: `https://emhidjqtxjnnrlgbbmyi.supabase.co`
- ✅ Anon Key: (ingesteld)
- ✅ Database tabel `portfolio_photos` aangemaakt

---

## 🧪 Test Stappen

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Upload Functionaliteit

1. Open http://localhost:3000
2. Log in met:
   - Naam: (selecteer je naam uit dropdown)
   - Wachtwoord: `test123`
3. Ga naar **Portfolio Beheer**
4. Upload een test foto:
   - Sleep een JPEG foto naar het upload gebied
   - Of klik op "Kies Bestanden"
   - Maximaal 5MB, alleen JPEG
5. Geef optioneel een titel
6. Klik op **"Foto's Toevoegen"**

### 3. Controleer Resultaten

#### In de Website:
- ✅ Foto verschijnt in "Huidige Foto's" lijst
- ✅ Geen error meldingen
- ✅ Upload indicator toont "Uploaden..." tijdens upload

#### In Cloudinary Dashboard:
1. Ga naar https://console.cloudinary.com
2. Klik op **Media Library**
3. Je zou moeten zien:
   - Map: `zelfontspanners/portfolio/[jouw-naam]/`
   - Je geüploade foto

#### In Supabase Dashboard:
1. Ga naar https://supabase.com/dashboard
2. Selecteer je project
3. Ga naar **Table Editor**
4. Selecteer tabel `portfolio_photos`
5. Je zou moeten zien:
   - Rij met je foto metadata
   - `member_name`: jouw naam
   - `cloudinary_url`: URL naar je foto
   - `title`: titel die je hebt ingegeven

### 4. Test Portfolio Weergave

1. Ga naar **Leden** pagina
2. Klik op je naam
3. Controleer:
   - ✅ Je geüploade foto is zichtbaar
   - ✅ Foto laadt correct
   - ✅ Titel wordt getoond

### 5. Test Foto Verwijderen

1. Ga terug naar **Portfolio Beheer**
2. Klik op **Verwijderen** bij een foto
3. Bevestig verwijdering
4. Controleer:
   - ✅ Foto wordt verwijderd uit portfolio
   - ✅ Foto wordt verwijderd van Cloudinary (check Media Library)
   - ✅ Metadata wordt verwijderd uit Supabase (check Table Editor)

### 6. Test Titel Bewerken

1. Klik op **Bewerken** bij een foto
2. Wijzig de titel
3. Klik op **Opslaan**
4. Controleer:
   - ✅ Titel wordt bijgewerkt in portfolio
   - ✅ Titel wordt bijgewerkt in Supabase

---

## 🐛 Troubleshooting

### Fout: "Cloudinary configuratie niet gevonden"

**Oplossing:**
- Controleer of `.env.local` bestaat in de root folder
- Controleer of de variabelen correct zijn gespeld
- Herstart de development server (`npm run dev`)

### Fout: "Upload mislukt" of "Network error"

**Mogelijke oorzaken:**
1. Cloudinary credentials zijn incorrect
2. Bestand is te groot (>5MB)
3. Bestand is geen JPEG

**Oplossing:**
- Controleer Cloudinary credentials in `.env.local`
- Controleer bestandsgrootte en formaat
- Bekijk browser console (F12) voor meer details

### Foto wordt niet getoond

**Mogelijke oorzaken:**
1. Foto is niet geüpload naar Cloudinary
2. Metadata is niet opgeslagen in Supabase
3. URL is incorrect

**Oplossing:**
- Controleer Cloudinary Media Library
- Controleer Supabase Table Editor
- Bekijk browser console voor errors

### Supabase errors

**Mogelijke oorzaken:**
1. Tabel bestaat niet
2. RLS policies zijn incorrect
3. Credentials zijn incorrect

**Oplossing:**
- Controleer of tabel `portfolio_photos` bestaat
- Run de SQL query opnieuw uit `CLOUDINARY-SETUP.md`
- Controleer Supabase credentials

---

## ✅ Succesvolle Test

Als alles werkt:
- ✅ Foto's worden geüpload naar Cloudinary
- ✅ Metadata wordt opgeslagen in Supabase
- ✅ Foto's zijn zichtbaar in portfolio
- ✅ Verwijderen werkt
- ✅ Titel bewerken werkt

**Dan ben je klaar om te deployen naar de server!** 🚀

---

## 📝 Notities

- Oude localStorage foto's blijven werken (backwards compatible)
- Nieuwe uploads gaan naar Cloudinary
- Alles wordt gecombineerd in portfolio weergave



