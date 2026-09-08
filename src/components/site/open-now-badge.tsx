"use client";

import * as React from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * OpenNowBadge — live open/closed status derived from the verified
 * hours (08:00–22:30, all days) in the café's own timezone (IST).
 * No new facts: the strings come from site.hours.
 *
 * Renders a static, always-true fallback on the server (hydration-safe);
 * the status resolves after mount and refreshes every minute.
 */

type Status = "open" | "closed";

/** [opensDisplay, closesDisplay] from the verified hours string. */
const [opensDisplay, closesDisplay] = site.hours.display
  .split("–")
  .map((s) => s.trim());

function parseClock(display: string): number {
  const m = display.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return 0;
  let h = Number(m[1]);
  const min = Number(m[2]);
  const mer = m[3].toUpperCase();
  if (mer === "PM" && h !== 12) h += 12;
  if (mer === "AM" && h === 12) h = 0;
  return h * 60 + min;
}

const OPENS_MIN = parseClock(opensDisplay);
const CLOSES_MIN = parseClock(closesDisplay);

/** Minutes since midnight, in the café's timezone. */
function minutesInIST(): number {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
    const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
    return h * 60 + m;
  } catch {
    return -1;
  }
}

export function OpenNowBadge({
  variant = "pill",
  className,
}: {
  variant?: "pill" | "line";
  className?: string;
}) {
  const [status, setStatus] = React.useState<Status | null>(null);

  React.useEffect(() => {
    const update = () => {
      const now = minutesInIST();
      if (now < 0) return;
      setStatus(now >= OPENS_MIN && now < CLOSES_MIN ? "open" : "closed");
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const label =
    status === "open"
      ? `Open now · till ${closesDisplay}`
      : status === "closed"
        ? `Closed · opens ${opensDisplay}`
        : `Open daily ${site.hours.display}`;

  if (variant === "line") {
    return (
      <p
        aria-live="polite"
        className={cn(
          "flex items-center gap-2 text-sm font-medium text-cocoa",
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "size-2 shrink-0 rounded-full",
            status === "open" ? "bg-caramel animate-pulse" : "bg-cocoa/60"
          )}
        />
        {label}
      </p>
    );
  }

  return (
    <span
      aria-live="polite"
      className={cn(
        "label-caps inline-flex items-center gap-2 rounded-pill bg-linen/70 px-3 py-1.5 text-[0.7rem] text-cocoa",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2 shrink-0 rounded-full",
          status === "open" ? "bg-caramel animate-pulse" : "bg-cocoa/60"
        )}
      />
      <span className="normal-case tracking-normal">{label}</span>
    </span>
  );
}
