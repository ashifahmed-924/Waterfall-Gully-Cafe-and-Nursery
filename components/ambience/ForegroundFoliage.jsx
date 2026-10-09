"use client";

import Image from "next/image";
import { waterfallGully } from "@/data/waterfallGully";

const { foliageLeft, foliageRight } = waterfallGully.images;

/**
 * Edge foliage framing — non-interactive decorative layer.
 */
export default function ForegroundFoliage({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Image
        src={foliageLeft}
        alt=""
        width={480}
        height={720}
        className="absolute bottom-0 left-0 h-[min(72vh,640px)] w-auto max-w-[38vw] object-contain object-left-bottom opacity-90"
        priority={false}
      />
      <Image
        src={foliageRight}
        alt=""
        width={480}
        height={720}
        className="absolute bottom-0 right-0 h-[min(68vh,600px)] w-auto max-w-[36vw] object-contain object-right-bottom opacity-90"
        priority={false}
      />
    </div>
  );
}
