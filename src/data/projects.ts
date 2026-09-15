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
  /** Cliente final (ex: "Rumo") */
  client?: string;
  /** Desafio(s) — problema */
  challenge?: string[];
  /** Solução(ões) */
  solution?: string[];
  /** Impacto(s) / resultado */
  impact?: string[];
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
  /** Carrossel de telas (imagens) no celular — passa sozinho, em loop */
  carousel?: { images: string[] };
};

export const projects: Project[] = [
  {
    slug: "globals-one",
    title: "Globals One — banco digital",
    subtitle: "Crédito corporativo simplificado",
    description:
      "App bancário corporativo (Globals One / Lince): saldo, Pix, atalhos e crédito com análise rápida. Desafio: reunir muita informação financeira numa home escura, clara e escaneável.",
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
    title: "Project Data",
    subtitle: "Inspeção de linhas ferroviárias — em campo, offline",
    sector: "Engenharia e Construção",
    client: "Rumo",
    description:
      "A Globals atuou como desenvolvedora do Project Data, solução para manutenção de linhas férreas em ambientes remotos — com algoritmos próprios (teoremas matemáticos) que rastreiam posição e direção dos técnicos sem depender de internet.",
    challenge: [
      "Funcionar em campo sem sinal de internet ou Wi-Fi.",
      "As bibliotecas do React Native não detectavam com precisão a direção e os passos do técnico para posicioná-lo no mapa.",
    ],
    solution: [
      "Algoritmos próprios, baseados em teoremas matemáticos, para calcular a distância percorrida e a direção do técnico.",
      "Integração desses algoritmos ao app, superando as limitações das bibliotecas existentes.",
    ],
    impact: [
      "Aplicativo funcional em ambientes sem conectividade.",
      "Rastreamento preciso da posição e direção em campo, otimizando as manutenções ferroviárias.",
    ],
    tags: ["Mobile", "Offline-first", "React Native"],
    bg: "#0D2340",
    fg: "#FFFFFF",
    accent: "#3B82F6",
    appDemo: {
      frames: [
        { component: "trem", tap: { x: 50, y: 96 }, enter: "fade" },
        { component: "mapa", enter: "push", hold: 8600 },
      ],
    },
  },
  {
    slug: "backoffice-lince",
    title: "Backoffice Lince Digital",
    subtitle: "Gestão de usuários e recebíveis",
    description:
      "Painel web (backoffice) da Lince: gestão de colaboradores, empresas e recebíveis, com papéis e permissões. Desafio: densidade de dados em tabelas sem perder a leitura.",
    tags: ["Web", "Backoffice", "Design System"],
    bg: "#1E293B",
    fg: "#FFFFFF",
    accent: "#2DD4BF",
    desktop: {
      src: "/projects/backoffice/01-cadastrados.png",
      alt: "Backoffice Lince — Gestão de usuários",
    },
  },
];
