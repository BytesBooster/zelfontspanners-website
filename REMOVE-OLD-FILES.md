# Verwijder Oude Bestanden

Deze oude HTML en JavaScript bestanden moeten verwijderd worden omdat ze nog oude modal code bevatten:

## Te Verwijderen Bestanden:

### HTML Bestanden (oude statische versie):
- `index.html` - Gebruik nu `app/page.tsx`
- `login.html` - Gebruik nu `app/login/page.tsx`  
- `portfolio.html` - Gebruik nu `app/portfolio/page.tsx`
- `portfolio-manage.html` - Gebruik nu `app/portfolio-manage/page.tsx`
- `leden.html` - Gebruik nu `app/leden/page.tsx`
- `contact.html` - Gebruik nu `app/contact/page.tsx`
- `agenda.html` - Gebruik nu `app/agenda/page.tsx`
- `over-ons.html` - Gebruik nu `app/over-ons/page.tsx`
- `sponsors.html` - Gebruik nu `app/sponsors/page.tsx`
- `foto-van-de-maand.html` - Gebruik nu `app/foto-van-de-maand/page.tsx`

### JavaScript Bestanden (oude versie):
- `auth.js` - Gebruik nu `lib/auth.ts`
- `login.js` - Gebruik nu `app/login/page.tsx`
- `portfolio-manage.js` - Gebruik nu `app/portfolio-manage/page.tsx`
- `components.js` - Gebruik nu `components/Navigation.tsx` en `components/Footer.tsx`

## Waarom?

Deze oude bestanden bevatten nog code voor password reset modals die niet meer gebruikt wordt. Next.js gebruikt nu de nieuwe React componenten zonder modals.

## Op Server:

Na deployment, verwijder deze bestanden van de server om te voorkomen dat ze nog geserveerd worden.


