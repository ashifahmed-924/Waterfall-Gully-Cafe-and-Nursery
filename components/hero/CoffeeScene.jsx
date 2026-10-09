"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { Coffee } from "lucide-react";
import CoffeeSteam from "./CoffeeSteam";
import MagneticCta from "./MagneticCta";
import { useHeroMotion } from "./HeroMotionContext";
import styles from "./heroStyles";

const COFFEE_SRC = "/images/waterfall-gully/hero/hero-cafe-cups.png";
const COFFEE_ALT = "Warm cafe cups and coffee service at Waterfall Gully";
const BEAN_SRC = "/images/waterfall-gully/hero/hero-cafe-latte.png";

/**
 * Right coffee region — warm layered photography, steam, shifting light.
 */
export default function CoffeeScene({ emphasized, onFocusRegion }) {
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
    mx.set(nx * 12);
    my.set(ny * 8);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={rootRef}
      className={`${styles.scene} ${styles.coffeeScene} ${
        emphasized ? styles.sceneEmphasized : ""
      }`}
      onMouseEnter={() => onFocusRegion?.("coffee")}
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
            src={COFFEE_SRC}
            alt={COFFEE_ALT}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className={styles.sceneImage}
            style={{ objectPosition: "55% 45%" }}
          />
        </motion.div>

        <div className={styles.coffeeVeil} aria-hidden="true" />
        <motion.div
          className={styles.warmLight}
          aria-hidden="true"
          animate={
            canAnimate
              ? {
                  opacity: [0.35, 0.55, 0.4],
                  backgroundPosition: ["30% 20%", "55% 35%", "30% 20%"],
                }
              : { opacity: 0.4 }
          }
          transition={
            canAnimate
              ? { duration: 9, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />

        <CoffeeSteam />

        <motion.div
          className={styles.beanAccent}
          aria-hidden="true"
          animate={
            canAnimate
              ? { y: [0, -6, 3, 0], rotate: [0, 4, -2, 0] }
              : undefined
          }
          transition={
            canAnimate
              ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          <Image
            src={BEAN_SRC}
            alt=""
            width={120}
            height={80}
            className={styles.beanImg}
          />
        </motion.div>
      </div>

      <div className={`${styles.sceneCopy} ${styles.coffeeCopy}`}>
        <motion.p
          className={styles.overline}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          More than coffee
        </motion.p>

        <h2 className={styles.headline}>
          <WordReveal text="Coffee Grows" delay={0.58} />
          <WordReveal text="Connections" delay={0.76} />
        </h2>

        <motion.p
          className={styles.body}
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.65 }}
        >
          From early lattes to cabinet favourites, the cafe is where locals
          gather before browsing plants next door.
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.55 }}
        >
          <MagneticCta href="#menu" variant="solid" icon={Coffee}>
            View our menu
          </MagneticCta>
        </motion.div>

        <p className={`${styles.scriptAccent} ${styles.scriptCoffee}`}>
          Better coffee, brighter mornings
        </p>
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
