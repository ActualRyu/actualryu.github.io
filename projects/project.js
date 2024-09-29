const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const totalImages = images.length;

// Function to show the image at the current index
function showImage(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
}

// Function to go to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
}

// Function to go to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex);
}

// Auto-scroll functionality
setInterval(nextImage, 5000); 

// Event listeners for buttons
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Initial display
showImage(currentIndex);
