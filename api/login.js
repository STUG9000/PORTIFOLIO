const { isAdmin } = require("./_lib/auth");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "Método não permitido." }); return; }
  const { password } = req.body || {};
  // Reaproveita a checagem de "isAdmin" fingindo que a senha enviada é o
  // cabeçalho x-admin-key — assim a comparação continua em tempo constante.
  const ok = isAdmin({ headers: { "x-admin-key": password } });
  if (!ok) { res.status(401).json({ error: "Senha incorreta." }); return; }
  res.status(200).json({ ok: true });
};
