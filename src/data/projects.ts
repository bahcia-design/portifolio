export type Project = {
  /** Slug único, usado como id/âncora */
  slug: string;
  /** Título em destaque (esquerda) */
  title: string;
  /** Frase curta de apoio */
  subtitle: string;
  /** Descrição / contexto */
  description: string;
  /** Setor (ex: "Engenharia e Construção") */
  sector?: string;
  /** Cliente final (opcional) */
  client?: string;
  /** Desafio(s) — problema */
  challenge?: string[];
  /** Solução(ões) */
  solution?: string[];
  /** Impacto(s) / resultado */
  impact?: string[];
  /** Solução + impacto em um parágrafo só (alternativa aos bullets) */
  outcome?: string;
  /** Tags para o filtro futuro */
  tags: string[];
  /** Cor de fundo da seção */
  bg: string;
  /** Cor do texto sobre o fundo */
  fg: string;
  /** Cor de destaque (títulos, detalhes) */
  accent: string;
  /** Mídia à direita: imagem ou vídeo (defina depois) */
  media?: {
    type: "image" | "video";
    src: string;
    alt?: string;
  };
  /** Protótipo do Figma embutido (iframe) à direita — tem prioridade sobre `media` */
  figmaEmbed?: string;
  /** Simulação de uso do app: telas reais em autoplay (tem prioridade sobre tudo) */
  appDemo?: {
    frames: {
      src?: string;
      component?: "home" | "trem" | "mapa";
      tap?: { x: number; y: number };
      enter?: "push" | "modal" | "fade";
      hold?: number;
    }[];
  };
  /** Projeto desktop/web: mostra numa moldura de navegador (em vez do celular) */
  desktop?: { src: string; alt?: string };
  /** Projeto responsivo: mostra web (navegador) + mobile (celular) lado a lado */
  responsive?: { web: string; mobile: string; alt?: string };
  /** Carrossel de telas (imagens) no celular — passa sozinho, em loop */
  carousel?: { images: string[] };
};

export const projects: Project[] = [
  {
    slug: "banco-white-label",
    title: "Banco white label",
    subtitle: "Crédito corporativo simplificado",
    description:
      "App bancário corporativo white label: saldo, Pix, atalhos e crédito com análise rápida. Desafio: reunir muita informação financeira numa home escura, clara e escaneável.",
    tags: ["Mobile", "Fintech", "Design System"],
    bg: "#0A2A28",
    fg: "#FFFFFF",
    accent: "#2DD4BF",
    carousel: {
      images: [
        "/projects/globals/01-home.png",
        "/projects/globals/02-menu.png",
        "/projects/globals/03-area-pix.png",
        "/projects/globals/04-valor.png",
        "/projects/globals/05-revisao.png",
        "/projects/globals/06-pin.png",
        "/projects/globals/07-sucesso.png",
        "/projects/globals/08-pagar.png",
      ],
    },
  },
  {
    slug: "inspecao-trem",
    title: "Inspeção de trem",
    subtitle: "Inspeção de linhas ferroviárias, em campo e offline",
    sector: "Engenharia e Construção",
    description:
      "Desenhar um app de inspeção ferroviária para uso em campo: simples e legível sob sol forte, para um público mais velho, mesmo carregando muita informação técnica como coordenadas, trajetos e pontos de inspeção.",
    outcome:
      "Como impacto, foi entregue um app com o mapa no centro: mostra sempre a via e onde o técnico está, sinaliza pendências já resolvidas ou não, e deixa registrar ocorrências e pausar ou retomar a inspeção de onde parou. Tudo pensado com foco em acessibilidade e leitura rápida.",
    tags: ["Mobile", "UX/UI", "Acessibilidade"],
    bg: "#0D2340",
    fg: "#FFFFFF",
    accent: "#3B82F6",
    carousel: {
      images: [
        "/projects/trem/01-mapa.png",
        "/projects/trem/02-ocorrencia.png",
        "/projects/trem/03-novo-elemento.png",
        "/projects/trem/04-inspecao.png",
        "/projects/trem/05-gestao.png",
      ],
    },
  },
  {
    slug: "antecipacao-recebiveis",
    title: "Antecipação de recebíveis",
    subtitle: "Backoffice de gestão de usuários e recebíveis",
    description:
      "Painel web (backoffice) de uma ferramenta de antecipação de recebíveis: gestão de colaboradores, empresas e recebíveis, com papéis e permissões. Desafio: densidade de dados em tabelas sem perder a leitura.",
    tags: ["Web", "Backoffice", "Design System"],
    bg: "#1E293B",
    fg: "#FFFFFF",
    accent: "#2DD4BF",
    desktop: {
      src: "/projects/backoffice/01-cadastrados.png",
      alt: "Backoffice · gestão de usuários",
    },
    carousel: {
      images: [
        "/projects/backoffice/01-cadastrados.png",
        "/projects/backoffice/01-dash.png",
      ],
    },
  },
  {
    slug: "marketplace-veiculos-pesados",
    title: "Marketplace de veículos pesados",
    subtitle: "Compra e venda de caminhões e veículos pesados",
    sector: "Marketplace automotivo",
    description:
      "Repensar de ponta a ponta um marketplace de caminhões e veículos pesados: um redesign completo do portal público e do backoffice, deixando busca, anúncios e a gestão das lojas mais claros e fáceis de usar.",
    outcome:
      "Como impacto, a plataforma ganhou uma interface nova e consistente: home com busca em destaque, listagem com filtros ricos (marca, categoria, preço, câmbio e mais), páginas de veículo e de loja repaginadas e um backoffice completo para anúncios, leads, planos e equipe. Tudo apoiado por um design system que mantém a experiência coerente do público ao administrativo.",
    tags: ["Web", "UX/UI", "Redesign"],
    bg: "#0F2A43",
    fg: "#FFFFFF",
    accent: "#F5851F",
    desktop: {
      src: "/projects/truckhaven/01-home.png",
      alt: "Marketplace de veículos pesados · portal público",
    },
    carousel: {
      images: [
        "/projects/truckhaven/01-home.png",
        "/projects/truckhaven/02-comprar.png",
        "/projects/truckhaven/03-vender.png",
      ],
    },
  },
  {
    slug: "plataforma-nutricao",
    title: "Plataforma de nutrição",
    subtitle: "Cardápios de nutrição, do backoffice ao celular do aluno",
    sector: "Nutrição · SaaS",
    description:
      "Desenhar uma ferramenta para o nutricionista montar cardápios semanais para os alunos e entregar isso numa visão simples e bonita. O produto precisava funcionar no backoffice (desktop) e, principalmente, na mão do aluno, com foco mobile-first.",
    outcome:
      "Como impacto, foi entregue um produto responsivo de ponta a ponta: um construtor de cardápio (quadro semanal por refeição) para o nutricionista e uma visão pública do plano para o aluno, com dias da semana, horários e receitas fáceis de navegar. A mesma identidade elegante se mantém do desktop ao celular.",
    tags: ["Mobile-first", "Web", "UX/UI"],
    bg: "#33261E",
    fg: "#FFFFFF",
    accent: "#E0A458",
    responsive: {
      web: "/projects/mealstudio/web-01-cardapio.png",
      mobile: "/projects/mealstudio/mob-01-cardapio.png",
      alt: "Plataforma de nutrição · cardápio semanal do aluno",
    },
  },
];
