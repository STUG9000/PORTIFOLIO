const crypto = require("crypto");
const { del } = require("@vercel/blob");
const { listItems, readItem, createItem, putItem, deleteItem } = require("./_lib/blob");
const { requireAdmin } = require("./_lib/auth");

const PREFIX = "data/posts/";

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    const posts = await listItems(PREFIX);
    res.status(200).json(posts);
    return;
  }

  if (!requireAdmin(req, res)) return;

  if (req.method === "POST") {
    const b = req.body || {};
    if (!b.texto) { res.status(400).json({ error: "Texto é obrigatório." }); return; }
    const post = {
      id: crypto.randomUUID(),
      data: b.data || new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
      texto: b.texto,
      imagens: Array.isArray(b.imagens) ? b.imagens.filter((x) => typeof x === "string" && x) : [],
      cor: Array.isArray(b.cor) && b.cor.length ? b.cor : ["#7c5cff", "#22d3ee"],
      projeto: b.projeto || "",
      link: b.link || "",
      criadoEm: new Date().toISOString(),
    };
    await createItem(PREFIX, post);
    res.status(201).json(post);
    return;
  }

  if (req.method === "PUT") {
    const b = req.body || {};
    if (!b.id) { res.status(400).json({ error: "id é obrigatório." }); return; }
    const current = await readItem(PREFIX, b.id);
    if (!current) { res.status(404).json({ error: "Post não encontrado." }); return; }
    const updated = { ...current, ...b };
    // Fotos que saíram do post na edição (removidas no painel) não
    // ficam perdidas no Blob Storage — apaga as que não estão mais lá.
    const kept = new Set(updated.imagens || []);
    const removed = (current.imagens || []).filter((url) => !kept.has(url));
    await Promise.all(removed.map((url) => del(url).catch(() => {})));
    await putItem(PREFIX, updated);
    res.status(200).json(updated);
    return;
  }

  if (req.method === "DELETE") {
    const id = (req.query && req.query.id) || new URL(req.url, "http://x").searchParams.get("id");
    if (!id) { res.status(400).json({ error: "id é obrigatório." }); return; }
    const current = await readItem(PREFIX, id);
    if (current && current.imagens && current.imagens.length) {
      await Promise.all(current.imagens.map((url) => del(url).catch(() => {})));
    }
    await deleteItem(PREFIX, id);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Método não permitido." });
};
