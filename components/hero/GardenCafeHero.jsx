"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Coffee, Leaf, Users } from "lucide-react";
import CoffeeScene from "./CoffeeScene";
import GardenScene from "./GardenScene";
import HeroEmblem from "./HeroEmblem";
import HeroMediaControls from "./HeroMediaControls";
import HeroMotionContext, {
  HeroMotionProvider,
  useHeroMotion,
} from "./HeroMotionContext";
import HeroNavbar from "./HeroNavbar";
import OrganicDivider from "./OrganicDivider";
import "./GardenCafeHero.css";
import styles from "./heroStyles";

const FEATURES = [
  { id: "sustainable", icon: Leaf, label: "Sustainable practices" },
  { id: "local", icon: Coffee, label: "Locally sourced ingredients" },
  { id: "space", icon: Users, label: "A space for everyone" },
];

/**
 * Premium cinematic Garden + Café homepage hero.
 */
export default function GardenCafeHero() {
  return (
    <HeroMotionProvider>
      <HeroInner />
    </HeroMotionProvider>
  );
}

function HeroInner() {
  const rootRef = useRef(null);
  const [focusRegion, setFocusRegion] = useState(null);
  const [inView, setInView] = useState(true);
  const motionState = useHeroMotion();
  const { playing, reducedMotion } = motionState;
  const canAnimate = playing && !reducedMotion && inView;

  const lightX = useMotionValue(50);
  const lightY = useMotionValue(40);
  const springLX = useSpring(lightX, { stiffness: 50, damping: 20 });
  const springLY = useSpring(lightY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onPointerMove = useCallback(
    (event) => {
      if (!canAnimate || !rootRef.current) {
        return;
      }
      if (!window.matchMedia("(pointer: fine)").matches) {
        return;
      }
      const rect = rootRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      lightX.set(x);
      lightY.set(y);
    },
    [canAnimate, lightX, lightY],
  );

  const gatedMotion = {
    ...motionState,
    canAnimate,
  };

  return (
    <section
      ref={rootRef}
      id="home"
      className={styles.hero}
      aria-label="Welcome to Waterfall Gully Cafe and Nursery"
      onMouseMove={onPointerMove}
    >
      <HeroNavbar />

      <AmbientLightFollower
        springLX={springLX}
        springLY={springLY}
        active={canAnimate}
      />

      <HeroMotionContext.Provider value={gatedMotion}>
        <div
          className={`${styles.stage} ${
            focusRegion === "garden"
              ? styles.focusGarden
              : focusRegion === "coffee"
                ? styles.focusCoffee
                : ""
          }`}
        >
          <GardenScene
            emphasized={focusRegion === "garden"}
            onFocusRegion={setFocusRegion}
          />
          <OrganicDivider />
          <HeroEmblem />
          <CoffeeScene
            emphasized={focusRegion === "coffee"}
            onFocusRegion={setFocusRegion}
          />
        </div>
      </HeroMotionContext.Provider>

      <div className={styles.bottomBar}>
        <ul className={styles.features} aria-label="Cafe values">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.li
                key={feature.id}
                className={styles.feature}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15 + index * 0.08, duration: 0.5 }}
              >
                <span className={styles.featureIcon} aria-hidden="true">
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <span>{feature.label}</span>
              </motion.li>
            );
          })}
        </ul>

        <HeroMediaControls />
      </div>

      <div className={styles.bottomWave} aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,48 C180,96 360,8 540,40 C720,72 900,112 1080,72 C1260,32 1380,16 1440,40 L1440,120 L0,120 Z"
            fill="var(--chalk)"
          />
        </svg>
      </div>
    </section>
  );
}

function AmbientLightFollower({ springLX, springLY, active }) {
  const [pos, setPos] = useState({ x: 50, y: 40 });

  useEffect(() => {
    if (!active) {
      return undefined;
    }
    const unsubX = springLX.on("change", (v) => {
      setPos((prev) => ({ ...prev, x: v }));
    });
    const unsubY = springLY.on("change", (v) => {
      setPos((prev) => ({ ...prev, y: v }));
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [active, springLX, springLY]);

  if (!active) {
    return null;
  }

  return (
    <div
      className={styles.ambientLight}
      aria-hidden="true"
      style={{
        background: `radial-gradient(520px circle at ${pos.x}% ${pos.y}%, rgba(201,149,58,0.16), transparent 55%)`,
      }}
    />
  );
}
