"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import ProjectContent from "@/components/ProjectContent";

const DURATION = 700; // ms — duração do slide + trava do scroll
const EASE = "cubic-bezier(0.7, 0, 0.2, 1)";

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
      }, DURATION + 150);
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

  return (
    // Fundo = o "frame" que fica PARADO no lugar, só recolore suave.
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        backgroundColor: projects[active].bg,
        transition: `background-color ${DURATION}ms ${EASE}`,
      }}
    >
      {projects.map((project, i) => {
        const rel = i - active; // 0 = ativo, <0 = já passou (acima), >0 = próximo (abaixo)
        return (
          // Conteúdo transparente que desliza direcional (sem dissolver).
          <div
            key={project.slug}
            className="absolute inset-0 flex items-center will-change-transform"
            style={{
              color: project.fg,
              transform: `translateY(${rel * 100}%)`,
              transition: `transform ${DURATION}ms ${EASE}`,
              pointerEvents: rel === 0 ? "auto" : "none",
            }}
            aria-hidden={rel !== 0}
          >
            <ProjectContent project={project} />
          </div>
        );
      })}
    </div>
  );
}
