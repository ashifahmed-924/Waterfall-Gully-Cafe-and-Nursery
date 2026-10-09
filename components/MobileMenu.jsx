"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { waterfallGully } from "@/data/waterfallGully";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen mobile navigation overlay with basic focus trap.
 */
export default function MobileMenu({ open, onClose, id = "mobile-menu" }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const { nav, links } = waterfallGully;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    lastFocusedRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusables = panelRef.current.querySelectorAll(FOCUSABLE);
      if (!focusables.length) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus();
      }
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-chalk/98 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      id={id}
    >
      <div
        ref={panelRef}
        className="flex min-h-0 flex-1 flex-col px-6 pb-10 pt-6"
      >
        <div className="flex items-center justify-between gap-4 border-b border-celadon/40 pb-4">
          <p
            id={`${id}-title`}
            className="font-display text-lg text-juniper-dark"
          >
            Explore the gully
          </p>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-celadon/60 bg-parchment/50 font-utility text-sm font-semibold text-juniper-dark transition hover:bg-pale-celadon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-safflower"
            aria-label="Close menu"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <nav
          className="mt-8 flex flex-1 flex-col gap-2"
          aria-label="Mobile primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-xl px-2 py-4 font-display text-2xl text-juniper-dark no-underline transition hover:bg-pale-celadon/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-safflower"
              data-cursor="VIEW"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-celadon/40 pt-6">
          <a
            href={links.giftCardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-utility text-sm font-semibold uppercase tracking-wider text-juniper no-underline hover:text-deep-clay"
            data-cursor="GO"
          >
            Gift cards
          </a>
          <Link
            href="#visit"
            onClick={onClose}
            className="btn-garden w-full text-center"
            data-cursor="GO"
          >
            Visit us
          </Link>
        </div>
      </div>
    </div>
  );
}
