// Projects data
const projectsData = [
    {
        title: 'Travel Planner Agent',
        description: 'An intelligent travel itinerary planner powered by LLMs (via Pydantic-AI), Amadeus APIs, Eventbrite APIs, and OpenStreetMap.',
        thumbnail: 'assets/AI-Agent.jpg',
        skills: ['Python', 'Pydantic-AI', 'APIs', 'OpenStreetMap'],
        link: 'projects/project1.html'
    },
    {
        title: 'Steam Game Data Scraping',
        description: 'Data Scraping project that collects and stores game data from Steam using Beautiful Soup and Pandas.',
        thumbnail: 'assets/Data-scraping.png',
        skills: ['Python', 'Beautiful Soup', 'Pandas', 'Requests'],
        link: 'projects/project2.html'
    },
    {
        title: 'Automated AI Blog Generator',
        description: 'Gaming news automation using make.com',
        thumbnail: 'assets/AI-Automation.png',
        skills: ['Make.com', 'APIs', 'Prompt Engineering'],
        link: 'projects/project3.html'
    },
    {
        title: 'Kalyan ML (KML)',
        description: 'Machine Learning Model Trained on Synthetic Data',
        thumbnail: 'assets/AI-Automation.png',
        skills: ['Python', 'NumPy', 'Scikit-Learn', 'Pandas', 'Matplotlib', 'Seaborn'],
        link: 'projects/project4.html'
    },
    {
        title: 'Get Latest Game Prices',
        description: 'Data Scraper for getting latest game prices from gg.deals',
        thumbnail: 'assets/AI-Automation.png',
        skills: ['Python', 'Beautiful Soup', 'Requests'],
        link: 'projects/project5.html'
    },
    {
        title: 'Notes Keeper',
        description: 'Extension for making notes and saving them in a text file automatically',
        thumbnail: 'assets/AI-Automation.png',
        skills: ['HTML', 'CSS', 'JavaScript'],
        link: 'projects/project6.html'
    }
];

// Create project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'bento-card project-card';
    
    card.innerHTML = `
        <h3 class="neon-text">${project.title}</h3>
        <p class="neon-text">${project.description}</p>
        <div class="project-skills">
            ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
    `;
    
    // Add click event to open project page
    card.addEventListener('click', () => {
        window.location.href = project.link;
    });
    
    return card;
}

// Initialize projects section
function initializeProjects() {
    const container = document.querySelector('#projects .bento-grid');
    if (!container) return;
    
    projectsData.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjects);
