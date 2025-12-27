# 🚀 Cloudinary Setup Handleiding

Deze handleiding helpt je om Cloudinary en Supabase op te zetten voor portfolio foto opslag.

---

## 📋 Stap 1: Cloudinary Account Aanmaken

1. Ga naar [https://cloudinary.com](https://cloudinary.com)
2. Klik op **"Sign Up for Free"**
3. Vul je gegevens in:
   - Email adres
   - Wachtwoord
   - Bedrijfsnaam: "De Zelfontspanners"
4. Bevestig je email
5. Log in op je account

### Cloudinary Dashboard

Na het inloggen zie je je **Dashboard**. Noteer de volgende gegevens:

- **Cloud Name** (bijv. `dxyz123abc`)
- **API Key** (bijv. `123456789012345`)
- **API Secret** (bijv. `abcdefghijklmnopqrstuvwxyz123456`)

⚠️ **BELANGRIJK:** Bewaar deze gegevens veilig! Je hebt ze nodig voor de configuratie.

---

## 📋 Stap 2: Supabase Account Aanmaken

1. Ga naar [https://supabase.com](https://supabase.com)
2. Klik op **"Start your project"**
3. Log in met GitHub (of maak een account)
4. Klik op **"New Project"**
5. Vul in:
   - **Name:** `zelfontspanners-portfolio`
   - **Database Password:** (kies een sterk wachtwoord, bewaar dit!)
   - **Region:** Kies dichtstbijzijnde (bijv. `West EU (Ireland)`)
6. Klik op **"Create new project"**
7. Wacht 2-3 minuten tot het project klaar is

### Supabase Project Settings

1. Ga naar **Settings** → **API**
2. Noteer de volgende gegevens:
   - **Project URL** (bijv. `https://xyzabc123.supabase.co`)
   - **anon public** key (begint met `eyJ...`)

⚠️ **BELANGRIJK:** Bewaar deze gegevens veilig!

---

## 📋 Stap 3: Supabase Database Tabel Aanmaken

1. Ga in Supabase naar **SQL Editor** (in het menu links)
2. Klik op **"New query"**
3. Kopieer en plak de volgende SQL code:

```sql
-- Maak tabel voor portfolio foto metadata
CREATE TABLE IF NOT EXISTS portfolio_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_name TEXT NOT NULL,
  cloudinary_url TEXT NOT NULL,
  cloudinary_public_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maak index voor snellere queries
CREATE INDEX IF NOT EXISTS idx_portfolio_photos_member_name ON portfolio_photos(member_name);
CREATE INDEX IF NOT EXISTS idx_portfolio_photos_display_order ON portfolio_photos(member_name, display_order);

-- Maak functie om updated_at automatisch bij te werken
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Maak trigger voor updated_at
CREATE TRIGGER update_portfolio_photos_updated_at 
  BEFORE UPDATE ON portfolio_photos 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Maak RLS (Row Level Security) policies
ALTER TABLE portfolio_photos ENABLE ROW LEVEL SECURITY;

-- Iedereen kan lezen (voor portfolio weergave)
CREATE POLICY "Portfolio photos are viewable by everyone"
  ON portfolio_photos FOR SELECT
  USING (true);

-- Alleen geauthenticeerde gebruikers kunnen toevoegen/bewerken/verwijderen
-- (Dit wordt later geconfigureerd met echte authenticatie)
CREATE POLICY "Users can insert their own photos"
  ON portfolio_photos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own photos"
  ON portfolio_photos FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete their own photos"
  ON portfolio_photos FOR DELETE
  USING (true);
```

4. Klik op **"Run"** (of druk op Ctrl+Enter)
5. Controleer of er geen errors zijn

---

## 📋 Stap 4: Environment Variables Configureren

### Lokaal (Development)

Maak een bestand `.env.local` in de root van je project:

```bash
# Cloudinary Configuratie
CLOUDINARY_CLOUD_NAME=je-cloud-name-hier
CLOUDINARY_API_KEY=je-api-key-hier
CLOUDINARY_API_SECRET=je-api-secret-hier

# Supabase Configuratie
NEXT_PUBLIC_SUPABASE_URL=https://je-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=je-anon-key-hier
```

⚠️ **BELANGRIJK:** 
- Vervang alle `je-...-hier` met je echte waarden
- `.env.local` staat al in `.gitignore`, dus wordt niet gecommit

### Op Server (Production)

#### Optie A: Via Plesk Environment Variables

1. Log in op Plesk
2. Ga naar **Websites & Domains** → **zelfontspanners.nl**
3. Klik op **"Environment Variables"** (of zoek naar "Environment")
4. Voeg de volgende variabelen toe:

```
CLOUDINARY_CLOUD_NAME = je-cloud-name
CLOUDINARY_API_KEY = je-api-key
CLOUDINARY_API_SECRET = je-api-secret
NEXT_PUBLIC_SUPABASE_URL = https://je-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = je-anon-key
```

5. Klik op **OK**

#### Optie B: Via PM2 Ecosystem Config

Open `ecosystem.config.js` en voeg toe:

```javascript
module.exports = {
  apps: [
    {
      name: 'zelfontspanners',
      script: '.next/standalone/server.js',
      instances: 1,
      exec_mode: 'fork',
      cwd: '/var/www/vhosts/zelfontspanners.nl/nodejs',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        CLOUDINARY_CLOUD_NAME: 'je-cloud-name',
        CLOUDINARY_API_KEY: 'je-api-key',
        CLOUDINARY_API_SECRET: 'je-api-secret',
        NEXT_PUBLIC_SUPABASE_URL: 'https://je-project-id.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'je-anon-key',
      },
      // ... rest van configuratie
    },
  ],
}
```

---

## 📋 Stap 5: Dependencies Installeren

```bash
npm install
```

Dit installeert:
- `cloudinary` - Voor foto uploads
- `@supabase/supabase-js` - Voor database operaties

---

## 📋 Stap 6: Testen

### Lokaal Testen

1. Start development server:
```bash
npm run dev
```

2. Log in op de website
3. Ga naar Portfolio Beheer
4. Probeer een foto te uploaden
5. Controleer of de foto verschijnt

### Controleer Cloudinary

1. Ga naar Cloudinary Dashboard
2. Klik op **"Media Library"**
3. Je zou een map moeten zien: `zelfontspanners/portfolio/[lid-naam]/`
4. Je geüploade foto's zouden hier moeten staan

### Controleer Supabase

1. Ga naar Supabase Dashboard
2. Klik op **"Table Editor"**
3. Selecteer tabel `portfolio_photos`
4. Je zou je geüploade foto metadata moeten zien

---

## 🔧 Troubleshooting

### Fout: "Cloudinary configuratie niet gevonden"

**Oplossing:** Controleer of je `.env.local` bestand bestaat en de juiste variabelen bevat.

### Fout: "Supabase niet geconfigureerd"

**Oplossing:** Controleer of `NEXT_PUBLIC_SUPABASE_URL` en `NEXT_PUBLIC_SUPABASE_ANON_KEY` zijn ingesteld.

### Fout: "Upload mislukt"

**Mogelijke oorzaken:**
1. Cloudinary credentials zijn incorrect
2. Bestand is te groot (max 5MB)
3. Bestand is geen JPEG

**Oplossing:** 
- Controleer Cloudinary credentials
- Controleer bestandsgrootte en formaat
- Bekijk browser console voor meer details

### Fout: "Database error"

**Oplossing:**
1. Controleer of de tabel `portfolio_photos` bestaat in Supabase
2. Controleer of RLS policies correct zijn ingesteld
3. Controleer Supabase credentials

---

## 📊 Cloudinary Gratis Tier Limieten

- **Opslag:** 25GB
- **Bandbreedte:** 25GB/maand
- **Transformaties:** Onbeperkt
- **API Requests:** Onbeperkt

Voor een fotoclub met ~40 leden en gemiddeld 20 foto's per lid = ~800 foto's totaal. Dit past ruim binnen de gratis tier!

---

## 🔒 Veiligheid

### Cloudinary API Secret

- **NOOIT** commit de API Secret naar Git
- **NOOIT** deel de API Secret publiekelijk
- Gebruik alleen server-side (in API routes)

### Supabase Anon Key

- De anon key is veilig om publiekelijk te gebruiken (in `NEXT_PUBLIC_*`)
- RLS policies zorgen voor beveiliging
- Alleen geauthenticeerde gebruikers kunnen data wijzigen

---

## 📝 Volgende Stappen

Na setup:

1. ✅ Test foto upload
2. ✅ Test foto verwijderen
3. ✅ Test titel bewerken
4. ✅ Controleer of foto's zichtbaar zijn voor bezoekers
5. ✅ Migreer bestaande localStorage foto's (optioneel)

---

## 🆘 Hulp Nodig?

Als je problemen ondervindt:
- Email: vanzijderveld@gmail.com
- Cloudinary Docs: https://cloudinary.com/documentation
- Supabase Docs: https://supabase.com/docs

---

**Laatste update:** December 2024



