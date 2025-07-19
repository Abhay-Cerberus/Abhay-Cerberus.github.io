// Skills data
const skillsData = {
    languages: [
        { name: 'Python', proficiency: 4 },
        { name: 'Java', proficiency: 3 },
        { name: 'C', proficiency: 2.5 },
        { name: 'HTML/CSS', proficiency: 2 }
    ],
    frameworks: [
        { name: 'NumPy', proficiency: 4 },
        { name: 'Pandas', proficiency: 4 },
        { name: 'Scikit-Learn', proficiency: 3.5 },
        { name: 'Pydantic-AI', proficiency: 3.5 },
        { name: 'Beautiful Soup', proficiency: 3.5 },
        { name: 'PyTorch', proficiency: 3 }
    ],
    tools: [
        { name: 'Git', proficiency: 4 },
        { name: 'Github', proficiency: 4.5 },
        { name: 'n8n', proficiency: 4 },
        { name: 'make.com', proficiency: 4 },
        { name: 'Github Actions', proficiency: 4 }
    ]
};

// Create skill card
function createSkillCard(skill) {
    const card = document.createElement('div');
    card.className = 'bento-card skill-card';
    
    card.innerHTML = `
        <h4 class="skill-name neon-text">${skill.name}</h4>
        <div class="proficiency-meter">
            <div class="proficiency-fill" style="width: 0%"></div>
        </div>
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
            
            // Animate proficiency meter after a delay
            setTimeout(() => {
                const fill = card.querySelector('.proficiency-fill');
                fill.style.width = `${(skill.proficiency / 5) * 100}%`;
            }, 300);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSkills);
