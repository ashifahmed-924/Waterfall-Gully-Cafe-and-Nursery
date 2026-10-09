"use client";

/**
 * Dot indicators for mobile swipe carousels.
 */
export default function SwipeDots({
  count,
  activeIndex = 0,
  onSelect,
  label = "Slides",
  className = "",
}) {
  if (count < 2) {
    return null;
  }

  return (
    <div
      className={`mt-4 flex items-center justify-center gap-2 md:hidden ${className}`}
      role="tablist"
      aria-label={label}
    >
      {Array.from({ length: count }, (_, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`${label} ${i + 1}`}
            onClick={() => onSelect?.(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              active
                ? "w-5 bg-juniper-dark"
                : "w-2 bg-juniper/30 hover:bg-juniper/50"
            }`}
          />
        );
      })}
    </div>
  );
}
