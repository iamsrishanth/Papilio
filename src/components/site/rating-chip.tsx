import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * chip-rating — espresso pill with butter-gold text (DESIGN.md).
 * Butter text only ever sits on espresso surfaces.
 */
export function RatingChip({
  platform,
  score,
  count,
  className,
}: {
  platform: string;
  score: string;
  count?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label-caps inline-flex items-center gap-1.5 rounded-pill bg-espresso px-3 py-1.5 text-butter",
        className
      )}
    >
      <Star className="size-3 fill-butter text-butter" aria-hidden="true" />
      <span className="tnum">
        {platform} {score}
        {count ? <span className="opacity-70"> · {count}</span> : null}
      </span>
    </span>
  );
}
