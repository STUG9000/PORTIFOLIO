// Painel /admin. Autenticação de MVP: a senha vira um cabeçalho
// "x-admin-key" guardado no localStorage e enviado em toda chamada de
// escrita — sem sessão de servidor. Trocar por algo mais forte depois
// (hash da senha, expiração, etc.) quando o site sair do MVP.
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const KEY = "adminKey";

  const loginView = $("#loginView"), dashView = $("#dashView");

  function getKey() { try { return localStorage.getItem(KEY) || ""; } catch { return ""; } }
  function setKey(v) { try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY); } catch {} }

  async function api(path, opts = {}) {
    const headers = Object.assign({ "Content-Type": "application/json" }, opts.headers || {});
    const key = getKey();
    if (key) headers["x-admin-key"] = key;
    const res = await fetch(path, { ...opts, headers });
    if (res.status === 401) { setKey(""); showLogin("Sessão expirada. Entre de novo."); throw new Error("401"); }
    if (!res.ok) { const b = await res.json().catch(() => ({})); throw new Error(b.error || "Erro na requisição."); }
    return res.status === 204 ? null : res.json();
  }

  function showLogin(msg) {
    dashView.hidden = true; loginView.hidden = false;
    const err = $("#loginError");
    if (msg) { err.textContent = msg; err.hidden = false; } else { err.hidden = true; }
  }
  function showDash() { loginView.hidden = true; dashView.hidden = false; loadPosts(); loadStudy(); }

  // O Blob Storage leva alguns segundos pra propagar uma escrita — se a
  // gente recarregasse a lista do servidor logo após publicar/editar/
  // excluir, ainda podia vir a versão antiga. Por isso as ações abaixo
  // atualizam a lista local na hora, sem esperar essa releitura. Isso é
  // parte do que vale revisitar quando o backend deixar de ser MVP.

  // ---------- Login ----------
  $("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const pw = $("#pw").value;
    const err = $("#loginError");
    err.hidden = true;
    try {
      const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
      if (!res.ok) { err.textContent = "Senha incorreta."; err.hidden = false; return; }
      setKey(pw);
      $("#pw").value = "";
      showDash();
    } catch { err.textContent = "Não foi possível conectar."; err.hidden = false; }
  });
  $("#logoutBtn").addEventListener("click", () => { setKey(""); showLogin(); });

  // ---------- Abas ----------
  $$(".tab").forEach((t) => t.addEventListener("click", () => {
    $$(".tab").forEach((x) => x.classList.toggle("active", x === t));
    $$(".admin-tab").forEach((s) => { s.hidden = s.id !== "tab-" + t.dataset.tab; });
  }));

  // ---------- Utilidade: redimensionar imagem antes de enviar ----------
  function resizeImage(file, maxW = 1280, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => { img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale), hgt = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = hgt;
        canvas.getContext("2d").drawImage(img, 0, 0, w, hgt);
        resolve({ dataUrl: canvas.toDataURL("image/jpeg", quality), name: file.name.replace(/\.[^.]+$/, "") });
      }; img.onerror = reject; img.src = reader.result; };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // ---------- Posts ----------
  const postForm = $("#postForm"), postMsg = $("#postMsg");

  // Fotos do post em edição: cada item é { file (novo, ainda não
  // enviado) OU url (já publicado), previewUrl (o que mostra na tela) }.
  // A ordem do array É a ordem do carrossel — as setas só trocam a
  // posição dos itens aqui, nada é enviado até "Publicar".
  let photoItems = [];
  function revokeAll() { photoItems.forEach((p) => { if (p.previewUrl && p.previewUrl.startsWith("blob:")) URL.revokeObjectURL(p.previewUrl); }); }
  function renderPhotos() {
    const box = $("#postPhotos");
    box.replaceChildren(...photoItems.map((item, idx) => {
      const div = document.createElement("div"); div.className = "photo-item";
      const wrap = document.createElement("div"); wrap.className = "thumb-wrap";
      wrap.innerHTML = `<img src="${item.previewUrl}" alt="">` + (idx === 0 ? '<span class="cover-badge">Capa</span>' : "");
      const actions = document.createElement("div"); actions.className = "photo-actions";
      const left = el("button", "", "‹"); left.type = "button"; left.title = "Mover pra trás"; left.disabled = idx === 0;
      left.onclick = () => { [photoItems[idx - 1], photoItems[idx]] = [photoItems[idx], photoItems[idx - 1]]; renderPhotos(); };
      const right = el("button", "", "›"); right.type = "button"; right.title = "Mover pra frente"; right.disabled = idx === photoItems.length - 1;
      right.onclick = () => { [photoItems[idx + 1], photoItems[idx]] = [photoItems[idx], photoItems[idx + 1]]; renderPhotos(); };
      const rm = el("button", "danger", "✕"); rm.type = "button"; rm.title = "Remover";
      rm.onclick = () => { if (item.previewUrl.startsWith("blob:")) URL.revokeObjectURL(item.previewUrl); photoItems.splice(idx, 1); renderPhotos(); };
      actions.append(left, right, rm);
      div.append(wrap, actions);
      return div;
    }));
  }
  function resetPostForm() {
    postForm.reset(); $("#postId").value = ""; $("#postFormTitle").textContent = "Novo post";
    $("#postCancel").hidden = true; postMsg.hidden = true;
    revokeAll(); photoItems = []; renderPhotos();
  }
  $("#postCancel").addEventListener("click", resetPostForm);
  $("#postImg").addEventListener("change", () => {
    [...$("#postImg").files].forEach((file) => photoItems.push({ file, url: null, previewUrl: URL.createObjectURL(file) }));
    $("#postImg").value = ""; // permite escolher o mesmo arquivo de novo depois de removê-lo
    renderPhotos();
  });

  let postsCache = [];
  function renderPosts() {
    const list = $("#postList");
    if (!postsCache.length) { list.replaceChildren(el("p", "list-empty", "Nenhum post ainda.")); return; }
    list.replaceChildren(...postsCache.map((p) => postRow(p)));
  }
  async function loadPosts() {
    const list = $("#postList");
    list.textContent = "Carregando…";
    try {
      postsCache = await (await fetch("/api/posts")).json();
      renderPosts();
    } catch { list.textContent = "Não foi possível carregar."; }
  }
  function postRow(p) {
    const row = document.createElement("div"); row.className = "list-item";
    const thumb = document.createElement("div"); thumb.className = "thumb";
    const imgs = p.imagens || [];
    thumb.innerHTML = imgs[0] ? `<img src="${imgs[0]}" alt="">` : "📷";
    if (imgs.length > 1) thumb.innerHTML += `<span class="count-badge">${imgs.length}</span>`;
    const info = document.createElement("div"); info.className = "info";
    info.innerHTML = `<b>${escapeHtml(p.texto).slice(0, 60)}</b><small>${escapeHtml(p.data || "")}${p.projeto ? " · " + escapeHtml(p.projeto) : ""}</small>`;
    const actions = document.createElement("div"); actions.className = "row-actions";
    const editBtn = el("button", "", "Editar"); editBtn.type = "button";
    editBtn.onclick = () => {
      $("#postId").value = p.id; $("#postTexto").value = p.texto; $("#postData").value = p.data || "";
      $("#postProjeto").value = p.projeto || ""; $("#postLink").value = p.link || "";
      revokeAll();
      photoItems = (p.imagens || []).map((url) => ({ file: null, url, previewUrl: url }));
      renderPhotos();
      $("#postFormTitle").textContent = "Editar post"; $("#postCancel").hidden = false;
      postForm.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const delBtn = el("button", "danger", "Excluir"); delBtn.type = "button";
    delBtn.onclick = async () => {
      if (!confirm("Excluir este post?")) return;
      try {
        await api("/api/posts?id=" + encodeURIComponent(p.id), { method: "DELETE" });
        postsCache = postsCache.filter((x) => x.id !== p.id);
        renderPosts();
      } catch (e) { alert(e.message); }
    };
    actions.append(editBtn, delBtn);
    row.append(thumb, info, actions);
    return row;
  }

  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    postMsg.hidden = true;
    try {
      // Sobe as fotos novas na ordem em que estão organizadas; as que já
      // tinham URL (edição) ficam como estão.
      for (const item of photoItems) {
        if (item.url) continue;
        const { dataUrl, name } = await resizeImage(item.file);
        const up = await api("/api/upload", { method: "POST", body: JSON.stringify({ dataUrl, filename: name }) });
        item.url = up.url;
      }
      const imagens = photoItems.map((p) => p.url);
      const body = { texto: $("#postTexto").value.trim(), data: $("#postData").value.trim(), projeto: $("#postProjeto").value.trim(), link: $("#postLink").value.trim(), imagens };
      const id = $("#postId").value;
      if (id) {
        const updated = await api("/api/posts", { method: "PUT", body: JSON.stringify({ id, ...body }) });
        postsCache = postsCache.map((x) => (x.id === id ? updated : x));
      } else {
        const created = await api("/api/posts", { method: "POST", body: JSON.stringify(body) });
        postsCache.unshift(created);
      }
      resetPostForm(); renderPosts();
    } catch (err) { postMsg.textContent = err.message; postMsg.hidden = false; }
  });

  // ---------- Estudando agora ----------
  const studyForm = $("#studyForm"), studyMsg = $("#studyMsg");
  function resetStudyForm() {
    studyForm.reset(); $("#studyId").value = ""; $("#studyFormTitle").textContent = "Novo item";
    $("#studyCancel").hidden = true; studyMsg.hidden = true;
  }
  $("#studyCancel").addEventListener("click", resetStudyForm);

  let studyCache = [];
  function renderStudy() {
    const list = $("#studyList");
    if (!studyCache.length) { list.replaceChildren(el("p", "list-empty", "Nada listado ainda.")); return; }
    list.replaceChildren(...studyCache.map((s) => studyRow(s)));
  }
  async function loadStudy() {
    const list = $("#studyList");
    list.textContent = "Carregando…";
    try {
      studyCache = await (await fetch("/api/estudos")).json();
      renderStudy();
    } catch { list.textContent = "Não foi possível carregar."; }
  }
  function studyRow(s) {
    const row = document.createElement("div"); row.className = "list-item";
    const thumb = document.createElement("div"); thumb.className = "thumb"; thumb.textContent = s.icone || "📚";
    const info = document.createElement("div"); info.className = "info";
    info.innerHTML = `<b>${escapeHtml(s.nome)}</b><small>${escapeHtml(s.status)}${s.categoria ? " · " + escapeHtml(s.categoria) : ""}</small>`;
    const actions = document.createElement("div"); actions.className = "row-actions";
    const editBtn = el("button", "", "Editar"); editBtn.type = "button";
    editBtn.onclick = () => {
      $("#studyId").value = s.id; $("#studyNome").value = s.nome; $("#studyIcone").value = s.icone || "";
      $("#studyCategoria").value = s.categoria || ""; $("#studyStatus").value = s.status || "Em andamento"; $("#studyLink").value = s.link || "";
      $("#studyFormTitle").textContent = "Editar item"; $("#studyCancel").hidden = false;
      studyForm.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const delBtn = el("button", "danger", "Excluir"); delBtn.type = "button";
    delBtn.onclick = async () => {
      if (!confirm("Excluir este item?")) return;
      try {
        await api("/api/estudos?id=" + encodeURIComponent(s.id), { method: "DELETE" });
        studyCache = studyCache.filter((x) => x.id !== s.id);
        renderStudy();
      } catch (e) { alert(e.message); }
    };
    actions.append(editBtn, delBtn);
    row.append(thumb, info, actions);
    return row;
  }

  studyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    studyMsg.hidden = true;
    try {
      const body = {
        nome: $("#studyNome").value.trim(), icone: $("#studyIcone").value.trim() || "📚",
        categoria: $("#studyCategoria").value.trim(), status: $("#studyStatus").value, link: $("#studyLink").value.trim(),
      };
      const id = $("#studyId").value;
      if (id) {
        const updated = await api("/api/estudos", { method: "PUT", body: JSON.stringify({ id, ...body }) });
        studyCache = studyCache.map((x) => (x.id === id ? updated : x));
      } else {
        const created = await api("/api/estudos", { method: "POST", body: JSON.stringify(body) });
        studyCache.unshift(created);
      }
      resetStudyForm(); renderStudy();
    } catch (err) { studyMsg.textContent = err.message; studyMsg.hidden = false; }
  });

  // ---------- Helpers ----------
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function escapeHtml(s) { return String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  // ---------- Início ----------
  if (getKey()) showDash(); else showLogin();
})();
