import { cn } from "@/lib/utils";

/**
 * SteamBand — Scene B ambience for the coffee band, implemented as
 * pure CSS (4 rising wisps). Scene B is decorative and is the first
 * thing dropped when the perf budget is tight — CSS costs nothing.
 * `prefers-reduced-motion: reduce` freezes it via the global rule.
 */
export function SteamBand({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-6 h-44 overflow-hidden",
        className
      )}
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="animate-steam absolute bottom-0 rounded-full bg-ivory/25 blur-md motion-reduce:animate-none"
          style={{
            left: `${18 + i * 21}%`,
            width: `${26 + i * 9}px`,
            height: `${64 + i * 14}px`,
            animationDelay: `${i * 1.7}s`,
          }}
        />
      ))}
    </div>
  );
}
