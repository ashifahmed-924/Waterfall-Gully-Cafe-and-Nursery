"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import GreenhouseGrid from "@/components/patterns/GreenhouseGrid";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const HOURS_PANES = [
  { key: "mon", label: "Mon", time: "6—4", day: 1 },
  { key: "tue", label: "Tue", time: "6—4", day: 2 },
  { key: "wed", label: "Wed", time: "6—4", day: 3 },
  { key: "thu", label: "Thu", time: "6—4", day: 4 },
  { key: "fri", label: "Fri", time: "6—4", day: 5 },
  { key: "sat", label: "Sat", time: "7—4", day: 6 },
  { key: "sun", label: "Sun", time: "Closed", day: 0, closed: true },
  {
    key: "holidays",
    label: "Public holidays",
    time: "Closed",
    day: null,
    closed: true,
  },
];

export default function GreenhouseHours({ className = "" }) {
  const [today, setToday] = useState(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setToday(new Date().getDay());
  }, []);

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const panes = gsap.utils.toArray(root.querySelectorAll("[data-hour-pane]"));
      const lines = root.querySelectorAll("[data-hour-grid-line]");

      if (reducedMotion) {
        gsap.set(panes, { opacity: 1, y: 0 });
        gsap.set(lines, { scaleX: 1, scaleY: 1, opacity: 0.35 });
        return undefined;
      }

      gsap.set(panes, { opacity: 0, y: 18 });
      gsap.set(lines, { transformOrigin: "center", scaleX: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(lines, {
        scaleX: 1,
        opacity: 0.35,
        duration: 0.9,
        stagger: 0.04,
        ease: "power2.out",
      }).to(
        panes,
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.4",
      );

      return undefined;
    },
    [reducedMotion],
  );

  return (
    <section
      ref={scope}
      className={`relative overflow-hidden bg-juniper-dark py-[var(--section-y)] text-chalk ${className}`}
      aria-labelledby="hours-heading"
    >
      <GreenhouseGrid
        className="absolute inset-0 opacity-20"
        id="hours-greenhouse-grid"
        stroke="var(--celadon)"
        opacity={0.28}
      />

      <div
        className="pointer-events-none absolute inset-x-8 top-1/4 bottom-1/4 opacity-30 md:inset-x-16"
        aria-hidden="true"
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`h-${i}`}
            data-hour-grid-line
            className="absolute left-0 right-0 h-px bg-celadon"
            style={{ top: `${(i + 1) * 20}%` }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <div
            key={`v-${i}`}
            data-hour-grid-line
            className="absolute top-0 bottom-0 w-px bg-celadon"
            style={{ left: `${(i + 1) * 25}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-4 md:px-6">
        <header className="text-center">
          <p className="font-utility text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-safflower">
            Opening times
          </p>
          <h2
            id="hours-heading"
            className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] text-chalk"
          >
            Greenhouse hours
          </h2>
        </header>

        <ul
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
          role="list"
        >
          {HOURS_PANES.map((row) => {
            const isToday = today !== null && row.day === today;
            return (
              <li
                key={row.key}
                data-hour-pane
                className={`flex min-h-[110px] flex-col items-center justify-center gap-2 rounded-2xl px-3 py-6 text-center transition-colors ${
                  isToday
                    ? "bg-safflower text-juniper-dark shadow-[var(--shadow-soft)]"
                    : "bg-juniper/40 text-chalk"
                }`}
                aria-current={isToday ? "date" : undefined}
              >
                <span
                  className={`font-utility text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${
                    isToday ? "text-juniper-dark/75" : "text-pale-celadon"
                  }`}
                >
                  {row.label}
                </span>
                <span
                  className={`font-display text-2xl md:text-3xl ${
                    row.closed && !isToday ? "text-celadon" : ""
                  }`}
                >
                  {row.time}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-sm text-chalk/70">
          Hours may change. Please confirm before visiting.
        </p>
      </div>
    </section>
  );
}
