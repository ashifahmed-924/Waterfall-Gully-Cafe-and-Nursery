"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import BrandMark from "@/components/BrandMark";
import MobileMenu from "@/components/MobileMenu";
import { waterfallGully } from "@/data/waterfallGully";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const SCROLL_THRESHOLD = 48;

/**
 * Frosted navigation — readable over light hero media from the first paint.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shellRef = useRef(null);
  const brandRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { nav, links } = waterfallGully;

  const applyScrollState = useCallback(
    (isScrolled) => {
      const shell = shellRef.current;
      const brand = brandRef.current;
      if (!shell || !brand) {
        return;
      }

      shell.dataset.scrolled = isScrolled ? "true" : "false";

      if (reducedMotion) {
        gsap.set(brand, { scale: isScrolled ? 0.96 : 1 });
        return;
      }

      gsap.to(brand, {
        scale: isScrolled ? 0.96 : 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    [reducedMotion],
  );

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > SCROLL_THRESHOLD;
      setScrolled((prev) => {
        if (prev !== next) {
          applyScrollState(next);
        }
        return next;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [applyScrollState]);

  useGsapContext(() => {
    applyScrollState(window.scrollY > SCROLL_THRESHOLD);
    return undefined;
  }, [applyScrollState]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-6 md:pt-4">
        <div
          ref={shellRef}
          data-scrolled={scrolled ? "true" : "false"}
          className="pointer-events-auto flex w-full max-w-[1220px] items-center gap-3 rounded-2xl border border-chalk/25 bg-juniper-dark/55 px-3 py-2.5 shadow-[0_12px_40px_-18px_rgb(30_51_41_/_0.55)] backdrop-blur-xl transition-[background,border-color,box-shadow] duration-300 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-5 lg:py-3 data-[scrolled=true]:border-juniper/15 data-[scrolled=true]:bg-chalk/92 data-[scrolled=true]:shadow-[0_12px_40px_-16px_rgb(30_51_41_/_0.22)]"
        >
          <div ref={brandRef} className="min-w-0 origin-left lg:justify-self-start">
            <BrandMark
              href="#home"
              compact
              light={!scrolled}
              className="whitespace-nowrap"
            />
          </div>

          <nav
            className="hidden items-center justify-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 font-utility text-[0.8125rem] font-semibold tracking-wide no-underline transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-safflower ${
                  scrolled
                    ? "text-juniper-dark hover:bg-pale-celadon/80"
                    : "text-chalk/95 hover:bg-chalk/12 hover:text-chalk"
                }`}
                data-cursor="VIEW"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:justify-self-end lg:gap-3">
            <a
              href={links.giftCardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden font-utility text-xs font-semibold uppercase tracking-wider no-underline lg:inline-flex ${
                scrolled
                  ? "text-juniper hover:text-deep-clay"
                  : "text-pale-celadon hover:text-chalk"
              }`}
              data-cursor="GO"
            >
              Gift cards
            </a>
            <Link
              href="#visit"
              className="btn-garden hidden px-4 py-2.5 text-xs lg:inline-flex"
              data-cursor="GO"
            >
              Visit us
            </Link>

            <button
              type="button"
              className={`inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border font-utility backdrop-blur-sm transition lg:hidden ${
                scrolled
                  ? "border-juniper/20 bg-chalk/80 text-juniper-dark hover:bg-pale-celadon/70"
                  : "border-chalk/30 bg-chalk/15 text-chalk hover:bg-chalk/25"
              }`}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
                aria-hidden="true"
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "opacity-0" : ""}`}
                aria-hidden="true"
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
