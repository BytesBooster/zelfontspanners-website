// Navigation is now handled by components.js

// Members Data
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

// Function to get initials from name
function getInitials(name) {
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

// Member photos mapping - voeg hier echte foto's toe
// Format: 'Naam': 'images/leden/naam.jpg'
const memberPhotos = {
    'Ans Heisen': 'images/ans heisen.jpg',
    'Astrid Sanders': 'images/Astrid Sanders zwart-wit.jpg',
    'Bert van Zijderveld': 'images/bert vna zijderveld.jpg',
    'Ine Janssen': 'images/ine janssen.jpg',
    'Inge Pfeil': 'images/inge pfeil.jpg',
    'Karin Kalmar': 'images/Karin kalmar.jpg',
    'Rob Hendriks': 'images/rob hendriks zwart-wit.jpg',
    'Ruud Cox': 'images/ruud cox.jpg'
};

// Function to get member photo URL
function getMemberPhoto(name) {
    // Check if we have a custom photo
    if (memberPhotos[name]) {
        return memberPhotos[name];
    }
    
    // Otherwise use placeholder with initials (black & gold theme)
    const initials = getInitials(name);
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=1a1a1a&color=d4af37&bold=true&font-size=0.5`;
}

// Function to create member card
function createMemberCard(name, isHonorary = false) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.style.cursor = 'pointer';
    
    const initials = getInitials(name);
    const imageUrl = getMemberPhoto(name);
    // Fallback SVG with initials
    const fallbackSvg = `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%231a1a1a%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%23d4af37%22 font-family=%22Arial%22 font-size=%2280%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22central%22%3E${initials}%3C/text%3E%3C/svg%3E`;
    
    card.innerHTML = `
        <div class="member-photo">
            <img src="${imageUrl}" alt="${name}" loading="lazy" onerror="this.src='${fallbackSvg}'">
        </div>
        <div class="member-info">
            <h3 class="member-name">${name}</h3>
            ${isHonorary ? '<p class="member-title">Erelid en oprichter</p>' : ''}
        </div>
    `;
    
    // Make card clickable - link to portfolio page
    card.addEventListener('click', () => {
        const encodedName = encodeURIComponent(name);
        window.location.href = `portfolio.html?member=${encodedName}`;
    });
    
    return card;
}

// Initialize active members
function initActiveMembers() {
    const grid = document.getElementById('activeMembersGrid');
    
    // Sort members alphabetically by full name (case-insensitive)
    const sortedMembers = [...activeMembers].sort((a, b) => {
        // Normalize names for comparison (lowercase, trim)
        const nameA = a.trim().toLowerCase();
        const nameB = b.trim().toLowerCase();
        return nameA.localeCompare(nameB, 'nl', { sensitivity: 'base' });
    });
    
    sortedMembers.forEach(name => {
        const card = createMemberCard(name);
        grid.appendChild(card);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initActiveMembers();
});

