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

// Duplicate all cards once to create seamless loop
track.innerHTML += track.innerHTML;
const allCards = Array.from(track.children);

function updateCarousel(animate = true) {
    track.style.transition = animate ? "transform 0.5s ease" : "none";
    track.style.transform = `translateX(${-cardWidth * index}px)`;
}

// Initial position
updateCarousel(false);

// Touch events
track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    track.style.transition = "none";
});

track.addEventListener("touchmove", e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    track.style.transform = `translateX(${diff - cardWidth * index}px)`;
});

track.addEventListener("touchend", () => {
    if (!isDragging) return;
    const diff = currentX - startX;

    if (diff > 50) index--; // swipe right
    else if (diff < -50) index++; // swipe left

    updateCarousel(true);

    track.addEventListener("transitionend", () => {
        // Seamless reset when passing halfway
        if (index < 0) {
            index = cards.length - 1;
            updateCarousel(false);
        }
        if (index >= allCards.length / 2) {
            index = 0;
            updateCarousel(false);
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

// -----------------
// NAVIGATION BUTTON
// -----------------
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // reset all tabs
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // reset all content
        contents.forEach(c => c.classList.remove("active"));
        document.getElementById(tab.dataset.target).classList.add("active");
    });
});
