"use client";

import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Subtle water / soil ripple texture overlay.
 */
export default function RippleTexture({ className = "" }) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-soft-light ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
            <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>
            <rect width='160' height='160' filter='url(%23n)' opacity='0.35'/>
            <path d='M0 80 Q40 72 80 80 T160 80' fill='none' stroke='%23315d63' stroke-opacity='0.08' stroke-width='1'/>
            <path d='M0 100 Q40 108 80 100 T160 100' fill='none' stroke='%23aec5ad' stroke-opacity='0.12' stroke-width='1'/>
          </svg>
        `)}")`,
        backgroundSize: "160px 160px",
      }}
    >
      {!reducedMotion && (
        <div
          className="motion-safe-only absolute inset-0 animate-[ripple-shift_48s_linear_infinite]"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
              <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
                <circle cx='100' cy='100' r='40' fill='none' stroke='%23aec5ad' stroke-opacity='0.06' stroke-width='1'/>
                <circle cx='100' cy='100' r='70' fill='none' stroke='%23315d63' stroke-opacity='0.05' stroke-width='1'/>
              </svg>
            `)}")`,
            backgroundSize: "200px 200px",
          }}
        />
      )}
      <style jsx>{`
        @keyframes ripple-shift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 200px 120px;
          }
        }
      `}</style>
    </div>
  );
}
