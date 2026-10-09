"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the nearest snapped slide index in a horizontal scroll container.
 */
export default function useSwipeIndex(trackRef, itemCount = 0) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || itemCount < 1) {
      return undefined;
    }

    const update = () => {
      const slides = track.querySelectorAll("[data-swipe-slide]");
      if (!slides.length) {
        return;
      }

      const left = track.scrollLeft;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft - left);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });

      setIndex((prev) => (prev === best ? prev : best));
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [trackRef, itemCount]);

  return index;
}

export function scrollToSwipeSlide(trackRef, index) {
  const track = trackRef.current;
  if (!track) {
    return;
  }
  const slide = track.querySelectorAll("[data-swipe-slide]")[index];
  if (slide) {
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }
}
