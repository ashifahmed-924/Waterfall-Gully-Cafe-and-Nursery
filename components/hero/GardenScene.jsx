"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { Leaf } from "lucide-react";
import { waterfallGully } from "@/data/waterfallGully";
import BotanicalParticles from "./BotanicalParticles";
import MagneticCta from "./MagneticCta";
import { useHeroMotion } from "./HeroMotionContext";
import styles from "./heroStyles";

const GARDEN_SRC =
  waterfallGully.images.heroGardenSlides?.[1]?.src
  ?? waterfallGully.images.heroGarden
  ?? "/images/waterfall-gully/hero/hero-garden-terrace.png";

const GARDEN_ALT =
  waterfallGully.images.heroGardenSlides?.[1]?.alt
  ?? "Sunlit outdoor garden seating at Waterfall Gully";

/**
 * Left garden region — layered photography, wind sway, sunlight, pollen.
 */
export default function GardenScene({ emphasized, onFocusRegion }) {
  const { canAnimate, reducedMotion } = useHeroMotion();
  const rootRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });
  const parallax = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

  const onMove = (event) => {
    if (!canAnimate || !rootRef.current) {
      return;
    }
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    const rect = rootRef.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    mx.set(nx * -14);
    my.set(ny * -10);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={rootRef}
      className={`${styles.scene} ${styles.gardenScene} ${
        emphasized ? styles.sceneEmphasized : ""
      }`}
      onMouseEnter={() => onFocusRegion?.("garden")}
      onMouseLeave={() => {
        onFocusRegion?.(null);
        onLeave();
      }}
      onMouseMove={onMove}
    >
      <div className={styles.sceneMedia}>
        <motion.div
          className={styles.parallaxLayer}
          style={{ transform: canAnimate ? parallax : undefined }}
        >
          <Image
            src={GARDEN_SRC}
            alt={GARDEN_ALT}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className={styles.sceneImage}
            style={{ objectPosition: "35% 45%" }}
          />
        </motion.div>

        <div className={styles.gardenVeil} aria-hidden="true" />
        <motion.div
          className={styles.sunRays}
          aria-hidden="true"
          animate={
            canAnimate
              ? { opacity: [0.25, 0.45, 0.3], x: [0, 12, 0], rotate: [0, 2, 0] }
              : { opacity: 0.3 }
          }
          transition={
            canAnimate
              ? { duration: 11, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />
        <BotanicalParticles count={16} />

        <motion.div
          className={styles.foregroundFoliage}
          aria-hidden="true"
          animate={
            canAnimate
              ? { rotate: [-1.5, 1.8, -1.2, -1.5], y: [0, 4, -2, 0] }
              : undefined
          }
          transition={
            canAnimate
              ? { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />
      </div>

      <div className={styles.sceneCopy}>
        <motion.p
          className={styles.overline}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          Nature meets good company
        </motion.p>

        <h2 className={styles.headline}>
          <WordReveal text="A Greener" delay={0.5} />
          <WordReveal text="Brighter Day" delay={0.68} />
        </h2>

        <motion.p
          className={styles.body}
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.65 }}
        >
          Wander shaded paths, nursery aisles, and outdoor tables where
          Peninsula mornings feel unhurried and green.
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.55 }}
        >
          <MagneticCta href="#outdoor" variant="ghost" icon={Leaf}>
            Explore our garden
          </MagneticCta>
        </motion.div>

        <p className={styles.scriptAccent}>Good plants, better people</p>
      </div>
    </motion.article>
  );
}

function WordReveal({ text, delay = 0 }) {
  const { reducedMotion } = useHeroMotion();
  const words = text.split(" ");

  return (
    <span className={styles.headlineLine}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className={styles.wordMask}>
          <motion.span
            className={styles.wordInner}
            initial={reducedMotion ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: delay + index * 0.08,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
