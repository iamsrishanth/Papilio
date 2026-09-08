"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WingUnfold — CSS-3D scroll-driven swallowtail wing pair (no WebGL).
 *
 * A tall section (200vh) with a sticky viewport; scroll progress
 * (0..1) rotates the two wing halves around their spine (the Y axis)
 * from ~55deg folded to 0deg open, inside a 1200px perspective.
 * Updates are transform/opacity-only via refs — no re-renders, no
 * layout reads beyond one getBoundingClientRect per rAF.
 *
 * Reduced motion: the section collapses to a static, open butterfly
 * and no listeners are attached. Server-rendered default is folded,
 * so the page is intact even if JS never runs.
 */

/** Folded wing angle in degrees (0 = fully open). */
const FOLDED_DEG = 55;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** One wing half — caramel fill, butter-gold accents. */
function WingHalf({
  gradientId,
  className,
}: {
  /** Deterministic SVG gradient id (unique per instance). */
  gradientId: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 32 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a5b1f" />
          <stop offset="1" stopColor="#8c4a12" />
        </linearGradient>
      </defs>
      <g strokeLinejoin="round">
        {/* Forewing */}
        <path
          d="M30.4 26.5 C 26 18.5, 18 9.5, 10.2 8.4 C 4.2 7.6, 1.4 12.4, 3.4 17.2 C 5.9 23, 14.5 30.2, 28.2 32.6 Z"
          fill={`url(#${gradientId})`}
          stroke="#d9a441"
          strokeWidth="1"
        />
        {/* Hindwing with swallow tails */}
        <path
          d="M30 35.2 C 22 36.2, 13.2 40.4, 11.2 47 C 9.8 52.8, 14.2 57.4, 19 55.4 C 22.6 53.9, 25.2 50.2, 26.6 46.8 C 26.6 52.4, 24.6 57.4, 20.6 60.8 C 26.2 59.8, 30 54.2, 30.6 47 C 31 43, 30.6 38.4, 30 35.2 Z"
          fill={`url(#${gradientId})`}
          stroke="#d9a441"
          strokeWidth="1"
        />
        {/* Butter-gold accents: veins and spots */}
        <path
          d="M28 29 C 20 24, 12 18, 8 12"
          fill="none"
          stroke="#d9a441"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M28.4 38 C 21 41, 15 46, 12.5 51"
          fill="none"
          stroke="#d9a441"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <circle cx="9" cy="13" r="2" fill="#d9a441" />
        <circle cx="15.5" cy="21.5" r="1.4" fill="#d9a441" />
        <circle cx="14" cy="48.5" r="1.6" fill="#d9a441" />
      </g>
    </svg>
  );
}

/** The body between the wings — espresso with caramel antennae. */
function WingBody({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 64" className={className} aria-hidden="true">
      <path
        d="M5.4 14 C 4.9 26, 4.9 42, 5.6 56 C 5.8 60, 6.6 60, 6.8 56 C 7.5 42, 7.5 26, 7 14 C 6.8 12, 5.6 12, 5.4 14 Z"
        fill="#2a1b10"
      />
      <g fill="none" stroke="#9a5b1f" strokeWidth="0.9" strokeLinecap="round">
        <path d="M5.6 13 C 4.6 8, 3.4 5, 2.2 3.2" />
        <path d="M7.4 13 C 8.4 8, 9.6 5, 10.8 3.2" />
      </g>
      <circle cx="2.2" cy="3.2" r="0.8" fill="#9a5b1f" />
      <circle cx="10.8" cy="3.2" r="0.8" fill="#9a5b1f" />
    </svg>
  );
}

export function WingUnfold({
  children,
  footer,
  scrollHint = "Scroll to unfold",
  className,
}: {
  /** Copy above the wing pair (heading + intro paragraph). */
  children?: React.ReactNode;
  /** Copy below the wing pair — the visual sits between the two. */
  footer?: React.ReactNode;
  /** Hint line rendered while the scroll-driven version is active. */
  scrollHint?: string;
  className?: string;
}) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const leftWingRef = React.useRef<HTMLDivElement | null>(null);
  const rightWingRef = React.useRef<HTMLDivElement | null>(null);
  const shadowRef = React.useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = React.useState(false);

  /** Apply wing fold for progress p (0 = folded, 1 = open). */
  const applyWings = React.useCallback((progress: number) => {
    const p = clamp01(progress);
    const angle = FOLDED_DEG * (1 - p);
    if (leftWingRef.current) {
      leftWingRef.current.style.transform = `rotateY(${angle}deg)`;
    }
    if (rightWingRef.current) {
      rightWingRef.current.style.transform = `rotateY(${-angle}deg)`;
    }
    if (shadowRef.current) {
      shadowRef.current.style.transform = `scale(${0.55 + 0.45 * p})`;
      shadowRef.current.style.opacity = `${0.2 + 0.25 * p}`;
    }
  }, []);

  // Track the reduced-motion preference (collapses the tall section).
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Scroll progress → wing fold. Progress runs 0..1 across the span
  // the sticky butterfly is pinned (section height minus viewport),
  // so the wings finish opening exactly as it unpins. Listeners
  // attach only while the section is near the viewport.
  React.useEffect(() => {
    if (reduced) {
      applyWings(1);
      return;
    }
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      // Scrollable span while the content is pinned; falls back to
      // the full section height if the viewport is somehow taller.
      const pinnedSpan = sectionHeight - window.innerHeight;
      const span = Math.max(pinnedSpan > 0 ? pinnedSpan : sectionHeight, 1);
      const progress = (window.scrollY - sectionTop) / span;
      applyWings(progress);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[entries.length - 1]?.isIntersecting ?? false;
        if (visible) {
          update();
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", onScroll);
          if (raf) {
            window.cancelAnimationFrame(raf);
            raf = 0;
          }
        }
      },
      { rootMargin: "100% 0px" }
    );
    observer.observe(section);
    update(); // paint the correct fold on mount

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      }
    };
  }, [reduced, applyWings]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative", reduced ? "py-16 lg:py-24" : "h-[200vh]", className)}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center text-center",
          reduced
            ? "py-10"
            : "sticky top-0 min-h-screen px-4 py-16"
        )}
      >
        {children}

        {/* The wing pair — CSS 3D, transform-only updates */}
        <div
          aria-hidden="true"
          className="relative mt-10 flex items-center justify-center [perspective:1200px]"
        >
          <div className="flex items-center">
            <div
              ref={leftWingRef}
              style={{ transform: `rotateY(${FOLDED_DEG}deg)` }}
              className="[transform-origin:100%_50%] [transform-style:preserve-3d] [will-change:transform]"
            >
              <WingHalf
                gradientId="papilio-wing-left"
                className="h-40 w-20 sm:h-52 sm:w-[104px]"
              />
            </div>
            <WingBody className="h-40 w-[30px] sm:h-52 sm:w-[39px]" />
            <div
              ref={rightWingRef}
              style={{ transform: `rotateY(${-FOLDED_DEG}deg)` }}
              className="[transform-origin:0%_50%] [transform-style:preserve-3d] [will-change:transform]"
            >
              <WingHalf
                gradientId="papilio-wing-right"
                className="h-40 w-20 -scale-x-100 sm:h-52 sm:w-[104px]"
              />
            </div>
          </div>
        </div>

        {/* Ground shadow — scales/lifts with the same progress */}
        <div
          ref={shadowRef}
          aria-hidden="true"
          className="mt-8 h-3 w-40 rounded-full bg-espresso/25 blur-md"
          style={{ transform: "scale(0.55)", opacity: 0.2 }}
        />

        {footer ? <div className="mt-8 max-w-md">{footer}</div> : null}

        {!reduced && (
          <p className="mt-6 flex items-center gap-2 text-sm text-cocoa/70">
            <ChevronDown
              className="size-4 animate-bounce"
              aria-hidden="true"
            />
            {scrollHint}
          </p>
        )}
      </div>
    </section>
  );
}
