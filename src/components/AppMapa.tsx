"use client";

/** Tela de mapa: renders REAIS do Figma. O cabeçalho de cima abre (mostra
 *  ID/Obs/legenda) e fecha, via cross-fade das duas imagens. Largura nativa 390px. */

export default function AppMapa() {
  return (
    <div style={{ width: 390, height: 844 }} className="relative overflow-hidden bg-[#1b2a1f]">
      {/* estado recolhido */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/trem/02-mapa.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
        draggable={false}
      />
      {/* cabeçalho de cima aberto (ID/Obs/legenda) — cross-fade */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/trem/02-mapa-legenda.png"
        alt=""
        className="mapa-legend-fade absolute inset-0 h-full w-full object-cover object-top"
        draggable={false}
      />
      {/* sheet de baixo aberto (lista de pontos) — cross-fade, depois do cabeçalho */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/trem/02-mapa-sheet.png"
        alt=""
        className="mapa-sheet-fade absolute inset-0 h-full w-full object-cover object-top"
        draggable={false}
      />
    </div>
  );
}
