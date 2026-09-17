"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import ProjectContent from "@/components/ProjectContent";
import Cover from "@/components/Cover";
import Sidebar from "@/components/Sidebar";
import LineSidebar from "@/components/LineSidebar";

const FADE = 450; // ms — duração de cada fase (sai / entra)
const DELAY = 380; // ms — o conteúdo que entra espera o que sai limpar (sem ghosting)
const MOVE = 0; // sem deslize — troca no lugar (fade puro, nada "descendo")
const EASE = "ease";
const CYCLE = FADE + DELAY; // duração total da troca

// Seção 0 = capa; seções 1..N = projetos.
const COVER = { bg: "#17100C", fg: "#F6F1E8" };
const sectionBg = (i: number) => (i === 0 ? COVER.bg : projects[i - 1].bg);
const sectionFg = (i: number) => (i === 0 ? COVER.fg : projects[i - 1].fg);
const sectionLabel = (i: number) => (i === 0 ? "Início" : projects[i - 1].title);

export default function ProjectStage() {
  const count = projects.length + 1; // capa + projetos
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

  // Pula direto pra uma seção (índice do projeto, ou bolinhas de navegação).
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
        backgroundColor: sectionBg(active),
        transition: `background-color ${CYCLE}ms ${EASE}`,
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const rel = i - active; // 0 = ativo, <0 = já passou (acima), >0 = próximo (abaixo)
        const dir = Math.max(-1, Math.min(1, rel)); // direção do deslize
        const isActive = rel === 0;
        return (
          <div
            key={i}
            className={`absolute inset-0 flex items-center will-change-transform${
              i > 0 ? " lg:pl-56" : ""
            }`}
            style={{
              color: sectionFg(i),
              opacity: isActive ? 1 : 0,
              transform: `translateY(${isActive ? 0 : dir * MOVE}px)`,
              transition: `opacity ${FADE}ms ${EASE}, transform ${FADE}ms ${EASE}`,
              transitionDelay: isActive ? `${DELAY}ms` : "0ms",
              pointerEvents: isActive ? "auto" : "none",
            }}
            aria-hidden={!isActive}
          >
            {i === 0 ? (
              <Cover projects={projects} onOpen={goTo} />
            ) : (
              <ProjectContent project={projects[i - 1]} />
            )}
          </div>
        );
      })}

      {/* Barra lateral fixa (socials) — só nos projetos; a capa tem os seus */}
      {active > 0 && <Sidebar fg={projects[active - 1].fg} />}

      {/* Menu de navegação fixo na lateral (acompanha o scroll).
          Na capa não aparece: o índice grande já cumpre esse papel. */}
      {active > 0 && (
        <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2 md:left-10">
          <LineSidebar
            items={Array.from({ length: count }, (_, i) => sectionLabel(i))}
            activeIndex={active}
            accentColor={projects[active - 1].accent}
            textColor={`${projects[active - 1].fg}8C`}
            markerColor={`${projects[active - 1].fg}59`}
            fontSize={0.82}
            itemGap={16}
            markerLength={28}
            maxShift={8}
            proximityRadius={90}
            onItemClick={(i) => goTo(i)}
          />
        </div>
      )}
    </div>
  );
}
