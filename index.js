// Project data
const projects = [
    { title: "YouKan", description: "YouKan is a lightweight Kanban app that replaces your Chrome new tab page. It features a simple interface for task organization—nothing more, nothing less.", link: "youkan.html" },
    { title: "Reflections", description: "Reflections is a wallpaper app offering a stunning collection of beautiful wallpapers to elevate your device's look. Browse and discover images that reflect your unique style effortlessly! Reflections currently have8 wallpapers.", link: "youkan.html" }
    // Add more projects as needed
];

// Function to create project cards
function createProjectCards() {
    const projectsContainer = document.querySelector('.projects');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" class="project-link" aria-label="View ${project.title}"></a>
        `;
        projectsContainer.appendChild(projectCard);
    });
}

// Call the function to create project cards
createProjectCards();


// Add click event listeners to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Prevent the click if it's on a child element that's not the link
        if (e.target.closest('.project-link')) return;
        
        // Find the link within this card and navigate to it
        const link = this.querySelector('.project-link');
        if (link) window.location.href = link.href;
    });
});
