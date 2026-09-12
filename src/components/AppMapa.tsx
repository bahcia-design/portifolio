"use client";

/** Tela de mapa da inspeção: imagem de satélite (do Figma) + bottom sheet codado
 *  que expande/recolhe sozinho (a lista de pontos). Largura nativa 390px. */

const T = "/projects/app/trem";

const C = {
  navy: "#052d50",
  n500: "#111111",
  n400: "#444444",
  n300: "#555e76",
  green: "#2e7d32",
  gray: "#f2f2f2",
  white: "#ffffff",
};

function Icon({ src, size = 16 }: { src: string; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img src={`${T}/${src}`} alt="" style={{ width: size, height: size }} draggable={false} />
  );
}

function Point({
  km,
  station,
  chip,
  chipColor,
}: {
  km: string;
  station: string;
  chip?: string;
  chipColor?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="size-1.5 shrink-0 rounded-full" style={{ background: C.n300 }} />
      <span className="text-[13px] font-medium" style={{ color: C.n300 }}>
        {km}
      </span>
      <span className="text-[13px]" style={{ color: C.n300 }}>
        | {station}
      </span>
      {chip && (
        <span
          className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ background: C.gray, color: chipColor || C.n400 }}
        >
          {chip}
        </span>
      )}
    </div>
  );
}

export default function AppMapa() {
  return (
    <div style={{ width: 390, height: 844 }} className="relative overflow-hidden bg-[#1b2a1f]">
      {/* mapa (imagem do Figma) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/trem/02-mapa.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
        draggable={false}
      />

      {/* bottom sheet codado (cobre o sheet da imagem) */}
      <div className="absolute inset-x-0 bottom-0">
        <div
          className="rounded-t-[22px] bg-white px-4 pb-4 pt-2.5 shadow-[0_-6px_24px_rgba(0,0,0,0.18)]"
          style={{ minHeight: 186, fontFamily: "var(--font-inter), sans-serif" }}
        >
          {/* handle */}
          <div className="mx-auto mb-3 h-1 w-9 rounded-full" style={{ background: "#d5d6d8" }} />

          {/* título + chip */}
          <div className="flex items-center gap-2">
            <span className="flex-1 text-[14px] font-semibold" style={{ color: C.n500 }}>
              Inspeção Sub  - Sul - 27
            </span>
            <span
              className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold text-white"
              style={{ background: C.navy }}
            >
              KM 155+430m
              <span className="inline-block size-2 rounded-full border border-white" />
            </span>
          </div>

          {/* métricas */}
          <div className="mt-2.5 flex items-center">
            <div className="flex flex-1 items-center gap-4">
              <span className="flex items-center gap-1 text-[13px] font-medium" style={{ color: C.n400 }}>
                <Icon src="circle-alert.svg" size={15} />5
              </span>
              <span className="flex items-center gap-1 text-[13px] font-medium" style={{ color: C.n400 }}>
                <Icon src="waypoints.svg" size={15} />5/15
              </span>
            </div>
            <span className="text-[13px] font-semibold" style={{ color: C.n500 }}>
              Distância Aprox.{" "}
              <span style={{ color: C.navy }}>430,00m</span>
            </span>
          </div>

          {/* lista de pontos (expande/recolhe sozinho) */}
          <div className="mapa-sheet-list">
            <div className="mt-3 flex flex-col gap-2.5 border-t pt-3" style={{ borderColor: "#ececec" }}>
              <Point km="KM 155+430m" station="Cornélio Procópio (LCP)" chip="Final" chipColor={C.n400} />
              <Point km="KM 155+750m" station="Túnel Uraí" chip="Início" chipColor={C.green} />
              <Point km="KM 156+110m" station="Bueiro de Greide" />
            </div>
          </div>

          {/* botão */}
          <div className="mt-4 flex justify-end">
            <button
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-[14px] font-semibold text-white"
              style={{ background: C.navy }}
            >
              Iniciar Inspeção
              <Icon src="arrow-right-circle.svg" size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
