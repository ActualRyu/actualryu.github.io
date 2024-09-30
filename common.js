// Mobile navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle navigation
    nav.classList.toggle('nav-active');

    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger animation
    burger.classList.toggle('toggle');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// FAQ Accordion
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
                header.classList.toggle('active');
        content.classList.toggle('active');

        // Animate accordion content
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// Function to toggle theme
// Function to toggle theme
function toggleTheme() {
    const root = document.documentElement;
    const body = document.body;
    body.classList.add('theme-transition');
    root.classList.toggle('dark-mode');
    const isDarkMode = root.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    setTimeout(() => {
        body.classList.remove('theme-transition');
    }, 100);
}

// Function to set the initial theme
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    if (savedTheme === 'dark') {
        root.classList.add('dark-mode');
    } else {
        root.classList.remove('dark-mode');
    }
}

// Function to make an element draggable
function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    element.addEventListener('pointerdown', startDragging);

    function startDragging(e) {
        isDragging = true;
        if (e.type === 'pointerdown') {
            startX = e.clientX;
            startY = e.clientY;
        }
        initialX = element.offsetLeft;
        initialY = element.offsetTop;
        element.style.transition = 'none'; // Disable transition during dragging
        e.preventDefault();

        document.addEventListener('pointermove', drag);
        document.addEventListener('pointerup', stopDragging);
    }

    function drag(e) {
        if (!isDragging) return;
        let currentX = e.clientX;
        let currentY = e.clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        element.style.left = `${initialX + deltaX}px`;
        element.style.top = `${initialY + deltaY}px`;
    }

    function stopDragging() {
        if (!isDragging) return;
        isDragging = false;
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'; // Re-enable transition

        // Check for overlap with the logo
        const logo = document.querySelector('.logo');
        const logoRect = logo.getBoundingClientRect();
        const draggableRect = element.getBoundingClientRect();

        // Check if the draggable element overlaps with the logo
        const isOverlapping = (
            draggableRect.left < logoRect.right &&
            draggableRect.right > logoRect.left &&
            draggableRect.top < logoRect.bottom &&
            draggableRect.bottom > logoRect.top
        );

        if (isOverlapping) {
            // Snap back to original position and show the video
            snapBack(() => {
                openVideoPopup(); // Call to show the video popup
            });
        } else {
            // Just snap back to the original position
            snapBack();
        }

        document.removeEventListener('pointermove', drag);
        document.removeEventListener('pointerup', stopDragging);
    }

    function snapBack(callback) {
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
        element.style.left = `${initialX}px`;
        element.style.top = `${initialY}px`;
        setTimeout(() => {
            element.style.transition = '';
            if (callback) callback(); // Execute callback if provided
        }, 300);
    }
}


// Add event listener to the theme toggle button
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', (e) => {
        if (!e.target.classList.contains('dragged')) {
            toggleTheme();
        }
        e.target.classList.remove('dragged');
    });
    setInitialTheme();
    makeDraggable(themeToggle);

    // Ensure the button is positioned absolutely
    themeToggle.style.position = 'flex';
    // Set initial position (adjust as needed)
    themeToggle.style.right = '20px';
    themeToggle.style.bottom = '20px';
});
// footer.js

// Create the footer element
const footer = document.createElement('footer');

// Set the inner HTML for the footer
footer.innerHTML = `
<div id="theme-toggle" class="theme-toggle">
    <i class="fas fa-moon"></i>
    <i class="fas fa-sun"></i>
</div>
    <p>&copy; 2024 Ryu. All rights reserved.</p>
    <div class="social-icons">
        <a href="https://twitter.com/ActuallyRyu" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="https://twitter.com/ActuallyRyu" target="_blank"><i class="fab fa-linkedin"></i></a>
        <a href="https://github.com/ActualRyu" target="_blank"><i class="fab fa-github"></i></a>
        <a href="https://codepen.io/actualryu" target="_blank"><i class="fab fa-codepen"></i></a>
    </div>
`;

// Append the footer to the body of the document
document.body.appendChild(footer);

//Kitten
// Function to create and add video popup to the page
function createVideoPopup() {
    // Create the popup div
    const popupDiv = document.createElement('div');
    popupDiv.id = 'video-popup';
    popupDiv.className = 'video-popup';
    popupDiv.style.display = 'none';

    // Create the popup content
    popupDiv.innerHTML = `
        <div class="popup-content">
            <button class="close-popup" aria-label="Close Video Popup">&times;</button>
            <video id="popup-video" width="100%" height="auto" autoplay muted loop>
                <source src="https://actualryu.github.com/media/kitten.webm" type="video/webm"> <!-- Absolute path -->
                Your browser does not support the video tag.
            </video>
        </div>
    `;

    // Append the popup to the body
    document.body.appendChild(popupDiv);

    // Add event listener to close the popup
    const closeButton = popupDiv.querySelector('.close-popup');
    closeButton.addEventListener('click', () => {
        popupDiv.style.display = 'none'; // Hide the popup
    });

    // Function to open the popup
    window.openVideoPopup = function() {
        popupDiv.style.display = 'block'; // Show the popup
    };
}

// Call the function to create the popup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', createVideoPopup);
