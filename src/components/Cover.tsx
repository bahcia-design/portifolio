"use client";

import { profile } from "@/data/profile";
import type { Project } from "@/data/projects";

/** Capa do portfólio: identidade à esquerda, índice clicável dos projetos
 *  à direita. Clicar num projeto mergulha no case imersivo. */
export default function Cover({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (sectionIndex: number) => void;
}) {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-12">
      {/* Esquerda: identidade */}
      <div className="flex max-w-md flex-col gap-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
          Product Designer
        </p>
        <h1 className="text-5xl font-bold leading-[1.03] tracking-tight md:text-6xl">
          Bárbara Cia
        </h1>
        <p className="text-base leading-relaxed text-white/70">
          Desenho produtos web e mobile de alta complexidade, de sistemas de
          missão crítica ao setor financeiro, do Discovery ao handoff, num fluxo
          AI-first. Design systems, acessibilidade e interfaces de alta densidade
          de informação.
        </p>
        <ul className="mt-1 -ml-3 flex flex-wrap items-center gap-1">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Direita: índice de projetos */}
      <div className="flex flex-col">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
          Projetos
        </p>
        <ul className="flex flex-col border-b border-white/10">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <button
                onClick={() => onOpen(i + 1)}
                className="group flex w-full items-center gap-4 border-t border-white/10 py-4 text-left transition-colors hover:bg-white/[0.04]"
              >
                <span className="w-6 text-sm tabular-nums text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: p.accent }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-white">
                    {p.title}
                  </span>
                  <span className="block truncate text-sm text-white/50">
                    {p.subtitle}
                  </span>
                </span>
                <span className="text-white/30 transition-all group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-white/40">
          Role para navegar ou clique num projeto.
        </p>
      </div>
    </div>
  );
}
