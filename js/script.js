// ----
// MAIN
// ----

// CAROUSEL 
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    // Responsive breakpoints
    breakpoints: {
      0: {
        slidesPerView: 1,   // mobile: 1 slide
      },
      768: {
        slidesPerView: 2,   // tablet: 2 slides
      },
      1024: {
        slidesPerView: 2,   // desktop: minimum 2 slides
      },
      1440: {
        slidesPerView: 3,   // large desktop: 3 slides if you want
      }
    }
  });
});


// TAB BAR
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

