"use client";

import Image from "next/image";
import { waterfallGully } from "@/data/waterfallGully";
import useReducedMotion from "@/hooks/useReducedMotion";

const { leafShadow } = waterfallGully.images;

/**
 * Soft drifting leaf shadow silhouettes — static when reduced motion.
 */
export default function LeafShadows({ className = "" }) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Image
        src={leafShadow}
        alt=""
        width={420}
        height={320}
        className={`absolute -left-[8%] top-[12%] w-[min(42vw,320px)] opacity-[0.14] mix-blend-multiply ${reducedMotion ? "" : "animate-[leaf-drift_28s_ease-in-out_infinite_alternate]"}`}
        priority={false}
      />
      <Image
        src={leafShadow}
        alt=""
        width={380}
        height={300}
        className={`absolute right-[-6%] top-[38%] w-[min(38vw,280px)] rotate-[18deg] scale-x-[-1] opacity-[0.11] mix-blend-multiply ${reducedMotion ? "" : "animate-[leaf-drift_34s_ease-in-out_infinite_alternate-reverse]"}`}
        priority={false}
      />
      <Image
        src={leafShadow}
        alt=""
        width={260}
        height={200}
        className={`absolute left-[22%] bottom-[8%] w-[min(28vw,200px)] rotate-[-12deg] opacity-[0.08] mix-blend-multiply ${reducedMotion ? "" : "animate-[leaf-drift_40s_ease-in-out_infinite_alternate]"}`}
        priority={false}
      />
      <style jsx>{`
        @keyframes leaf-drift {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(12px, -18px, 0) rotate(4deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[leaf-drift_28s_ease-in-out_infinite_alternate\\],
          .animate-\\[leaf-drift_34s_ease-in-out_infinite_alternate-reverse\\],
          .animate-\\[leaf-drift_40s_ease-in-out_infinite_alternate\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
