// COSDI Racing — minimal interactions

// fake visitor counter that ticks up slowly
const vc = document.getElementById("vcount");
if (vc) {
  let n = 42 + Math.floor(Math.random() * 300);
  const pad = (x) => String(x).padStart(7, "0");
  vc.textContent = pad(n);
  setInterval(() => {
    if (Math.random() < 0.4) {
      n += 1 + Math.floor(Math.random() * 3);
      vc.textContent = pad(n);
    }
  }, 1800);
}

// smooth scroll for in-page nav
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});
