// Efeitos visuais. Normalmente você não precisa editar este arquivo.
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // ---------- Revelar ao rolar ----------
  const narrow = matchMedia("(max-width: 640px)").matches;
  let revealIO;
  function observe(scope = document) {
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          $$("[data-count]", e.target).concat(e.target.matches("[data-count]") ? [e.target] : []).forEach(countUp);
          revealIO.unobserve(e.target);
        });
      }, narrow ? { threshold: 0.06, rootMargin: "0px 0px -2% 0px" } : { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    }
    $$(".reveal, .bar", scope).forEach((el) => {
      if (reduce) el.classList.add("in");
      else if (!el.dataset.obs) { el.dataset.obs = 1; revealIO.observe(el); }
    });
    $$("[data-count]", scope).forEach((el) => { if (reduce) countUp(el); });
  }

  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    const to = +el.dataset.count, suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = to + suffix; return; }
    const t0 = performance.now(), dur = 1600;
    (function tick(now) {
      const p = clamp((now - t0) / dur, 0, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  // ---------- Abertura ----------
  function intro(enabled) {
    const pre = $("#preloader");
    const start = () => {
      document.body.classList.add("ready");
      pre.classList.add("done");
      setTimeout(() => pre.remove(), 1500);
    };
    if (!enabled || reduce) { pre.remove(); document.body.classList.add("ready"); return; }
    const minDelay = new Promise((r) => setTimeout(r, 1100));
    const loaded = document.readyState === "complete" ? Promise.resolve() : new Promise((r) => addEventListener("load", r));
    Promise.all([minDelay, loaded]).then(start);
    setTimeout(start, 3500);
  }

  // ---------- Digitação ----------
  function typewriter(roles) {
    const el = $("#typed");
    if (!el || !roles.length) return;
    if (reduce || roles.length === 1) { el.textContent = roles[0]; return; }
    let i = 0, n = 0, del = false;
    (function step() {
      const word = roles[i];
      n += del ? -1 : 1;
      el.textContent = word.slice(0, n);
      let wait = del ? 35 : 80;
      if (!del && n === word.length) { del = true; wait = 1600; }
      else if (del && n === 0) { del = false; i = (i + 1) % roles.length; wait = 350; }
      setTimeout(step, wait);
    })();
  }

  // ---------- Partículas ----------
  function particles() {
    const c = $("#bg"), ctx = c.getContext("2d");
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#7c5cff";
    const mouse = { x: -9999, y: -9999 };
    let w, h, pts = [];
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(90, Math.floor((w * h) / 17000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.6 + 0.6,
      }));
    }
    addEventListener("resize", resize);
    addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
    resize();
    ctx.fillStyle = ctx.strokeStyle = accent;
    (function frame() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y, md = Math.hypot(mdx, mdy);
        if (md < 130) { p.x += (mdx / md) * 0.8; p.y += (mdy / md) * 0.8; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.globalAlpha = 0.7;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) { ctx.globalAlpha = (1 - d / 130) * 0.28; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        if (md < 170) { ctx.globalAlpha = (1 - md / 170) * 0.5; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
      requestAnimationFrame(frame);
    })();
  }

  // ---------- Cursor ----------
  function cursor() {
    const glow = $("#cursorGlow"), ring = $("#cursorRing");
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      document.body.classList.add("has-cursor");
      const over = e.target.closest && e.target.closest("a, button, input, textarea, .project, [role=button]");
      ring.classList.toggle("hover", !!over);
    });
    document.addEventListener("mouseleave", () => document.body.classList.remove("has-cursor"));
    (function loop() {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      glow.style.transform = `translate(${x}px, ${y}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();
  }

  // ---------- Inclinação 3D + spotlight + botões magnéticos ----------
  function pointerFx(tiltOn) {
    let cur = null, mag = null;
    const resetTilt = (el) => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); };
    const resetMag = (el) => { el.style.setProperty("--tx", "0px"); el.style.setProperty("--ty", "0px"); };
    addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const spot = e.target.closest(".spot");
      if (cur && cur !== spot) { resetTilt(cur); cur = null; }
      if (spot) {
        const r = spot.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        spot.style.setProperty("--mx", px * 100 + "%");
        spot.style.setProperty("--my", py * 100 + "%");
        if (tiltOn && spot.classList.contains("tilt")) {
          spot.style.setProperty("--rx", ((0.5 - py) * 8).toFixed(2) + "deg");
          spot.style.setProperty("--ry", ((px - 0.5) * 10).toFixed(2) + "deg");
        }
        cur = spot;
      }
      const m = e.target.closest(".magnetic");
      if (mag && mag !== m) { resetMag(mag); mag = null; }
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.setProperty("--tx", (e.clientX - (r.left + r.width / 2)) * 0.25 + "px");
        m.style.setProperty("--ty", (e.clientY - (r.top + r.height / 2)) * 0.35 + "px");
        mag = m;
      }
    });
    document.addEventListener("mouseleave", () => { if (cur) resetTilt(cur); if (mag) resetMag(mag); cur = mag = null; });
  }

  // ---------- Rolagem: progresso, nav, timeline, parallax ----------
  function scrollFx(sectionIds) {
    const bar = document.documentElement, top = $("#topbar");
    const links = $$("#nav a"), tl = $(".timeline"), jobs = $$(".job");
    const blobs = $$(".blob");
    let lastY = scrollY, ticking = false;

    function update() {
      ticking = false;
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty("--p", max > 0 ? clamp(y / max, 0, 1).toFixed(4) : 0);

      const menuOpen = $("#nav").classList.contains("open");
      top.classList.toggle("hide", y > lastY && y > 240 && !menuOpen);
      lastY = y;

      if (!reduce && finePointer) blobs.forEach((b, i) => b.style.setProperty("translate", `0 ${y * (0.05 + i * 0.03) * -1}px`));

      if (tl) {
        const r = tl.getBoundingClientRect();
        tl.style.setProperty("--tl", clamp((innerHeight * 0.6 - r.top) / r.height, 0, 1).toFixed(3));
        jobs.forEach((j) => j.classList.toggle("on", j.getBoundingClientRect().top < innerHeight * 0.65));
      }
    }
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update);
    update();

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sectionIds.forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  function init(cfg) {
    const T = cfg.theme;
    intro(T.intro);
    observe();
    typewriter(cfg.hero.roles || []);
    scrollFx(cfg.sectionIds);
    if (!reduce) {
      if (T.particles && finePointer) particles();
      pointerFx(T.tilt);
      if (finePointer && T.cursor) cursor();
    }
  }

  window.FX = { init, observe };
})();
