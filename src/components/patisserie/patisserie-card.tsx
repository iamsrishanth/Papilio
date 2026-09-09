import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { VegGlyph } from "@/components/site/veg-glyph";
import type { MenuItem } from "@/content/menu";
import { cn } from "@/lib/utils";

export interface PatisserieCardProps {
  item: MenuItem;
  image: { src: string; alt: string };
  description: string;
  isCake: boolean;
  priority?: boolean;
  className?: string;
}

export function PatisserieCard({
  item,
  image,
  description,
  isCake,
  priority = false,
  className,
}: PatisserieCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card bg-ivory shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:transform-none",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-linen/40">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:transform-none motion-reduce:transition-none"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <VegGlyph kind={item.diet} className="mt-1 shrink-0" />
            <h3 className="font-display text-[1.2rem] font-medium leading-snug text-espresso lg:text-h3">
              {item.name}
            </h3>
          </div>
          {item.bestseller ? (
            <span className="label-caps mt-0.5 shrink-0 rounded-pill bg-linen px-2.5 py-1 text-[0.65rem] text-cocoa">
              Bestseller
            </span>
          ) : null}
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-cocoa">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-linen/60 pt-4">
          <span className="label-caps rounded-pill bg-linen/60 px-2.5 py-1 text-[0.68rem] font-medium text-cocoa/90">
            {isCake ? "Whole Cake" : "Counter Dessert"}
          </span>

          {isCake ? (
            <Link
              href={`/patisserie?cake=${encodeURIComponent(item.name)}#cake-inquiry`}
              aria-label={`Ask about ${item.name} — opens the cake inquiry planner`}
              className="link-underline inline-flex min-h-8 items-center gap-1.5 rounded-pill text-xs font-semibold text-caramel transition-colors hover:text-caramel-deep focus-visible:outline-offset-2"
            >
              <MessageCircle className="size-3.5 shrink-0" aria-hidden="true" />
              Ask about this cake
            </Link>
          ) : (
            <Link
              href={`/menu?q=${encodeURIComponent(item.name)}`}
              aria-label={`Find ${item.name} on the menu`}
              className="group/link link-underline inline-flex min-h-8 items-center gap-1 text-xs font-semibold text-caramel transition-colors hover:text-caramel-deep focus-visible:outline-offset-2"
            >
              Find on menu
              <ArrowRight
                className="size-3.5 shrink-0 transition-transform group-hover/link:translate-x-0.5 motion-reduce:group-hover/link:transform-none"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
