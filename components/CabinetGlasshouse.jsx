"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const PANES = [
  {
    id: "quiche",
    name: "Quiche",
    image: "/images/waterfall-gully/food/quiche.jpg",
    alt: "Savory slice quiche-style baked item",
    grid: "col-span-2 row-span-2",
    reveal: "from-top",
  },
  {
    id: "sausage",
    name: "Sausage Roll",
    image: "/images/waterfall-gully/food/sausage-roll.jpg",
    alt: "Golden sausage roll pastry",
    grid: "col-span-1 row-span-1",
    reveal: "from-left",
  },
  {
    id: "croissant",
    name: "Croissant",
    image: "/images/waterfall-gully/food/croissant.jpg",
    alt: "Buttery croissant on a board",
    grid: "col-span-1 row-span-2",
    reveal: "from-right",
  },
  {
    id: "rolls",
    name: "Rolls",
    image: "/images/waterfall-gully/food/cabinet.jpg",
    alt: "Assorted baked rolls in a display",
    grid: "col-span-1 row-span-1",
    reveal: "from-bottom",
  },
  {
    id: "salad-roll",
    name: "Salad Roll",
    image: "/images/waterfall-gully/food/bacon-roll.jpg",
    alt: "Filled salad-style lunch roll",
    grid: "col-span-2 row-span-1",
    reveal: "scale-in",
  },
  {
    id: "scones",
    name: "Homemade Scones",
    image: "/images/waterfall-gully/food/scones.jpg",
    alt: "Homemade scones and cabinet bakes",
    grid: "col-span-1 row-span-1",
    reveal: "from-bottom",
  },
  {
    id: "brekky-wrap",
    name: "Brekky Wrap",
    image: "/images/waterfall-gully/food/brekky-wrap.jpg",
    alt: "Filled brekky wrap cut in half",
    grid: "col-span-1 row-span-1",
    reveal: "from-right",
  },
];

const FRAME_PATH =
  "M4 4 H396 V196 H4 Z M132 4 V196 M268 4 V196 M4 72 H396 M4 128 H396";

function paneInitial(reveal) {
  switch (reveal) {
    case "from-top":
      return { clipPath: "inset(100% 0 0 0)", opacity: 0.5 };
    case "from-left":
      return { clipPath: "inset(0 100% 0 0)", opacity: 0.5 };
    case "from-right":
      return { clipPath: "inset(0 0 0 100%)", opacity: 0.5 };
    case "from-bottom":
      return { clipPath: "inset(0 0 100% 0)", opacity: 0.5 };
    case "scale-in":
      return { scale: 0.82, opacity: 0 };
    default:
      return { opacity: 0 };
  }
}

function paneFinal(reveal) {
  if (reveal === "scale-in") {
    return { scale: 1, opacity: 1 };
  }
  return { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 };
}

export default function CabinetGlasshouse({ className = "" }) {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const frame = root.querySelector("[data-greenhouse-frame]");
      const panes = gsap.utils.toArray(root.querySelectorAll("[data-pane]"));

      if (reducedMotion) {
        if (frame) {
          const len = frame.getTotalLength();
          gsap.set(frame, { strokeDasharray: len, strokeDashoffset: 0 });
        }
        panes.forEach((pane) => {
          const reveal = pane.getAttribute("data-reveal");
          gsap.set(pane, paneFinal(reveal));
        });
        return undefined;
      }

      if (frame) {
        const len = frame.getTotalLength();
        gsap.set(frame, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(frame, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "top 40%",
            scrub: 0.5,
          },
        });
      }

      panes.forEach((pane, i) => {
        const reveal = pane.getAttribute("data-reveal");
        gsap.set(pane, paneInitial(reveal));
        gsap.to(pane, {
          ...paneFinal(reveal),
          ease: reveal === "scale-in" ? "back.out(1.1)" : "power2.out",
          scrollTrigger: {
            trigger: root,
            start: `top ${62 - i * 4}%`,
            end: "center 50%",
            scrub: 0.45,
          },
        });
      });

      return undefined;
    },
    [reducedMotion],
  );

  return (
    <section
      ref={scope}
      className={`section-rhythm bg-parchment/60 ${className}`}
      aria-labelledby="cabinet-heading"
    >
      <div className="section-inner">
        <header className="mb-10 max-w-xl">
          <p className="section-eyebrow">Cabinet</p>
          <h2
            id="cabinet-heading"
            className="font-display text-[clamp(2rem,4vw,3rem)] text-juniper-dark"
          >
            From the cabinet.
          </h2>
          <p className="section-lead mt-4">
            Bakes and rolls rotate through the day — ask in cafe for what&apos;s
            fresh in the window.
          </p>
        </header>

        <div className="relative mx-auto max-w-3xl">
          <svg
            className="pointer-events-none absolute inset-0 z-10 h-full w-full text-juniper-dark"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              data-greenhouse-frame
              d={FRAME_PATH}
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="grid grid-cols-4 grid-rows-3 gap-1 p-1 md:gap-1.5 md:p-1.5">
            {PANES.map((pane) => (
              <figure
                key={pane.id}
                data-pane
                data-reveal={pane.reveal}
                className={`relative overflow-hidden rounded-[4px] bg-juniper/10 ${pane.grid}`}
              >
                <div className="relative h-full min-h-[5.5rem] w-full md:min-h-[7rem]">
                  <Image
                    src={pane.image}
                    alt={pane.alt}
                    fill
                    sizes="(max-width: 768px) 45vw, 240px"
                    className="object-cover"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-juniper-dark/75 to-transparent px-2 py-2">
                    <span className="font-display text-sm text-chalk">
                      {pane.name}
                    </span>
                    <span className="ml-2 font-utility text-[0.5625rem] font-semibold uppercase tracking-wide text-safflower">
                      ASK IN CAFE
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
