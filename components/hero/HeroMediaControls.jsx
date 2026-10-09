"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { waterfallGully } from "@/data/waterfallGully";
import { useHeroMotion } from "./HeroMotionContext";
import styles from "./heroStyles";

const PREVIEWS = [
  {
    src: waterfallGully.images.heroGardenSlides?.[1]?.src
      ?? waterfallGully.images.heroGarden,
    alt: "Garden terrace glimpse",
  },
  {
    src: waterfallGully.images.heroCafeSlides?.[0]?.src
      ?? waterfallGully.images.heroTable,
    alt: "Cafe coffee glimpse",
  },
  {
    src: waterfallGully.images.heroGardenSlides?.[0]?.src
      ?? "/images/waterfall-gully/hero/hero-garden-storefront.png",
    alt: "Storefront glimpse",
  },
];

/**
 * Cinematic media thumbnails with accessible play/pause for decorative motion.
 */
export default function HeroMediaControls() {
  const { playing, setPlaying, reducedMotion } = useHeroMotion();

  const label = playing ? "Pause decorative motion" : "Play decorative motion";

  return (
    <div className={styles.mediaControls}>
      <p className={styles.mediaLabel}>A glimpse inside</p>
      <div className={styles.mediaRow}>
        <ul className={styles.thumbs} aria-label="Scene previews">
          {PREVIEWS.map((preview) => (
            <li key={preview.src} className={styles.thumb}>
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes="56px"
                className={styles.thumbImg}
              />
            </li>
          ))}
        </ul>
        <motion.button
          type="button"
          className={styles.playBtn}
          aria-label={label}
          aria-pressed={playing}
          disabled={reducedMotion}
          onClick={() => setPlaying((v) => !v)}
          whileTap={reducedMotion ? undefined : { scale: 0.94 }}
        >
          {playing && !reducedMotion ? (
            <Pause size={18} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Play size={18} strokeWidth={1.75} aria-hidden="true" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
