// Agenda functionality for De Zelfontspanners
// Allows logged-in members to add events to the agenda

// Load events from localStorage
function loadEvents() {
    const eventsData = localStorage.getItem('agendaEvents');
    if (eventsData) {
        try {
            const events = JSON.parse(eventsData);
            // Filter out test event automatically
            return events.filter(event => {
                // Remove event with title "test" and date 2026-07-21
                return !(event.title === 'test' && event.date === '2026-07-21');
            });
        } catch (e) {
            console.error('Error loading events:', e);
            return [];
        }
    }
    return [];
}

// Save events to localStorage
function saveEvents(events) {
    try {
        localStorage.setItem('agendaEvents', JSON.stringify(events));
        return true;
    } catch (e) {
        console.error('Error saving events:', e);
        alert('Er is een fout opgetreden bij het opslaan van het evenement.');
        return false;
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('nl-NL', options);
}

// Format date and time for display
function formatDateTime(dateString, timeString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formatted = date.toLocaleDateString('nl-NL', options);
    
    if (timeString) {
        formatted += ` om ${timeString}`;
    }
    
    return formatted;
}

// Check if event is in the past
function isPastEvent(event) {
    const eventDate = new Date(event.date);
    if (event.time) {
        const [hours, minutes] = event.time.split(':');
        eventDate.setHours(parseInt(hours), parseInt(minutes));
    }
    return eventDate < new Date();
}

// Display events
function displayEvents() {
    const events = loadEvents();
    const grid = document.getElementById('agendaGrid');
    const emptyState = document.getElementById('agendaEmpty');
    
    if (!grid) {
        console.error('agendaGrid element not found');
        // Try again after a short delay
        setTimeout(() => {
            displayEvents();
        }, 100);
        return;
    }
    
    console.log('Displaying events:', events.length);
    
    // Sort events by date (upcoming first, then past)
    const sortedEvents = events.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        // If dates are equal, sort by time
        if (dateA.getTime() === dateB.getTime()) {
            if (a.time && b.time) {
                return a.time.localeCompare(b.time);
            }
            return 0;
        }
        
        return dateA - dateB;
    });
    
    if (sortedEvents.length === 0) {
        // Show empty state message directly in grid
        grid.innerHTML = '<div class="agenda-empty"><p>Er zijn nog geen evenementen in de agenda.</p><p style="margin-top: 1rem; font-size: 0.9rem; color: #888;">Log in om een evenement toe te voegen.</p></div>';
        if (emptyState) {
            emptyState.style.display = 'none';
        }
        return;
    }
    
    // Hide empty state element if it exists
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    grid.innerHTML = sortedEvents.map((event, index) => {
        const isPast = isPastEvent(event);
        const formattedDate = event.time 
            ? formatDateTime(event.date, event.time)
            : formatDate(event.date);
        
        return `
            <div class="agenda-item ${isPast ? 'agenda-item-past' : ''}" data-event-id="${event.id}">
                <div class="agenda-item-icon">${event.icon || '📅'}</div>
                <div class="agenda-item-content">
                    <div class="agenda-item-header">
                        <h3 class="agenda-item-title">${escapeHtml(event.title)}</h3>
                        ${checkAuth() && getCurrentUser() === event.createdBy ? `
                        <div class="agenda-item-actions">
                            <button class="agenda-item-delete" onclick="deleteEvent('${event.id}')" title="Verwijder evenement">🗑️</button>
                        </div>
                        ` : ''}
                    </div>
                    <div class="agenda-item-date">${formattedDate}</div>
                    ${event.location ? `<div class="agenda-item-location">📍 ${escapeHtml(event.location)}</div>` : ''}
                    ${event.description ? `<div class="agenda-item-description">${escapeHtml(event.description)}</div>` : ''}
                    ${isPast ? '<div class="agenda-item-badge">Afgelopen</div>' : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Add new event
function addEvent(eventData) {
    const events = loadEvents();
    
    const newEvent = {
        id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: eventData.title.trim(),
        date: eventData.date,
        time: eventData.time || null,
        location: eventData.location ? eventData.location.trim() : null,
        description: eventData.description ? eventData.description.trim() : null,
        icon: eventData.icon || '📅',
        createdBy: getCurrentUser() || 'Unknown',
        createdAt: new Date().toISOString()
    };
    
    events.push(newEvent);
    
    if (saveEvents(events)) {
        displayEvents();
        closeEventModal();
        return true;
    }
    
    return false;
}

// Delete event
function deleteEvent(eventId) {
    if (!confirm('Weet je zeker dat je dit evenement wilt verwijderen?')) {
        return;
    }
    
    const events = loadEvents();
    const filteredEvents = events.filter(event => event.id !== eventId);
    
    if (saveEvents(filteredEvents)) {
        displayEvents();
    }
}

// Show add event modal
function showEventModal() {
    const modal = document.getElementById('addEventModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Set minimum date to today and default to 2026
        const dateInput = document.getElementById('eventDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
            
            // Set default value to first day of 2026 if today is before 2026
            const currentYear = new Date().getFullYear();
            if (currentYear < 2026) {
                dateInput.value = '2026-01-01';
            } else {
                // If we're already in 2026 or later, use today's date
                dateInput.value = today;
            }
        }
    }
}

// Close add event modal
function closeEventModal() {
    const modal = document.getElementById('addEventModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Reset form
        const form = document.getElementById('addEventForm');
        if (form) {
            form.reset();
            // Reset icon to default
            const iconInput = document.getElementById('eventIcon');
            if (iconInput) {
                iconInput.value = '📅';
            }
        }
    }
}

// Check if user is logged in (use auth.js functions)
function checkAuth() {
    // Try Components first
    if (typeof Components !== 'undefined' && Components.isLoggedIn) {
        const result = Components.isLoggedIn();
        console.log('checkAuth via Components:', result);
        return result;
    }
    // Try auth.js isAuthenticated
    if (typeof isAuthenticated === 'function') {
        const result = isAuthenticated();
        console.log('checkAuth via isAuthenticated:', result);
        return result;
    }
    console.log('checkAuth: no auth function found');
    return false;
}

function getCurrentUser() {
    // Try Components first
    if (typeof Components !== 'undefined' && Components.getCurrentUser) {
        return Components.getCurrentUser();
    }
    // Try auth.js getCurrentUser
    if (typeof window.getCurrentUser === 'function') {
        return window.getCurrentUser();
    }
    // Try global getCurrentUser
    if (typeof getCurrentUser === 'function' && getCurrentUser !== arguments.callee) {
        return getCurrentUser();
    }
    return null;
}

// Check if user is logged in (use auth.js functions)
function checkAuth() {
    // Try Components first
    if (typeof Components !== 'undefined' && Components.isLoggedIn) {
        const result = Components.isLoggedIn();
        console.log('checkAuth via Components:', result);
        return result;
    }
    // Try auth.js isAuthenticated
    if (typeof isAuthenticated === 'function') {
        const result = isAuthenticated();
        console.log('checkAuth via isAuthenticated:', result);
        return result;
    }
    console.log('checkAuth: no auth function found');
    return false;
}

function getCurrentUser() {
    // Try Components first
    if (typeof Components !== 'undefined' && Components.getCurrentUser) {
        return Components.getCurrentUser();
    }
    // Try auth.js getCurrentUser
    if (typeof window.getCurrentUser === 'function') {
        return window.getCurrentUser();
    }
    return null;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize agenda page
function initializeAgenda() {
    console.log('Initializing agenda page...');
    
    // Remove test event from localStorage if it exists
    try {
        const events = JSON.parse(localStorage.getItem('agendaEvents') || '[]');
        const filteredEvents = events.filter(event => {
            return !(event.title === 'test' && event.date === '2026-07-21');
        });
        if (events.length !== filteredEvents.length) {
            localStorage.setItem('agendaEvents', JSON.stringify(filteredEvents));
        }
    } catch (e) {
        console.error('Error removing test event:', e);
    }
    
    // Check if user is logged in
    const isLoggedIn = checkAuth();
    console.log('User logged in:', isLoggedIn);
    
    // Show/hide add event button
    const addEventSection = document.getElementById('addEventSection');
    console.log('addEventSection found:', !!addEventSection);
    console.log('isLoggedIn:', isLoggedIn);
    if (addEventSection) {
        addEventSection.style.display = isLoggedIn ? 'block' : 'none';
        console.log('addEventSection display set to:', addEventSection.style.display);
    } else {
        console.error('addEventSection element not found');
    }
    
    // Setup add event button
    const addEventBtn = document.getElementById('addEventBtn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', () => {
            if (isLoggedIn) {
                showEventModal();
            } else {
                alert('Je moet ingelogd zijn om evenementen toe te voegen.');
            }
        });
    }
    
    // Setup modal close buttons
    const closeEventModalBtn = document.getElementById('closeEventModal');
    const cancelEventBtn = document.getElementById('cancelEventBtn');
    
    if (closeEventModalBtn) {
        closeEventModalBtn.addEventListener('click', closeEventModal);
    }
    
    if (cancelEventBtn) {
        cancelEventBtn.addEventListener('click', closeEventModal);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('addEventModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeEventModal();
            }
        });
    }
    
    // Setup form submission
    const form = document.getElementById('addEventForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!isLoggedIn) {
                alert('Je moet ingelogd zijn om evenementen toe te voegen.');
                return;
            }
            
            const formData = new FormData(form);
            const eventData = {
                title: formData.get('title'),
                date: formData.get('date'),
                time: formData.get('time'),
                location: formData.get('location'),
                description: formData.get('description'),
                icon: formData.get('icon') || '📅'
            };
            
            if (addEvent(eventData)) {
                // Success - form is reset in closeEventModal
            }
        });
    }
    
    // Display events
    displayEvents();
    
    // Listen for storage changes (for cross-tab synchronization)
    window.addEventListener('storage', (e) => {
        if (e.key === 'agendaEvents') {
            displayEvents();
        }
    });
}

// Make functions globally available
window.deleteEvent = deleteEvent;
window.initializeAgenda = initializeAgenda;

