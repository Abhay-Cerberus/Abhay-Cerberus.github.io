// SVG Namespace
const svgNS = "http://www.w3.org/2000/svg";

// Create SVG container
const svg = document.createElementNS(svgNS, "svg");
svg.setAttribute("width", "100%");
svg.setAttribute("height", "100%");
svg.style.position = "fixed";
svg.style.top = "0";
svg.style.left = "0";
svg.style.zIndex = "1";
svg.style.pointerEvents = "none";

document.body.insertBefore(svg, document.body.firstChild);

// Generate random path data
function generatePath() {
    const points = [];
    const numPoints = Math.floor(Math.random() * 4) + 3; // 3-6 points for more variety
    const size = Math.random() * 60 + 10; // Increased size range from 10-70
    
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const variation = (Math.random() - 0.5) * 20; // Add some randomness to shape
        const x = Math.cos(angle) * (size + variation);
        const y = Math.sin(angle) * (size + variation);
        points.push(`${x},${y}`);
    }
    
    return `M${points.join('L')}Z`;
}

// Create debris SVG elements
function createDebris() {
    const debris = document.createElementNS(svgNS, "path");
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    debris.setAttribute("d", generatePath());
    debris.setAttribute("fill", "none");
    // Randomly choose between neon red and blue
    const color = Math.random() > 0.5 ? "#ff0055" : "#00fff2";
    debris.setAttribute("stroke", color);
    debris.setAttribute("stroke-width", Math.random() * 2 + 1.5); // Variable thickness 1.5-3.5
    debris.style.filter = `drop-shadow(0 0 8px ${color})`; // Matching glow color
    debris.style.opacity = Math.random() * 0.6 + 0.4; // Increased base opacity
    
    // Set initial transform
    debris.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
    
    return debris;
}

// Animation settings
const debrisCount = 75; // Reduced from 150
const minAnimationDuration = 6000; // Doubled from 3000
const maxAnimationDuration = 16000; // Doubled from 8000

// Create and animate debris
function animateDebris() {
    const debris = createDebris();
    svg.appendChild(debris);
    
    // Random movement pattern
    const timeline = anime.timeline({
        targets: debris,
        easing: 'easeInOutSine',
        complete: () => {
            svg.removeChild(debris);
            animateDebris(); // Create new debris when this one is done
        }
    });
    
    // Initial pause for staggered start
    timeline.add({
        duration: Math.random() * 2000
    });
    
    // Complex movement pattern
    const duration = Math.random() * (maxAnimationDuration - minAnimationDuration) + minAnimationDuration;
    const moveX = (Math.random() - 0.5) * window.innerWidth * 1.5;
    const moveY = (Math.random() - 0.5) * window.innerHeight * 1.5;
    
    timeline.add({
        translateX: `+=${moveX}`,
        translateY: `+=${moveY}`,
        rotate: anime.random(-720, 720),
        scale: [1, Math.random() * 0.5 + 0.5],
        opacity: 0,
        duration: duration
    });
}

// Initialize debris
for (let i = 0; i < debrisCount; i++) {
    setTimeout(() => {
        animateDebris();
    }, Math.random() * 2000); // Stagger initial creation
}

// Initialize animation
let debrisElements = initDebris();

// Handle window resize
window.addEventListener('resize', () => {
    // Remove existing debris
    debrisElements.forEach(debris => svg.removeChild(debris));
    
    // Create new debris
    debrisElements = initDebris();
});

// Add scroll animations with enhanced effects
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section title with morphing
                anime({
                    targets: entry.target.querySelector('h2'),
                    opacity: [0, 1],
                    translateY: [20, 0],
                    scale: [0.9, 1],
                    duration: 1000,
                    easing: 'cubicBezier(0.4, 0.0, 0.2, 1)'
                });

                // Animate section content with stagger
                anime({
                    targets: entry.target.querySelectorAll('.glass-panel, .bento-grid, .skills-container'),
                    opacity: [0, 1],
                    translateY: [30, 0],
                    scale: [0.95, 1],
                    delay: anime.stagger(100),
                    duration: 800,
                    easing: 'cubicBezier(0.4, 0.0, 0.2, 1)'
                });
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
});

// Enhanced neon text effect
document.querySelectorAll('.neon-text').forEach(element => {
    // Add data-text attribute for glow effect
    element.setAttribute('data-text', element.textContent);
    
    element.addEventListener('mouseenter', () => {
        anime({
            targets: element,
            textShadow: [
                { 
                    value: '0 0 5px #00fff2, 0 0 10px #00fff2, 0 0 20px #00fff2',
                    duration: 0 
                },
                { 
                    value: '0 0 5px #ff0055, 0 0 10px #ff0055, 0 0 20px #ff0055',
                    duration: 500 
                }
            ],
            scale: {
                value: 1.05,
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            },
            complete: (anim) => {
                element.style.filter = 'url(#neon-glow)';
            }
        });
    });

    element.addEventListener('mouseleave', () => {
        anime({
            targets: element,
            textShadow: [
                { 
                    value: '0 0 5px #ff0055, 0 0 10px #ff0055, 0 0 20px #ff0055',
                    duration: 0 
                },
                { 
                    value: '0 0 5px #00fff2, 0 0 10px #00fff2, 0 0 20px #00fff2',
                    duration: 500 
                }
            ],
            scale: {
                value: 1,
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            },
            complete: (anim) => {
                element.style.filter = 'none';
            }
        });
    });
});
