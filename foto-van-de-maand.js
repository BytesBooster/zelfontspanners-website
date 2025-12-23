// Foto van de Maand Page Script - Met Upload en Beoordeling

// Data structure:
// fotoVanDeMaandSubmissions: {
//   "2025-01": {
//     submissions: [
//       { id: "uuid", photographer: "Naam", title: "Titel", imageSrc: "base64", votes: ["lid1", "lid2"], uploadDate: "timestamp" }
//     ],
//     winner: { id: "uuid", ... } // Winner at end of month
//   }
// }

// Load submissions data
function loadSubmissions() {
    return JSON.parse(localStorage.getItem('fotoVanDeMaandSubmissions') || '{}');
}

// Save submissions data
function saveSubmissions(data) {
    localStorage.setItem('fotoVanDeMaandSubmissions', JSON.stringify(data));
}

// Get current month key (YYYY-MM)
function getCurrentMonthKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// Get month name
function getMonthName(monthKey) {
    const monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 
                       'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    const month = parseInt(monthKey.split('-')[1]) - 1;
    return monthNames[month] || monthKey;
}

// Get current month excursion from agenda
function getCurrentMonthExcursion() {
    if (typeof loadEvents !== 'function') {
        console.warn('loadEvents function not found. Make sure agenda.js is loaded.');
        return null;
    }
    
    try {
        const events = loadEvents();
        const currentMonthKey = getCurrentMonthKey();
        const [year, month] = currentMonthKey.split('-').map(Number);
        
        // Find events in current month
        const monthEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getFullYear() === year && 
                   eventDate.getMonth() + 1 === month;
        });
        
        // Sort by date (earliest first)
        monthEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Return first event (usually the monthly excursion)
        return monthEvents.length > 0 ? monthEvents[0] : null;
    } catch (e) {
        console.error('Error loading current month excursion:', e);
        return null;
    }
}

// Display current month excursion info
function displayExcursionInfo() {
    const excursionInfo = document.getElementById('excursionInfo');
    const excursionDetails = document.getElementById('excursionDetails');
    
    if (!excursionInfo || !excursionDetails) return;
    
    const excursion = getCurrentMonthExcursion();
    
    if (excursion) {
        excursionInfo.style.display = 'block';
        
        const excursionDate = new Date(excursion.date);
        const monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 
                           'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
        const formattedDate = `${excursionDate.getDate()} ${monthNames[excursionDate.getMonth()]} ${excursionDate.getFullYear()}`;
        
        excursionDetails.innerHTML = `
            <div class="excursion-card">
                <div class="excursion-icon">${excursion.icon || '📷'}</div>
                <div class="excursion-content">
                    <h3>${excursion.title || 'Excursie'}</h3>
                    <p class="excursion-date">📅 ${formattedDate}${excursion.time ? ` om ${excursion.time}` : ''}</p>
                    ${excursion.location ? `<p class="excursion-location">📍 ${excursion.location}</p>` : ''}
                    ${excursion.description ? `<p class="excursion-description">${excursion.description}</p>` : ''}
                </div>
            </div>
        `;
    } else {
        excursionInfo.style.display = 'none';
    }
}

// Get user's submissions for current month
function getUserSubmissionsForMonth(monthKey) {
    const submissions = loadSubmissions();
    const monthData = submissions[monthKey] || { submissions: [] };
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    
    if (!currentUser) return [];
    
    return monthData.submissions.filter(sub => sub.photographer === currentUser);
}

// Check if user can upload (max 5 per month, only current month)
function canUserUpload() {
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!currentUser) return false;
    
    const currentMonthKey = getCurrentMonthKey();
    const userSubmissions = getUserSubmissionsForMonth(currentMonthKey);
    
    return userSubmissions.length < 5;
}

// Get remaining upload slots
function getRemainingUploadSlots() {
    const currentMonthKey = getCurrentMonthKey();
    const userSubmissions = getUserSubmissionsForMonth(currentMonthKey);
    return Math.max(0, 5 - userSubmissions.length);
}

// Display upload section
function displayUploadSection() {
    const uploadSection = document.getElementById('uploadSection');
    const uploadCount = document.getElementById('uploadCount');
    
    if (typeof isAuthenticated === 'function' && isAuthenticated()) {
        const currentMonthKey = getCurrentMonthKey();
        const userSubmissions = getUserSubmissionsForMonth(currentMonthKey);
        const remaining = getRemainingUploadSlots();
        
        if (uploadSection) {
            uploadSection.style.display = 'block';
        }
        
        if (uploadCount) {
            if (userSubmissions.length === 0) {
                uploadCount.innerHTML = '<p class="upload-count-text">Je hebt nog geen foto\'s ingezonden deze maand. Je kunt nog <strong>5 foto\'s</strong> uploaden.</p>';
            } else {
                uploadCount.innerHTML = `<p class="upload-count-text">Je hebt <strong>${userSubmissions.length}</strong> foto${userSubmissions.length === 1 ? '' : '\'s'} ingezonden. Je kunt nog <strong>${remaining}</strong> foto${remaining === 1 ? '' : '\'s'} uploaden.</p>`;
            }
        }
        
        // Disable upload if limit reached
        const dropZone = document.getElementById('dropZone');
        if (dropZone && remaining === 0) {
            dropZone.style.opacity = '0.5';
            dropZone.style.pointerEvents = 'none';
            if (uploadCount) {
                uploadCount.innerHTML = '<p class="upload-count-text error">Je hebt het maximum van 5 foto\'s bereikt voor deze maand.</p>';
            }
        } else if (dropZone) {
            dropZone.style.opacity = '1';
            dropZone.style.pointerEvents = 'auto';
        }
    } else {
        if (uploadSection) {
            uploadSection.style.display = 'none';
        }
    }
}

// Display submitted fotos for current month
function displaySubmittedFotos() {
    const grid = document.getElementById('submittedFotosGrid');
    const currentMonthKey = getCurrentMonthKey();
    const submissions = loadSubmissions();
    const monthData = submissions[currentMonthKey] || { submissions: [] };
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    const userVotes = loadUserVotes();
    
    if (!grid) return;
    
    if (monthData.submissions.length === 0) {
        grid.innerHTML = '<p class="no-fotos">Nog geen foto\'s ingezonden deze maand.</p>';
        return;
    }
    
    // Sort by votes (most votes first)
    const sortedSubmissions = [...monthData.submissions].sort((a, b) => {
        return (b.votes || []).length - (a.votes || []).length;
    });
    
    grid.innerHTML = sortedSubmissions.map(submission => {
        const voteCount = (submission.votes || []).length;
        const hasVoted = currentUser && (submission.votes || []).includes(currentUser);
        const isOwnPhoto = currentUser && submission.photographer === currentUser;
        
        return `
            <div class="foto-van-de-maand-submission-item" data-id="${submission.id}">
                <div class="submission-image-container">
                    <img src="${submission.imageSrc}" alt="${submission.title || 'Foto'}" loading="lazy">
                    ${voteCount > 0 ? `<div class="vote-badge">${voteCount} ${voteCount === 1 ? 'stem' : 'stemmen'}</div>` : ''}
                </div>
                <div class="submission-info">
                    <h3>${submission.title || 'Foto'}</h3>
                    <p>Door: ${submission.photographer}</p>
                    ${submission.excursionTitle ? `<p class="submission-excursion">📷 ${submission.excursionTitle}${submission.excursionLocation ? ` - ${submission.excursionLocation}` : ''}</p>` : ''}
                    ${currentUser && !isOwnPhoto ? `
                        <button class="btn-vote ${hasVoted ? 'voted' : ''}" onclick="voteForFoto('${submission.id}')">
                            ${hasVoted ? '✓ Gestemd' : 'Stem op deze foto'}
                        </button>
                    ` : isOwnPhoto ? '<p class="own-photo">Je eigen foto</p>' : '<p class="login-to-vote">Log in om te stemmen</p>'}
                </div>
            </div>
        `;
    }).join('');
}

// Load user votes
function loadUserVotes() {
    return JSON.parse(localStorage.getItem('fotoVanDeMaandUserVotes') || '{}');
}

// Save user votes
function saveUserVotes(votes) {
    localStorage.setItem('fotoVanDeMaandUserVotes', JSON.stringify(votes));
}

// Vote for a foto
window.voteForFoto = function(fotoId) {
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!currentUser) {
        alert('Je moet ingelogd zijn om te stemmen.');
        return;
    }
    
    const currentMonthKey = getCurrentMonthKey();
    const submissions = loadSubmissions();
    const monthData = submissions[currentMonthKey] || { submissions: [] };
    
    const submission = monthData.submissions.find(s => s.id === fotoId);
    if (!submission) return;
    
    // Check if user already voted
    const votes = submission.votes || [];
    const hasVoted = votes.includes(currentUser);
    
    if (hasVoted) {
        // Remove vote
        submission.votes = votes.filter(v => v !== currentUser);
    } else {
        // Add vote
        submission.votes = [...votes, currentUser];
    }
    
    submissions[currentMonthKey] = monthData;
    saveSubmissions(submissions);
    
    // Reload display
    displaySubmittedFotos();
    displayCurrentWinner();
};

// Display current winner (most votes)
function displayCurrentWinner() {
    const currentMonthKey = getCurrentMonthKey();
    const submissions = loadSubmissions();
    const monthData = submissions[currentMonthKey] || { submissions: [] };
    
    if (monthData.submissions.length === 0) {
        // Show placeholder
        const currentFoto = document.getElementById('currentFoto');
        if (currentFoto) {
            const monthName = getMonthName(currentMonthKey);
            const year = currentMonthKey.split('-')[0];
            currentFoto.innerHTML = `
                <div class="foto-van-de-maand-image-container">
                    <div class="foto-van-de-maand-placeholder">
                        <p>Nog geen winnaar deze maand</p>
                        <small>Stem op je favoriete foto!</small>
                    </div>
                    <div class="foto-van-de-maand-overlay">
                        <div class="foto-van-de-maand-info">
                            <h2 class="foto-van-de-maand-title">Foto van de Maand</h2>
                            <p class="foto-van-de-maand-date">${monthName} ${year}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        return;
    }
    
    // Find submission with most votes
    const winner = [...monthData.submissions].sort((a, b) => {
        return (b.votes || []).length - (a.votes || []).length;
    })[0];
    
    const currentFoto = document.getElementById('currentFoto');
    if (currentFoto && winner) {
        const monthName = getMonthName(currentMonthKey);
        const year = currentMonthKey.split('-')[0];
        const voteCount = (winner.votes || []).length;
        
        currentFoto.innerHTML = `
            <div class="foto-van-de-maand-image-container">
                <img src="${winner.imageSrc}" alt="${winner.title || 'Foto'}" class="foto-van-de-maand-image">
                <div class="foto-van-de-maand-overlay">
                    <div class="foto-van-de-maand-info">
                        <h2 class="foto-van-de-maand-title">${winner.title || 'Foto van de Maand'}</h2>
                        <p class="foto-van-de-maand-photographer">Door: ${winner.photographer}</p>
                        ${winner.excursionTitle ? `<p class="foto-van-de-maand-excursion">📷 ${winner.excursionTitle}${winner.excursionLocation ? ` - ${winner.excursionLocation}` : ''}</p>` : ''}
                        <p class="foto-van-de-maand-date">${monthName} ${year}</p>
                        <p class="foto-van-de-maand-votes">${voteCount} ${voteCount === 1 ? 'stem' : 'stemmen'}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Display archived winners
function displayArchivedFotos() {
    const archiveGrid = document.getElementById('fotoArchive');
    const submissions = loadSubmissions();
    
    if (!archiveGrid) return;
    
    // Get all months with winners
    const archived = [];
    Object.keys(submissions).forEach(monthKey => {
        const monthData = submissions[monthKey];
        if (monthData.winner) {
            archived.push({
                key: monthKey,
                ...monthData.winner
            });
        }
    });
    
    // Sort by date (newest first)
    archived.sort((a, b) => {
        const yearA = parseInt(a.key.split('-')[0]);
        const monthA = parseInt(a.key.split('-')[1]);
        const yearB = parseInt(b.key.split('-')[0]);
        const monthB = parseInt(b.key.split('-')[1]);
        
        if (yearA !== yearB) return yearB - yearA;
        return monthB - monthA;
    });
    
    if (archived.length === 0) {
        archiveGrid.innerHTML = '<p class="no-fotos">Nog geen archief beschikbaar.</p>';
        return;
    }
    
    archiveGrid.innerHTML = archived.map(foto => {
        const monthName = getMonthName(foto.key);
        const year = foto.key.split('-')[0];
        
        return `
            <div class="foto-van-de-maand-item" data-key="${foto.key}">
                <div class="foto-van-de-maand-item-image">
                    <img src="${foto.imageSrc}" alt="${foto.title || 'Foto'}" loading="lazy">
                </div>
                <div class="foto-van-de-maand-item-info">
                    <h3>${foto.title || 'Foto van de Maand'}</h3>
                    <p>Door: ${foto.photographer || 'Onbekend'}</p>
                    ${foto.excursionTitle ? `<p class="foto-excursion">📷 ${foto.excursionTitle}${foto.excursionLocation ? ` - ${foto.excursionLocation}` : ''}</p>` : ''}
                    <p class="foto-date">${monthName} ${year}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Setup file upload
function setupFileUpload() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fotoUploadInput');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewGrid = document.getElementById('previewGrid');
    
    if (!dropZone || !fileInput) return;
    
    let pendingFiles = [];
    
    // Click to select
    dropZone.addEventListener('click', () => {
        if (canUserUpload()) {
            fileInput.click();
        }
    });
    
    // Drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (canUserUpload()) {
            dropZone.classList.add('drag-over');
        }
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        if (!canUserUpload()) return;
        
        const files = Array.from(e.dataTransfer.files).filter(file => 
            file.type.match(/^image\/(jpeg|jpg)$/i)
        );
        
        if (files.length > 0) {
            handleFileSelection(files);
        }
    });
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFileSelection(files);
        }
    });
    
    function handleFileSelection(files) {
        const remaining = getRemainingUploadSlots();
        
        // Check if user can still upload
        if (remaining <= 0) {
            alert('Je hebt het maximum van 5 foto\'s bereikt voor deze maand.');
            return;
        }
        
        const validFiles = [];
        
        files.forEach(file => {
            if (!file.type.match(/^image\/(jpeg|jpg)$/i)) {
                alert(`${file.name}: Geen JPEG bestand`);
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                alert(`${file.name}: Te groot (max 5MB)`);
                return;
            }
            
            validFiles.push(file);
        });
        
        if (validFiles.length === 0) return;
        
        // Limit to remaining slots
        if (validFiles.length > remaining) {
            alert(`Je kunt nog maar ${remaining} foto${remaining === 1 ? '' : '\'s'} uploaden deze maand. Alleen de eerste ${remaining} foto${remaining === 1 ? '' : '\'s'} worden geselecteerd.`);
            validFiles.splice(remaining);
        }
        
        pendingFiles = validFiles;
        showUploadPreview();
    }
    
    function showUploadPreview() {
        if (!uploadPreview || !previewGrid) return;
        
        uploadPreview.style.display = 'block';
        previewGrid.innerHTML = pendingFiles.map((file, index) => `
            <div class="preview-item">
                <img src="${URL.createObjectURL(file)}" alt="${file.name}">
                <p>${file.name}</p>
                <small>${(file.size / 1024 / 1024).toFixed(2)} MB</small>
            </div>
        `).join('');
    }
    
    // Cancel upload
    const cancelBtn = document.getElementById('cancelUploadBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            pendingFiles = [];
            uploadPreview.style.display = 'none';
            fileInput.value = '';
        });
    }
    
    // Upload fotos
    const uploadBtn = document.getElementById('uploadFotosBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', async () => {
            if (pendingFiles.length === 0) return;
            
            const titleInput = document.getElementById('uploadFotoTitle');
            const baseTitle = titleInput ? titleInput.value.trim() : '';
            const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
            
            if (!currentUser) {
                alert('Je moet ingelogd zijn om foto\'s te uploaden.');
                return;
            }
            
            const currentMonthKey = getCurrentMonthKey();
            const submissions = loadSubmissions();
            const monthData = submissions[currentMonthKey] || { submissions: [] };
            
            // Check current user's submissions for this month
            const userSubmissions = monthData.submissions.filter(sub => sub.photographer === currentUser);
            const remaining = 5 - userSubmissions.length;
            
            // Final check: ensure we don't exceed the limit
            if (remaining <= 0) {
                alert('Je hebt het maximum van 5 foto\'s bereikt voor deze maand.');
                return;
            }
            
            // Limit pending files to remaining slots
            if (pendingFiles.length > remaining) {
                alert(`Je kunt nog maar ${remaining} foto${remaining === 1 ? '' : '\'s'} uploaden deze maand. Alleen de eerste ${remaining} foto${remaining === 1 ? '' : '\'s'} worden geüpload.`);
                pendingFiles = pendingFiles.slice(0, remaining);
            }
            
            const uploadedCount = pendingFiles.length;
            
            // Process each file
            for (const file of pendingFiles) {
                const reader = new FileReader();
                
                await new Promise((resolve) => {
                    reader.onload = function(e) {
                        const base64 = e.target.result;
                        const photoTitle = baseTitle || file.name.replace(/\.[^/.]+$/, '');
                        
                        // Compress image if needed
                        compressImage(base64, (compressedBase64) => {
                            // Get current month excursion info
                            const excursion = getCurrentMonthExcursion();
                            
                            const submission = {
                                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                                photographer: currentUser,
                                title: photoTitle,
                                imageSrc: compressedBase64,
                                votes: [],
                                uploadDate: new Date().toISOString(),
                                excursionId: excursion ? excursion.id : null,
                                excursionTitle: excursion ? excursion.title : null,
                                excursionLocation: excursion ? excursion.location : null,
                                excursionDate: excursion ? excursion.date : null
                            };
                            
                            monthData.submissions.push(submission);
                            resolve();
                        });
                    };
                    reader.readAsDataURL(file);
                });
            }
            
            submissions[currentMonthKey] = monthData;
            saveSubmissions(submissions);
            
            // Reset
            pendingFiles = [];
            if (uploadPreview) uploadPreview.style.display = 'none';
            if (fileInput) fileInput.value = '';
            if (titleInput) titleInput.value = '';
            
            // Reload displays
            displayUploadSection();
            displaySubmittedFotos();
            displayCurrentWinner();
            
            alert(`${uploadedCount} foto${uploadedCount === 1 ? '' : '\'s'} ingezonden!`);
        });
    }
}

// Simple image compression
function compressImage(base64, callback, quality = 0.8, maxWidth = 1920) {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        callback(compressedBase64);
    };
    img.src = base64;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Display current month excursion info
    displayExcursionInfo();
    
    // Display upload section if logged in
    displayUploadSection();
    
    // Setup file upload
    setupFileUpload();
    
    // Display submitted fotos
    displaySubmittedFotos();
    
    // Display current winner
    displayCurrentWinner();
    
    // Display archive
    displayArchivedFotos();
    
    // Setup modal close
    const modalClose = document.getElementById('fotoModalClose');
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            document.getElementById('fotoModal').style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('fotoModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
