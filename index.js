// Project data
const projects = [
    {
        title: "YouKan",
        description: "YouKan is a lightweight Kanban app that replaces your Chrome new tab page. It features a simple interface for task organization—nothing more, nothing less.",
        image: "projects/youkan/ss3.png",
        link: "projects/youkan.html"
    },
    {
        title: "Reflections",
        description: "A proof of concept for a wallpaper web app that fetches and displays wallpapers beautifully. ",
        image: "projects/non/reflections.png",
        link: "projects/reflections.html"
    }

];

// Populate projects
const projectList = document.getElementById('project-list');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" class="project-link">View Project</a>
        </div>
    `;
    projectList.appendChild(projectCard);
});
