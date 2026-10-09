"use client";

import gsap from "gsap";
import { waterfallGully } from "@/data/waterfallGully";
import PotRings from "@/components/patterns/PotRings";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function PottingBenchLocation({ className = "" }) {
  const { address, phoneTel, phoneDisplay, mapsUrl } = waterfallGully;
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const details = root.querySelector("[data-visit-details]");
      const heading = root.querySelector("[data-visit-heading-block]");

      if (reducedMotion) {
        gsap.set([heading, details], { y: 0, opacity: 1 });
        return undefined;
      }

      gsap.set(heading, { y: 20, opacity: 0 });
      gsap.set(details, { y: 28, opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
        .to(heading, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
        })
        .to(
          details,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        );

      return undefined;
    },
    [reducedMotion],
  );

  return (
    <section
      id="visit"
      ref={scope}
      className={`relative overflow-hidden bg-parchment py-[var(--section-y-tight)] ${className}`}
      aria-labelledby="visit-heading"
    >
      <PotRings className="absolute inset-0 opacity-20" id="visit-pot-rings" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, var(--basalt) 1px, transparent 1px), radial-gradient(circle at 70% 60%, var(--basalt) 1px, transparent 1px)",
          backgroundSize: "24px 24px, 32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[var(--content-max)] items-start gap-8 px-4 md:grid-cols-2 md:items-center md:gap-10 md:px-6">
        <div data-visit-heading-block>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-juniper">
            Find us
          </p>
          <h2
            id="visit-heading"
            className="mt-2 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] text-juniper-dark"
          >
            The potting bench
          </h2>
        </div>

        <div data-visit-details className="space-y-5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-clay-rose">
              Address
            </p>
            <p className="mt-1.5 font-body text-sm leading-snug text-basalt md:text-base">
              {address.formatted}
            </p>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-clay-rose">
              Phone
            </p>
            <p className="mt-1.5 font-body text-sm text-basalt md:text-base">
              <a
                href={`tel:${phoneTel}`}
                className="text-juniper-dark underline-offset-2 hover:underline"
              >
                {phoneDisplay}
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={mapsUrl}
              className="btn-garden"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
            <a href={`tel:${phoneTel}`} className="btn-garden">
              Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
