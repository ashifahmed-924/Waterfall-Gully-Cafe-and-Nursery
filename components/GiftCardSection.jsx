"use client";

import gsap from "gsap";
import { waterfallGully } from "@/data/waterfallGully";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";
import GardenPattern from "@/components/patterns/GardenPattern";

const LINE =
  "M24 96 Q140 40 260 88 T480 72";

export default function GiftCardSection({ className = "" }) {
  const { links } = waterfallGully;
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const card = root.querySelector("[data-gift-card]");
      const path = root.querySelector("[data-gift-line]");

      if (reducedMotion) {
        gsap.set(card, { rotate: 0, y: 0, opacity: 1 });
        if (path) {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: 0 });
        }
        return undefined;
      }

      gsap.set(card, { rotate: -5, y: 30, opacity: 0.85 });
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      }

      gsap.to(card, {
        rotate: 0,
        y: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          end: "top 40%",
          scrub: 0.6,
        },
      });

      if (path) {
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 68%",
            end: "top 38%",
            scrub: 0.5,
          },
        });
      }

      return undefined;
    },
    [reducedMotion],
  );

  return (
    <section
      ref={scope}
      className={`relative overflow-hidden bg-juniper py-[var(--section-y)] text-chalk ${className}`}
      aria-labelledby="gift-card-heading"
    >
      <GardenPattern className="absolute inset-0 opacity-40" id="gift-garden-pattern" fill="var(--chalk)" opacity={0.06} />

      <div className="relative mx-auto grid max-w-[var(--content-max)] items-center gap-10 px-4 md:grid-cols-2 md:gap-14 md:px-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-celadon">
            Website gift cards
          </p>
          <h2
            id="gift-card-heading"
            className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] text-chalk"
          >
            Give coffee, garden, time
          </h2>
          <p className="mt-4 max-w-md text-sm text-chalk/85 md:text-base">
            Digital gift cards through our link hub — a simple way to share a
            visit, a meal, or a plant haul.
          </p>
          <a
            href={links.giftCardUrl}
            className="btn-garden mt-8 inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy gift card
          </a>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div
            data-gift-card
            className="relative aspect-[1.586/1] w-full max-w-sm overflow-hidden rounded-2xl border border-chalk/20 bg-chalk shadow-[var(--shadow-lift)]"
            role="img"
            aria-label="Decorative website gift card artwork in chalk and juniper tones"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-chalk via-parchment to-pale-celadon" />
            <div className="relative flex h-full flex-col justify-between p-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-juniper">
                Waterfall Gully
              </p>
              <p className="font-display text-3xl text-juniper-dark">Gift card</p>
              <p className="font-body text-xs text-basalt/70">
                Cafe + nursery · Rosebud
              </p>
            </div>
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-safflower/30 blur-2xl"
              aria-hidden="true"
            />
          </div>

          <svg
            className="absolute -bottom-4 left-0 hidden w-full max-w-md md:block"
            viewBox="0 0 504 120"
            aria-hidden="true"
          >
            <path
              data-gift-line
              d={LINE}
              fill="none"
              stroke="var(--safflower)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
