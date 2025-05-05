document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".buttons-panel button");
  const contentArea = document.getElementById("crt-content");

  buttons.forEach(button => {
    const section = button.dataset.section;

    // Special logic for ESC button
    if (button.id === "esc-button") {
      button.addEventListener("click", () => {
        const escMessage = "Hold on,\nYou forgot to contact me!";
        contentArea.innerHTML = `<div class="typewriter-text" data-content="${escMessage}"></div>`;
        const newTypeTarget = document.querySelector('.typewriter-text');
        if (newTypeTarget) {
          typeText(newTypeTarget, escMessage);
        }
      });
    }

    // Normal content buttons
    else if (section) {
      button.addEventListener("click", () => {
        fetch(`${section}.html`)
          .then(res => res.text())
          .then(html => {
            const temp = document.createElement("div");
            temp.innerHTML = html;
            const mainContent = temp.querySelector("main") || temp.body || temp;
            const text = mainContent.innerText.trim();
            contentArea.innerHTML = `<div class="typewriter-text" data-content="${text}"></div>`;
            const newTypeTarget = document.querySelector('.typewriter-text');
            if (newTypeTarget) {
              typeText(newTypeTarget, text);
            }
          })
          .catch(err => {
            contentArea.innerHTML = `<p style="color:red;">Error loading content.</p>`;
            console.error(err);
          });
      });
    }
  });

  // On first load, start typing the welcome message
  const typeTarget = document.querySelector('.typewriter-text');
  if (typeTarget) {
    const fullText = typeTarget.dataset.content;
    typeText(typeTarget, fullText);
  }
});

function typeText(element, text, delay = 50) {
  element.innerHTML = '';
  let index = 0;

  function type() {
    if (index < text.length) {
      const char = text[index];
      element.innerHTML += char === '\n' ? '<br>' : char;
      index++;
      setTimeout(type, delay);
    }
  }

  type();
}