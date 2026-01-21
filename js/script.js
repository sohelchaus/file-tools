// ------
// HEADER
// ------

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

// MENU OPTION
const menuBtn = document.querySelector('.menu-btn');
const menuOption = document.querySelector('.menu-option');

menuBtn.addEventListener('click', () => {
  menuOption.classList.toggle('open');
  menuBtn.classList.toggle('active');
});


// ----
// MAIN
// ----

// CAROUSEL
const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);

let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

const cardWidth = cards[0].getBoundingClientRect().width + 32;

track.innerHTML += track.innerHTML;
const allCards = Array.from(track.children);

function updateCarousel(animate = true) {
    track.style.transition = animate ? "transform 0.5s ease" : "none";
    track.style.transform = `translateX(${-cardWidth * index}px)`;
}

updateCarousel(false);

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

    if (diff > 50) index--;
    else if (diff < -50) index++;

    updateCarousel(true);

    track.addEventListener("transitionend", () => {
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

// NAVIGATION BUTTON
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

