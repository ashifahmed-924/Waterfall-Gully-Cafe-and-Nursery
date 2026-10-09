"use client";

import { motion } from "motion/react";
import { Leaf } from "lucide-react";
import { useHeroMotion } from "./HeroMotionContext";
import styles from "./heroStyles";

/**
 * Circular botanical seal sitting on the organic divider.
 */
export default function HeroEmblem() {
  const { canAnimate, reducedMotion } = useHeroMotion();

  return (
    <motion.div
      className={styles.emblem}
      aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        reducedMotion
          ? undefined
          : { scale: 1.06, transition: { duration: 0.35 } }
      }
    >
      <motion.div
        className={styles.emblemRing}
        animate={canAnimate ? { rotate: 360 } : { rotate: 0 }}
        transition={
          canAnimate
            ? { duration: 48, repeat: Infinity, ease: "linear" }
            : undefined
        }
      >
        <svg viewBox="0 0 120 120" className={styles.emblemSvg}>
          <defs>
            <path
              id="emblem-circle"
              d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
            />
          </defs>
          <text className={styles.emblemText}>
            <textPath href="#emblem-circle" startOffset="0%">
              GARDEN · COFFEE · COMMUNITY · NURSERY ·
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className={styles.emblemCore}>
        <Leaf size={28} strokeWidth={1.5} />
      </div>
    </motion.div>
  );
}
