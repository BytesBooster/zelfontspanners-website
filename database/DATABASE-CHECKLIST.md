# Database Checklist - Nieuwe Login Systeem

## ✅ Wat moet er in de database zijn:

### 1. Tabel: `accounts`
Deze tabel moet de volgende kolommen hebben:

- ✅ `id` (SERIAL PRIMARY KEY)
- ✅ `member_name` (VARCHAR(255) UNIQUE NOT NULL)
- ✅ `password` (VARCHAR(255) NOT NULL) - **Plain text** (geen hashing)
- ✅ `password_reset_required` (BOOLEAN DEFAULT FALSE) - **BELANGRIJK voor nieuwe systeem**
- ✅ `is_admin` (BOOLEAN DEFAULT FALSE) - **BELANGRIJK voor admin functionaliteit**
- ✅ `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
- ✅ `updated_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### 2. Wat NIET meer nodig is:

- ❌ `password_hash` kolom - **Verwijderen** (gebruiken nu plain text `password`)
- ❌ `member_accounts` tabel - **Niet gebruiken** (gebruiken `accounts` tabel)

---

## 🔍 Verificatie Script

Voer dit script uit in Supabase SQL Editor:

```sql
-- Zie: database/verify-and-fix-accounts-table.sql
```

Dit script:
1. Controleert huidige structuur
2. Voegt `password_reset_required` toe als deze ontbreekt
3. Voegt `is_admin` toe als deze ontbreekt
4. Verwijdert oude `password_hash` kolom (als deze bestaat)
5. Update accounts met standaard wachtwoorden
6. Toont overzicht en statistieken

---

## 📋 Stappen om Database te Controleren:

### Stap 1: Check huidige structuur
```sql
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'accounts'
ORDER BY ordinal_position;
```

**Verwacht resultaat:**
- `id`
- `member_name`
- `password`
- `password_reset_required` ← **MOET AANWEZIG ZIJN**
- `is_admin` ← **MOET AANWEZIG ZIJN**
- `created_at`
- `updated_at`

### Stap 2: Check of oude kolommen bestaan
```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'accounts' 
AND column_name IN ('password_hash');
```

**Als `password_hash` bestaat:** Verwijder deze (niet meer nodig)

### Stap 3: Check accounts status
```sql
SELECT 
    member_name,
    password_reset_required,
    is_admin,
    created_at
FROM accounts
ORDER BY member_name;
```

---

## ⚠️ Belangrijke Punten:

1. **Password is plain text** - Momenteel geen hashing (kan later toegevoegd worden)
2. **password_reset_required** - Deze kolom is **ESSENTIEEL** voor het nieuwe systeem
3. **is_admin** - Deze kolom is nodig voor admin functionaliteit
4. **Tabel naam is `accounts`** - Niet `member_accounts`

---

## 🚀 Als Kolommen Ontbreken:

Voer dit uit om kolommen toe te voegen:

```sql
-- Voeg password_reset_required toe
ALTER TABLE accounts 
ADD COLUMN IF NOT EXISTS password_reset_required BOOLEAN DEFAULT FALSE;

-- Voeg is_admin toe
ALTER TABLE accounts 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;
```

---

## ✅ Na Verificatie:

Als alles correct is:
- ✅ `accounts` tabel heeft alle benodigde kolommen
- ✅ Geen `password_hash` kolom meer
- ✅ Geen `member_accounts` tabel
- ✅ Alle accounts hebben `password_reset_required` en `is_admin` kolommen

Dan is de database klaar voor het nieuwe login systeem! 🎉


