// Skills data - Simplified without proficiency levels
const skillsData = {
    languages: [
        { name: 'Python' },
        { name: 'Java' },
        { name: 'C' },
        { name: 'HTML/CSS' }
    ],
    frameworks: [
        { name: 'NumPy' },
        { name: 'Pandas' },
        { name: 'Scikit-Learn' },
        { name: 'Pydantic-AI' },
        { name: 'Beautiful Soup' },
        { name: 'PyTorch' }
    ],
    tools: [
        { name: 'Git' },
        { name: 'Github' },
        { name: 'n8n' },
        { name: 'make.com' },
        { name: 'Github Actions' }
    ]
};

// Create skill card - Simplified without skill bars
function createSkillCard(skill) {
    const card = document.createElement('div');
    card.className = 'bento-card skill-card';
    
    card.innerHTML = `
        <h4 class="skill-name neon-text">${skill.name}</h4>
    `;
    
    return card;
}

// Initialize skills section
function initializeSkills() {
    // Get all skill category containers
    const containers = {
        languages: document.querySelector('#skills .skill-category:nth-child(1) .bento-grid'),
        frameworks: document.querySelector('#skills .skill-category:nth-child(2) .bento-grid'),
        tools: document.querySelector('#skills .skill-category:nth-child(3) .bento-grid')
    };
    
    // Populate each category
    Object.entries(skillsData).forEach(([category, skills]) => {
        const container = containers[category];
        if (!container) return;
        
        skills.forEach(skill => {
            const card = createSkillCard(skill);
            container.appendChild(card);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSkills);
