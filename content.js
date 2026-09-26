// =====================================================================
//  EDITE APENAS ESTE ARQUIVO para mudar textos, projetos, cores,
//  efeitos e ordem das seções. Salve e recarregue a página (F5).
//  Campos com "" ficam ocultos. Imagens: coloque em uma pasta "img/"
//  e use o caminho, ex.: "img/foto.jpg".
// =====================================================================

const GH = "https://github.com/STUG9000/";

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
    title: "Gabriel Stuginski — DevOps & SRE",
    description: "Portfólio de Gabriel Stuginski Lima: DevOps & SRE com AWS, Terraform, Ansible, Docker e CI/CD.",
  },

  // Ordem e visibilidade das seções (apague uma linha para esconder)
  // "depoimentos" está fora até você ter depoimentos reais.
  sections: ["sobre", "pipeline", "servicos", "projetos", "feed", "estudos", "habilidades", "experiencia", "contato"],

  // ---------- Topo ----------
  hero: {
    saudacao: "Olá, eu sou",
    nome: "Gabriel Stuginski",
    // Frases que ficam sendo digitadas
    roles: ["DevOps & SRE", "Infraestrutura como Código", "Pipelines de CI/CD", "AWS · Terraform · Ansible"],
    resumo: "Analista de Sistemas formado, com foco em DevOps e SRE. Gosto de transformar deploy manual em pipeline e servidor \"configurado na mão\" em playbook versionado.",
    status: "Aberto a oportunidades",            // "" para ocultar
    foto: "",                                    // ex.: "img/eu.jpg"  ("" mostra a inicial do nome)
    badges: ["AWS", "Terraform", "Ansible", "Docker"],
    botoes: [
      { texto: "Ver projetos", link: "#projetos", primario: true },
      { texto: "Falar comigo", link: "#contato" },
    ],
  },

  // Faixa de tecnologias que rola sozinha (apague o array para ocultar)
  marquee: ["AWS", "EC2", "ECS", "RDS", "Terraform", "Ansible", "Docker", "Kubernetes", "GitHub Actions", "Linux", "Bash", "Go", "OpenTelemetry", "Grafana"],

  // ---------- Sobre ----------
  sobre: {
    titulo: "Sobre mim",
    cargoAtual: "DevOps & SRE",     // aparece no cartão de perfil, tipo o "título" do LinkedIn
    localizacao: "Brasil",          // "" para ocultar. Ex.: "São Paulo, SP"
    texto: [
      "Sou Analista de Sistemas formado em Análise e Desenvolvimento de Sistemas e direcionei minha carreira para DevOps e SRE. Tenho prática com AWS (EC2, RDS, ECS e outros serviços), Infraestrutura como Código com Terraform e automação de servidores com Ansible.",
      "Meu ciclo de trabalho vai do commit à produção: build e testes no GitHub Actions, imagem Docker, infraestrutura com Terraform + Ansible, deploy em EC2/ECS e observabilidade com OpenTelemetry e Grafana, usando SLOs e error budget como feedback.",
    ],
    destaques: [
      { valor: 14, sufixo: "", rotulo: "repositórios públicos" },
      { valor: 7, sufixo: "", rotulo: "projetos de IaC e CI/CD" },
      { valor: 5, sufixo: "", rotulo: "pipelines em um só projeto" },
    ],
    cv: "",   // ex.: "cv.pdf" (aparece um botão "Baixar CV")
  },

  // ---------- Pipeline animada (meu ciclo DevOps) ----------
  // Cada etapa acende em sequência e o terminal mostra as linhas de "log".
  // O log é uma simulação ilustrativa.
  pipeline: {
    titulo: "Do commit à produção",
    menu: "Pipeline",
    texto: "Meu fluxo: trabalho na branch dev e abro um pull request para a main. A CI roda de novo, a imagem é construída, o deploy espera aprovação e um smoke test confirma que a versão nova está no ar.",
    arquivo: "cd-production.yml",
    feedback: "feedback: SLO e Error Budget",
    etapas: [
      { icone: "git", nome: "Commit", ferramenta: "branch dev", log: ["$ git push origin dev", "→ CI disparada na branch dev"] },
      { icone: "code", nome: "Pull request", ferramenta: "dev → main", log: ["$ gh pr create --base main --head dev", "✓ CI verde: lint e testes passaram", "$ git merge dev → main"] },
      { icone: "box", nome: "Build & Push", ferramenta: "Docker · Docker Hub", log: ["$ docker buildx build -t app:$RUN --push .", "✓ imagem app:$RUN publicada no Docker Hub"] },
      { icone: "shield", nome: "Aprovação", ferramenta: "GitHub Environments", log: ["→ ambiente production aguardando aprovação", "✓ deploy aprovado"] },
      { icone: "rocket", nome: "Deploy", ferramenta: "Ansible · EC2", log: ["$ ansible-playbook -i production.yml playbook.yml", "✓ container app:$RUN atualizado na EC2"] },
      { icone: "flask", nome: "Smoke test", ferramenta: "curl · /api/health", log: ["$ curl -s https://app/api/health  (retry até 3 min)", "✓ HTTP 200 — deploy OK"] },
      { icone: "chart", nome: "Observabilidade", ferramenta: "OpenTelemetry · Grafana", log: ["→ métricas e traces chegando no Grafana", "✓ SLO 99,9% dentro do error budget"] },
    ],
  },

  // ---------- Serviços / O que faço ----------
  servicos: {
    titulo: "O que eu faço",
    itens: [
      // "icone": cloud, layers, refresh, chart, git, flask, box, rocket, server, terminal, shield, code, book
      { icone: "cloud", titulo: "Cloud AWS", descricao: "Provisionamento e deploy em EC2, ECS e RDS." },
      { icone: "layers", titulo: "Infraestrutura como Código", descricao: "Terraform para criar a infra e Ansible para configurá-la, tudo versionado." },
      { icone: "refresh", titulo: "CI/CD", descricao: "Pipelines no GitHub Actions: build, testes, imagem Docker, deploy e teste de carga." },
      { icone: "chart", titulo: "SRE & Observabilidade", descricao: "Health checks, métricas, rollback, SLOs e monitoramento com OpenTelemetry e Grafana." },
    ],
  },

  // ---------- Projetos ----------
  projetos: {
    titulo: "Projetos",
    itens: [
      {
        nome: "FinançasPro",
        descricao: "Plataforma web fullstack de gestão financeira pessoal, com deploy automatizado em AWS via CI/CD. Projeto de conclusão de curso.",
        tags: ["Fullstack", "CI/CD", "AWS"],
        link: "",
        repo: GH + "FINAN-ASPRO",
        imagem: "",
        cor: ["#7c5cff", "#22d3ee"],
        destaque: true,
        detalhes: {
          papel: "Desenvolvedor Fullstack & DevOps",
          ano: "TCC",
          longa: [
            "Aplicação para controlar receitas, despesas, cartões, orçamentos por categoria, metas de economia e transações recorrentes, com dashboard, calendário e um quadro Kanban de despesas (em aberto, vencidas e pagas).",
            "Foco em segurança (autenticação JWT, RLS no banco e proteção contra SQL Injection) e em infraestrutura moderna: aplicação containerizada com Docker e deploy em EC2 automatizado pelo GitHub Actions.",
          ],
          stack: ["React 19", "TypeScript", "Supabase", "Docker", "AWS EC2", "GitHub Actions"],
          galeria: [],
        },
      },
      {
        nome: "DOCKER-CI",
        descricao: "API REST em Go com cinco pipelines no GitHub Actions: testes, imagem Docker, deploy em EC2 e ECS e teste de carga.",
        tags: ["CI/CD", "AWS", "Docker"],
        link: "", repo: GH + "DOCKER-CI", imagem: "",
        cor: ["#2496ed", "#22d3ee"],
        detalhes: {
          papel: "DevOps", ano: "2026",
          longa: [
            "API de cadastro de alunos em Go (Gin + GORM) com PostgreSQL, mas o foco real do repositório são os pipelines de CI/CD.",
            "Workflows separados para build e testes (go test), build da imagem Docker, deploy em instância EC2, deploy no Amazon ECS e teste de carga.",
          ],
          stack: ["Go", "Gin", "PostgreSQL", "Docker", "GitHub Actions", "EC2", "ECS"],
          galeria: [],
        },
      },
      {
        nome: "IaC com Terraform + Ansible",
        descricao: "Provisionamento de uma instância EC2 com Terraform e configuração automática via Ansible.",
        tags: ["IaC", "AWS"],
        link: "", repo: GH + "iac-terraform-ansible", imagem: "",
        cor: ["#7b42bc", "#ee0000"],
        detalhes: {
          papel: "DevOps", ano: "2026",
          longa: [
            "O Terraform cria a instância EC2 na AWS; em seguida um playbook Ansible se conecta por SSH, prepara o ambiente e sobe um servidor web.",
            "Mostra o fluxo completo de Infraestrutura como Código: terraform init/plan/apply e depois ansible-playbook com inventário.",
          ],
          stack: ["Terraform", "Ansible", "AWS EC2", "Ubuntu", "WSL"],
          galeria: [],
        },
      },
      {
        nome: "WordPress automatizado com Ansible",
        descricao: "Stack WordPress com servidores web e banco separados, provisionada com um único comando.",
        tags: ["IaC", "Linux"],
        link: "", repo: GH + "WordPress-Stack-Automatizado-com-Ansible", imagem: "",
        cor: ["#ee0000", "#f97316"],
        detalhes: {
          papel: "DevOps", ano: "2026",
          longa: [
            "Automatiza um servidor web (Apache + PHP + WordPress) e um servidor de banco (MySQL/MariaDB) em VMs separadas.",
            "Organizado com roles e templates do Ansible: configuração do Apache, criação do banco e usuário, wp-config.php e liberação do acesso remoto ao MySQL.",
          ],
          stack: ["Ansible", "Apache", "PHP", "MySQL/MariaDB", "VirtualBox"],
          galeria: [],
        },
      },
      {
        nome: "SRE Nível 1",
        descricao: "Ciclo de vida de uma API em produção: testes, container, deploy com health check, rollback e monitoramento.",
        tags: ["SRE", "CI/CD", "Docker"],
        link: "", repo: GH + "sre-prova-nivel1", imagem: "",
        cor: ["#10b981", "#3b82f6"],
        detalhes: {
          papel: "SRE", ano: "2026",
          longa: [
            "API Flask com endpoints de health check e métricas (total de requisições e taxa de sucesso), testada com pytest a cada push/PR pelo GitHub Actions.",
            "Scripts de deploy (build + container + validação via /health), rollback para a versão anterior e monitoramento da saúde da aplicação.",
          ],
          stack: ["Python", "Flask", "pytest", "Docker", "Bash", "GitHub Actions"],
          galeria: [],
        },
      },
    ],
  },

  // ---------- Feed — fotos e posts sobre os projetos ----------
  // Os posts em si NÃO se editam aqui: publique, edite e apague pelo
  // painel /admin (peça a senha combinada com a IA). Aqui só o título
  // do menu. Se não houver posts, a seção some sozinha.
  feed: {
    titulo: "Atualizações",
    menu: "Feed",
  },

  // ---------- Estudando agora ----------
  // Também gerenciado pelo painel /admin, junto com o feed.
  estudos: {
    titulo: "Estudando agora",
    menu: "Estudos",
  },

  // ---------- Habilidades, agrupadas por nível ----------
  // "chave": palavras procuradas na stack dos projetos; onde houver, aparece
  // "usado em <projeto>" (clicável). Mova as skills entre os níveis conforme a
  // sua experiência real.
  habilidades: {
    titulo: "Habilidades",
    niveis: [
      {
        nome: "Uso frequente",
        desc: "O que uso nos meus projetos e pipelines.",
        itens: [
          { nome: "AWS (EC2, ECS, RDS)", chave: ["AWS", "EC2", "ECS"] },
          { nome: "Terraform", chave: ["Terraform"] },
          { nome: "Ansible", chave: ["Ansible"] },
          { nome: "Docker", chave: ["Docker"] },
          { nome: "GitHub Actions", chave: ["GitHub Actions"] },
          { nome: "Linux & Bash", chave: ["Bash", "Ubuntu"] },
        ],
      },
      {
        nome: "Já usei em projetos",
        desc: "Tenho prática, mas em menor escala.",
        itens: [
          { nome: "Observabilidade (OpenTelemetry, Grafana)", chave: ["Grafana", "OpenTelemetry"] },
          { nome: "Redes (VLANs)", chave: ["VLAN"] },
        ],
      },
      {
        nome: "Estudando",
        desc: "Em aprendizado agora.",
        itens: [
          { nome: "Kubernetes", chave: ["Kubernetes"] },
        ],
      },
    ],
  },

  // ---------- Experiência / Formação ----------
  experiencia: {
    titulo: "Formação & Trajetória",
    itens: [
      { periodo: "Formado", cargo: "Análise e Desenvolvimento de Sistemas", local: "Graduação", descricao: "Formação em desenvolvimento de sistemas; TCC: FinançasPro, aplicação fullstack com deploy automatizado na AWS." },
      { periodo: "Alura", cargo: "Site Reliability Engineering", local: "Curso", descricao: "Fundamentos de SRE: deploy, rollback, health checks, métricas e monitoramento." },
      { periodo: "Contínuo", cargo: "Projetos de DevOps", local: "GitHub", descricao: "Laboratórios de IaC, CI/CD e automação com AWS, Terraform, Ansible e Docker." },
    ],
  },

  // ---------- Depoimentos (adicione "depoimentos" em sections quando tiver) ----------
  depoimentos: {
    titulo: "O que dizem",
    itens: [],
  },

  // ---------- Contato ----------
  contato: {
    titulo: "Vamos conversar",
    texto: "Procurando alguém para automatizar infraestrutura, montar pipelines ou cuidar da confiabilidade dos seus sistemas? Me mande uma mensagem.",
    email: "stug9000@gmail.com",
    // Para o formulário enviar de verdade, crie um form em formspree.io e cole aqui
    // o endpoint (ex.: "https://formspree.io/f/abcdwxyz"). Vazio = abre seu app de e-mail.
    formEndpoint: "",
    cv: "",   // ex.: "cv-gabriel-stuginski.pdf" (coloque o PDF na raiz do projeto); "" oculta o botão
    links: [
      { rotulo: "GitHub", url: "https://github.com/STUG9000" },
      // { rotulo: "LinkedIn", url: "https://linkedin.com/in/SEU-USUARIO" },
    ],
  },

  rodape: "© " + new Date().getFullYear() + " Gabriel Stuginski Lima.",
};
