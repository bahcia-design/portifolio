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
};

export const projects: Project[] = [
  {
    slug: "banco-whitelabel",
    title: "Projeto de banco whitelabel",
    subtitle: "Sua vida financeira na palma da sua mão",
    description:
      "Aplicativo bancário whitelabel: uma base de produto que se adapta à marca de cada cliente. Desafio: manter consistência de componentes enquanto tema, cores e conteúdo variam por parceiro.",
    tags: ["Mobile", "Design System", "Fintech"],
    bg: "#6B0712",
    fg: "#FFFFFF",
    accent: "#FF3B4E",
    appDemo: {
      frames: [
        { component: "home", tap: { x: 50, y: 32 }, enter: "fade" },
        { src: "/projects/flow/02-valor.png", tap: { x: 50, y: 93 }, enter: "push" },
        { src: "/projects/flow/03-revisar.png", tap: { x: 50, y: 93 }, enter: "push" },
        { src: "/projects/flow/04-pin.png", tap: { x: 50, y: 94 }, enter: "modal" },
      ],
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
        { component: "mapa", enter: "push", hold: 5200 },
      ],
    },
  },
];
