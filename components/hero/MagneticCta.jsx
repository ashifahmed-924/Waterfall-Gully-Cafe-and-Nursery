"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useHeroMotion } from "./HeroMotionContext";
import styles from "./heroStyles";

/**
 * CTA with refined magnetic hover, outline sheen, and arrow slide.
 */
export default function MagneticCta({
  href,
  children,
  icon: Icon,
  variant = "solid",
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const { reducedMotion } = useHeroMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (event) => {
    if (reducedMotion || !ref.current) {
      return;
    }
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.18);
    y.set(dy * 0.22);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className={styles.ctaWrap}
    >
      <Link
        ref={ref}
        href={href}
        className={`${styles.cta} ${
          variant === "ghost" ? styles.ctaGhost : styles.ctaSolid
        } ${className}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="GO"
        {...rest}
      >
        {Icon ? <Icon className={styles.ctaIcon} aria-hidden="true" size={18} strokeWidth={1.75} /> : null}
        <span>{children}</span>
        <ArrowRight className={styles.ctaArrow} aria-hidden="true" size={16} strokeWidth={2} />
      </Link>
    </motion.div>
  );
}
