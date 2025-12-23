// Simplified drag and drop implementation
// This will be included in portfolio-manage.js

let draggedPhotoIndex = null;

function initSimpleDragDrop() {
    const grid = document.getElementById('currentPhotosGrid');
    if (!grid) return;
    
    const items = grid.querySelectorAll('.photo-item[data-is-user="true"]');
    
    items.forEach((item, index) => {
        // Remove old listeners
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        // Add mousedown for better control
        newItem.addEventListener('mousedown', function(e) {
            if (e.target.closest('.btn-delete')) return;
            
            this.style.cursor = 'grabbing';
        });
        
        // Drag start
        newItem.addEventListener('dragstart', function(e) {
            draggedPhotoIndex = parseInt(this.dataset.index);
            this.classList.add('dragging');
            this.style.opacity = '0.5';
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', draggedPhotoIndex.toString());
        });
        
        // Drag end
        newItem.addEventListener('dragend', function(e) {
            this.classList.remove('dragging');
            this.style.opacity = '';
            this.style.cursor = '';
            grid.querySelectorAll('.photo-item').forEach(i => {
                i.classList.remove('drag-over');
            });
            draggedPhotoIndex = null;
        });
        
        // Drag over
        newItem.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            if (this.dataset.isUser !== 'true') return;
            
            const dragging = grid.querySelector('.dragging');
            if (!dragging || dragging === this) return;
            
            const rect = this.getBoundingClientRect();
            const afterElement = e.clientY < rect.top + rect.height / 2 ? this : this.nextSibling;
            
            if (afterElement == null) {
                grid.appendChild(dragging);
            } else {
                grid.insertBefore(dragging, afterElement);
            }
        });
        
        // Drop
        newItem.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!draggedPhotoIndex || this.dataset.isUser !== 'true') return;
            
            const allItems = Array.from(grid.querySelectorAll('.photo-item'));
            const draggedItem = grid.querySelector('.dragging');
            const oldIndex = allItems.indexOf(draggedItem);
            const newIndex = allItems.indexOf(this);
            
            if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;
            
            // Calculate user photo indices
            let oldUserIndex = 0;
            let newUserIndex = 0;
            
            for (let i = 0; i < oldIndex; i++) {
                if (allItems[i].dataset.isUser === 'true') oldUserIndex++;
            }
            for (let i = 0; i < newIndex; i++) {
                if (allItems[i].dataset.isUser === 'true') newUserIndex++;
            }
            
            if (oldIndex < newIndex) newUserIndex--;
            
            // Reorder
            const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
            const userPhotos = userData[currentMember] || [];
            
            if (oldUserIndex >= userPhotos.length) return;
            
            const [moved] = userPhotos.splice(oldUserIndex, 1);
            userPhotos.splice(newUserIndex, 0, moved);
            
            const baseTime = Date.now();
            userPhotos.forEach((p, i) => { p.order = baseTime + i; });
            
            userData[currentMember] = userPhotos;
            localStorage.setItem('portfolioData', JSON.stringify(userData));
            
            loadCurrentPhotos();
        });
    });
}







