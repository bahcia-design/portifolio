import type { Project } from "@/data/projects";

export default function ProjectSection({ project }: { project: Project }) {
  const { title, subtitle, description, tags, bg, fg, accent, media } = project;

  return (
    <section
      id={project.slug}
      className="flex min-h-screen w-full snap-start items-center"
      style={{ backgroundColor: bg, color: fg }}
    >
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
            style={{ color: accent }}
          >
            {title}
          </h2>

          <p className="text-xl font-medium opacity-90">{subtitle}</p>

          <p className="max-w-md text-base leading-relaxed opacity-70">
            {description}
          </p>
        </div>

        {/* Direita: mídia (imagem, vídeo ou placeholder) */}
        <div className="flex items-center justify-center">
          <div
            className="aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-3xl"
            style={{ backgroundColor: `${fg}14`, border: `1px solid ${fg}22` }}
          >
            {media?.type === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={media.src}
                alt={media.alt ?? title}
                className="h-full w-full object-cover"
              />
            )}
            {media?.type === "video" && (
              <video
                src={media.src}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            )}
            {!media && (
              <div className="flex h-full w-full items-center justify-center text-sm opacity-40">
                mídia do projeto
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
