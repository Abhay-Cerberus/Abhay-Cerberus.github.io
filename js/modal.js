class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.closeBtn = document.querySelector('.close-modal');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.closeBtn.addEventListener('click', () => this.close());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open(data) {
        const { title, skills, details } = data;
        
        // Set modal content
        this.modal.querySelector('.modal-header h2').textContent = title;
        
        // Set skills
        const skillsList = this.modal.querySelector('.skills-list');
        skillsList.innerHTML = skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');
        
        // Set details
        const detailsContent = this.modal.querySelector('.details-content');
        detailsContent.innerHTML = details;
        
        // Show modal with animation
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize modal
const modal = new Modal();
window.modal = modal; // Make it globally accessible
