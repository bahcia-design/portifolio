"use client";

import { useEffect, useState } from "react";

/** Carrossel elegante de telas (slide horizontal suave + bolinhas).
 *  Usado no celular pra passar pelas telas do app em loop. */

const SLIDE = 650; // ms da transição
const HOLD = 2800; // ms parado em cada tela

export default function Carousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    if (images.length <= 1) return;
    let cur = 0;
    const timers: number[] = [];
    const wait = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const step = () => {
      const next = (cur + 1) % images.length;
      setPrev(cur);
      setIdx(next);
      setEntering(false);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setEntering(true)),
      );
      cur = next;
      wait(step, SLIDE + HOLD);
    };
    wait(step, HOLD);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [images.length]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {images.map((src, i) => {
        const isCur = i === idx;
        const isPrev = i === prev;
        if (!isCur && !isPrev) return null;
        const transform = isCur
          ? entering
            ? "translateX(0)"
            : "translateX(100%)"
          : entering
            ? "translateX(-100%)"
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
              className="h-full w-full object-cover object-top"
              draggable={false}
            />
          </div>
        );
      })}

      {/* bolinhas de paginação */}
      <div className="absolute inset-x-0 bottom-2.5 z-10 flex items-center justify-center gap-1.5">
        <div className="flex items-center gap-1.5 rounded-full bg-black/35 px-2 py-1 backdrop-blur-sm">
          {images.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 14 : 6,
                backgroundColor: i === idx ? "#ffffff" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
