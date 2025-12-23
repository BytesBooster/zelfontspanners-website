// Login Page Script

// Populate member dropdown
function populateMemberDropdown() {
    const select = document.getElementById('memberName');
    if (!select) {
        console.error('Member select element not found');
        return;
    }
    
    // Ensure accounts are initialized
    if (typeof initializeAccounts === 'function') {
        initializeAccounts();
    }
    
    const members = getAllMembers();
    
    if (!members || members.length === 0) {
        console.error('No members found');
        return;
    }
    
    // Sort members alphabetically (case-insensitive, Dutch locale)
    const sortedMembers = [...members].sort((a, b) => {
        return a.localeCompare(b, 'nl', { sensitivity: 'base' });
    });
    
    sortedMembers.forEach(member => {
        const option = document.createElement('option');
        option.value = member;
        option.textContent = member;
        select.appendChild(option);
    });
}

// Show login message
function showLoginMessage(message, type = 'error') {
    const messageDiv = document.getElementById('loginMessage');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure auth.js is loaded
    setTimeout(() => {
        try {
            populateMemberDropdown();
            
            const loginForm = document.getElementById('loginForm');
            
            if (!loginForm) {
                console.error('Login form not found');
                return;
            }
            
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const memberName = document.getElementById('memberName').value;
                const password = document.getElementById('password').value;
                
                if (!memberName || !password) {
                    showLoginMessage('Vul alle velden in', 'error');
                    return;
                }
                
                // Check if login function exists
                if (typeof login !== 'function') {
                    showLoginMessage('Login systeem niet geladen. Ververs de pagina.', 'error');
                    console.error('Login function not available');
                    return;
                }
                
                const result = login(memberName, password);
                
                if (result && result.success) {
                    showLoginMessage('Succesvol ingelogd! Je wordt doorgestuurd...', 'success');
                    setTimeout(() => {
                        window.location.href = `portfolio-manage.html?member=${encodeURIComponent(memberName)}`;
                    }, 1000);
                } else {
                    showLoginMessage(result ? result.message : 'Er is een fout opgetreden', 'error');
                }
            });
            
            // Redirect if already logged in
            if (typeof isAuthenticated === 'function' && isAuthenticated()) {
                const currentUser = getCurrentUser();
                if (currentUser) {
                    window.location.href = `portfolio-manage.html?member=${encodeURIComponent(currentUser)}`;
                }
            }
        } catch (error) {
            console.error('Error initializing login:', error);
            const messageDiv = document.getElementById('loginMessage');
            if (messageDiv) {
                messageDiv.textContent = 'Er is een fout opgetreden bij het laden van de login pagina. Ververs de pagina.';
                messageDiv.className = 'form-message error';
                messageDiv.style.display = 'block';
            }
        }
    }, 100);
});

