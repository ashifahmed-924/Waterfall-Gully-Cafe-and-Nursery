"use client";

import Image from "next/image";
import gsap from "gsap";
import { waterfallGully } from "@/data/waterfallGully";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const WINDING =
  "M40 180 Q120 80 220 140 T420 100 T560 160";

export default function FinalGardenCTA({ className = "" }) {
  const { mapsUrl, phoneTel, links } = waterfallGully;
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const line = root.querySelector("[data-final-line]");
      const panels = gsap.utils.toArray(root.querySelectorAll("[data-final-panel]"));

      if (reducedMotion) {
        if (line) {
          const len = line.getTotalLength();
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: 0 });
        }
        gsap.set(panels, { opacity: 1, y: 0 });
        return undefined;
      }

      if (line) {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "top 30%",
            scrub: 0.65,
          },
        });
      }

      gsap.set(panels, { opacity: 0, y: 36 });
      gsap.to(panels, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      return undefined;
    },
    [reducedMotion],
  );

  return (
    <section
      ref={scope}
      className={`relative overflow-hidden bg-chalk py-[var(--section-y)] ${className}`}
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-[96rem] px-4 md:px-6">
        <header className="mb-10 max-w-2xl">
          <h2
            id="final-cta-heading"
            className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-tight text-juniper-dark"
          >
            Come for coffee.
            <span className="block text-juniper">Stay for the garden.</span>
          </h2>
        </header>

        <div className="relative grid min-h-[420px] md:grid-cols-12 md:gap-0">
          <div
            data-final-panel
            className="relative overflow-hidden rounded-t-[var(--radius-xl)] md:col-span-5 md:rounded-bl-[var(--radius-xl)] md:rounded-tr-none"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 92% 100%, 0 100%)",
            }}
          >
            <div className="relative aspect-[4/3] h-full min-h-[220px] md:aspect-auto md:min-h-[380px]">
              <Image
                src="/images/waterfall-gully/food/coffee.jpg"
                alt="Stock image style cup of coffee on a cafe table"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-juniper-dark/25" aria-hidden="true" />
              <p className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-[0.3em] text-chalk">
                Cafe
              </p>
            </div>
          </div>

          <div
            data-final-panel
            className="relative -mt-2 overflow-hidden rounded-b-[var(--radius-xl)] md:col-span-7 md:col-start-6 md:-ml-8 md:mt-0 md:rounded-br-[var(--radius-xl)] md:rounded-tl-[var(--radius-xl)]"
            style={{
              clipPath:
                "polygon(8% 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <div className="relative aspect-[4/3] h-full min-h-[220px] md:aspect-auto md:min-h-[380px]">
              <Image
                src="/images/waterfall-gully/garden-afternoon-tea.jpg"
                alt="Friends sharing afternoon tea among garden greenery"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-juniper/20 mix-blend-multiply" aria-hidden="true" />
              <p className="absolute bottom-4 right-4 font-mono text-xs uppercase tracking-[0.3em] text-chalk">
                Garden
              </p>
            </div>
          </div>

          <svg
            className="pointer-events-none absolute left-0 top-1/2 hidden w-full -translate-y-1/2 md:block"
            viewBox="0 0 600 240"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              data-final-line
              d={WINDING}
              fill="none"
              stroke="var(--safflower)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#visit" className="btn-garden">
            Visit us
          </a>
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
          <a
            href={links.giftCardUrl}
            className="btn-garden"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gift card
          </a>
        </div>
      </div>
    </section>
  );
}
