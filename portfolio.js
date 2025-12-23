// Portfolio Page Script

// Get member name from URL parameter
function getMemberFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('member') || '';
}

// ============================================
// LIKE & COMMENT SYSTEM
// ============================================

// Generate unique photo ID from src
// This function ensures consistent IDs for the same photo regardless of how it's referenced
function getPhotoId(photoSrc) {
    if (!photoSrc) return '';
    
    // For Base64 images, use first 100 chars + hash for better uniqueness
    if (photoSrc.startsWith('data:image')) {
        const hash = photoSrc.substring(0, 100).split('').reduce((acc, char) => {
            return ((acc << 5) - acc) + char.charCodeAt(0);
        }, 0);
        return `base64_${Math.abs(hash)}`;
    }
    
    // Normalize the src - remove protocol, domain, and leading slashes for consistency
    let normalizedSrc = photoSrc;
    
    // For file paths, normalize to relative path
    // Remove protocol and domain if present
    try {
        if (photoSrc.includes('://')) {
            // Full URL - extract path
            const url = new URL(photoSrc);
            normalizedSrc = url.pathname;
        } else if (photoSrc.startsWith('//')) {
            // Protocol-relative URL
            normalizedSrc = photoSrc.substring(photoSrc.indexOf('/', 2));
        }
        
        // Remove leading slash for consistency
        normalizedSrc = normalizedSrc.replace(/^\/+/, '');
        
        // Remove query parameters and hash
        normalizedSrc = normalizedSrc.split('?')[0].split('#')[0];
        
        // Normalize Windows-style paths (backslashes to forward slashes)
        normalizedSrc = normalizedSrc.replace(/\\/g, '/');
        
        // Remove trailing slashes
        normalizedSrc = normalizedSrc.replace(/\/+$/, '');
    } catch (e) {
        // If URL parsing fails, use original src but normalize it
        normalizedSrc = photoSrc.replace(/\\/g, '/').replace(/^\/+/, '').split('?')[0].split('#')[0];
    }
    
    // Use normalized path as ID - preserve forward slashes as underscores for consistency
    return normalizedSrc.replace(/[^a-zA-Z0-9\/]/g, '_').replace(/\//g, '_');
}

// Get likes for a photo
function getPhotoLikes(photoId) {
    const likesData = JSON.parse(localStorage.getItem('photoLikes') || '{}');
    const likes = likesData[photoId] || [];
    return likes;
}

// Get comments for a photo (including replies)
function getPhotoComments(photoId) {
    const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}');
    return commentsData[photoId] || [];
}

// Get all comments count including replies
function getTotalCommentsCount(comments) {
    let count = comments.length;
    comments.forEach(comment => {
        if (comment.replies && Array.isArray(comment.replies)) {
            count += comment.replies.length;
        }
    });
    return count;
}

// Check if current user has liked a photo
function isPhotoLikedByUser(photoId) {
    if (typeof isAuthenticated !== 'function' || !isAuthenticated()) {
        return false;
    }
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!currentUser) return false;
    
    const likes = getPhotoLikes(photoId);
    return likes.includes(currentUser);
}

// Toggle like on a photo
function toggleLike() {
    if (typeof isAuthenticated !== 'function' || !isAuthenticated()) {
        alert('Je moet ingelogd zijn om foto\'s te liken.');
        return;
    }
    
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!currentUser) {
        alert('Je moet ingelogd zijn om foto\'s te liken.');
        return;
    }
    
    const modal = document.getElementById('imageModal');
    if (!modal || modal.style.display !== 'flex') return;
    
    const photo = currentPhotos[currentPhotoIndex];
    if (!photo) return;
    
    // Use modalImage.src if available (same as updateModalSocialUI does)
    const modalImage = document.getElementById('modalImage');
    let photoSrc = photo.src;
    if (modalImage && modalImage.src) {
        photoSrc = modalImage.src;
    }
    
    // Generate photoId - try both normalized and original to find existing data
    const photoId = getPhotoId(photoSrc);
    const photoIdFromOriginal = getPhotoId(photo.src);
    
    const likesData = JSON.parse(localStorage.getItem('photoLikes') || '{}');
    
    // Determine which photoId to use - prefer one that already has data
    let finalPhotoId = photoId;
    if (!likesData[photoId] && likesData[photoIdFromOriginal] && photoId !== photoIdFromOriginal) {
        // If primary photoId has no data but original has, use original and migrate
        finalPhotoId = photoIdFromOriginal;
        likesData[photoId] = likesData[photoIdFromOriginal];
        localStorage.setItem('photoLikes', JSON.stringify(likesData));
    }
    
    if (!likesData[finalPhotoId]) {
        likesData[finalPhotoId] = [];
    }
    
    const likes = likesData[finalPhotoId];
    const index = likes.indexOf(currentUser);
    
    if (index > -1) {
        // Unlike
        likes.splice(index, 1);
    } else {
        // Like
        likes.push(currentUser);
    }
    
    likesData[finalPhotoId] = likes;
    
    // Also update the normalized photoId if different
    if (finalPhotoId !== photoId && photoId !== photoIdFromOriginal) {
        likesData[photoId] = likes;
    }
    
    // Save to localStorage
    try {
        localStorage.setItem('photoLikes', JSON.stringify(likesData));
    } catch (e) {
        console.error('Fout bij opslaan van like:', e);
        alert('Er is een fout opgetreden bij het opslaan van de like. Probeer het opnieuw.');
        return;
    }
    
    // Update UI - use photoSrc for consistency
    updateModalSocialUI();
    updatePortfolioItemSocialUIBySrc(photoSrc);
}

// Add comment to a photo
function addComment() {
    if (typeof isAuthenticated !== 'function' || !isAuthenticated()) {
        alert('Je moet ingelogd zijn om te reageren.');
        return;
    }
    
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!currentUser) {
        alert('Je moet ingelogd zijn om te reageren.');
        return;
    }
    
    const commentInput = document.getElementById('commentInput');
    if (!commentInput) return;
    
    const commentText = commentInput.value.trim();
    if (!commentText) {
        alert('Voer een reactie in.');
        return;
    }
    
    if (commentText.length > 500) {
        alert('Reactie is te lang (max 500 tekens).');
        return;
    }
    
    const modal = document.getElementById('imageModal');
    if (!modal || modal.style.display !== 'flex') return;
    
    const photo = currentPhotos[currentPhotoIndex];
    if (!photo) return;
    
    // Use modalImage.src if available (same as updateModalSocialUI does)
    const modalImage = document.getElementById('modalImage');
    let photoSrc = photo.src;
    if (modalImage && modalImage.src) {
        photoSrc = modalImage.src;
    }
    
    const photoId = getPhotoId(photoSrc);
    const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}');
    
    if (!commentsData[photoId]) {
        commentsData[photoId] = [];
    }
    
    const comment = {
        id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user: currentUser,
        text: commentText,
        date: new Date().toISOString(),
        replies: [] // Initialize empty replies array
    };
    
    commentsData[photoId].push(comment);
    localStorage.setItem('photoComments', JSON.stringify(commentsData));
    
    // Clear input
    commentInput.value = '';
    
    // Update UI - force update of all portfolio items for this photo
    updateModalSocialUI();
    
    // Update portfolio items by matching src instead of photoId
    updatePortfolioItemSocialUIBySrc(photoSrc);
}

// Toggle comments section
function toggleComments() {
    const commentsSection = document.getElementById('modalComments');
    if (!commentsSection) return;
    
    if (commentsSection.style.display === 'none') {
        commentsSection.style.display = 'block';
        updateModalSocialUI();
    } else {
        commentsSection.style.display = 'none';
    }
}

// Update modal social UI (likes and comments)
function updateModalSocialUI() {
    const modal = document.getElementById('imageModal');
    if (!modal || modal.style.display !== 'flex') return;
    
    const photo = currentPhotos[currentPhotoIndex];
    if (!photo) return;
    
    // Always use modalImage.src if available (it's the actual loaded image URL)
    // This ensures we get the same photoId as the portfolio items
    const modalImage = document.getElementById('modalImage');
    let photoSrc = photo.src;
    
    // Prefer modalImage.src as it's the actual loaded URL (may be full URL)
    if (modalImage && modalImage.src) {
        photoSrc = modalImage.src;
    }
    
    // Generate photoId - getPhotoId normalizes URLs so it should match
    const photoId = getPhotoId(photoSrc);
    
    // Also try with the original photo.src as fallback
    const photoIdFromOriginal = getPhotoId(photo.src);
    
    // Get likes and comments - try both photoIds to ensure we find the data
    let likes = getPhotoLikes(photoId);
    let comments = getPhotoComments(photoId);
    let isLiked = isPhotoLikedByUser(photoId);
    
    // If no data found with first photoId, try the original src
    if (likes.length === 0 && comments.length === 0 && photoId !== photoIdFromOriginal) {
        const likesFromOriginal = getPhotoLikes(photoIdFromOriginal);
        const commentsFromOriginal = getPhotoComments(photoIdFromOriginal);
        
        // If we found data with the original, use that and migrate data
        if (likesFromOriginal.length > 0 || commentsFromOriginal.length > 0) {
            // Migrate data to the new photoId for consistency
            if (likesFromOriginal.length > 0) {
                const likesData = JSON.parse(localStorage.getItem('photoLikes') || '{}');
                likesData[photoId] = likesFromOriginal;
                localStorage.setItem('photoLikes', JSON.stringify(likesData));
                likes = likesFromOriginal;
            }
            
            if (commentsFromOriginal.length > 0) {
                const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}');
                commentsData[photoId] = commentsFromOriginal;
                localStorage.setItem('photoComments', JSON.stringify(commentsData));
                comments = commentsFromOriginal;
            }
            
            isLiked = isPhotoLikedByUser(photoId);
        }
    }
    
    // Determine the final photoId to use (prefer the one with data, or the normalized one)
    let finalPhotoId = photoId;
    if (comments.length === 0 && likes.length === 0 && photoId !== photoIdFromOriginal) {
        // If primary photoId has no data, check if original has data
        const commentsFromOriginal = getPhotoComments(photoIdFromOriginal);
        const likesFromOriginal = getPhotoLikes(photoIdFromOriginal);
        if (commentsFromOriginal.length > 0 || likesFromOriginal.length > 0) {
            finalPhotoId = photoIdFromOriginal;
            // Use the data from original
            comments = commentsFromOriginal;
            likes = likesFromOriginal;
            isLiked = isPhotoLikedByUser(photoIdFromOriginal);
        }
    }
    
    const likeBtn = document.getElementById('modalLikeBtn');
    const likeCount = document.getElementById('modalLikeCount');
    const commentCount = document.getElementById('modalCommentCount');
    const commentsList = document.getElementById('commentsList');
    
    if (likeBtn) {
        const icon = likeBtn.querySelector('.like-icon');
        if (icon) {
            icon.textContent = isLiked ? '❤️' : '♡';
        }
        likeBtn.classList.toggle('liked', isLiked);
    }
    
    if (likeCount) {
        likeCount.textContent = likes.length;
    }
    
    if (commentCount) {
        commentCount.textContent = getTotalCommentsCount(comments);
    }
    
    if (commentsList) {
        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="no-comments">Nog geen reacties. Wees de eerste!</p>';
        } else {
            const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
            
            commentsList.innerHTML = comments.map((comment, commentIndex) => {
                return renderComment(comment, commentIndex, finalPhotoId, currentUser, false, null);
            }).join('');
            
            // Setup reply input handlers after rendering
            setupReplyInputHandlers();
        }
    }
}

// Update portfolio item social UI by photoId
function updatePortfolioItemSocialUI(photoId) {
    const items = document.querySelectorAll(`.portfolio-item[data-photo-id="${photoId}"]`);
    items.forEach(item => {
        const photoSrc = item.querySelector('img')?.src;
        if (!photoSrc) return;
        
        // Recalculate photoId from src to ensure correct matching
        const itemPhotoId = getPhotoId(photoSrc);
        
        const likes = getPhotoLikes(itemPhotoId);
        const comments = getPhotoComments(itemPhotoId);
        const isLiked = isPhotoLikedByUser(itemPhotoId);
        
        const likesEl = item.querySelector('.portfolio-item-likes');
        const commentsEl = item.querySelector('.portfolio-item-comments');
        
        if (likesEl) {
            const icon = likesEl.querySelector('.like-icon-small');
            const count = likesEl.querySelector('.like-count-small');
            if (icon) {
                icon.textContent = isLiked ? '❤️' : '♡';
                icon.classList.toggle('liked', isLiked);
            }
            if (count) {
                count.textContent = likes.length;
            }
        }
        
        if (commentsEl) {
            const count = commentsEl.querySelector('.comment-count-small');
            if (count) {
                count.textContent = getTotalCommentsCount(comments);
            }
        }
    });
}

// Update portfolio item social UI by photo src (more reliable)
function updatePortfolioItemSocialUIBySrc(photoSrc) {
    if (!photoSrc) return;
    
    // Get photoId from the provided src
    const targetPhotoId = getPhotoId(photoSrc);
    
    // Find all portfolio items and check if their photoId matches
    const allItems = document.querySelectorAll('.portfolio-item');
    allItems.forEach(item => {
        const itemImg = item.querySelector('img');
        if (!itemImg || !itemImg.src) return;
        
        // Get photoId from item src
        const itemPhotoId = getPhotoId(itemImg.src);
        
        // Also try with original src attribute if different
        const originalSrc = itemImg.getAttribute('src');
        const itemPhotoIdFromOriginal = originalSrc && originalSrc !== itemImg.src ? getPhotoId(originalSrc) : itemPhotoId;
        
        // Check if any of the photoIds match
        const photoIdsMatch = itemPhotoId === targetPhotoId || 
                             itemPhotoIdFromOriginal === targetPhotoId;
        
        if (photoIdsMatch) {
            // Try to get data with the item's photoId first
            let likes = getPhotoLikes(itemPhotoId);
            let comments = getPhotoComments(itemPhotoId);
            let isLiked = isPhotoLikedByUser(itemPhotoId);
            
            // If no data found, try with target photoId
            if (likes.length === 0 && comments.length === 0 && itemPhotoId !== targetPhotoId) {
                const targetLikes = getPhotoLikes(targetPhotoId);
                const targetComments = getPhotoComments(targetPhotoId);
                if (targetLikes.length > 0 || targetComments.length > 0) {
                    likes = targetLikes;
                    comments = targetComments;
                    isLiked = isPhotoLikedByUser(targetPhotoId);
                }
            }
            
            const likesEl = item.querySelector('.portfolio-item-likes');
            const commentsEl = item.querySelector('.portfolio-item-comments');
            
            if (likesEl) {
                const icon = likesEl.querySelector('.like-icon-small');
                const count = likesEl.querySelector('.like-count-small');
                if (icon) {
                    icon.textContent = isLiked ? '❤️' : '♡';
                    icon.classList.toggle('liked', isLiked);
                }
                if (count) {
                    count.textContent = likes.length;
                }
            }
            
            if (commentsEl) {
                const count = commentsEl.querySelector('.comment-count-small');
                if (count) {
                    count.textContent = getTotalCommentsCount(comments);
                }
            }
        }
    });
}

// Update all social UI (modal and portfolio items)
function updateAllSocialUI() {
    // Update modal if it's open
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'flex' && currentPhotos.length > 0) {
        const photo = currentPhotos[currentPhotoIndex];
        if (photo) {
            // Use modalImage.src if available for consistency
            const modalImage = document.getElementById('modalImage');
            let photoSrc = photo.src;
            if (modalImage && modalImage.src) {
                photoSrc = modalImage.src;
            }
            updateModalSocialUI();
            updatePortfolioItemSocialUIBySrc(photoSrc);
        }
    }
    
    // Update all portfolio items by iterating through them
    const allPortfolioItems = document.querySelectorAll('.portfolio-item');
    allPortfolioItems.forEach(item => {
        const itemImg = item.querySelector('img');
        if (itemImg) {
            // Try both src attribute and actual src property
            const photoSrc = itemImg.src || itemImg.getAttribute('src');
            if (photoSrc) {
                updatePortfolioItemSocialUIBySrc(photoSrc);
            }
        }
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Render a single comment (recursive for replies)
function renderComment(comment, commentIndex, photoId, currentUser, isReply = false, parentCommentIndex = null) {
    const date = new Date(comment.date);
    const dateStr = date.toLocaleDateString('nl-NL', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const isOwnComment = currentUser && comment.user === currentUser;
    const commentId = comment.id || `${comment.date}_${commentIndex}`;
    const editedLabel = comment.edited ? ' <span class="comment-edited">(bewerkt)</span>' : '';
    const replyCount = comment.replies && Array.isArray(comment.replies) ? comment.replies.length : 0;
    
    // Build replies HTML
    let repliesHtml = '';
    if (comment.replies && Array.isArray(comment.replies) && comment.replies.length > 0) {
        repliesHtml = '<div class="comment-replies">' + 
            comment.replies.map((reply, replyIndex) => {
                return renderComment(reply, replyIndex, photoId, currentUser, true, commentIndex);
            }).join('') + 
            '</div>';
    }
    
    // Build reply form HTML (only for top-level comments, not replies to replies)
    let replyFormHtml = '';
    if (!isReply) {
        const replyFormId = `reply-form-${photoId}-${commentIndex}`;
        replyFormHtml = `
            <div id="${replyFormId}" class="reply-form" style="display: none;">
                <input type="text" class="reply-input" id="reply-input-${photoId}-${commentIndex}" placeholder="Schrijf een reactie..." maxlength="500">
                <div class="reply-form-actions">
                    <button class="btn-reply-submit" onclick="submitReply('${photoId}', ${commentIndex})">Plaatsen</button>
                    <button class="btn-reply-cancel" onclick="cancelReply('${photoId}', ${commentIndex})">Annuleren</button>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="comment-item ${isReply ? 'comment-reply' : ''}" data-comment-id="${commentId}" data-comment-index="${commentIndex}" data-parent-index="${parentCommentIndex !== null ? parentCommentIndex : ''}">
            <div class="comment-header">
                <div class="comment-author">${comment.user}${editedLabel}</div>
                ${isOwnComment ? `
                <div class="comment-actions">
                    <button class="comment-action-btn edit-comment-btn" onclick="window.editComment('${photoId}', ${commentIndex}, ${isReply}, ${parentCommentIndex !== null ? parentCommentIndex : 'null'})" title="Bewerk reactie">✏️</button>
                    <button class="comment-action-btn delete-comment-btn" onclick="window.deleteComment('${photoId}', ${commentIndex}, ${isReply}, ${parentCommentIndex !== null ? parentCommentIndex : 'null'})" title="Verwijder reactie">🗑️</button>
                </div>
                ` : ''}
            </div>
            <div class="comment-text" id="comment-text-${photoId}-${commentIndex}">${escapeHtml(comment.text)}</div>
            <div class="comment-footer">
                <div class="comment-date">${dateStr}</div>
                ${!isReply ? `
                <div class="comment-footer-actions">
                    ${replyCount > 0 ? `<span class="comment-reply-count" onclick="toggleReplies('${photoId}', ${commentIndex})">${replyCount} ${replyCount === 1 ? 'reactie' : 'reacties'}</span>` : ''}
                    <button class="btn-reply" onclick="showReplyForm('${photoId}', ${commentIndex})">Reageren</button>
                </div>
                ` : ''}
            </div>
            ${repliesHtml}
            ${replyFormHtml}
        </div>
    `;
}

// Delete comment (supports both top-level comments and replies)
function deleteComment(photoId, commentIndex, isReply = false, parentCommentIndex = null) {
    if (typeof isAuthenticated !== 'function' || !isAuthenticated()) {
        alert('Je moet ingelogd zijn om reacties te verwijderen.');
        return;
    }
    
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!currentUser) {
        alert('Je moet ingelogd zijn om reacties te verwijderen.');
        return;
    }
    
    const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}');
    
    if (isReply && parentCommentIndex !== null) {
        // Deleting a reply
        if (!commentsData[photoId] || !commentsData[photoId][parentCommentIndex]) {
            alert('Reactie niet gevonden.');
            return;
        }
        
        const parentComment = commentsData[photoId][parentCommentIndex];
        if (!parentComment.replies || !parentComment.replies[commentIndex]) {
            alert('Reactie niet gevonden.');
            return;
        }
        
        const reply = parentComment.replies[commentIndex];
        
        // Check if user owns this reply
        if (reply.user !== currentUser) {
            alert('Je kunt alleen je eigen reacties verwijderen.');
            return;
        }
        
        if (!confirm('Weet je zeker dat je deze reactie wilt verwijderen?')) {
            return;
        }
        
        // Remove reply
        parentComment.replies.splice(commentIndex, 1);
    } else {
        // Deleting a top-level comment
        if (!commentsData[photoId] || !commentsData[photoId][commentIndex]) {
            alert('Reactie niet gevonden.');
            return;
        }
        
        const comment = commentsData[photoId][commentIndex];
        
        // Check if user owns this comment
        if (comment.user !== currentUser) {
            alert('Je kunt alleen je eigen reacties verwijderen.');
            return;
        }
        
        if (!confirm('Weet je zeker dat je deze reactie wilt verwijderen?')) {
            return;
        }
        
        // Remove comment
        commentsData[photoId].splice(commentIndex, 1);
    }
    
    // Clean up empty arrays
    if (commentsData[photoId] && commentsData[photoId].length === 0) {
        delete commentsData[photoId];
    }
    
    localStorage.setItem('photoComments', JSON.stringify(commentsData));
    
    // Update UI - get photo src from modal
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'flex' && currentPhotos.length > 0) {
        const photo = currentPhotos[currentPhotoIndex];
        if (photo) {
            updateModalSocialUI();
            updatePortfolioItemSocialUIBySrc(photo.src);
        }
    } else {
        updateModalSocialUI();
    }
}

// Edit comment (supports both top-level comments and replies)
function editComment(photoId, commentIndex, isReply = false, parentCommentIndex = null) {
    if (typeof isAuthenticated !== 'function' || !isAuthenticated()) {
        alert('Je moet ingelogd zijn om reacties te bewerken.');
        return;
    }
    
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!currentUser) {
        alert('Je moet ingelogd zijn om reacties te bewerken.');
        return;
    }
    
    const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}');
    
    let comment;
    if (isReply && parentCommentIndex !== null) {
        // Editing a reply
        if (!commentsData[photoId] || !commentsData[photoId][parentCommentIndex]) {
            alert('Reactie niet gevonden.');
            return;
        }
        
        const parentComment = commentsData[photoId][parentCommentIndex];
        if (!parentComment.replies || !parentComment.replies[commentIndex]) {
            alert('Reactie niet gevonden.');
            return;
        }
        
        comment = parentComment.replies[commentIndex];
    } else {
        // Editing a top-level comment
        if (!commentsData[photoId] || !commentsData[photoId][commentIndex]) {
            alert('Reactie niet gevonden.');
            return;
        }
        
        comment = commentsData[photoId][commentIndex];
    }
    
    // Check if user owns this comment
    if (comment.user !== currentUser) {
        alert('Je kunt alleen je eigen reacties bewerken.');
        return;
    }
    
    // Get current text
    const commentTextEl = document.getElementById(`comment-text-${photoId}-${commentIndex}`);
    if (!commentTextEl) return;
    
    const currentText = comment.text;
    const newText = prompt('Bewerk je reactie:', currentText);
    
    if (newText === null) {
        // User cancelled
        return;
    }
    
    const trimmedText = newText.trim();
    if (!trimmedText) {
        alert('Reactie mag niet leeg zijn.');
        return;
    }
    
    if (trimmedText.length > 500) {
        alert('Reactie is te lang (max 500 tekens).');
        return;
    }
    
    // Update comment
    comment.text = trimmedText;
    comment.edited = true;
    comment.editDate = new Date().toISOString();
    
    localStorage.setItem('photoComments', JSON.stringify(commentsData));
    
    // Update UI - get photo src from modal
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'flex' && currentPhotos.length > 0) {
        const photo = currentPhotos[currentPhotoIndex];
        if (photo) {
            updateModalSocialUI();
            updatePortfolioItemSocialUIBySrc(photo.src);
        }
    } else {
        updateModalSocialUI();
    }
}

// Show reply form
function showReplyForm(photoId, commentIndex) {
    if (typeof isAuthenticated !== 'function' || !isAuthenticated()) {
        alert('Je moet ingelogd zijn om te reageren.');
        return;
    }
    
    const replyForm = document.getElementById(`reply-form-${photoId}-${commentIndex}`);
    if (replyForm) {
        replyForm.style.display = 'block';
        const replyInput = document.getElementById(`reply-input-${photoId}-${commentIndex}`);
        if (replyInput) {
            replyInput.focus();
        }
    }
}

// Cancel reply
function cancelReply(photoId, commentIndex) {
    const replyForm = document.getElementById(`reply-form-${photoId}-${commentIndex}`);
    if (replyForm) {
        replyForm.style.display = 'none';
        const replyInput = document.getElementById(`reply-input-${photoId}-${commentIndex}`);
        if (replyInput) {
            replyInput.value = '';
        }
    }
}

// Submit reply
function submitReply(photoId, commentIndex) {
    if (typeof isAuthenticated !== 'function' || !isAuthenticated()) {
        alert('Je moet ingelogd zijn om te reageren.');
        return;
    }
    
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!currentUser) {
        alert('Je moet ingelogd zijn om te reageren.');
        return;
    }
    
    const replyInput = document.getElementById(`reply-input-${photoId}-${commentIndex}`);
    if (!replyInput) return;
    
    const replyText = replyInput.value.trim();
    if (!replyText) {
        alert('Voer een reactie in.');
        return;
    }
    
    if (replyText.length > 500) {
        alert('Reactie is te lang (max 500 tekens).');
        return;
    }
    
    const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}');
    if (!commentsData[photoId] || !commentsData[photoId][commentIndex]) {
        alert('Reactie niet gevonden.');
        return;
    }
    
    const parentComment = commentsData[photoId][commentIndex];
    if (!parentComment.replies) {
        parentComment.replies = [];
    }
    
    const reply = {
        id: `reply_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user: currentUser,
        text: replyText,
        date: new Date().toISOString()
    };
    
    parentComment.replies.push(reply);
    localStorage.setItem('photoComments', JSON.stringify(commentsData));
    
    // Clear input and hide form
    replyInput.value = '';
    cancelReply(photoId, commentIndex);
    
    // Update UI - get photo src from modal (use modalImage.src for consistency)
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'flex' && currentPhotos.length > 0) {
        const photo = currentPhotos[currentPhotoIndex];
        if (photo) {
            const modalImage = document.getElementById('modalImage');
            let photoSrc = photo.src;
            if (modalImage && modalImage.src) {
                photoSrc = modalImage.src;
            }
            updateModalSocialUI();
            updatePortfolioItemSocialUIBySrc(photoSrc);
        }
    } else {
        updateModalSocialUI();
    }
}

// Toggle replies visibility
function toggleReplies(photoId, commentIndex) {
    const commentItem = document.querySelector(`[data-comment-index="${commentIndex}"][data-parent-index=""]`);
    if (!commentItem) return;
    
    const repliesSection = commentItem.querySelector('.comment-replies');
    if (!repliesSection) return;
    
    if (repliesSection.style.display === 'none') {
        repliesSection.style.display = 'block';
    } else {
        repliesSection.style.display = 'none';
    }
}

// Make functions globally available
window.toggleLike = toggleLike;
window.addComment = addComment;
window.toggleComments = toggleComments;
window.deleteComment = deleteComment;
window.editComment = editComment;
window.showReplyForm = showReplyForm;
window.cancelReply = cancelReply;
window.submitReply = submitReply;
window.toggleReplies = toggleReplies;

// Function to sanitize folder name (same as in create-portfolio-folders.js)
function sanitizeFolderName(name) {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

// Function to get portfolio images from folder
function getPortfolioImages(memberName) {
    const folderName = sanitizeFolderName(memberName);
    const portfolioPath = `images/portfolio/${folderName}/`;
    
    // This will be populated dynamically when images are added
    // For now, return empty array - images will be loaded from the folder
    return [];
}

// Load portfolio data - uses shared function from portfolio-data.js
// This ensures consistency between management and public views
// Note: loadPortfolioData() is defined in portfolio-data.js and loaded via script tag

// Initialize portfolio data
let portfolioData = {};

// Load portfolio data when DOM is ready
function initializePortfolioData() {
    portfolioData = loadPortfolioData();
    console.log('Portfolio data loaded:', Object.keys(portfolioData).length, 'members');
    
    // Listen for storage changes to reload portfolio when order changes
    // This works for cross-tab synchronization
    window.addEventListener('storage', function(e) {
        if (e.key === 'portfolioOrder' || 
            e.key === 'portfolioData' || 
            e.key === 'hiddenPortfolioPhotos' ||
            e.key === 'portfolioSyncTrigger') {
            console.log('Portfolio changed (storage event):', e.key);
            reloadPortfolioDisplay();
        } else if (e.key === 'photoLikes' || e.key === 'photoComments') {
            // Update social UI when likes or comments change
            updateAllSocialUI();
        }
    });
    
    // Also listen for same-tab changes (storage event doesn't fire for same tab)
    // Use a custom event or polling for same-tab synchronization
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        if (key === 'photoLikes' || key === 'photoComments') {
            // Dispatch custom event for same-tab updates
            window.dispatchEvent(new CustomEvent('socialDataChanged', { 
                detail: { key: key, value: value } 
            }));
        }
    };
    
    // Listen for custom social data changed event
    window.addEventListener('socialDataChanged', function(e) {
        updateAllSocialUI();
    });
    
    // Listen for custom events (for same-tab updates)
    // This is triggered when changes are made in the management page
    window.addEventListener('portfolioOrderChanged', function(e) {
        console.log('Portfolio order changed (custom event), reloading...');
        const memberName = e.detail?.member;
        reloadPortfolioDisplay(memberName);
    });
    
    // Also listen for any localStorage changes via polling as backup
    // This ensures we catch all changes even if events don't fire
    // Optimized: only check when page is visible to save resources
    let lastSyncTime = Date.now();
    const syncInterval = setInterval(function() {
        // Only check if page is visible (not in background tab)
        if (document.hidden) return;
        
        const currentSyncTime = localStorage.getItem('portfolioSyncTrigger');
        if (currentSyncTime && parseInt(currentSyncTime) > lastSyncTime) {
            lastSyncTime = parseInt(currentSyncTime);
            console.log('Portfolio sync detected via polling, reloading...');
            reloadPortfolioDisplay();
        }
    }, 1000); // Check every 1 second (reduced from 500ms for better performance)
    
    // Store interval ID so it can be cleared if needed
    window.portfolioSyncInterval = syncInterval;
}

// Reload portfolio display function
function reloadPortfolioDisplay(memberNameOverride = null) {
    try {
        // Reload portfolio data from localStorage
        portfolioData = loadPortfolioData();
        
        // Get member name
        const memberName = memberNameOverride || decodeURIComponent(getMemberFromURL());
        
        if (memberName && portfolioData[memberName]) {
            const memberPortfolio = portfolioData[memberName];
            console.log('Reloading portfolio for:', memberName, '-', memberPortfolio.photos.length, 'photos');
            
            // Update member info
            displayMemberInfo(memberPortfolio);
            
            // Update portfolio gallery
            displayPortfolioGallery(memberPortfolio);
            
            console.log('Portfolio successfully synchronized');
        } else if (memberName) {
            console.log('Member not found in portfolio data:', memberName);
        }
    } catch (e) {
        console.error('Error reloading portfolio display:', e);
    }
}

// Initialize portfolio page
function initPortfolio() {
    const memberName = decodeURIComponent(getMemberFromURL());
    
    if (!memberName) {
        // Redirect to leden page if no member specified
        window.location.href = 'leden.html';
        return;
    }

    // Reload portfolio data to ensure it's up to date
    // This will use the latest order from localStorage
    portfolioData = loadPortfolioData();
    
    console.log('Portfolio initialized for:', memberName);
    console.log('Photo order:', portfolioData[memberName]?.photos?.map((p, i) => `${i + 1}. ${p.title || p.src.substring(0, 30)}`));

    // Update page title and header
    const memberNameElement = document.getElementById('memberName');
    if (memberNameElement) {
        memberNameElement.textContent = memberName;
    }
    document.title = `${memberName} - Portfolio | De Zelfontspanners`;

    // Get member portfolio data
    let memberPortfolio = portfolioData[memberName];
    
    // If not found, create empty portfolio
    if (!memberPortfolio) {
        memberPortfolio = {
            name: memberName,
            photos: []
        };
    }
    
    // Ensure photos array exists
    if (!memberPortfolio.photos) {
        memberPortfolio.photos = [];
    }
    
    // Note: Photos are already merged and sorted in loadPortfolioData()
    // No need to merge again here - memberPortfolio.photos already contains all photos in correct order

    // Display member info
    displayMemberInfo(memberPortfolio);

    // Display portfolio gallery
    displayPortfolioGallery(memberPortfolio);
    
    // Set up real-time synchronization
    // The event listeners are already set up in initializePortfolioData()
}

// Display member information
function displayMemberInfo(member) {
    const memberInfo = document.getElementById('memberInfo');
    
    const initials = getInitials(member.name);
    const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=150&background=1a1a1a&color=d4af37&bold=true&font-size=0.5`;
    
    // Count visible photos (hidden photos are already filtered in loadPortfolioData)
    const photoCount = member.photos ? member.photos.length : 0;
    
    memberInfo.innerHTML = `
        <div class="portfolio-member-card">
            <div class="portfolio-member-photo">
                <img src="${imageUrl}" alt="${member.name}" loading="lazy">
            </div>
            <div class="portfolio-member-details">
                <h2>${member.name}</h2>
                <p class="portfolio-photo-count">${photoCount} foto's</p>
            </div>
        </div>
    `;
}

// Store current photos for modal
let currentPhotos = [];
let currentPhotoIndex = 0;

// Display portfolio gallery
function displayPortfolioGallery(member) {
    const gallery = document.getElementById('portfolioGallery');
    if (!gallery) {
        console.error('Gallery element not found');
        return;
    }
    
    const folderName = sanitizeFolderName(member.name);
    const portfolioPath = `images/portfolio/${folderName}/`;
    
    // Get photos - use member.photos which should already contain all photos
    // Note: hidden photos are already filtered in loadPortfolioData()
    let photos = [];
    
    // Use member.photos if available and not empty (this is the main source)
    if (member.photos && Array.isArray(member.photos)) {
        photos = member.photos;
    }
    
    // Remove duplicates (safety check)
    const seenSrcs = new Set();
    photos = photos.filter(photo => {
        const src = String(photo.src || '');
        // For Base64 URLs, use first 100 chars for comparison
        const key = src.startsWith('data:image') ? src.substring(0, 100) : src;
        
        if (seenSrcs.has(key)) {
            console.log('Removing duplicate photo:', src.substring(0, 50));
            return false;
        }
        seenSrcs.add(key);
        return true;
    });
    
    console.log(`Loading portfolio for ${member.name}:`, photos.length, 'photos found');
    
    // Store photos globally for modal
    currentPhotos = photos;
    
    // If no photos, try to load from folder structure
    // Note: This requires a server-side solution or manual configuration
    // For now, we'll show a message if no photos are found
    
    if (photos.length === 0) {
        gallery.innerHTML = `
            <div class="portfolio-empty">
                <p>Er zijn nog geen foto's beschikbaar voor dit portfolio.</p>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: #888;">
                    Voeg foto's toe aan: <code style="background: rgba(212,175,55,0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">${portfolioPath}</code>
                </p>
            </div>
        `;
        return;
    }

    gallery.innerHTML = photos.map((photo, index) => {
        const photoSrc = photo.src;
        const photoId = getPhotoId(photoSrc);
        const likes = getPhotoLikes(photoId);
        const comments = getPhotoComments(photoId);
        const isLiked = isPhotoLikedByUser(photoId);
        const isLoggedIn = typeof isAuthenticated === 'function' && isAuthenticated();
        
        return `
        <div class="portfolio-item" data-category="${photo.category || 'all'}" data-index="${index}" data-photo-id="${photoId}">
            <div class="portfolio-item-image">
                <img src="${photo.src}" alt="${photo.title || `Foto ${index + 1}`}" loading="lazy">
            </div>
            <div class="portfolio-item-overlay">
                <h3>${photo.title || `Foto ${index + 1}`}</h3>
                ${isLoggedIn ? `
                <div class="portfolio-item-social">
                    <div class="portfolio-item-likes">
                        <span class="like-icon-small ${isLiked ? 'liked' : ''}">${isLiked ? '❤️' : '♡'}</span>
                        <span class="like-count-small">${likes.length}</span>
                    </div>
                    <div class="portfolio-item-comments">
                        <span class="comment-icon-small">💬</span>
                        <span class="comment-count-small">${getTotalCommentsCount(comments)}</span>
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
        `;
    }).join('');
    
    // Add click handlers to portfolio items
    const items = gallery.querySelectorAll('.portfolio-item');
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            openImageModal(index);
        });
    });
    
    // Setup comment input Enter key handler
    const commentInput = document.getElementById('commentInput');
    if (commentInput) {
        commentInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addComment();
            }
        });
    }
    
    // Setup reply input Enter key handlers (will be set up dynamically when reply forms are shown)
    setupReplyInputHandlers();
}

// Setup Enter key handlers for all reply inputs
function setupReplyInputHandlers() {
    // This will be called after comments are rendered
    // The handlers are set up via inline onclick handlers in the HTML
    // But we can also add event listeners here for better UX
    document.querySelectorAll('.reply-input').forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                // Extract photoId and commentIndex from input ID
                const idParts = input.id.split('-');
                if (idParts.length >= 4) {
                    const photoId = idParts[2];
                    const commentIndex = parseInt(idParts[3]);
                    submitReply(photoId, commentIndex);
                }
            }
        });
    });
}

// Open image modal
function openImageModal(index) {
    if (currentPhotos.length === 0) return;
    
    currentPhotoIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCounter = document.getElementById('modalCounter');
    const modalSocial = document.getElementById('modalSocial');
    
    const photo = currentPhotos[index];
    modalImage.src = photo.src;
    modalImage.alt = photo.title || `Foto ${index + 1}`;
    modalTitle.textContent = photo.title || `Foto ${index + 1}`;
    modalCounter.textContent = `${index + 1} / ${currentPhotos.length}`;
    
    // Show social features only for logged-in members
    if (modalSocial) {
        const isLoggedIn = typeof isAuthenticated === 'function' && isAuthenticated();
        modalSocial.style.display = isLoggedIn ? 'block' : 'none';
        
        if (isLoggedIn) {
            // Show comments section when opening modal
            const commentsSection = document.getElementById('modalComments');
            if (commentsSection) {
                commentsSection.style.display = 'block';
            }
            
            // Small delay to ensure image src is set before updating UI
            setTimeout(() => {
                // Update social UI
                updateModalSocialUI();
                
                // Also update portfolio items to ensure synchronization
                updatePortfolioItemSocialUIBySrc(photo.src);
            }, 50);
        }
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close image modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

// Navigate to previous image
function showPreviousImage() {
    if (currentPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
    openImageModal(currentPhotoIndex);
}

// Navigate to next image
function showNextImage() {
    if (currentPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotos.length;
    openImageModal(currentPhotoIndex);
}

// Initialize modal functionality
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('modalClose');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    
    // Close modal
    closeBtn.addEventListener('click', closeImageModal);
    
    // Close when clicking outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPreviousImage();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeImageModal();
            } else if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}

// Get initials from name (helper function)
function getInitials(name) {
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize portfolio data first
    initializePortfolioData();
    
    // Then initialize portfolio page
    initPortfolio();
    initImageModal();
});

