import { Clock, Phone } from "lucide-react";
import { site, links } from "@/content/site";
import { OpenNowBadge } from "@/components/site/open-now-badge";
import { cn } from "@/lib/utils";

/**
 * hours-card — verified hours with the festival-variation note.
 */
export function HoursCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-card bg-ivory p-6 shadow-card",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <Clock className="size-5 text-caramel" aria-hidden="true" />
        <h2 className="label-caps text-cocoa">Hours</h2>
      </div>
      <p className="font-display mt-4 text-h3 font-medium text-espresso">
        {site.hours.display}
      </p>
      <p className="mt-1 text-sm text-cocoa">{site.hours.days}</p>
      <OpenNowBadge variant="line" className="mt-3" />
      <p className="mt-4 text-sm leading-relaxed text-cocoa/80">
        {site.hours.note}
      </p>
      <a
        href={links.phone}
        className="mt-5 inline-flex items-center gap-2 rounded-pill border border-linen bg-cream px-4 py-2.5 text-sm text-espresso transition-colors hover:border-caramel hover:text-caramel"
      >
        <Phone className="size-4" aria-hidden="true" />
        Call to confirm — {site.phoneDisplay}
      </a>
    </div>
  );
}
