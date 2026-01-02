# Environment Variables Setup

## Stap 1: Maak .env.local bestand aan

Maak een bestand genaamd `.env.local` in de root van het project met de volgende inhoud:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Stap 2: Vind je Supabase credentials

1. Ga naar [supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecteer je project
3. Ga naar **Settings** > **API**
4. Kopieer:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Stap 3: Plak de waarden in .env.local

Vervang `your-project.supabase.co` en `your-anon-key-here` met je echte waarden.

## Voorbeeld

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.example
```

## Belangrijk

- ✅ `.env.local` wordt NIET gecommit naar Git (staat in .gitignore)
- ✅ Gebruik NOOIT je `service_role` key in de frontend
- ✅ Gebruik alleen de `anon` key voor client-side code

## Test

Na het aanmaken van `.env.local`, test of het werkt:

```bash
npx tsx scripts/migrate-portfolios-to-db.ts
```

Je zou nu geen "environment variables moeten zijn ingesteld" error meer moeten krijgen.

