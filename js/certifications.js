// Certifications data
const certificationsData = [
    {
        title: 'Game Design Foundations',
        issuer: 'LinkedIn Learning',
        date: 'Jan 2024',
        thumbnail: 'assets/Certificate/Game_Design_Foundations.jpg',
        link: 'https://www.github.com/Abhay-Cerberus/Abhay-Cerberus.github.io/assets/Certificate/Game_Design_Foundations.pdf',
        description: 'Game Design Foundations: Ideas, Core Loops, and Goals'
    },
    {
        title: 'Industrial Communication Protocols & Connectivity',
        issuer: 'DYSMECH COMPETENCY SERVICES',
        date: 'May 2023',
        thumbnail: 'assets/Certificate/DCS.jpg',
        link: 'https://www.github.com/Abhay-Cerberus/Abhay-Cerberus.github.io/assets/Certificate/DCS.pdf',
        description: 'Project based training program on "Industrial Communication Protocols & Connectivity"'
    }
];

// Create certification card
function createCertificationCard(cert) {
    const card = document.createElement('div');
    card.className = 'bento-card cert-card';
    
    card.innerHTML = `
        <img src="${cert.thumbnail}" alt="${cert.title}" class="cert-thumbnail">
        <div class="cert-info">
            <h3 class="neon-text">${cert.title}</h3>
            <p class="neon-text">${cert.issuer} - ${cert.date}</p>
            <p class="neon-text">${cert.description}</p>
            <a href="${cert.link}" class="neon-text" target="_blank">View Certificate</a>
        </div>
    `;
    
    return card;
}

// Initialize certifications section
function initializeCertifications() {
    const container = document.querySelector('#certifications .bento-grid');
    if (!container) return;
    
    certificationsData.forEach(cert => {
        const card = createCertificationCard(cert);
        container.appendChild(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCertifications);
