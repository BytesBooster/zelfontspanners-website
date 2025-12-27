# 🔧 EmailJS Troubleshooting - Template Not Found

## Probleem
Je krijgt nog steeds: `The template ID not found` zelfs na het updaten naar `template_qxsxycg`

## Mogelijke Oorzaken

### 1. Template bestaat niet in EmailJS account
**Oplossing:**
- Ga naar: https://dashboard.emailjs.com/admin/templates
- Controleer of de template `template_qxsxycg` echt bestaat
- Als deze niet bestaat, maak een nieuwe template aan

### 2. Template is niet gekoppeld aan de juiste Service
**Oplossing:**
- Ga naar: https://dashboard.emailjs.com/admin/templates
- Klik op je template
- Controleer of deze gekoppeld is aan Service ID: `service_isuw6qv`
- Als niet, wijzig de service in de template instellingen

### 3. Template ID is verkeerd gekopieerd
**Oplossing:**
- Ga naar: https://dashboard.emailjs.com/admin/templates
- Klik op je template
- Kopieer de Template ID opnieuw (rechtsboven)
- Controleer of deze exact overeenkomt met `template_qxsxycg`

### 4. Browser Cache
**Oplossing:**
- Hard refresh: `Ctrl + Shift + R` (Windows) of `Cmd + Shift + R` (Mac)
- Of clear browser cache
- Of gebruik incognito/private mode

### 5. Development Server Cache
**Oplossing:**
```bash
# Stop de development server
# Verwijder .next folder
rm -rf .next
# Of op Windows:
rmdir /s .next

# Herstart development server
npm run dev
```

## Stap-voor-stap Template Setup

### Stap 1: Maak Template aan
1. Ga naar: https://dashboard.emailjs.com/admin/templates
2. Klik "Create New Template"

### Stap 2: Template Configuratie
```
Template Naam: Contactformulier De Zelfontspanners

Service: service_isuw6qv (selecteer deze!)

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

### Stap 3: Kopieer Template ID
- Na het opslaan, kopieer de Template ID
- Deze staat rechtsboven bij de template naam
- Update `app/contact/page.tsx` met deze ID

### Stap 4: Test Template
- Klik op "Test" in EmailJS dashboard
- Vul testwaarden in
- Controleer of email aankomt

## Huidige Configuratie

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_isuw6qv',
  TEMPLATE_ID: 'template_qxsxycg',  // ← Controleer of deze bestaat
  PUBLIC_KEY: '4-mPMWIQkgVmyQLgm'
}
```

## Fallback Werkt Automatisch

Als EmailJS niet werkt, valt het formulier automatisch terug op `mailto:` links. Dit betekent dat de email client van de gebruiker wordt geopend met een vooraf ingevuld bericht.

**Het formulier blijft dus altijd functioneel!**

## Test Checklist

- [ ] Template bestaat in EmailJS dashboard
- [ ] Template is gekoppeld aan `service_isuw6qv`
- [ ] Template ID is correct gekopieerd
- [ ] Browser cache is geleegd
- [ ] Development server is herstart
- [ ] Test email werkt vanuit EmailJS dashboard
- [ ] Formulier test op website

## Als Niets Helpt

Gebruik de mailto fallback - deze werkt altijd en is al geïmplementeerd. Het formulier zal automatisch de email client openen als EmailJS faalt.



