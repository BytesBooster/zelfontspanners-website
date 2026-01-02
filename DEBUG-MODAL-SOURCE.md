# Debug: Waar komt de modal vandaan?

## Stap 1: Check Server Bestanden

Voer dit script uit op de server:

```bash
bash check-server-files.sh
```

Of zoek handmatig:

```bash
cd /var/www/vhosts/zelfontspanners.nl/nodejs
grep -r "Wijzig je wachtwoord voor extra" .
grep -r "Wachtwoord Instellen Vereist" .
grep -r "password-change-modal" .
```

## Stap 2: Check Browser Console

1. Open de website in je browser
2. Druk F12 om Developer Tools te openen
3. Ga naar de Console tab
4. Log in op de website
5. Kijk naar `[DEBUG]` logs - deze tonen waar modals vandaan komen

De debug code in `app/layout.tsx` logt:
- Wanneer een modal wordt gedetecteerd
- Welk element het is
- Welke scripts zijn geladen
- Stack trace van waar het vandaan komt

## Stap 3: Check Network Tab

1. Open Developer Tools (F12)
2. Ga naar Network tab
3. Herlaad de pagina
4. Filter op "JS" of "HTML"
5. Check welke bestanden worden geladen
6. Kijk of er oude `.js` of `.html` bestanden worden geladen

## Stap 4: Check Sources Tab

1. Open Developer Tools (F12)
2. Ga naar Sources tab
3. Zoek naar bestanden met "password" of "modal" in de naam
4. Check of er oude bestanden zijn die nog worden geladen

## Stap 5: Check Element Inspector

1. Open Developer Tools (F12)
2. Klik op de modal met de inspect tool
3. Kijk naar het element in de Elements tab
4. Check de `id` en `class` attributen
5. Rechtsklik op het element → "Copy" → "Copy element"
6. Dit toont de exacte HTML structuur

## Mogelijke Bronnen:

1. **Oude HTML bestanden** op de server:
   - `login.html`
   - `portfolio-manage.html`
   - Andere `.html` bestanden

2. **Oude JavaScript bestanden**:
   - `auth.js`
   - `login.js`
   - `portfolio-manage.js`
   - `components.js`

3. **Browser Cache**:
   - Hard refresh: Ctrl+Shift+R (Windows) of Cmd+Shift+R (Mac)
   - Of gebruik incognito/private mode

4. **Service Worker**:
   - Check Application tab → Service Workers
   - Unregister als er een actief is

5. **Next.js Build Cache**:
   - `.next` directory op server
   - Mogelijk oude build die nog wordt geserveerd

## Oplossing:

Als je de bron hebt gevonden:

1. **Verwijder oude bestanden** op de server
2. **Clear browser cache**
3. **Herstart PM2**: `pm2 restart zelfontspanners`
4. **Rebuild Next.js**: `npm run build` op server


