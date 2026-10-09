"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { waterfallGully } from "@/data/waterfallGully";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

const { heroGardenSlides, heroCafeSlides } = waterfallGully.images;

const GARDEN_SLIDES =
  heroGardenSlides?.length > 0
    ? heroGardenSlides
    : [
        {
          src: waterfallGully.images.heroGarden,
          alt: "Garden side of Waterfall Gully",
        },
      ];

const CAFE_SLIDES =
  heroCafeSlides?.length > 0
    ? heroCafeSlides
    : [
        {
          src: waterfallGully.images.heroTable,
          alt: "Cafe moment at Waterfall Gully",
        },
      ];

const GARDEN_INTERVAL_MS = 1500;
const CAFE_INTERVAL_MS = 1500;
const SLIDE_FADE_S = 0.65;

function createSlideshow(slides, { intervalMs, reducedMotion }) {
  let index = 0;
  let timer;
  let tween;

  const show = (nextIndex, animate) => {
    if (!slides.length) {
      return;
    }

    const prev = slides[index];
    const next = slides[nextIndex];
    index = nextIndex;

    if (tween) {
      tween.kill();
    }

    if (!animate || reducedMotion) {
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          opacity: i === nextIndex ? 1 : 0,
          scale: i === nextIndex ? 1.04 : 1.1,
          zIndex: i === nextIndex ? 2 : 1,
        });
      });
      return;
    }

    gsap.set(next, { opacity: 0, scale: 1.12, zIndex: 3 });
    gsap.set(prev, { zIndex: 2 });

    tween = gsap
      .timeline({ defaults: { ease: "power2.inOut" } })
      .to(next, { opacity: 1, scale: 1.04, duration: SLIDE_FADE_S }, 0)
      .to(prev, { opacity: 0, scale: 1.08, duration: SLIDE_FADE_S }, 0)
      .add(() => {
        slides.forEach((slide, i) => {
          if (i !== nextIndex) {
            gsap.set(slide, { zIndex: 1, scale: 1.1 });
          }
        });
        gsap.set(next, { zIndex: 2 });
      });
  };

  const start = () => {
    if (slides.length < 2 || reducedMotion || timer) {
      return;
    }
    timer = window.setInterval(() => {
      show((index + 1) % slides.length, true);
    }, intervalMs);
  };

  const stop = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };

  const destroy = () => {
    stop();
    tween?.kill();
  };

  return { show, start, stop, destroy };
}

/**
 * Full-viewport hero — split panels with independent image slideshows.
 */
export default function HeroGardenWalk() {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext(({ scope: scopeRef }) => {
    const root = scopeRef.current;
    if (!root) {
      return undefined;
    }

    const gardenPanel = root.querySelector("[data-hero-panel='garden']");
    const cafePanel = root.querySelector("[data-hero-panel='cafe']");
    const gardenParallax = root.querySelector("[data-hero-parallax='garden']");
    const cafeParallax = root.querySelector("[data-hero-parallax='cafe']");
    const gardenSlides = gsap.utils.toArray(
      root.querySelectorAll("[data-garden-slide]"),
    );
    const cafeSlides = gsap.utils.toArray(
      root.querySelectorAll("[data-cafe-slide]"),
    );
    const seam = root.querySelector("[data-hero-seam]");
    const copy = root.querySelector("[data-hero-copy]");
    const ctas = root.querySelectorAll("[data-hero-cta]");

    const gardenShow = createSlideshow(gardenSlides, {
      intervalMs: GARDEN_INTERVAL_MS,
      reducedMotion,
    });
    const cafeShow = createSlideshow(cafeSlides, {
      intervalMs: CAFE_INTERVAL_MS,
      reducedMotion,
    });

    const layers = [
      gardenPanel,
      cafePanel,
      gardenParallax,
      cafeParallax,
      seam,
      copy,
      ...ctas,
    ];

    if (reducedMotion) {
      gsap.set(layers, {
        clearProps: "all",
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clipPath: "none",
      });
      gardenShow.show(0, false);
      cafeShow.show(0, false);
      return () => {
        gardenShow.destroy();
        cafeShow.destroy();
      };
    }

    // Panels stay side-by-side at every breakpoint — reveal left/right.
    gsap.set(gardenPanel, { clipPath: "inset(0% 100% 0% 0%)" });
    gsap.set(cafePanel, { clipPath: "inset(0% 0% 0% 100%)" });

    gardenShow.show(0, false);
    cafeShow.show(0, false);
    gsap.set(seam, { scaleY: 0, opacity: 0 });
    gsap.set(copy, { y: 28, opacity: 0 });
    gsap.set(ctas, { y: 18, opacity: 0 });

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

    intro
      .to(gardenPanel, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3 }, 0)
      .to(cafePanel, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3 }, 0.1)
      .to(
        seam,
        { scaleY: 1, opacity: 1, duration: 0.75, ease: "power2.out" },
        0.5,
      )
      .to(copy, { y: 0, opacity: 1, duration: 0.85 }, 0.55)
      .to(ctas, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 }, 0.75);

    let exitTl;
    intro.eventCallback("onComplete", () => {
      gardenShow.start();
      cafeShow.start();

      exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.85,
          onUpdate: (self) => {
            if (self.progress > 0.08) {
              gardenShow.stop();
              cafeShow.stop();
            } else {
              gardenShow.start();
              cafeShow.start();
            }
          },
        },
      });

      exitTl
        .to(gardenPanel, { yPercent: -7, ease: "none" }, 0)
        .to(cafePanel, { yPercent: -7, ease: "none" }, 0)
        .to(copy, { y: -40, opacity: 0.3, ease: "none" }, 0)
        .to(seam, { opacity: 0.15, ease: "none" }, 0);
    });

    const onMove = (event) => {
      if (window.matchMedia("(pointer: fine)").matches === false) {
        return;
      }
      const rect = root.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(gardenParallax, {
        x: nx * -12,
        y: ny * -8,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(cafeParallax, {
        x: nx * 12,
        y: ny * 8,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    root.addEventListener("mousemove", onMove);

    return () => {
      root.removeEventListener("mousemove", onMove);
      gardenShow.destroy();
      cafeShow.destroy();
      intro.kill();
      if (exitTl) {
        exitTl.scrollTrigger?.kill();
        exitTl.kill();
      }
    };
  }, [reducedMotion]);

  return (
    <section
      ref={scope}
      id="home"
      className="relative h-[62svh] min-h-[22rem] w-full overflow-hidden bg-juniper-dark md:h-[74svh] md:min-h-[28rem] lg:h-[100svh] lg:min-h-[36rem]"
      aria-label="Welcome to Waterfall Gully Cafe and Nursery"
    >
      <div className="absolute inset-0 flex flex-row">
        {/* Left — garden / storefront slides @ 1.5s */}
        <div
          data-hero-panel="garden"
          className="relative h-full w-1/2 overflow-hidden"
        >
          <div
            data-hero-parallax="garden"
            className="absolute inset-0 will-change-transform"
          >
            {GARDEN_SLIDES.map((slide, index) => (
              <div
                key={slide.src}
                data-garden-slide
                className="absolute inset-[-8%] will-change-transform"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  zIndex: index === 0 ? 2 : 1,
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="50vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
          <div
            className="absolute inset-0 z-[4] bg-gradient-to-r from-juniper-dark/30 via-transparent to-juniper-dark/45"
            aria-hidden="true"
          />
        </div>

        {/* Right — cafe slides @ 1.5s */}
        <div
          data-hero-panel="cafe"
          className="relative h-full w-1/2 overflow-hidden"
        >
          <div
            data-hero-parallax="cafe"
            className="absolute inset-0 will-change-transform"
          >
            {CAFE_SLIDES.map((slide, index) => (
              <div
                key={slide.src}
                data-cafe-slide
                className="absolute inset-[-8%] will-change-transform"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  zIndex: index === 0 ? 2 : 1,
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="50vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
          <div
            className="absolute inset-0 z-[4] bg-gradient-to-l from-juniper-dark/30 via-transparent to-juniper-dark/45"
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgb(30_51_41_/_0.55)_0%,rgb(30_51_41_/_0.22)_42%,transparent_70%)]"
        aria-hidden="true"
      />

      <div
        data-hero-seam
        className="pointer-events-none absolute left-1/2 top-[18%] z-[2] h-[64%] w-px origin-center -translate-x-1/2 bg-gradient-to-b from-transparent via-chalk/55 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-[3] flex h-full items-center justify-center px-4 pb-8 pt-20 md:pb-12 md:pt-24">
        <div
          data-hero-copy
          className="max-w-xl text-center text-chalk will-change-transform"
        >
          <h1 className="font-display text-[clamp(2.1rem,6.5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.03em] text-chalk">
            Waterfall Gully
          </h1>
          <p className="mt-2 font-utility text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-safflower md:mt-3 md:text-xs">
            Cafe + Nursery
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-chalk/90 md:mt-5 md:text-lg">
            Coffee among the green on Old Cape Schanck Road, Rosebud.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-8">
            <Link
              href="#intro"
              className="btn-garden"
              data-hero-cta
              data-cursor="GO"
            >
              Wander in
            </Link>
            <Link
              href="#menu"
              className="btn-ghost"
              data-hero-cta
              data-cursor="TASTE"
            >
              View menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
