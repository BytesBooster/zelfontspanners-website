// Contact Page Script - Improved Form Handling

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');
const fileInput = document.getElementById('photos');
const fileList = document.getElementById('fileList');

// Set max date to today for birthdate
const birthdateInput = document.getElementById('birthdate');
if (birthdateInput) {
    const today = new Date().toISOString().split('T')[0];
    birthdateInput.setAttribute('max', today);
}

// Real-time validation
const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

// Validate individual field
function validateField(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    let isValid = true;
    let errorMessage = '';

    // Remove previous error styling
    field.classList.remove('error', 'success');

    // Check required fields
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'Dit veld is verplicht';
    }
    // Email validation
    else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Voer een geldig e-mailadres in';
        }
    }
    // Phone validation
    else if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[0-9\s\-+()]+$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Voer een geldig telefoonnummer in';
        }
    }
    // Min length validation
    else if (field.hasAttribute('minlength')) {
        const minLength = parseInt(field.getAttribute('minlength'));
        if (field.value.length < minLength) {
            isValid = false;
            errorMessage = `Minimaal ${minLength} tekens vereist`;
        }
    }

    // Update UI
    if (isValid) {
        field.classList.add('success');
        if (errorElement) errorElement.textContent = '';
    } else {
        field.classList.add('error');
        if (errorElement) errorElement.textContent = errorMessage;
    }

    return isValid;
}

// Validate entire form
function validateForm() {
    let isValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    return isValid;
}

// File upload handling
if (fileInput) {
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    const fileUploadLabel = document.querySelector('.file-upload-label');
    if (fileUploadLabel) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUploadLabel.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            fileUploadLabel.addEventListener(eventName, () => {
                fileUploadLabel.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            fileUploadLabel.addEventListener(eventName, () => {
                fileUploadLabel.classList.remove('drag-over');
            }, false);
        });

        fileUploadLabel.addEventListener('drop', handleDrop, false);
    }
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    fileInput.files = files;
    handleFileSelect({ target: fileInput });
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    const maxFiles = 5;
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    // Clear previous file list
    fileList.innerHTML = '';
    
    if (files.length === 0) return;
    
    // Check file count
    if (files.length > maxFiles) {
        showFormMessage('Je kunt maximaal 5 foto\'s selecteren. Alleen de eerste 5 worden gebruikt.', 'error');
        const fileList = files.slice(0, maxFiles);
        const dataTransfer = new DataTransfer();
        fileList.forEach(file => dataTransfer.items.add(file));
        e.target.files = dataTransfer.files;
        handleFileSelect({ target: e.target });
        return;
    }
    
    // Validate and display files
    files.forEach((file, index) => {
        // Check file type
        if (!file.type.match('image/jpeg') && !file.type.match('image/jpg')) {
            showFormMessage(`${file.name} is geen JPEG bestand. Alleen JPEG bestanden zijn toegestaan.`, 'error');
            return;
        }
        
        // Check file size
        if (file.size > maxSize) {
            showFormMessage(`${file.name} is te groot (max 5MB).`, 'error');
            return;
        }
        
        // Display file
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-name">${file.name}</span>
            <span class="file-size">${formatFileSize(file.size)}</span>
            <button type="button" class="file-remove" data-index="${index}">×</button>
        `;
        fileList.appendChild(fileItem);
        
        // Remove file handler
        fileItem.querySelector('.file-remove').addEventListener('click', () => {
            removeFile(index);
        });
    });
}

function removeFile(index) {
    const dt = new DataTransfer();
    const files = Array.from(fileInput.files);
    files.splice(index, 1);
    files.forEach(file => dt.items.add(file));
    fileInput.files = dt.files;
    handleFileSelect({ target: fileInput });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Show form message
function showFormMessage(message, type = 'success') {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// EmailJS Configuration
// Vervang deze waarden na registratie op https://www.emailjs.com/
// Zie EMAILJS-SETUP.md voor gedetailleerde instructies
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_isuw6qv',     // EmailJS Service ID
    TEMPLATE_ID: 'template_xpgqnpc',   // EmailJS Template ID
    PUBLIC_KEY: '4-mPMWIQkgVmyQLgm'    // EmailJS Public Key
};

let emailjsInitialized = false;

function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' && 
            EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' && 
            EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            emailjsInitialized = true;
            console.log('EmailJS initialized successfully');
        } else {
            console.warn('EmailJS not configured. Using mailto fallback. See EMAILJS-SETUP.md for instructions.');
        }
    }
}

// Initialize EmailJS when script loads
if (typeof emailjs !== 'undefined') {
    initEmailJS();
} else {
    // Wait for EmailJS to load
    window.addEventListener('load', () => {
        if (typeof emailjs !== 'undefined') {
            initEmailJS();
        }
    });
}

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        showFormMessage('Controleer de verplichte velden en probeer het opnieuw.', 'error');
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loading').style.display = 'inline';
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Get file count
    const fileCount = fileInput.files.length;
    
    // Try to send via EmailJS first
    if (emailjsInitialized && typeof emailjs !== 'undefined') {
        try {
            // Prepare email template parameters
            const templateParams = {
                from_name: data.name,
                from_email: data.email,
                phone: data.phone || 'Niet opgegeven',
                message: data.message,
                photo_count: fileCount > 0 ? fileCount.toString() : 'Geen foto\'s',
                to_email: 'vanzijderveld@gmail.com'
            };
            
            // Send email via EmailJS
            if (EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' && 
                EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID') {
                await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams);
                
                // Success - email sent
                showFormMessage(`Bedankt voor je bericht, ${data.name}! Je bericht is verzonden.`, 'success');
                contactForm.reset();
                fileList.innerHTML = '';
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').style.display = 'inline';
                submitBtn.querySelector('.btn-loading').style.display = 'none';
                
                // Remove success classes
                inputs.forEach(input => input.classList.remove('success'));
                return;
            }
        } catch (error) {
            console.error('EmailJS error:', error);
            // Fall back to mailto if EmailJS fails
            showFormMessage('Er ging iets mis bij het verzenden. We proberen je email client te openen...', 'error');
        }
    }
    
    // Fallback: Use mailto link if EmailJS is not configured or failed
    let emailBody = `Nieuw contactformulier bericht van De Zelfontspanners website\n\n`;
    emailBody += `Naam: ${data.name}\n`;
    emailBody += `E-mail: ${data.email}\n`;
    if (data.phone) emailBody += `Telefoonnummer: ${data.phone}\n`;
    if (data.message) emailBody += `\nBericht:\n${data.message}\n`;
    if (fileCount > 0) emailBody += `\nAantal bijgevoegde foto's: ${fileCount}\n`;
    
    // Create mailto link
    const mailtoLink = `mailto:vanzijderveld@gmail.com?subject=Contactformulier De Zelfontspanners - ${encodeURIComponent(data.name)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    setTimeout(() => {
        showFormMessage(`Bedankt voor je bericht, ${data.name}! Je email client zou nu moeten openen.`, 'success');
        contactForm.reset();
        fileList.innerHTML = '';
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').style.display = 'inline';
        submitBtn.querySelector('.btn-loading').style.display = 'none';
        
        // Remove success classes
        inputs.forEach(input => input.classList.remove('success'));
    }, 1000);
});

