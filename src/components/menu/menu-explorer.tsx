"use client";

import * as React from "react";
import { Bike, UtensilsCrossed } from "lucide-react";
import {
  menu,
  menuNote,
  type MenuCategory,
  type MenuItem,
} from "@/content/menu";
import { VegGlyph, type DietKind } from "@/components/site/veg-glyph";
import { SteamBand } from "@/components/menu/steam-band";
import { CtaButton } from "@/components/site/cta-button";
import { links, site } from "@/content/site";
import { cn } from "@/lib/utils";

type Filter = "all" | DietKind;

const filterLabels: Record<Filter, string> = {
  all: "All",
  veg: "Veg",
  nonveg: "Non-veg",
  egg: "Egg",
};

function countItems(diet: Filter): number {
  if (diet === "all") return menu.reduce((s, c) => s + c.items.length, 0);
  return menu.reduce(
    (s, c) => s + c.items.filter((i) => i.diet === diet).length,
    0
  );
}

const counts: Record<Filter, number> = {
  all: countItems("all"),
  veg: countItems("veg"),
  nonveg: countItems("nonveg"),
  egg: countItems("egg"),
};

const filters: Filter[] = ["all", "veg", "nonveg", "egg"];

/** Menu item row — FSSAI glyph, name, dotted leader, verified price only. */
function MenuRow({ item, dark = false }: { item: MenuItem; dark?: boolean }) {
  return (
    <div className="group/menu">
      <div className="flex items-baseline gap-2.5">
        {dark ? (
          /* Glyph marker stays on an ivory chip for recognisability on espresso */
          <span className="mt-0.5 inline-flex shrink-0 rounded-[4px] bg-ivory p-[2px]">
            <VegGlyph kind={item.diet} />
          </span>
        ) : (
          <VegGlyph kind={item.diet} className="mt-1" />
        )}
        <h3
          className={cn(
            "font-display text-[1.05rem] font-medium leading-snug",
            dark ? "text-cream" : "text-espresso"
          )}
        >
          {item.name}
        </h3>
        {item.bestseller ? (
          <span
            className={cn(
              "label-caps hidden shrink-0 rounded-pill px-2 py-0.5 text-[0.6rem] sm:inline-block",
              dark ? "bg-butter/15 text-butter" : "bg-linen text-cocoa"
            )}
          >
            Bestseller
          </span>
        ) : null}
        <span
          aria-hidden="true"
          className={cn(
            "mx-1 hidden flex-1 -translate-y-1 border-b border-dotted sm:block",
            dark ? "border-cream/25" : "border-linen"
          )}
        />
        {typeof item.price === "number" ? (
          <span
            className={cn(
              "tnum shrink-0 text-sm font-semibold",
              dark ? "text-butter" : "text-caramel-deep"
            )}
          >
            ₹{item.price}
          </span>
        ) : null}
      </div>
      {item.d ? (
        <p
          className={cn(
            "mt-1 pl-[26px] text-sm leading-relaxed",
            dark ? "text-cream/65" : "text-cocoa/90"
          )}
        >
          {item.d}
          {item.allergen ? (
            <span className="ml-1.5 text-xs opacity-75">
              ({item.allergen})
            </span>
          ) : null}
        </p>
      ) : item.allergen ? (
        <p
          className={cn(
            "mt-1 pl-[26px] text-sm",
            dark ? "text-cream/65" : "text-cocoa/90"
          )}
        >
          {item.allergen}
        </p>
      ) : null}
    </div>
  );
}

export function MenuExplorer() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [active, setActive] = React.useState<string>(menu[0].id);
  const sectionEls = React.useRef<Map<string, HTMLElement>>(new Map());

  const matches = (item: MenuItem) =>
    filter === "all" || item.diet === filter;

  const visibleCount = (cat: MenuCategory) =>
    cat.items.filter(matches).length;

  // Scroll-spy
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        }
      },
      { rootMargin: "-22% 0px -70% 0px" }
    );
    for (const el of sectionEls.current.values()) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollTo = React.useCallback((id: string) => {
    const el = sectionEls.current.get(id);
    if (!el || el.offsetParent === null) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    // Phase 1: instant jump — forces content-visibility sections near the
    // target to render at their true size (skipped sections report
    // placeholder intrinsic sizes, which would make a direct smooth
    // scroll overshoot).
    el.scrollIntoView({ behavior: "auto", block: "start" });
    // Phase 2: read the now-stable position and glide to the exact offset.
    requestAnimationFrame(() => {
      const y =
        el.getBoundingClientRect().top + window.scrollY - 112; // sticky header + rail
      window.scrollTo({ top: Math.max(0, y), behavior: reduced ? "auto" : "smooth" });
    });
  }, []);

  const registerSection = React.useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) sectionEls.current.set(id, el);
      else sectionEls.current.delete(id);
    },
    []
  );

  return (
    <div className="lg:grid lg:grid-cols-[230px_1fr] lg:gap-12">
      {/* ---------------------------------------------- Category rail */}
      <nav
        aria-label="Menu categories"
        className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pb-4"
      >
        {/* Mobile: horizontal chip rail under the header */}
        <div className="sticky top-16 z-30 -mx-4 border-b border-linen/70 bg-cream/95 px-4 py-2.5 backdrop-blur-md lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
            {menu.map((cat) => {
              const n = visibleCount(cat);
              const empty = n === 0;
              const isActive = active === cat.id;
              return (
                <li key={cat.id} className="lg:list-none">
                  <button
                    type="button"
                    onClick={() => scrollTo(cat.id)}
                    aria-current={isActive ? "true" : undefined}
                    disabled={empty}
                    className={cn(
                      // mobile chip / desktop list row
                      "shrink-0 whitespace-nowrap rounded-pill px-3.5 py-2 text-sm transition-all lg:rounded-[10px] lg:border-l-2 lg:px-3 lg:py-1.5 lg:text-[0.8rem] lg:whitespace-normal",
                      empty && "opacity-35 lg:pointer-events-none",
                      isActive
                        ? "bg-espresso text-butter lg:border-caramel lg:bg-transparent lg:font-semibold lg:text-caramel"
                        : "bg-ivory text-cocoa hover:border-caramel/50 hover:text-caramel lg:border-transparent lg:bg-transparent lg:font-normal"
                    )}
                  >
                    {cat.label}
                    <span className="tnum ml-1.5 opacity-60">{n}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* ---------------------------------------------- Sections */}
      <div>
        {/* Diet filter chips */}
        <div
          role="group"
          aria-label="Filter by dietary preference"
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          {filters.map((f) => {
            const isOn = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isOn}
                className={cn(
                  "inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-sm font-medium transition-colors",
                  isOn
                    ? "border-espresso bg-espresso text-cream"
                    : "border-linen bg-ivory text-cocoa hover:border-caramel hover:text-caramel"
                )}
              >
                {f !== "all" ? <VegGlyph kind={f} /> : null}
                {filterLabels[f]}
                <span className="tnum text-xs opacity-70">{counts[f]}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-6">
          {menu.map((cat) => {
            const items = cat.items.filter(matches);
            const dark = cat.id === "coffee"; // espresso coffee band w/ steam
            if (items.length === 0) return null;
            return (
              <section
                key={cat.id}
                id={cat.id}
                ref={registerSection(cat.id)}
                aria-labelledby={`${cat.id}-heading`}
                className={cn(
                  "cv-auto scroll-mt-28 rounded-card p-6 sm:p-8",
                  dark
                    ? "relative overflow-hidden bg-surface-espresso shadow-lift"
                    : "bg-ivory shadow-card"
                )}
              >
                {dark ? <SteamBand /> : null}
                <div className="relative">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2
                      id={`${cat.id}-heading`}
                      className={cn(
                        "font-display text-h3 font-medium",
                        dark ? "text-butter" : "text-espresso"
                      )}
                    >
                      {cat.label}
                    </h2>
                    <span
                      className={cn(
                        "label-caps",
                        dark ? "text-cream/60" : "text-cocoa/70"
                      )}
                    >
                      {items.length} item{items.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  {cat.note ? (
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        dark ? "text-cream/55" : "text-cocoa/70"
                      )}
                    >
                      {cat.note}
                    </p>
                  ) : null}

                  <div
                    className={cn(
                      "mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 xl:grid-cols-3",
                      dark ? "text-cream" : ""
                    )}
                  >
                    {items.map((item) => (
                      <MenuRow key={item.name} item={item} dark={dark} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Note + platform deep links */}
        <div className="mt-10 rounded-card bg-linen/40 p-6 sm:p-8">
          <p className="flex items-start gap-2.5 text-sm leading-relaxed text-cocoa">
            <UtensilsCrossed
              className="mt-0.5 size-4 shrink-0 text-caramel"
              aria-hidden="true"
            />
            {menuNote} FSSAI markers follow the standard convention —
            green circle (veg), brown triangle (non-veg), brown circle
            (egg).
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <CtaButton variant="primary" href={links.swiggy}>
              <Bike className="size-4" aria-hidden="true" />
              Order on Swiggy
            </CtaButton>
            <CtaButton variant="secondary" href={links.zomato}>
              Order on Zomato
            </CtaButton>
            <span className="text-sm text-cocoa/80">
              {site.costForTwo.delivery}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
