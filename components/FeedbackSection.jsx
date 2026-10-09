"use client";

import gsap from "gsap";
import { waterfallGully } from "@/data/waterfallGully";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const BACKDROP_WORDS = ["Garden", "Coffee", "Relaxed", "Local"];

export default function FeedbackSection({ className = "" }) {
  const { feedback } = waterfallGully;
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const words = gsap.utils.toArray(
        root.querySelectorAll("[data-feedback-word]"),
      );
      const notes = gsap.utils.toArray(
        root.querySelectorAll("[data-feedback-note]"),
      );
      const branches = gsap.utils.toArray(
        root.querySelectorAll("[data-feedback-branch]"),
      );

      if (reducedMotion) {
        gsap.set(words, { opacity: 0.1, filter: "blur(0px)", scale: 1 });
        gsap.set(words[0], { opacity: 0.2 });
        gsap.set(notes, { opacity: 1, y: 0 });
        gsap.set(branches, { strokeDashoffset: 0, opacity: 0.35 });
        return undefined;
      }

      gsap.set(words, {
        opacity: 0.06,
        filter: "blur(8px)",
        scale: 1.03,
      });
      gsap.set(notes, { opacity: 0, y: 18 });
      gsap.set(branches, { strokeDasharray: 400, strokeDashoffset: 400 });

      gsap.to(notes, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(branches, {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      let idx = 0;
      const showWord = (i) => {
        words.forEach((w, wi) => {
          gsap.to(w, {
            opacity: wi === i ? 0.2 : 0.05,
            filter: wi === i ? "blur(0px)" : "blur(6px)",
            scale: wi === i ? 1 : 1.02,
            duration: 1.1,
            ease: "power2.inOut",
          });
        });
      };

      showWord(0);
      const interval = window.setInterval(() => {
        idx = (idx + 1) % words.length;
        showWord(idx);
      }, 3800);

      return () => {
        window.clearInterval(interval);
      };
    },
    [reducedMotion],
  );

  return (
    <section
      id="feedback"
      ref={scope}
      className={`relative overflow-hidden bg-pale-celadon/40 py-[var(--section-y-tight)] ${className}`}
      aria-labelledby="feedback-heading"
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 1200 800"
        aria-hidden="true"
        fill="none"
      >
        <path
          data-feedback-branch
          d="M80 640 C 220 520, 280 420, 420 360 S 680 280, 820 220"
          stroke="var(--juniper)"
          strokeWidth="1.2"
        />
        <path
          data-feedback-branch
          d="M1100 680 C 960 560, 900 480, 760 400 S 520 280, 380 200"
          stroke="var(--clay-rose)"
          strokeWidth="1"
        />
      </svg>

      <div
        className="pointer-events-none absolute inset-0 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4"
        aria-hidden="true"
      >
        {BACKDROP_WORDS.map((word) => (
          <span
            key={word}
            data-feedback-word
            className="font-display text-[clamp(2rem,8vw,4.5rem)] uppercase leading-none text-juniper-dark"
          >
            {word}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-[var(--content-max)] px-4 md:px-6">
        <header className="max-w-xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-juniper">
            {feedback.label}
          </p>
          <h2
            id="feedback-heading"
            className="mt-1.5 font-display text-[clamp(1.85rem,3.8vw,2.75rem)] leading-[1.08] text-juniper-dark"
          >
            What people notice.
          </h2>
          <p className="mt-2.5 max-w-md font-body text-sm leading-snug text-basalt/85 md:text-[0.95rem]">
            {feedback.disclaimer}
          </p>
        </header>

        <div className="mt-7 flex flex-col gap-5 md:mt-8 md:gap-6">
          {feedback.themes.map((item, i) => (
            <p
              key={item.id}
              data-feedback-note
              className={`max-w-lg font-body text-base leading-snug text-juniper-dark md:text-lg ${
                i % 2 === 1 ? "md:ml-auto md:text-right" : ""
              }`}
            >
              <span className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-deep-clay md:text-xs">
                {item.theme}
              </span>
              {item.summary}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
