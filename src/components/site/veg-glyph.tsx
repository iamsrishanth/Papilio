import { cn } from "@/lib/utils";

export type DietKind = "veg" | "nonveg" | "egg";

/**
 * FSSAI veg / non-veg marker — a legal marker in India, not decoration.
 * Rendered on every menu item (PROMPT.md §3).
 */
export function VegGlyph({
  kind,
  className,
}: {
  kind: DietKind;
  className?: string;
}) {
  const color = kind === "veg" ? "#2e7d32" : "#963b26";
  const label =
    kind === "veg" ? "Vegetarian" : kind === "nonveg" ? "Non-vegetarian" : "Contains egg";

  return (
    <span
      className={cn("inline-flex shrink-0 items-center", className)}
      title={label}
    >
      <svg
        viewBox="0 0 16 16"
        className="size-[14px]"
        role="img"
        aria-label={label}
      >
        <rect
          x="1"
          y="1"
          width="14"
          height="14"
          rx="2"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
        />
        {kind === "nonveg" ? (
          /* Brown triangle — FSSAI non-veg marker */
          <path d="M8 4.2 L11.4 11.2 H4.6 Z" fill={color} />
        ) : (
          /* Circle for veg (green) and egg (brown) */
          <circle cx="8" cy="8" r="3.1" fill={color} />
        )}
      </svg>
    </span>
  );
}
