"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerRegistered = false;

function ensureScrollTrigger() {
  if (typeof window === "undefined") {
    return;
  }
  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }
}

/**
 * Runs GSAP animations inside gsap.context scoped to a ref, with ScrollTrigger
 * registered once on the client. Cleans up context and associated ScrollTriggers on unmount.
 * Uses useEffect (not useLayoutEffect) so GSAP mutations do not fight React hydration.
 *
 * @param {(context: { scope: React.RefObject<HTMLElement | null> }) => void | (() => void)} setup
 * @param {React.DependencyList} [deps=[]]
 * @returns {React.RefObject<HTMLElement | null>} scope ref — attach to your section root
 */
export function useGsapContext(setup, deps = []) {
  const scope = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    ensureScrollTrigger();

    const scopeElement = scope.current;
    if (!scopeElement) {
      return undefined;
    }

    let teardownFromSetup;
    let ctx;
    let cancelled = false;

    // Defer one frame so hydration can finish before DOM mutation
    const frame = window.requestAnimationFrame(() => {
      if (cancelled || !scope.current) {
        return;
      }

      ctx = gsap.context(() => {
        const result = setup({ scope });
        if (typeof result === "function") {
          teardownFromSetup = result;
        }
      }, scope.current);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);

      if (typeof teardownFromSetup === "function") {
        teardownFromSetup();
      }

      const element = scope.current || scopeElement;
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        const triggerEl = trigger.trigger;
        if (
          triggerEl === element ||
          (triggerEl instanceof Element && element.contains(triggerEl))
        ) {
          trigger.kill();
        }
      });

      if (ctx) {
        ctx.revert();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls animation deps
  }, deps);

  return scope;
}

export default useGsapContext;
