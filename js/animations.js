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

// Calculate number of debris based on screen size
function calculateDebrisCount() {
    const area = window.innerWidth * window.innerHeight;
    return Math.floor(area / 50000); // Adjust divisor to control density
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
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.rotationSpeed;

        // Reset if out of bounds
        if (this.x < -50 || this.x > canvas.width + 50 ||
            this.y < -50 || this.y > canvas.height + 50) {
            this.reset();
        }
    }

    drawPolygon() {
        ctx.strokeStyle = `rgba(255, 0, 85, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let i = 0; i <= this.points; i++) {
            const angle = (i / this.points) * Math.PI * 2 + this.angle;
            const x = this.x + Math.cos(angle) * this.size;
            const y = this.y + Math.sin(angle) * this.size;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    drawLines() {
        ctx.strokeStyle = `rgba(255, 0, 85, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();

        const startX = this.x - this.size / 2;
        const endX = this.x + this.size / 2;
        
        for (let i = 0; i < 3; i++) {
            const y = this.y + (i - 1) * 10;
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
        }

        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    drawCircuit() {
        ctx.strokeStyle = `rgba(255, 0, 85, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();

        // Draw main circuit line
        ctx.moveTo(this.x - this.size/2, this.y);
        ctx.lineTo(this.x + this.size/2, this.y);

        // Draw connecting nodes
        for (let i = -2; i <= 2; i++) {
            const x = this.x + (i * this.size/4);
            ctx.moveTo(x, this.y);
            ctx.lineTo(x, this.y + (Math.random() > 0.5 ? 10 : -10));
        }

        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
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

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    debrisList.forEach(debris => {
        debris.update();
        debris.draw();
    });
    requestAnimationFrame(animate);
}

// Start animation
animate();

// Add scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section title
                anime({
                    targets: entry.target.querySelector('h2'),
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    easing: 'easeOutElastic(1, .8)'
                });

                // Animate section content
                anime({
                    targets: entry.target.querySelector('.glass-panel, .bento-grid, .skills-container'),
                    opacity: [0, 1],
                    translateY: [30, 0],
                    delay: 200,
                    duration: 800,
                    easing: 'easeOutElastic(1, .8)'
                });
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
});

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    const newDebrisCount = calculateDebrisCount();
    if (newDebrisCount !== debrisList.length) {
        debrisList = Array.from({ length: newDebrisCount }, () => new Debris());
    }
});

// Add hover animations to neon text
document.querySelectorAll('.neon-text').forEach(element => {
    element.addEventListener('mouseenter', () => {
        anime({
            targets: element,
            textShadow: [
                { value: '0 0 5px #00fff2, 0 0 10px #00fff2, 0 0 20px #00fff2', duration: 0 },
                { value: '0 0 5px #ff0055, 0 0 10px #ff0055, 0 0 20px #ff0055', duration: 500 }
            ],
            scale: 1.05,
            duration: 300,
            easing: 'easeOutElastic(1, .8)'
        });
    });

    element.addEventListener('mouseleave', () => {
        anime({
            targets: element,
            textShadow: [
                { value: '0 0 5px #ff0055, 0 0 10px #ff0055, 0 0 20px #ff0055', duration: 0 },
                { value: '0 0 5px #00fff2, 0 0 10px #00fff2, 0 0 20px #00fff2', duration: 500 }
            ],
            scale: 1,
            duration: 300,
            easing: 'easeOutElastic(1, .8)'
        });
    });
});
