"use client";

import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Dappled greenhouse light — gradient beams with gentle drift.
 */
export default function FilteredLight({ className = "" }) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 18% -5%, color-mix(in srgb, var(--safflower) 35%, transparent), transparent 58%), radial-gradient(ellipse 65% 50% at 88% 8%, color-mix(in srgb, var(--celadon) 45%, transparent), transparent 62%), linear-gradient(165deg, color-mix(in srgb, var(--chalk) 40%, transparent) 0%, transparent 45%)",
        }}
      />
      <div
        className={`absolute -left-1/4 top-0 h-full w-[70%] rotate-[-12deg] bg-gradient-to-br from-white/25 via-celadon/10 to-transparent blur-2xl ${reducedMotion ? "opacity-40" : "motion-safe-only animate-[light-sway_22s_ease-in-out_infinite_alternate]"}`}
      />
      <div
        className={`absolute -right-1/4 top-[10%] h-[80%] w-[55%] rotate-[8deg] bg-gradient-to-bl from-safflower/15 via-transparent to-transparent blur-3xl ${reducedMotion ? "opacity-30" : "motion-safe-only animate-[light-sway_30s_ease-in-out_infinite_alternate-reverse]"}`}
      />
      <style jsx>{`
        @keyframes light-sway {
          0% {
            transform: translate3d(0, 0, 0) rotate(-12deg);
            opacity: 0.35;
          }
          100% {
            transform: translate3d(24px, 12px, 0) rotate(-8deg);
            opacity: 0.55;
          }
        }
      `}</style>
    </div>
  );
}
