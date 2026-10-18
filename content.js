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
    // As cores ficam nos tokens do topo do style.css (paleta Tokyo Night, cada
    // cor com uma função fixa: azul = caminho, ciano = comando, verde = sucesso,
    // amarelo = branch/em andamento, magenta = palavra-chave, vermelho = erro).
    mode: "dark",          // "dark" | "light" | "auto" (o visitante pode alternar)
    font: "Inter",         // fonte do Google Fonts ("" = fonte do sistema)
    mono: "JetBrains Mono", // fonte monoespaçada: títulos de seção, tags e terminais
    radius: "10px",        // arredondamento dos cards

    intro: true,           // tela de abertura animada
    particles: false,      // fundo de partículas interativas
    cursor: false,         // brilho/anel que segue o mouse (só desktop)
    tilt: false,           // cards que inclinam em 3D
  },

  // Prompt estilo Powerlevel10k usado nos títulos de seção:
  //   [usuario] [dir da seção] [branch]
  //   ❯ comando
  prompt: { usuario: "gabriel", branch: "main" },

  meta: {
    title: "Gabriel Stuginski — DevOps & SRE",
    description: "Portfólio de Gabriel Stuginski Lima: DevOps & SRE com AWS, Terraform, Ansible, Docker e CI/CD.",
  },

  // Ordem e visibilidade das seções (apague uma linha para esconder)
  // "depoimentos" está fora até você ter depoimentos reais.
  sections: ["sobre", "pipeline", "servicos", "projetos", "habilidades", "experiencia", "contato"],

  // ---------- Topo ----------
  hero: {
    saudacao: "Olá, eu sou",
    nome: "Gabriel Stuginski",
    // Frases que ficam sendo digitadas
    roles: ["DevOps & SRE", "Infraestrutura como Código", "Pipelines de CI/CD", "AWS · Terraform · Ansible"],
    resumo: "Analista de Sistemas formado, com foco em DevOps e SRE. Gosto de transformar deploy manual em pipeline e servidor \"configurado na mão\" em playbook versionado.",
    status: "status: disponível",                // "" para ocultar
    foto: "img/eu.webp",                          // foto pequena ao lado do nome ("" mostra a inicial)
    // Bloco "Terraform" ao lado do texto (igual ao README do GitHub).
    // Cada item do array vira uma linha de código.
    codigo: {
      arquivo: "main.tf",
      linhas: [
        'resource "developer" "gabriel_stuginski" {',
        '  formacao = "Análise e Desenvolvimento de Sistemas"',
        '  foco     = ["DevOps", "SRE"]',
        '  cloud    = ["AWS EC2", "ECS", "RDS"]',
        '  iac      = ["Terraform", "Ansible"]',
        '  ci_cd    = ["GitHub Actions", "Docker"]',
        '  observe  = ["OpenTelemetry", "Grafana"]',
        '  status   = "provisionado e em produção"',
        '}',
      ],
      saida: "✓ Plan: 1 to add, 0 to change, 0 to destroy.",
    },
    botoes: [
      { texto: "Ver projetos", link: "#projetos", primario: true },
      { texto: "Falar comigo", link: "#contato" },
    ],
  },

  // Faixa de tecnologias que rola sozinha (apague o array para ocultar)
  marquee: ["AWS", "EC2", "ECS", "RDS", "Terraform", "Ansible", "Docker", "Kubernetes", "GitHub Actions", "Linux", "Bash", "Go", "OpenTelemetry", "Grafana"],

  // ---------- Sobre ----------
  // "dir" e "comando": prompt do título de cada seção (sem "comando", usa o "titulo").
  sobre: {
    titulo: "Sobre mim",
    dir: "~/sobre",
    comando: "cat sobre.md",
    texto: [
      "Sou Analista de Sistemas formado em Análise e Desenvolvimento de Sistemas e direcionei minha carreira para DevOps e SRE. Tenho prática com AWS (EC2, RDS, ECS e outros serviços), Infraestrutura como Código com Terraform e automação de servidores com Ansible.",
      "Meu ciclo de trabalho vai do commit à produção: build e testes no GitHub Actions, imagem Docker, infraestrutura com Terraform + Ansible, deploy em EC2/ECS e observabilidade com OpenTelemetry e Grafana, usando SLOs e error budget como feedback.",
    ],
    destaques: [
      // Cards de métrica estilo Grafana. "metrica" = nome em mono no topo;
      // "serie" = pontos do mini-gráfico (opcional; sem ela, é gerado um crescimento até o valor).
      { valor: 14, sufixo: "", metrica: "github_repos_total", rotulo: "repositórios públicos" },
      { valor: 5, sufixo: "", metrica: "ci_pipelines", rotulo: "pipelines em um só projeto" },
      { valor: 7, sufixo: "", metrica: "iac_projects", rotulo: "projetos de IaC e CI/CD" },
    ],
    cv: "",   // ex.: "cv.pdf" (aparece um botão "Baixar CV")

    // Terminal de apresentação. Mesma convenção da pipeline:
    // "$ " = comando digitado, "✓ " = saída de sucesso, resto = saída normal.
    // "prontas": quantas linhas já aparecem escritas; o resto é digitado.
    // Apague o bloco "terminal" inteiro para ocultar.
    terminal: {
      titulo: "gabriel@ops — zsh",
      prontas: 4,
      linhas: [
        "$ whoami",
        "Gabriel Stug",
        "$ terraform apply -auto-approve",
        "✓ Apply complete! Resources: 12 added, 0 changed, 0 destroyed.",
        "$ ansible-playbook -i production.yml site.yml",
        "✓ ok=24  changed=6  unreachable=0  failed=0",
        "$ docker ps --filter status=running",
        "NAME             STATUS",
        "✓ srta-executiva  Up (healthy)",
      ],
    },
  },

  // ---------- Pipeline animada (meu ciclo DevOps) ----------
  // Cada etapa acende em sequência e o terminal mostra as linhas de "log".
  // O log é uma simulação ilustrativa.
  pipeline: {
    titulo: "Do commit à produção",
    dir: "~/pipeline",
    comando: "gh run watch",
    menu: "Pipeline",
    texto: "Meu fluxo: trabalho na branch dev e abro um pull request para a main. A CI roda de novo, a imagem é construída e o Terraform gera o plano. Quem aprova revisa o plano; só depois o apply e o deploy rodam, e um smoke test confirma que a versão nova está no ar. Se ele falhar, o rollback é automático.",
    arquivo: "cd-production.yml",
    arquivoUrl: "",                          // link do arquivo real no GitHub (só funciona se o repositório for público)
    projeto: "baseado no Costura_pro",       // "" para ocultar
    feedback: "feedback: SLO e Error Budget",
    // A cada "cada" execuções, a etapa "etapa" falha e a animação mostra o rollback.
    falha: {
      etapa: "Smoke test",
      cada: 3,
      log: ["✗ curl: (22) The requested URL returned error: 503", "↩ rollback automático: app:$PREV restaurada", "✓ versão anterior no ar · deploy revertido"],
    },
    etapas: [
      { icone: "git", nome: "Commit", ferramenta: "branch dev", log: ["$ git push origin dev", "→ CI disparada na branch dev"] },
      { icone: "code", nome: "Pull request", ferramenta: "dev → main", log: ["$ gh pr create --base main --head dev", "$ gh pr merge --merge", "✓ CI verde e PR mergeado na main"] },
      { icone: "box", nome: "Build & Push", ferramenta: "Docker · Docker Hub", log: ["$ docker buildx build -t app:$SHA --push .", "✓ imagem app:$SHA publicada no Docker Hub"] },
      { icone: "layers", nome: "Plan", ferramenta: "Terraform plan", log: ["$ terraform plan -out=tfplan", "✓ Plan: 0 to add, 1 to change, 0 to destroy."] },
      { icone: "shield", nome: "Aprovação", ferramenta: "GitHub Environments", log: ["→ production aguardando aprovação (plano anexado)", "✓ plano revisado e deploy aprovado"] },
      { icone: "rocket", nome: "Deploy", ferramenta: "Terraform apply · Ansible", log: ["$ terraform apply tfplan", "$ ansible-playbook -i production.yml playbook.yml", "✓ Apply complete! Resources: 0 added, 1 changed, 0 destroyed.", "✓ container app:$SHA atualizado na EC2"] },
      { icone: "flask", nome: "Smoke test", ferramenta: "curl · /api/health", log: ["$ curl -fsS https://app/api/health  (retry até 3 min)", "✓ HTTP 200 — deploy OK"] },
      { icone: "chart", nome: "Pós-deploy", ferramenta: "OpenTelemetry · Grafana", log: ["→ métricas e traces chegando no Grafana", "✓ SLO 99,9% dentro do error budget"] },
    ],
  },

  // ---------- Serviços / O que faço ----------
  servicos: {
    titulo: "O que eu faço",
    dir: "~/servicos",
    comando: "ls",
    itens: [
      // "icone": cloud, layers, refresh, chart, git, flask, box, rocket, server, terminal, shield, code, book
      { icone: "cloud", titulo: "Cloud AWS", descricao: "Provisionamento e deploy em EC2, ECS e RDS." },
      { icone: "layers", titulo: "Infraestrutura como Código", descricao: "Terraform para criar a infra e Ansible para configurá-la, tudo versionado." },
      { icone: "refresh", titulo: "CI/CD", descricao: "Pipelines no GitHub Actions: build, testes, imagem Docker, deploy e teste de carga." },
      { icone: "chart", titulo: "SRE & Observabilidade", descricao: "Health checks, métricas, rollback, SLOs e monitoramento com OpenTelemetry e Grafana." },
    ],
  },

  // ---------- Projetos ----------
  // "diagrama": etapas da arquitetura, desenhadas no lugar do print quando
  // o projeto não tem "imagem". Mesmos ícones dos serviços.
  // "estado": badge do card — "deployed" (verde), "in progress" (amarelo) ou "lab" (cinza).
  projetos: {
    titulo: "Projetos",
    dir: "~/projetos",
    comando: "ls -la",
    itens: [
      {
        nome: "Kenedy Signato — Landing page",
        descricao: "Landing page para um produtor de conteúdo e gestor de tráfego com clientes no Brasil e nos EUA. Site estático, rápido e sem dependências, publicado na borda da Cloudflare e focado em converter visitas em conversas no WhatsApp.",
        tags: ["Frontend"],
        link: "https://kenedysignato.com.br",
        repo: "",
        imagem: "",
        estado: "deployed",
        diagrama: [
          { icone: "git", nome: "GitHub", sub: "push na main" },
          { icone: "rocket", nome: "Cloudflare Pages", sub: "deploy automático" },
          { icone: "shield", nome: "CDN + SSL", sub: "kenedysignato.com.br" },
        ],
        detalhes: {
          papel: "Freelance",
          longa: [
            "Kenedy Signato trabalha com roteiro, edição de vídeo e tráfego pago e precisava de um site que apresentasse seus serviços e clientes e levasse o visitante direto para o WhatsApp.",
            "Site estático, rápido e sem dependências, publicado na borda da Cloudflare: cada push na main dispara o deploy automático no Cloudflare Pages, e a CDN entrega o site com SSL no domínio próprio.",
          ],
          stack: ["HTML", "CSS", "JavaScript", "Cloudflare Pages", "CDN", "SEO"],
          galeria: [],
        },
      },
      {
        nome: "Srta Executiva",
        descricao: "Sistema de gestão para um ateliê de costura real: pedidos em Kanban, relatórios e exportação em PDF/Excel. Deu origem à ideia do CosturaPro.",
        tags: ["Fullstack", "IaC", "AWS"],
        link: "",
        repo: "",
        imagem: "img/srtaexecutiva-relatorios.webp",
        estado: "deployed",
        diagrama: [
          { icone: "layers", nome: "Terraform", sub: "provisiona" },
          { icone: "terminal", nome: "Ansible", sub: "configura" },
          { icone: "box", nome: "Docker", sub: "Express" },
          { icone: "server", nome: "EC2", sub: "SQLite local" },
        ],
        detalhes: {
          papel: "Desenvolvedor Full-stack & DevOps",
          longa: [
            "Sistema de gestão feito sob medida para a Srta Executiva, um ateliê de costura real: os pedidos passam por um quadro Kanban (aguardando, em produção, finalizado, entregue), com cadastro de clientes, catálogo de serviços e histórico de cada solicitação.",
            "Chegou a processar mais de 580 pedidos entregues em uso real pela equipe. Os relatórios têm exportação em PDF e Excel e aviso automático por WhatsApp. Foi este projeto que deu a ideia para o CosturaPro, uma versão mais ampla do mesmo conceito.",
            "Roda em uma instância EC2 provisionada com Terraform e configurada com Ansible, com a aplicação em container Docker e deploy manual (sem pipeline de CI/CD). O banco é SQLite na própria instância: uma escolha deliberada para um sistema de um único ateliê, com poucos usuários simultâneos, que não justificava o custo e a operação de um banco gerenciado.",
          ],
          stack: ["React 19", "TypeScript", "Express", "SQLite", "Docker", "Terraform", "Ansible", "AWS EC2"],
          galeria: [
            "img/srtaexecutiva-login.webp",
            "img/srtaexecutiva-solicitacoes.webp",
            "img/srtaexecutiva-detalhes.webp",
            "img/srtaexecutiva-servicos.webp",
          ],
        },
      },
      {
        nome: "FinançasPro",
        descricao: "Plataforma web fullstack de gestão financeira pessoal, com deploy automatizado em AWS via CI/CD. Projeto de conclusão de curso.",
        tags: ["Fullstack", "CI/CD", "AWS", "IaC"],
        link: "",
        repo: GH + "FINAN-ASPRO",
        imagem: "img/financaspro-painel.webp",
        estado: "deployed",
        diagrama: [
          { icone: "git", nome: "GitHub", sub: "push" },
          { icone: "refresh", nome: "Actions", sub: "CI/CD" },
          { icone: "box", nome: "Docker", sub: "imagem" },
          { icone: "cloud", nome: "EC2", sub: "Terraform" },
          { icone: "server", nome: "Supabase", sub: "Postgres" },
        ],
        detalhes: {
          papel: "Desenvolvedor Fullstack & DevOps",
          ano: "TCC",
          longa: [
            "O FinançasPro é uma aplicação web fullstack desenvolvida como projeto de conclusão de curso, com o objetivo de oferecer uma solução completa de controle financeiro pessoal. O sistema permite ao usuário cadastrar e acompanhar receitas e despesas, gerenciar cartões de crédito, definir orçamentos por categoria, criar metas de economia e visualizar transações em um quadro estilo Kanban.",
            "A aplicação foi construída com foco em boas práticas de desenvolvimento, segurança (autenticação JWT, RLS no banco de dados) e infraestrutura moderna, com deploy automatizado via CI/CD.",
          ],
          stack: ["React 19", "TypeScript", "Supabase (Postgres)", "Docker", "Terraform", "Ansible", "AWS EC2", "GitHub Actions"],
          galeria: [
            "img/financaspro-transacoes.webp",
            "img/financaspro-cartoes.webp",
            "img/financaspro-calendario.webp",
            "img/financaspro-heatmap.webp",
          ],
        },
      },
      {
        nome: "DOCKER-CI",
        descricao: "API REST em Go com cinco pipelines no GitHub Actions: testes, imagem Docker, deploy em EC2 e ECS e teste de carga.",
        tags: ["CI/CD", "AWS", "Docker"],
        link: "", repo: GH + "DOCKER-CI", imagem: "", estado: "lab",
        diagrama: [
          { icone: "git", nome: "GitHub", sub: "push" },
          { icone: "refresh", nome: "Actions", sub: "go test" },
          { icone: "box", nome: "Docker Hub", sub: "imagem" },
          { icone: "server", nome: "EC2 · ECS", sub: "deploy" },
        ],
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
        link: "", repo: GH + "iac-terraform-ansible", imagem: "", estado: "lab",
        diagrama: [
          { icone: "layers", nome: "Terraform", sub: "plan · apply" },
          { icone: "cloud", nome: "AWS EC2", sub: "instância" },
          { icone: "terminal", nome: "Ansible", sub: "SSH" },
          { icone: "server", nome: "Web server", sub: "no ar" },
        ],
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
        link: "", repo: GH + "WordPress-Stack-Automatizado-com-Ansible", imagem: "", estado: "lab",
        diagrama: [
          { icone: "terminal", nome: "Ansible", sub: "roles" },
          { icone: "server", nome: "VM web", sub: "Apache · WP" },
          { icone: "server", nome: "VM db", sub: "MySQL" },
        ],
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
        nome: "CosturaPro",
        descricao: "Sistema de gestão para ateliês de costura: pedidos em Kanban, cadastro de clientes, catálogo de serviços e relatórios.",
        tags: ["Fullstack", "SaaS", "AWS", "CI/CD", "IaC"],
        link: "", repo: "", imagem: "img/costurapro-dashboard.webp",
        estado: "in progress",
        diagrama: [
          { icone: "git", nome: "GitHub", sub: "PR → main" },
          { icone: "refresh", nome: "Actions", sub: "CI/CD" },
          { icone: "box", nome: "Docker Hub", sub: "imagem" },
          { icone: "cloud", nome: "ECS", sub: "deploy" },
          { icone: "server", nome: "RDS", sub: "banco" },
        ],
        detalhes: {
          papel: "Desenvolvedor Full-stack", ano: "2026",
          longa: [
            "Sistema de gestão para ateliês de costura e confecção: pedidos organizados em Kanban (aguardando, em produção, finalizado, entregue), cadastro de clientes, catálogo de serviços com preços e relatórios com indicadores financeiros e ranking de vendedores.",
            "Ainda em desenvolvimento, e aqui o foco é a infraestrutura: deploy na AWS com ECS e banco no RDS, em vez do banco local usado na Srta Executiva. É o projeto usado como referência na pipeline de CI/CD mostrada na seção anterior.",
          ],
          stack: ["Docker", "Terraform", "Ansible", "GitHub Actions", "AWS ECS", "AWS RDS"],
          galeria: ["img/costurapro-relatorios.webp"],
        },
      },
      {
        nome: "SRE Nível 1",
        descricao: "Ciclo de vida de uma API em produção: testes, container, deploy com health check, rollback e monitoramento.",
        tags: ["SRE", "CI/CD", "Docker"],
        link: "", repo: GH + "sre-prova-nivel1", imagem: "", estado: "lab",
        diagrama: [
          { icone: "git", nome: "Push", sub: "PR" },
          { icone: "flask", nome: "pytest", sub: "Actions" },
          { icone: "box", nome: "Docker", sub: "deploy" },
          { icone: "shield", nome: "/health", sub: "valida" },
          { icone: "refresh", nome: "Rollback", sub: "se falhar" },
        ],
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

  // ---------- Habilidades, como saída do kubectl get ----------
  // Cada nível vira um grupo de linhas na tabela. "status" é a coluna STATUS:
  // "Running" (verde), "Completed" (cinza) ou "Pending" (âmbar).
  // "chave": palavras procuradas na stack dos projetos; onde houver, aparece
  // "usado em <projeto>" (clicável). Mova as skills entre os níveis conforme a
  // sua experiência real.
  habilidades: {
    titulo: "Habilidades",
    dir: "~/skills",
    comando: "kubectl get skills",
    niveis: [
      {
        nome: "Uso frequente",
        nivel: "frequente",
        status: "Running",
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
        nivel: "ocasional",
        status: "Completed",
        itens: [
          { nome: "Observabilidade (OpenTelemetry, Grafana)", chave: ["Grafana", "OpenTelemetry"] },
          { nome: "Redes (VLANs)", chave: ["VLAN"] },
        ],
      },
      {
        nome: "Estudando",
        nivel: "estudando",
        status: "Pending",
        itens: [
          { nome: "Kubernetes", chave: ["Kubernetes"] },
          { nome: "Docker Scout", chave: ["Docker Scout"] },
          { nome: "Trivy", chave: ["Trivy"] },
        ],
      },
    ],
  },

  // ---------- Formação & Trajetória, como saída do git log ----------
  // Do mais recente para o mais antigo (igual ao git log).
  // "status": "ok" (✓ verde), "fail" (✗ vermelho) ou "wip" (● amarelo, em andamento).
  // "refs": rótulos entre parênteses, ex.: "HEAD -> main", "tag: v1.0", "initial".
  // "detalhe" e "projeto" (opcionais): aparecem ao clicar no commit, como um git show;
  // "projeto" é o nome exato de um projeto da seção Projetos e vira um link para ele.
  // O hash é gerado a partir da mensagem; para fixar um, use "hash".
  experiencia: {
    titulo: "Formação & Trajetória",
    dir: "~/trajetoria",
    comando: "git log --oneline --graph",
    commits: [
      { refs: "HEAD -> main", status: "wip", data: "hoje", msg: "Estudando Docker Scout e Trivy; próximo passo: projeto prático com Kubernetes e observabilidade" },
      { status: "ok", data: "set/2026", msg: "Kubernetes: orquestração, Pods, Services e ConfigMaps · formação DevOps concluída (224h)",
        detalhe: "Orquestrar aplicações, escalabilidade e segurança (16h) e Pods, Services e ConfigMaps (8h), fechando as 224h da formação DevOps na Alura." },
      { refs: "tag: v1.0", status: "ok", data: "jul/2026", msg: "Formado em Análise e Desenvolvimento de Sistemas · TCC FinançasPro com deploy na AWS",
        detalhe: "TCC: FinançasPro, aplicação fullstack de finanças pessoais com deploy automatizado na AWS via CI/CD.", projeto: "FinançasPro" },
      { status: "ok", data: "jul/2026", msg: "Checkpoint SRE Nível 1: deploy, rollback e monitoramento · observabilidade com OpenTelemetry e Grafana",
        detalhe: "Checkpoint SRE - Nível 1 e Integrar métricas, logs e traces com OpenTelemetry e Grafana (8h).", projeto: "SRE Nível 1" },
      { status: "ok", data: "jun/2026", msg: "CI/CD na AWS: deploy em EC2 e ECS, rollback e teste de carga",
        detalhe: "Pipeline de entrega contínua na EC2, deploy automatizado no Amazon ECS e rollback com teste de carga (24h).", projeto: "DOCKER-CI" },
      { status: "ok", data: "mai/2026", msg: "Redes: intranet, VLANs e políticas de acesso",
        detalhe: "Dos conceitos iniciais à criação de uma intranet (12h) e projeto com VLANs, políticas de acesso e conexão com a internet (8h)." },
      { status: "ok", data: "abr/2026", msg: "SRE e Entrega Contínua: confiabilidade, métricas e Error Budget",
        detalhe: "SRE: confiabilidade dos sistemas, métricas, Error Budget e resiliência (18h); Entrega Contínua e GitHub Actions com segurança (16h)." },
      { status: "ok", data: "fev/2026", msg: "Linux a fundo: terminal, usuários, permissões e processos",
        detalhe: "Trilha Linux Onboarding e gerenciamento de diretórios, arquivos, permissões e processos (34h)." },
      { status: "ok", data: "jan/2026", msg: "IaC com Terraform + Ansible e primeiros pipelines no GitHub Actions",
        detalhe: "Máquinas na AWS com Ansible e Terraform (8h), Ansible como IaC (10h) e pipelines com testes e Docker no GitHub Actions (16h).", projeto: "IaC com Terraform + Ansible" },
      { status: "ok", data: "nov/2025", msg: "Início da trilha DevOps: Linux, tráfego seguro, GitHub e Docker",
        detalhe: "Linux CLI, tráfego seguro em comunicações web, repositórios no GitHub e containers com Docker (30h)." },
      { refs: "initial", status: "fail", data: "nov/2024", msg: "Primeiro projeto da faculdade: cadastro em Node + MySQL. Não funcionou, mas foi onde tudo começou" },
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
    dir: "~/contato",
    comando: "ssh gabriel@contato",
    texto: "Procurando alguém para automatizar infraestrutura, montar pipelines ou cuidar da confiabilidade dos seus sistemas? Me mande uma mensagem.",
    email: "stug9000@gmail.com",
    // Para o formulário enviar de verdade, crie um form em formspree.io e cole aqui
    // o endpoint (ex.: "https://formspree.io/f/abcdwxyz"). Vazio = abre seu app de e-mail.
    formEndpoint: "https://formspree.io/f/xeaopnjn",
    cv: "",   // ex.: "cv-gabriel-stuginski.pdf" (coloque o PDF na raiz do projeto); "" oculta o botão
    links: [
      { rotulo: "GitHub", url: "https://github.com/STUG9000" },
      // { rotulo: "LinkedIn", url: "https://linkedin.com/in/SEU-USUARIO" },
    ],
  },

  rodape: "© " + new Date().getFullYear() + " Gabriel Stuginski Lima.",
  assinatura: "BY GABRIEL STUG",   // "" para ocultar
  // Linhas de log decorativas no rodapé ([] para ocultar)
  rodapeLog: [
    "[INFO] build #142 passed",
    "[INFO] uptime 99.9%",
    "[OK] all systems operational",
  ],
};
