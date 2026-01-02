# Migratie naar Database - Compleet Overzicht

## ✅ Wat is er gedaan

Alle functionaliteit is nu gemigreerd van localStorage naar Supabase database.

### 1. Database Setup
- ✅ `lib/db.ts` - Database client met Supabase ondersteuning
- ✅ `database/schema.sql` - Complete database schema
- ✅ Environment variables configuratie

### 2. Accounts & Authenticatie
- ✅ `/api/accounts` - Account beheer (GET, POST, PUT)
- ✅ `/api/accounts/login` - Login functionaliteit
- ✅ `/api/accounts/change-password` - Wachtwoord wijzigen
- ✅ `/api/accounts/reset-password` - Admin wachtwoord reset
- ✅ `lib/auth.ts` - Volledig gemigreerd naar API calls

### 3. Portfolio Data
- ✅ `/api/portfolio` - Portfolio foto's beheer (GET, POST, PUT, DELETE)
- ✅ `/api/portfolio/likes` - Likes functionaliteit
- ✅ `/api/portfolio/comments` - Comments functionaliteit

### 4. Agenda
- ✅ `/api/agenda` - Agenda events (GET, POST, PUT, DELETE)

### 5. Foto van de Maand
- ✅ `/api/foto-van-de-maand` - Submissions en votes (GET, POST, PUT)

## 📋 Volgende Stappen

### 1. Lib Bestanden Aanpassen

De volgende lib bestanden moeten worden aangepast om API calls te gebruiken:

- `lib/portfolio.ts` - Portfolio data laden/opslaan
- `lib/agenda.ts` - Agenda events laden/opslaan  
- `lib/foto-van-de-maand.ts` - Foto van de maand submissions

### 2. Pagina's Aanpassen

Pagina's die deze lib functies gebruiken moeten mogelijk worden aangepast voor async/await:

- `app/portfolio/page.tsx`
- `app/portfolio-manage/page.tsx`
- `app/agenda/page.tsx`
- `app/foto-van-de-maand/page.tsx`

### 3. Database Schema Uitvoeren

Voer `database/schema.sql` uit in je Supabase project.

### 4. Environment Variables

Zet deze in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

## 🔄 Migratie Strategie

1. **Accounts** - ✅ Volledig gemigreerd
2. **Portfolio** - API endpoints klaar, lib bestanden moeten worden aangepast
3. **Agenda** - API endpoints klaar, lib bestanden moeten worden aangepast
4. **Foto van de Maand** - API endpoints klaar, lib bestanden moeten worden aangepast
5. **Likes/Comments** - API endpoints klaar, lib bestanden moeten worden aangepast

## ⚠️ Belangrijk

- Alle localStorage calls moeten worden vervangen door API calls
- Functies worden async, dus gebruik async/await
- Error handling moet worden toegevoegd voor database errors
- Loading states moeten worden toegevoegd waar nodig


