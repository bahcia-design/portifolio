"use client";

import { profile } from "@/data/profile";
import type { Project } from "@/data/projects";

// Paleta: Espresso (fundo) · Oat Milk (texto) · Clementine (accent) · Cobalt (contraste pontual)
const CREAM = "#F6F1E8";
const CLEMENTINE = "#E2572B";

// Fonte do título editorial
const HEAD_FONT = "var(--font-instrument)";

/** Capa do portfólio (estilo hero editorial): identidade + cargo em destaque.
 *  A navegação para os cases é pelo menu lateral, o scroll e o CTA. */
export default function Cover({ onOpen }: { onOpen: (i: number) => void; projects: Project[] }) {
  return (
    <div className="relative flex h-full w-full flex-col">
      {/* Bloco central: eyebrow + título gigante */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 md:px-12">
        <p
          className="mb-6 flex flex-wrap items-baseline gap-x-2 font-[family-name:var(--font-roboto-mono)] text-xs uppercase tracking-[0.22em]"
          style={{ color: `${CREAM}99` }}
        >
          <span
            className="font-[family-name:var(--font-brush)] text-2xl normal-case tracking-normal"
            style={{ color: CLEMENTINE }}
          >
            oi,
          </span>
          eu sou a Bárbara · Americana, SP
        </p>

        <h1
          className="text-6xl leading-[0.92] tracking-tight md:text-8xl lg:text-[7.5rem]"
          style={{ color: CREAM, fontFamily: HEAD_FONT }}
        >
          product designer{" "}
          <span className="italic" style={{ color: CLEMENTINE }}>
            &amp;
          </span>
          <br />
          <span className="text-[0.82em] italic">graphic designer</span>
        </h1>
      </div>

      {/* Rodapé do hero: bio curta + CTA */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 md:flex-row md:items-end md:justify-between md:px-12">
        <div className="max-w-sm">
          <p className="text-base leading-relaxed" style={{ color: `${CREAM}B3` }}>
            Product Designer com formação em Design Gráfico, atuo no design de
            produtos web e mobile, criando interfaces que qualquer pessoa
            consegue usar.
          </p>
          <p
            className="mt-3 font-[family-name:var(--font-roboto-mono)] text-[11px] uppercase tracking-[0.18em]"
            style={{ color: `${CREAM}73` }}
          >
            UI/UX · Design Systems · Web &amp; Mobile · Acessibilidade
          </p>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => onOpen(1)}
            className="group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: CLEMENTINE, color: "#17100C" }}
          >
            Ver projetos
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          <ul className="hidden items-center gap-1 sm:flex">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
                  style={{ color: `${CREAM}99` }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
