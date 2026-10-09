"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const LINE_PATH =
  "M20 80 Q120 20 220 60 T400 40 M400 40 L420 28 M400 40 L412 58";

export default function RostiMoment({ className = "" }) {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const plate = root.querySelector("[data-rosti-plate]");
      const letters = gsap.utils.toArray(root.querySelectorAll("[data-rosti-letter]"));
      const path = root.querySelector("[data-botanical-line]");

      if (reducedMotion) {
        gsap.set(plate, { clipPath: "circle(72% at 50% 50%)", opacity: 1 });
        gsap.set(letters, { y: 0, opacity: 1 });
        if (path) {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: 0 });
        }
        return undefined;
      }

      gsap.set(plate, { clipPath: "circle(0% at 50% 52%)", opacity: 0.5 });
      gsap.to(plate, {
        clipPath: "circle(72% at 50% 50%)",
        opacity: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: root,
          start: "top 65%",
          end: "top 25%",
          scrub: 0.8,
        },
      });

      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 60%",
            end: "center center",
            scrub: 0.6,
          },
        });
      }

      gsap.set(letters, { y: "120%", opacity: 0 });
      gsap.to(letters, {
        y: "0%",
        opacity: 1,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: {
          trigger: root,
          start: "top 55%",
          toggleActions: "play none none reverse",
        },
      });

      return undefined;
    },
    [reducedMotion],
  );

  const rostiLetters = "ROSTI".split("");

  return (
    <section
      ref={scope}
      className={`section-rhythm bg-clay-rose text-chalk ${className}`}
      aria-labelledby="rosti-heading"
    >
      <div className="section-inner grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div
            data-rosti-plate
            className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full shadow-[var(--shadow-lift)]"
          >
            <Image
              src="/images/waterfall-gully/food/rosti.jpg"
              alt="Homemade-style potato rosti brunch plate"
              fill
              sizes="(max-width: 1024px) 88vw, 28rem"
              className="object-cover"
            />
          </div>
          <svg
            className="pointer-events-none absolute -left-2 -top-6 h-24 w-40 text-chalk/70 md:h-28 md:w-48"
            viewBox="0 0 440 100"
            fill="none"
            aria-hidden="true"
          >
            <path
              data-botanical-line
              d={LINE_PATH}
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="order-1 lg:order-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-chalk/80">
            Signature plate
          </p>
          <h2
            id="rosti-heading"
            className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.25rem)] text-chalk"
          >
            A little garden brunch.
          </h2>
          <p
            className="mt-6 flex overflow-hidden font-display text-[clamp(3.5rem,12vw,7rem)] leading-none tracking-tight text-chalk"
            aria-label="Rosti"
          >
            {rostiLetters.map((char, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span data-rosti-letter className="inline-block">
                  {char}
                </span>
              </span>
            ))}
          </p>
          <p className="mt-6 max-w-sm font-body text-chalk/90">
            Golden rosti from the morning line — ask in cafe for today&apos;s
            plating and sides.
          </p>
          <p className="mt-4 font-utility text-sm font-semibold uppercase tracking-wide text-chalk">
            ASK IN CAFE
          </p>
        </div>
      </div>
    </section>
  );
}
