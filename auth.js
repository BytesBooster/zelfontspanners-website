// Authentication System for Portfolio Management

// Get all members from leden.js
function getAllMembers() {
    // Import members from leden.js structure
    const activeMembers = [
        'albert van der Meij',
        'Anja Versteegen',
        'Anne-Marie Dennissen',
        'Ans Heisen',
        'Astrid Kasteleijn',
        'Astrid Sanders',
        'Bert van Zijderveld',
        'Bianca Dekkers - van Uden',
        'Cocky Anderson',
        'Corrie Cobussen',
        'Doris van de Laak',
        'Eva Veraa',
        'Frank van den Broek',
        'Gerhard Bod',
        'Hans Haarsma',
        'Hans van de Lest',
        'Helen Henskens',
        'Henk Regeling',
        'Ine Janssen',
        'Inge Pfeil',
        'Jan Cobussen',
        'Jos de Vaan',
        'Jos Verleg',
        'Karin Kalmar',
        'Karin Kruithof',
        'Lize Dekkers',
        'Marlies Reimering',
        'Plony Bos',
        'Renate van den Hoorn',
        'Rob Hendriks',
        'Ron Cuppes',
        'Ruud Cox',
        'Sandra van Kampen',
        'Theo Dennissen',
        'Tiemen Meertens',
        'Ton Leideritz',
        'Willeke Buijssen',
        'Tim Cobussen'
    ];
    
    const honoraryMembers = [];
    
    return [...activeMembers, ...honoraryMembers];
};

// Hash een wachtwoord met Web Crypto API (SHA-256)
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Verifieer een wachtwoord tegen een hash
async function verifyPassword(password, hash) {
    const passwordHash = await hashPassword(password);
    return passwordHash === hash;
}

// Initialize user accounts (in a real app, this would be server-side)
async function initializeAccounts() {
    const members = getAllMembers();
    const accounts = JSON.parse(localStorage.getItem('memberAccounts') || '{}');
    const defaultPassword = 'test123';
    const defaultPasswordHash = await hashPassword(defaultPassword);
    
    // Create default accounts for members if they don't exist
    // Migreer bestaande plaintext wachtwoorden naar hashes
    for (const member of members) {
        if (!accounts[member]) {
            accounts[member] = {
                password: defaultPasswordHash, // Hash van standaard wachtwoord
                memberName: member,
                createdAt: new Date().toISOString()
            };
        } else {
            // Als het wachtwoord nog niet gehasht is (minder dan 64 karakters = geen SHA-256 hash)
            // of als het het standaard wachtwoord is, hash het
            if (accounts[member].password.length < 64 || accounts[member].password === defaultPassword) {
                accounts[member].password = defaultPasswordHash;
            }
        }
    }
    
    localStorage.setItem('memberAccounts', JSON.stringify(accounts));
    return accounts;
};

// Check if user is logged in
function isAuthenticated() {
    const session = JSON.parse(localStorage.getItem('currentSession') || 'null');
    if (!session) return false;
    
    // Check if session is still valid (24 hours)
    const sessionTime = new Date(session.timestamp);
    const now = new Date();
    const hoursDiff = (now - sessionTime) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
        localStorage.removeItem('currentSession');
        return false;
    }
    
    return true;
};

// Get current logged in user
function getCurrentUser() {
    if (!isAuthenticated()) return null;
    const session = JSON.parse(localStorage.getItem('currentSession'));
    return session.memberName;
};

// Login function (nu async voor wachtwoord verificatie)
async function login(memberName, password) {
    const accounts = JSON.parse(localStorage.getItem('memberAccounts') || '{}');
    
    if (!accounts[memberName]) {
        return { success: false, message: 'Gebruiker niet gevonden' };
    }
    
    // Verifieer het wachtwoord tegen de hash
    const isValid = await verifyPassword(password, accounts[memberName].password);
    
    if (!isValid) {
        return { success: false, message: 'Onjuist wachtwoord' };
    }
    
    // Create session
    const session = {
        memberName: memberName,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('currentSession', JSON.stringify(session));
    
    return { success: true, memberName: memberName };
};

// Logout function (will be overridden by components.js if needed)
function logout() {
    localStorage.removeItem('currentSession');
    window.location.href = 'login.html';
}

// Check if user can access a specific portfolio
function canAccessPortfolio(portfolioMemberName) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    // User can only access their own portfolio
    return currentUser === portfolioMemberName;
};

// Initialize accounts on load
if (typeof window !== 'undefined') {
    // Initialize accounts (async, maar we wachten niet omdat het in de achtergrond gebeurt)
    initializeAccounts().catch(err => {
        console.error('Error initializing accounts:', err);
    });
}

