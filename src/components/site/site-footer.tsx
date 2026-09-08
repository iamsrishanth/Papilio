import Link from "next/link";
import { Instagram, Phone, MapPin, Clock, Bike } from "lucide-react";
import { ButterflyGlyph } from "@/components/site/butterfly-glyph";
import { navItems, site, links } from "@/content/site";

/**
 * footer-dark — espresso, NAP block, hours, FSSAI, platform links.
 */
export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-espresso text-cream">
      {/* Faint butter butterfly watermark — decorative only */}
      <ButterflyGlyph
        variant="flat"
        decorative
        className="pointer-events-none absolute -bottom-12 -right-10 size-64 select-none opacity-[0.05]"
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <ButterflyGlyph variant="flat" className="size-9" />
              <span className="wordmark text-2xl text-cream">Papilio</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              {site.tagline} in Excise Colony, Hanamkonda. Est.{" "}
              {site.established} — a patisserie-led café from Radha Suvidha
              &amp; Chef Siddhartha Reddy.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-pill border border-cream/20 px-4 py-2 text-sm text-cream/90 transition-colors hover:border-butter hover:text-butter"
              aria-label="Papilio on Instagram"
            >
              <Instagram className="size-4" aria-hidden="true" />
              {site.instagramHandle}
            </a>
          </div>

          {/* NAP */}
          <div className="lg:col-span-3">
            <h2 className="label-caps text-butter">Find us</h2>
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-cream/80">
              <p className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-butter/70" aria-hidden="true" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </p>
              <p className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-butter/70" aria-hidden="true" />
                <a
                  href={links.phone}
                  className="rounded-sm hover:text-butter"
                >
                  {site.phoneDisplay}
                </a>
              </p>
              <p className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-butter/70" aria-hidden="true" />
                <span>
                  {site.hours.display} · {site.hours.days}
                </span>
              </p>
            </address>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h2 className="label-caps text-butter">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/80 transition-colors hover:text-butter"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Order */}
          <div className="lg:col-span-3">
            <h2 className="label-caps text-butter">Order &amp; plan</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={links.swiggy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cream/80 transition-colors hover:text-butter"
                >
                  <Bike className="size-4" aria-hidden="true" />
                  Order on Swiggy
                </a>
              </li>
              <li>
                <a
                  href={links.zomato}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 transition-colors hover:text-butter"
                >
                  Order on Zomato
                </a>
              </li>
              <li>
                <a
                  href={links.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 transition-colors hover:text-butter"
                >
                  Get directions
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-cream/60">
              {site.costForTwo.dineIn} · {site.costForTwo.delivery}
            </p>
          </div>
        </div>

        {/* Trust line + small print */}
        <div className="mt-12 flex flex-col gap-3 border-t border-cream/15 pt-6 text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.fssai}</p>
          <p>
            © {new Date().getFullYear()} Papilio · {site.tagline},{" "}
            Hanamkonda, Warangal
          </p>
        </div>
      </div>
    </footer>
  );
}
