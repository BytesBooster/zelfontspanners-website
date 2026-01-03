# Foto's Converteren naar Base64

## Probleem
De foto's in de database zijn opgeslagen als `relative_path` (bijv. `images/portfolio/...`), maar je wilt dat ze volledig in de database staan als base64, zodat er geen serverbestanden nodig zijn.

## Oplossing

### Stap 1: Zorg dat je in de juiste directory bent

**Lokaal (Windows):**
```powershell
cd C:\Users\jrdhn\Desktop\websites\zelfontspanner.nl
```

**Op de server (via SSH):**
```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
```

### Stap 2: Installeer dependencies (als nog niet gedaan)

```bash
npm install --legacy-peer-deps
```

### Stap 3: Zorg dat environment variables zijn ingesteld

**Lokaal:** Maak een `.env.local` bestand met:
```
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds
```

**Op de server:** De `.env` file zou al moeten bestaan.

### Stap 4: Run het conversie script

**Optie A: Via npm script (aanbevolen):**
```bash
npm run convert-photos
```

**Optie B: Direct met tsx:**
```bash
npx tsx scripts/convert-photos-to-base64.ts
```

## Wat het script doet:

1. ✅ Haalt alle foto's op uit de database
2. ✅ Controleert welke nog geen base64 zijn
3. ✅ Laadt elke foto (lokaal of van live server)
4. ✅ Converteert naar base64
5. ✅ Update de database met base64 data

## Belangrijk:

- ⚠️ **Dit script moet worden uitgevoerd als TypeScript/Node.js script, NIET als SQL query!**
- ⚠️ Gebruik `npm run convert-photos` of `npx tsx scripts/convert-photos-to-base64.ts`
- ⚠️ Run het NIET in een SQL client of database tool

## Troubleshooting:

### Error: "Failed to run sql query"
**Oorzaak:** Je probeert het script uit te voeren als SQL query.
**Oplossing:** Gebruik `npm run convert-photos` of `npx tsx scripts/convert-photos-to-base64.ts` in de terminal.

### Error: "tsx not found"
**Oplossing:**
```bash
npm install --legacy-peer-deps
```

### Error: "Environment variables not set"
**Oplossing:** Zorg dat `.env.local` (lokaal) of `.env` (server) bestaat met de Supabase credentials.

### Foto's worden niet gevonden
Het script probeert foto's te laden:
1. Eerst lokaal (als je ze lokaal hebt staan)
2. Dan van de live server (`https://zelfontspanners.nl/...`)

Als foto's niet gevonden worden, controleer:
- Bestaan de foto's op de live server?
- Zijn de paden correct in de database?

## Na conversie:

Na het succesvol runnen van het script:
- ✅ Alle foto's staan als base64 in de database
- ✅ Geen serverbestanden meer nodig
- ✅ Hero slider werkt direct met base64-images
- ✅ Werkt ook lokaal zonder serverbestanden

## Verificatie:

Check hoeveel foto's zijn geconverteerd:
```sql
SELECT 
    COUNT(*) FILTER (WHERE photo_data->>'src' LIKE 'data:image%') as base64_count,
    COUNT(*) FILTER (WHERE photo_data->>'src' NOT LIKE 'data:image%') as path_count,
    COUNT(*) as total
FROM portfolio_data;
```

Als `path_count` 0 is, zijn alle foto's geconverteerd! 🎉

