import { profile } from "@/data/profile";

/** Barra lateral fixa (estilo Brittany): bio no topo, socials no rodapé.
 *  Fica por cima das camadas de projeto, alinhada à coluna esquerda. */
export default function Sidebar({ fg }: { fg: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40" style={{ color: fg }}>
      <div className="mx-auto grid h-full max-w-6xl grid-cols-1 gap-12 px-6 py-12 md:grid-cols-2 md:px-12">
        <div className="pointer-events-auto flex h-full flex-col justify-end">
          {/* Redes sociais (fixas) */}
          <ul className="-ml-3 flex flex-wrap items-center gap-1">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="rounded-full px-3 py-1.5 text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div />
      </div>
    </div>
  );
}
