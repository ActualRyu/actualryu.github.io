// Blog post data
const blogs = [
    {
        title: "YouKan - A Minimalist Kanban App - Launched",
        description: "YouKan is a lightweight Kanban app that replaces your Chrome new tab page. It features a simple interface for task organization—nothing more, nothing less.",
        image: "../projects/youkan/ss3.png",
        link: "posts/sept302024.html",
        publishedDate: "September 30, 2024"
    }
];

// Populate blog posts
const blogList = document.getElementById('blog-list');

blogs.forEach(blog => {
    const blogCard = document.createElement('div');
    blogCard.classList.add('project-card'); // Reusing the same project card styles

    blogCard.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}">
        <div class="project-info">
            <h3>${blog.title}</h3>
            <p>${blog.description}</p>
            <p class="published-date">Published: ${blog.publishedDate}</p>
        </div>
    `;

    // Make the entire card clickable
    blogCard.addEventListener('click', () => {
        window.location.href = blog.link;
    });

    blogList.appendChild(blogCard);
});
const postsPerPage = 6;
let currentPage = 1;

// Function to render blog posts
function renderBlogs(page) {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = ''; // Clear previous posts

    // Calculate the starting and ending indices of the posts to display
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, blogs.length);

    // Create blog cards
    for (let i = startIndex; i < endIndex; i++) {
        const blog = blogs[i];
        const blogCard = document.createElement('div');
        blogCard.classList.add('project-card');

        blogCard.innerHTML = `
            ${blog.image ? `<img src="${blog.image}" alt="${blog.title}">` : ''}
            <div class="project-info">
                <h3>${blog.title}</h3>
                <p>${blog.description}</p>
                <p class="published-date">Published: ${blog.publishedDate}</p>
            </div>
        `;

        blogCard.addEventListener('click', () => {
            window.location.href = blog.link;
        });

        blogList.appendChild(blogCard);
    }

    renderPagination(page);
}

// Function to render pagination buttons
// Function to render pagination buttons
function renderPagination(page) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Clear previous pagination

    const totalPages = Math.ceil(blogs.length / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button');
        button.disabled = (i === page); // Disable the current page button

        button.addEventListener('click', () => {
            currentPage = i;
            renderBlogs(currentPage);
            
            // Scroll to the top of the blogs section
            document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
        });

        pagination.appendChild(button);
    }
}


// Initial render
renderBlogs(currentPage);
