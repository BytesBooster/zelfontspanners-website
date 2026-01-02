# Check Database voor Oude Build File

## Het Probleem
Als de oude build file (`layout-94f0854bcc52beb1.js`) vanuit de database wordt aangeroepen, kan dit de oorzaak zijn.

## Check Methode 1: Via Supabase Dashboard

1. Ga naar je Supabase dashboard
2. Open **SQL Editor**
3. Voer deze query uit:

```sql
-- Check portfolio_data (meest waarschijnlijk)
SELECT id, member_name, photo_data
FROM portfolio_data
WHERE photo_data::text LIKE '%94f0854bcc52beb1%'
   OR photo_data::text LIKE '%layout-94f0854bcc52beb1%';

-- Check agenda events
SELECT id, title, description
FROM agenda_events
WHERE description::text LIKE '%94f0854bcc52beb1%'
   OR title::text LIKE '%94f0854bcc52beb1%';

-- Check foto van de maand
SELECT id, member_name, image_src, title
FROM foto_van_de_maand
WHERE image_src::text LIKE '%94f0854bcc52beb1%'
   OR title::text LIKE '%94f0854bcc52beb1%';

-- Check photo comments
SELECT id, photo_id, member_name, comment
FROM photo_comments
WHERE comment::text LIKE '%94f0854bcc52beb1%';
```

Als deze queries **GEEN** resultaten geven, dan is de database schoon.

## Check Methode 2: Via Browser Console

Open browser console (F12) en voer uit:

```javascript
// Check if old build is referenced in API responses
fetch('/api/portfolio?memberName=all')
  .then(r => r.json())
  .then(data => {
    const str = JSON.stringify(data);
    if (str.includes('94f0854bcc52beb1') || str.includes('layout-94f0854bcc52beb1')) {
      console.error('❌ FOUND in portfolio API!', data);
    } else {
      console.log('✅ Portfolio API is clean');
    }
  });

fetch('/api/agenda')
  .then(r => r.json())
  .then(data => {
    const str = JSON.stringify(data);
    if (str.includes('94f0854bcc52beb1')) {
      console.error('❌ FOUND in agenda API!', data);
    } else {
      console.log('✅ Agenda API is clean');
    }
  });
```

## Als er iets gevonden wordt:

### Clean portfolio_data:
```sql
UPDATE portfolio_data
SET photo_data = jsonb_set(photo_data, '{src}', to_jsonb(replace(photo_data->>'src', 'layout-94f0854bcc52beb1.js', '')))
WHERE photo_data::text LIKE '%94f0854bcc52beb1%';
```

### Clean agenda_events:
```sql
UPDATE agenda_events
SET description = replace(description, 'layout-94f0854bcc52beb1.js', '')
WHERE description LIKE '%94f0854bcc52beb1%';
```

## Waarschijnlijkheid

**Zeer onwaarschijnlijk** dat de database de oude build file bevat, omdat:
- Database bevat alleen data (foto's, events, accounts)
- Geen HTML/JavaScript content wordt opgeslagen
- Build files worden gegenereerd door Next.js, niet opgeslagen in database

Maar het is **de moeite waard om te checken** als browser cache clearing niet werkt.

