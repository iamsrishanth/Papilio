"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { StoryMilestone } from "@/content/story";

/**
 * StoryTimeline — the milestone strip with a progress-linked reveal:
 * each milestone fades up (staggered) and its caramel dot "lands" with
 * a springy pop just after — reading as the timeline filling in.
 *
 * SSR-safety contract (same as Reveal): the hidden state is armed only
 * client-side pre-paint and only when motion is allowed. Server HTML,
 * no-JS and prefers-reduced-motion render the static, fully visible
 * list — hydration can never freeze content invisible.
 */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function StoryTimeline({ milestones }: { milestones: StoryMilestone[] }) {
  const ref = React.useRef<HTMLOListElement | null>(null);
  const [armed, setArmed] = React.useState(false);
  const [shown, setShown] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
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
      { rootMargin: "0px 0px -100px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol
      ref={ref}
      className="mt-10 border-l-2 border-caramel/40 pl-8 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-8 sm:border-l-0 sm:border-t-2 sm:pl-0"
    >
      {milestones.map((m, i) => (
        <li
          key={m.label}
          className={cn(
            "relative pb-10 last:pb-0 sm:pb-0 sm:pt-8",
            armed && (shown ? "tl-shown" : "tl-hidden")
          )}
          style={armed ? { transitionDelay: `${i * 0.08}s` } : undefined}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1 -left-[39px] size-3 rounded-full bg-caramel ring-4 ring-cream sm:-top-[7px] sm:left-0",
              armed && (shown ? "tl-dot-shown" : "tl-dot-hidden")
            )}
            style={
              armed ? { transitionDelay: `${i * 0.08 + 0.28}s` } : undefined
            }
          />
          <p className="label-caps text-caramel">{m.label}</p>
          <p className="font-display mt-2 text-h3 font-medium text-espresso">
            {m.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-cocoa">{m.detail}</p>
        </li>
      ))}
    </ol>
  );
}
