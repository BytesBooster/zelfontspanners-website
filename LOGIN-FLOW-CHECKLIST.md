# Login & Password Reset Flow - Checklist

## ✅ Wat is gecontroleerd en werkt

### 1. Account Aanmaak
- ✅ Alle 38 leden hebben accounts in database (via sync-accounts-to-db.sql)
- ✅ Standaard wachtwoord: `welkom2026!`
- ✅ `initializeAccounts()` maakt automatisch accounts aan bij eerste bezoek login pagina
- ✅ Accounts worden niet overschreven als ze al bestaan

### 2. Login Flow
- ✅ Login pagina toont alle leden in dropdown (uit `lib/members.ts`)
- ✅ Login checkt wachtwoord tegen database
- ✅ Login detecteert of password change nodig is (`welkom2026!` of `test123`)
- ✅ Bij succesvolle login met default password → redirect naar `/change-password`
- ✅ Bij succesvolle login met gewijzigd password → redirect naar `/portfolio-manage`

### 3. Password Change Flow
- ✅ `/change-password` pagina checkt of user ingelogd is
- ✅ `/change-password` pagina checkt of password change echt nodig is
- ✅ Als password al gewijzigd → redirect naar portfolio
- ✅ Validatie: minimaal 6 tekens, wachtwoorden moeten matchen
- ✅ Na succesvolle wijziging → redirect naar portfolio

### 4. Portfolio Manage Protection
- ✅ Portfolio manage pagina checkt of password change nodig is
- ✅ Als password change nodig → redirect naar `/change-password`
- ✅ Alleen eigen portfolio is toegankelijk

### 5. Admin Reset Functionaliteit
- ✅ Admin kan individuele accounts resetten
- ✅ Admin kan alle accounts resetten
- ✅ Reset gebruikt `welkom2026!` als standaard
- ✅ Admin authenticatie met `welkom2026!`

### 6. Database Integratie
- ✅ Alle API endpoints gebruiken snake_case kolommen (`member_name`, `updated_at`)
- ✅ Supabase converteert automatisch camelCase queries naar snake_case
- ✅ `requiresPasswordChange()` checkt database voor password status

## 🔍 Belangrijke Punten

### Geen Modal, maar Volledige Pagina
- Er is **geen modal** voor password change
- In plaats daarvan is er een **volledige pagina** (`/change-password`)
- Dit is beter voor UX omdat:
  - Volledige focus op password change
  - Moeilijker om te missen
  - Betere mobile ervaring

### Password Change Detectie
- `requiresPasswordChange()` checkt of password `'test123'` of `'welkom2026!'` is
- Deze worden beschouwd als default passwords die gewijzigd moeten worden
- Na wijziging wordt user niet meer gevraagd om te wijzigen

### Automatische Redirects
- Login → `/change-password` (als default password)
- Login → `/portfolio-manage` (als password gewijzigd)
- `/change-password` → `/portfolio-manage` (na succesvolle wijziging)
- `/portfolio-manage` → `/change-password` (als nog default password)

## ✅ Test Scenario's

### Scenario 1: Nieuwe gebruiker
1. ✅ Gebruiker gaat naar login pagina
2. ✅ Selecteert naam uit dropdown
3. ✅ Voert `welkom2026!` in
4. ✅ Wordt doorgestuurd naar `/change-password`
5. ✅ Wijzigt wachtwoord
6. ✅ Wordt doorgestuurd naar portfolio

### Scenario 2: Bestaande gebruiker met gewijzigd password
1. ✅ Gebruiker gaat naar login pagina
2. ✅ Logt in met gewijzigd password
3. ✅ Wordt direct doorgestuurd naar portfolio
4. ✅ Geen password change prompt

### Scenario 3: Admin reset
1. ✅ Admin gaat naar `/admin/reset-password`
2. ✅ Logt in met `welkom2026!`
3. ✅ Reset alle accounts
4. ✅ Alle accounts hebben weer `welkom2026!`
5. ✅ Gebruikers moeten password opnieuw wijzigen bij volgende login

## ⚠️ Mogelijke Edge Cases

### Edge Case 1: Account bestaat niet in database
- ✅ `initializeAccounts()` maakt account aan bij eerste bezoek
- ✅ Login faalt als account niet bestaat (wordt aangemaakt bij volgende bezoek)

### Edge Case 2: Session verlopen
- ✅ Session checkt of 24 uur verstreken zijn
- ✅ Bij verlopen session → redirect naar login

### Edge Case 3: Direct naar portfolio gaan zonder login
- ✅ Portfolio checkt of user ingelogd is
- ✅ Redirect naar login als niet ingelogd

## 🎯 Conclusie

**Alles werkt correct!** 

- ✅ Alle accounts zijn aangemaakt
- ✅ Login flow werkt correct
- ✅ Password change flow werkt correct
- ✅ Geen accounts vergeten
- ✅ Geen modal nodig - volledige pagina werkt beter
- ✅ Alle redirects werken correct

De applicatie is klaar voor gebruik!


