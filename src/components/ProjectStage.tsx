"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import ProjectContent from "@/components/ProjectContent";
import Sidebar from "@/components/Sidebar";

const FADE = 450; // ms — duração de cada fase (sai / entra)
const DELAY = 380; // ms — o conteúdo que entra espera o que sai limpar (sem ghosting)
const MOVE = 0; // sem deslize — troca no lugar (fade puro, nada "descendo")
const EASE = "ease";
const CYCLE = FADE + DELAY; // duração total da troca

export default function ProjectStage() {
  const count = projects.length;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const lockRef = useRef(false);

  useEffect(() => {
    // Avança/volta 1 slide, com trava pra ignorar a inércia do trackpad.
    const trigger = (dir: 1 | -1) => {
      if (lockRef.current) return;
      const next = Math.min(Math.max(activeRef.current + dir, 0), count - 1);
      if (next === activeRef.current) return;
      activeRef.current = next;
      lockRef.current = true;
      setActive(next);
      window.setTimeout(() => {
        lockRef.current = false;
      }, CYCLE + 120);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8) return;
      trigger(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        trigger(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        trigger(-1);
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) trigger(dy > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [count]);

  // Trava o scroll da página (some a barra de scroll).
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  // Pula direto pra um projeto (bolinhas de navegação).
  const goTo = (index: number) => {
    if (lockRef.current) return;
    const next = Math.min(Math.max(index, 0), count - 1);
    if (next === activeRef.current) return;
    activeRef.current = next;
    lockRef.current = true;
    setActive(next);
    window.setTimeout(() => {
      lockRef.current = false;
    }, CYCLE + 120);
  };

  return (
    // Fundo = o "frame" que fica PARADO no lugar, só recolore suave.
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        backgroundColor: projects[active].bg,
        transition: `background-color ${CYCLE}ms ${EASE}`,
      }}
    >
      {projects.map((project, i) => {
        const rel = i - active; // 0 = ativo, <0 = já passou (acima), >0 = próximo (abaixo)
        const dir = Math.max(-1, Math.min(1, rel)); // direção do deslize
        const isActive = rel === 0;
        return (
          // Troca no lugar: sai (some subindo) → entra (aparece subindo). Curto, sem dissolver.
          <div
            key={project.slug}
            className="absolute inset-0 flex items-center will-change-transform"
            style={{
              color: project.fg,
              opacity: isActive ? 1 : 0,
              transform: `translateY(${isActive ? 0 : dir * MOVE}px)`,
              transition: `opacity ${FADE}ms ${EASE}, transform ${FADE}ms ${EASE}`,
              // O que entra espera o que sai limpar; o que sai vai embora na hora.
              transitionDelay: isActive ? `${DELAY}ms` : "0ms",
              pointerEvents: isActive ? "auto" : "none",
            }}
            aria-hidden={!isActive}
          >
            <ProjectContent project={project} />
          </div>
        );
      })}

      {/* Barra lateral fixa (bio + socials) */}
      <Sidebar fg={projects[active].fg} />

      {/* Bolinhas de navegação entre projetos */}
      <nav className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-3">
        {projects.map((project, i) => {
          const isActive = i === active;
          return (
            <button
              key={project.slug}
              onClick={() => goTo(i)}
              aria-label={`Ir para ${project.title}`}
              aria-current={isActive}
              className="rounded-full transition-all duration-300"
              style={{
                width: 8,
                height: isActive ? 24 : 8,
                backgroundColor: isActive
                  ? projects[active].fg
                  : `${projects[active].fg}59`,
              }}
            />
          );
        })}
      </nav>
    </div>
  );
}
