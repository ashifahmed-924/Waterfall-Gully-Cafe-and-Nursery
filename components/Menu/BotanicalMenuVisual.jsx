"use client";

import Image from "next/image";

const VISUALS = {
  breakfast: {
    src: "/images/waterfall-gully/food/eggs-benedict.jpg",
    alt: "Classic eggs benedict-style brunch plate",
    caption: "Morning field notes",
  },
  "light-meals": {
    src: "/images/waterfall-gully/food/quiche.jpg",
    alt: "Savory slice quiche-style lunch plate",
    caption: "Midday specimens",
  },
  cabinet: {
    src: "/images/waterfall-gully/food/cabinet.jpg",
    alt: "Display of baked goods and cabinet items",
    caption: "Cabinet collection",
  },
  drinks: {
    src: "/images/waterfall-gully/food/matcha.jpg",
    alt: "Green matcha latte in a glass",
    caption: "Under the canopy",
  },
};

export default function BotanicalMenuVisual({ categoryId }) {
  const visual = VISUALS[categoryId] ?? VISUALS.breakfast;

  return (
    <aside
      className="relative hidden lg:block"
      aria-label="Menu category illustration"
    >
      <div className="sticky top-28">
        <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-deep-clay">
          {visual.caption}
        </p>
        <div
          data-menu-visual
          className="relative aspect-[4/5] overflow-hidden rounded-[10px] border border-juniper/15 bg-pale-celadon/30"
        >
          <Image
            key={visual.src}
            src={visual.src}
            alt={visual.alt}
            fill
            sizes="(max-width: 1280px) 0px, 22vw"
            className="object-cover"
          />
        </div>
        <p className="mt-4 font-body text-sm text-basalt/70">
          {VISUALS[categoryId]
            ? "Illustrative mood — see today's menu in cafe."
            : "Browse categories for today’s line-up."}
        </p>
      </div>
    </aside>
  );
}
