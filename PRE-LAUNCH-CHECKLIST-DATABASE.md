# ⚠️ Pre-Launch Checklist: Database Migratie

## 🔴 KRITIEK: Deze functionaliteiten werken nu alleen LOKAAL (localStorage)

Voordat de website live gaat, moeten de volgende functionaliteiten naar Supabase worden gemigreerd:

---

## 1. 📸 Foto van de Maand

**Huidige Status:** ❌ Gebruikt `localStorage` (`fotoVanDeMaandSubmissions`)

**Wat moet gebeuren:**
- ✅ Database tabel aanmaken in Supabase voor foto submissions
- ✅ Migreren van localStorage naar Supabase
- ✅ Code aanpassen om Supabase te gebruiken in plaats van localStorage

**Bestanden die aangepast moeten worden:**
- `lib/foto-van-de-maand.ts` - Functies aanpassen om Supabase te gebruiken
- `app/foto-van-de-maand/page.tsx` - Aanpassen om Supabase te gebruiken

**Impact:** 
- Foto's die nu ingezonden worden zijn alleen zichtbaar voor de gebruiker zelf
- Bij productie zullen alle ingezonden foto's verloren gaan als ze niet gemigreerd worden

---

## 2. 💬 Reacties onder Foto's

**Huidige Status:** ❌ Gebruikt `localStorage` (`photoComments`)

**Wat moet gebeuren:**
- ✅ Database tabel aanmaken in Supabase voor comments
- ✅ Migreren van localStorage naar Supabase
- ✅ Code aanpassen om Supabase te gebruiken

**Bestanden die aangepast moeten worden:**
- `lib/portfolio.ts` - `getPhotoComments()`, `addComment()` functies
- `app/portfolio/page.tsx` - `handleAddComment()` functie

**Impact:**
- Reacties die nu geplaatst worden zijn alleen zichtbaar voor de gebruiker zelf
- Bij productie zullen alle reacties verloren gaan als ze niet gemigreerd worden

---

## 3. ❤️ Likes op Foto's

**Huidige Status:** ❌ Gebruikt `localStorage` (`photoLikes`)

**Wat moet gebeuren:**
- ✅ Database tabel aanmaken in Supabase voor likes
- ✅ Migreren van localStorage naar Supabase
- ✅ Code aanpassen om Supabase te gebruiken

**Bestanden die aangepast moeten worden:**
- `lib/portfolio.ts` - `getPhotoLikes()`, `toggleLike()` functies
- `app/portfolio/page.tsx` - `handleLike()` functie

**Impact:**
- Likes die nu gegeven worden zijn alleen zichtbaar voor de gebruiker zelf
- Bij productie zullen alle likes verloren gaan als ze niet gemigreerd worden

---

## ✅ Wat WEL al werkt (live):

- ✅ Portfolio foto's - Opgeslagen in Supabase + Cloudinary
- ✅ Foto upload - Werkt via Cloudinary API
- ✅ Foto verwijderen - Werkt via Cloudinary API
- ✅ Foto metadata - Opgeslagen in Supabase

---

## 🚀 Aanbevolen Volgorde voor Migratie:

1. **Eerst:** Likes migreren (eenvoudigst - alleen user + photo_id)
2. **Dan:** Reacties migreren (complexer - comments + replies)
3. **Laatst:** Foto van de Maand migreren (meest complex - submissions + votes + images)

---

## 📝 SQL Tabellen die Aangemaakt Moeten Worden:

### Voor Likes:
```sql
CREATE TABLE photo_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(photo_id, user_name)
);
```

### Voor Comments:
```sql
CREATE TABLE photo_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  text TEXT NOT NULL,
  parent_comment_id UUID REFERENCES photo_comments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Voor Foto van de Maand:
```sql
CREATE TABLE foto_van_de_maand_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month_key TEXT NOT NULL,
  photographer TEXT NOT NULL,
  title TEXT NOT NULL,
  cloudinary_url TEXT NOT NULL,
  cloudinary_public_id TEXT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  excursion_id TEXT,
  excursion_title TEXT,
  excursion_location TEXT,
  excursion_date TEXT
);

CREATE TABLE foto_van_de_maand_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES foto_van_de_maand_submissions(id),
  voter_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(submission_id, voter_name)
);
```

---

## ⚠️ BELANGRIJK:

**Als je de website nu live zet zonder deze migratie:**
- Alle reacties, likes en foto van de maand submissions zullen alleen lokaal zijn
- Elke gebruiker ziet alleen zijn eigen data
- Data gaat verloren als browser cache wordt gewist
- Geen synchronisatie tussen gebruikers

**Na migratie:**
- Alle data wordt gedeeld tussen alle gebruikers
- Data blijft behouden
- Werkt op alle apparaten
- Geschikt voor productie gebruik


