import type { Project } from "@/data/projects";
import AppDemo from "@/components/AppDemo";

/** Conteúdo puro de um projeto (texto + mídia), sem fundo próprio.
 *  O fundo e o posicionamento ficam por conta do ProjectStage. */
export default function ProjectContent({ project }: { project: Project }) {
  const {
    title,
    subtitle,
    description,
    tags,
    fg,
    media,
    figmaEmbed,
    appDemo,
    desktop,
  } = project;

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-12">
      {/* Esquerda: texto */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-1 text-xs font-medium"
              style={{ borderColor: `${fg}33` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h2
          className="text-4xl font-bold leading-tight tracking-tight md:text-5xl"
          style={{ color: fg }}
        >
          {title}
        </h2>

        <p className="text-xl font-medium opacity-90">{subtitle}</p>

        <p className="max-w-md text-base leading-relaxed opacity-70">
          {description}
        </p>
      </div>

      {/* Direita: desktop (navegador), simulação do app, ou mídia */}
      <div className="flex items-center justify-center">
        {desktop ? (
          // Moldura de navegador para projetos web/desktop
          <div className="w-full max-w-xl overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/15">
            <div className="flex items-center gap-1.5 bg-neutral-800 px-3 py-2.5">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-yellow-400/80" />
              <span className="size-2.5 rounded-full bg-green-400/80" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={desktop.src}
              alt={desktop.alt ?? title}
              className="block w-full"
              draggable={false}
            />
          </div>
        ) : appDemo ? (
          // Moldura de celular com a demo autoplay
          <div className="aspect-[438/950] w-full max-w-[280px] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10">
            <AppDemo frames={appDemo.frames} />
          </div>
        ) : (
          <div
            className="aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-3xl"
            style={{ backgroundColor: `${fg}14`, border: `1px solid ${fg}22` }}
          >
            {figmaEmbed && (
              <iframe
                src={figmaEmbed}
                title={`Protótipo — ${title}`}
                className="h-full w-full border-0"
                allowFullScreen
              />
            )}
            {!figmaEmbed && media?.type === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media.src}
              alt={media.alt ?? title}
              className="h-full w-full object-cover"
            />
          )}
          {!figmaEmbed && media?.type === "video" && (
            <video
              src={media.src}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          )}
          {!figmaEmbed && !media && (
            <div className="flex h-full w-full items-center justify-center text-sm opacity-40">
              mídia do projeto
            </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
