# Database Setup Stappen

## ⚠️ Foutmelding: "relation accounts does not exist"

Deze fout betekent dat de database tabellen nog niet zijn aangemaakt. Volg deze stappen:

## Stap 1: Maak de tabellen aan

1. Ga naar je Supabase project dashboard
2. Klik op **"SQL Editor"** in het menu
3. Open het bestand `database/schema.sql`
4. Kopieer de volledige inhoud
5. Plak het in de SQL Editor
6. Klik op **"Run"** om alle tabellen aan te maken

## Stap 2: Verifieer dat tabellen zijn aangemaakt

Na het uitvoeren van het schema, controleer of de tabellen bestaan:

1. Ga naar **"Table Editor"** in Supabase
2. Je zou de volgende tabellen moeten zien:
   - `accounts`
   - `sessions`
   - `portfolio_data`
   - `portfolio_order`
   - `hidden_photos`
   - `photo_likes`
   - `photo_comments`
   - `agenda_events`
   - `foto_van_de_maand`

## Stap 3: Reset alle wachtwoorden (optioneel)

Als je alle accounts wilt resetten:

1. Ga naar **"SQL Editor"**
2. Open `database/reset-all-passwords.sql`
3. Kopieer en voer uit

Of gebruik de admin pagina:
- Ga naar `/admin/reset-password`
- Log in met `welkom2026!`
- Reset alle wachtwoorden

## Stap 4: Test de applicatie

Test of alles werkt:
- Login functionaliteit
- Portfolio upload
- Agenda events
- Foto van de maand

## ❌ Als je nog steeds errors krijgt

1. **Check environment variables** - Zorg dat `.env.local` bestaat met:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

2. **Check Supabase logs** - Ga naar Dashboard → Logs om errors te zien

3. **Verifieer kolomnamen** - Controleer of kolommen snake_case zijn (`member_name`, niet `memberName`)

## ✅ Volgorde van uitvoering

1. **Eerst**: Voer `database/schema.sql` uit (maakt tabellen aan)
2. **Dan**: Voer `database/fix-column-names-safe.sql` uit (als je al tabellen had)
3. **Daarna**: Voer `database/reset-all-passwords.sql` uit (als je accounts wilt resetten)

