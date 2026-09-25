// =====================================================================
//  EDITE APENAS ESTE ARQUIVO para mudar textos, projetos, cores,
//  efeitos e ordem das seções. Salve e recarregue a página (F5).
//  Campos com "" ficam ocultos. Imagens: coloque em uma pasta "img/"
//  e use o caminho, ex.: "img/foto.jpg".
// =====================================================================

window.SITE = {
  // ---------- Tema e efeitos ----------
  theme: {
    accent: "#7c5cff",     // cor principal
    accent2: "#22d3ee",    // segunda cor do gradiente
    mode: "dark",          // "dark" | "light" | "auto" (o visitante pode alternar)
    font: "Inter",         // fonte do Google Fonts ("" = fonte do sistema)
    radius: "18px",        // arredondamento dos cards

    intro: true,           // tela de abertura animada
    particles: true,       // fundo de partículas interativas
    cursor: true,          // brilho/anel que segue o mouse (só desktop)
    tilt: true,            // cards que inclinam em 3D
  },

  meta: {
    title: "Gabriel — Portfólio",
    description: "Portfólio de projetos, habilidades e experiência.",
  },

  // Ordem e visibilidade das seções (apague uma linha para esconder)
  sections: ["sobre", "servicos", "projetos", "habilidades", "experiencia", "depoimentos", "contato"],

  // ---------- Topo ----------
  hero: {
    saudacao: "Olá, eu sou",
    nome: "Gabriel",
    // Frases que ficam sendo digitadas
    roles: ["Desenvolvedor Web", "Criador de interfaces", "Resolvedor de problemas"],
    resumo: "Construo experiências digitais rápidas, bonitas e pensadas nos detalhes. Edite esta frase com o seu pitch.",
    status: "Disponível para novos projetos",   // "" para ocultar
    foto: "",                                    // ex.: "img/eu.jpg"  ("" mostra a inicial do nome)
    badges: ["HTML", "CSS", "JavaScript", "Node"],
    botoes: [
      { texto: "Ver projetos", link: "#projetos", primario: true },
      { texto: "Falar comigo", link: "#contato" },
    ],
  },

  // Faixa de tecnologias que rola sozinha (apague o array para ocultar)
  marquee: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Git", "Figma", "SQL", "Tailwind", "Next.js", "Docker"],

  // ---------- Sobre ----------
  sobre: {
    titulo: "Sobre mim",
    texto: [
      "Primeiro parágrafo: quem você é, de onde vem e como começou na área.",
      "Segundo parágrafo: no que você acredita, o que gosta de construir e como trabalha.",
    ],
    destaques: [
      { valor: 3, sufixo: "+", rotulo: "anos de experiência" },
      { valor: 24, sufixo: "", rotulo: "projetos entregues" },
      { valor: 100, sufixo: "%", rotulo: "dedicação" },
    ],
    cv: "",   // ex.: "cv.pdf" (aparece um botão "Baixar CV")
  },

  // ---------- Serviços / O que faço ----------
  servicos: {
    titulo: "O que eu faço",
    itens: [
      { icone: "🖥️", titulo: "Sites & Landing pages", descricao: "Páginas rápidas, responsivas e feitas para converter." },
      { icone: "⚙️", titulo: "Aplicações Web", descricao: "Sistemas completos, do front-end à API e banco de dados." },
      { icone: "🎨", titulo: "UI / Interações", descricao: "Interfaces com animações que deixam a experiência viva." },
      { icone: "🚀", titulo: "Performance & SEO", descricao: "Otimização para carregar rápido e ser encontrado." },
    ],
  },

  // ---------- Projetos ----------
  projetos: {
    titulo: "Projetos",
    itens: [
      {
        nome: "Projeto Exemplo 1",
        descricao: "Descrição curta do que ele faz e qual problema resolve.",
        tags: ["Web", "JavaScript"],
        link: "",          // demo ao vivo
        repo: "",          // código
        imagem: "",        // capa (sem imagem, aparece uma capa em gradiente)
        cor: ["#7c5cff", "#22d3ee"],   // gradiente da capa sem imagem
        destaque: true,    // ocupa mais espaço na grade
        detalhes: {        // aparece ao clicar no card (opcional)
          papel: "Desenvolvedor Full-stack",
          ano: "2025",
          longa: [
            "Conte a história do projeto: o problema, a solução e o resultado.",
            "Fale das decisões técnicas e do que você aprendeu.",
          ],
          stack: ["JavaScript", "Node.js", "CSS"],
          galeria: [],     // ex.: ["img/p1-a.png", "img/p1-b.png"]
        },
      },
      {
        nome: "Projeto Exemplo 2",
        descricao: "Outro projeto. Troque tudo por algo seu.",
        tags: ["Mobile", "Design"],
        link: "", repo: "", imagem: "",
        cor: ["#f97316", "#ec4899"],
        detalhes: { papel: "Designer & Dev", ano: "2024", longa: ["Detalhes do projeto."], stack: ["Figma", "React"], galeria: [] },
      },
      {
        nome: "Projeto Exemplo 3",
        descricao: "Mais um espaço para mostrar seu trabalho.",
        tags: ["Web", "Design"],
        link: "", repo: "", imagem: "",
        cor: ["#10b981", "#3b82f6"],
        detalhes: { papel: "Front-end", ano: "2024", longa: ["Detalhes do projeto."], stack: ["HTML", "CSS"], galeria: [] },
      },
      {
        nome: "Projeto Exemplo 4",
        descricao: "Quanto mais projetos, mais os filtros ficam úteis.",
        tags: ["Mobile"],
        link: "", repo: "", imagem: "",
        cor: ["#eab308", "#ef4444"],
        detalhes: { papel: "Desenvolvedor", ano: "2023", longa: ["Detalhes do projeto."], stack: ["React Native"], galeria: [] },
      },
    ],
  },

  // ---------- Habilidades (nivel de 0 a 100) ----------
  habilidades: {
    titulo: "Habilidades",
    grupos: [
      { nome: "Front-end", itens: [{ nome: "HTML & CSS", nivel: 92 }, { nome: "JavaScript", nivel: 85 }, { nome: "React", nivel: 75 }] },
      { nome: "Back-end", itens: [{ nome: "Node.js", nivel: 72 }, { nome: "SQL", nivel: 68 }, { nome: "APIs REST", nivel: 78 }] },
      { nome: "Ferramentas", itens: [{ nome: "Git & GitHub", nivel: 85 }, { nome: "Figma", nivel: 70 }, { nome: "Docker", nivel: 50 }] },
    ],
  },

  // ---------- Experiência ----------
  experiencia: {
    titulo: "Experiência",
    itens: [
      { periodo: "2024 — hoje", cargo: "Seu cargo atual", local: "Empresa / Freelancer", descricao: "O que você fez e qual foi o resultado." },
      { periodo: "2022 — 2024", cargo: "Cargo anterior", local: "Outra empresa", descricao: "Resumo das responsabilidades e conquistas." },
      { periodo: "2021", cargo: "Formação / Curso", local: "Instituição", descricao: "Onde tudo começou." },
    ],
  },

  // ---------- Depoimentos (apague a seção de "sections" se não quiser) ----------
  depoimentos: {
    titulo: "O que dizem",
    itens: [
      { texto: "Depoimento de um cliente ou colega sobre o seu trabalho.", nome: "Nome Sobrenome", cargo: "Cargo, Empresa" },
      { texto: "Outro depoimento curto e sincero.", nome: "Outra Pessoa", cargo: "Cliente" },
    ],
  },

  // ---------- Contato ----------
  contato: {
    titulo: "Vamos conversar",
    texto: "Tem um projeto em mente ou quer bater um papo? Me mande uma mensagem.",
    email: "stug9000@gmail.com",
    // Para o formulário enviar de verdade, crie um form em formspree.io e cole aqui
    // o endpoint (ex.: "https://formspree.io/f/abcdwxyz"). Vazio = abre seu app de e-mail.
    formEndpoint: "",
    links: [
      { rotulo: "GitHub", url: "https://github.com/" },
      { rotulo: "LinkedIn", url: "https://linkedin.com/" },
      { rotulo: "Instagram", url: "https://instagram.com/" },
    ],
  },

  rodape: "© " + new Date().getFullYear() + " Gabriel. Feito à mão.",
};
