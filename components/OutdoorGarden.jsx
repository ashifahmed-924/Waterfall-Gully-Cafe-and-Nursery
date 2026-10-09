"use client";

import Image from "next/image";
import gsap from "gsap";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function OutdoorGarden({ className = "" }) {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const frame = root.querySelector("[data-outdoor-frame]");
      const copy = root.querySelector("[data-outdoor-copy]");

      if (reducedMotion) {
        gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(copy, { y: 0, opacity: 1 });
        return undefined;
      }

      gsap.set(frame, { clipPath: "inset(8% 12% 8% 12% round 1rem)" });
      gsap.set(copy, { y: 40, opacity: 0.6 });

      gsap.to(frame, {
        clipPath: "inset(0% 0% 0% 0% round 0rem)",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "center center",
          scrub: 0.7,
        },
      });

      gsap.to(copy, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "top 35%",
          scrub: 0.5,
        },
      });

      return undefined;
    },
    [reducedMotion],
  );

  return (
    <section
      id="outdoor"
      ref={scope}
      className={`relative bg-pale-celadon/40 py-[var(--section-y)] ${className}`}
      aria-labelledby="outdoor-heading"
    >
      <div className="mx-auto max-w-[96rem] px-4 md:px-6">
        <div
          data-outdoor-copy
          className="mb-8 max-w-lg md:absolute md:left-6 md:top-8 md:z-[2] md:mb-0 md:max-w-md lg:left-10"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-juniper">
            Dogs welcome outdoors
          </p>
          <h2
            id="outdoor-heading"
            className="mt-2 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-tight text-juniper-dark"
          >
            Take a table outside
          </h2>
          <p className="mt-3 text-sm text-basalt/85 md:text-base">
            Settle among the greenery with your coffee — outdoor seating when
            the weather suits.
          </p>
        </div>

        <div
          data-outdoor-frame
          className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]"
        >
          <Image
            src="/images/waterfall-gully/nursery/outdoor-dining.jpg"
            alt="Stock image style outdoor cafe seating surrounded by plants"
            fill
            sizes="(max-width: 768px) 100vw, 96rem"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-juniper-dark/25 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
