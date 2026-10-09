"use client";

import { useRef } from "react";
import gsap from "gsap";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Organic clip-path reveal on scroll (or immediate when reduced motion).
 */
export default function OrganicReveal({
  children,
  className = "",
  as: Tag = "div",
  start = "top 85%",
  end = "top 45%",
  scrub = false,
  once = true,
  delay = 0,
  duration = 1,
}) {
  const innerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    () => {
      const el = innerRef.current;
      if (!el) {
        return undefined;
      }

      if (reducedMotion) {
        gsap.set(el, {
          clipPath: "inset(0% 0% 0% 0% round 1.25rem)",
          opacity: 1,
          y: 0,
        });
        return undefined;
      }

      gsap.set(el, {
        clipPath: "inset(12% 8% 18% 6% round 2.5rem)",
        opacity: 0.35,
        y: 28,
      });

      const tweenConfig = {
        clipPath: "inset(0% 0% 0% 0% round 1.25rem)",
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
      };

      if (scrub) {
        gsap.to(el, {
          ...tweenConfig,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        });
      } else {
        gsap.to(el, {
          ...tweenConfig,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        });
      }

      return undefined;
    },
    [start, end, scrub, once, delay, duration, reducedMotion],
  );

  return (
    <Tag ref={innerRef} className={className} data-animate="gsap">
      {children}
    </Tag>
  );
}
