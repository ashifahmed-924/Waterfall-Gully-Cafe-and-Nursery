"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const DRINKS = [
  {
    name: "Latte",
    image: "/images/waterfall-gully/food/coffee.jpg",
    alt: "Steamed milk coffee in a cup",
    slide: -28,
  },
  {
    name: "Mocha",
    image: "/images/waterfall-gully/food/mocha.jpg",
    alt: "Chocolate coffee drink in a cup",
    slide: 28,
  },
  {
    name: "Matcha",
    image: "/images/waterfall-gully/food/matcha.jpg",
    alt: "Green matcha latte in a glass",
    slide: -28,
  },
  {
    name: "Smoothie",
    image: "/images/waterfall-gully/food/smoothie.jpg",
    alt: "Blended fruit smoothie glass",
    slide: 28,
  },
];

function DrinkStem({ drink, index, className = "" }) {
  return (
    <article
      data-drink-stem
      className={`relative flex flex-col items-center ${className}`}
    >
      <div
        data-drink-stem-bar
        className="mb-3 h-16 w-px origin-bottom scale-y-0 bg-celadon/70 md:h-24"
        aria-hidden="true"
      />
      <div
        data-drink-image
        className="relative mb-3 aspect-[3/4] w-full overflow-hidden rounded-[10px]"
      >
        <Image
          src={drink.image}
          alt={drink.alt}
          fill
          sizes="140px"
          className="object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <span
          data-drink-label
          data-slide={drink.slide}
          className="font-display text-lg text-chalk md:text-xl"
        >
          {drink.name}
        </span>
        <span className="font-mono text-[0.5625rem] uppercase tracking-widest text-chalk/70">
          D{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-1 font-utility text-[0.625rem] font-semibold uppercase tracking-wide text-safflower/90">
        ASK IN CAFE
      </p>
    </article>
  );
}

export default function CoffeeCanopy({ className = "" }) {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const bars = gsap.utils.toArray(root.querySelectorAll("[data-drink-stem-bar]"));
      const images = gsap.utils.toArray(root.querySelectorAll("[data-drink-image]"));
      const labels = gsap.utils.toArray(root.querySelectorAll("[data-drink-label]"));
      const title = root.querySelector("[data-canopy-title]");

      if (reducedMotion) {
        gsap.set(bars, { scaleY: 1 });
        gsap.set(images, { y: 0, opacity: 1 });
        gsap.set(labels, { x: 0, opacity: 1 });
        gsap.set(title, { letterSpacing: "0.04em", opacity: 1 });
        return undefined;
      }

      gsap.set(bars, { scaleY: 0 });
      gsap.set(images, { y: 48, opacity: 0 });
      gsap.set(labels, {
        opacity: 0,
        x: (i, el) => Number(el.getAttribute("data-slide")) || 0,
      });
      gsap.set(title, { letterSpacing: "0.2em", opacity: 0.4 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(title, {
        letterSpacing: "0.04em",
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
      })
        .to(
          bars,
          {
            scaleY: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          images,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.65",
        )
        .to(
          labels,
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.45",
        );

      return undefined;
    },
    [reducedMotion],
  );

  return (
    <section
      ref={scope}
      className={`section-rhythm bg-juniper-dark ${className}`}
      aria-labelledby="canopy-heading"
    >
      <div className="section-inner">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-celadon">
          Drinks bar
        </p>
        <h2
          id="canopy-heading"
          data-canopy-title
          className="mt-3 font-display text-[clamp(1.5rem,4vw,2.75rem)] uppercase leading-tight text-chalk"
        >
          Coffee under the canopy.
        </h2>

        <div
          className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto md:mt-12 md:snap-none md:gap-8 md:overflow-visible lg:justify-between"
          tabIndex={0}
          aria-label="Drinks"
        >
          {DRINKS.map((drink, index) => (
            <DrinkStem
              key={drink.name}
              drink={drink}
              index={index}
              className="w-[42vw] max-w-[9.5rem] shrink-0 snap-start md:w-auto md:max-w-[8.5rem] md:flex-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
