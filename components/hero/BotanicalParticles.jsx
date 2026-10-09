"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { useHeroMotion } from "./HeroMotionContext";
import styles from "./heroStyles";

function seeded(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Lightweight pollen / atmospheric light particles for the garden side.
 */
export default function BotanicalParticles({ count = 18 }) {
  const { canAnimate } = useHeroMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r1 = seeded(i + 1);
        const r2 = seeded(i + 17);
        const r3 = seeded(i + 41);
        return {
          id: i,
          left: `${8 + r1 * 78}%`,
          top: `${12 + r2 * 70}%`,
          size: 2 + r3 * 4,
          duration: 7 + r1 * 8,
          delay: r2 * 5,
          drift: 12 + r3 * 28,
        };
      }),
    [count],
  );

  if (!canAnimate) {
    return null;
  }

  return (
    <div className={styles.particleLayer} aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={styles.particle}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -p.drift, 0],
            x: [0, p.drift * 0.35, -p.drift * 0.2, 0],
            opacity: [0.15, 0.7, 0.25, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
