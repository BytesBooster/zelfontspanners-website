# 🔗 EmailJS Template Koppelen aan Service

## Stap-voor-stap Instructies

### Stap 1: Log in op EmailJS Dashboard
1. Ga naar: https://dashboard.emailjs.com/
2. Log in met je account

### Stap 2: Ga naar Templates
1. Klik in het menu op **"Email Templates"** (of ga direct naar: https://dashboard.emailjs.com/admin/templates)
2. Je ziet een lijst met al je templates

### Stap 3: Open je Template
1. Klik op de template `template_amojmof` (of de template die je wilt koppelen)
2. Je komt nu in de template editor

### Stap 4: Selecteer de Service
1. Bovenaan de template editor zie je een dropdown met **"Service"**
2. Klik op deze dropdown
3. Selecteer **`service_isuw6qv`** uit de lijst
4. Als deze service niet in de lijst staat, moet je eerst de service aanmaken (zie hieronder)

### Stap 5: Sla de Template op
1. Klik op de knop **"Save"** (meestal rechtsboven of onderaan)
2. De template is nu gekoppeld aan de service

---

## Als de Service niet bestaat

### Service aanmaken:
1. Ga naar **"Email Services"** in het menu (of: https://dashboard.emailjs.com/admin/integration)
2. Klik op **"Add New Service"**
3. Kies je email provider (bijvoorbeeld Gmail, Outlook, etc.)
4. Volg de instructies om je email account te verbinden
5. Noteer de **Service ID** die wordt gegenereerd
6. Als de Service ID niet `service_isuw6qv` is, update dan de code met de nieuwe Service ID

---

## Template Variabelen Controleren

Zorg ervoor dat je template deze variabelen bevat:
- `{{from_name}}` - Naam van de afzender
- `{{from_email}}` - Email adres van de afzender
- `{{phone}}` - Telefoonnummer (optioneel)
- `{{message}}` - Het bericht
- `{{photo_count}}` - Aantal foto's (optioneel)

### Template Content Voorbeeld:
```html
<p>Nieuw contactformulier bericht van De Zelfontspanners website</p>

<p><strong>Naam:</strong> {{from_name}}</p>
<p><strong>E-mail:</strong> {{from_email}}</p>
<p><strong>Telefoonnummer:</strong> {{phone}}</p>

<p><strong>Bericht:</strong></p>
<p>{{message}}</p>

<p><strong>Aantal bijgevoegde foto's:</strong> {{photo_count}}</p>
```

### Template Instellingen:
- **To Email:** `vanzijderveld@gmail.com`
- **From Name:** `De Zelfontspanners Website`
- **Subject:** `Nieuw contactformulier bericht - {{from_name}}`

---

## Testen

Na het koppelen van de template aan de service:

1. **Test vanuit EmailJS Dashboard:**
   - Klik op de **"Test"** knop in de template editor
   - Vul testwaarden in
   - Controleer of je een email ontvangt

2. **Test vanuit de Website:**
   - Ga naar de contact pagina
   - Vul het formulier in
   - Verzend het formulier
   - Controleer of je een email ontvangt op `vanzijderveld@gmail.com`

---

## Troubleshooting

### Template wordt nog steeds niet gevonden:
- **Hard refresh browser:** `Ctrl + Shift + R` (Windows) of `Cmd + Shift + R` (Mac)
- **Herstart development server:** Stop en start `npm run dev` opnieuw
- **Controleer Service ID:** Zorg dat de Service ID in de code overeenkomt met de Service ID in EmailJS
- **Controleer Template ID:** Zorg dat de Template ID in de code overeenkomt met de Template ID in EmailJS

### Service staat niet in de dropdown:
- Controleer of de service bestaat in "Email Services"
- Controleer of de service actief is (niet gedeactiveerd)
- Maak een nieuwe service aan als deze niet bestaat

---

## Huidige Configuratie

In `app/contact/page.tsx`:
```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_isuw6qv',      // ← Deze moet bestaan
  TEMPLATE_ID: 'template_amojmof',   // ← Deze moet gekoppeld zijn aan service_isuw6qv
  PUBLIC_KEY: '4-mPMWIQkgVmyQLgm'
}
```

---

## Belangrijk

- De template **moet** gekoppeld zijn aan de service voordat het werkt
- Zonder deze koppeling krijg je altijd de "template not found" error
- De fallback (mailto) werkt altijd als EmailJS faalt



