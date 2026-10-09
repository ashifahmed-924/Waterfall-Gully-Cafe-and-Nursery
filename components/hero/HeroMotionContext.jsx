"use client";

import { createContext, useContext, useMemo, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

const HeroMotionContext = createContext({
  playing: true,
  setPlaying: () => {},
  reducedMotion: false,
  canAnimate: false,
});

/**
 * Shared play/pause + reduced-motion state for decorative hero effects.
 */
export function HeroMotionProvider({ children }) {
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(true);

  const value = useMemo(
    () => ({
      playing,
      setPlaying,
      reducedMotion,
      canAnimate: playing && !reducedMotion,
    }),
    [playing, reducedMotion],
  );

  return (
    <HeroMotionContext.Provider value={value}>
      {children}
    </HeroMotionContext.Provider>
  );
}

export function useHeroMotion() {
  return useContext(HeroMotionContext);
}

export default HeroMotionContext;
