// ========== GLOBAL ==========
const body = document.body;
const intro = document.getElementById("introSection");
const mainSection = document.getElementById("mainSection");
const enterBtn = document.getElementById("enterWorld");
const yearSpan = document.getElementById("yearSpan");
const spaceCanvas = document.getElementById("spaceCanvas");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ========== INTRO -> MAIN TRANSITION ==========
if (enterBtn && intro && mainSection) {
  let hasEntered = false;

  enterBtn.addEventListener("click", () => {
    if (hasEntered) return;
    hasEntered = true;

    body.classList.add("main-active");
    intro.classList.add("fade-out");

    mainSection.classList.remove("hidden");
    requestAnimationFrame(() => {
      mainSection.classList.add("active");
    });

    if (spaceCanvas) {
      spaceCanvas.style.transition = "opacity 0.6s ease";
      spaceCanvas.style.opacity = "0";

      setTimeout(() => {
        spaceCanvas.style.display = "none";
      }, 650);
    }

    setTimeout(() => {
      intro.classList.add("hidden");
    }, 500);
  });
}

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href").substring(1);
    const section = document.getElementById(targetId);
    if (section) {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ========== SPACE CANVAS (INTRO BACKGROUND) ==========
if (spaceCanvas) {
  const ctx = spaceCanvas.getContext("2d");

  function resizeCanvas() {
    spaceCanvas.width = window.innerWidth;
    spaceCanvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const stars = [];
  const STAR_COUNT = 170;

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * spaceCanvas.width,
        y: Math.random() * spaceCanvas.height,
        r: Math.random() * 1.7 + 0.3,
        speed: Math.random() * 0.35 + 0.1,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }
  }

  initStars();

  function drawScene() {
    const w = spaceCanvas.width;
    const h = spaceCanvas.height;

    const gradient = ctx.createRadialGradient(
      w / 2,
      h * 0.2,
      0,
      w / 2,
      h,
      Math.max(w, h)
    );
    gradient.addColorStop(0, "rgba(37, 99, 235, 0.7)");
    gradient.addColorStop(0.35, "rgba(76, 29, 149, 0.9)");
    gradient.addColorStop(0.8, "#020617");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    for (const s of stars) {
      ctx.beginPath();
      ctx.globalAlpha = s.alpha;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "#e5e7eb";
      ctx.fill();

      s.y += s.speed;
      if (s.y > h) {
        s.y = 0;
        s.x = Math.random() * w;
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(drawScene);
  }

  drawScene();
}
