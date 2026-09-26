// Monta a página a partir do content.js. Normalmente você não precisa editar este arquivo.
(function () {
  const S = window.SITE;
  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);

  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k.startsWith("on")) el[k] = v;
      else el.setAttribute(k, v);
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return el;
  }
  const external = (u) => /^https?:/.test(u);
  const link = (text, href, cls) =>
    h("a", { href, class: cls, target: external(href) ? "_blank" : null, rel: external(href) ? "noopener noreferrer" : null }, text);

  // ---------- Tema ----------
  const T = S.theme;
  root.style.setProperty("--accent", T.accent);
  root.style.setProperty("--accent2", T.accent2 || T.accent);
  root.style.setProperty("--radius", T.radius);
  if (T.font) {
    document.head.append(h("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(T.font).replace(/%20/g, "+") + ":wght@400;600;700;800&display=swap" }));
    root.style.setProperty("--font", `"${T.font}", system-ui, sans-serif`);
  }
  const media = matchMedia("(prefers-color-scheme: dark)");
  const resolve = (m) => (m === "auto" ? (media.matches ? "dark" : "light") : m);
  let stored = null;
  try { stored = localStorage.getItem("mode"); } catch (e) {}
  root.dataset.mode = resolve(stored || T.mode);
  $("#themeToggle").addEventListener("click", () => {
    const next = root.dataset.mode === "dark" ? "light" : "dark";
    root.dataset.mode = next;
    try { localStorage.setItem("mode", next); } catch (e) {}
  });

  document.title = S.meta.title;
  document.head.append(h("meta", { name: "description", content: S.meta.description }));
  const initial = (S.hero.nome || "P").trim()[0].toUpperCase();
  document.head.append(h("link", { rel: "icon", href: "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${T.accent}"/><text x="32" y="45" font-size="38" font-weight="800" text-anchor="middle" fill="#fff" font-family="sans-serif">${initial}</text></svg>`) }));

  // ---------- Utilidades ----------
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  function splitChars(text) {
    let i = 0;
    return text.split(" ").map((w, wi, arr) => [
      h("span", { class: "word" }, [...w].map((c) => h("span", { class: "ch", style: `--i:${i++}` }, c))),
      wi < arr.length - 1 ? " " : null,
    ]);
  }

  const reveal = (el, i = 0) => { el.classList.add("reveal"); el.style.setProperty("--d", i * 0.09 + "s"); return el; };
  const card = (cls, ...kids) => h("div", { class: `card spot ${cls}` }, ...kids);
  const tilt = (el) => { if (T.tilt) el.classList.add("tilt"); return el; };

  const LABELS = { sobre: "Sobre", pipeline: "Pipeline", servicos: "Serviços", projetos: "Projetos", feed: "Feed", estudos: "Estudos", habilidades: "Skills", experiencia: "Trajetória", depoimentos: "Depoimentos", contato: "Contato" };

  function section(id, index, titulo, ...kids) {
    return h("section", { id },
      h("div", { class: "wrap" },
        reveal(h("div", {}, h("div", { class: "eyebrow" }, String(index + 1).padStart(2, "0") + " — " + (S[id].rotulo || LABELS[id] || id)), h("h2", { class: "section-title" }, titulo))),
        ...kids));
  }

  // ---------- Modal de projeto ----------
  const modal = $("#modal");
  let lastFocus = null;
  function openProject(p, idx) {
    const d = p.detalhes || {};
    const grad = p.cor ? `linear-gradient(135deg, ${p.cor[0]}, ${p.cor[1] || p.cor[0]})` : "";
    $("#modalBody").replaceChildren(
      h("div", { class: "m-cover", style: grad ? `--g:${grad}` : null }, p.imagem ? h("img", { src: p.imagem, alt: p.nome }) : h("span", { class: "num" }, String(idx + 1).padStart(2, "0"))),
      h("div", { class: "m-body" },
        h("h3", { id: "modalTitle" }, p.nome),
        (d.papel || d.ano) && h("div", { class: "m-meta" },
          d.papel && h("div", {}, "Função", h("b", {}, d.papel)),
          d.ano && h("div", {}, "Ano", h("b", {}, d.ano))),
        h("div", { class: "text" }, (d.longa && d.longa.length ? d.longa : [p.descricao]).map((t) => h("p", {}, t))),
        d.stack && d.stack.length > 0 && h("div", { class: "tags" }, d.stack.map((x) => h("span", { class: "tag" }, x))),
        d.galeria && d.galeria.length > 0 && h("div", { class: "gallery" }, d.galeria.map((src) => h("img", { src, alt: p.nome, loading: "lazy" }))),
        (p.link || p.repo) && h("div", { class: "actions" },
          p.link && link("Ver projeto ↗", p.link, "btn primary"),
          p.repo && link("Código ↗", p.repo, "btn"))));
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("locked");
    requestAnimationFrame(() => { modal.classList.add("open"); $(".modal-x").focus(); });
  }
  function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("locked");
    setTimeout(() => { modal.hidden = true; }, 400);
    if (lastFocus) lastFocus.focus();
  }
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // ---------- Seções ----------
  const builders = {
    sobre(i) {
      const c = S.sobre, H = S.hero;
      const profile = h("div", { class: "card spot profile-card" },
        h("div", { class: "banner" }),
        h("div", { class: "profile-main" },
          h("div", { class: "profile-avatar" }, H.foto ? h("img", { src: H.foto, alt: H.nome }) : h("span", {}, initial)),
          h("div", { class: "profile-info" },
            h("h3", {}, H.nome),
            c.cargoAtual && h("p", { class: "headline" }, c.cargoAtual),
            (c.localizacao || H.status) && h("p", { class: "loc" },
              c.localizacao && h("span", {}, "📍 " + c.localizacao),
              c.localizacao && H.status && h("span", { class: "sep" }, "•"),
              H.status && h("span", { class: "avail" }, H.status)))));
      return section("sobre", i, c.titulo,
        reveal(profile),
        h("div", { class: "about" },
          reveal(h("div", { class: "about-text" },
            c.texto.map((t) => h("p", {}, t)),
            c.cv && h("div", { class: "actions" }, h("a", { href: c.cv, class: "btn magnetic", download: "" }, "Baixar CV ↓"))), 1),
          h("div", { class: "stats" }, c.destaques.map((d, k) =>
            reveal(card("stat", h("b", { "data-count": d.valor, "data-suffix": d.sufixo || "" }, "0" + (d.sufixo || "")), h("span", {}, d.rotulo)), k + 2)))));
    },

    pipeline(i) {
      const c = S.pipeline, n = c.etapas.length;
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stages = c.etapas.map((e) => h("li", { class: "stage" },
        h("div", { class: "node" }, h("span", {}, e.icone)),
        h("b", {}, e.nome), h("small", {}, e.ferramenta), h("em", { class: "st" }, "na fila")));
      const run = h("span", { class: "run" });
      const log = h("pre", { class: "pipe-log", "aria-hidden": "true" });
      const box = h("div", { class: "card pipe", style: `--n:${n};--pp:0` },
        h("div", { class: "pipe-head" },
          h("span", { class: "dots" }, h("i"), h("i"), h("i")),
          h("code", {}, ".github/workflows/" + (c.arquivo || "deploy.yml")), run),
        h("div", { class: "pipe-body" },
          h("div", { class: "pipe-flow" }, h("div", { class: "rail", "aria-hidden": "true" }, h("i")), h("ol", { class: "stages" }, stages)),
          c.feedback && h("div", { class: "loop-wrap" }, h("span", { class: "loop-label" }, "↺ " + c.feedback))),
        log);

      let runNo = 42, step = -1, timer = null;
      const lines = [];
      const print = (t) => {
        lines.push(t.replace(/\$RUN/g, "v" + runNo));
        while (lines.length > 7) lines.shift();
        log.replaceChildren(...lines.map((l) => h("span", { class: l[0] === "✓" ? "ok" : l[0] === "$" ? "cmd" : "info" }, l)));
      };
      const isOk = (l) => l[0] === "✓";
      function paint() {
        const finished = step >= n;
        stages.forEach((s, k) => {
          const done = k < step || finished, active = k === step;
          s.classList.toggle("done", done);
          s.classList.toggle("run", active);
          s.querySelector(".st").textContent = done ? "✓ ok" : active ? "rodando…" : "na fila";
        });
        box.style.setProperty("--pp", Math.max(0, Math.min(step, n - 1)) / (n - 1));
        box.classList.toggle("looping", finished);
        run.className = "run" + (finished ? " ok" : "");
        run.textContent = `#${runNo} · ` + (finished ? "sucesso" : "em execução");
      }
      function tick() {
        if (step >= n) {
          runNo++; step = -1; lines.length = 0;
          box.classList.add("snap");
          requestAnimationFrame(() => requestAnimationFrame(() => box.classList.remove("snap")));
        }
        if (step >= 0) c.etapas[step].log.filter(isOk).forEach(print);
        step++;
        if (step < n) c.etapas[step].log.filter((l) => !isOk(l)).forEach(print);
        else print(`✓ pipeline #${runNo} concluída — de volta ao início`);
        paint();
        timer = setTimeout(tick, step >= n ? 3400 : 1500);
      }

      if (reduce) {
        step = n;
        c.etapas.forEach((e) => e.log.forEach(print));
        paint();
      } else {
        paint();
        new IntersectionObserver(([e]) => {
          if (e.isIntersecting && !timer) tick();
          else if (!e.isIntersecting && timer) { clearTimeout(timer); timer = null; }
        }, { threshold: 0.3 }).observe(box);
      }

      return section("pipeline", i, c.titulo,
        c.texto && reveal(h("p", { class: "section-lead" }, c.texto)),
        reveal(box, 1));
    },

    servicos(i) {
      const c = S.servicos;
      return section("servicos", i, c.titulo,
        h("div", { class: "services" }, c.itens.map((s, k) =>
          reveal(tilt(card("service", h("div", { class: "ico" }, s.icone), h("h3", {}, s.titulo), h("p", {}, s.descricao))), k))));
    },

    projetos(i) {
      const c = S.projetos;
      const tags = [...new Set(c.itens.flatMap((p) => p.tags || []))];
      const grid = h("div", { class: "grid" });
      const filters = h("div", { class: "filters" });

      const render = (tag) => {
        grid.replaceChildren(...c.itens
          .map((p, idx) => ({ p, idx }))
          .filter(({ p }) => !tag || (p.tags || []).includes(tag))
          .map(({ p, idx }, k) => {
            const grad = p.cor ? `linear-gradient(135deg, ${p.cor[0]}, ${p.cor[1] || p.cor[0]})` : "";
            const el = tilt(h("article", { class: "card spot project" + (p.destaque ? " featured" : ""), tabindex: 0, role: "button", "aria-label": "Abrir " + p.nome },
              h("div", { class: "cover", style: grad ? `--g:${grad}` : null },
                p.imagem ? h("img", { src: p.imagem, alt: p.nome, loading: "lazy" }) : h("span", { class: "num" }, String(idx + 1).padStart(2, "0"))),
              h("div", { class: "body" },
                h("h3", {}, p.nome),
                h("p", {}, p.descricao),
                h("div", { class: "tags" }, (p.tags || []).map((x) => h("span", { class: "tag" }, x))))));
            el.onclick = () => openProject(p, idx);
            el.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProject(p, idx); } };
            return reveal(el, k);
          }));
        [...filters.children].forEach((b) => b.classList.toggle("active", (b.dataset.tag || "") === (tag || "")));
        window.FX.observe(grid);
      };

      if (tags.length > 1) {
        filters.append(h("button", { class: "chip", "data-tag": "", onclick: () => render("") }, "Todos"),
          ...tags.map((x) => h("button", { class: "chip", "data-tag": x, onclick: () => render(x) }, x)));
      }
      render("");
      return section("projetos", i, c.titulo, reveal(filters), grid);
    },

    feed(i) {
      const c = S.feed;
      const grid = h("div", { class: "feed-grid" }, h("p", { class: "empty-state" }, "Carregando…"));
      const box = section("feed", i, c.titulo, grid);

      fetch("/api/posts").then((r) => (r.ok ? r.json() : [])).catch(() => []).then((posts) => {
        if (!posts || !posts.length) { grid.replaceChildren(h("p", { class: "empty-state" }, c.vazio || "Em breve.")); return; }
        grid.className = "feed-grid";
        grid.replaceChildren(...posts.map((p, k) => {
          const grad = p.cor ? `linear-gradient(135deg, ${p.cor[0]}, ${p.cor[1] || p.cor[0]})` : "";
          const imgs = (p.imagens || []).filter(Boolean);
          const style = grad ? `--g:${grad}` : null;
          let media;
          if (!imgs.length) {
            media = h("div", { class: "post-media", style }, h("span", { class: "post-ico" }, "📷"));
          } else if (imgs.length === 1) {
            media = h("div", { class: "post-media", style }, h("img", { src: imgs[0], alt: p.projeto || "", loading: "lazy" }));
          } else {
            const slides = imgs.map((src, n) => h("img", { src, alt: p.projeto || "", loading: "lazy", class: n === 0 ? "active" : "" }));
            const dots = imgs.map((_, n) => h("button", { type: "button", "aria-label": "Foto " + (n + 1), class: n === 0 ? "active" : "" }));
            media = h("div", { class: "post-media carousel", style }, ...slides, h("div", { class: "post-dots" }, dots));
            let cur = 0, timer;
            const go = (n) => { cur = (n + imgs.length) % imgs.length; slides.forEach((s, idx) => s.classList.toggle("active", idx === cur)); dots.forEach((d, idx) => d.classList.toggle("active", idx === cur)); };
            dots.forEach((d, n) => d.onclick = () => { clearInterval(timer); go(n); timer = setInterval(() => go(cur + 1), 4000); });
            timer = setInterval(() => go(cur + 1), 4000);
          }
          const el = tilt(card("post", media,
            h("div", { class: "post-body" },
              h("div", { class: "post-meta" }, p.data && h("time", {}, p.data), p.projeto && h("span", { class: "tag" }, p.projeto)),
              h("p", {}, p.texto),
              p.link && link("Ver mais ↗", p.link, "btn"))));
          return reveal(el, k);
        }));
        window.FX.observe(grid);
      });

      return box;
    },

    estudos(i) {
      const c = S.estudos;
      const STATUS_CLS = { "Em andamento": "on", "Concluído": "done", "Planejado": "planned" };
      const grid = h("div", { class: "study-grid" }, h("p", { class: "empty-state" }, "Carregando…"));
      const box = section("estudos", i, c.titulo, grid);

      fetch("/api/estudos").then((r) => (r.ok ? r.json() : [])).catch(() => []).then((itens) => {
        if (!itens || !itens.length) { grid.replaceChildren(h("p", { class: "empty-state" }, c.vazio || "Em breve.")); return; }
        grid.className = "study-grid";
        grid.replaceChildren(...itens.map((s, k) =>
          reveal(tilt(card("study",
            h("div", { class: "ico" }, s.icone || "📚"),
            h("div", { class: "study-body" },
              h("h3", {}, s.nome),
              s.categoria && h("p", {}, s.categoria),
              h("span", { class: "status " + (STATUS_CLS[s.status] || "on") }, s.status || "Em andamento"),
              s.link && link("Ver ↗", s.link, "study-link")))), k)));
        window.FX.observe(grid);
      });

      return box;
    },

    habilidades(i) {
      const c = S.habilidades;
      return section("habilidades", i, c.titulo,
        h("div", { class: "skills" }, c.grupos.map((g, k) =>
          reveal(card("skill-group", h("h3", {}, g.nome),
            g.itens.map((s, n) => h("div", { class: "skill" },
              h("div", { class: "row" }, h("span", {}, s.nome), h("span", {}, s.nivel + "%")),
              h("div", { class: "bar", style: `--w:${s.nivel / 100};--d:${0.15 + n * 0.12}s` }, h("i"))))), k))));
    },

    experiencia(i) {
      const c = S.experiencia;
      return section("experiencia", i, c.titulo,
        h("div", { class: "timeline" }, c.itens.map((j, k) =>
          reveal(card("job", h("div", { class: "when" }, j.periodo), h("h3", {}, j.cargo), h("div", { class: "where" }, j.local), h("p", { class: "desc" }, j.descricao)), k))));
    },

    depoimentos(i) {
      const c = S.depoimentos;
      const slides = c.itens.map((q, k) => card("quote" + (k === 0 ? " active" : ""),
        h("blockquote", {}, q.texto),
        h("div", { class: "who" },
          h("div", { class: "pic" }, q.foto ? h("img", { src: q.foto, alt: q.nome }) : q.nome[0]),
          h("div", {}, h("b", {}, q.nome), h("small", {}, q.cargo)))));
      const dots = c.itens.map((_, k) => h("button", { "aria-label": "Depoimento " + (k + 1), class: k === 0 ? "active" : "", onclick: () => go(k) }));
      let cur = 0, timer;
      function go(n) {
        cur = n;
        slides.forEach((s, k) => s.classList.toggle("active", k === n));
        dots.forEach((d, k) => d.classList.toggle("active", k === n));
        clearInterval(timer);
        if (slides.length > 1) timer = setInterval(() => go((cur + 1) % slides.length), 7000);
      }
      const box = h("div", {}, h("div", { class: "quotes" }, slides), slides.length > 1 && h("div", { class: "dots" }, dots));
      go(0);
      return section("depoimentos", i, c.titulo, reveal(box));
    },

    contato(i) {
      const c = S.contato;
      const btn = h("button", { class: "btn primary magnetic", type: "submit" }, "Enviar mensagem →");
      const field = (label, name, type, extra) => h("div", { class: "field" },
        h("label", { for: "f-" + name }, label),
        type === "textarea" ? h("textarea", { id: "f-" + name, name, rows: 5, required: true }) : h("input", { id: "f-" + name, name, type, required: true, ...extra }));
      const form = h("form", { class: "card form", novalidate: false }, field("Nome", "nome", "text", { autocomplete: "name" }), field("E-mail", "email", "email", { autocomplete: "email" }), field("Mensagem", "mensagem", "textarea"), btn);

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        if (!c.formEndpoint) {
          location.href = `mailto:${c.email}?subject=${encodeURIComponent("Contato via portfólio — " + data.nome)}&body=${encodeURIComponent(data.mensagem + "\n\n" + data.nome + " (" + data.email + ")")}`;
          return;
        }
        btn.disabled = true; btn.textContent = "Enviando…";
        try {
          const r = await fetch(c.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
          if (!r.ok) throw new Error();
          form.reset(); toast("Mensagem enviada. Obrigado!");
        } catch (err) { toast("Não foi possível enviar. Tente pelo e-mail."); }
        btn.disabled = false; btn.textContent = "Enviar mensagem →";
      });

      const mail = h("button", { class: "big-mail", type: "button", title: "Copiar e-mail" }, c.email);
      mail.onclick = async () => {
        try { await navigator.clipboard.writeText(c.email); toast("E-mail copiado!"); }
        catch (err) { toast(c.email); }
      };

      return section("contato", i, c.titulo,
        h("div", { class: "contact-grid" },
          reveal(h("div", { class: "contact-info" }, h("p", {}, c.texto), mail,
            h("div", { class: "socials" }, c.links.map((l) => link(l.rotulo + " ↗", l.url, "btn magnetic"))))),
          reveal(form, 1)));
    },
  };

  // ---------- Montagem ----------
  const main = $("#top");
  const H = S.hero;
  const hero = h("section", { id: "inicio", class: "hero" },
    h("div", { class: "wrap hero-grid" },
      h("div", { class: "hero-text" },
        H.status && h("div", { class: "status" }, h("i"), H.status),
        h("p", { class: "hi" }, H.saudacao),
        h("h1", { "aria-label": H.nome }, splitChars(H.nome)),
        h("p", { class: "role" }, h("span", { id: "typed" }), h("span", { class: "caret" })),
        h("p", { class: "lead" }, H.resumo),
        h("div", { class: "actions" }, H.botoes.map((b) => link(b.texto, b.link, "btn magnetic" + (b.primario ? " primary" : ""))))),
      h("div", { class: "hero-visual" },
        h("div", { class: "halo" }),
        h("div", { class: "avatar" }, H.foto ? h("img", { src: H.foto, alt: H.nome }) : h("span", {}, initial)),
        (H.badges || []).slice(0, 4).map((b) => h("span", { class: "badge" }, b)))),
    h("a", { class: "scroll-hint", href: "#" + (S.sections[0] || "sobre"), "aria-label": "Rolar para baixo" }, h("i"), "scroll"));
  main.append(hero);

  if (S.marquee && S.marquee.length) {
    const row = () => S.marquee.map((m) => h("span", {}, m));
    main.append(h("div", { class: "marquee-wrap", "aria-hidden": "true" }, h("div", { class: "track" }, row(), row())));
  }

  const active = S.sections.filter((k) => builders[k] && S[k]);
  active.forEach((k, i) => main.append(builders[k](i)));

  $("#plName").textContent = H.nome;
  $("#brand").textContent = H.nome;
  const nav = $("#nav");
  nav.append(...active.map((k) => link(S[k].menu || S[k].titulo, "#" + k)));
  $("#footer").append(h("span", {}, S.rodape), h("a", { class: "to-top", href: "#top" }, "↑ Voltar ao topo"));

  const menuBtn = $("#menuBtn");
  const setMenu = (open) => { nav.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open); document.body.classList.toggle("locked", open); };
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });

  window.FX.init({ theme: T, hero: H, sectionIds: active });
})();
