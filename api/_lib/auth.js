// Autenticação simples de MVP: uma senha única, comparada em cada chamada
// de escrita (o painel manda ela no cabeçalho "x-admin-key", guardada no
// localStorage do navegador depois do login). Sem sessão, sem token com
// validade — dá pra evoluir para algo mais robusto (JWT, hash da senha,
// limite de tentativas) quando o projeto sair do MVP.
const crypto = require("crypto");

function timingSafeEqual(a, b) {
  const bufA = Buffer.from(String(a || ""));
  const bufB = Buffer.from(String(b || ""));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function isAdmin(req) {
  const key = req.headers["x-admin-key"];
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && !!key && timingSafeEqual(key, expected);
}

function requireAdmin(req, res) {
  if (isAdmin(req)) return true;
  res.status(401).json({ error: "Não autorizado." });
  return false;
}

module.exports = { isAdmin, requireAdmin };
