"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import MobileMenu from "@/components/MobileMenu";
import { waterfallGully } from "@/data/waterfallGully";
import { useHeroMotion } from "./HeroMotionContext";
import styles from "./heroStyles";

/**
 * Transparent editorial navbar over the cinematic hero imagery.
 * Becomes frosted after scroll so it stays usable across the page.
 */
export default function HeroNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { reducedMotion } = useHeroMotion();
  const { nav } = waterfallGully;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}
        initial={reducedMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.navInner}>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <BrandMark href="#home" compact light={!scrolled} />
          </motion.div>

          <nav className={styles.navLinks} aria-label="Primary">
            {nav.map((item, index) => (
              <motion.div
                key={item.href}
                initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + index * 0.06,
                  duration: 0.45,
                }}
              >
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${
                    scrolled ? styles.navLinkDark : ""
                  }`}
                  data-cursor="VIEW"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className={styles.navActions}>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className={styles.navVisitWrap}
            >
              <Link
                href="#visit"
                className={`${styles.navVisit} ${
                  scrolled ? styles.navVisitDark : ""
                }`}
                data-cursor="GO"
              >
                Visit us
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
            </motion.div>

            <button
              type="button"
              className={`${styles.navMenuBtn} ${
                scrolled ? styles.navMenuBtnDark : ""
              }`}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
