"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Instagram, Bike } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ButterflyGlyph } from "@/components/site/butterfly-glyph";
import { CtaButton } from "@/components/site/cta-button";
import { navItems, site, links } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-linen/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Wordmark lockup */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 rounded-pill py-1 pr-3"
          aria-label="Papilio — home"
        >
          <ButterflyGlyph
            variant="line"
            className="size-7 transition-transform duration-500 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
          />
          <span className="wordmark text-xl leading-none text-espresso">
            Papilio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-pill px-3.5 py-2 text-sm transition-colors after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-caramel after:transition-transform after:duration-300 after:content-['']",
                  active
                    ? "text-espresso after:scale-x-100"
                    : "text-cocoa after:scale-x-0 hover:text-caramel hover:after:scale-x-100 motion-reduce:after:transition-none"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA (secondary pill — the per-view primary lives in page content) */}
        <div className="hidden md:block">
          <CtaButton variant="secondary" href={links.swiggy} className="px-5 py-2.5">
            <Bike className="size-4" aria-hidden="true" />
            Order on Swiggy
          </CtaButton>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="inline-flex size-11 items-center justify-center rounded-pill text-espresso hover:bg-linen/60 md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] border-linen bg-cream p-0"
          >
            <SheetHeader className="border-b border-linen/70 px-6 pt-6 pb-4 text-left">
              <SheetTitle>
                <span className="inline-flex items-center gap-2.5">
                  <ButterflyGlyph variant="line" className="size-7" />
                  <span className="wordmark text-lg text-espresso">Papilio</span>
                </span>
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "font-display text-h3 rounded-pill px-4 py-3 transition-colors",
                        active
                          ? "bg-linen/70 text-espresso"
                          : "text-cocoa hover:bg-linen/40 hover:text-caramel"
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
            <div className="mt-auto space-y-3 border-t border-linen/70 px-6 py-6">
              <SheetClose asChild>
                <CtaButton
                  variant="primary"
                  href={links.swiggy}
                  className="w-full"
                >
                  Order on Swiggy
                </CtaButton>
              </SheetClose>
              <div className="flex items-center justify-between gap-2 text-sm text-cocoa">
                <a
                  href={links.phone}
                  className="inline-flex items-center gap-1.5 rounded-pill px-2 py-1.5 hover:text-caramel"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-pill px-2 py-1.5 hover:text-caramel"
                  aria-label="Papilio on Instagram"
                >
                  <Instagram className="size-4" aria-hidden="true" />
                  {site.instagramHandle}
                </a>
              </div>
              <p className="label-caps text-cocoa/70">
                {site.tagline} · Open daily {site.hours.display}
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
