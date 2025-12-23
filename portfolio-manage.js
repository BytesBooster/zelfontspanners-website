// Portfolio Management Script

let currentMember = null;
let hasUnsavedChanges = false; // Track if there are unsaved changes
let lastSavedState = null; // Store the last saved state for comparison

// Undo/Redo system
let undoStack = [];
let redoStack = [];
const MAX_UNDO_STACK = 50;

// Bulk selection
let selectedPhotos = new Set();

// Photo rotation
let photoRotations = {}; // Store rotation angles per photo src

// Load photo rotations from localStorage
function loadPhotoRotations() {
    try {
        const savedRotations = JSON.parse(localStorage.getItem('photoRotations') || '{}');
        photoRotations = savedRotations[currentMember] || {};
    } catch (e) {
        console.error('Error loading photo rotations:', e);
        photoRotations = {};
    }
}

// Save photo rotations to localStorage
function savePhotoRotations() {
    try {
        const allRotations = JSON.parse(localStorage.getItem('photoRotations') || '{}');
        allRotations[currentMember] = photoRotations;
        localStorage.setItem('photoRotations', JSON.stringify(allRotations));
    } catch (e) {
        console.error('Error saving photo rotations:', e);
    }
}

// Upload state
let uploadQueue = [];
let isUploading = false;

// Load portfolio data - uses shared function from portfolio-data.js
// This ensures consistency between management and public views
// Note: loadPortfolioData() is defined in portfolio-data.js

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    if (!isAuthenticated()) {
        document.getElementById('authCheck').style.display = 'block';
        document.getElementById('portfolioManageContent').style.display = 'none';
        return;
    }
    
    currentMember = getCurrentUser();
    
    if (!currentMember) {
        document.getElementById('authCheck').style.display = 'block';
        document.getElementById('portfolioManageContent').style.display = 'none';
        return;
    }
    
    // Check if user can access this portfolio
    if (!canAccessPortfolio(currentMember)) {
        document.getElementById('authCheck').style.display = 'block';
        document.getElementById('portfolioManageContent').style.display = 'none';
        return;
    }
    
    // Show content
    document.getElementById('authCheck').style.display = 'none';
    document.getElementById('portfolioManageContent').style.display = 'block';
    
    // Update member subtitle
    document.getElementById('memberSubtitle').textContent = `Beheer je portfolio foto's - ${currentMember}`;
    
    // Update view portfolio link
    const viewLink = document.getElementById('viewPortfolioLink');
    viewLink.href = `portfolio.html?member=${encodeURIComponent(currentMember)}`;
    
    // Load photo rotations
    loadPhotoRotations();
    
    // Load current photos FIRST (before setting up features that depend on photos)
    loadCurrentPhotos();
    
    // Setup new features AFTER loading photos
    setupSearchAndFilter();
    setupBulkActions();
    setupDragAndDropUpload();
    setupUploadPreview();
    setupUndoRedo();
    setupExport();
    setupPhotoRotation();
    setupEditTitle();
    setupToastNotifications();
    
    // Setup form handler
    setupPhotoForm();
    
    // Setup save button
    setupSaveButton();
    
    // Setup beforeunload warning for unsaved changes
    setupBeforeUnloadWarning();
    
    // Initialize last saved state
    updateLastSavedState();
});

// Show save button when there are unsaved changes
function showSaveButton() {
    const saveBtn = document.getElementById('saveChangesBtn');
    if (saveBtn) {
        saveBtn.style.display = 'inline-block';
        saveBtn.style.visibility = 'visible';
        saveBtn.style.opacity = '1';
        console.log('✓ Save button shown');
    } else {
        console.error('✗ Save button element not found!');
        // Try to find it after a delay (in case DOM is not ready)
        setTimeout(() => {
            const retryBtn = document.getElementById('saveChangesBtn');
            if (retryBtn) {
                retryBtn.style.display = 'inline-block';
                retryBtn.style.visibility = 'visible';
                retryBtn.style.opacity = '1';
                console.log('✓ Save button shown (retry)');
            } else {
                console.error('✗ Save button still not found after retry');
            }
        }, 100);
    }
}

// Hide save button when all changes are saved
function hideSaveButton() {
    const saveBtn = document.getElementById('saveChangesBtn');
    if (saveBtn) {
        saveBtn.style.display = 'none';
    }
}

// Setup save button functionality
function setupSaveButton() {
    const saveBtn = document.getElementById('saveChangesBtn');
    if (!saveBtn) return;
    
    saveBtn.addEventListener('click', function() {
        saveChanges();
    });
}

// Save all changes
function saveChanges() {
    try {
        // Get current state from localStorage
        const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}');
        const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
        const hiddenPhotos = JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}');
        
        // The changes are already in localStorage from drag & drop and delete operations
        // We just need to update the saved state reference
        
        // Update saved state
        updateLastSavedState();
        
        // Hide save button
        hideSaveButton();
        
        // Show success message
        const saveBtn = document.getElementById('saveChangesBtn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '✓ Opgeslagen!';
        saveBtn.style.background = 'rgba(76, 175, 80, 0.9)';
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.background = '';
        }, 2000);
        
        // Trigger synchronization event
        triggerPortfolioSync();
        
        // Toast notification removed - only show for photo deletion
        console.log('Changes saved successfully');
    } catch (e) {
        console.error('Error saving changes:', e);
        // Error toast removed - only show for photo deletion
        console.error('Error saving changes:', e);
    }
}

// Unified function to extract src from a photo item element
// Works consistently for ALL image types (Base64 and file paths)
// This ensures the same src is used in dragstart and drop handlers
function extractPhotoSrc(item) {
    if (!item) {
        console.warn('extractPhotoSrc: item is null');
        return null;
    }
    
    const img = item.querySelector('img');
    
    // For Base64 images: always use img.src (the full Base64 string)
    // This is the most reliable source for Base64 URLs
    if (img && img.src && img.src.startsWith('data:image')) {
        return img.src;
    }
    
    // For file paths: use dataset attributes first (they contain the original path)
    // This ensures consistency even if img.src is a relative URL or transformed
    const datasetOriginalSrc = item.dataset.originalSrc;
    const datasetPhotoSrc = item.dataset.photoSrc;
    
    if (datasetOriginalSrc) {
        return datasetOriginalSrc;
    }
    
    if (datasetPhotoSrc) {
        return datasetPhotoSrc;
    }
    
    // Fallback to img.src if dataset attributes are not available
    if (img && img.src) {
        return img.src;
    }
    
    // Last resort: try dataset.fullSrc
    const datasetFullSrc = item.dataset.fullSrc;
    if (datasetFullSrc) {
        return datasetFullSrc;
    }
    
    console.warn('extractPhotoSrc: Could not extract src from item', item);
    return null;
}

// Helper function to compare order arrays (handles Base64 URLs correctly)
// Uses normalizePhotoSrc from portfolio-data.js
function compareOrderArrays(order1, order2) {
    if (!order1 || !order2) return order1 === order2;
    if (order1.length !== order2.length) return false;
    
    // Compare each element, handling Base64 URLs specially
    for (let i = 0; i < order1.length; i++) {
        const src1 = normalizePhotoSrc(order1[i]);
        const src2 = normalizePhotoSrc(order2[i]);
        
        if (src1 !== src2) {
            return false;
        }
    }
    
    return true;
}

// Update last saved state for comparison
function updateLastSavedState() {
    try {
        if (!currentMember) {
            console.warn('Cannot update saved state: no current member');
            return;
        }
        
        const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}');
        const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
        const hiddenPhotos = JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}');
        
        const currentOrder = orderData[currentMember] || [];
        const currentPhotos = userData[currentMember] || [];
        const currentHidden = hiddenPhotos[currentMember] || [];
        
        // Normalize arrays for comparison
        const normalizedOrder = currentOrder.map(src => normalizePhotoSrc(src));
        const normalizedPhotos = currentPhotos.map(p => ({
            ...p,
            src: normalizePhotoSrc(p.src)
        }));
        const normalizedHidden = currentHidden.map(src => normalizePhotoSrc(src));
        
        const newState = {
            order: normalizedOrder,
            photos: normalizedPhotos,
            hidden: normalizedHidden
        };
        
        // Compare states using normalized comparison
        if (lastSavedState) {
            const orderChanged = !compareOrderArrays(newState.order, lastSavedState.order);
            const photosChanged = JSON.stringify(newState.photos) !== JSON.stringify(lastSavedState.photos);
            const hiddenChanged = JSON.stringify(newState.hidden) !== JSON.stringify(lastSavedState.hidden);
            
            const stateChanged = orderChanged || photosChanged || hiddenChanged;
            
            if (!stateChanged) {
                hasUnsavedChanges = false;
                hideSaveButton();
            }
        }
        
        // Update saved state (store arrays directly, not stringified)
        lastSavedState = {
            order: [...newState.order], // Create copy
            photos: JSON.parse(JSON.stringify(newState.photos)), // Deep copy
            hidden: [...newState.hidden] // Create copy
        };
    } catch (e) {
        console.error('Error updating saved state:', e);
    }
}

// Check if there are unsaved changes by comparing current state with last saved state
function checkForUnsavedChanges() {
    try {
        const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}');
        const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
        const hiddenPhotos = JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}');
        
        const currentOrder = orderData[currentMember] || [];
        const currentPhotos = userData[currentMember] || [];
        const currentHidden = hiddenPhotos[currentMember] || [];
        
        // Compare with last saved state using normalized comparison
        if (lastSavedState) {
            const orderChanged = !compareOrderArrays(currentOrder, lastSavedState.order);
            const photosChanged = JSON.stringify(currentPhotos) !== JSON.stringify(lastSavedState.photos);
            const hiddenChanged = JSON.stringify(currentHidden) !== JSON.stringify(lastSavedState.hidden);
            
            const hasChanges = orderChanged || photosChanged || hiddenChanged;
            
            hasUnsavedChanges = hasChanges;
            return hasChanges;
        }
        
        // If no saved state exists, assume no changes
        hasUnsavedChanges = false;
        return false;
    } catch (e) {
        console.error('Error checking for unsaved changes:', e);
        return false;
    }
}

// Trigger portfolio synchronization event
// This notifies the public portfolio page to reload
function triggerPortfolioSync() {
    if (!currentMember) {
        console.warn('Cannot trigger sync: no current member');
        return;
    }
    
    // Dispatch custom event for same-tab synchronization
    const syncEvent = new CustomEvent('portfolioOrderChanged', {
        detail: {
            member: currentMember,
            timestamp: Date.now()
        }
    });
    window.dispatchEvent(syncEvent);
    
    // For cross-tab synchronization, we need to trigger a storage event
    // Since StorageEvent can't be manually created, we'll use a workaround:
    // Set a temporary value and immediately remove it to trigger storage event
    const syncKey = 'portfolioSyncTrigger';
    const syncValue = Date.now().toString();
    localStorage.setItem(syncKey, syncValue);
    setTimeout(() => {
        localStorage.removeItem(syncKey);
    }, 10);
    
    console.log('Portfolio sync triggered for:', currentMember);
}

// Setup beforeunload warning
function setupBeforeUnloadWarning() {
    // Waarschuwingen bij het verlaten van de pagina zijn uitgeschakeld
    // Geen actie vereist
}

// Load current photos from portfolio
function loadCurrentPhotos() {
    console.log('=== loadCurrentPhotos called ===');
    console.log('Current member:', currentMember);
    
    const grid = document.getElementById('currentPhotosGrid');
    if (!grid) {
        console.error('Photo grid not found!');
        return;
    }
    
    // Show loading indicator
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
    
    // Use loadPortfolioData() which already combines static + user photos, filters hidden ones,
    // removes duplicates, and sorts by portfolioOrder. This is the single source of truth!
    let allPhotos = [];
    try {
        console.log('Loading portfolio data...');
        console.log('Current member:', currentMember);
        
        // Check if loadPortfolioData is available
        if (typeof loadPortfolioData !== 'function') {
            console.error('loadPortfolioData function not found! Make sure portfolio-data.js is loaded.');
            grid.innerHTML = '<p class="no-photos">Fout: portfolio-data.js niet geladen. Controleer de console.</p>';
            return;
        }
        
        const allPortfolioData = loadPortfolioData();
        console.log('Portfolio data loaded:', Object.keys(allPortfolioData));
        console.log('Member data:', allPortfolioData[currentMember]);
        
        if (!allPortfolioData[currentMember]) {
            console.error('No portfolio data found for member:', currentMember);
            console.log('Available members:', Object.keys(allPortfolioData));
        }
        
        // loadPortfolioData() already:
        // - Combines static and user photos
        // - Filters out hidden photos
        // - Sorts by portfolioOrder
        // - Removes duplicates
        // So we can use it directly without recombining!
        if (allPortfolioData[currentMember] && allPortfolioData[currentMember].photos) {
            console.log('Found photos in portfolio data:', allPortfolioData[currentMember].photos.length);
            
            // Mark all photos as user-uploaded so they can be managed (deleted, reordered, etc.)
            allPhotos = allPortfolioData[currentMember].photos.map(photo => ({
                ...photo,
                isUserUploaded: true  // All photos are now editable
            }));
            
            console.log('Photos loaded (already combined, filtered, sorted, deduplicated):', allPhotos.length);
        } else {
            console.warn('No photos found in portfolio data for member:', currentMember);
            console.warn('Available members:', Object.keys(allPortfolioData));
        }
    } catch (e) {
        console.error('Error loading portfolio data:', e);
        console.error(e.stack);
    }
    
    // Get saved order for final sorting (if needed - but loadPortfolioData already sorted them)
    const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}');
    const savedOrder = orderData[currentMember] || [];
    
    console.log('Photos before final processing:', allPhotos.length);
    
    // Sort ALL photos together using saved order or order property
    // This ensures consistent ordering between manage and public views
    // Use EXACT same logic as portfolio.js with improved Base64 matching
    if (savedOrder.length > 0) {
        // Use saved order - this is the source of truth (same as portfolio.js)
        const orderedPhotos = [];
        const photoMap = new Map(allPhotos.map(p => [p.src, p]));
        
        // Helper function to find photo by src (handles Base64 and file paths)
        function findPhotoBySrc(searchSrc) {
            // Try exact match first
            let photo = photoMap.get(searchSrc);
            if (photo) return photo;
            
            // For Base64 URLs, try partial matching (first 200 chars)
            if (searchSrc.startsWith('data:image')) {
                const searchPrefix = searchSrc.substring(0, 200);
                for (const [mapSrc, mapPhoto] of photoMap.entries()) {
                    if (mapSrc.startsWith('data:image') && mapSrc.substring(0, 200) === searchPrefix) {
                        return mapPhoto;
                    }
                }
            } else {
                // For file paths, try case-insensitive matching
                for (const [mapSrc, mapPhoto] of photoMap.entries()) {
                    if (!mapSrc.startsWith('data:image') && mapSrc.toLowerCase() === searchSrc.toLowerCase()) {
                        return mapPhoto;
                    }
                }
            }
            
            return null;
        }
        
        // First, add photos in the exact order from savedOrder
        savedOrder.forEach(src => {
            const photo = findPhotoBySrc(src);
            if (photo) {
                orderedPhotos.push(photo);
                photoMap.delete(photo.src); // Remove from map so we know it's been added
            }
        });
        
        // Then add any photos that weren't in savedOrder (new photos) to the end
        const unorderedPhotos = Array.from(photoMap.values());
        
        allPhotos = [...orderedPhotos, ...unorderedPhotos];
        
        // Update savedOrder to include new photos that weren't in it
        if (unorderedPhotos.length > 0) {
            const newOrder = [...savedOrder, ...unorderedPhotos.map(p => p.src)];
            orderData[currentMember] = newOrder;
            localStorage.setItem('portfolioOrder', JSON.stringify(orderData));
            console.log(`Updated order for ${currentMember}: added ${unorderedPhotos.length} new photos`);
        }
    } else {
        // No saved order exists - create one based on current order
        // Sort by order property if available (same as portfolio.js)
        allPhotos.sort((a, b) => {
            if (a.order && b.order) {
                return a.order - b.order;
            }
            if (a.order) return -1;
            if (b.order) return 1;
            return 0;
        });
        
        // Create initial order list if it doesn't exist
        const initialOrder = allPhotos.map(p => p.src);
        orderData[currentMember] = initialOrder;
        localStorage.setItem('portfolioOrder', JSON.stringify(orderData));
        console.log(`Created initial order for ${currentMember}: ${initialOrder.length} photos`);
    }
    
    console.log(`=== Final photo count for ${currentMember} ===`, {
        total: allPhotos.length,
        photos: allPhotos.map(p => ({ 
            title: p.title || 'Untitled', 
            src: p.src ? p.src.substring(0, 50) : 'NO SRC',
            hasSrc: !!p.src
        }))
    });
    
    // Hide loading indicator
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    
    if (allPhotos.length === 0) {
        console.warn('No photos to display!');
        grid.innerHTML = `<p class="no-photos">Nog geen foto's toegevoegd. Voeg hieronder je eerste foto's toe!</p>`;
        updatePhotoCount();
        return;
    }
    
    grid.innerHTML = allPhotos.map((photo, index) => {
        // Check if photo is user-uploaded (explicitly check for true)
        const isUserUploaded = photo.isUserUploaded === true || photo.isUserUploaded === 'true';
        
        // Escape src for safe use in HTML attributes and JavaScript
        const photoSrc = String(photo.src || '');
        // For Base64 data URLs, we need to be careful with escaping
        // Store the full src in data-photo-src for reliable matching
        const safeSrc = photoSrc.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        // For JavaScript, escape quotes and newlines (especially important for Base64)
        const safeSrcForJS = photoSrc.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
        
        // For Base64 URLs, also store a shorter version for matching
        const srcForMatching = photoSrc.startsWith('data:image') 
            ? photoSrc.substring(0, 100) + '...' // Use first 100 chars for Base64 matching
            : photoSrc; // Use full path for regular images
        
        // Delete button - only show overlay button (top left), remove bottom text button
        const deleteOverlay = `<button class="btn-delete-overlay" onclick="event.stopPropagation(); deletePhotoBySrc('${safeSrcForJS}', ${isUserUploaded})" title="Verwijder foto">🗑️</button>`;
        const editOverlay = `<button class="btn-edit-overlay" onclick="event.stopPropagation(); editPhotoTitle('${safeSrcForJS}')" title="Bewerk titel">✏️</button>`;
        const rotateOverlay = `<button class="btn-rotate-overlay" onclick="event.stopPropagation(); rotatePhoto('${safeSrcForJS}')" title="Roteer foto">🔄</button>`;
        const downloadOverlay = `<button class="btn-download-overlay" onclick="event.stopPropagation(); downloadPhoto('${safeSrcForJS}', '${(photo.title || 'Foto').replace(/'/g, '\\\'')}')" title="Download foto">⬇️</button>`;
        
        // Check if photo is selected
        // Checkbox removed - no selection needed
        const selectedClass = '';
        
        // Get rotation angle - try both safeSrc and original photoSrc for matching
        // Use photoSrcMatches if available for better matching
        const usePhotoSrcMatches = typeof photoSrcMatches === 'function';
        let rotation = 0;
        
        // Try exact match first
        if (photoRotations[photoSrc] !== undefined) {
            rotation = photoRotations[photoSrc];
        } else if (photoRotations[safeSrc] !== undefined) {
            rotation = photoRotations[safeSrc];
        } else {
            // Try to find rotation by matching src keys
            for (const [key, value] of Object.entries(photoRotations)) {
                if (usePhotoSrcMatches && photoSrcMatches(key, photoSrc)) {
                    rotation = value;
                    break;
                } else if (key === photoSrc || key === safeSrc) {
                    rotation = value;
                    break;
                }
            }
        }
        
        const rotationStyle = rotation !== 0 ? `transform: rotate(${rotation}deg);` : '';
        
        // Debug logging (only if photo has src)
        if (photo.src) {
            console.log(`Photo ${index}: isUserUploaded=${isUserUploaded}, title=${photo.title || 'Untitled'}, src preview: ${photoSrc.substring(0, 50)}...`);
        } else {
            console.warn(`Photo ${index} has no src!`, photo);
        }
        
        // Make ALL photos draggable for reordering (including new ones)
        // Store both the safe src and the original src for reliable matching
        // Store full Base64 src in data attribute for drag & drop
        // For Base64: use full photoSrc, for file paths: use safeSrc
        const fullSrcForDrag = photoSrc.startsWith('data:image') ? photoSrc : safeSrc;
        
        // Ensure all data attributes are set correctly for unified extraction
        // data-photo-src: safe/escaped version (for HTML attributes)
        // data-original-src: original unescaped version (for matching)
        // data-full-src: full src including Base64 (for drag & drop)
        return `
        <div class="photo-item ${selectedClass}" data-index="${index}" draggable="true" data-is-user="${isUserUploaded}" data-photo-src="${safeSrc}" data-original-src="${photoSrc.replace(/"/g, '&quot;')}" data-full-src="${fullSrcForDrag.replace(/"/g, '&quot;')}">
            <div class="photo-drag-handle" title="Sleep om volgorde te wijzigen">⋮⋮</div>
            ${deleteOverlay}
            ${editOverlay}
            ${rotateOverlay}
            ${downloadOverlay}
            <div class="photo-preview" style="${rotationStyle}">
                <img src="${photo.src}" alt="${photo.title || 'Foto'}" data-original-src="${photoSrc.replace(/"/g, '&quot;')}" draggable="false" onerror="this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIj48cmVjdCBmaWxsPSIjMzMzIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIvPjx0ZXh0IGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvdG8gbmlldCBnZXZvbmRlbjwvdGV4dD48L3N2Zz4=';">
            </div>
            <div class="photo-info">
                <h3 class="photo-title" data-photo-src="${safeSrc}">${photo.title || 'Foto ' + (index + 1)}</h3>
            </div>
        </div>
    `;
    }).join('');
    
    // Update photo count
    updatePhotoCount();
    
    // Setup drag and drop for ALL photos (including newly added ones)
    // Use setTimeout to ensure DOM is fully updated
    setTimeout(() => {
        reinitializeDragAndDrop();
        console.log(`Drag & drop initialized for ${allPhotos.length} photos`);
    }, 100);
}

// Update photo count display
function updatePhotoCount() {
    const grid = document.getElementById('currentPhotosGrid');
    const count = grid ? grid.querySelectorAll('.photo-item').length : 0;
    const countElement = document.getElementById('photoCount');
    if (countElement) {
        countElement.textContent = `(${count})`;
    }
}

// Setup drag and drop for reordering photos
function setupDragAndDrop() {
    const grid = document.getElementById('currentPhotosGrid');
    if (!grid) {
        console.log('Grid not found for drag and drop');
        return;
    }
    
    // Remove old event listeners by cloning and replacing
    const newGrid = grid.cloneNode(true);
    grid.parentNode.replaceChild(newGrid, grid);
    
    // Get all draggable items (all photos are draggable now)
    const items = newGrid.querySelectorAll('.photo-item[draggable="true"]');
    
    if (items.length === 0) {
        console.log('No draggable items found');
        return;
    }
    
    console.log(`Found ${items.length} draggable items`);
    
    console.log(`Setting up drag and drop for ${items.length} items`);
    
    items.forEach((newItem) => {
        newItem.addEventListener('dragstart', function(e) {
            if (this.dataset.isUser !== 'true') {
                e.preventDefault();
                return false;
            }
            
            this.classList.add('dragging');
            this.style.opacity = '0.5';
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', this.dataset.photoSrc || '');
        });
        
        newItem.addEventListener('dragend', function(e) {
            this.classList.remove('dragging');
            this.style.opacity = '';
            const allItems = newGrid.querySelectorAll('.photo-item');
            allItems.forEach(i => {
                i.classList.remove('drag-over');
            });
        });
        
        newItem.addEventListener('dragenter', function(e) {
            e.preventDefault();
            if (this.dataset.isUser === 'true') {
                this.classList.add('drag-over');
            }
        });
        
        newItem.addEventListener('dragleave', function(e) {
            this.classList.remove('drag-over');
        });
        
        newItem.addEventListener('dragover', function(e) {
            e.preventDefault();
            if (this.dataset.isUser === 'true') {
                e.dataTransfer.dropEffect = 'move';
            }
        });
        
        newItem.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const dragging = newGrid.querySelector('.dragging');
            if (!dragging || dragging === this) return;
            
            if (dragging.dataset.isUser !== 'true' || this.dataset.isUser !== 'true') {
                return;
            }
            
            // Get all items
            const allItems = Array.from(newGrid.querySelectorAll('.photo-item[data-is-user="true"]'));
            const draggingIndex = allItems.indexOf(dragging);
            const dropIndex = allItems.indexOf(this);
            
            if (draggingIndex === -1 || dropIndex === -1 || draggingIndex === dropIndex) {
                return;
            }
            
            // Reorder in DOM
            if (dropIndex > draggingIndex) {
                this.parentNode.insertBefore(dragging, this.nextSibling);
            } else {
                this.parentNode.insertBefore(dragging, this);
            }
            
            // Get new order
            const newOrder = Array.from(newGrid.querySelectorAll('.photo-item[data-is-user="true"]'))
                .map(item => item.dataset.photoSrc);
            
            // Save order
            const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
            const userPhotos = userData[currentMember] || [];
            
            // Reorder array
            const [movedPhoto] = userPhotos.splice(draggingIndex, 1);
            userPhotos.splice(dropIndex, 0, movedPhoto);
            
            // Update order
            const baseTime = Date.now();
            userPhotos.forEach((photo, idx) => {
                photo.order = baseTime + idx;
            });
            
            // Save
            userData[currentMember] = userPhotos;
            localStorage.setItem('portfolioData', JSON.stringify(userData));
            
            loadCurrentPhotos();
        });
    });
}

// Helper function to find closest element
function getClosestElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.photo-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Simple drag and drop - works for ALL photos (static + user)
function initSimpleDragDrop() {
    const grid = document.getElementById('currentPhotosGrid');
    if (!grid) {
        console.log('Grid not found');
        return;
    }
    
    // Remove old event listeners by cloning
    const newGrid = grid.cloneNode(true);
    grid.parentNode.replaceChild(newGrid, grid);
    
    // Get ALL photo items (both static and user-uploaded)
    const items = newGrid.querySelectorAll('.photo-item');
    
    if (items.length === 0) {
        console.log('No items found');
        return;
    }
    
    console.log(`Setting up drag and drop for ${items.length} items`);
    
    let draggedElement = null;
    let draggedPhotoSrc = null;
    let originalIndex = null; // Store original index before drag starts
    
    items.forEach((item) => {
        // Drag start - works for all photos (including Base64)
        item.addEventListener('dragstart', function(e) {
            // Prevent drag if clicking on delete button
            if (e.target.closest('.btn-delete-overlay')) {
                e.preventDefault();
                return false;
            }
            
            draggedElement = this;
            
            // Store original index BEFORE any DOM manipulation
            const allItemsBeforeDrag = Array.from(newGrid.querySelectorAll('.photo-item'));
            originalIndex = allItemsBeforeDrag.indexOf(this);
            
            // Use unified src extraction function - works for ALL image types
            draggedPhotoSrc = extractPhotoSrc(this);
            
            if (!draggedPhotoSrc) {
                console.error('Could not extract src from dragged element');
                console.error('Element:', this);
                console.error('Dataset:', {
                    originalSrc: this.dataset.originalSrc,
                    photoSrc: this.dataset.photoSrc,
                    fullSrc: this.dataset.fullSrc
                });
                e.preventDefault();
                return false;
            }
            
            console.log('Drag start - extracted src:', draggedPhotoSrc.substring(0, 60) + '...', 'Type:', draggedPhotoSrc.startsWith('data:image') ? 'Base64' : 'File path');
            this.classList.add('dragging');
            this.style.opacity = '0.5';
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', draggedPhotoSrc || '');
            console.log('Drag started for:', draggedPhotoSrc ? draggedPhotoSrc.substring(0, 60) + '...' : 'NO SRC', 'isUser:', this.dataset.isUser, 'originalIndex:', originalIndex);
        });
        
        // Drag end
        item.addEventListener('dragend', function(e) {
            this.classList.remove('dragging');
            this.style.opacity = '';
            newGrid.querySelectorAll('.photo-item').forEach(i => {
                i.classList.remove('drag-over');
            });
            // Reset variables only if drop was not successful (cancelled drag)
            if (originalIndex !== null) {
                // Drop handler will reset these
            }
        });
        
        // Drag enter
        item.addEventListener('dragenter', function(e) {
            e.preventDefault();
            if (this !== draggedElement) {
                this.classList.add('drag-over');
            }
        });
        
        // Drag leave
        item.addEventListener('dragleave', function(e) {
            this.classList.remove('drag-over');
        });
        
        // Drag over - allow dropping
        item.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = 'move';
            
            const dragging = newGrid.querySelector('.dragging');
            if (!dragging || dragging === this) return;
            
            // Visual feedback: show where the item will be dropped
            const rect = this.getBoundingClientRect();
            const afterElement = e.clientY < rect.top + rect.height / 2 ? this : this.nextSibling;
            
            // Temporarily move in DOM for visual feedback (will be saved on drop)
            if (afterElement == null) {
                if (dragging.nextSibling !== null) {
                    newGrid.appendChild(dragging);
                }
            } else {
                if (dragging !== afterElement && dragging.nextSibling !== afterElement) {
                    newGrid.insertBefore(dragging, afterElement);
                }
            }
        });
        
        // Drop - works for all photos
        item.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.remove('drag-over');
            
            if (!draggedElement || draggedElement === this) {
                console.log('Drop cancelled: same element or no dragged element');
                originalIndex = null;
                draggedElement = null;
                draggedPhotoSrc = null;
                return;
            }
            
            // Use the stored original index from dragstart
            const oldIndex = originalIndex;
            
            // Get all items AFTER visual reordering (DOM has already been updated by dragover)
            const allItemsAfter = Array.from(newGrid.querySelectorAll('.photo-item'));
            const newIndex = allItemsAfter.indexOf(draggedElement);
            
            // Also get the target index
            const targetIndex = allItemsAfter.indexOf(this);
            
            // Validate indices
            if (oldIndex === null || oldIndex === -1 || newIndex === -1) {
                console.error('Invalid drop - missing indices:', { 
                    oldIndex, 
                    newIndex, 
                    targetIndex, 
                    totalItems: allItemsAfter.length,
                    draggedElement: !!draggedElement,
                    originalIndex: originalIndex
                });
                originalIndex = null;
                draggedElement = null;
                draggedPhotoSrc = null;
                return;
            }
            
            // Check if position actually changed - compare oldIndex with newIndex
            const positionChanged = oldIndex !== newIndex;
            
            console.log(`=== DROP EVENT ===`);
            console.log(`Moving photo from position ${oldIndex} to ${newIndex} (target: ${targetIndex})`);
            console.log(`Position changed: ${positionChanged}`);
            console.log('Dragged element src:', draggedPhotoSrc ? draggedPhotoSrc.substring(0, 60) + '...' : 'NO SRC');
            console.log('Image type:', draggedPhotoSrc && draggedPhotoSrc.startsWith('data:image') ? 'Base64' : 'File path');
            
            // Get OLD order from localStorage BEFORE saving new order
            const orderDataBefore = JSON.parse(localStorage.getItem('portfolioOrder') || '{}');
            const oldOrder = orderDataBefore[currentMember] || [];
            
            // If position didn't change, exit early (but only after we've read the old order)
            if (!positionChanged) {
                console.log('Position did not change - no action needed');
                originalIndex = null;
                draggedElement = null;
                draggedPhotoSrc = null;
                return;
            }
            
            // Get current photo order from DOM
            // Use unified src extraction function for ALL image types (consistent with dragstart)
            const allPhotos = [];
            allItemsAfter.forEach(item => {
                const isUser = item.dataset.isUser === 'true';
                
                // Use unified src extraction function - same as in dragstart
                const src = extractPhotoSrc(item);
                
                if (src) {
                    allPhotos.push({ src, isUser });
                    const srcType = src.startsWith('data:image') ? 'Base64' : 'File';
                    console.log(`Photo ${allPhotos.length} [${srcType}]: ${src.substring(0, 60)}... (isUser: ${isUser})`);
                } else {
                    console.warn('Could not extract src from photo item:', item);
                }
            });
            
            if (allPhotos.length === 0) {
                console.log('No photos found in DOM');
                originalIndex = null;
                draggedElement = null;
                draggedPhotoSrc = null;
                return;
            }
            
            // Create a combined order list with ALL photos in their new order
            // This is the source of truth for photo order
            const newOrder = allPhotos.map(photo => photo.src);
            
            // Compare old and new order to detect changes
            // Use normalized comparison for Base64 URLs
            const orderActuallyChanged = !compareOrderArrays(oldOrder, newOrder);
            
            console.log(`Order comparison:`, {
                oldLength: oldOrder.length,
                newLength: newOrder.length,
                positionChanged: positionChanged,
                orderActuallyChanged: orderActuallyChanged
            });
            
            // Save new order to localStorage
            const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
            const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}');
            orderData[currentMember] = newOrder;
            localStorage.setItem('portfolioOrder', JSON.stringify(orderData));
            
            console.log(`Saved new order for ${currentMember}:`, newOrder.length, 'photos');
            console.log('Order:', newOrder.map((src, i) => `${i + 1}. ${src.substring(0, 50)}...`));
            
            // Mark as having unsaved changes - we know positionChanged is true if we reach here
            // Always show save button when position changes, regardless of image type (Base64 or file path)
            console.log('✓ Position changed - showing save button');
            console.log('  Position changed:', positionChanged);
            console.log('  Order changed:', orderActuallyChanged);
            console.log('  Old order length:', oldOrder.length);
            console.log('  New order length:', newOrder.length);
            console.log('  Old index:', oldIndex, 'New index:', newIndex);
            
            hasUnsavedChanges = true;
            showSaveButton();
            
            // Force state check to ensure consistency
            setTimeout(() => {
                checkForUnsavedChanges();
            }, 100);
            
            // Reset drag variables
            originalIndex = null;
            draggedElement = null;
            draggedPhotoSrc = null;
            
            // Also update order property for user photos (for backwards compatibility)
            const userPhotos = userData[currentMember] || [];
            const baseTime = Date.now();
            
            // Update order for each user photo based on its position in the new order
            allPhotos.forEach((photo, index) => {
                if (photo.isUser === 'true' || photo.isUser === true) {
                    const userPhoto = userPhotos.find(p => {
                        const pSrc = String(p.src || '');
                        const photoSrc = String(photo.src || '');
                        // Match Base64 URLs by prefix, file paths exactly
                        if (pSrc.startsWith('data:image') && photoSrc.startsWith('data:image')) {
                            return pSrc.substring(0, 200) === photoSrc.substring(0, 200);
                        }
                        return pSrc === photoSrc || pSrc.toLowerCase() === photoSrc.toLowerCase();
                    });
                    if (userPhoto) {
                        userPhoto.order = baseTime + index;
                    }
                }
            });
            
            // Save user photos with updated order
            if (userPhotos.length > 0) {
                userData[currentMember] = userPhotos;
                localStorage.setItem('portfolioData', JSON.stringify(userData));
            }
            
            // Trigger synchronization event (even if not saved yet, so public portfolio can show preview)
            // The public portfolio will update when save button is clicked
            triggerPortfolioSync();
            
            // Reload to show new order
            setTimeout(() => {
                loadCurrentPhotos();
            }, 100);
        });
    });
    
    // Grid drop zone
    newGrid.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
}

// Make sure drag and drop is re-initialized after photos are loaded
function reinitializeDragAndDrop() {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
        // Use simple drag drop (works for all photos, including newly added ones)
        initSimpleDragDrop();
        console.log('Drag & drop reinitialized');
    }, 300);
}

// Setup photo upload form (legacy - now handled by drag & drop upload)
function setupPhotoForm() {
    // Form submission is now handled by setupDragAndDropUpload and processUpload
    // This function is kept for backwards compatibility but does nothing
}

// Save photo to portfolio
function savePhotoToPortfolio(photoData) {
    const portfolioData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
    const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}');
    
    if (!portfolioData[currentMember]) {
        portfolioData[currentMember] = [];
    }
    
    // Add order for sorting
    if (!photoData.order) {
        const existingPhotos = portfolioData[currentMember];
        photoData.order = existingPhotos.length > 0 
            ? Math.max(...existingPhotos.map(p => p.order || 0)) + 1 
            : Date.now();
    }
    
    // Ensure photo has required fields
    if (!photoData.title) {
        photoData.title = photoData.fileName ? photoData.fileName.replace(/\.[^/.]+$/, '') : 'Foto';
    }
    
    // Add photo to portfolio data
    portfolioData[currentMember].push(photoData);
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    
    // Add photo to order list (at the end)
    if (!orderData[currentMember]) {
        orderData[currentMember] = [];
    }
    
    // Add new photo to the end of the order list
    if (!orderData[currentMember].includes(photoData.src)) {
        orderData[currentMember].push(photoData.src);
        localStorage.setItem('portfolioOrder', JSON.stringify(orderData));
        console.log('Photo added to order list:', photoData.src);
    }
    
    // Photo upload is immediately saved, so update saved state
    updateLastSavedState();
    
    // Trigger synchronization event for new photos
    triggerPortfolioSync();
    
    console.log('Photo saved to portfolio:', currentMember, portfolioData[currentMember].length, 'photos total');
}

// Update portfolio.js data structure
function updatePortfolioJS(photoData) {
    // This would ideally sync with portfolio.js, but for now we'll use localStorage
    // In a real app, this would be a server-side API call
}

// Delete photo by src (works for both static and user-uploaded photos)
function deletePhotoBySrc(photoSrc, isUserUploaded) {
    if (!photoSrc) {
        console.error('No photo src provided');
        return;
    }
    
    if (!confirm('Weet je zeker dat je deze foto wilt verwijderen?')) {
        return;
    }
    
    // Handle all photos (both user-uploaded and static)
    // All photos are now treated the same way - they can be deleted
    if (isUserUploaded) {
        const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
        
        // Check if this is a static photo (from portfolio.js) by checking if it's not in userData
        const userPhotos = userData[currentMember] || [];
        const usePhotoSrcMatches = typeof photoSrcMatches === 'function';
        const isStaticPhoto = !userPhotos.some(p => {
            const pSrc = String(p.src || '');
            const searchSrc = String(photoSrc || '');
            if (usePhotoSrcMatches) {
                return photoSrcMatches(pSrc, searchSrc);
            }
            return pSrc === searchSrc || pSrc.includes(searchSrc) || searchSrc.includes(pSrc);
        });
        
        if (isStaticPhoto) {
            // Hide static photo by adding to hidden list
            const hiddenPhotos = JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}');
            if (!hiddenPhotos[currentMember]) {
                hiddenPhotos[currentMember] = [];
            }
            
            if (!hiddenPhotos[currentMember].includes(photoSrc)) {
                hiddenPhotos[currentMember].push(photoSrc);
                localStorage.setItem('hiddenPortfolioPhotos', JSON.stringify(hiddenPhotos));
                console.log('Static photo hidden:', photoSrc.substring(0, 50));
                
                // Get photo title from current photos grid for toast notification
                const grid = document.getElementById('currentPhotosGrid');
                let photoTitle = 'Foto';
                if (grid) {
                    const photoItem = Array.from(grid.querySelectorAll('.photo-item')).find(item => {
                        const itemSrc = extractPhotoSrc(item);
                        // Use photoSrcMatches if available, otherwise use simple comparison
                        if (typeof photoSrcMatches === 'function') {
                            return photoSrcMatches(itemSrc, photoSrc);
                        }
                        return itemSrc === photoSrc || itemSrc.includes(photoSrc) || photoSrc.includes(itemSrc);
                    });
                    if (photoItem) {
                        const titleElement = photoItem.querySelector('.photo-title');
                        if (titleElement) {
                            photoTitle = titleElement.textContent || 'Foto';
                        }
                    }
                }
                
                // Show toast notification
                showToast(`Foto "${photoTitle}" verwijderd`, 'success');
            }
        } else {
            // Delete user-uploaded photo from localStorage
            if (!userData[currentMember]) {
                userData[currentMember] = [];
            }
            
            const userPhotos = userData[currentMember] || [];
            
            console.log('Attempting to delete user photo:', photoSrc);
            
            // Find photo by src using photoSrcMatches for better matching
            const usePhotoSrcMatches = typeof photoSrcMatches === 'function';
            let photoIndex = userPhotos.findIndex(p => {
                const pSrc = String(p.src || '');
                const searchSrc = String(photoSrc || '');
                if (usePhotoSrcMatches) {
                    return photoSrcMatches(pSrc, searchSrc);
                }
                // Fallback matching
                if (pSrc === searchSrc) return true;
                if (pSrc.startsWith('data:image') && searchSrc.startsWith('data:image')) {
                    return pSrc.substring(0, 100) === searchSrc.substring(0, 100);
                }
                if (!pSrc.startsWith('data:image') && !searchSrc.startsWith('data:image')) {
                    return pSrc.toLowerCase() === searchSrc.toLowerCase();
                }
                return pSrc.includes(searchSrc) || searchSrc.includes(pSrc);
            });
            
            if (photoIndex !== -1) {
                const deletedPhoto = userPhotos.splice(photoIndex, 1)[0];
                const photoTitle = deletedPhoto.title || deletedPhoto.fileName || 'Foto';
                console.log('User photo deleted:', photoTitle);
                
                // Show toast notification
                showToast(`Foto "${photoTitle}" verwijderd`, 'success');
                
                // Update order values after deletion
                const baseTime = Date.now();
                userPhotos.forEach((photo, idx) => {
                    photo.order = baseTime + idx;
                });
                
                // Save
                userData[currentMember] = userPhotos;
                localStorage.setItem('portfolioData', JSON.stringify(userData));
                
                console.log('Remaining user photos:', userPhotos.length);
            } else {
                // Photo not found in user photos, might be static
                showToast('Foto verwijderd', 'success');
            }
        }
    } else {
        // Legacy: handle non-user photos (should not happen anymore, but keep for safety)
        const hiddenPhotos = JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}');
        if (!hiddenPhotos[currentMember]) {
            hiddenPhotos[currentMember] = [];
        }
        
        // Add to hidden list if not already there
        if (!hiddenPhotos[currentMember].includes(photoSrc)) {
            hiddenPhotos[currentMember].push(photoSrc);
            localStorage.setItem('hiddenPortfolioPhotos', JSON.stringify(hiddenPhotos));
            console.log('Photo hidden:', photoSrc.substring(0, 50));
            
            // Get photo title from current photos grid for toast notification
            const grid = document.getElementById('currentPhotosGrid');
            let photoTitle = 'Foto';
            if (grid) {
                const photoItem = Array.from(grid.querySelectorAll('.photo-item')).find(item => {
                    const itemSrc = extractPhotoSrc(item);
                    // Use photoSrcMatches if available, otherwise use simple comparison
                    if (typeof photoSrcMatches === 'function') {
                        return photoSrcMatches(itemSrc, photoSrc);
                    }
                    return itemSrc === photoSrc || itemSrc.includes(photoSrc) || photoSrc.includes(itemSrc);
                });
                if (photoItem) {
                    const titleElement = photoItem.querySelector('.photo-title');
                    if (titleElement) {
                        photoTitle = titleElement.textContent || 'Foto';
                    }
                }
            }
            
            // Show toast notification
            showToast(`Foto "${photoTitle}" verwijderd`, 'success');
        }
    }
    
    // Mark as having unsaved changes
    // Don't save automatically - user must click save button
    hasUnsavedChanges = true;
    showSaveButton();
    
    // Trigger synchronization event
    triggerPortfolioSync();
    
    // Reload photos immediately for real-time update
    loadCurrentPhotos();
    
    // Reinitialize drag and drop after reload
    setTimeout(() => {
        reinitializeDragAndDrop();
    }, 100);
}

// Delete photo by index (legacy function for backwards compatibility)
function deletePhoto(index) {
    const grid = document.getElementById('currentPhotosGrid');
    if (!grid) return;
    
    const allItems = Array.from(grid.querySelectorAll('.photo-item'));
    const itemToDelete = allItems[index];
    
    if (!itemToDelete) {
        alert('Foto niet gevonden.');
        return;
    }
    
    const photoSrc = itemToDelete.dataset.photoSrc;
    const isUserUploaded = itemToDelete.dataset.isUser === 'true';
    
    if (photoSrc) {
        deletePhotoBySrc(photoSrc, isUserUploaded);
    }
}

// ============================================
// NEW FEATURES IMPLEMENTATION
// ============================================

// 1. Search and Filter
function setupSearchAndFilter() {
    const searchInput = document.getElementById('searchPhotos');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        filterPhotos(searchTerm);
    });
}

function filterPhotos(searchTerm) {
    const grid = document.getElementById('currentPhotosGrid');
    if (!grid) return;
    
    const items = grid.querySelectorAll('.photo-item');
    let visibleCount = 0;
    
    items.forEach(item => {
        const titleElement = item.querySelector('.photo-title');
        const title = titleElement ? titleElement.textContent.toLowerCase() : '';
        const matches = !searchTerm || title.includes(searchTerm);
        
        item.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
    });
    
    // Show message if no results
    let noResultsMsg = grid.querySelector('.no-results');
    if (visibleCount === 0 && searchTerm) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('p');
            noResultsMsg.className = 'no-results';
            noResultsMsg.textContent = `Geen foto's gevonden`;
            grid.appendChild(noResultsMsg);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

// 2. Bulk Actions
function setupBulkActions() {
    const selectAllBtn = document.getElementById('selectAllBtn');
    const deselectAllBtn = document.getElementById('deselectAllBtn');
    const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
    
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', selectAllPhotos);
    }
    
    if (deselectAllBtn) {
        deselectAllBtn.addEventListener('click', deselectAllPhotos);
    }
    
    if (bulkDeleteBtn) {
        bulkDeleteBtn.addEventListener('click', bulkDeletePhotos);
    }
}

function togglePhotoSelection(photoSrc) {
    if (selectedPhotos.has(photoSrc)) {
        selectedPhotos.delete(photoSrc);
    } else {
        selectedPhotos.add(photoSrc);
    }
    
    updateBulkActionButtons();
    updatePhotoSelectionUI();
}

function selectAllPhotos() {
    const grid = document.getElementById('currentPhotosGrid');
    if (!grid) return;
    
    const items = grid.querySelectorAll('.photo-item');
    items.forEach(item => {
        const src = item.dataset.photoSrc;
        if (src) selectedPhotos.add(src);
    });
    
    updateBulkActionButtons();
    updatePhotoSelectionUI();
}

function deselectAllPhotos() {
    selectedPhotos.clear();
    updateBulkActionButtons();
    updatePhotoSelectionUI();
}

function updateBulkActionButtons() {
    const selectAllBtn = document.getElementById('selectAllBtn');
    const deselectAllBtn = document.getElementById('deselectAllBtn');
    const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
    
    const hasSelection = selectedPhotos.size > 0;
    
    if (selectAllBtn) selectAllBtn.style.display = hasSelection ? 'none' : 'inline-block';
    if (deselectAllBtn) deselectAllBtn.style.display = hasSelection ? 'inline-block' : 'none';
    if (bulkDeleteBtn) bulkDeleteBtn.style.display = hasSelection ? 'inline-block' : 'none';
}

function updatePhotoSelectionUI() {
    // Checkbox removed - this function is no longer needed
    // Keeping for backwards compatibility but it does nothing
}

function bulkDeletePhotos() {
    if (selectedPhotos.size === 0) return;
    
    if (!confirm(`Weet je zeker dat je ${selectedPhotos.size} foto${selectedPhotos.size === 1 ? '' : '\'s'} wilt verwijderen?`)) {
        return;
    }
    
    const photosToDelete = Array.from(selectedPhotos);
    let deletedCount = 0;
    
    photosToDelete.forEach(src => {
        // Find if it's user uploaded
        const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
        const userPhotos = userData[currentMember] || [];
        const isUserUploaded = userPhotos.some(p => {
            const pSrc = String(p.src || '');
            return pSrc === src || (pSrc.startsWith('data:image') && src.startsWith('data:image') && pSrc.substring(0, 100) === src.substring(0, 100));
        });
        
        deletePhotoBySrc(src, isUserUploaded);
        deletedCount++;
    });
    
    selectedPhotos.clear();
    updateBulkActionButtons();
    showToast(`${deletedCount} foto${deletedCount === 1 ? '' : '\'s'} verwijderd`, 'success');
}

// 3. Drag & Drop Upload
function setupDragAndDropUpload() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('photoFiles');
    
    if (!dropZone || !fileInput) return;
    
    // Click to select
    dropZone.addEventListener('click', () => fileInput.click());
    
    // Drag events
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        const files = Array.from(e.dataTransfer.files).filter(file => 
            file.type.match(/^image\/(jpeg|jpg)$/i)
        );
        
        if (files.length > 0) {
            fileInput.files = createFileList(files);
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
}

function createFileList(files) {
    const dt = new DataTransfer();
    files.forEach(file => dt.items.add(file));
    return dt.files;
}

function handleFileSelection(files) {
    // Validate files
    const validFiles = [];
    const errors = [];
    
    files.forEach(file => {
        if (!file.type.match(/^image\/(jpeg|jpg)$/i)) {
            errors.push(`${file.name}: Geen JPEG bestand`);
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            errors.push(`${file.name}: Te groot (max 5MB)`);
            return;
        }
        
        validFiles.push(file);
    });
    
    if (errors.length > 0) {
        showToast(errors.join(', '), 'error');
    }
    
    if (validFiles.length === 0) return;
    
    if (validFiles.length > 5) {
        showToast(`Maximaal 5 foto's tegelijk`, 'error');
        return;
    }
    
    // Show upload preview
    displayUploadPreview(validFiles);
}

// Setup upload preview functionality
function setupUploadPreview() {
    const cancelBtn = document.getElementById('cancelUploadBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            pendingUploadFiles = [];
            uploadQueue = [];
            const preview = document.getElementById('uploadPreview');
            if (preview) preview.style.display = 'none';
            const previewGrid = document.getElementById('previewGrid');
            if (previewGrid) previewGrid.innerHTML = '';
            const fileInput = document.getElementById('photoFiles');
            if (fileInput) fileInput.value = '';
            const titleInput = document.getElementById('photoTitle');
            if (titleInput) titleInput.value = '';
        });
    }
    
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            processUpload();
        });
    }
}

let pendingUploadFiles = [];

function displayUploadPreview(files) {
    pendingUploadFiles = files;
    const preview = document.getElementById('uploadPreview');
    const previewGrid = document.getElementById('previewGrid');
    
    if (!preview || !previewGrid) return;
    
    preview.style.display = 'block';
    previewGrid.innerHTML = files.map((file, index) => `
        <div class="preview-item">
            <img src="${URL.createObjectURL(file)}" alt="${file.name}">
            <p>${file.name}</p>
            <small>${(file.size / 1024 / 1024).toFixed(2)} MB</small>
        </div>
    `).join('');
    
    // Reset progress
    const progressFill = document.getElementById('uploadProgressFill');
    const status = document.getElementById('uploadStatus');
    if (progressFill) progressFill.style.width = '0%';
    if (status) status.textContent = 'Klaar om te uploaden';
}

function processUpload() {
    if (pendingUploadFiles.length === 0) return;
    
    const titleInput = document.getElementById('photoTitle');
    const baseTitle = titleInput ? titleInput.value.trim() : '';
    
    showLoadingSpinner();
    const progressFill = document.getElementById('uploadProgressFill');
    const status = document.getElementById('uploadStatus');
    
    let processed = 0;
    const total = pendingUploadFiles.length;
    
    pendingUploadFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64 = e.target.result;
            const photoTitle = baseTitle || file.name.replace(/\.[^/.]+$/, '');
            
            // Compress image
            compressImage(base64, (compressedBase64) => {
                const photoData = {
                    src: compressedBase64,
                    title: photoTitle,
                    fileName: file.name,
                    isUserUploaded: true,
                    order: Date.now() + index
                };
                savePhotoToPortfolio(photoData);
                
                processed++;
                const percent = Math.round((processed / total) * 100);
                if (progressFill) progressFill.style.width = percent + '%';
                if (status) status.textContent = `${processed} van ${total} foto's verwerkt...`;
                
                if (processed === total) {
                    hideLoadingSpinner();
                    if (status) status.textContent = `Alle foto's toegevoegd!`;
                    
                    // Hide preview
                    const preview = document.getElementById('uploadPreview');
                    if (preview) preview.style.display = 'none';
                    const previewGrid = document.getElementById('previewGrid');
                    if (previewGrid) previewGrid.innerHTML = '';
                    const fileInput = document.getElementById('photoFiles');
                    if (fileInput) fileInput.value = '';
                    
                    // Clear title
                    if (titleInput) titleInput.value = '';
                    
        // Reload photos immediately for real-time update
        loadCurrentPhotos();
        
        // Show success toast
        showToast(`${total} foto${total === 1 ? '' : '\'s'} toegevoegd!`, 'success');
        
        // Trigger sync for real-time updates
        triggerPortfolioSync();
                    console.log(`${total} foto${total === 1 ? '' : '\'s'} toegevoegd`);
                    pendingUploadFiles = [];
                }
            });
        };
        reader.readAsDataURL(file);
    });
}

// showUploadPreview is now displayUploadPreview (see above)
// processUpload is now defined above using pendingUploadFiles

// 4. Image Compression
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

// 5. Edit Photo Title
let editingPhotoSrc = null;

function setupEditTitle() {
    // Wait a bit to ensure DOM is ready
    setTimeout(() => {
        const modal = document.getElementById('editTitleModal');
        const closeBtn = document.getElementById('closeEditModal');
        const cancelBtn = document.getElementById('cancelEditBtn');
        const saveBtn = document.getElementById('saveEditBtn');
        
        console.log('Setting up edit title modal:', {
            modal: !!modal,
            closeBtn: !!closeBtn,
            cancelBtn: !!cancelBtn,
            saveBtn: !!saveBtn
        });
        
        if (!modal) {
            console.error('Edit title modal not found!');
            return;
        }
        
        // Remove any existing event listeners by cloning
        if (closeBtn) {
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            
            newCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                closeEditModal();
            });
        }
        
        // Setup cancel button
        if (cancelBtn) {
            const newCancelBtn = cancelBtn.cloneNode(true);
            cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
            
            newCancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Cancel button clicked');
                closeEditModal();
            });
        }
        
        // Setup save button
        if (saveBtn) {
            const newSaveBtn = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
            
            newSaveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Save button clicked');
                savePhotoTitle();
            });
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                console.log('Modal background clicked');
                closeEditModal();
            }
        });
        
        // Close modal on Escape key (only one listener needed)
        let escapeHandler = null;
        escapeHandler = function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                console.log('Escape key pressed');
                closeEditModal();
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        // Allow Enter key to save
        const input = document.getElementById('editTitleInput');
        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('Enter key pressed');
                    savePhotoTitle();
                }
            });
        }
        
        console.log('Edit title modal setup complete');
    }, 100);
}

// Make editPhotoTitle globally available
window.editPhotoTitle = function(photoSrc) {
    // photoSrc might be escaped (safeSrcForJS), so we need to find the actual item first
    // and get the original src from it
    const grid = document.getElementById('currentPhotosGrid');
    let actualPhotoSrc = photoSrc;
    let currentTitle = '';
    
    // Use photoSrcMatches if available for better matching
    const usePhotoSrcMatches = typeof photoSrcMatches === 'function';
    
    // First, find the item in DOM to get the actual original src
    const item = grid ? Array.from(grid.querySelectorAll('.photo-item')).find(i => {
        // Try multiple data attributes for matching
        const itemSrc = i.dataset.originalSrc || i.dataset.fullSrc || i.dataset.photoSrc;
        if (!itemSrc) return false;
        
        if (usePhotoSrcMatches) {
            return photoSrcMatches(itemSrc, photoSrc);
        }
        return itemSrc === photoSrc || 
               (itemSrc && photoSrc && itemSrc.includes(photoSrc)) ||
               (photoSrc && itemSrc && photoSrc.includes(itemSrc));
    }) : null;
    
    // Get the actual original src from the item
    if (item) {
        actualPhotoSrc = item.dataset.originalSrc || item.dataset.fullSrc || item.dataset.photoSrc || photoSrc;
        currentTitle = item.querySelector('.photo-title')?.textContent || '';
    }
    
    // Store the actual original src (not the escaped version)
    editingPhotoSrc = actualPhotoSrc;
    
    const modal = document.getElementById('editTitleModal');
    const input = document.getElementById('editTitleInput');
    
    if (!modal || !input) {
        console.error('Edit modal or input not found');
        return;
    }
    
    // If we didn't get title from DOM, try to get from loaded portfolio data
    if (!currentTitle && typeof loadPortfolioData === 'function') {
        try {
            const allPortfolioData = loadPortfolioData();
            const allPhotos = allPortfolioData[currentMember]?.photos || [];
            
            for (const photo of allPhotos) {
                const pSrc = String(photo.src || '');
                let matches = false;
                
                if (usePhotoSrcMatches) {
                    matches = photoSrcMatches(pSrc, actualPhotoSrc);
                } else {
                    matches = pSrc === actualPhotoSrc || 
                             (pSrc.startsWith('data:image') && actualPhotoSrc.startsWith('data:image') && pSrc.substring(0, 100) === actualPhotoSrc.substring(0, 100)) ||
                             (!pSrc.startsWith('data:image') && !actualPhotoSrc.startsWith('data:image') && pSrc.toLowerCase() === actualPhotoSrc.toLowerCase());
                }
                
                if (matches) {
                    currentTitle = photo.title || '';
                    break;
                }
            }
        } catch (e) {
            console.error('Error loading portfolio data for title:', e);
        }
    }
    
    input.value = currentTitle;
    modal.style.display = 'flex';
    
    console.log('editPhotoTitle called with src:', actualPhotoSrc.substring(0, 50), 'currentTitle:', currentTitle);
    
    // Focus input after a short delay to ensure modal is visible
    setTimeout(() => {
        input.focus();
        input.select();
    }, 100);
};

// Make functions globally available
function closeEditModal() {
    console.log('closeEditModal called');
    const modal = document.getElementById('editTitleModal');
    const input = document.getElementById('editTitleInput');
    
    if (modal) {
        modal.style.display = 'none';
        console.log('Modal hidden');
    } else {
        console.error('Modal not found in closeEditModal');
    }
    
    if (input) {
        input.value = '';
    }
    
    editingPhotoSrc = null;
}

// Also make it globally available
window.closeEditModal = closeEditModal;

function savePhotoTitle() {
    console.log('savePhotoTitle called, editingPhotoSrc:', editingPhotoSrc ? editingPhotoSrc.substring(0, 50) : 'null');
    
    if (!editingPhotoSrc) {
        console.warn('No photo src being edited');
        showToast('Geen foto geselecteerd', 'error');
        return;
    }
    
    const input = document.getElementById('editTitleInput');
    if (!input) {
        console.error('Edit input not found');
        showToast('Input veld niet gevonden', 'error');
        return;
    }
    
    const newTitle = input.value.trim();
    console.log('New title:', newTitle);
    
    // Use photoSrcMatches if available for better matching
    const usePhotoSrcMatches = typeof photoSrcMatches === 'function';
    
    // Update in localStorage
    const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
    const userPhotos = userData[currentMember] || [];
    
    // Find photo by matching src - first check user photos
    let photo = null;
    let photoIndex = -1;
    let isUserPhoto = false;
    
    for (let i = 0; i < userPhotos.length; i++) {
        const p = userPhotos[i];
        const pSrc = String(p.src || '');
        
        let matches = false;
        
        if (usePhotoSrcMatches) {
            matches = photoSrcMatches(pSrc, editingPhotoSrc);
        } else {
            // Fallback matching logic
            if (pSrc === editingPhotoSrc) {
                matches = true;
            } else if (pSrc.startsWith('data:image') && editingPhotoSrc.startsWith('data:image')) {
                matches = pSrc.substring(0, 100) === editingPhotoSrc.substring(0, 100);
            } else if (!pSrc.startsWith('data:image') && !editingPhotoSrc.startsWith('data:image')) {
                matches = pSrc.toLowerCase() === editingPhotoSrc.toLowerCase();
            }
        }
        
        if (matches) {
            photo = p;
            photoIndex = i;
            isUserPhoto = true;
            break;
        }
    }
    
    // If not found in user photos, check all photos (including static) via loadPortfolioData
    if (!photo && typeof loadPortfolioData === 'function') {
        try {
            const allPortfolioData = loadPortfolioData();
            const allPhotos = allPortfolioData[currentMember]?.photos || [];
            
            for (let i = 0; i < allPhotos.length; i++) {
                const p = allPhotos[i];
                const pSrc = String(p.src || '');
                
                let matches = false;
                
                if (usePhotoSrcMatches) {
                    matches = photoSrcMatches(pSrc, editingPhotoSrc);
                } else {
                    // Fallback matching
                    if (pSrc === editingPhotoSrc) {
                        matches = true;
                    } else if (pSrc.startsWith('data:image') && editingPhotoSrc.startsWith('data:image')) {
                        matches = pSrc.substring(0, 100) === editingPhotoSrc.substring(0, 100);
                    } else if (!pSrc.startsWith('data:image') && !editingPhotoSrc.startsWith('data:image')) {
                        matches = pSrc.toLowerCase() === editingPhotoSrc.toLowerCase();
                    }
                }
                
                if (matches) {
                    // Found the photo - check if it's already in userPhotos
                    const existingInUser = userPhotos.find(up => {
                        const upSrc = String(up.src || '');
                        return usePhotoSrcMatches ? photoSrcMatches(upSrc, pSrc) : upSrc === pSrc;
                    });
                    
                    if (existingInUser) {
                        // Already in userPhotos, use that one
                        photo = existingInUser;
                        photoIndex = userPhotos.indexOf(existingInUser);
                        isUserPhoto = true;
                    } else {
                        // Static photo - create/update entry in userData
                        photo = {
                            src: pSrc,
                            title: newTitle || p.title || 'Foto',
                            isUserUploaded: false,
                            order: p.order || Date.now()
                        };
                        photoIndex = -1; // Will be added as new
                        isUserPhoto = false;
                    }
                    break;
                }
            }
        } catch (e) {
            console.error('Error loading portfolio data for title update:', e);
        }
    }
    
    // If still not found, try to get from DOM
    if (!photo) {
        const grid = document.getElementById('currentPhotosGrid');
        const item = grid ? Array.from(grid.querySelectorAll('.photo-item')).find(i => {
            // Try multiple data attributes for matching
            const itemSrc = i.dataset.originalSrc || i.dataset.fullSrc || i.dataset.photoSrc;
            if (!itemSrc) return false;
            
            if (usePhotoSrcMatches) {
                return photoSrcMatches(itemSrc, editingPhotoSrc);
            }
            return itemSrc === editingPhotoSrc || 
                   (itemSrc && editingPhotoSrc && itemSrc.includes(editingPhotoSrc)) ||
                   (editingPhotoSrc && itemSrc && editingPhotoSrc.includes(itemSrc));
        }) : null;
        
        if (item) {
            // Use original-src or full-src for better matching (not the escaped safeSrc)
            const photoSrc = item.dataset.originalSrc || item.dataset.fullSrc || item.dataset.photoSrc || editingPhotoSrc;
            photo = {
                src: photoSrc,
                title: newTitle || 'Foto',
                isUserUploaded: false,
                order: Date.now()
            };
            photoIndex = -1;
            isUserPhoto = false;
            console.log('Found photo in DOM, using src:', photoSrc.substring(0, 50));
        }
    }
    
    if (photo) {
        // Update photo title - always use the new title
        photo.title = newTitle || photo.fileName?.replace(/\.[^/.]+$/, '') || 'Foto';
        
        // Ensure we have the correct src (use editingPhotoSrc to preserve exact format)
        photo.src = editingPhotoSrc;
        
        if (photoIndex >= 0) {
            // Update existing user photo
            userPhotos[photoIndex] = photo;
            console.log('Updated existing user photo at index', photoIndex, 'with title:', photo.title);
        } else {
            // Add new entry (for static photos or new photos)
            // Check if it already exists to avoid duplicates
            const existingIndex = userPhotos.findIndex(up => {
                const upSrc = String(up.src || '');
                const pSrc = String(photo.src || '');
                return usePhotoSrcMatches ? photoSrcMatches(upSrc, pSrc) : upSrc === pSrc;
            });
            
            if (existingIndex >= 0) {
                // Update existing entry
                userPhotos[existingIndex] = photo;
                console.log('Updated existing entry at index', existingIndex, 'with title:', photo.title);
            } else {
                // Add new entry - mark as not user-uploaded if it's a static photo
                if (!isUserPhoto) {
                    photo.isUserUploaded = false;
                }
                userPhotos.push(photo);
                console.log('Added new photo entry with title:', photo.title, 'isUserUploaded:', photo.isUserUploaded);
            }
        }
        
        userData[currentMember] = userPhotos;
        localStorage.setItem('portfolioData', JSON.stringify(userData));
        console.log('Saved to localStorage. Total user photos:', userPhotos.length);
        
        // Update UI immediately
        const grid = document.getElementById('currentPhotosGrid');
        const item = grid ? Array.from(grid.querySelectorAll('.photo-item')).find(i => {
            // Try multiple data attributes for matching
            const itemSrc = i.dataset.originalSrc || i.dataset.fullSrc || i.dataset.photoSrc;
            if (!itemSrc) return false;
            
            if (usePhotoSrcMatches) {
                return photoSrcMatches(itemSrc, editingPhotoSrc);
            }
            return itemSrc === editingPhotoSrc || 
                   (itemSrc && editingPhotoSrc && itemSrc.includes(editingPhotoSrc)) ||
                   (editingPhotoSrc && itemSrc && editingPhotoSrc.includes(itemSrc));
        }) : null;
        
        if (item) {
            const titleElement = item.querySelector('.photo-title');
            if (titleElement) {
                titleElement.textContent = newTitle || 'Foto';
            }
        }
        
        hasUnsavedChanges = true;
        showSaveButton();
        showToast('Titel bijgewerkt', 'success');
        console.log('Title updated');
        
        // Save state for undo
        saveStateForUndo();
        
        // Reload photos immediately for real-time update
        loadCurrentPhotos();
    } else {
        showToast('Foto niet gevonden', 'error');
        console.error('Photo not found for src:', editingPhotoSrc.substring(0, 50));
    }
    
    closeEditModal();
    triggerPortfolioSync();
}

// Also make it globally available
window.savePhotoTitle = savePhotoTitle;

// 6. Photo Rotation
function setupPhotoRotation() {
    // Rotation is handled by rotatePhoto function
}

function rotatePhoto(photoSrc) {
    // Use photoSrcMatches if available for better matching
    const usePhotoSrcMatches = typeof photoSrcMatches === 'function';
    
    // Find existing rotation by matching src keys
    let currentRotation = 0;
    let rotationKey = photoSrc;
    
    for (const [key, value] of Object.entries(photoRotations)) {
        if (usePhotoSrcMatches && photoSrcMatches(key, photoSrc)) {
            currentRotation = value;
            rotationKey = key;
            break;
        } else if (key === photoSrc) {
            currentRotation = value;
            rotationKey = key;
            break;
        }
    }
    
    const newRotation = (currentRotation + 90) % 360;
    
    // Update rotation - use the found key or create new entry with photoSrc
    if (rotationKey !== photoSrc) {
        // Remove old key and add new one
        delete photoRotations[rotationKey];
    }
    photoRotations[photoSrc] = newRotation;
    
    // Save rotations immediately
    savePhotoRotations();
    
    // Update UI
    const grid = document.getElementById('currentPhotosGrid');
    const item = grid ? Array.from(grid.querySelectorAll('.photo-item')).find(i => {
        const itemSrc = i.dataset.photoSrc;
        if (!itemSrc) return false;
        
        if (usePhotoSrcMatches) {
            return photoSrcMatches(itemSrc, photoSrc);
        }
        return itemSrc === photoSrc;
    }) : null;
    
    if (item) {
        const preview = item.querySelector('.photo-preview');
        if (preview) {
            preview.style.transform = `rotate(${newRotation}deg)`;
        }
    }
    
    hasUnsavedChanges = true;
    showSaveButton();
    showToast('Foto geroteerd', 'success');
    console.log('Photo rotated');
}

// 7. Download Photo
function downloadPhoto(photoSrc, title) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title || 'foto'}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Toast notification removed - only show for photo deletion
            console.log('Photo downloaded');
        }, 'image/jpeg', 0.95);
    };
    
    img.src = photoSrc;
}

// 8. Undo/Redo
function setupUndoRedo() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    
    if (undoBtn) undoBtn.onclick = performUndo;
    if (redoBtn) redoBtn.onclick = performRedo;
}

function saveStateForUndo() {
    const state = {
        portfolioOrder: JSON.parse(localStorage.getItem('portfolioOrder') || '{}'),
        portfolioData: JSON.parse(localStorage.getItem('portfolioData') || '{}'),
        hiddenPhotos: JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}'),
        timestamp: Date.now()
    };
    
    undoStack.push(state);
    if (undoStack.length > MAX_UNDO_STACK) {
        undoStack.shift();
    }
    
    redoStack = []; // Clear redo stack on new action
    updateUndoRedoButtons();
}

function performUndo() {
    if (undoStack.length === 0) return;
    
    const currentState = {
        portfolioOrder: JSON.parse(localStorage.getItem('portfolioOrder') || '{}'),
        portfolioData: JSON.parse(localStorage.getItem('portfolioData') || '{}'),
        hiddenPhotos: JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}')
    };
    
    redoStack.push(currentState);
    
    const previousState = undoStack.pop();
    localStorage.setItem('portfolioOrder', JSON.stringify(previousState.portfolioOrder));
    localStorage.setItem('portfolioData', JSON.stringify(previousState.portfolioData));
    localStorage.setItem('hiddenPortfolioPhotos', JSON.stringify(previousState.hiddenPhotos));
    
    loadCurrentPhotos();
    updateUndoRedoButtons();
    // Toast notification removed - only show for photo deletion
    console.log('Undo performed');
}

function performRedo() {
    if (redoStack.length === 0) return;
    
    const currentState = {
        portfolioOrder: JSON.parse(localStorage.getItem('portfolioOrder') || '{}'),
        portfolioData: JSON.parse(localStorage.getItem('portfolioData') || '{}'),
        hiddenPhotos: JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}')
    };
    
    undoStack.push(currentState);
    
    const nextState = redoStack.pop();
    localStorage.setItem('portfolioOrder', JSON.stringify(nextState.portfolioOrder));
    localStorage.setItem('portfolioData', JSON.stringify(nextState.portfolioData));
    localStorage.setItem('hiddenPortfolioPhotos', JSON.stringify(nextState.hiddenPhotos));
    
    loadCurrentPhotos();
    updateUndoRedoButtons();
    // Toast notification removed - only show for photo deletion
    console.log('Redo performed');
}

function updateUndoRedoButtons() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    
    if (undoBtn) undoBtn.style.display = undoStack.length > 0 ? 'inline-block' : 'none';
    if (redoBtn) redoBtn.style.display = redoStack.length > 0 ? 'inline-block' : 'none';
}

// 9. Export Portfolio
function setupExport() {
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.onclick = exportPortfolio;
    }
}

function exportPortfolio() {
    const portfolioData = loadPortfolioData();
    const memberPortfolio = portfolioData[currentMember];
    
    if (!memberPortfolio || !memberPortfolio.photos || memberPortfolio.photos.length === 0) {
        showToast(`Geen foto's om te exporteren`, 'error');
        return;
    }
    
    const exportData = {
        member: currentMember,
        exportDate: new Date().toISOString(),
        photos: memberPortfolio.photos.map(photo => ({
            title: photo.title || 'Foto',
            src: photo.src.substring(0, 100) + '...', // Truncate Base64 for export
            category: photo.category || 'all'
        })),
        totalPhotos: memberPortfolio.photos.length
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${currentMember.replace(/\s+/g, '-')}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Toast notification removed - only show for photo deletion
    console.log('Portfolio exported');
}

// 10. Toast Notifications
function setupToastNotifications() {
    // Toast container is already in HTML
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Wrap deletePhotoBySrc and saveChanges to save state for undo
(function() {
    const originalDeletePhotoBySrc = deletePhotoBySrc;
    deletePhotoBySrc = function(photoSrc, isUserUploaded) {
        saveStateForUndo();
        return originalDeletePhotoBySrc.call(this, photoSrc, isUserUploaded);
    };
    
    const originalSaveChanges = saveChanges;
    saveChanges = function() {
        saveStateForUndo();
        return originalSaveChanges.call(this);
    };
})();

// Wrap deletePhotoBySrc to save state for undo (moved to end of file after function definition)
