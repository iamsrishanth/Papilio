import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaVariant = "primary" | "secondary" | "outline";

const variantClasses: Record<CtaVariant, string> = {
  /* button-primary — caramel fill, white label, pill. The only filled
     high-emphasis action per view. Hover darkens to caramel-deep. */
  primary:
    "h-auto rounded-pill bg-caramel px-6 py-3.5 text-white label-caps shadow-card hover:bg-caramel-deep hover:shadow-lift",
  /* button-secondary — ivory on cream, linen hairline, espresso label. */
  secondary:
    "h-auto rounded-pill bg-ivory px-6 py-3.5 text-espresso label-caps border border-linen hover:border-caramel hover:text-caramel",
  outline:
    "h-auto rounded-pill border border-caramel/40 bg-transparent px-6 py-3.5 text-caramel label-caps hover:bg-linen/60",
};

/**
 * CtaButton — pill CTA per DESIGN.md (label typography, 14px padding,
 * pill radius). Use `href` for anchors/links; otherwise renders a button.
 * External links open in a new tab.
 */
export function CtaButton({
  variant = "primary",
  href,
  external,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: CtaVariant;
  href?: string;
  external?: boolean;
}) {
  const classes = cn(variantClasses[variant], className);

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <Button asChild variant="ghost" className={classes}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        </Button>
      );
    }
    return (
      <Button asChild variant="ghost" className={classes}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button variant="ghost" className={classes} {...props}>
      {children}
    </Button>
  );
}
