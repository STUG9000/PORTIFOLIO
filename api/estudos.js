const crypto = require("crypto");
const { listItems, readItem, createItem, putItem, deleteItem } = require("./_lib/blob");
const { requireAdmin } = require("./_lib/auth");

const PREFIX = "data/estudos/";

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    const itens = await listItems(PREFIX);
    res.status(200).json(itens);
    return;
  }

  if (!requireAdmin(req, res)) return;

  if (req.method === "POST") {
    const b = req.body || {};
    if (!b.nome) { res.status(400).json({ error: "Nome é obrigatório." }); return; }
    const item = {
      id: crypto.randomUUID(),
      nome: b.nome,
      categoria: b.categoria || "",
      status: ["Em andamento", "Concluído", "Planejado"].includes(b.status) ? b.status : "Em andamento",
      icone: b.icone || "📚",
      link: b.link || "",
      criadoEm: new Date().toISOString(),
    };
    await createItem(PREFIX, item);
    res.status(201).json(item);
    return;
  }

  if (req.method === "PUT") {
    const b = req.body || {};
    if (!b.id) { res.status(400).json({ error: "id é obrigatório." }); return; }
    const current = await readItem(PREFIX, b.id);
    if (!current) { res.status(404).json({ error: "Item não encontrado." }); return; }
    const updated = { ...current, ...b };
    await putItem(PREFIX, updated);
    res.status(200).json(updated);
    return;
  }

  if (req.method === "DELETE") {
    const id = (req.query && req.query.id) || new URL(req.url, "http://x").searchParams.get("id");
    if (!id) { res.status(400).json({ error: "id é obrigatório." }); return; }
    await deleteItem(PREFIX, id);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Método não permitido." });
};
