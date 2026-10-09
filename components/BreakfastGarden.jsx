"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const BEDS = [
  {
    id: "bed-01",
    label: "BED 01",
    name: "Homemade Rosti",
    image: "/images/waterfall-gully/food/rosti.jpg",
    alt: "Homemade-style potato rosti brunch plate",
  },
  {
    id: "bed-02",
    label: "BED 02",
    name: "Eggs Benedict",
    image: "/images/waterfall-gully/food/eggs-benedict.jpg",
    alt: "Classic eggs benedict-style brunch plate",
  },
  {
    id: "bed-03",
    label: "BED 03",
    name: "Egg & Bacon Roll",
    image: "/images/waterfall-gully/food/bacon-roll.jpg",
    alt: "Egg and bacon breakfast roll",
  },
  {
    id: "bed-04",
    label: "BED 04",
    name: "Brekky Wrap",
    image: "/images/waterfall-gully/food/brekky-wrap.jpg",
    alt: "Filled breakfast wrap with greens",
  },
];

function BedCard({ bed, index }) {
  return (
    <article
      data-bed
      className="group relative flex w-[min(78vw,19rem)] shrink-0 flex-col md:w-[min(42vw,17rem)] lg:w-[min(24vw,15rem)]"
    >
      <div className="mb-3 flex items-baseline justify-between gap-2 border-b border-celadon/60 pb-2">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-deep-clay">
          {bed.label}
        </span>
        <span className="font-utility text-[0.6875rem] font-semibold uppercase tracking-wide text-juniper">
          ASK IN CAFE
        </span>
      </div>
      <div className="relative overflow-hidden rounded-[10px] bg-pale-celadon/40">
        <div className="relative aspect-[4/5] transition-transform duration-500 ease-out md:group-hover:scale-[1.02]">
          <Image
            src={bed.image}
            alt={bed.alt}
            fill
            sizes="(max-width: 768px) 78vw, 24vw"
            className="object-cover"
          />
        </div>
        <span
          data-bed-marker
          className="pointer-events-none absolute bottom-3 left-3 hidden h-px w-0 bg-safflower md:block"
          aria-hidden="true"
        />
      </div>
      <h3 className="mt-3 font-display text-xl text-juniper-dark">{bed.name}</h3>
      <p className="font-mono text-[0.625rem] uppercase tracking-widest text-basalt/60">
        Morning menu · #{String(index + 1).padStart(2, "0")}
      </p>
    </article>
  );
}

export default function BreakfastGarden({ className = "" }) {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root || reducedMotion) {
        return undefined;
      }

      const row = root.querySelector("[data-bed-row]");
      const beds = gsap.utils.toArray(root.querySelectorAll("[data-bed]"));

      gsap.fromTo(
        row,
        { x: 40 },
        {
          x: () => -(row.scrollWidth - row.clientWidth + 24),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );

      const cleanups = beds.map((bed) => {
        const marker = bed.querySelector("[data-bed-marker]");
        if (!marker) {
          return undefined;
        }
        const onEnter = () => {
          gsap.to(marker, { width: "3.5rem", duration: 0.35, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(marker, { width: 0, duration: 0.3, ease: "power2.in" });
        };
        bed.addEventListener("mouseenter", onEnter);
        bed.addEventListener("mouseleave", onLeave);
        return () => {
          bed.removeEventListener("mouseenter", onEnter);
          bed.removeEventListener("mouseleave", onLeave);
        };
      });

      return () => {
        cleanups.forEach((fn) => {
          if (typeof fn === "function") {
            fn();
          }
        });
      };
    },
    [reducedMotion],
  );

  return (
    <section
      id="breakfast"
      ref={scope}
      className={`section-rhythm overflow-hidden bg-pale-celadon/35 ${className}`}
      aria-labelledby="breakfast-heading"
    >
      <div className="section-inner mb-10">
        <p className="section-eyebrow">Morning beds</p>
        <h2
          id="breakfast-heading"
          className="mt-2 font-display text-[clamp(2rem,4.5vw,3.25rem)] text-juniper-dark"
        >
          Breakfast in the garden.
        </h2>
        <p className="section-lead mt-4">
          Scroll the beds — hearty plates and rolls from the morning line. Pricing
          at the counter; ask in cafe for today&apos;s specials.
        </p>
      </div>

      <div className="pl-[max(1rem,calc((100%-72rem)/2+1rem))]">
        <div
          data-bed-row
          className="flex gap-6 pb-4 pr-6 md:gap-8"
        >
          {BEDS.map((bed, index) => (
            <BedCard key={bed.id} bed={bed} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
