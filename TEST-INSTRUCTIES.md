# 🧪 Test Instructies - De Zelfontspanners Website

## ✅ Build Status
- ✅ Build werkt zonder errors (`npm run build`)
- ✅ TypeScript errors opgelost
- ✅ Scripts uitgesloten van build

---

## 📋 Test Checklist

### 1. Database Cleanup (EERST DOEN!)
**Voordat je gaat testen, verwijder test data:**

1. Ga naar Supabase Dashboard → SQL Editor
2. Kopieer en plak de inhoud van `scripts/clear-all-likes-comments.sql`
3. Klik op "Run"
4. Controleer dat alle likes en comments zijn verwijderd

---

### 2. Environment Variables Controleren

**Zorg dat deze variabelen bestaan in `.env.local` (lokaal) en op productie:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
CLOUDINARY_CLOUD_NAME=dp9lcxbfu
CLOUDINARY_API_KEY=877964424671325
CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0
```

**Test:**
- [ ] Website laadt zonder errors
- [ ] Foto's worden geladen (Cloudinary)
- [ ] Database queries werken (Supabase)

---

### 3. Authenticatie Testen

**Login Test:**
1. Ga naar `/login`
2. Selecteer een lid (bijv. "Hans Haarsma")
3. Voer wachtwoord in: `test123`
4. Klik op "Inloggen"

**Verwacht gedrag:**
- [ ] Je wordt doorgestuurd naar `/change-password` (eerste keer)
- [ ] Je moet een nieuw wachtwoord instellen (minimaal 6 karakters)
- [ ] Na wachtwoord wijzigen word je doorgestuurd naar portfolio-beheer
- [ ] Bij volgende login met nieuw wachtwoord ga je direct naar portfolio-beheer

**Test ook:**
- [ ] Logout werkt
- [ ] Protected routes werken (portfolio-beheer zonder login geeft redirect)

---

### 4. Portfolio Beheer Testen

**Upload Test:**
1. Log in
2. Ga naar portfolio-beheer
3. Klik op "Foto's Toevoegen"
4. Selecteer 1-5 JPEG foto's (max 5MB per foto)
5. Geef optioneel een titel op
6. Klik op "Foto's Toevoegen"

**Verwacht gedrag:**
- [ ] Foto's worden geüpload naar Cloudinary
- [ ] Foto's verschijnen in de lijst
- [ ] Loading state verdwijnt na upload

**Edit Test:**
- [ ] Klik op een foto titel om te bewerken
- [ ] Wijzig de titel
- [ ] Druk op Enter of klik buiten het veld
- [ ] Titel wordt opgeslagen in Supabase

**Delete Test:**
- [ ] Klik op verwijder knop bij een foto
- [ ] Bevestig verwijdering
- [ ] Foto wordt verwijderd uit Cloudinary en Supabase

**Reorder Test:**
- [ ] Sleep een foto naar een andere positie
- [ ] Volgorde wordt opgeslagen in Supabase

---

### 5. Portfolio Bekijken Testen

**Bekijk Portfolio:**
1. Ga naar `/leden`
2. Klik op een lid
3. Bekijk het portfolio

**Verwacht gedrag:**
- [ ] Alle foto's worden geladen
- [ ] Likes/comments worden snel geladen (batch loading)
- [ ] Modal werkt (klik op foto)
- [ ] Navigatie werkt (pijltjes, ESC, keyboard)
- [ ] Likes/comments worden getoond (als ingelogd)

---

### 6. Foto van de Maand Testen

**Upload Test:**
1. Log in
2. Ga naar `/foto-van-de-maand`
3. Klik op "Foto Uploaden"
4. Selecteer een JPEG foto
5. Geef een titel op
6. Upload de foto

**Verwacht gedrag:**
- [ ] Foto wordt geüpload naar Cloudinary
- [ ] Foto verschijnt in de lijst
- [ ] Je kunt maximaal 5 foto's uploaden per maand

**Stemmen Test:**
- [ ] Klik op hartje bij een foto
- [ ] Stem wordt opgeslagen in Supabase
- [ ] Winnaar wordt getoond (meeste stemmen)

---

### 7. Agenda Testen

**Toevoegen Test:**
1. Log in
2. Ga naar `/agenda`
3. Klik op "Evenement Toevoegen"
4. Vul formulier in:
   - Titel: "Test Evenement"
   - Datum: Kies een datum
   - Tijd: (optioneel)
   - Locatie: (optioneel)
   - Beschrijving: (optioneel)
   - Icoon: 📅
5. Klik op "Evenement Toevoegen"

**Verwacht gedrag:**
- [ ] Evenement wordt opgeslagen in Supabase
- [ ] Evenement verschijnt in de lijst
- [ ] Evenement wordt getoond op homepage (als toekomstig)

**Verwijderen Test:**
- [ ] Klik op verwijder knop bij een evenement
- [ ] Evenement wordt verwijderd uit Supabase

---

### 8. Contactformulier Testen

**Formulier Test:**
1. Ga naar `/contact`
2. Vul formulier in:
   - Naam: "Test Gebruiker"
   - Email: "test@example.com"
   - Telefoon: (optioneel)
   - Bericht: "Dit is een test bericht"
   - Foto's: (optioneel, max 5 JPEG)
3. Klik op "Verzenden"

**Verwacht gedrag:**
- [ ] Validatie werkt (email format, verplichte velden)
- [ ] Email wordt verzonden via EmailJS
- [ ] Success message wordt getoond
- [ ] Fallback mailto werkt als EmailJS faalt

---

### 9. Performance Testen

**Controleer:**
- [ ] Pagina's laden snel (< 2 seconden)
- [ ] Foto's laden snel (Cloudinary)
- [ ] Likes/comments laden snel (batch loading, < 1 seconde voor 500 foto's)
- [ ] Geen console errors
- [ ] Geen flickering bij navigatie

**Test met veel foto's:**
- [ ] Portfolio met 500+ foto's laadt snel
- [ ] Likes/comments worden snel geladen (batch)
- [ ] Geen memory leaks

---

### 10. Responsive Design Testen

**Test op verschillende schermen:**
- [ ] Desktop (1920x1080) - Alles werkt
- [ ] Laptop (1366x768) - Alles werkt
- [ ] Tablet (768x1024) - Mobile menu werkt
- [ ] Mobiel (375x667) - Mobile menu werkt, formulieren zijn gebruiksvriendelijk

---

### 11. Browser Compatibiliteit Testen

**Test in verschillende browsers:**
- [ ] Chrome (laatste versie)
- [ ] Firefox (laatste versie)
- [ ] Safari (laatste versie)
- [ ] Edge (laatste versie)

**Controleer:**
- [ ] Geen console errors
- [ ] Alle functionaliteit werkt
- [ ] Styling is consistent

---

## 🚨 Belangrijke Punten

### Voor Productie:
1. ✅ **Build werkt** - `npm run build` zonder errors
2. ⚠️ **Database cleanup** - Verwijder test likes/comments
3. ⚠️ **Environment variables** - Zet op productie server
4. ⚠️ **Wachtwoorden** - Alle gebruikers moeten wachtwoord wijzigen bij eerste login
5. ✅ **Performance** - Batch loading geïmplementeerd
6. ✅ **Security** - Wachtwoorden zijn gehasht

### Optionele Verbeteringen:
- [ ] Favicon toevoegen
- [ ] Open Graph meta tags
- [ ] 404 pagina
- [ ] Google Analytics (optioneel)
- [ ] Sitemap genereren

---

## ✅ Klaar Voor Launch?

Als alle items hierboven zijn getest en werken, dan is de website klaar om live te gaan!

**Laatste stappen:**
1. Test alles lokaal
2. Build maken (`npm run build`)
3. Test build lokaal (`npm start`)
4. Deploy naar productie
5. Test alles op productie server
6. Monitor voor errors


