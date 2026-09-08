"use client";

import * as React from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * BackToTop — espresso pill with a butter chevron, appears after the
 * viewport has scrolled past the fold. Butter sits on espresso (legal),
 * and it never shows in print.
 */
export function BackToTop({ className }: { className?: string }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 600);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reduced = React.useCallback(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: reduced() ? "auto" : "smooth",
        })
      }
      className={cn(
        "no-print fixed bottom-6 right-6 z-40 inline-flex size-11 items-center justify-center rounded-pill bg-espresso text-butter shadow-lift transition-all duration-300 hover:bg-[#201208] focus-visible:outline-2 focus-visible:outline-caramel",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
        className
      )}
    >
      <ChevronUp className="size-5" aria-hidden="true" />
    </button>
  );
}
