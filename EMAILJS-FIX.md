# 🔧 EmailJS Template ID Error - Oplossing

## Probleem
Je krijgt de error: `The template ID not found`

Dit betekent dat de EmailJS template ID `template_xpgqnpc` niet bestaat in je EmailJS account.

## Oplossing

### Optie 1: Template ID Controleren/Updaten

1. **Log in op EmailJS Dashboard:**
   - Ga naar: https://dashboard.emailjs.com/admin/templates

2. **Zoek je template:**
   - Kijk of er een template bestaat met de naam "Contactformulier De Zelfontspanners"
   - Of maak een nieuwe template aan

3. **Kopieer de Template ID:**
   - De Template ID staat rechtsboven bij elke template
   - Het ziet eruit als: `template_xxxxxxxxx`

4. **Update de configuratie:**
   - Open `app/contact/page.tsx`
   - Zoek naar: `TEMPLATE_ID: 'template_xpgqnpc'`
   - Vervang met je echte Template ID

### Optie 2: Nieuwe Template Aanmaken

Als je geen template hebt, maak er een aan:

1. **Ga naar Email Templates:**
   - https://dashboard.emailjs.com/admin/templates
   - Klik op "Create New Template"

2. **Template Instellingen:**
   ```
   Template Naam: Contactformulier De Zelfontspanners
   
   Subject: Nieuw contactformulier bericht - {{from_name}}
   
   Content (HTML):
   <p>Nieuw contactformulier bericht van De Zelfontspanners website</p>
   
   <p><strong>Naam:</strong> {{from_name}}</p>
   <p><strong>E-mail:</strong> {{from_email}}</p>
   <p><strong>Telefoonnummer:</strong> {{phone}}</p>
   
   <p><strong>Bericht:</strong></p>
   <p>{{message}}</p>
   
   <p><strong>Aantal bijgevoegde foto's:</strong> {{photo_count}}</p>
   
   To Email: vanzijderveld@gmail.com
   From Name: De Zelfontspanners Website
   ```

3. **Kopieer de Template ID** en update `app/contact/page.tsx`

### Optie 3: Mailto Fallback Gebruiken

Als EmailJS niet werkt, valt het formulier automatisch terug op `mailto:` links. Dit werkt altijd, maar opent de email client van de gebruiker.

## Huidige Configuratie

In `app/contact/page.tsx`:
```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_isuw6qv',
  TEMPLATE_ID: 'template_xpgqnpc',  // ← Deze moet worden aangepast
  PUBLIC_KEY: '4-mPMWIQkgVmyQLgm'
}
```

## Testen

Na het updaten van de Template ID:
1. Herstart de development server
2. Test het contactformulier
3. Controleer of je een email ontvangt op vanzijderveld@gmail.com

## Fallback

Als EmailJS niet werkt, gebruikt het formulier automatisch `mailto:` als fallback. Dit betekent dat de email client van de gebruiker wordt geopend met een vooraf ingevuld email.



