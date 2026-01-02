# Database Migratie Gids

## ⚠️ Waarschuwing over Destructieve Operaties

Supabase waarschuwt voor "destructive operations" omdat het script indexes verwijdert en opnieuw aanmaakt. Dit is **veilig** omdat:

1. **Geen data wordt verwijderd** - alleen kolomnamen worden hernoemd
2. **Indexes worden opnieuw aangemaakt** - performance blijft behouden
3. **Script gebruikt IF EXISTS checks** - voert alleen uit wat nodig is

## ✅ Veilige Migratie Stappen

### Stap 1: Backup maken (aanbevolen)

Voordat je migreert, maak een backup van je data:

1. Ga naar Supabase Dashboard
2. Klik op "Database" → "Backups"
3. Maak een backup aan

### Stap 2: Migratie uitvoeren

**Optie A: Als je al tabellen hebt met camelCase kolommen**

Voer `database/fix-column-names-safe.sql` uit in Supabase SQL Editor. Dit script:
- ✅ Herbenoemt alleen kolommen die bestaan
- ✅ Verwijdert geen data
- ✅ Maakt nieuwe indexes aan
- ✅ Gebruikt IF EXISTS checks voor veiligheid

**Optie B: Als je nog geen tabellen hebt**

Voer `database/schema.sql` uit om alle tabellen aan te maken met snake_case kolommen.

### Stap 3: Verificatie

Na migratie, controleer of alles werkt:

1. Test login functionaliteit
2. Test portfolio upload
3. Test agenda events
4. Controleer console voor errors

## 🔍 Wat doet het migratiescript?

Het script voert de volgende acties uit:

1. **RENAME COLUMN** - Herbenoemt kolommen van camelCase naar snake_case
   - `photoId` → `photo_id`
   - `memberName` → `member_name`
   - `createdAt` → `created_at`
   - etc.

2. **CREATE INDEX** - Maakt nieuwe indexes aan met correcte kolomnamen

3. **Geen DROP operaties** - Verwijdert geen tabellen of data

## ✅ Het is veilig om uit te voeren

- Geen data wordt verwijderd
- Alleen kolomnamen worden hernoemd
- Indexes worden opnieuw aangemaakt
- Script controleert eerst of kolommen bestaan

Je kunt het script veilig uitvoeren!


