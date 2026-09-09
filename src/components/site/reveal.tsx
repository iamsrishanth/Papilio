import * as React from "react";

/**
 * Reveal — a zero-JS Server Component that attaches data-reveal attributes
 * and CSS custom properties. A single global observer in ClientProviders
 * activates the subtle scroll animation without creating multiple React
 * client component boundaries or running layout queries.
 */
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
  const Tag = as as React.ElementType;

  return (
    <Tag
      data-reveal=""
      className={className}
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
