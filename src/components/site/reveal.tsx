"use client";

import * as React from "react";

/**
 * Reveal — a subtle scroll-into-view fade-up for content below the fold.
 *
 * Performance-first contract:
 * - Content renders fully visible in SSR and initial paint (zero hydration flicker).
 * - Elements already in the viewport on initial load remain visible without opacity dip (optimizes Speed Index).
 * - Below-the-fold elements arm and reveal via direct class manipulation on IntersectionObserver (zero React state re-renders, zero main-thread blocking).
 * - Respects prefers-reduced-motion automatically.
 */
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver() {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-hidden");
            entry.target.classList.add("reveal-shown");
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "50px 0px" }
    );
  }
  return sharedObserver;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "figure" | "li";
}) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const io = getSharedObserver();
    if (!io) return;

    el.classList.add("reveal-hidden");
    io.observe(el);

    return () => {
      io.unobserve(el);
    };
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={className}
      style={
        {
          "--reveal-y": `${y}px`,
          ...(delay > 0 ? { transitionDelay: `${delay}s` } : null),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
