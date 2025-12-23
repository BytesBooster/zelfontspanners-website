// Over Ons Page Script - Contact Form Handler

const aboutContactForm = document.getElementById('aboutContactForm');

if (aboutContactForm) {
    aboutContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(aboutContactForm);
        const data = Object.fromEntries(formData);
        
        // Create email body
        let emailBody = `Nieuw contactformulier bericht van Over Ons pagina\n\n`;
        emailBody += `Naam: ${data.name}\n`;
        emailBody += `E-mail: ${data.email}\n`;
        if (data.phone) emailBody += `Telefoonnummer: ${data.phone}\n`;
        if (data.message) emailBody += `\nBericht:\n${data.message}\n`;
        
        // Create mailto link
        const mailtoLink = `mailto:vanzijderveld@gmail.com?subject=Contactformulier Over Ons - ${encodeURIComponent(data.name)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        setTimeout(() => {
            alert(`Bedankt voor je bericht, ${data.name}! Je email client zou nu moeten openen. Als dit niet gebeurt, stuur dan een email naar vanzijderveld@gmail.com met je vraag.`);
            aboutContactForm.reset();
        }, 500);
    });
}







