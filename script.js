// tiny bits of chaos

// wordmark: random tilt per letter on load for a zine-y feel
document.querySelectorAll(".wordmark .w").forEach((el) => {
  const r = (Math.random() * 8 - 4).toFixed(1);
  el.style.transform = `rotate(${r}deg)`;
});

// rider hover glitch: temporarily swap initials with random symbols
const glitchChars = ["★","✦","⚡","◆","▲","●","✖","+"];
document.querySelectorAll(".rider").forEach((card) => {
  const face = card.querySelector(".rider-face span");
  const original = face.textContent;
  let t;
  card.addEventListener("mouseenter", () => {
    let i = 0;
    clearInterval(t);
    t = setInterval(() => {
      face.textContent = glitchChars[Math.floor(Math.random()*glitchChars.length)]
                        + glitchChars[Math.floor(Math.random()*glitchChars.length)];
      if (++i > 4) { clearInterval(t); face.textContent = original; }
    }, 60);
  });
  card.addEventListener("mouseleave", () => { clearInterval(t); face.textContent = original; });
});

// konami-ish: press G to toggle a punk color scheme
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "g") {
    document.body.classList.toggle("punk");
  }
});

// inject punk styles lazily
const style = document.createElement("style");
style.textContent = `
  body.punk{filter:hue-rotate(180deg) saturate(1.3)}
  body.punk .noise{opacity:.18}
`;
document.head.appendChild(style);

// smooth scroll for in-page nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({behavior:"smooth",block:"start"}); }
    }
  });
});
