"use client";

import { useRef } from "react";
import gsap from "gsap";
import SwipeDots from "@/components/SwipeDots";
import { waterfallGully } from "@/data/waterfallGully";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";
import useSwipeIndex, { scrollToSwipeSlide } from "@/hooks/useSwipeIndex";

const STEMS = [
  {
    id: "visit",
    label: "Visit",
    blurb: "Drop in for coffee, breakfast, or a wander through the aisles.",
  },
  {
    id: "return",
    label: "Return",
    blurb: "Make it a regular stop — locals, workers, and holiday makers alike.",
  },
  {
    id: "grow",
    label: "Grow",
    blurb: "Bring home plants and pots that suit coastal Peninsula gardens.",
  },
];

export default function LoyaltySection({ className = "" }) {
  const { links } = waterfallGully;
  const reducedMotion = useReducedMotion();
  const trackRef = useRef(null);
  const swipeIndex = useSwipeIndex(trackRef, STEMS.length);

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const stems = gsap.utils.toArray(root.querySelectorAll("[data-loyalty-stem]"));
      const vine = root.querySelector("[data-loyalty-vine]");

      if (reducedMotion) {
        gsap.set(stems, { opacity: 1, y: 0 });
        if (vine) {
          const len = vine.getTotalLength();
          gsap.set(vine, { strokeDasharray: len, strokeDashoffset: 0 });
        }
        return undefined;
      }

      gsap.set(stems, { opacity: 0, y: 32 });
      if (vine) {
        const len = vine.getTotalLength();
        gsap.set(vine, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(vine, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "top 35%",
            scrub: 0.6,
          },
        });
      }

      gsap.to(stems, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.querySelector("[data-loyalty-grid]"),
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      return undefined;
    },
    [reducedMotion],
  );

  return (
    <section
      ref={scope}
      className={`relative bg-parchment py-[var(--section-y)] ${className}`}
      aria-labelledby="loyalty-heading"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-4 md:px-6">
        <header className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-juniper">
            Garden regulars
          </p>
          <h2
            id="loyalty-heading"
            className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] text-juniper-dark"
          >
            For the garden regulars
          </h2>
          <p className="mt-3 text-sm text-basalt/85 md:text-base">
            Join our loyalty program via the link hub — details and sign-up
            live there, not on this page.
          </p>
          <a
            href={links.loyaltyUrl}
            className="btn-garden mt-6 inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join loyalty
          </a>
        </header>

        <svg
          className="mx-auto mt-10 hidden h-16 w-full max-w-2xl md:block"
          viewBox="0 0 640 64"
          aria-hidden="true"
        >
          <path
            data-loyalty-vine
            d="M8 48 Q160 8 320 40 T632 32"
            fill="none"
            stroke="var(--juniper)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>

        <div data-loyalty-grid className="mt-8">
          <ul
            ref={trackRef}
            className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto md:grid md:snap-none md:grid-cols-3 md:gap-8 md:overflow-visible"
            aria-label="Loyalty steps"
          >
            {STEMS.map((stem) => (
              <li
                key={stem.id}
                data-loyalty-stem
                data-swipe-slide
                className="w-[78vw] max-w-[20rem] shrink-0 snap-center rounded-[var(--radius-lg)] border border-juniper/10 bg-chalk/80 p-6 shadow-[var(--shadow-soft)] md:w-auto md:max-w-none md:shrink"
              >
                <h3 className="font-display text-2xl text-juniper-dark">
                  {stem.label}
                </h3>
                <p className="mt-2 text-sm text-basalt/80">{stem.blurb}</p>
              </li>
            ))}
          </ul>

          <SwipeDots
            count={STEMS.length}
            activeIndex={swipeIndex}
            label="Garden regulars"
            onSelect={(i) => scrollToSwipeSlide(trackRef, i)}
          />
        </div>
      </div>
    </section>
  );
}
