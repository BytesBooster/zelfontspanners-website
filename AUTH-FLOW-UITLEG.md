# Authenticatie Flow - Hoe het werkt

## Overzicht

Het login- en password reset systeem werkt volledig via Next.js routes en Supabase database. Geen modals meer - alles gebeurt via normale pagina's.

---

## 1. INLOGGEN (`/login`)

### Stap-voor-stap flow:

1. **Pagina laadt** (`app/login/page.tsx`)
   - Initialiseert accounts in database (maakt ze aan als ze niet bestaan)
   - Laadt ledenlijst in dropdown
   - Controleert of gebruiker al ingelogd is

2. **Gebruiker vult formulier in**
   - Selecteert naam uit dropdown
   - Voert wachtwoord in
   - Klikt op "Inloggen"

3. **Login API call** (`/api/accounts/login`)
   - Verifieert gebruiker in Supabase database
   - Controleert wachtwoord (exact match, case-sensitive)
   - Controleert of password reset vereist is:
     - `password_reset_required = true` in database
     - OF wachtwoord is een default password (`Welkom2026!`, `welkom2026!`, `test123`)

4. **Session wordt opgeslagen**
   - Slaat session op in `localStorage` met:
     - `memberName`
     - `timestamp`
     - `requiresPasswordChange` (true/false)

5. **Redirect**
   - **Als password reset vereist**: → `/change-password`
   - **Anders**: → `/` (homepage)

---

## 2. PASSWORD RESET (`/change-password`)

### Wanneer wordt dit getoond?

- Direct na login als `requiresPasswordChange = true`
- Automatisch redirect als gebruiker al ingelogd is en password reset vereist is

### Stap-voor-stap flow:

1. **Pagina controleert toegang**
   - Moet ingelogd zijn
   - Moet password reset vereist hebben
   - Anders → redirect naar `/login` of `/`

2. **Gebruiker vult formulier in**
   - Huidig wachtwoord (moet kloppen)
   - Nieuw wachtwoord (minimaal 6 tekens)
   - Bevestig nieuw wachtwoord (moet overeenkomen)

3. **Change Password API call** (`/api/accounts/change-password`)
   - Verifieert huidig wachtwoord
   - Controleert validatie (lengte, verschillend van oud)
   - Update database:
     - Nieuw wachtwoord opslaan
     - `password_reset_required = false` zetten
     - `updated_at` updaten

4. **Session wordt geüpdatet**
   - `requiresPasswordChange` wordt `false` in session

5. **Redirect**
   - → `/` (homepage)

---

## 3. SESSION MANAGEMENT

### Hoe werkt de session?

- **Opslag**: `localStorage` met key `currentSession`
- **Inhoud**:
  ```json
  {
    "memberName": "Naam van gebruiker",
    "timestamp": "2026-01-02T16:00:00.000Z",
    "requiresPasswordChange": false
  }
  ```
- **Geldigheid**: 24 uur
- **Multi-tab support**: Via `storage` event listener

### Session checks:

- Elke pagina gebruikt `useAuth()` hook
- Hook controleert `localStorage` session
- Controleert of session niet verlopen is (>24 uur)
- Retourneert: `isLoggedIn`, `currentUser`, `requiresPasswordChange`, `isLoading`

---

## 4. PASSWORD RESET VEREIST - Logica

### Wanneer is password reset vereist?

1. **Database flag**: `password_reset_required = true`
2. **Default passwords**: Wachtwoord is één van:
   - `Welkom2026!`
   - `welkom2026!`
   - `test123`

### Waar wordt dit gecontroleerd?

- **Bij login**: API route (`/api/accounts/login`) controleert beide voorwaarden
- **Na login**: Session bevat `requiresPasswordChange` flag
- **Op pagina's**: `useAuth()` hook geeft `requiresPasswordChange` terug

---

## 5. ADMIN PASSWORD RESET (`/admin/reset-password`)

### Flow:

1. **Admin authenticatie**
   - Admin voert admin wachtwoord in (`Welkom2026!` of `welkom2026!`)
   - Krijgt toegang tot reset pagina

2. **Reset opties**:
   - **Reset alle wachtwoorden**: Reset alle accounts naar standaard wachtwoord
   - **Reset individueel**: Reset één account

3. **Reset API** (`/api/accounts/reset-password`)
   - Verifieert admin wachtwoord
   - Update account:
     - Nieuw wachtwoord opslaan
     - `password_reset_required = true` zetten
     - `updated_at` updaten

4. **Gebruiker moet opnieuw inloggen**
   - Oude session wordt ongeldig
   - Bij volgende login → password reset vereist

---

## 6. BEVEILIGING & VALIDATIE

### Password validatie:

- **Minimaal 6 tekens** (client + server side)
- **Case-sensitive** matching
- **Geen hashing** (momenteel plain text in database - kan verbeterd worden)

### Session beveiliging:

- **24 uur expiry** - automatisch uitgelogd na 24 uur
- **localStorage** - kan door gebruiker gewist worden
- **Multi-tab sync** - logout in één tab logt uit in alle tabs

### Toegangscontrole:

- **Portfolio beheer**: Alleen eigen portfolio (`canAccessPortfolio()`)
- **Admin pagina's**: Admin wachtwoord vereist
- **Protected routes**: Check `isLoggedIn` in `useAuth()`

---

## 7. DATABASE STRUCTUUR

### `member_accounts` tabel:

```sql
- id (bigint, primary key)
- member_name (text, unique)
- password (text) - momenteel plain text
- password_reset_required (boolean, default false)
- is_admin (boolean, default false)
- created_at (timestamp)
- updated_at (timestamp)
```

---

## 8. TYPISCHE USER FLOWS

### Flow 1: Nieuwe gebruiker (eerste keer inloggen)

```
1. Gebruiker gaat naar /login
2. Selecteert naam, voert "Welkom2026!" in
3. Login succesvol → requiresPasswordChange = true
4. Redirect naar /change-password
5. Gebruiker wijzigt wachtwoord
6. password_reset_required = false in database
7. Redirect naar / (homepage)
```

### Flow 2: Bestaande gebruiker (normale login)

```
1. Gebruiker gaat naar /login
2. Selecteert naam, voert eigen wachtwoord in
3. Login succesvol → requiresPasswordChange = false
4. Redirect naar / (homepage)
```

### Flow 3: Admin reset alle wachtwoorden

```
1. Admin gaat naar /admin/reset-password
2. Voert admin wachtwoord in
3. Reset alle wachtwoorden naar "Welkom2026!"
4. Zet password_reset_required = true voor alle accounts
5. Gebruikers moeten bij volgende login wachtwoord wijzigen
```

### Flow 4: Gebruiker verlaat change-password pagina

```
1. Gebruiker is op /change-password
2. Gebruiker navigeert weg zonder wachtwoord te wijzigen
3. Session blijft geldig (24 uur)
4. Bij volgende bezoek → opnieuw redirect naar /change-password
5. Tot wachtwoord gewijzigd is
```

---

## 9. BELANGRIJKE BESTANDEN

### Frontend:
- `app/login/page.tsx` - Login pagina
- `app/change-password/page.tsx` - Password reset pagina
- `lib/auth.ts` - Auth logic, hooks, session management

### Backend (API routes):
- `app/api/accounts/login/route.ts` - Login endpoint
- `app/api/accounts/change-password/route.ts` - Password change endpoint
- `app/api/accounts/reset-password/route.ts` - Admin reset endpoint

### Database:
- Supabase `member_accounts` tabel
- Columns: `password`, `password_reset_required`, `is_admin`

---

## 10. MOGELIJKE VERBETERINGEN

1. **Password hashing**: Momenteel plain text - zou SHA-256 of bcrypt moeten gebruiken
2. **Session tokens**: In plaats van localStorage, gebruik secure HTTP-only cookies
3. **Rate limiting**: Voorkom brute force attacks
4. **Email verificatie**: Voor password reset via email
5. **Remember me**: Optionele langere session
6. **2FA**: Twee-factor authenticatie voor admin accounts

---

## SAMENVATTING

✅ **Geen modals** - alles via normale pagina's  
✅ **Simpele flow** - login → check password reset → redirect  
✅ **Session in localStorage** - 24 uur geldig  
✅ **Database-driven** - alles in Supabase  
✅ **Multi-tab support** - synchronisatie tussen tabs  
✅ **Admin reset** - mogelijkheid om alle wachtwoorden te resetten  

Het systeem is nu veel simpeler en betrouwbaarder dan voorheen!

