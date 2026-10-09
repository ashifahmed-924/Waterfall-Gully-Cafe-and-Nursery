"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const SCENE_MS = 4200;

const SCENES = [
  {
    id: "coffee",
    label: "Coffee",
    layout: "hero-rail",
    images: [
      {
        src: "/images/waterfall-gully/food/coffee.jpg",
        alt: "Fresh coffee served in the cafe",
      },
      {
        src: "/images/waterfall-gully/food/mocha.jpg",
        alt: "Mocha in a ceramic cup",
      },
      {
        src: "/images/waterfall-gully/food/matcha.jpg",
        alt: "Matcha latte among greenery",
      },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast",
    layout: "triptych",
    images: [
      {
        src: "/images/waterfall-gully/food/rosti.jpg",
        alt: "Homemade rosti breakfast plate",
      },
      {
        src: "/images/waterfall-gully/food/eggs-benedict.jpg",
        alt: "Eggs Benedict from the breakfast menu",
      },
      {
        src: "/images/waterfall-gully/food/brekky-wrap.jpg",
        alt: "Brekky wrap cut to show the filling",
      },
    ],
  },
  {
    id: "cabinet",
    label: "Cabinet",
    layout: "window",
    images: [
      {
        src: "/images/waterfall-gully/food/croissant.jpg",
        alt: "Croissant from the cabinet",
      },
      {
        src: "/images/waterfall-gully/food/sausage-roll.jpg",
        alt: "Fresh rolls and bakes",
      },
      {
        src: "/images/waterfall-gully/food/cabinet.jpg",
        alt: "Pastries in the cabinet window",
      },
      {
        src: "/images/waterfall-gully/food/scones.jpg",
        alt: "Homemade scones and cabinet picks",
      },
    ],
  },
  {
    id: "nursery",
    label: "Nursery",
    layout: "wander",
    images: [
      {
        src: "/images/waterfall-gully/nursery/indoor-plants.jpg",
        alt: "Indoor plants along the nursery aisle",
      },
      {
        src: "/images/waterfall-gully/nursery/aisle-01.jpg",
        alt: "Path through nursery planting beds",
      },
      {
        src: "/images/waterfall-gully/nursery/pots.jpg",
        alt: "Pots and planters in the nursery",
      },
    ],
  },
];

function layoutClass(layout) {
  switch (layout) {
    case "hero-rail":
      return "grid-cols-[1.4fr_0.9fr] grid-rows-2";
    case "triptych":
      return "grid-cols-3 grid-rows-1";
    case "window":
      return "grid-cols-2 grid-rows-2";
    case "wander":
      return "grid-cols-[1.15fr_0.85fr] grid-rows-2";
    default:
      return "grid-cols-2 grid-rows-2";
  }
}

function frameClass(layout, index) {
  if (layout === "hero-rail") {
    return index === 0 ? "col-span-1 row-span-2" : "col-span-1 row-span-1";
  }
  if (layout === "triptych") {
    return "col-span-1 row-span-1";
  }
  if (layout === "window") {
    return "col-span-1 row-span-1";
  }
  if (layout === "wander") {
    if (index === 0) {
      return "col-span-1 row-span-2 translate-y-1 md:translate-y-2";
    }
    if (index === 1) {
      return "col-span-1 row-span-1 -translate-y-1 md:-translate-y-2";
    }
    return "col-span-1 row-span-1 translate-x-1 md:translate-x-2";
  }
  return "";
}

function playSceneEnter(stage, tiles, layout, reducedMotion) {
  if (!stage || !tiles.length) {
    return;
  }

  gsap.killTweensOf([stage, ...tiles]);

  if (reducedMotion) {
    gsap.set(stage, { opacity: 1, clearProps: "clipPath,scale,x,y,rotate" });
    gsap.set(tiles, {
      opacity: 1,
      clearProps: "clipPath,scale,x,y,rotate,filter",
    });
    return;
  }

  const tl = gsap.timeline();

  if (layout === "hero-rail") {
    gsap.set(stage, { opacity: 1 });
    gsap.set(tiles[0], { clipPath: "inset(0 100% 0 0)", opacity: 1 });
    gsap.set(tiles.slice(1), { y: 36, opacity: 0 });
    tl.to(tiles[0], {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.85,
      ease: "power3.inOut",
    }).to(
      tiles.slice(1),
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power2.out" },
      "-=0.35",
    );
    return;
  }

  if (layout === "triptych") {
    gsap.set(stage, { opacity: 1 });
    gsap.set(tiles, { yPercent: 110, opacity: 1 });
    tl.to(tiles, {
      yPercent: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
    });
    return;
  }

  if (layout === "window") {
    gsap.set(stage, { opacity: 1, scale: 0.96 });
    gsap.set(tiles, { scale: 0.86, opacity: 0 });
    tl.to(stage, { scale: 1, duration: 0.55, ease: "power2.out" }).to(
      tiles,
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.2)",
      },
      "-=0.3",
    );
    return;
  }

  // wander
  gsap.set(stage, { opacity: 1 });
  gsap.set(tiles, {
    opacity: 0,
    y: 28,
    rotate: (i) => (i % 2 === 0 ? -2.5 : 2.5),
    filter: "blur(6px)",
  });
  tl.to(tiles, {
    opacity: 1,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
    duration: 0.75,
    stagger: 0.12,
    ease: "power3.out",
  });
}

/**
 * Intro — promise copy + rotating visual of coffee, breakfast, cabinet, nursery.
 */
export default function CafeNurseryIntro({ className = "" }) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const stageRef = useRef(null);
  const scene = SCENES[active];

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const copy = root.querySelector("[data-intro-copy]");
      const visual = root.querySelector("[data-intro-visual]");

      if (reducedMotion) {
        gsap.set([copy, visual], { opacity: 1, y: 0 });
        return undefined;
      }

      gsap.set(copy, { opacity: 0, y: 24 });
      gsap.set(visual, { opacity: 0, y: 28 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        })
        .to(copy, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" })
        .to(
          visual,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        );

      return undefined;
    },
    [reducedMotion],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return undefined;
    }
    const tiles = gsap.utils.toArray(stage.querySelectorAll("[data-intro-tile]"));
    playSceneEnter(stage, tiles, scene.layout, reducedMotion);
    return undefined;
  }, [active, scene.layout, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % SCENES.length);
    }, SCENE_MS);
    return () => window.clearInterval(id);
  }, [active, reducedMotion]);

  return (
    <section
      id="intro"
      ref={scope}
      className={`section-rhythm bg-chalk ${className}`}
      aria-labelledby="intro-heading"
    >
      <div className="section-inner grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14">
        <div data-intro-copy className="max-w-xl">
          <p className="section-eyebrow mb-4">Waterfall Gully</p>
          <h2
            id="intro-heading"
            className="font-display text-[clamp(2.35rem,5.5vw,4.25rem)] leading-[0.98] tracking-[-0.03em] text-juniper-dark"
          >
            Not beside the garden.
            <span className="mt-2 block text-clay-rose">In it.</span>
          </h2>
          <p className="section-lead mt-6">
            Coffee, breakfast, and cabinet picks served alongside nursery
            aisles — one stop on Old Cape Schanck Road in Rosebud.
          </p>
        </div>

        <div data-intro-visual className="relative">
          <div
            className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2"
            role="tablist"
            aria-label="Intro scenes"
          >
            {SCENES.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(index)}
                  className={`font-mono text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 ${
                    selected
                      ? "text-juniper-dark"
                      : "text-juniper/45 hover:text-juniper"
                  }`}
                >
                  <span
                    className={`mr-2 inline-block size-1.5 rounded-full align-middle transition-colors duration-300 ${
                      selected ? "bg-safflower" : "bg-celadon/70"
                    }`}
                    aria-hidden="true"
                  />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div
            ref={stageRef}
            key={scene.id}
            className={`grid aspect-[5/4] gap-2.5 overflow-hidden md:gap-3 ${layoutClass(scene.layout)}`}
            role="tabpanel"
            aria-label={`${scene.label} scenes`}
          >
            {scene.images.map((img, index) => (
              <figure
                key={`${scene.id}-${img.src}`}
                data-intro-tile
                className={`relative min-h-0 overflow-hidden ${frameClass(scene.layout, index)}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                  priority={scene.id === "coffee" && index === 0}
                />
              </figure>
            ))}
          </div>

          {!reducedMotion ? (
            <div
              className="mt-3 h-px overflow-hidden bg-pale-celadon"
              aria-hidden="true"
            >
              <div
                key={scene.id}
                className="h-full origin-left bg-juniper/55"
                style={{
                  animation: `intro-scene-progress ${SCENE_MS}ms linear forwards`,
                }}
              />
            </div>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        @keyframes intro-scene-progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}
