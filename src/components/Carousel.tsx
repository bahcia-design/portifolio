"use client";

import { useEffect, useRef, useState } from "react";

/** Carrossel de telas: autoplay em loop + o usuário pode passar na mão
 *  (swipe/arrasto) e clicar nas bolinhas. */

const SLIDE = 650; // ms da transição
const HOLD = 2800; // ms parado em cada tela (autoplay)

export default function Carousel({ images }: { images: string[] }) {
  const n = images.length;
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [entering, setEntering] = useState(true);
  const [dir, setDir] = useState<1 | -1>(1);
  const idxRef = useRef(0);
  const timerRef = useRef(0);

  // Vai pra tela idx+delta (delta>0 = próxima), com a direção certa do slide.
  const go = (delta: number) => {
    if (n <= 1 || !delta) return;
    const next = ((idxRef.current + delta) % n + n) % n;
    if (next === idxRef.current) return;
    setDir(delta > 0 ? 1 : -1);
    setPrev(idxRef.current);
    idxRef.current = next;
    setIdx(next);
    setEntering(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntering(true)),
    );
  };

  // (Re)inicia o autoplay.
  const scheduleAuto = () => {
    window.clearTimeout(timerRef.current);
    if (n <= 1) return;
    const tick = () => {
      go(1);
      timerRef.current = window.setTimeout(tick, SLIDE + HOLD);
    };
    timerRef.current = window.setTimeout(tick, SLIDE + HOLD);
  };

  useEffect(() => {
    scheduleAuto();
    return () => window.clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  // Arrasto/swipe (mouse, touch, pen) — release-based.
  const startX = useRef<number | null>(null);
  const onDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) {
      go(dx < 0 ? 1 : -1); // arrastou pra esquerda = próxima
      scheduleAuto();
    }
  };

  const goTo = (i: number) => {
    go(i - idxRef.current);
    scheduleAuto();
  };

  return (
    <div
      className="relative h-full w-full cursor-grab touch-pan-y select-none overflow-hidden bg-black active:cursor-grabbing"
      onPointerDown={onDown}
      onPointerUp={onUp}
    >
      {images.map((src, i) => {
        const isCur = i === idx;
        const isPrev = i === prev;
        if (!isCur && !isPrev) return null;
        const transform = isCur
          ? entering
            ? "translateX(0)"
            : `translateX(${dir * 100}%)`
          : entering
            ? `translateX(${-dir * 100}%)`
            : "translateX(0)";
        return (
          <div
            key={src}
            className="absolute inset-0"
            style={{
              transform,
              zIndex: isCur ? 2 : 1,
              transition: `transform ${SLIDE}ms cubic-bezier(0.65, 0, 0.35, 1)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="pointer-events-none h-full w-full object-cover object-top"
              draggable={false}
            />
          </div>
        );
      })}

      {/* bolinhas de paginação (clicáveis) */}
      <div className="absolute inset-x-0 bottom-2.5 z-10 flex items-center justify-center">
        <div className="flex items-center gap-1.5 rounded-full bg-black/35 px-2 py-1 backdrop-blur-sm">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para a tela ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 14 : 6,
                backgroundColor:
                  i === idx ? "#ffffff" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
