"use client";

/** Tela "Gestão de Ocorrências" (app de inspeção de trem) recodada do Figma.
 *  Largura nativa 390px — o AppDemo escala pra caber no celular. */

const T = "/projects/app/trem";

const C = {
  bg: "#fafafa",
  white: "#ffffff",
  navy: "#052d50",
  orange: "#f57332",
  green: "#2e7d32",
  n500: "#111111",
  n400: "#444444",
  n300: "#555e76",
  gray200: "#f2f2f2",
  gray200b: "#e7e9ec",
  route: "rgba(85,94,118,0.7)",
};

function Icon({ src, size = 24 }: { src: string; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img src={`${T}/${src}`} alt="" style={{ width: size, height: size }} draggable={false} />
  );
}

function Chip({
  label,
  icon,
  bg = C.gray200,
  color = C.n400,
}: {
  label: string;
  icon?: string;
  bg?: string;
  color?: string;
}) {
  return (
    <div
      className="flex min-h-[28px] shrink-0 items-center justify-center gap-1 rounded-[20px] px-2 py-[5px]"
      style={{ background: bg }}
    >
      <span className="whitespace-nowrap text-[13px] font-medium" style={{ color }}>
        {label}
      </span>
      {icon && <Icon src={icon} size={17} />}
    </div>
  );
}

function StatusChip({ label, icon, color = C.n400, bg = C.gray200 }: { label: string; icon?: string; color?: string; bg?: string }) {
  return (
    <div
      className="flex min-h-[28px] shrink-0 items-center justify-center gap-1 rounded-[20px] px-2"
      style={{ background: bg }}
    >
      <span className="whitespace-nowrap text-[10px] font-medium leading-3" style={{ color }}>
        {label}
      </span>
      {icon && <Icon src={icon} size={17} />}
    </div>
  );
}

function Route({
  km1,
  st1,
  km2,
  st2,
}: {
  km1: string;
  st1: string;
  km2: string;
  st2: string;
}) {
  return (
    <div className="flex h-[30px] w-full gap-1 pr-1.5">
      <div className="flex w-[7px] flex-col items-center justify-center py-0.5">
        <div className="size-1.5 rounded-full" style={{ background: C.n300 }} />
        <div className="w-px flex-1" style={{ background: C.n300 }} />
        <div className="size-1.5 rounded-full" style={{ background: C.n300 }} />
      </div>
      <div
        className="flex flex-1 flex-col justify-between text-[12px] font-medium"
        style={{ color: C.route }}
      >
        <div className="flex w-full gap-0.5">
          <span className="flex-1">{km1}</span>
          <span className="whitespace-nowrap">{st1}</span>
        </div>
        <div className="flex w-full gap-0.5">
          <span className="flex-1">{km2}</span>
          <span className="whitespace-nowrap">{st2}</span>
        </div>
      </div>
    </div>
  );
}

function CardShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex w-[351px] flex-col rounded-lg px-2.5 py-4 ${className}`}
      style={{ background: C.white }}
    >
      {children}
    </div>
  );
}

function CardHead({
  title = "Inspeção Sub  - Sul - 27",
  subtitle,
  subtitleColor,
  downloadIcon,
  chip,
  route,
}: {
  title?: string;
  subtitle: string;
  subtitleColor: string;
  downloadIcon: string;
  chip: React.ReactNode;
  route: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full items-center gap-1">
        <div className="flex flex-1 items-end gap-2">
          <div className="flex flex-1 flex-col justify-center gap-2">
            <p className="whitespace-nowrap text-[14px] font-semibold" style={{ color: C.n500 }}>
              {title}
            </p>
            <p className="text-[10px] font-semibold" style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          </div>
          <div
            className="flex size-7 items-center justify-center rounded-full"
            style={{ background: C.gray200 }}
          >
            <Icon src={downloadIcon} size={20} />
          </div>
        </div>
        {chip}
      </div>
      {route}
    </div>
  );
}

function BtnFilled({ label, icon }: { label: string; icon: string }) {
  return (
    <div
      className="flex w-full items-center justify-between rounded-lg px-4 py-2"
      style={{ background: C.navy }}
    >
      <span className="text-[14px] font-semibold" style={{ color: C.white }}>
        {label}
      </span>
      <Icon src={icon} size={24} />
    </div>
  );
}

export default function AppTrem() {
  return (
    <div
      style={{ width: 390, background: C.bg, fontFamily: "var(--font-inter), sans-serif" }}
      className="flex flex-col items-center px-5"
    >
      {/* status bar */}
      <div className="flex w-full items-center justify-between px-2.5 py-2">
        <p className="text-[15px] tracking-[-0.3px]" style={{ color: C.n500 }}>
          9:41
        </p>
        <div className="flex items-center gap-1">
          <Icon src="map-pin.svg" size={14} />
          <Icon src="signal.svg" size={14} />
          <Icon src="wifi.svg" size={14} />
          <img src={`${T}/battery.svg`} alt="" style={{ height: 11.3, width: 25.5 }} draggable={false} />
        </div>
      </div>

      {/* busca + download + Com sinal */}
      <div className="flex w-full items-center justify-center gap-2">
        <div
          className="flex h-10 flex-1 items-center gap-2.5 rounded-[20px] px-2 py-1"
          style={{ background: C.gray200 }}
        >
          <Icon src="search.svg" size={24} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-10 items-center justify-center rounded-[30px] p-1.5"
            style={{ background: C.gray200b }}
          >
            <Icon src="download.svg" size={24} />
          </div>
          <div
            className="flex items-center justify-center rounded-lg px-2 py-1"
            style={{ background: C.green }}
          >
            <span className="whitespace-nowrap text-[10px] font-medium leading-none text-white">
              Com sinal
            </span>
          </div>
        </div>
      </div>

      {/* título + filtros + cards */}
      <div className="flex w-full flex-col gap-4 pt-5">
        <div className="flex w-full items-center justify-center gap-1">
          <Icon src="download-title.svg" size={22} />
          <p
            className="flex-1 text-center text-[18px] font-semibold tracking-[-0.45px]"
            style={{ color: C.n400 }}
          >
            Gestão de Ocorrências
          </p>
        </div>

        {/* filtros */}
        <div className="flex w-full gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Chip label="Todos" icon="filter-todos.svg" bg={C.navy} color={C.white} />
          <Chip label="Pendentes" icon="filter-pendentes.svg" />
          <Chip label="Concluídas" icon="filter-concluidas.svg" />
          <Chip label="Em andamento" icon="filter-andamento.svg" />
        </div>

        {/* cards */}
        <div className="flex flex-col gap-2.5">
          {/* Card 1 — Pendente, baixar trajeto */}
          <CardShell>
            <CardHead
              subtitle="Baixe o trajeto antes de iniciar"
              subtitleColor={C.orange}
              downloadIcon="file-down.svg"
              chip={<StatusChip label="Pendente" />}
              route={<Route km1="KM 152+980m" st1="Uraí (LUR)" km2="KM 153+552m" st2="Cornélio Procópio (LCP)" />}
            />
          </CardShell>

          {/* Card 2 — Pendente, trajeto disponível */}
          <CardShell>
            <CardHead
              subtitle="Trajeto disponível"
              subtitleColor={C.green}
              downloadIcon="map-pin-check.svg"
              chip={<StatusChip label="Pendente" />}
              route={<Route km1="KM 154+125m" st1="Uraí (LUR)" km2="KM 153+552m" st2="Cornélio Procópio (LCP)" />}
            />
          </CardShell>

          {/* Card 3 — Em andamento (expandido) */}
          <CardShell>
            <CardHead
              subtitle="Trajeto disponível"
              subtitleColor={C.green}
              downloadIcon="map-pin-check.svg"
              chip={<StatusChip label="Em andamento" />}
              route={<Route km1="KM 154+390m" st1="Uraí (LUR)" km2="KM 156+680m" st2="Cornélio Procópio (LCP)" />}
            />
            <div>
              <div className="my-4 h-px w-full" style={{ background: "#ececec" }} />
              {/* realizar entre */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium" style={{ color: C.n300 }}>
                Realizar entre
              </span>
              <div className="flex w-full items-center justify-between">
                <div
                  className="flex h-[26px] w-[88px] items-center justify-center rounded-[30px]"
                  style={{ background: "rgba(33,179,123,0.1)" }}
                >
                  <span className="text-[12px] font-medium" style={{ color: C.n300 }}>
                    10/05/2024
                  </span>
                </div>
                <div className="flex flex-1 items-center px-2">
                  <img src={`${T}/date-arrow.svg`} alt="" className="h-5 w-full" draggable={false} />
                </div>
                <div
                  className="flex h-[26px] w-[88px] items-center justify-center rounded-[30px]"
                  style={{ background: "rgba(245,50,50,0.1)" }}
                >
                  <span className="text-[12px] font-medium" style={{ color: C.n300 }}>
                    12/05/2024
                  </span>
                </div>
              </div>
            </div>
            {/* métricas */}
            <div className="mt-5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon src="waypoints.svg" size={16} />
                <span className="flex-1 text-[14px] font-semibold" style={{ color: C.n300 }}>
                  Pontos de inspeção
                </span>
                <span className="text-[14px] font-medium" style={{ color: C.n400 }}>
                  6/11
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon src="circle-alert.svg" size={16} />
                <span className="flex-1 text-[14px] font-semibold" style={{ color: C.n300 }}>
                  Ocorrências
                </span>
                <span className="text-[14px] font-medium" style={{ color: C.n400 }}>
                  3
                </span>
              </div>
            </div>
            {/* botões */}
            <div className="mt-5 flex flex-col gap-2">
              <div
                className="flex w-full items-center justify-between rounded-lg border px-4 py-2"
                style={{ borderColor: C.navy }}
              >
                <span className="text-[14px] font-semibold" style={{ color: C.navy }}>
                  Concluir Inspeção
                </span>
                <Icon src="circle-check.svg" size={24} />
              </div>
              <BtnFilled label="Continuar Inspeção" icon="arrow-right-circle.svg" />
              </div>
            </div>
          </CardShell>

          {/* Card 4 — Concluída */}
          <CardShell>
            <CardHead
              subtitle="Inspeção concluída"
              subtitleColor={C.green}
              downloadIcon="file-down-green.svg"
              chip={
                <StatusChip
                  label="Concluída"
                  icon="list-checks-green.svg"
                  color={C.green}
                  bg="rgba(46,125,50,0.05)"
                />
              }
              route={<Route km1="KM 156+680m" st1="Uraí (LUR)" km2="KM 160+680m" st2="Cornélio Procópio (LCP)" />}
            />
          </CardShell>
        </div>
      </div>
    </div>
  );
}
