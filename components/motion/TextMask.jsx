"use client";

import { useRef } from "react";
import gsap from "gsap";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Line-by-line text reveal using overflow masks.
 */
export default function TextMask({
  lines,
  className = "",
  lineClassName = "overflow-hidden",
  innerClassName = "block",
  stagger = 0.08,
  duration = 0.75,
  start = "top 88%",
  once = true,
}) {
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    () => {
      const root = rootRef.current;
      if (!root) {
        return undefined;
      }

      const inners = root.querySelectorAll("[data-text-mask-inner]");
      if (!inners.length) {
        return undefined;
      }

      if (reducedMotion) {
        gsap.set(inners, { y: 0, opacity: 1 });
        return undefined;
      }

      gsap.set(inners, { y: "110%", opacity: 0.001 });

      gsap.to(inners, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });

      return undefined;
    },
    [lines, stagger, duration, start, once, reducedMotion],
  );

  return (
    <div ref={rootRef} className={className}>
      {lines.map((line, index) => (
        <div key={line.id ?? index} className={lineClassName}>
          <span
            data-text-mask-inner
            className={`${innerClassName} will-change-transform`}
          >
            {line.content ?? line}
          </span>
        </div>
      ))}
    </div>
  );
}
