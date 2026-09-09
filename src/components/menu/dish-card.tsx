import Image from "next/image";
import Link from "next/link";
import { VegGlyph } from "@/components/site/veg-glyph";
import type { MenuItem } from "@/content/menu";
import { cn } from "@/lib/utils";

/**
 * card-dish (DESIGN.md) — Playfair name, Inter body-sm description,
 * FSSAI glyph, price-tag bottom-right. Price renders only when verified.
 * Optional `href` turns the card into a deep link (e.g. into the menu
 * with that dish pre-searched) without adding a filled CTA.
 */
export function DishCard({
  item,
  image,
  className,
  priority = false,
  href,
}: {
  item: MenuItem;
  image?: { src: string; alt: string };
  className?: string;
  priority?: boolean;
  href?: string;
}) {
  const card = (
    <article
      className={cn(
        "group flex h-full flex-1 flex-col overflow-hidden rounded-card bg-ivory shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:transform-none",
        className
      )}
    >
      {image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-linen/40">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:transform-none motion-reduce:transition-none"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <VegGlyph kind={item.diet} className="mt-1.5" />
            <h3 className="font-display text-[1.25rem] font-medium leading-snug text-espresso lg:text-h3">
              {item.name}
            </h3>
          </div>
          {item.bestseller ? (
            <span className="label-caps mt-0.5 shrink-0 rounded-pill bg-linen px-2.5 py-1 text-[0.65rem] text-cocoa">
              Bestseller
            </span>
          ) : null}
        </div>

        {item.d ? (
          <p className="mt-2.5 text-sm leading-relaxed text-cocoa">
            {item.d}
          </p>
        ) : null}

        {item.allergen ? (
          <p className="mt-2 text-xs text-cocoa/80">{item.allergen}</p>
        ) : null}

        <div className="mt-4 flex flex-1 items-end justify-end">
          {/* price-tag — 6px radius, tnum; unpriced items show no price */}
          {typeof item.price === "number" ? (
            <span className="tnum rounded-tag bg-linen/60 px-2.5 py-1 text-sm font-semibold text-caramel-deep">
              ₹{item.price}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`Find ${item.name} on the menu`}
        className={cn(
          "flex h-full flex-1 flex-col rounded-card focus-visible:outline-offset-4",
          className
        )}
      >
        {card}
      </Link>
    );
  }
  return card;
}
