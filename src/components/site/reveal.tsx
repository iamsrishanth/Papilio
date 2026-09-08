"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Reveal — a subtle scroll-into-view fade-up (opacity + translate-y,
 * 500ms, once, -60px bottom margin).
 *
 * SSR-safety contract: the hidden state is armed only client-side in a
 * pre-paint layout effect and ONLY when motion is allowed. Server HTML,
 * no-JS, and prefers-reduced-motion all render fully visible — hydration
 * can never freeze content at opacity:0 (the failure mode of baking
 * framer `initial` styles into SSR markup).
 *
 * Applied sparingly to section headers and card grids — never to the
 * hero (LCP) or the 3D canvas.
 */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

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
  // "armed" = the hidden state may be applied (motion allowed, JS up)
  const [armed, setArmed] = React.useState(false);
  const [shown, setShown] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion / no IO support: stay visible, no classes at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (!("IntersectionObserver" in window)) {
      return;
    }
    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cn(
        armed && (shown ? "reveal-shown" : "reveal-hidden"),
        className
      )}
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
