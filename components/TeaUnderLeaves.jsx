"use client";

import Image from "next/image";
import gsap from "gsap";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const VINE_PATH =
  "M8 120 C60 40 140 180 200 90 S340 20 392 80 M392 80 L408 68 M392 80 L404 96";

const LINES = [
  "Devonshire Tea",
  "Homemade Scones",
  "Jam & cream — ask in cafe",
];

const INSET_PHOTO = {
  src: "/images/waterfall-gully/food/scones.jpg",
  alt: "Homemade-style scones on a plate",
};

const PHOTO_SLIDES = [
  {
    src: "/images/waterfall-gully/nursery/outdoor-dining.jpg",
    alt: "Outdoor garden table setting among planting",
  },
  {
    src: "/images/waterfall-gully/tea-scones.jpg",
    alt: "Tea and homemade scones",
  },
  INSET_PHOTO,
  {
    src: "/images/waterfall-gully/cafe-table.jpg",
    alt: "Cafe table under garden shade",
  },
  {
    src: "/images/waterfall-gully/gallery/06.jpg",
    alt: "Scones and afternoon tea",
  },
];

const PHOTO_INTERVAL_MS = 1500;
const PHOTO_FADE_S = 0.55;

export default function TeaUnderLeaves({ className = "" }) {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(
    () => {
      const root = scope.current;
      if (!root) {
        return undefined;
      }

      const photo = root.querySelector("[data-tea-photo]");
      const slides = gsap.utils.toArray(root.querySelectorAll("[data-tea-slide]"));
      const vine = root.querySelector("[data-tea-vine]");
      const lines = gsap.utils.toArray(root.querySelectorAll("[data-tea-line]"));

      let slideIndex = 0;
      let slideTimer;
      let slideTween;

      const showSlide = (nextIndex, animate) => {
        if (slides.length < 2) {
          return;
        }

        const prev = slides[slideIndex];
        const next = slides[nextIndex];
        slideIndex = nextIndex;

        if (slideTween) {
          slideTween.kill();
        }

        if (!animate || reducedMotion) {
          slides.forEach((slide, i) => {
            gsap.set(slide, {
              opacity: i === nextIndex ? 1 : 0,
              scale: 1,
              zIndex: i === nextIndex ? 2 : 1,
            });
          });
          return;
        }

        gsap.set(next, { opacity: 0, scale: 1.04, zIndex: 3 });
        gsap.set(prev, { zIndex: 2 });

        slideTween = gsap
          .timeline({ defaults: { ease: "power2.inOut" } })
          .to(next, { opacity: 1, scale: 1, duration: PHOTO_FADE_S }, 0)
          .to(prev, { opacity: 0, scale: 1.02, duration: PHOTO_FADE_S }, 0)
          .add(() => {
            slides.forEach((slide, i) => {
              if (i !== nextIndex) {
                gsap.set(slide, { zIndex: 1, scale: 1 });
              }
            });
            gsap.set(next, { zIndex: 2 });
          });
      };

      showSlide(0, false);

      if (!reducedMotion && slides.length > 1) {
        slideTimer = window.setInterval(() => {
          showSlide((slideIndex + 1) % slides.length, true);
        }, PHOTO_INTERVAL_MS);
      }

      if (reducedMotion) {
        gsap.set(photo, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });
        gsap.set(lines, { y: 0, opacity: 1 });
        if (vine) {
          const len = vine.getTotalLength();
          gsap.set(vine, { strokeDasharray: len, strokeDashoffset: 0 });
        }
        return () => {
          if (slideTimer) {
            window.clearInterval(slideTimer);
          }
          slideTween?.kill();
        };
      }

      gsap.set(photo, {
        clipPath: "inset(0 100% 0 0 round 10px)",
        opacity: 0.85,
      });
      gsap.to(photo, {
        clipPath: "inset(0 0% 0 0 round 10px)",
        opacity: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "top 35%",
          scrub: 0.7,
        },
      });

      if (vine) {
        const len = vine.getTotalLength();
        gsap.set(vine, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(vine, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 65%",
            end: "center 45%",
            scrub: 0.55,
          },
        });
      }

      gsap.set(lines, { y: 24, opacity: 0 });
      lines.forEach((line, i) => {
        gsap.to(line, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          delay: i * 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 58%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => {
        if (slideTimer) {
          window.clearInterval(slideTimer);
        }
        slideTween?.kill();
      };
    },
    [reducedMotion],
  );

  return (
    <section
      ref={scope}
      className={`section-rhythm bg-pale-celadon ${className}`}
      aria-labelledby="tea-heading"
    >
      <div className="section-inner grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative">
          <div
            data-tea-photo
            className="relative aspect-[21/9] w-full overflow-hidden rounded-[10px] shadow-[var(--shadow-soft)]"
          >
            {PHOTO_SLIDES.map((slide, index) => (
              <div
                key={slide.src}
                data-tea-slide
                className="absolute inset-0"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  zIndex: index === 0 ? 2 : 1,
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <figure className="absolute -bottom-6 -right-2 w-[38%] max-w-[11rem] overflow-hidden rounded-[10px] border-4 border-chalk shadow-md md:-right-6">
            <div className="relative aspect-square">
              <Image
                src={INSET_PHOTO.src}
                alt={INSET_PHOTO.alt}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </figure>
          <svg
            className="pointer-events-none absolute -right-4 top-1/2 hidden h-32 w-24 -translate-y-1/2 text-juniper/50 lg:block"
            viewBox="0 0 420 140"
            fill="none"
            aria-hidden="true"
          >
            <path
              data-tea-vine
              d={VINE_PATH}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div>
          <p className="section-eyebrow">Afternoon pause</p>
          <h2
            id="tea-heading"
            className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] text-juniper-dark"
          >
            Tea under the leaves.
          </h2>
          <ul className="mt-8 space-y-4" role="list">
            {LINES.map((text) => (
              <li
                key={text}
                data-tea-line
                className="border-b border-juniper/15 pb-3 font-display text-xl text-juniper-dark md:text-2xl"
              >
                {text}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-utility text-sm font-semibold uppercase tracking-wide text-deep-clay">
            ASK IN CAFE
          </p>
        </div>
      </div>
    </section>
  );
}
