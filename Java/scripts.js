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

/* Pop-up Projects */
document.addEventListener("DOMContentLoaded", () => {
  const openBtns = document.querySelectorAll(".learn-more");
  const modals = document.querySelectorAll(".modal");
  const closeBtns = document.querySelectorAll(".close-button");

  // Open modal with animation
  openBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
        setTimeout(() => {
          modal.classList.add("show");
        }, 10);
      }
    });
  });

  // Close modal with animation
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove("show");
        setTimeout(() => {
          modal.style.display = "none";

          const video = modal.querySelector("video");
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        }, 200);
      }
    });
  });

  // Close modal on outside click
  window.addEventListener("click", (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => {
          modal.style.display = "none";

          const video = modal.querySelector("video");
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        }, 200);
      }
    });
  });

  // Automatically open modal if ?project= is in the URL
  const params = new URLSearchParams(window.location.search);
  const project = params.get("project");

  if (project) {
    let modalId = null;
    switch (project.toLowerCase()) {
      case "c2v":
        modalId = "project-modal";
        break;
      case "escape":
        modalId = "escape-modal";
        break;
      case "echo":
        modalId = "echo-modal";
        break;
    }

    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
        setTimeout(() => {
          modal.classList.add("show");
        }, 10);
      }
    }

    // Remove query param from URL
    if (history.replaceState) {
      const newUrl = window.location.origin + window.location.pathname;
      history.replaceState({}, document.title, newUrl);
    }
  }
});
