"use client";

import * as React from "react";

/**
 * ReadingProgress — a hairline caramel progress bar pinned to the very
 * top of the viewport on long editorial pages (/story). Scroll-linked:
 * scaleX tracks document scroll fraction directly (no transitions —
 * it is user-driven, so it stays under prefers-reduced-motion), rAF
 * throttled, passive listener, cleaned up on unmount. aria-hidden + no
 * print: purely decorative wayfinding; the page's own headings carry
 * the structure.
 */
export function ReadingProgress() {
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const fraction =
        scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${fraction})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="no-print pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div
        ref={barRef}
        // full-width track, revealed via scaleX from the left edge
        className="h-full w-full origin-left bg-caramel"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
