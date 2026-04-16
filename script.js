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

// === WEIRD PASS 2 ===

// custom cursor follower (desktop only)
const cursor = document.getElementById("cursor");
const dot = document.getElementById("cursorDot");
if (cursor && matchMedia("(pointer:fine)").matches) {
  let x = -100, y = -100, dx = -100, dy = -100;
  document.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
  // instant dot, lagging ring for parallax
  const tick = () => {
    dx += (x - dx) * 0.18;
    dy += (y - dy) * 0.18;
    cursor.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  };
  tick();
  // grow on interactive elements
  document.querySelectorAll("a, button, .rider, .partner, .pill, .sticker").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("big"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
  });
}

// click anywhere to spawn a falling lightning bolt
document.addEventListener("click", (e) => {
  // skip clicks inside inputs
  if (e.target.closest("input,textarea,button")) return;
  const bolt = document.createElement("div");
  bolt.className = "spawn-bolt";
  bolt.innerHTML = `<svg viewBox="0 0 40 80" width="28" height="56"><path d="M22 0 L0 48 L14 48 L8 80 L40 28 L24 28 Z" fill="currentColor"/></svg>`;
  bolt.style.left = e.clientX + "px";
  bolt.style.top = e.clientY + "px";
  const colors = ["var(--orange)","var(--pink)","var(--acid)","var(--teal-bright)"];
  bolt.style.color = colors[Math.floor(Math.random()*colors.length)];
  document.body.appendChild(bolt);
  setTimeout(() => bolt.remove(), 1300);
});

// stickers: random small rotation on load for extra chaos
document.querySelectorAll(".sticker:not(.wobble)").forEach(s => {
  const r = (Math.random() * 14 - 7).toFixed(1);
  s.style.setProperty("transform", `rotate(${r}deg)`);
});
