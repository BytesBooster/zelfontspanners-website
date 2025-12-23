// Component System - Beheer alle herbruikbare secties op één plek

const Components = {
    // Navigation Component
    navigation: (activePage = 'home') => {
        const navLinks = {
            home: { href: 'index.html#home', text: 'Home' },
            agenda: { href: 'agenda.html', text: 'Agenda' },
            leden: { href: 'leden.html', text: 'Leden' },
            'foto-van-de-maand': { href: 'foto-van-de-maand.html', text: 'Foto van de Maand' },
            about: { href: 'over-ons.html', text: 'Over Ons' },
            sponsors: { href: 'sponsors.html', text: 'Sponsors' },
            contact: { href: 'contact.html', text: 'Contact' }
        };

        // Determine active link
        const activeLink = navLinks[activePage] || navLinks.home;
        
        return `
            <nav class="navbar" id="navbar">
                <div class="container">
                    <div class="nav-wrapper">
                        <div class="logo">
                            <a href="index.html#home" style="text-decoration: none; color: inherit;">
                                <h1>
                                    <span class="logo-line1">De</span>
                                    <span class="logo-line2">Zelfontspanners</span>
                                </h1>
                            </a>
                        </div>
                        <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <ul class="nav-menu" id="navMenu">
                            <li><a href="${navLinks.home.href}" class="nav-link ${activePage === 'home' ? 'active' : ''}">${navLinks.home.text}</a></li>
                            <li><a href="${navLinks.agenda.href}" class="nav-link ${activePage === 'agenda' ? 'active' : ''}">${navLinks.agenda.text}</a></li>
                            <li><a href="${navLinks.leden.href}" class="nav-link ${activePage === 'leden' ? 'active' : ''}">${navLinks.leden.text}</a></li>
                            <li><a href="${navLinks['foto-van-de-maand'].href}" class="nav-link ${activePage === 'foto-van-de-maand' ? 'active' : ''}">${navLinks['foto-van-de-maand'].text}</a></li>
                            <li><a href="${navLinks.about.href}" class="nav-link ${activePage === 'about' ? 'active' : ''}">${navLinks.about.text}</a></li>
                            <li><a href="${navLinks.sponsors.href}" class="nav-link ${activePage === 'sponsors' ? 'active' : ''}">${navLinks.sponsors.text}</a></li>
                            <li><a href="${navLinks.contact.href}" class="nav-link ${activePage === 'contact' ? 'active' : ''}">${navLinks.contact.text}</a></li>
                            ${Components.isLoggedIn() ? `<li><a href="portfolio-manage.html?member=${encodeURIComponent(Components.getCurrentUser())}" class="nav-link">Mijn Portfolio</a></li><li><a href="#" onclick="logout(); return false;" class="nav-link">Uitloggen</a></li>` : `<li><a href="login.html" class="nav-link">Login</a></li>`}
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    },

    // Footer Component
    footer: () => {
        return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>De Zelfontspanners</h3>
                            <p>Passie voor fotografie</p>
                        </div>
                        <div class="footer-section">
                            <h4>Navigatie</h4>
                            <ul>
                                <li><a href="index.html#home">Home</a></li>
                                <li><a href="agenda.html">Agenda</a></li>
                                <li><a href="leden.html">Leden</a></li>
                                <li><a href="over-ons.html">Over Ons</a></li>
                                <li><a href="sponsors.html">Sponsors</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h4>Contact</h4>
                            <p><a href="mailto:vanzijderveld@gmail.com">vanzijderveld@gmail.com</a></p>
                            <p>Bert van Zijderveld</p>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2025 De Zelfontspanners. Alle rechten voorbehouden.</p>
                    </div>
                </div>
            </footer>
        `;
    },

    // Check if user is logged in
    isLoggedIn: () => {
        try {
            const session = JSON.parse(localStorage.getItem('currentSession') || 'null');
            if (!session) return false;
            const sessionTime = new Date(session.timestamp);
            const now = new Date();
            const hoursDiff = (now - sessionTime) / (1000 * 60 * 60);
            return hoursDiff <= 24;
        } catch {
            return false;
        }
    },

    // Get current user
    getCurrentUser: () => {
        try {
            const session = JSON.parse(localStorage.getItem('currentSession') || 'null');
            return session ? session.memberName : null;
        } catch {
            return null;
        }
    }
};

// Make logout function globally available
function logout() {
    localStorage.removeItem('currentSession');
    window.location.href = 'login.html';
}

// Function to load component into page
function loadComponent(componentName, targetSelector, ...args) {
    const target = document.querySelector(targetSelector);
    if (!target) {
        console.error(`Target selector "${targetSelector}" not found`);
        return;
    }

    if (!Components[componentName]) {
        console.error(`Component "${componentName}" not found`);
        return;
    }

    const html = Components[componentName](...args);
    target.innerHTML = html;
    
    // Re-initialize any event listeners if needed
    if (componentName === 'navigation') {
        initNavigation();
    }
}

// Initialize navigation functionality
function initNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

