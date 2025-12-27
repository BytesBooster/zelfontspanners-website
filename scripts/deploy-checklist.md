# ✅ Deployment Checklist

Gebruik deze checklist tijdens het deployen naar je Plesk server.

## Voor Deployment

- [ ] Lokale build werkt (`npm run build`)
- [ ] Alle tests zijn geslaagd
- [ ] Environment variables zijn klaar
- [ ] Database is geconfigureerd
- [ ] Cloudinary account is actief
- [ ] Domain naam is geregistreerd

## Server Configuratie

- [ ] Plesk toegang geregeld
- [ ] Node.js app aangemaakt in Plesk
- [ ] App root pad genoteerd
- [ ] Node.js versie geselecteerd (18.x of 20.x LTS)
- [ ] Port ingesteld (meestal 3000)

## Environment Variables

- [ ] `NODE_ENV=production` ingesteld
- [ ] `PORT=3000` ingesteld
- [ ] `NEXT_PUBLIC_SUPABASE_URL` ingesteld
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` ingesteld
- [ ] `CLOUDINARY_CLOUD_NAME` ingesteld
- [ ] `CLOUDINARY_API_KEY` ingesteld
- [ ] `CLOUDINARY_API_SECRET` ingesteld

## Bestanden Uploaden

- [ ] `.next/standalone/` geüpload
- [ ] `.next/standalone/.next/static/` bestaat
- [ ] `public/` folder geüpload
- [ ] `package.json` geüpload
- [ ] Dependencies geïnstalleerd (`npm install --production`)

## SSL Certificaat

- [ ] Let's Encrypt certificaat aangevraagd
- [ ] Certificaat geïnstalleerd
- [ ] "Redirect HTTP to HTTPS" aangezet
- [ ] SSL werkt (groen slotje in browser)

## DNS Instellingen

- [ ] A Record voor root domain (@) ingesteld
- [ ] A Record voor www ingesteld
- [ ] DNS propagation gecheckt (https://www.whatsmydns.net/)
- [ ] Domain wijst naar juiste IP adres

## App Starten

- [ ] Node.js app gestart in Plesk
- [ ] Geen errors in logs
- [ ] App draait op correcte poort

## Testing

- [ ] Website laadt op `https://jouw-domein.nl`
- [ ] SSL certificaat werkt
- [ ] Alle pagina's laden
- [ ] Foto's worden geladen (Cloudinary)
- [ ] Database queries werken (Supabase)
- [ ] Login werkt
- [ ] Foto upload werkt
- [ ] Portfolio beheer werkt
- [ ] Foto van de Maand werkt
- [ ] Agenda werkt
- [ ] Contactformulier werkt
- [ ] Geen console errors

## Post-Deployment

- [ ] Backups ingesteld
- [ ] Monitoring ingesteld
- [ ] Update proces gedocumenteerd
- [ ] Team geïnformeerd over nieuwe URL

## Notities

- Server IP: ________________
- Domain: ________________
- Plesk versie: ________________
- Node.js versie: ________________
- Deployment datum: ________________


