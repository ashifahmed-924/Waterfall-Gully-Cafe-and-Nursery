"use client";

import GreenhouseGrid from "@/components/patterns/GreenhouseGrid";
import LeafVein from "@/components/patterns/LeafVein";
import FilteredLight from "@/components/ambience/FilteredLight";
import ForegroundFoliage from "@/components/ambience/ForegroundFoliage";
import LeafShadows from "@/components/ambience/LeafShadows";
import PollenLayer from "@/components/ambience/PollenLayer";
import RippleTexture from "@/components/ambience/RippleTexture";

/**
 * Fixed ambient stack behind page content.
 */
export default function AmbientGarden({ className = "" }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-chalk ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-40">
        <LeafVein className="h-full w-full" opacity={0.1} />
      </div>
      <div className="absolute inset-0 opacity-30 mix-blend-multiply">
        <GreenhouseGrid className="h-full w-full" />
      </div>
      <FilteredLight />
      <RippleTexture />
      <LeafShadows />
      <PollenLayer />
      <ForegroundFoliage className="opacity-70" />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-chalk via-chalk/80 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
