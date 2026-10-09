"use client";

import { useRef } from "react";
import gsap from "gsap";
import useGsapContext from "@/hooks/useGsapContext";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Animates an SVG path stroke with GSAP (draw-on effect).
 */
export default function DrawPath({
  d,
  className = "",
  stroke = "currentColor",
  strokeWidth = 1.5,
  fill = "none",
  duration = 1.2,
  delay = 0,
  ease = "power2.inOut",
  play = true,
  viewBox = "0 0 400 120",
  pathClassName = "",
  label,
  markers = [],
}) {
  const pathRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    () => {
      const path = pathRef.current;
      if (!path || !play) {
        return undefined;
      }

      const length = path.getTotalLength();

      if (reducedMotion) {
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: 0,
          opacity: 1,
        });
        return undefined;
      }

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration,
        delay,
        ease,
      });

      return undefined;
    },
    [d, duration, delay, ease, play, reducedMotion],
  );

  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <path
        ref={pathRef}
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={pathClassName}
      />
      {markers.map((marker) => (
        <g key={marker.id ?? marker.label} transform={marker.transform}>
          <text
            className="font-mono fill-juniper-dark text-[10px] uppercase tracking-widest"
            x={marker.x ?? 0}
            y={marker.y ?? 0}
          >
            {marker.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
