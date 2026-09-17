"use client";

import { useState } from "react";

/** Mostra um projeto responsivo com um chaveamento Web / Mobile:
 *  Web = moldura de navegador; Mobile = moldura de celular. */
export default function ResponsiveShowcase({
  web,
  mobile,
  alt,
  fg,
  accent,
}: {
  web: string;
  mobile: string;
  alt?: string;
  fg: string;
  accent: string;
}) {
  const [view, setView] = useState<"web" | "mobile">("web");

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {/* Chaveamento */}
      <div
        className="inline-flex rounded-full p-1"
        style={{ backgroundColor: `${fg}14` }}
      >
        {(["web", "mobile"] as const).map((v) => {
          const active = view === v;
          return (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={active}
              className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: active ? accent : "transparent",
                color: active ? "#0B0B0B" : fg,
                opacity: active ? 1 : 0.65,
              }}
            >
              {v === "web" ? "Web" : "Mobile"}
            </button>
          );
        })}
      </div>

      {/* Moldura */}
      <div className="flex min-h-[420px] w-full items-center justify-center">
        {view === "web" ? (
          <div className="w-full max-w-xl overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/15">
            <div className="flex items-center gap-1.5 bg-neutral-800 px-3 py-2.5">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-yellow-400/80" />
              <span className="size-2.5 rounded-full bg-green-400/80" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={web} alt={alt} className="block w-full" draggable={false} />
          </div>
        ) : (
          <div className="w-full max-w-[230px] overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mobile}
              alt={alt ? `${alt} (mobile)` : undefined}
              className="block w-full rounded-[1.5rem]"
              draggable={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
