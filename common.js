// Immediately set the theme based on stored value
(function () {
    const storedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');

    // Apply the stored theme immediately
    if (storedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    } else {
        body.classList.remove('dark-mode');
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
})();

// Check stored theme on page load (optional, as it's already done above)
window.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');

    // This part is now redundant since we're already setting the theme above
    // But if you want to ensure icon status is correct on load, you can keep it:
    if (body.classList.contains('dark-mode')) {
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    } else {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
});

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    
    body.classList.toggle('dark-mode');
    themeToggle.classList.toggle('fa-moon');
    themeToggle.classList.toggle('fa-sun');

    // Save the current theme to localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Add event listener to theme toggle button
document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

// Accordion functionality
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
        // Close all other accordion items
        accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            }
        });

        // Toggle the clicked accordion item
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1); // Get the target ID
        const targetSection = document.getElementById(targetId); // Find the target section

        // If the target is a section, perform smooth scroll
        if (targetSection) {
            e.preventDefault(); // Prevent default anchor behavior
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('.sticky-header').offsetHeight,
                behavior: 'smooth'
            });
        } else {
            // If it's not a section (like the Go Back link), allow the default action
            // Optionally, you can add other handling here if needed
        }
    });
});
// Create the footer element
const footerHTML = `

<footer>
    <div class="container">
        <p>&copy; 2024 Ryu. All rights reserved.</p>
        <div class="social-links">
            <a href="https://github.com/ActualRyu" aria-label="GitHub"><i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/kaungsitnaing/" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
             <a href="https://codepen.io/actualryu" aria-label="Codepen"><i class="fab fa-codepen"></i></a>
             <a href="https://twitter.com/ActuallyRyu" aria-label="X"><i class="fab fa-x-twitter"></i></a>
        </div>
    </div>
</footer>
`;

// Footer for my lazy ass
function insertFooter() {
    console.log("Inserting footer..."); // Add this line for debugging
    const footerDiv = document.createElement('div');
    footerDiv.innerHTML = footerHTML;
    document.body.appendChild(footerDiv);
}


// Call the function to insert the footer
insertFooter();
