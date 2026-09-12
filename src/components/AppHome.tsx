"use client";

import { useState } from "react";

/** Home do app (Novo app Sefer) recodada a partir do Figma.
 *  Largura nativa 440px — o AppDemo escala pra caber no celular. */

const A = "/projects/app/home"; // base dos assets

// Paleta (tokens do design)
const C = {
  page: "#f6f6f6",
  white: "#ffffff",
  pageInner: "#fcfcfc",
  primary: "#eb1923",
  primary600: "#b0131a",
  primaryPressed: "#750c11",
  primary50: "#fef3f4",
  heading: "#292a2d",
  body: "#81858d",
  disabled: "#abadb3",
  neutral900: "#030303",
  neutral800: "#292a2d",
  warningBg: "#fffcf2",
  warning: "#e8911c",
};

function Icon({ src, size = 24 }: { src: string; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={`${A}/${src}`}
      alt=""
      style={{ width: size, height: size }}
      className="block"
      draggable={false}
    />
  );
}

const favoritos = [
  { nome: "Amor", sub: "(19) 99857-5564", mono: true },
  { nome: "Fininicius", sub: "294.138.108-22", mono: true },
  { nome: "De Giz", sub: "renzzo.degiz@weareglobals.com", mono: false },
  { nome: "De Giz", sub: "renzzo.degiz@weareglobals.com", mono: false },
];

export default function AppHome() {
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <div
      style={{ width: 440, background: C.page, fontFamily: "var(--font-cabin), sans-serif" }}
      className="flex flex-col items-center pb-10"
    >
      {/* ===== Header (branco, full-bleed) ===== */}
      <div
        style={{ background: C.white, boxShadow: "0 0 10px #d5d6d8" }}
        className="flex w-[440px] flex-col items-center gap-6 rounded-b-[18px] px-6 pb-6 pt-10"
      >
        {/* saudação + olho */}
        <div className="flex w-[393px] items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div
              style={{ background: C.primary50 }}
              className="flex size-[46px] items-center justify-center rounded-full p-1.5"
            >
              <Icon src="user-round.svg" size={28} />
            </div>
            <div className="leading-none" style={{ color: C.heading }}>
              <p className="text-[14px]">Olá,</p>
              <p className="text-[18px] font-medium">Monan</p>
            </div>
          </div>
          <button onClick={() => setHideBalance((v) => !v)} aria-label="Ocultar saldo">
            <Icon src="eye.svg" size={28} />
          </button>
        </div>

        {/* card saldo */}
        <div
          style={{ background: C.pageInner }}
          className="flex w-[392px] flex-col gap-10 rounded-2xl px-4 py-6"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-[16px]" style={{ color: C.body }}>
                Saldo
              </p>
              <div className="flex items-center gap-1.5">
                <p
                  className="text-[18px] font-bold"
                  style={{ color: C.primaryPressed }}
                >
                  Extrato
                </p>
                <Icon src="chevron-right.svg" size={24} />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div
                className="flex items-center gap-1.5"
                style={{ color: C.heading }}
              >
                <p className="text-[16px]">R$</p>
                <p
                  className="text-[28px] tracking-[-1.4px]"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace", fontWeight: 500 }}
                >
                  {hideBalance ? "•••••••••••" : "4.400.000.000,00"}
                </p>
              </div>
              <div className="flex items-center gap-1.5" style={{ color: C.disabled }}>
                <Icon src="lock.svg" size={13} />
                <p
                  className="text-[14px]"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace", fontWeight: 500 }}
                >
                  R$ 200,00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ações PIX / Transferir / Pagar */}
        <div className="flex w-full items-center justify-between">
          {[
            { icon: "pix.svg", label: "PIX" },
            { icon: "transfer.svg", label: "Transferir" },
            { icon: "barcode.svg", label: "Pagar" },
          ].map((a) => (
            <div key={a.label} className="flex items-center gap-1.5 px-2.5 py-1.5">
              <div
                style={{ background: C.primary50 }}
                className="flex items-center rounded-full p-2.5"
              >
                <Icon src={a.icon} size={24} />
              </div>
              <p className="text-[14px] font-bold" style={{ color: C.primary600 }}>
                {a.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Conteúdo ===== */}
      <div className="flex w-full flex-col items-start gap-6 px-6 pt-6">
        {/* carrossel */}
        <div className="flex w-full gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* card Your Bank */}
          <div
            className="relative flex h-[221px] w-[390px] shrink-0 flex-col justify-between overflow-hidden rounded-[20px]"
            style={{ background: "linear-gradient(120deg,#7d0d16 0%,#c8121b 55%,#eb1923 100%)" }}
          >
            <div className="flex flex-1 items-stretch">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${A}/card1-person.png`}
                alt=""
                className="h-full w-[201px] object-cover"
                draggable={false}
              />
              <div
                className="flex flex-1 flex-col items-end justify-center gap-2 px-5 pt-5 text-right"
                style={{ color: C.pageInner, fontFamily: "var(--font-roboto), sans-serif" }}
              >
                <p className="text-[20px] font-light leading-tight">
                  Sua vida
                  <br />
                  financeira na
                  <br />
                  palma da sua mão
                </p>
                <p className="text-[32px] font-bold tracking-[0.32px]">Your Bank</p>
              </div>
            </div>
            <div
              className="flex items-center justify-end gap-1 px-5 py-2.5"
              style={{ color: C.pageInner, filter: "drop-shadow(0 0 5px rgba(0,0,0,0.25))" }}
            >
              <Icon src="pointer-click.svg" size={24} />
              <p className="text-[20px]" style={{ fontFamily: "var(--font-roboto), sans-serif", fontWeight: 300 }}>
                Conheça a Your
              </p>
            </div>
            <div className="flex h-4 items-center gap-1.5 px-4 py-1.5">
              <div className="h-1 flex-1 rounded-full bg-black/15">
                <div className="h-1 w-3 rounded-full" style={{ background: C.pageInner }} />
              </div>
              <div className="h-1 flex-1 rounded-full bg-black/15" />
            </div>
          </div>
          {/* card invest (preto) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${A}/card3.png`}
            alt=""
            className="h-[221px] w-[390px] shrink-0 rounded-[20px] object-cover"
            draggable={false}
          />
        </div>

        {/* Boleto */}
        <div
          style={{ background: C.white, filter: "drop-shadow(0 0 5px rgba(0,0,0,0.1))" }}
          className="flex w-[392px] flex-col gap-2.5 rounded-[18px] p-4"
        >
          <div className="flex flex-col gap-1.5">
            <p className="text-[16px] font-bold" style={{ color: C.heading }}>
              Boleto
            </p>
            <p className="text-[16px]" style={{ color: C.body }}>
              Insira um código de barras
            </p>
          </div>
          <div
            style={{ background: C.warningBg }}
            className="flex flex-col rounded-2xl p-2.5"
          >
            <p className="text-[16px] font-medium" style={{ color: C.warning }}>
              Pagamentos por boleto estão disponíveis apenas em dias úteis, no
              horário das 8:00 às 19:50.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div
              style={{ background: C.page }}
              className="flex flex-1 items-center rounded-full px-4 py-2.5"
            >
              <p className="flex-1 text-[16px] font-medium" style={{ color: C.body }}>
                Informe o código
              </p>
              <p className="text-[18px] font-bold" style={{ color: C.primary }}>
                Colar
              </p>
            </div>
            <div
              style={{ background: C.primary }}
              className="flex size-[56px] items-center justify-center rounded-full"
            >
              <Icon src="barcode-white.svg" size={24} />
            </div>
          </div>
          <p className="px-4 text-[14px]" style={{ color: C.body }}>
            0/47
          </p>
        </div>

        {/* três cards pretos */}
        <div className="flex w-full gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { icon: "switch-camera.svg", t: "Você decide como pagar.", s: "Leitor de Câmera para QR e Boleto" },
            { icon: "pix-white.svg", t: "Pagamentos Instantâneos", s: "Rápido, seguro e disponível 24 h" },
            { icon: "folder-heart.svg", t: "Favoritos TED", s: "Acesse seus destinatários mais rapidamente." },
          ].map((c) => (
            <div
              key={c.t}
              style={{ background: C.neutral900, color: C.pageInner }}
              className="flex size-[180px] shrink-0 flex-col justify-center gap-5 rounded-[20px] px-4 py-6"
            >
              <Icon src={c.icon} size={24} />
              <div className="flex flex-col gap-2.5">
                <p className="text-[20px] font-bold leading-tight">{c.t}</p>
                <p className="text-[16px]">{c.s}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Área Pix */}
        <div
          style={{ background: C.white, filter: "drop-shadow(0 0 5px rgba(0,0,0,0.1))" }}
          className="flex w-full flex-col gap-4 rounded-[18px] px-4 py-6"
        >
          <p className="text-[16px] font-bold" style={{ color: C.heading }}>
            Área Pix
          </p>
          <div className="flex flex-col gap-1.5">
            <div
              style={{ background: C.page }}
              className="flex items-center rounded-full p-2.5"
            >
              <p className="flex-1 text-[16px] font-medium" style={{ color: C.body }}>
                Digite aqui
              </p>
              <p className="text-[18px] font-bold" style={{ color: C.primary }}>
                Colar
              </p>
            </div>
            <p className="px-2.5 text-[14px]" style={{ color: C.body }}>
              CPF/CNPJ, telefone, e-mail, chave aleatória ou Pix copia e cola
            </p>
          </div>
          <div className="flex items-start justify-between">
            {[
              { icon: "camera.svg", label: "Escanear QR Code" },
              { icon: "qr-code.svg", label: "Receber" },
              { icon: "key-round.svg", label: "Minhas Chaves" },
              { icon: "heart-outline.svg", label: "Favoritos" },
            ].map((b) => (
              <div key={b.label} className="flex w-20 flex-col items-center gap-2.5">
                <div style={{ background: C.page }} className="flex items-center rounded-full p-2.5">
                  <Icon src={b.icon} size={24} />
                </div>
                <p className="text-center text-[14px] font-bold leading-tight" style={{ color: C.body }}>
                  {b.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Favoritos */}
        <div className="flex w-full flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="text-[24px] font-bold" style={{ color: C.heading }}>
              Favoritos
            </p>
            <p className="text-[18px] font-bold" style={{ color: C.primary }}>
              Exibir todos
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {favoritos.map((f, i) => (
              <div key={i}>
                <div className="flex items-center gap-2.5">
                  <div style={{ background: C.primary50 }} className="flex items-center rounded-full p-1.5">
                    <Icon src="heart-fav.svg" size={24} />
                  </div>
                  <div className="flex flex-1 flex-col" style={{ color: C.body }}>
                    <p className="text-[16px] font-bold">{f.nome}</p>
                    <p
                      className="text-[14px]"
                      style={f.mono ? { fontFamily: "var(--font-roboto-mono), monospace", fontWeight: 500 } : undefined}
                    >
                      {f.sub}
                    </p>
                  </div>
                  <Icon src="chevrons-right.svg" size={24} />
                </div>
                {i < favoritos.length - 1 && (
                  <div className="mt-6 h-px w-full" style={{ background: C.page }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Tab bar ===== */}
      <div className="sticky bottom-4 mt-6 flex justify-center">
        <div
          style={{ background: C.pageInner, boxShadow: "0 0 10px rgba(0,0,0,0.12)" }}
          className="flex items-center gap-3 rounded-full p-2.5"
        >
          <div
            style={{ background: C.primary }}
            className="flex h-[50px] items-center justify-center rounded-full px-5 py-2.5"
          >
            <Icon src="house.svg" size={28} />
          </div>
          <button className="flex h-[50px] items-center justify-center rounded-full px-5 py-2.5">
            <Icon src="scan-line.svg" size={28} />
          </button>
          <button className="flex h-[50px] items-center justify-center rounded-full px-5 py-2">
            <Icon src="ellipsis.svg" size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
