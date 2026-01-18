// CAROUSEL
const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);

let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

// Clone first and last for seamless loop
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, cards[0]);

function updateCarousel() {
    const cardWidth = cards[0].getBoundingClientRect().width + 32; // width + gap
    track.style.transform = `translateX(${-cardWidth * (index + 1)}px)`;

    track.querySelectorAll('.carousel-card').forEach((card, i) => {
        card.classList.toggle('active', i === index + 1);
    });
}

updateCarousel();

// Touch events
track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
});

track.addEventListener('touchend', () => {
    if (!isDragging) return;
    const diff = currentX - startX;
    if (diff > 50) index--; // swipe right
    else if (diff < -50) index++; // swipe left

    // Loop logic
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;

    updateCarousel();
    isDragging = false;
});

// THEME BUTTON
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    // Switch icon
    if (document.body.classList.contains('dark')) {
        toggleBtn.classList.remove('fa-moon');
        toggleBtn.classList.add('fa-sun');
    } else {
        toggleBtn.classList.remove('fa-sun');
        toggleBtn.classList.add('fa-moon');
    }
});
