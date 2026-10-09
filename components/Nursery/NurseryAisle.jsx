"use client";

import Image from "next/image";

/**
 * Single nursery aisle column — expands on hover (desktop) or stacks full-width (mobile).
 */
export default function NurseryAisle({
  label,
  image,
  alt,
  isActive = false,
  onActivate,
  onDeactivate,
  className = "",
}) {
  return (
    <article
      className={`group relative flex min-h-[340px] w-full flex-1 overflow-hidden transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:min-h-[min(78vh,720px)] ${isActive ? "md:flex-[1.38]" : "md:flex-[1]"} ${className}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      tabIndex={0}
      aria-label={`${label} nursery aisle — browse in store`}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-within:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-juniper-dark/85 via-juniper-dark/35 to-juniper-dark/15 transition-opacity duration-500 group-hover:from-juniper-dark/90"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-[1] mt-auto flex w-full flex-col px-5 pb-8 pt-16 md:px-6 md:pb-10">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-celadon transition-transform duration-500 group-hover:-translate-y-1 group-focus-within:-translate-y-1"
          aria-hidden="true"
        >
          Browse in store
        </p>
        <h3 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-none tracking-tight text-chalk">
          {label}
        </h3>
      </div>
    </article>
  );
}
