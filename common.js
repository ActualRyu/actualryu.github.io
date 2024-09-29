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
// footer.js

// Create the footer element
const footer = document.createElement('footer');

// Set the inner HTML for the footer
footer.innerHTML = `
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
