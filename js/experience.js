// Experience data
const experienceData = [
    {
        title: 'Agentic AI Intern',
        company: 'Prodigal AI',
        period: 'Apr 2025 - Present',
        skills: ['Python', 'Pydantic-AI', 'APIs', 'Make.com', 'Github Actions'],
        details: `
            <p>Intern Team Lead of Agentic AI Framework Team</p>
            <ul>
                <li> Led CI/CD pipeline development; published public Python packages via pip and Poetry. </li>
                <li> Directed comparative research on AI agent frameworks; authored reports and blog posts with code samples. </li>
                <li> Oversaw integration testing for OpenAI, Gemini, Hugging Face, and FastAPI agent communication. </li>
                <li> Architected multi-agent systems with validation rules and orchestrator modules using Draw.io. </li>
                <li> Deployed automated blogging and SEO agents via make.com workflows. </li>
            </ul>
        `
    }
];

// Create experience card
function createExperienceCard(exp) {
    const card = document.createElement('div');
    card.className = 'bento-card experience-card';
    
    card.innerHTML = `
        <h3 class="neon-text">${exp.title}</h3>
        <p class="company neon-text">${exp.company}</p>
        <p class="period neon-text">${exp.period}</p>
    `;
    
    // Add click event to open modal with details
    card.addEventListener('click', () => {
        window.modal.open({
            title: `${exp.title} at ${exp.company}`,
            skills: exp.skills,
            details: exp.details
        });
    });
    
    return card;
}

// Initialize experience section
function initializeExperience() {
    const container = document.querySelector('#experience .bento-grid');
    if (!container) return;
    
    experienceData.forEach(exp => {
        const card = createExperienceCard(exp);
        container.appendChild(card);
        
        // Add hover animation using anime.js
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeExperience);
