const items = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

function updateCarousel(index) {
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
        indicators[i].classList.toggle('active', i === index);
    });
}

function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel(currentIndex);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel(currentIndex);
}

// Event listeners
nextButton.addEventListener('click', showNext);
prevButton.addEventListener('click', showPrev);

indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel(currentIndex);
    });
});

// Auto-slide every 5 seconds
setInterval(showNext, 5000);