"use client";

import gsap from "gsap";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const DEFAULT_LABELS = [
  "Coffee",
  "Breakfast",
  "Plants",
  "Garden seats",
  "Gifts",
  "Rosebud",
  "Dogs welcome outdoors",
];

function Tag({ label }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-2.5 px-1 font-utility text-[0.8rem] font-semibold tracking-[0.02em] text-juniper-dark"
      data-tag
    >
      <span
        className="size-1.5 rounded-full bg-safflower"
        aria-hidden="true"
      />
      {label}
      <span
        className="ml-1 font-display text-lg font-normal leading-none text-celadon"
        aria-hidden="true"
      >
        ·
      </span>
    </span>
  );
}

export default function BotanicalTagStrip({
  id,
  labels = DEFAULT_LABELS,
  className = "",
  speed = 48,
}) {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const track = scope.current?.querySelector("[data-drift-track]");
      if (!track || reducedMotion) {
        return undefined;
      }

      const width = track.scrollWidth / 2;
      gsap.set(track, { x: 0 });
      const tween = gsap.to(track, {
        x: -width,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      return () => {
        tween.kill();
      };
    },
    [labels, speed, reducedMotion],
  );

  const loop = [...labels, ...labels];

  return (
    <section
      id={id}
      ref={scope}
      className={`overflow-hidden border-y border-juniper/10 bg-parchment py-4 ${className}`}
      aria-label="Cafe and nursery highlights"
    >
      <div className="relative flex">
        <div
          data-drift-track
          className={`flex w-max items-center gap-6 px-4 ${reducedMotion ? "flex-wrap justify-center" : ""}`}
        >
          {loop.map((label, index) => (
            <Tag key={`${label}-${index}`} label={label} />
          ))}
        </div>
      </div>
    </section>
  );
}
