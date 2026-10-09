"use client";

import { useEffect, useRef, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

const LABELS = {
  taste: "TASTE",
  grow: "GROW",
  view: "VIEW",
  go: "GO",
};

function isTouchDevice() {
  if (typeof window === "undefined") {
    return true;
  }
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

/**
 * Optional desktop cursor — reads data-cursor on hovered targets.
 */
export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const ringRef = useRef(null);
  const labelElRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (reducedMotion || isTouchDevice()) {
      setEnabled(false);
      return undefined;
    }

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    const onOver = (event) => {
      const el = event.target.closest("[data-cursor]");
      if (!el) {
        setLabel("");
        ringRef.current?.classList.remove("scale-150");
        return;
      }
      const key = el.getAttribute("data-cursor")?.toLowerCase();
      setLabel(LABELS[key] ?? "");
      ringRef.current?.classList.add("scale-150");
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      const ring = ringRef.current;
      if (ring) {
        ring.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      const labelEl = labelElRef.current;
      if (labelEl) {
        labelEl.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y - 28}px, 0) translate(-50%, -100%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reducedMotion]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-12 w-12 rounded-full border border-juniper/35 bg-chalk/25 backdrop-blur-sm transition-transform duration-200 will-change-transform mix-blend-multiply"
        aria-hidden="true"
      />
      <div
        ref={labelElRef}
        className="pointer-events-none fixed left-0 top-0 z-[101] font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em] text-juniper-dark opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100"
        data-visible={label ? "true" : "false"}
        aria-hidden="true"
      >
        {label}
      </div>
      <style jsx global>{`
        .has-custom-cursor,
        .has-custom-cursor a,
        .has-custom-cursor button {
          cursor: none;
        }
      `}</style>
    </>
  );
}
