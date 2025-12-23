// Authentication System for Portfolio Management

// Get all members from leden.js
function getAllMembers() {
    // Import members from leden.js structure
    const activeMembers = [
        'albert van der Meij',
        'Anja Versteegen',
        'Ann van rijn',
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
        'Hans van dfe Lest',
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

// Initialize user accounts (in a real app, this would be server-side)
function initializeAccounts() {
    const members = getAllMembers();
    const accounts = JSON.parse(localStorage.getItem('memberAccounts') || '{}');
    
    // Create default accounts for members if they don't exist
    members.forEach(member => {
        if (!accounts[member]) {
            // Default password is "test123" for all members
            accounts[member] = {
                password: 'test123', // Default password for all members
                memberName: member,
                createdAt: new Date().toISOString()
            };
        } else {
            // Update existing accounts to use "test123" password
            accounts[member].password = 'test123';
        }
    });
    
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

// Login function
function login(memberName, password) {
    const accounts = JSON.parse(localStorage.getItem('memberAccounts') || '{}');
    
    if (!accounts[memberName]) {
        return { success: false, message: 'Gebruiker niet gevonden' };
    }
    
    if (accounts[memberName].password !== password) {
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
    // Force reset all passwords to "test123" on first load
    const accounts = JSON.parse(localStorage.getItem('memberAccounts') || '{}');
    const members = getAllMembers();
    let needsReset = false;
    
    members.forEach(member => {
        if (!accounts[member] || accounts[member].password !== 'test123') {
            needsReset = true;
        }
    });
    
    if (needsReset) {
        // Reset all passwords to "test123"
        members.forEach(member => {
            if (!accounts[member]) {
                accounts[member] = {
                    password: 'test123',
                    memberName: member,
                    createdAt: new Date().toISOString()
                };
            } else {
                accounts[member].password = 'test123';
            }
        });
        localStorage.setItem('memberAccounts', JSON.stringify(accounts));
    }
    
    initializeAccounts();
}

