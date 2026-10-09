"use client";

import Image from "next/image";
import gsap from "gsap";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function NurseryTransition({ className = "" }) {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const bg = root.querySelector("[data-nursery-bg]");
      const coffee = root.querySelector("[data-word-coffee]");
      const mid = root.querySelector("[data-word-mid]");
      const right = root.querySelector("[data-word-right]");
      const plants = root.querySelector("[data-word-plants]");
      const plantsPanel = root.querySelector("[data-plants-panel]");

      if (reducedMotion) {
        gsap.set([coffee, mid, right], { opacity: 1, x: 0, y: 0 });
        gsap.set(plants, { opacity: 1, scale: 1 });
        gsap.set(plantsPanel, { opacity: 1 });
        gsap.set(bg, { scale: 1 });
        return undefined;
      }

      gsap.set(coffee, { x: "-8vw", opacity: 0.85 });
      gsap.set(mid, { y: "2vh", opacity: 0 });
      gsap.set(right, { x: "8vw", opacity: 0.85 });
      gsap.set(plants, { scale: 0.75, opacity: 0 });
      gsap.set(plantsPanel, { opacity: 0 });
      gsap.set(bg, { scale: 1.08 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
        },
      });

      tl.to(mid, { opacity: 1, y: 0, duration: 0.25 }, 0)
        .to(
          [coffee, right],
          { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
          0.05,
        )
        .to(bg, { scale: 1, duration: 0.55, ease: "power1.inOut" }, 0.15)
        .to(
          [coffee, mid, right],
          { opacity: 0, y: "-6vh", duration: 0.35, ease: "power2.in" },
          0.42,
        )
        .to(plantsPanel, { opacity: 1, duration: 0.2 }, 0.48)
        .to(
          plants,
          { scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" },
          0.52,
        );

      return undefined;
    },
    [reducedMotion],
  );

  return (
    <section
      id="nursery-transition"
      ref={scope}
      className={`relative min-h-[100dvh] overflow-hidden bg-juniper-dark ${className}`}
      aria-label="From coffee to nursery"
    >
      <div
        className="absolute inset-0 scale-105 will-change-transform"
        data-nursery-bg
      >
        <Image
          src="/images/waterfall-gully/nursery/transition-forest.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
        {/* Soft wash so type stays readable across the full frame */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-juniper-dark/70 via-juniper-dark/45 to-juniper-dark/75"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-[2] flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
        <p className="sr-only">
          Coffee is only half of it. Then plants fill the space.
        </p>

        <div
          className="flex w-full max-w-5xl flex-col items-center gap-3 font-display text-[clamp(2.25rem,7vw,4.75rem)] leading-[0.95] tracking-[-0.03em] text-chalk md:flex-row md:items-end md:justify-between md:gap-6"
          aria-hidden="true"
        >
          <span data-word-coffee className="md:text-left">
            Coffee
          </span>
          <span
            data-word-mid
            className="font-utility text-[clamp(0.85rem,2vw,1.15rem)] font-semibold uppercase tracking-[0.28em] text-safflower"
          >
            is only
          </span>
          <span data-word-right className="md:text-right">
            half of it
          </span>
        </div>

        <div
          data-plants-panel
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span
            data-word-plants
            className="font-display text-[clamp(4.5rem,18vw,11rem)] leading-none tracking-[-0.04em] text-chalk"
          >
            Plants
          </span>
        </div>
      </div>
    </section>
  );
}
