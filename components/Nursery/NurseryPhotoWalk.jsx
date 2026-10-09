"use client";

import Image from "next/image";
import gsap from "gsap";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const STOPS = [
  {
    id: "w1",
    src: "/images/waterfall-gully/nursery/walk-01-pots.png",
    alt: "Assorted potted plants and vessels outside the shop",
    tall: true,
  },
  {
    id: "w2",
    src: "/images/waterfall-gully/nursery/walk-02-indoor.png",
    alt: "Indoor snake plant in a white ceramic pot",
  },
  {
    id: "w3",
    src: "/images/waterfall-gully/nursery/walk-03-aisle.jpg",
    alt: "Garden path lined with flowers under a tree canopy",
    tall: true,
  },
  {
    id: "w4",
    src: "/images/waterfall-gully/nursery/walk-04-trees.png",
    alt: "Large garden tree with a swing in golden light",
  },
  {
    id: "w5",
    src: "/images/waterfall-gully/nursery/walk-05-gifts.png",
    alt: "Orange gift box with a black ribbon",
  },
  {
    id: "w6",
    src: "/images/waterfall-gully/nursery/walk-06-garden.png",
    alt: "Garden border with flowers, timber edging, and river stones",
  },
  {
    id: "w7",
    src: "/images/waterfall-gully/nursery/walk-07-storefront.png",
    alt: "Nursery storefront sign with potted flowers at the entrance",
    tall: true,
  },
];

export default function NurseryPhotoWalk({ className = "" }) {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const frames = gsap.utils.toArray(root.querySelectorAll("[data-walk-frame]"));
      const path = root.querySelector("[data-walk-path]");

      if (reducedMotion) {
        gsap.set(frames, { opacity: 1, y: 0 });
        if (path) {
          gsap.set(path, { scaleX: 1 });
        }
        return undefined;
      }

      gsap.set(frames, { opacity: 0, y: 18 });
      gsap.to(frames, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      if (path) {
        gsap.set(path, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(path, {
          scaleX: 1,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            toggleActions: "play none none reverse",
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
      className={`relative overflow-hidden bg-chalk py-[var(--section-y-tight)] ${className}`}
      aria-labelledby="nursery-walk-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mb-6 flex flex-col items-start justify-between gap-2 sm:mb-7 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-juniper">
              A slow wander
            </p>
            <h2
              id="nursery-walk-heading"
              className="mt-1 font-display text-[clamp(1.5rem,3vw,2.25rem)] text-juniper-dark"
            >
              Through the nursery
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm text-basalt/70 sm:text-right">
            A short sideways stroll past pots, aisles, and the storefront.
          </p>
        </header>

        <div
          className="overflow-x-auto pb-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-celadon/60"
          tabIndex={0}
          aria-label="Nursery photo walk"
        >
          <div className="relative w-max">
            <div
              data-walk-path
              className="pointer-events-none absolute left-1.5 right-8 top-[0.45rem] z-0 h-px bg-gradient-to-r from-celadon via-celadon/60 to-transparent"
              aria-hidden="true"
            />
            <ul className="relative z-10 flex snap-x snap-mandatory gap-3 md:gap-3.5">
              {STOPS.map((stop, i) => (
                <li key={stop.id} className="shrink-0 snap-start">
                  <span
                    className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-juniper/70"
                    aria-hidden="true"
                  >
                    <span className="inline-block size-1.5 rounded-full bg-safflower ring-2 ring-chalk" />
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <figure
                    data-walk-frame
                    className={`relative w-[7.25rem] overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-soft)] sm:w-[8.25rem] md:w-[9rem] ${
                      stop.tall ? "aspect-[3/4]" : "aspect-[5/4]"
                    }`}
                  >
                    <Image
                      src={stop.src}
                      alt={stop.alt}
                      fill
                      sizes="(max-width: 640px) 116px, 144px"
                      className="object-cover"
                    />
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
