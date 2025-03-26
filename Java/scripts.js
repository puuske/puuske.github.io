// Smooth scroll handled by CSS (scroll-behavior: smooth)

// Scroll animations using IntersectionObserver
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("project-modal");
  const openBtns = document.querySelectorAll(".learn-more");
  const closeBtn = document.querySelector(".close-button");
  const trailer = document.querySelector(".project-trailer"); // ← add this line

  if (modal) {
    openBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        if (trailer) {
          trailer.pause();
          trailer.currentTime = 0;
        }
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        if (trailer) {
          trailer.pause();
          trailer.currentTime = 0;
        }
      }
    });
  }
});
