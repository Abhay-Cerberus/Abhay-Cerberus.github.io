// Initialize debris canvas
const canvas = document.getElementById('debris');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial resize
resizeCanvas();

// Resize on window change
window.addEventListener('resize', resizeCanvas);

// Calculate number of debris based on screen size with performance limits
function calculateDebrisCount() {
    const area = window.innerWidth * window.innerHeight;
    let baseCount = Math.floor(area / 200000); // Further reduced density
    
    // Reduce debris count for Firefox and Edge
    if (isFirefox || isEdge) {
        baseCount = Math.floor(baseCount * 0.6); // 40% fewer debris
    }
    
    return Math.min(baseCount, 8); // Reduced cap to 8 debris max
}

// Debris class with more complex shapes
class Debris {
    constructor() {
        this.reset();
        this.shapeType = Math.floor(Math.random() * 3); // 0: polygon, 1: lines, 2: circuit
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 40 + 20;
        this.points = Math.floor(Math.random() * 3) + 3; // 3-5 points
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.rotationSpeed;

        // Reset if out of bounds
        if (this.x < -30 || this.x > canvas.width + 30 ||
            this.y < -30 || this.y > canvas.height + 30) {
            this.reset();
        }
    }

    drawPolygon() {
        ctx.strokeStyle = `rgba(255, 0, 85, ${this.opacity})`;
        ctx.lineWidth = 1.5; // Reduced line width
        ctx.beginPath();

        for (let i = 0; i <= this.points; i++) {
            const angle = (i / this.points) * Math.PI * 2 + this.angle;
            const x = this.x + Math.cos(angle) * this.size;
            const y = this.y + Math.sin(angle) * this.size;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.closePath();
        
        // Disable expensive shadow blur for Firefox/Edge
        if (!isFirefox && !isEdge) {
            ctx.shadowColor = '#ff0055';
            ctx.shadowBlur = 5; // Reduced blur
        }
        ctx.stroke();
        if (!isFirefox && !isEdge) {
            ctx.shadowBlur = 0;
        }
    }

    drawLines() {
        ctx.strokeStyle = `rgba(255, 0, 85, ${this.opacity})`;
        ctx.lineWidth = 1.5; // Reduced line width
        ctx.beginPath();

        const startX = this.x - this.size / 2;
        const endX = this.x + this.size / 2;
        
        // Reduced number of lines for better performance
        for (let i = 0; i < 2; i++) {
            const y = this.y + (i - 0.5) * 8;
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
        }

        // Disable expensive shadow blur for Firefox/Edge
        if (!isFirefox && !isEdge) {
            ctx.shadowColor = '#ff0055';
            ctx.shadowBlur = 5; // Reduced blur
        }
        ctx.stroke();
        if (!isFirefox && !isEdge) {
            ctx.shadowBlur = 0;
        }
    }

    drawCircuit() {
        ctx.strokeStyle = `rgba(255, 0, 85, ${this.opacity})`;
        ctx.lineWidth = 1.5; // Reduced line width
        ctx.beginPath();

        // Draw main circuit line
        ctx.moveTo(this.x - this.size/2, this.y);
        ctx.lineTo(this.x + this.size/2, this.y);

        // Reduced connecting nodes for better performance
        for (let i = -1; i <= 1; i++) {
            const x = this.x + (i * this.size/3);
            ctx.moveTo(x, this.y);
            ctx.lineTo(x, this.y + (i % 2 === 0 ? 8 : -8));
        }

        // Disable expensive shadow blur for Firefox/Edge
        if (!isFirefox && !isEdge) {
            ctx.shadowColor = '#ff0055';
            ctx.shadowBlur = 5; // Reduced blur
        }
        ctx.stroke();
        if (!isFirefox && !isEdge) {
            ctx.shadowBlur = 0;
        }
    }

    draw() {
        switch(this.shapeType) {
            case 0:
                this.drawPolygon();
                break;
            case 1:
                this.drawLines();
                break;
            case 2:
                this.drawCircuit();
                break;
        }
    }
}

// Create debris based on screen size
let debrisList = Array.from({ length: calculateDebrisCount() }, () => new Debris());

// Performance monitoring and frame rate control
let lastFrameTime = 0;
const targetFPS = 20; // Reduced for Edge/Firefox compatibility
const frameInterval = 1000 / targetFPS;
let isTabVisible = true;
let animationId;

// Browser detection for performance optimization
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const isEdge = navigator.userAgent.toLowerCase().indexOf('edge') > -1 || navigator.userAgent.toLowerCase().indexOf('edg/') > -1;

// Visibility API to pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
    if (!isTabVisible && animationId) {
        cancelAnimationFrame(animationId);
    } else if (isTabVisible) {
        animationId = requestAnimationFrame(animate);
    }
});

// Optimized animation loop with frame rate control
function animate(currentTime) {
    if (!isTabVisible) {
        return;
    }
    
    if (currentTime - lastFrameTime >= frameInterval) {
        // Use more efficient clearing for Firefox/Edge
        if (isFirefox || isEdge) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        debrisList.forEach(debris => {
            debris.update();
            debris.draw();
        });
        lastFrameTime = currentTime;
    }
    
    animationId = requestAnimationFrame(animate);
}

// Start animation
animationId = requestAnimationFrame(animate);

// Add enhanced scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section title with subtle bounce
                anime({
                    targets: entry.target.querySelector('h2'),
                    opacity: [0, 1],
                    translateY: [15, 0],
                    duration: 600,
                    easing: 'easeOutCubic'
                });

                // Animate section content with staggered cards
                const cards = entry.target.querySelectorAll('.bento-card');
                if (cards.length > 0) {
                    anime({
                        targets: cards,
                        opacity: [0, 1],
                        translateY: [25, 0],
                        delay: anime.stagger(80, {start: 200}),
                        duration: 500,
                        easing: 'easeOutCubic'
                    });
                } else {
                    // For non-card content
                    anime({
                        targets: entry.target.querySelector('.glass-panel, .skills-container, .about-content'),
                        opacity: [0, 1],
                        translateY: [20, 0],
                        delay: 150,
                        duration: 500,
                        easing: 'easeOutCubic'
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
    
    // Add subtle page load animation
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutCubic'
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    const newDebrisCount = calculateDebrisCount();
    if (newDebrisCount !== debrisList.length) {
        debrisList = Array.from({ length: newDebrisCount }, () => new Debris());
    }
});

// Add subtle hover animations to neon text
document.querySelectorAll('.neon-text').forEach(element => {
    element.addEventListener('mouseenter', () => {
        anime({
            targets: element,
            textShadow: [
                { value: '0 0 5px #00fff2, 0 0 10px #00fff2, 0 0 20px #00fff2', duration: 0 },
                { value: '0 0 8px #ff0055, 0 0 15px #ff0055, 0 0 25px #ff0055', duration: 400 }
            ],
            scale: 1.02,
            duration: 250,
            easing: 'easeOutCubic'
        });
    });

    element.addEventListener('mouseleave', () => {
        anime({
            targets: element,
            textShadow: [
                { value: '0 0 8px #ff0055, 0 0 15px #ff0055, 0 0 25px #ff0055', duration: 0 },
                { value: '0 0 5px #00fff2, 0 0 10px #00fff2, 0 0 20px #00fff2', duration: 400 }
            ],
            scale: 1,
            duration: 250,
            easing: 'easeOutCubic'
        });
    });
});

// Add form input animations
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.neon-input');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            anime({
                targets: input,
                borderColor: '#ff0055',
                boxShadow: '0 0 15px rgba(255, 0, 85, 0.3)',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        input.addEventListener('blur', () => {
            anime({
                targets: input,
                borderColor: '#00e6e6',
                boxShadow: '0 0 10px rgba(0, 230, 230, 0.2)',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
    
    // Add button hover animations
    const buttons = document.querySelectorAll('.neon-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                boxShadow: '0 0 20px rgba(255, 0, 85, 0.4)',
                duration: 200,
                easing: 'easeOutCubic'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                boxShadow: '0 0 10px rgba(0, 230, 230, 0.2)',
                duration: 200,
                easing: 'easeOutCubic'
            });
        });
        
        button.addEventListener('click', () => {
            anime({
                targets: button,
                scale: [1.05, 0.98, 1.05],
                duration: 150,
                easing: 'easeOutCubic'
            });
        });
    });
});

// Add navigation link animations
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Smooth scroll animation for internal links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    anime({
                        targets: 'html, body',
                        scrollTop: targetElement.offsetTop - 80,
                        duration: 800,
                        easing: 'easeInOutCubic'
                    });
                }
            }
        });
    });
});

// Add subtle card interaction animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.bento-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -3,
                duration: 200,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                duration: 200,
                easing: 'easeOutCubic'
            });
        });
    });
});
