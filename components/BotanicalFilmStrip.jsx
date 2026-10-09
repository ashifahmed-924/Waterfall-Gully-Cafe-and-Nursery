"use client";

import Image from "next/image";
import gsap from "gsap";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const ROW_A = [
  { src: "/images/waterfall-gully/gallery/01.jpg", alt: "Stock image style cafe and garden scene", ratio: "aspect-[4/5]" },
  { src: "/images/waterfall-gully/gallery/02.jpg", alt: "Stock image style coffee and morning light", ratio: "aspect-square" },
  { src: "/images/waterfall-gully/gallery/03.jpg", alt: "Stock image style breakfast plate on a table", ratio: "aspect-[3/2]" },
  { src: "/images/waterfall-gully/gallery/04.jpg", alt: "Stock image style baked goods in a display case", ratio: "aspect-[5/4]" },
];

const ROW_B = [
  { src: "/images/waterfall-gully/gallery/05.jpg", alt: "Stock image style nursery plants in rows", ratio: "aspect-[3/4]" },
  { src: "/images/waterfall-gully/gallery/06.jpg", alt: "Stock image style potted plants grouped together", ratio: "aspect-[4/3]" },
  { src: "/images/waterfall-gully/gallery/07.jpg", alt: "Stock image style outdoor seating among greenery", ratio: "aspect-[16/9]" },
  { src: "/images/waterfall-gully/gallery/08.jpg", alt: "Stock image style gift items in a plant shop", ratio: "aspect-square" },
];

function FilmRow({ items, dataBand, reverse = false, className = "" }) {
  return (
    <div
      data-film-band={dataBand}
      className={`flex gap-3 md:gap-4 ${reverse ? "md:justify-end" : ""} ${className}`}
    >
      {items.map((item, i) => (
        <figure
          key={`${dataBand}-${i}`}
          className={`relative h-48 w-36 shrink-0 overflow-hidden rounded-lg md:h-56 md:w-44 lg:h-64 lg:w-52 ${item.ratio} transition-transform duration-500 md:hover:scale-[1.02]`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 144px, 208px"
            className="object-cover"
          />
        </figure>
      ))}
    </div>
  );
}

export default function BotanicalFilmStrip({ className = "" }) {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const bandA = root.querySelector('[data-film-band="a"]');
      const bandB = root.querySelector('[data-film-band="b"]');

      if (reducedMotion || !bandA || !bandB) {
        gsap.set([bandA, bandB].filter(Boolean), { x: 0 });
        return undefined;
      }

      gsap.to(bandA, {
        x: "-8%",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(bandB, {
        x: "8%",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      return undefined;
    },
    [reducedMotion],
  );

  return (
    <section
      id="gallery"
      ref={scope}
      className={`overflow-hidden bg-chalk py-[var(--section-y)] ${className}`}
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto mb-8 max-w-[var(--content-max)] px-4 md:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-juniper">
          Gallery
        </p>
        <h2
          id="gallery-heading"
          className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] text-juniper-dark"
        >
          Cafe & nursery moments
        </h2>
      </div>

      <div className="hidden flex-col gap-4 md:flex">
        <FilmRow items={ROW_A} dataBand="a" />
        <FilmRow items={ROW_B} dataBand="b" reverse />
      </div>

      <div
        className="flex gap-3 overflow-x-auto px-4 pb-2 md:hidden"
        role="region"
        aria-label="Gallery scroll"
        tabIndex={0}
      >
        {[...ROW_A, ...ROW_B].map((item, i) => (
          <figure
            key={`mobile-g-${i}`}
            className={`relative h-52 w-40 shrink-0 overflow-hidden rounded-lg ${item.ratio}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="160px"
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
