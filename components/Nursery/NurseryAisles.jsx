"use client";

import { useRef, useState } from "react";
import NurseryAisle from "@/components/Nursery/NurseryAisle";
import SwipeDots from "@/components/SwipeDots";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";
import useSwipeIndex, { scrollToSwipeSlide } from "@/hooks/useSwipeIndex";
import gsap from "gsap";

const AISLES = [
  {
    id: "indoor",
    label: "Indoor",
    image: "/images/waterfall-gully/nursery/indoor-plants.jpg",
    alt: "Stock image style nursery aisle with indoor potted plants",
  },
  {
    id: "garden",
    label: "Garden",
    image: "/images/waterfall-gully/nursery/aisle-garden-cacti.png",
    alt: "Sunlit nursery display of potted cacti and succulents",
  },
  {
    id: "trees",
    label: "Trees",
    image: "/images/waterfall-gully/nursery/aisle-trees-palm.png",
    alt: "Potted palm plant against a clean white backdrop",
  },
  {
    id: "gifts",
    label: "Gifts",
    image: "/images/waterfall-gully/nursery/gifts.jpg",
    alt: "Stock image style gift and homewares display in a plant nursery",
  },
];

export default function NurseryAisles({ className = "" }) {
  const [activeId, setActiveId] = useState(null);
  const trackRef = useRef(null);
  const swipeIndex = useSwipeIndex(trackRef, AISLES.length);
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const heading = root.querySelector("[data-aisles-heading]");
      const rows = gsap.utils.toArray(root.querySelectorAll("[data-aisle-item]"));

      if (reducedMotion) {
        gsap.set([heading, ...rows], { opacity: 1, y: 0 });
        return undefined;
      }

      gsap.set(heading, { opacity: 0, y: 28 });
      gsap.set(rows, { opacity: 0, y: 40 });

      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(rows, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.querySelector("[data-aisles-grid]"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      return undefined;
    },
    [reducedMotion],
  );

  return (
    <section
      id="nursery"
      ref={scope}
      className={`relative bg-parchment py-[var(--section-y)] ${className}`}
      aria-labelledby="nursery-aisles-heading"
    >
      <div className="mx-auto max-w-[96rem] px-4 md:px-6">
        <header className="mb-8 max-w-xl md:mb-10" data-aisles-heading>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-juniper">
            On-site nursery
          </p>
          <h2
            id="nursery-aisles-heading"
            className="mt-2 font-display text-[clamp(2rem,4.5vw,3.25rem)] text-juniper-dark"
          >
            Wander the aisles
          </h2>
          <p className="mt-3 font-body text-sm text-basalt/80 md:text-base">
            Coastal-friendly plants, pots, and small gifts — browse in person
            alongside your coffee run.
          </p>
        </header>
      </div>

      <div data-aisles-grid>
        <div
          ref={trackRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:snap-none md:gap-2 md:overflow-visible md:px-4"
          tabIndex={0}
          aria-label="Nursery aisle cards"
        >
          {AISLES.map((aisle, index) => (
            <div
              key={aisle.id}
              data-aisle-item
              data-swipe-slide
              className="w-[82vw] max-w-[22rem] shrink-0 snap-center md:contents md:w-auto md:max-w-none md:shrink"
            >
              <NurseryAisle
                label={aisle.label}
                image={aisle.image}
                alt={aisle.alt}
                isActive={activeId === aisle.id}
                onActivate={() => setActiveId(aisle.id)}
                onDeactivate={() => setActiveId(null)}
                className={`min-h-[340px] rounded-xl md:min-h-[min(78vh,720px)] md:rounded-none ${
                  index === 0 ? "md:rounded-l-xl" : ""
                } ${index === AISLES.length - 1 ? "md:rounded-r-xl" : ""}`}
              />
            </div>
          ))}
        </div>

        <SwipeDots
          count={AISLES.length}
          activeIndex={swipeIndex}
          label="Nursery aisle"
          onSelect={(i) => scrollToSwipeSlide(trackRef, i)}
        />
      </div>
    </section>
  );
}
