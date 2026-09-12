"use client";

import { useEffect, useRef, useState } from "react";
import AppHome from "@/components/AppHome";
import AppTrem from "@/components/AppTrem";

export type DemoFrame = {
  /** Caminho da imagem da tela (em /public) */
  src?: string;
  /** Tela codada — tem prioridade sobre src */
  component?: "home" | "trem";
  /** Ponto do toque simulado nesta tela, em % (onde o dedo aperta pra avançar) */
  tap?: { x: number; y: number };
  /** Como ESTA tela entra: push (desliza da direita), modal (sobe), fade */
  enter?: "push" | "modal" | "fade";
};

// Telas codadas têm largura nativa; o palco escala pra caber.
const SCREENS: Record<string, { node: React.ReactNode; width: number }> = {
  home: { node: <AppHome />, width: 440 },
  trem: { node: <AppTrem />, width: 390 },
};

// Ritmo da simulação (ms)
const MOVE = 650; // dedo deslizando até o botão
const PRESS = 300; // pressionar
const TRANS = 520; // transição de tela
const HOLD = 950; // pausa na tela nova antes do próximo toque

function startTransform(enter?: DemoFrame["enter"]) {
  if (enter === "push") return "translateX(100%)";
  if (enter === "modal") return "translateY(100%)";
  return "translateX(0)";
}

/** Renderiza uma tela codada (largura nativa) escalada pra caber no celular,
 *  com auto-scroll suave quando o conteúdo é mais alto que a moldura. */
function ScaledScreen({ node, width }: { node: React.ReactNode; width: number }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const content = contentRef.current;
    if (!outer || !content) return;
    const measure = () => {
      const s = outer.clientWidth / width;
      setScale(s);
      const scaledHeight = content.offsetHeight * s;
      setDist(Math.max(0, scaledHeight - outer.clientHeight));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(content);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={outerRef}
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#f6f6f6" }}
    >
      <div
        className="will-change-transform"
        style={
          dist > 0
            ? ({
                animation: "appdemo-scroll 16s ease-in-out infinite",
                "--scroll-dist": `${dist}px`,
              } as React.CSSProperties)
            : undefined
        }
      >
        <div
          ref={contentRef}
          style={{ width, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          {node}
        </div>
      </div>
    </div>
  );
}

export default function AppDemo({ frames }: { frames: DemoFrame[] }) {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [entering, setEntering] = useState(true);
  const [finger, setFinger] = useState({
    x: 50,
    y: 50,
    pressing: false,
    visible: false,
  });


  useEffect(() => {
    if (frames.length <= 1) return;
    let cur = 0;
    const timers: number[] = [];
    const wait = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const step = () => {
      const s = frames[cur];
      // 1. dedo desliza até o ponto de toque desta tela
      if (s.tap)
        setFinger({ x: s.tap.x, y: s.tap.y, pressing: false, visible: true });
      wait(
        () => {
          // 2. pressiona
          if (s.tap) setFinger((f) => ({ ...f, pressing: true }));
          wait(() => {
            // 3. solta e navega pra próxima tela (transição)
            setFinger((f) => ({ ...f, pressing: false, visible: false }));
            const next = (cur + 1) % frames.length;
            setPrev(cur);
            setIdx(next);
            setEntering(false);
            requestAnimationFrame(() =>
              requestAnimationFrame(() => setEntering(true)),
            );
            cur = next;
            // 4. segura e repete
            wait(step, TRANS + HOLD);
          }, PRESS);
        },
        s.tap ? MOVE : 0,
      );
    };

    wait(step, HOLD);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [frames]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FAFAFA]">
      {frames.map((s, i) => {
        const isCur = i === idx;
        const isPrev = i === prev;
        if (!isCur && !isPrev) return null;

        let transform = "translateX(0)";
        let opacity = 1;
        let zIndex = 1;

        if (isCur) {
          zIndex = 2;
          transform = entering ? "translateX(0)" : startTransform(s.enter);
          opacity = entering ? 1 : s.enter === "fade" ? 0 : 1;
        } else {
          // camada que sai — depende de como a tela atual entra
          const enter = frames[idx].enter;
          if (!entering) {
            transform = "translateX(0)";
            opacity = 1;
          } else if (enter === "push") {
            transform = "translateX(-28%)"; // parallax da anterior
            opacity = 1;
          } else if (enter === "fade") {
            transform = "translateX(0)";
            opacity = 0;
          } else {
            transform = "translateX(0)"; // modal: fica embaixo
            opacity = 1;
          }
        }

        const screen = s.component ? SCREENS[s.component] : null;
        return (
          <div
            key={s.component ?? s.src}
            className="absolute inset-0 overflow-hidden"
            style={{
              transform,
              opacity,
              zIndex,
              transition: `transform ${TRANS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${TRANS}ms ease`,
            }}
          >
            {screen ? (
              <ScaledScreen node={screen.node} width={screen.width} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.src}
                alt=""
                className="h-full w-full object-cover object-top"
                draggable={false}
              />
            )}
          </div>
        );
      })}

      {/* Feedback de pressão no botão (escurece o ponto tocado) */}
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          left: `${finger.x}%`,
          top: `${finger.y}%`,
          width: 64,
          height: 64,
          transform: `translate(-50%, -50%) scale(${finger.pressing ? 1 : 0.4})`,
          background:
            "radial-gradient(circle, rgba(0,0,0,0.18), rgba(0,0,0,0) 70%)",
          opacity: finger.pressing ? 1 : 0,
          transition: "transform 220ms ease, opacity 220ms ease",
          zIndex: 9,
        }}
      />

      {/* Dedo / toque */}
      <div
        className="pointer-events-none absolute z-10"
        style={{
          left: `${finger.x}%`,
          top: `${finger.y}%`,
          transform: "translate(-50%, -50%)",
          opacity: finger.visible ? 1 : 0,
          transition: `left ${MOVE}ms cubic-bezier(0.4, 0, 0.2, 1), top ${MOVE}ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease`,
        }}
      >
        {finger.pressing && (
          <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-black/10" />
        )}
        <span
          className="block h-9 w-9 rounded-full border border-white/70 shadow-lg transition-transform duration-200"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(120,120,130,0.55) 60%, rgba(80,80,90,0.5))",
            transform: finger.pressing ? "scale(0.8)" : "scale(1)",
          }}
        />
      </div>
    </div>
  );
}
