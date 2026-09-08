import { cn } from "@/lib/utils";

/**
 * The Papilio brand glyph — a swallowtail butterfly built from two
 * mirrored wing planes and a slender body (DESIGN.md "Brand Glyph").
 *
 * - variant="flat": butter-gold fill, for espresso/dark surfaces only.
 * - variant="line": 1.5px caramel line-art, for light surfaces.
 */
export function ButterflyGlyph({
  variant = "flat",
  className,
  strokeWidth = 1.5,
  decorative = false,
}: {
  variant?: "flat" | "line";
  className?: string;
  strokeWidth?: number;
  /** Decorative instances are hidden from assistive tech. */
  decorative?: boolean;
}) {
  const flat = variant === "flat";

  const wingFill = flat ? "#d9a441" : "none";
  const bodyFill = flat ? "#faf3e8" : "none";
  const strokeColor = flat ? "none" : "#9a5b1f";
  const sw = flat ? 0 : strokeWidth;

  const wing = (mirror: boolean) => (
    <g
      transform={mirror ? "translate(64, 0) scale(-1, 1)" : undefined}
      fill={wingFill}
      stroke={strokeColor}
      strokeWidth={sw}
      strokeLinejoin="round"
    >
      {/* Forewing */}
      <path d="M30.4 26.5 C 26 18.5, 18 9.5, 10.2 8.4 C 4.2 7.6, 1.4 12.4, 3.4 17.2 C 5.9 23, 14.5 30.2, 28.2 32.6 Z" />
      {/* Hindwing with swallow tails */}
      <path d="M30 35.2 C 22 36.2, 13.2 40.4, 11.2 47 C 9.8 52.8, 14.2 57.4, 19 55.4 C 22.6 53.9, 25.2 50.2, 26.6 46.8 C 26.6 52.4, 24.6 57.4, 20.6 60.8 C 26.2 59.8, 30 54.2, 30.6 47 C 31 43, 30.6 38.4, 30 35.2 Z" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 64 64"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Papilio swallowtail butterfly glyph"}
      className={cn("size-6", className)}
    >
      {wing(false)}
      {wing(true)}
      {/* Body + antennae */}
      <g
        fill={bodyFill}
        stroke={flat ? "#2a1b10" : "#9a5b1f"}
        strokeWidth={sw || 1.2}
        strokeLinecap="round"
      >
        <path
          d="M31.3 25.8 C 31 33, 31 40, 31.5 47 C 31.7 49.6, 32.3 49.6, 32.5 47 C 33 40, 33 33, 32.7 25.8 C 32.6 24.4, 31.4 24.4, 31.3 25.8 Z"
          fill={flat ? "#faf3e8" : "none"}
          stroke={flat ? "none" : "#9a5b1f"}
          strokeWidth={sw}
        />
        <path d="M31.7 25.2 C 29.2 20, 26.2 16.6, 23.8 15" fill="none" />
        <path d="M32.3 25.2 C 34.8 20, 37.8 16.6, 40.2 15" fill="none" />
        <circle cx="23.8" cy="15" r={flat ? 1 : 0.8} fill={flat ? "#faf3e8" : "#9a5b1f"} stroke="none" />
        <circle cx="40.2" cy="15" r={flat ? 1 : 0.8} fill={flat ? "#faf3e8" : "#9a5b1f"} stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Butterfly lockup: glyph + PAPILIO wordmark (Playfair 600, +0.06em).
 */
export function Wordmark({
  className,
  glyphClassName,
  dark = false,
}: {
  className?: string;
  glyphClassName?: string;
  dark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <ButterflyGlyph
        variant={dark ? "flat" : "line"}
        className={cn("size-7", glyphClassName)}
      />
      <span
        className={cn(
          "wordmark text-xl leading-none",
          dark ? "text-cream" : "text-espresso"
        )}
      >
        Papilio
      </span>
    </span>
  );
}
