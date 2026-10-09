"use client";

import { motion } from "motion/react";
import { useHeroMotion } from "./HeroMotionContext";
import styles from "./heroStyles";

const PATH_A =
  "M52,0 C58,12 44,22 50,34 C56,46 42,56 48,68 C54,80 40,90 46,100";
const PATH_B =
  "M50,0 C56,14 46,24 52,36 C58,48 44,58 50,70 C56,82 42,92 48,100";
const PATH_C =
  "M54,0 C48,13 58,23 48,35 C38,47 56,57 46,69 C36,81 54,91 50,100";

/**
 * Organic vine-inspired divider with slow morphing boundary and floating flora.
 */
export default function OrganicDivider() {
  const { canAnimate } = useHeroMotion();

  return (
    <div className={styles.divider} aria-hidden="true">
      <svg
        className={styles.dividerSvg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="dividerGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(247,246,242,0)" />
            <stop offset="20%" stopColor="rgba(247,246,242,0.35)" />
            <stop offset="50%" stopColor="rgba(247,246,242,0.55)" />
            <stop offset="80%" stopColor="rgba(247,246,242,0.35)" />
            <stop offset="100%" stopColor="rgba(247,246,242,0)" />
          </linearGradient>
          <filter id="dividerSoft" x="-40%" y="-10%" width="180%" height="120%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>
        <motion.path
          d={PATH_A}
          fill="none"
          stroke="url(#dividerGlow)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          filter="url(#dividerSoft)"
          animate={
            canAnimate
              ? { d: [PATH_A, PATH_B, PATH_C, PATH_A] }
              : { d: PATH_A }
          }
          transition={
            canAnimate
              ? { duration: 16, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />
        <motion.path
          d={PATH_A}
          fill="none"
          stroke="rgba(58,107,82,0.55)"
          strokeWidth="6"
          vectorEffect="non-scaling-stroke"
          opacity="0.35"
          animate={
            canAnimate
              ? { d: [PATH_A, PATH_C, PATH_B, PATH_A] }
              : { d: PATH_A }
          }
          transition={
            canAnimate
              ? { duration: 18, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />
      </svg>

      <FloatingLeaf className={styles.leafOne} delay={0} />
      <FloatingLeaf className={styles.leafTwo} delay={1.2} flip />
      <FloatingFlower className={styles.flowerOne} delay={0.4} />
      <FloatingFlower className={styles.flowerTwo} delay={1.8} />
      <FloatingLeaf className={styles.leafThree} delay={2.1} />
    </div>
  );
}

function FloatingLeaf({ className, delay = 0, flip = false }) {
  const { canAnimate } = useHeroMotion();

  return (
    <motion.span
      className={`${styles.floatLeaf} ${className}`}
      style={{ scaleX: flip ? -1 : 1 }}
      animate={
        canAnimate
          ? {
              y: [0, -10, 4, 0],
              rotate: [flip ? 8 : -6, flip ? -4 : 10, flip ? 6 : -2, flip ? 8 : -6],
            }
          : undefined
      }
      transition={
        canAnimate
          ? { duration: 7.5, delay, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      <svg viewBox="0 0 48 64" fill="none">
        <path
          d="M24 2C14 14 6 28 8 44c2 12 10 16 16 18 6-2 14-6 16-18 2-16-6-30-16-42Z"
          fill="currentColor"
          opacity="0.85"
        />
        <path
          d="M24 10v44"
          stroke="rgba(247,246,242,0.35)"
          strokeWidth="1.2"
        />
      </svg>
    </motion.span>
  );
}

function FloatingFlower({ className, delay = 0 }) {
  const { canAnimate } = useHeroMotion();

  return (
    <motion.span
      className={`${styles.floatFlower} ${className}`}
      animate={
        canAnimate
          ? {
              y: [0, 8, -4, 0],
              rotate: [-4, 6, -2, -4],
            }
          : undefined
      }
      transition={
        canAnimate
          ? { duration: 6.2, delay, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      <svg viewBox="0 0 40 40" fill="none">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="20"
            cy="12"
            rx="5"
            ry="9"
            fill="rgba(247,246,242,0.92)"
            transform={`rotate(${deg} 20 20)`}
          />
        ))}
        <circle cx="20" cy="20" r="4.5" fill="#c9953a" />
      </svg>
    </motion.span>
  );
}
