class ContentManager {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadAbout();
        await this.loadPortfolio();
        await this.loadAlbums();
        await this.loadProjects();
        this.setupNavigation();
    }

    async loadAbout() {
        try {
            const response = await fetch('content/about.md');
            if (response.ok) {
                const text = await response.text();
                document.getElementById('about-content').innerHTML = this.markdownToHtml(text);
            } else {
                document.getElementById('about-content').innerHTML = 
                    '<p>Welcome! Please add your introduction in <code>content/about.md</code></p>';
            }
        } catch (error) {
            document.getElementById('about-content').innerHTML = 
                '<p>Welcome! Please add your introduction in <code>content/about.md</code></p>';
        }
    }

    async loadPortfolio() {
        const sections = ['papers', 'events', 'startup'];
        const allItems = [];

        for (const section of sections) {
            const items = await this.loadPortfolioSection(section);
            // Add type information to each item
            items.forEach(item => {
                item.type = section.slice(0, -1); // Remove 's' from plural
                if (item.type === 'startup') item.type = 'venture';
            });
            allItems.push(...items);
        }

        // Sort by date (newest first)
        allItems.sort((a, b) => {
            const dateA = new Date(a.date || '1900');
            const dateB = new Date(b.date || '1900');
            return dateB - dateA;
        });

        this.displayPortfolio(allItems);
    }

    async loadPortfolioSection(section) {
        try {
            const items = [];

            // Try to load a few common file patterns
            for (let i = 1; i <= 10; i++) {
                try {
                    const itemResponse = await fetch(`content/portfolio/${section}/item${i}.json`);
                    if (itemResponse.ok) {
                        const item = await itemResponse.json();
                        items.push(item);
                    }
                } catch (e) {
                    // Continue trying other patterns
                }
            }

            // Try loading by common names
            const commonNames = ['paper1', 'paper2', 'event1', 'event2', 'project'];
            for (const name of commonNames) {
                try {
                    const itemResponse = await fetch(`content/portfolio/${section}/${name}.json`);
                    if (itemResponse.ok) {
                        const item = await itemResponse.json();
                        items.push(item);
                    }
                } catch (e) {
                    // Continue
                }
            }

            return items;
        } catch (error) {
            return [];
        }
    }

    displayPortfolio(items) {
        const content = document.getElementById('portfolio-content');

        if (items.length === 0) {
            content.innerHTML = `
                <div class="loading">
                    <p>No portfolio items found. Add JSON files to <code>content/portfolio/</code> subfolders</p>
                </div>
            `;
            return;
        }

        content.innerHTML = items.map(item => `
            <div class="work-item">
                <div class="type-tag">${item.type}</div>
                <h3>${item.title || 'Untitled'}</h3>
                ${item.date ? `<div class="meta">${item.date}</div>` : ''}
                ${item.venue ? `<div class="meta">${item.venue}</div>` : ''}
                <p>${item.description || item.abstract || 'No description available'}</p>
                ${item.link ? `<a href="${item.link}" target="_blank">View →</a>` : ''}
            </div>
        `).join('');
    }

    async loadAlbums() {
        try {
            const albums = await this.discoverAlbums();
            const grid = document.getElementById('albums-grid');

            if (albums.length === 0) {
                grid.innerHTML = `
                    <div class="loading">
                        <p>No albums found. Create folders in <code>content/albums/</code></p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = albums.map(album => `
                <div class="album-card" data-album="${album.folder}">
                    <div class="album-preview">
                        ${album.preview ? `<img src="${album.preview}" alt="${album.title}" style="width:100%;height:100%;object-fit:cover;">` 
                                        : 'Photo Preview'}
                    </div>
                    <div class="album-info">
                        <h3>${album.title}</h3>
                        <p>${album.description}</p>
                        ${album.date ? `<p><small>${album.date}</small></p>` : ''}
                    </div>
                </div>
            `).join('');

            // Add click handlers for albums
            document.querySelectorAll('.album-card').forEach(card => {
                card.addEventListener('click', () => {
                    const albumName = card.dataset.album;
                    this.openAlbum(albumName);
                });
            });
        } catch (error) {
            console.error('Error loading albums:', error);
        }
    }

    async discoverAlbums() {
        const albums = [];
        const albumNames = ['sample-album', 'travel', 'nature', 'urban', 'portraits'];

        for (const name of albumNames) {
            try {
                const infoResponse = await fetch(`content/albums/${name}/info.json`);
                if (infoResponse.ok) {
                    const info = await infoResponse.json();
                    albums.push({
                        folder: name,
                        title: info.title || name,
                        description: info.description || '',
                        date: info.date || '',
                        preview: info.preview ? `content/albums/${name}/${info.preview}` : null
                    });
                }
            } catch (e) {
                // Continue to next album
            }
        }

        return albums;
    }

    async loadProjects() {
        try {
            const projects = await this.discoverProjects();
            const grid = document.getElementById('projects-grid');

            if (projects.length === 0) {
                grid.innerHTML = `
                    <div class="loading">
                        <p>No projects found. Create folders in <code>content/projects/</code></p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = projects.map(project => `
                <div class="project-card">
                    <div class="project-preview">
                        ${project.preview ? `<img src="${project.preview}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;">` 
                                          : 'Interactive Preview'}
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="content/projects/${project.folder}/index.html" target="_blank" class="project-link">
                            Play →
                        </a>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    async discoverProjects() {
        const projects = [];
        const projectNames = ['game1', 'game2', 'interactive-demo', 'visualization'];

        for (const name of projectNames) {
            try {
                const infoResponse = await fetch(`content/projects/${name}/info.json`);
                if (infoResponse.ok) {
                    const info = await infoResponse.json();
                    projects.push({
                        folder: name,
                        title: info.title || name,
                        description: info.description || '',
                        preview: info.preview ? `content/projects/${name}/${info.preview}` : null
                    });
                }
            } catch (e) {
                // Continue to next project
            }
        }

        return projects;
    }

    openAlbum(albumName) {
        // Create a simple modal or navigate to a dedicated page
        // For now, we'll just alert - you can enhance this later
        alert(`Opening album: ${albumName}. You can enhance this to show a photo gallery modal.`);
    }

    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }


    markdownToHtml(markdown) {
        // Simple markdown to HTML converter
        return markdown
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/\n\n/gim, '</p><p>')
            .replace(/^(.*)$/gim, '<p>$1</p>')
            .replace(/<p><\/p>/gim, '');
    }
}

// Binary Matrix functionality
class BinaryMatrix {
    constructor() {
        this.matrix = null;
        this.animationInterval = null;
        this.init();
    }

    init() {
        const matrixContainer = document.getElementById('binaryMatrix');
        if (!matrixContainer) {
            console.log('Binary matrix container not found');
            return;
        }

        console.log('Creating binary matrix...');
        this.createMatrix(matrixContainer);
    }

    createMatrix(container) {
        // Wait a bit to ensure DOM is ready, then clear and recreate
        setTimeout(() => {
            container.innerHTML = '';
            
            // Create 6x10 grid of binary cells (60 total) - more Warhol-like proportions
            const rows = 6;
            const cols = 10;
            const variants = ['', 'variant-1', 'variant-2', 'variant-3'];
            
            for (let i = 0; i < rows * cols; i++) {
                const cell = document.createElement('div');
                cell.className = 'binary-cell';
                
                const value = Math.random() > 0.5 ? '1' : '0';
                cell.textContent = value;
                
                // Add base class
                cell.classList.add(value === '1' ? 'one' : 'zero');
                
                // Add Warhol-style color variants in sections
                const section = Math.floor(i / 15); // Divide into 4 sections of 15 cells each
                if (section < variants.length && variants[section]) {
                    cell.classList.add(variants[section]);
                }
                
                // Add data attributes for position
                cell.dataset.row = Math.floor(i / cols);
                cell.dataset.col = i % cols;
                
                container.appendChild(cell);
            }

            this.matrix = container.querySelectorAll('.binary-cell');
            console.log('Matrix cells created:', this.matrix.length);
            
            // Start animation and interactivity after creation
            if (this.matrix.length > 0) {
                this.startAnimation();
                this.addInteractivity();
            }
        }, 100);
    }

    startAnimation() {
        // Randomly flip cells every 2 seconds
        this.animationInterval = setInterval(() => {
            const randomCells = Array.from(this.matrix)
                .sort(() => 0.5 - Math.random())
                .slice(0, Math.floor(Math.random() * 8) + 3); // 3-10 cells

            randomCells.forEach(cell => {
                const newValue = Math.random() > 0.5 ? '1' : '0';
                this.updateCell(cell, newValue);
            });
        }, 2000);
    }

    addInteractivity() {
        this.matrix.forEach(cell => {
            cell.addEventListener('click', () => {
                const currentValue = cell.textContent;
                const newValue = currentValue === '1' ? '0' : '1';
                this.updateCell(cell, newValue);
                
                // Create ripple effect
                this.createRipple(cell);
            });

            cell.addEventListener('mouseenter', () => {
                cell.style.transform = 'scale(1.1)';
                cell.style.zIndex = '20';
            });

            cell.addEventListener('mouseleave', () => {
                cell.style.transform = 'scale(1)';
                cell.style.zIndex = '1';
            });
        });
    }

    updateCell(cell, value) {
        cell.textContent = value;
        cell.classList.remove('one', 'zero');
        cell.classList.add(value === '1' ? 'one' : 'zero');
        
        // Add flash animation
        cell.style.animation = 'none';
        cell.offsetHeight; // Trigger reflow
        cell.style.animation = 'flash 0.3s ease';
    }

    createRipple(clickedCell) {
        const row = parseInt(clickedCell.dataset.row);
        const col = parseInt(clickedCell.dataset.col);
        
        // Affect neighboring cells with decreasing probability
        this.matrix.forEach(cell => {
            const cellRow = parseInt(cell.dataset.row);
            const cellCol = parseInt(cell.dataset.col);
            const distance = Math.abs(row - cellRow) + Math.abs(col - cellCol);
            
            if (distance > 0 && distance <= 3) {
                const probability = 1 / (distance * 2);
                if (Math.random() < probability) {
                    setTimeout(() => {
                        const newValue = Math.random() > 0.5 ? '1' : '0';
                        this.updateCell(cell, newValue);
                    }, distance * 100);
                }
            }
        });
    }

    destroy() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}

// Add flash animation keyframes to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes flash {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); box-shadow: 0 0 30px rgba(255, 20, 147, 0.8); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Portfolio tab functionality
function setupPortfolioTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Pinboard drag functionality
class PinboardDragHandler {
    constructor() {
        this.isDragging = false;
        this.currentDragElement = null;
        this.offset = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.setupDragHandlers();
    }

    setupDragHandlers() {
        const pinboardPins = document.querySelectorAll('.education-pin');
        
        pinboardPins.forEach(pin => {
            pin.style.cursor = 'grab';
            pin.style.setProperty('position', 'absolute', 'important');
            
            pin.addEventListener('mousedown', (e) => this.startDrag(e, pin));
            pin.addEventListener('touchstart', (e) => this.startDrag(e, pin), { passive: false });
        });

        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('touchmove', (e) => this.drag(e), { passive: false });
        
        document.addEventListener('mouseup', () => this.endDrag());
        document.addEventListener('touchend', () => this.endDrag());
    }

    startDrag(e, pin) {
        e.preventDefault();
        this.isDragging = true;
        this.currentDragElement = pin;
        pin.style.cursor = 'grabbing';
        pin.style.zIndex = '1000';

        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        
        const rect = pin.getBoundingClientRect();
        const pinboardRect = pin.closest('.pinboard-background').getBoundingClientRect();
        
        this.offset.x = clientX - rect.left;
        this.offset.y = clientY - rect.top;
    }

    drag(e) {
        if (!this.isDragging || !this.currentDragElement) return;
        
        e.preventDefault();
        
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        
        const pinboard = this.currentDragElement.closest('.pinboard-background');
        const pinboardRect = pinboard.getBoundingClientRect();
        
        let newLeft = ((clientX - this.offset.x - pinboardRect.left) / pinboardRect.width) * 100;
        let newTop = ((clientY - this.offset.y - pinboardRect.top) / pinboardRect.height) * 100;
        
        // Allow content to extend beyond pinboard while keeping pin tack visible
        const pinTackSize = 20; // Approximate pin tack size
        const minLeft = -30; // Allow content to extend left
        const maxLeft = 95;   // Keep pin tack within pinboard
        const minTop = -20;   // Allow content to extend up
        const maxTop = 95;    // Keep pin tack within pinboard
        
        newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
        newTop = Math.max(minTop, Math.min(maxTop, newTop));
        
        this.currentDragElement.style.setProperty('left', newLeft + '%', 'important');
        this.currentDragElement.style.setProperty('top', newTop + '%', 'important');
    }

    endDrag() {
        if (this.currentDragElement) {
            this.currentDragElement.style.cursor = 'grab';
            this.currentDragElement.style.zIndex = '10';
        }
        this.isDragging = false;
        this.currentDragElement = null;
    }
}

// Initialize the content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContentManager();
    new BinaryMatrix();
    setupPortfolioTabs();
    new PinboardDragHandler();
});