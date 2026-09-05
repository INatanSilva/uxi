// ---------------------------------------------------------------------------
// Conteúdo do site UXI.
//
// TUDO NESTE FICHEIRO É FICTÍCIO / PLACEHOLDER. Substituir pelos dados reais
// da UXI antes de ir para produção. Procurar por "TODO UXI".
// ---------------------------------------------------------------------------

// TODO UXI: confirmar canais de contacto reais.
export const contact = {
  // Números em formato internacional sem "+" nem espaços (para wa.me).
  whatsapp: [
    { label: 'WhatsApp 1', number: '351936319188' },
    { label: 'WhatsApp 2', number: '351966908909' },
  ],
  email: 'geral@uxi.pt', // TODO UXI: email real
};

export const whatsappHref = (number: string, text?: string) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const mailtoHref = (subject: string, body: string) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

// --- Hero -----------------------------------------------------------------
export const hero = {
  eyebrow: 'Estúdio de software',
  subtitle:
    'Desenhamos, programamos e evoluímos produtos digitais à medida — da landing page ao sistema completo.',
  primaryCta: 'Vamos conversar',
  secondaryCta: 'Ver serviços',
};

// Frases do campo animado do hero (também servem de "tipos de projeto").
export const projectPhrases = [
  'Quero uma landing page',
  'Quero uma aplicação web',
  'Quero uma app mobile',
  'Quero um e-commerce',
  'Quero automatizar processos',
  'Quero integrar sistemas',
  'Quero uma identidade visual',
  'Quero evoluir o meu produto',
];

// --- Serviços -----------------------------------------------------------
export interface Service {
  title: string;
  description: string;
  deliverables: string[];
}

// TODO UXI: rever serviços e descrições.
export const services: Service[] = [
  {
    title: 'Desenvolvimento Web',
    description:
      'Sites, landing pages e aplicações web rápidas, acessíveis e fáceis de manter.',
    deliverables: ['Next.js / React', 'SEO técnico', 'Painel de conteúdos'],
  },
  {
    title: 'Backend & APIs',
    description:
      'APIs robustas, autenticação, base de dados e lógica de negócio bem estruturada.',
    deliverables: ['REST / GraphQL', 'PostgreSQL', 'Testes automatizados'],
  },
  {
    title: 'Aplicações Mobile',
    description:
      'Apps iOS e Android a partir de uma única base de código, com boa performance.',
    deliverables: ['React Native', 'Publicação nas stores', 'Notificações push'],
  },
  {
    title: 'Sistemas Personalizados',
    description:
      'Ferramentas internas, dashboards e software feito à medida do vosso processo.',
    deliverables: ['Levantamento de requisitos', 'Dashboards', 'Gestão de acessos'],
  },
  {
    title: 'Integrações',
    description:
      'Ligamos os vossos sistemas: pagamentos, CRM, faturação, ERPs e serviços externos.',
    deliverables: ['Stripe / MB Way', 'Webhooks', 'Sincronização de dados'],
  },
  {
    title: 'Cloud & Infraestrutura',
    description:
      'Deploy, monitorização, backups e escalabilidade sem surpresas na fatura.',
    deliverables: ['Vercel / AWS', 'CI/CD', 'Observabilidade'],
  },
  {
    title: 'Manutenção & Evolução',
    description:
      'Acompanhamento contínuo: correções, melhorias e novas funcionalidades por sprint.',
    deliverables: ['Suporte dedicado', 'Roadmap partilhado', 'Relatórios mensais'],
  },
];

// --- Processo ---------------------------------------------------------
export interface ProcessStep {
  title: string;
  description: string;
}

export const process: ProcessStep[] = [
  { title: 'Conversamos', description: 'Ouvimos o problema, o contexto e os objetivos do negócio.' },
  { title: 'Entendemos', description: 'Mapeamos requisitos, riscos e o que traz mais valor primeiro.' },
  { title: 'Planeamos', description: 'Definimos âmbito, orçamento, prazos e um roadmap claro.' },
  { title: 'Desenvolvemos', description: 'Entregas curtas e frequentes, com feedback a cada sprint.' },
  { title: 'Testamos', description: 'Testes automatizados e validação com utilizadores reais.' },
  { title: 'Entregamos', description: 'Deploy, documentação e formação da vossa equipa.' },
  { title: 'Evoluímos', description: 'Acompanhamos as métricas e melhoramos de forma contínua.' },
];

// --- Cases / Portfólio -----------------------------------------------
export interface WorkCase {
  name: string;
  sector: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
}

// TODO UXI: substituir por cases reais (com autorização do cliente).
export const work: WorkCase[] = [
  {
    name: 'PsyConnect',
    sector: 'Saúde / Marcações',
    problem: 'Marcações por telefone e folhas de cálculo geravam erros e horas perdidas.',
    solution: 'Plataforma web de agendamento com pagamentos e área de cliente.',
    result: 'Menos 70% de tempo administrativo e marcações 24/7.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
  },
  {
    name: 'AVAX Logística',
    sector: 'Transportes',
    problem: 'Sem visibilidade em tempo real das entregas e da frota.',
    solution: 'Dashboard de operações com tracking, alertas e relatórios.',
    result: 'Decisões mais rápidas e redução de atrasos nas rotas.',
    tech: ['Next.js', 'Mapbox', 'WebSockets'],
  },
  {
    name: 'Loja Nortada',
    sector: 'Retalho / E-commerce',
    problem: 'Loja online lenta e difícil de gerir, com baixa conversão.',
    solution: 'Migração para stack moderna, checkout simplificado e painel próprio.',
    result: 'Site 3x mais rápido e aumento da taxa de conversão.',
    tech: ['Next.js', 'Shopify', 'Tailwind'],
  },
];

// --- Sobre / Equipa -------------------------------------------------
export interface Founder {
  name: string;
  role: string;
  bio: string;
  github?: string;
  linkedin?: string;
}

// TODO UXI: nomes, funções, bios e links reais dos sócios.
export const founders: Founder[] = [
  {
    name: 'Natan Silva',
    role: 'Desenvolvimento & Arquitetura',
    bio: 'Foca-se em backend, integrações e em manter o código simples e escalável.',
    github: 'https://github.com/INatanSilva',
  },
  {
    name: 'Sócio (placeholder)',
    role: 'Produto & Front-end',
    bio: 'Cuida da experiência do utilizador, do design de interface e do front-end.',
  },
];

export const about = {
  title: 'Somos a UXI',
  text: 'Uma equipa pequena de programadores em Portugal. Trabalhamos de perto com cada cliente, sem intermediários, e entregamos software que dá para manter e evoluir.',
};

// --- Navegação ------------------------------------------------------
export const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Processo' },
  { href: '#trabalho', label: 'Trabalho' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contacto', label: 'Contacto' },
];
