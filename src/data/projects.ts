export type Project = {
  /** Slug único, usado como id/âncora */
  slug: string;
  /** Título em destaque (esquerda) */
  title: string;
  /** Frase curta de apoio */
  subtitle: string;
  /** Descrição / desafios — pode virar lista depois */
  description: string;
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
    appDemo: {
      frames: [{ src: "/projects/globals/01-home.png" }],
    },
  },
  {
    slug: "inspecao-trem",
    title: "Análise e inspeções de trem",
    subtitle: "Gestão de ocorrências em campo",
    description:
      "Ferramenta para inspeção de trechos ferroviários com trabalho offline. Desafio: sincronizar ocorrências e trajetos quando o sinal cai no meio da via.",
    tags: ["Mobile", "Field Ops", "Offline-first"],
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
