"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { waterfallGully } from "@/data/waterfallGully";
import useReducedMotion from "@/hooks/useReducedMotion";
import MenuCategories, { getCategoryPrefix } from "./MenuCategories";
import MenuGroup from "./MenuGroup";
import BotanicalMenuVisual from "./BotanicalMenuVisual";

const { categories } = waterfallGully.menu;

export default function MenuSection({ className = "" }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "breakfast");
  const sectionRef = useRef(null);
  const listPanelRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeId) ?? categories[0],
    [activeId],
  );

  const animateCategoryChange = useCallback(
    (nextId) => {
      if (nextId === activeId) {
        return;
      }

      const listEl = listPanelRef.current;
      const visualEl = sectionRef.current?.querySelector("[data-menu-visual]");

      const apply = () => {
        setActiveId(nextId);
      };

      if (reducedMotion || !listEl) {
        apply();
        return;
      }

      gsap.to([listEl, visualEl].filter(Boolean), {
        opacity: 0,
        y: 16,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          apply();
          gsap.fromTo(
            [listEl, visualEl].filter(Boolean),
            { opacity: 0, y: -12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
              stagger: 0.06,
            },
          );
        },
      });
    },
    [activeId, reducedMotion],
  );

  const prefix = getCategoryPrefix(activeCategory.id);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className={`section-rhythm bg-chalk ${className}`}
      aria-labelledby="menu-heading"
    >
      <div className="section-inner">
        <header className="mb-10 max-w-2xl">
          <p className="section-eyebrow">From the kitchen</p>
          <h2
            id="menu-heading"
            className="mt-2 font-display text-[clamp(2rem,4.5vw,3.25rem)] text-juniper-dark"
          >
            Today&apos;s menu
          </h2>
          <p className="section-lead mt-4">{waterfallGully.menu.note}</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,11rem)_1fr_minmax(0,14rem)] lg:gap-8 xl:grid-cols-[minmax(0,12rem)_1fr_minmax(0,16rem)]">
          <MenuCategories
            categories={categories}
            activeId={activeId}
            onSelect={animateCategoryChange}
          />

          <div
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`menu-tab-${activeId}`}
            ref={listPanelRef}
            className="min-w-0"
          >
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-juniper/15 pb-3">
              <h3 className="font-display text-2xl text-juniper-dark">
                {activeCategory.title}
              </h3>
              <span className="font-mono text-[0.625rem] uppercase tracking-widest text-wisteria">
                Index {prefix}01–{prefix}
                {String(activeCategory.items.length).padStart(2, "0")}
              </span>
            </div>
            <MenuGroup prefix={prefix} items={activeCategory.items} />
            <p className="mt-6 font-utility text-sm font-semibold uppercase tracking-wide text-deep-clay">
              SEE TODAY&apos;S MENU IN CAFE
            </p>
          </div>

          <BotanicalMenuVisual categoryId={activeId} />
        </div>
      </div>
    </section>
  );
}
