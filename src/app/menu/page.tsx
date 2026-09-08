import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuExplorer } from "@/components/menu/menu-explorer";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { VegGlyph } from "@/components/site/veg-glyph";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { site } from "@/content/site";
import { menu, totalCategories, totalItems } from "@/content/menu";

export const metadata: Metadata = {
  title: "Menu — 21 sections, 187 items",
  description:
    "The full Papilio menu in Hanamkonda: salads, wraps, sandwiches, burgers, rice bowls, pizza, pasta, coffee, shakes, kombuchas and 28 counter desserts. FSSAI veg/non-veg markers on every item.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "The Papilio menu — 21 sections, 187 items",
    description:
      "From focaccia sandwiches to filter coffee and counter desserts — the full menu of our Hanamkonda patisserie-café.",
    url: "/menu",
    images: [
      {
        url: "/images/og-menu.png",
        width: 1344,
        height: 768,
        alt: "Overhead spread of Papilio café dishes — salad, wrap, fries and burger on cream linen",
      },
    ],
  },
};

export default function MenuPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <JsonLd data={breadcrumbLd([{ name: "Menu", path: "/menu" }])} />

      {/* Print masthead — visible only on the printed sheet, so a paper
          menu carries the café identity (header/footer are print:hidden). */}
      <div className="hidden print:mb-8 print:block print:border-b print:border-linen print:pb-6 print:text-center">
        <p className="wordmark text-2xl text-espresso">PAPILIO</p>
        <p className="mt-1 text-xs text-cocoa">
          Patisserie | Café — {site.address.line1}, {site.address.line2}
        </p>
        <p className="tnum mt-0.5 text-xs text-cocoa">
          {site.phoneDisplay} · Open all seven days, {site.hours.display}
        </p>
        <p className="mt-0.5 text-[0.65rem] text-cocoa/80">{site.fssai}</p>
      </div>
      <header className="mb-10 max-w-2xl">
        <SectionEyebrow>The menu</SectionEyebrow>
        <h1 className="font-display mt-5 text-[2.5rem] font-semibold leading-tight text-espresso sm:text-h1">
          Menu
        </h1>
        <p className="mt-4 text-base leading-relaxed text-cocoa">
          {totalCategories} sections, {totalItems} items — from focaccia
          sandwiches and porcini mushrooms to filter coffee and counter
          desserts. 173 of them are vegetarian.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-cocoa/80">
          <span className="inline-flex items-center gap-1.5">
            <VegGlyph kind="veg" /> Vegetarian
          </span>
          <span className="inline-flex items-center gap-1.5">
            <VegGlyph kind="nonveg" /> Non-vegetarian
          </span>
          <span className="inline-flex items-center gap-1.5">
            <VegGlyph kind="egg" /> Contains egg
          </span>
        </div>
      </header>

      {/* Suspense boundary: MenuExplorer reads the URL for deep-linkable
          filters (/menu?diet=veg&signature=1&q=…) via useSearchParams. */}
      <Suspense
        fallback={
          <div className="no-print space-y-6" aria-hidden="true">
            <div className="h-12 max-w-md rounded-[12px] border border-linen bg-white/60" />
            {menu.map((c) => (
              <div
                key={c.id}
                className="h-40 rounded-card bg-ivory/70 shadow-card"
              />
            ))}
          </div>
        }
      >
        <MenuExplorer />
      </Suspense>

      <p className="mt-10 text-center text-sm text-cocoa/70">
        {site.costForTwo.dineIn} · {site.costForTwo.delivery}
      </p>
    </div>
  );
}
