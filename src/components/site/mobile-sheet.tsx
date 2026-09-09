"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Phone, Instagram } from "lucide-react";
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
import { OpenNowBadge } from "@/components/site/open-now-badge";
import { navItems, site, links } from "@/content/site";
import { cn } from "@/lib/utils";

export function MobileSheet({ pathname }: { pathname: string }) {
  const [open, setOpen] = React.useState(false);

  return (
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
                  prefetch={false}
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
        <div className="px-6 pb-2">
          <OpenNowBadge />
        </div>
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
            {site.hours.display} · all days
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
