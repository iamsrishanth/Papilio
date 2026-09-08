import type { Metadata } from "next";
import { MenuExplorer } from "@/components/menu/menu-explorer";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { VegGlyph } from "@/components/site/veg-glyph";
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
    images: ["/images/og-cover-lockup.png"],
  },
};

export default function MenuPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
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

      <MenuExplorer />

      <p className="mt-10 text-center text-sm text-cocoa/70">
        {site.costForTwo.dineIn} · {site.costForTwo.delivery}
      </p>
    </div>
  );
}
