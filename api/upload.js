const crypto = require("crypto");
const { put } = require("@vercel/blob");
const { requireAdmin } = require("./_lib/auth");

// Recebe uma imagem já redimensionada pelo navegador (data URL base64) e
// guarda no Blob Storage. Limite de corpo da função: ~4.5MB — o admin.js
// redimensiona a foto antes de enviar para não estourar isso.
module.exports = async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "Método não permitido." }); return; }
  if (!requireAdmin(req, res)) return;

  const { dataUrl, filename } = req.body || {};
  const match = /^data:(image\/\w+);base64,(.+)$/.exec(dataUrl || "");
  if (!match) { res.status(400).json({ error: "Imagem inválida." }); return; }
  const [, mime, base64] = match;
  const buffer = Buffer.from(base64, "base64");
  if (buffer.length > 4.5 * 1024 * 1024) { res.status(413).json({ error: "Imagem muito grande." }); return; }

  const ext = (mime.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const safeName = (filename || "foto").replace(/[^a-z0-9-]/gi, "-").slice(0, 40);
  const pathname = `img/posts/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}.${ext}`;

  const blob = await put(pathname, buffer, { access: "public", contentType: mime });
  res.status(201).json({ url: blob.url });
};
