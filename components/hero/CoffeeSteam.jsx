"use client";

import { motion } from "motion/react";
import { useHeroMotion } from "./HeroMotionContext";
import styles from "./heroStyles";

const RIBBONS = [
  { id: "a", delay: 0, x: "42%", duration: 4.8 },
  { id: "b", delay: 1.4, x: "50%", duration: 5.4 },
  { id: "c", delay: 2.6, x: "58%", duration: 5.1 },
];

/**
 * Soft curling steam ribbons rising from the coffee cup region.
 */
export default function CoffeeSteam() {
  const { canAnimate } = useHeroMotion();

  if (!canAnimate) {
    return null;
  }

  return (
    <div className={styles.steamLayer} aria-hidden="true">
      {RIBBONS.map((ribbon) => (
        <motion.span
          key={ribbon.id}
          className={styles.steamRibbon}
          style={{ left: ribbon.x }}
          initial={{ opacity: 0, y: 18, scaleX: 0.7, scaleY: 0.6 }}
          animate={{
            opacity: [0, 0.55, 0.35, 0],
            y: [18, -28, -72, -110],
            x: [0, 8, -6, 4],
            scaleX: [0.7, 1, 1.15, 1.3],
            scaleY: [0.6, 1.1, 1.4, 1.7],
            rotate: [0, 4, -3, 2],
          }}
          transition={{
            duration: ribbon.duration,
            delay: ribbon.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
