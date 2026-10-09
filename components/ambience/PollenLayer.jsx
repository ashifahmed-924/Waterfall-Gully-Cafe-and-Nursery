"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

function usePollenCount() {
  const [count, setCount] = useState(6);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setCount(24);
      } else if (w >= 768) {
        setCount(10);
      } else {
        setCount(Math.min(6, Math.max(0, Math.floor(w / 80))));
      }
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function seedRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Floating pollen motes — disabled for reduced motion; pauses when tab hidden.
 */
export default function PollenLayer({ className = "" }) {
  const reducedMotion = useReducedMotion();
  const count = usePollenCount();
  const layerRef = useRef(null);
  const pausedRef = useRef(false);

  const particles = useMemo(() => {
    const rand = seedRandom(9031);
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      size: 2 + rand() * 3.5,
      duration: 14 + rand() * 18,
      delay: rand() * -20,
      drift: 12 + rand() * 28,
      opacity: 0.15 + rand() * 0.35,
    }));
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    const onVisibility = () => {
      pausedRef.current = document.hidden;
      const layer = layerRef.current;
      if (!layer) {
        return;
      }
      layer.style.animationPlayState = document.hidden ? "paused" : "running";
      layer.querySelectorAll("[data-pollen]").forEach((node) => {
        node.style.animationPlayState = document.hidden ? "paused" : "running";
      });
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [reducedMotion]);

  if (reducedMotion || count === 0) {
    return null;
  }

  return (
    <div
      ref={layerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.slice(0, count).map((p) => (
        <span
          key={p.id}
          data-pollen
          className="absolute rounded-full bg-safflower/80 blur-[0.5px] will-change-transform"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `pollen-float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            ["--pollen-drift"]: `${p.drift}px`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes pollen-float {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(var(--pollen-drift, 16px), -32px, 0);
          }
        }
      `}</style>
    </div>
  );
}
