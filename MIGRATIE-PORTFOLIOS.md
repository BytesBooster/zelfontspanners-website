# Portfolio Migratie naar Database

Dit document beschrijft hoe je portfolio's van `portfolio-data.js` naar de Supabase database migreert.

## Optie 1: Automatische Migratie (Aanbevolen)

### Stap 1: Installeer dependencies

```bash
npm install tsx --save-dev
```

### Stap 2: Zet environment variables

Zorg dat deze variabelen zijn ingesteld in je `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Stap 3: Run het migratiescript

```bash
npx tsx scripts/migrate-portfolios-to-db.ts
```

Het script zal:
- ✅ Alle portfolio's uit `portfolio-data.js` lezen
- ✅ Elke foto naar de database migreren
- ✅ Portfolio order opslaan
- ✅ Duplicaten overslaan
- ✅ Een samenvatting tonen

## Optie 2: Handmatige SQL Migratie

Als je liever handmatig migreert:

1. Open `public/portfolio-data.js`
2. Kopieer de `STATIC_PORTFOLIO_DATA`
3. Gebruik `database/migrate-portfolios-simple.sql` als template
4. Maak INSERT statements voor elke member

**Let op:** Dit is tijdrovend en foutgevoelig. Gebruik Optie 1 als mogelijk.

## Wat gebeurt er tijdens migratie?

1. **Foto metadata wordt opgeslagen** in `portfolio_data` tabel
   - `member_name`: Naam van het lid
   - `photo_data`: JSON object met src, title, category, isUserUploaded

2. **Foto order wordt opgeslagen** in `portfolio_order` tabel
   - `member_name`: Naam van het lid
   - `photo_order`: Array van foto src's in volgorde

3. **Foto bestanden blijven op de server**
   - De foto's zelf worden NIET gekopieerd
   - Ze blijven staan in `public/images/portfolio/[member-name]/`

## Na migratie

Na de migratie:
- ✅ Portfolio's worden geladen uit de database
- ✅ Fallback naar `portfolio-data.js` blijft werken
- ✅ Nieuwe foto's worden automatisch in de database opgeslagen

## Troubleshooting

### "Kon STATIC_PORTFOLIO_DATA niet vinden"
- Controleer of `public/portfolio-data.js` bestaat
- Controleer of het bestand de juiste structuur heeft

### "Duplicate key error"
- Dit betekent dat de foto al in de database staat
- Het script slaat deze automatisch over

### "Unauthorized" errors
- Controleer je Supabase credentials
- Controleer of de anon key de juiste rechten heeft

## Verificatie

Na migratie, controleer:

```sql
-- Check hoeveel portfolio's er zijn
SELECT member_name, COUNT(*) as photo_count 
FROM portfolio_data 
GROUP BY member_name 
ORDER BY member_name;

-- Check portfolio order
SELECT member_name, jsonb_array_length(photo_order) as order_count
FROM portfolio_order;
```


