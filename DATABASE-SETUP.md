# Database Setup - De Zelfontspanners

## Overzicht

Alle data wordt nu opgeslagen in een database in plaats van localStorage. De applicatie ondersteunt Supabase (PostgreSQL) als database.

## Database Configuratie

### Supabase Setup

1. **Maak een Supabase project aan** op [supabase.com](https://supabase.com)

2. **Installeer dependencies:**
   ```bash
   npm install
   ```

3. **Stel environment variables in:**

   Maak een `.env.local` bestand in de root van het project:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   Je vindt deze waarden in je Supabase project onder Settings > API.

## Database Schema

Het database schema staat in `database/schema.sql`. Voer dit script uit in je Supabase SQL Editor:

1. Ga naar je Supabase project
2. Klik op "SQL Editor" in het menu
3. Kopieer de inhoud van `database/schema.sql`
4. Plak het in de SQL Editor
5. Klik op "Run" om de tabellen aan te maken

## Tabellen

De volgende tabellen worden gebruikt:

- **accounts** - Lid accounts met wachtwoorden
- **sessions** - Actieve gebruikerssessies (optioneel)
- **portfolio_data** - Portfolio foto's per lid
- **portfolio_order** - Volgorde van portfolio foto's
- **hidden_photos** - Verborgen portfolio foto's
- **photo_likes** - Likes op portfolio foto's
- **photo_comments** - Comments op portfolio foto's
- **agenda_events** - Agenda events
- **foto_van_de_maand** - Foto van de maand inzendingen

## API Endpoints

Alle API endpoints staan in `app/api/`:

- `/api/accounts` - Account beheer (GET, POST, PUT)
- `/api/accounts/login` - Login functionaliteit
- `/api/accounts/change-password` - Wachtwoord wijzigen
- `/api/accounts/reset-password` - Admin wachtwoord reset

## Migratie van localStorage naar Database

Als je bestaande data in localStorage hebt:

1. **Accounts migreren:**
   - Accounts worden automatisch aangemaakt wanneer een lid voor het eerst inlogt
   - Of gebruik de admin pagina `/admin/reset-password` om alle accounts te resetten

2. **Andere data migreren:**
   - Portfolio data, agenda events, etc. worden automatisch opgeslagen in de database wanneer gebruikers deze aanmaken
   - Bestaande localStorage data moet handmatig worden gemigreerd (zie migratie scripts)

## Testen

1. Start de development server:
   ```bash
   npm run dev
   ```

2. Test login:
   - Ga naar `/login`
   - Log in met een lid naam en wachtwoord `test123`
   - Het account wordt automatisch aangemaakt in de database

3. Test admin functionaliteit:
   - Ga naar `/admin/reset-password`
   - Log in met admin wachtwoord `welkom2026!`
   - Reset wachtwoorden zoals gewenst

## Troubleshooting

### Database connection errors

- Controleer of je environment variables correct zijn ingesteld
- Controleer of je Supabase project actief is
- Controleer of de tabellen zijn aangemaakt (ga naar Table Editor in Supabase)

### Accounts worden niet aangemaakt

- Controleer of `initializeAccounts()` wordt aangeroepen bij login
- Controleer de browser console voor errors
- Controleer de Network tab om te zien of API calls slagen

### Wachtwoorden werken niet

- Controleer of accounts correct zijn aangemaakt in de database
- Gebruik de admin pagina om wachtwoorden te resetten
- Controleer of de password field correct wordt opgeslagen


