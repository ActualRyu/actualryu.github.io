let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const altText = document.getElementById('altText');
let autoScrollInterval;

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0; // Loop to the first slide
    } else if (index < 0) {
        currentSlide = slides.length - 1; // Loop to the last slide
    } else {
        currentSlide = index;
    }

    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    altText.innerText = slides[currentSlide].querySelector('img').alt;
}

// Change slide function for buttons
function changeSlide(n) {
    showSlide(currentSlide + n);
}

// Initialize auto scroll
function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        changeSlide(1); // Move to the next slide
    }, 3000); // Change slide every 3 seconds
}

// Stop auto scroll
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Click to zoom
slides.forEach(slide => {
    const img = slide.querySelector('img');
    img.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click events from bubbling up to buttons
        openZoom(img.src, img.alt);
    });
});

// Open zoom functionality
function openZoom(src, alt) {
    const zoomOverlay = document.createElement('div');
    zoomOverlay.classList.add('zoom-overlay');
    zoomOverlay.innerHTML = `<img src="${src}" alt="${alt}" class="zoomed-img" />`;
    
    // Append the overlay and trigger the show class for animations
    document.body.appendChild(zoomOverlay);
    requestAnimationFrame(() => {
        zoomOverlay.classList.add('show'); // Add show class for animation
    });

    // Close the zoom on click outside
    zoomOverlay.addEventListener('click', () => {
        zoomOverlay.classList.remove('show'); // Trigger fade out
        setTimeout(() => {
            zoomOverlay.remove(); // Remove after animation
        }, 300); // Match duration of fade out
    });
}


// Start the slideshow and auto scroll
showSlide(currentSlide);
startAutoScroll();

// Pause auto scroll on hover
document.querySelector('.slideshow-container').addEventListener('mouseenter', stopAutoScroll);
document.querySelector('.slideshow-container').addEventListener('mouseleave', startAutoScroll);
