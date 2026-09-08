import { links } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * MapEmbed — Google Maps iframe for the Excise Colony location.
 * Lazy-loaded, wrapped in a rounded-card frame with a linen hairline;
 * the iframe fills its aspect-ratio container.
 */
export function MapEmbed({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-linen bg-ivory shadow-card",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full bg-linen/40">
        <iframe
          src={links.mapsEmbed}
          title="Papilio on Google Maps — Excise Colony, Hanamkonda"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
