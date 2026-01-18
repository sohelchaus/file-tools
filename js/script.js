// --------
// CAROUSEL
// --------
const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);

let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

const cardWidth = cards[0].getBoundingClientRect().width + 32; // width + gap

// Clone first and last
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, cards[0]);

let allCards = Array.from(track.children);

function updateCarousel(animate = true) {
    track.style.transition = animate ? "transform 0.5s ease" : "none";
    track.style.transform = `translateX(${-cardWidth * (index + 1)}px)`;

    allCards.forEach((card, i) => {
        card.classList.toggle("active", i === index + 1);
    });
}

// Initial position
updateCarousel(false);

// Touch events
track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

track.addEventListener("touchmove", e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
});

track.addEventListener("touchend", () => {
    if (!isDragging) return;
    const diff = currentX - startX;
    if (diff > 50) index--; // swipe right
    else if (diff < -50) index++; // swipe left

    updateCarousel(true);

    // Loop fix: wait for transition, then snap invisibly
    track.addEventListener("transitionend", () => {
        if (index === -1) {
            index = cards.length - 1; // jump to real last
            updateCarousel(false);    // no animation
        }
        if (index === cards.length) {
            index = 0; // jump to real first
            updateCarousel(false);    // no animation
        }
    }, { once: true });

    isDragging = false;
});



// ------------
// THEME BUTTON
// ------------
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
