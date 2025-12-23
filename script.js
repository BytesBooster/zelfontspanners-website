// Navigation is now handled by components.js

// ============================================
// HERO SLIDER - Portfolio Photos
// ============================================

let heroSliderPhotos = [];
let currentHeroSlide = 0;
let heroSliderInterval = null;

// Load all portfolio photos and initialize hero slider
function initHeroSlider() {
    // Load portfolio data using the same function as portfolio.js
    if (typeof loadPortfolioData === 'function') {
        const portfolioData = loadPortfolioData();
        
        // Collect all photos from all members
        const allPhotos = [];
        Object.keys(portfolioData).forEach(memberName => {
            const member = portfolioData[memberName];
            if (member.photos && Array.isArray(member.photos)) {
                member.photos.forEach(photo => {
                    if (photo.src) {
                        allPhotos.push({
                            src: photo.src,
                            title: photo.title || 'Foto',
                            member: memberName
                        });
                    }
                });
            }
        });
        
        // Shuffle and select random photos (max 10 for performance)
        const shuffled = allPhotos.sort(() => Math.random() - 0.5);
        heroSliderPhotos = shuffled.slice(0, Math.min(10, shuffled.length));
        
        // If we have photos, initialize the slider
        if (heroSliderPhotos.length > 0) {
            renderHeroSlider();
            startHeroSlider();
        } else {
            // Fallback: use a default background
            const slider = document.getElementById('heroSlider');
            if (slider) {
                slider.innerHTML = '<div class="hero-slide" style="background-image: url(\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwYTBhMGE7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4=\');"></div>';
            }
        }
    } else {
        console.warn('loadPortfolioData function not found. Make sure portfolio-data.js is loaded.');
    }
}

// Render hero slider
function renderHeroSlider() {
    const slider = document.getElementById('heroSlider');
    const dots = document.getElementById('heroSliderDots');
    
    if (!slider) return;
    
    // Clear existing slides
    slider.innerHTML = '';
    
    // Create slides
    heroSliderPhotos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = 'hero-slide';
        slide.style.backgroundImage = `url('${photo.src}')`;
        slide.dataset.index = index;
        if (index === 0) slide.classList.add('active');
        slider.appendChild(slide);
    });
    
    // Create dots
    if (dots) {
        dots.innerHTML = '';
        heroSliderPhotos.forEach((photo, index) => {
            const dot = document.createElement('button');
            dot.className = 'hero-slider-dot';
            dot.dataset.index = index;
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToHeroSlide(index));
            dots.appendChild(dot);
        });
    }
    
    // Setup navigation buttons
    const prevBtn = document.getElementById('heroSliderPrev');
    const nextBtn = document.getElementById('heroSliderNext');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToHeroSlide(currentHeroSlide - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToHeroSlide(currentHeroSlide + 1));
    }
}

// Go to specific slide
function goToHeroSlide(index) {
    if (heroSliderPhotos.length === 0) return;
    
    // Wrap around
    if (index < 0) index = heroSliderPhotos.length - 1;
    if (index >= heroSliderPhotos.length) index = 0;
    
    currentHeroSlide = index;
    
    // Update slides
    const slides = document.querySelectorAll('.hero-slide');
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update dots
    const dots = document.querySelectorAll('.hero-slider-dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Restart auto-slide timer
    startHeroSlider();
}

// Start automatic slideshow
function startHeroSlider() {
    // Clear existing interval
    if (heroSliderInterval) {
        clearInterval(heroSliderInterval);
    }
    
    // Start new interval (change slide every 5 seconds)
    heroSliderInterval = setInterval(() => {
        goToHeroSlide(currentHeroSlide + 1);
    }, 5000);
}

// Pause slideshow on hover
function setupHeroSliderHover() {
    const heroSection = document.querySelector('.home-hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            if (heroSliderInterval) {
                clearInterval(heroSliderInterval);
            }
        });
        
        heroSection.addEventListener('mouseleave', () => {
            startHeroSlider();
        });
    }
}

// Initialize hero slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for portfolio-data.js to load
    setTimeout(() => {
        initHeroSlider();
        setupHeroSliderHover();
    }, 100);
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryGrid = document.getElementById('galleryGrid');

// Sample gallery data - replace with your actual images
const galleryData = [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', category: 'nature', title: 'Natuur Foto 1' },
    { src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800', category: 'portrait', title: 'Portret Foto 1' },
    { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', category: 'street', title: 'Straat Foto 1' },
    { src: 'https://images.unsplash.com/photo-1494522358652-f8cc81a0f316?w=800', category: 'architecture', title: 'Architectuur Foto 1' },
    { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', category: 'nature', title: 'Natuur Foto 2' },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', category: 'portrait', title: 'Portret Foto 2' },
    { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800', category: 'street', title: 'Straat Foto 2' },
    { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800', category: 'architecture', title: 'Architectuur Foto 2' },
    { src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800', category: 'nature', title: 'Natuur Foto 3' },
];

// Initialize gallery with portfolio photos
function initGallery() {
    if (!galleryGrid) return;
    
    // Try to load real portfolio photos
    if (typeof loadPortfolioData === 'function') {
        const portfolioData = loadPortfolioData();
        const allPhotos = [];
        
        // Collect photos from all members
        Object.keys(portfolioData).forEach(memberName => {
            const member = portfolioData[memberName];
            if (member.photos && Array.isArray(member.photos)) {
                member.photos.slice(0, 3).forEach(photo => { // Max 3 per member
                    if (photo.src) {
                        allPhotos.push({
                            src: photo.src,
                            title: photo.title || 'Foto',
                            category: photo.category || 'all',
                            member: memberName
                        });
                    }
                });
            }
        });
        
        // Shuffle and limit to 12 photos
        const shuffled = allPhotos.sort(() => Math.random() - 0.5);
        const selectedPhotos = shuffled.slice(0, 12);
        
        if (selectedPhotos.length > 0) {
            selectedPhotos.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.dataset.category = item.category;
                
                galleryItem.innerHTML = `
                    <img src="${item.src}" alt="${item.title}" loading="lazy">
                    <div class="gallery-item-overlay">
                        <h3>${item.title}</h3>
                        <p class="gallery-item-member">${item.member}</p>
                    </div>
                `;
                
                galleryGrid.appendChild(galleryItem);
            });
            return;
        }
    }
    
    // Fallback to sample data
    galleryData.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = item.category;
        
        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="gallery-item-overlay">
                <h3>${item.title}</h3>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Filter gallery items
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        const items = galleryGrid.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Foto van de maand Data - gebaseerd op hun website
const fotoVanDeMaandData = [
    {
        month: 'November 2025',
        theme: 'Minimalistisch landschap',
        winner: 'Rob Peters',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        date: '13 nov 2025'
    },
    {
        month: 'Oktober 2025',
        theme: 'De koffer',
        winner: 'Richard Schoonderwoerd',
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
        date: '12 okt 2025'
    },
    {
        month: 'September 2025',
        theme: 'Troep',
        winner: 'Sacha van der Veen',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
        date: '10 sep 2025'
    },
    {
        month: 'Augustus 2025',
        theme: 'Eigen fotocollage, geïnspireerd door werk van bekende fotografen',
        winner: 'Theo Gerritsen (geïnspireerd door Ansel Adams)',
        image: 'https://images.unsplash.com/photo-1494522358652-f8cc81a0f316?w=800',
        date: '24 aug 2025'
    },
    {
        month: 'Mei 2025',
        theme: 'Fragiel, teer, broos',
        winner: 'John en Richard',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        date: '19 mei 2025'
    },
    {
        month: 'April 2025',
        theme: 'Kronkel',
        winner: 'Verschillende leden',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        date: '27 apr 2025'
    },
];

// Blog Data - gebaseerd op hun website
const blogData = [
    {
        title: 'Foto van de maand November',
        date: '13 nov 2025',
        author: 'Robert',
        excerpt: 'Thema minimalistisch landschap. Winnaar: Clublid Rob Peters',
        fullText: 'Deze maand stond het thema "Minimalistisch landschap" centraal. We zijn verheugd om Rob Peters te feliciteren met zijn winnende foto die perfect het minimalisme in landschapsfotografie weergeeft.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    },
    {
        title: 'Fotoketting 2025',
        date: '12 okt 2025',
        author: 'Robert',
        excerpt: 'Thema: de koffer. Winnaar: clublid Richard Schoonderwoerd',
        fullText: 'De fotoketting van 2025 was een groot succes! Het thema "de koffer" leverde prachtige en creatieve inzendingen op. Gefeliciteerd aan Richard Schoonderwoerd met zijn winnende foto.',
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800'
    },
    {
        title: 'Foto van de maand september',
        date: '10 sep 2025',
        author: 'Robert',
        excerpt: 'Thema: "Troep". Winnares, clublid Sacha van der Veen',
        fullText: 'Het thema "Troep" daagde onze leden uit om creatief te zijn met alledaagse voorwerpen. Sacha van der Veen heeft met haar winnende foto een prachtige interpretatie gegeven van dit thema.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'
    },
    {
        title: 'Foto van de maand Augustus',
        date: '24 aug 2025',
        author: 'Robert',
        excerpt: 'Thema: Eigen fotocollage, geïnspireerd door werk van bekende fotografen. Winnaar: Theo Gerritsen (geïnspireerd door Ansel Adams)',
        fullText: 'Deze maand stond inspiratie centraal. Leden werden uitgedaagd om een eigen fotocollage te maken geïnspireerd door bekende fotografen. Theo Gerritsen heeft met zijn werk geïnspireerd door Ansel Adams de eerste prijs gewonnen.',
        image: 'https://images.unsplash.com/photo-1494522358652-f8cc81a0f316?w=800'
    },
];

// Events Data - agenda items
const eventsData = [
    {
        title: 'Maandelijkse vergadering',
        date: 'Elke maand',
        description: 'Onze reguliere maandelijkse vergadering waar we foto\'s bespreken en plannen maken.',
        icon: '📅'
    },
    {
        title: 'Fotowedstrijd: Nieuwe thema',
        date: 'Komende maand',
        description: 'Doe mee aan onze maandelijkse fotowedstrijd met een nieuw thema.',
        icon: '🏆'
    },
    {
        title: 'Workshop: Nieuwe technieken',
        date: 'Binnenkort',
        description: 'Leer nieuwe fotografietechnieken van ervaren leden.',
        icon: '📸'
    },
    {
        title: 'Excursie: Fotografie op locatie',
        date: 'Binnenkort',
        description: 'Samen op pad naar een mooie locatie voor fotografie.',
        icon: '🌍'
    },
];

// Initialize Foto van de maand
function initFotoVanDeMaand() {
    const fotoMaandGrid = document.getElementById('fotoMaandGrid');
    
    fotoVanDeMaandData.forEach(item => {
        const fotoCard = document.createElement('div');
        fotoCard.className = 'foto-maand-card';
        
        fotoCard.innerHTML = `
            <div class="foto-maand-image">
                <img src="${item.image}" alt="${item.theme}" loading="lazy">
            </div>
            <div class="foto-maand-content">
                <div class="foto-maand-date">${item.date}</div>
                <h3 class="foto-maand-month">${item.month}</h3>
                <div class="foto-maand-theme"><strong>Thema:</strong> ${item.theme}</div>
                <div class="foto-maand-winner"><strong>Winnaar:</strong> ${item.winner}</div>
            </div>
        `;
        
        fotoMaandGrid.appendChild(fotoCard);
    });
}

// Initialize Blog
function initBlog() {
    const blogGrid = document.getElementById('blogGrid');
    
    blogData.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        
        blogCard.innerHTML = `
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">${post.date}</span>
                    <span class="blog-author">${post.author}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <button class="blog-read-more" onclick="showBlogPost(${blogData.indexOf(post)})">Lees meer</button>
            </div>
        `;
        
        blogGrid.appendChild(blogCard);
    });
}

// Show full blog post (simple modal)
function showBlogPost(index) {
    const post = blogData[index];
    alert(`${post.title}\n\n${post.fullText}\n\n- ${post.author}, ${post.date}`);
}

// Initialize events
function initEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;
    
    // Try to load real agenda events from localStorage
    let eventsToShow = eventsData;
    
    try {
        const agendaEvents = JSON.parse(localStorage.getItem('agendaEvents') || '[]');
        if (agendaEvents.length > 0) {
            // Filter future events and sort by date
            const now = new Date();
            const futureEvents = agendaEvents
                .filter(event => {
                    if (!event.date) return false;
                    const eventDate = new Date(event.date);
                    return eventDate >= now;
                })
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 4); // Max 4 events
            
            if (futureEvents.length > 0) {
                eventsToShow = futureEvents.map(event => ({
                    title: event.title || 'Evenement',
                    date: event.date ? formatEventDate(event.date) : 'Binnenkort',
                    description: event.description || event.location || 'Meer informatie volgt binnenkort.',
                    icon: getEventIcon(event.title || '')
                }));
            }
        }
    } catch (e) {
        console.log('Could not load agenda events:', e);
    }
    
    eventsToShow.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        eventCard.innerHTML = `
            <div class="event-icon-wrapper">
                <div class="event-image">${event.icon}</div>
            </div>
            <div class="event-content">
                <div class="event-date">${event.date}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <a href="agenda.html" class="event-link">Meer informatie →</a>
            </div>
        `;
        
        eventsGrid.appendChild(eventCard);
    });
}

// Helper function to format event date
function formatEventDate(dateString) {
    try {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('nl-NL', options);
    } catch (e) {
        return dateString;
    }
}

// Helper function to get icon based on event title
function getEventIcon(title) {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('workshop') || lowerTitle.includes('cursus')) return '📸';
    if (lowerTitle.includes('wedstrijd') || lowerTitle.includes('competitie')) return '🏆';
    if (lowerTitle.includes('excursie') || lowerTitle.includes('uitstap')) return '🌍';
    if (lowerTitle.includes('vergadering') || lowerTitle.includes('bijeenkomst')) return '📅';
    return '📅';
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would normally send the data to a server
    // For now, we'll just show an alert
    alert(`Bedankt voor je bericht, ${data.name}! We nemen zo snel mogelijk contact met je op.`);
    
    // Reset form
    contactForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // initGallery(); // Removed - portfolio section removed
    // initFotoVanDeMaand(); // Removed - foto van de maand section removed
    // initBlog(); // Removed - blog section removed
    // initEvents(); // Removed - agenda section removed
    
    // Set initial opacity for sections
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }, 100);
});

