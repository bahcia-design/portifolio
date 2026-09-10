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
    // media: { type: "image", src: "/projects/banco.png", alt: "Tela do app bancário" },
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
    // media: { type: "image", src: "/projects/trem.png", alt: "Tela de gestão de ocorrências" },
  },
];
