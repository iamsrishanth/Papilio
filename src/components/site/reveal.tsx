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
    if (!("IntersectionObserver" in window)) {
      return;
    }

    // Check if element is already within the initial viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      return;
    }

    el.classList.add("reveal-hidden");

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.remove("reveal-hidden");
          el.classList.add("reveal-shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
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
