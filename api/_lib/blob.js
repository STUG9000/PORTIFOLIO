// Funções compartilhadas pelas rotas de /api. Arquivos dentro de "_lib"
// não viram rota — é convenção da Vercel (nomes com "_" na frente ficam
// de fora do roteamento).
//
// Cada post/item de estudo é o SEU PRÓPRIO arquivo no Blob
// (ex.: "data/posts/<id>.json"), em vez de todos ficarem juntos num
// array só. Foi de propósito: o Blob Storage não garante que uma
// leitura logo depois de uma escrita já veja essa escrita (mesmo
// arquivo, releitura rápida). Com um array único, publicar um post
// logo depois de outro podia sobrescrever o primeiro com uma versão
// desatualizada e APAGAR o post anterior sem erro nenhum — vimos isso
// acontecer nos testes. Um arquivo por item evita esse risco: criar,
// editar ou apagar um post nunca mexe no arquivo de outro.
const { list, put, del, head } = require("@vercel/blob");

function bust(url) {
  return url + (url.includes("?") ? "&" : "?") + "t=" + Date.now();
}

// Lê todos os itens de uma "pasta" (prefixo), mais novo primeiro.
async function listItems(prefix) {
  const { blobs } = await list({ prefix });
  const items = await Promise.all(blobs.map(async (b) => {
    const res = await fetch(bust(b.url), { cache: "no-store" });
    if (!res.ok) return null;
    try { return await res.json(); } catch { return null; }
  }));
  return items.filter(Boolean).sort((a, b) => (b.criadoEm || "").localeCompare(a.criadoEm || ""));
}

// Lê um item específico pelo id (usa head() pra achar a URL dele sem
// precisar listar a pasta inteira).
async function readItem(prefix, id) {
  const pathname = prefix + id + ".json";
  let meta;
  try { meta = await head(pathname); } catch { return null; }
  const res = await fetch(bust(meta.url), { cache: "no-store" });
  if (!res.ok) return null;
  try { return await res.json(); } catch { return null; }
}

// Cria um item novo. O caminho usa o id (já único, gerado com
// randomUUID antes de chamar isto), então nunca colide com outro post.
async function createItem(prefix, item) {
  await put(prefix + item.id + ".json", JSON.stringify(item), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
  return item;
}

// Sobrescreve um item existente (só o arquivo dele, não a lista toda).
async function putItem(prefix, item) {
  await put(prefix + item.id + ".json", JSON.stringify(item), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return item;
}

async function deleteItem(prefix, id) {
  await del(prefix + id + ".json");
}

module.exports = { listItems, readItem, createItem, putItem, deleteItem };
