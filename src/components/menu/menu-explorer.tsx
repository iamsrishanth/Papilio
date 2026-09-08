"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Bike, Printer, Search, Sparkles, UtensilsCrossed, X } from "lucide-react";
import {
  menu,
  menuNote,
  signatureDishNames,
  totalItems,
  type MenuCategory,
  type MenuItem,
} from "@/content/menu";
import { VegGlyph, type DietKind } from "@/components/site/veg-glyph";
import { SteamBand } from "@/components/menu/steam-band";
import { CtaButton } from "@/components/site/cta-button";
import { ShareButton } from "@/components/site/share-button";
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

/** URL params the explorer understands (deep-linkable & shareable). */
type UrlState = { diet: Filter; signature: boolean; q: string };

const QUERY_MAX = 60;

function readUrlState(params: URLSearchParams): UrlState | null {
  const diet = params.get("diet");
  const sig = params.get("signature");
  const q = params.get("q");
  if (!diet && !sig && !q) return null;
  const known: Filter | null =
    diet === "veg" || diet === "nonveg" || diet === "egg" ? diet : null;
  return {
    diet: known ?? "all",
    signature: sig === "1" || sig === "true",
    q: q ? q.trim().slice(0, QUERY_MAX) : "",
  };
}

/** Menu item row — FSSAI glyph, name, dotted leader, verified price only. */
function MenuRow({ item, dark = false }: { item: MenuItem; dark?: boolean }) {
  return (
    <div
      className={cn(
        "group/menu rounded-[10px] px-2 py-1.5 -mx-2 transition-colors",
        dark ? "hover:bg-cream/5" : "hover:bg-linen/30"
      )}
    >
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
  const [query, setQuery] = React.useState("");
  const [signatureOnly, setSignatureOnly] = React.useState(false);
  const [active, setActive] = React.useState<string>(menu[0].id);
  const sectionEls = React.useRef<Map<string, HTMLElement>>(new Map());
  const railRef = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  // Deep links: /menu?diet=veg&signature=1&q=paneer seeds the controls.
  // Runs on mount and on client-side navigations that change the params.
  React.useEffect(() => {
    const state = readUrlState(new URLSearchParams(searchParams.toString()));
    if (!state) return;
    setFilter(state.diet);
    setSignatureOnly(state.signature);
    setQuery(state.q);
  }, [searchParams]);

  // Shareable state: keep the address bar in sync without creating
  // history entries (replaceState, not router.push). Preserves any
  // category hash (#coffee) so filtered deep links stay shareable too.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (filter !== "all") params.set("diet", filter);
    if (signatureOnly) params.set("signature", "1");
    if (query.trim()) params.set("q", query.trim().slice(0, QUERY_MAX));
    const qs = params.toString();
    const suffix = qs ? `?${qs}` : "";
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${suffix}${window.location.hash}`
    );
  }, [filter, signatureOnly, query]);

  const q = query.trim().toLowerCase();
  const signatureSet = React.useMemo(
    () => new Set<string>(signatureDishNames),
    []
  );

  const matches = (item: MenuItem) => {
    if (signatureOnly && !signatureSet.has(item.name)) return false;
    if (filter !== "all" && item.diet !== filter) return false;
    if (!q) return true;
    const haystack = `${item.name} ${item.d ?? ""} ${item.allergen ?? ""}`.toLowerCase();
    return haystack.includes(q);
  };

  // Derived once per render — 187 items, negligible cost. `idx` is the
  // ORIGINAL menu order, so section numbers (01–21) stay stable under
  // any filter combination.
  const sections = menu.map((cat, idx) => ({
    cat,
    idx,
    items: cat.items.filter(matches),
  }));
  const totalCount = sections.reduce((s, x) => s + x.items.length, 0);

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

  // Keep the active chip scrolled into view in the mobile rail
  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const chip = rail.querySelector<HTMLButtonElement>(
      `button[data-rail-id="${CSS.escape(active)}"]`
    );
    if (!chip) return;
    const target =
      chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    rail.scrollTo({ left: Math.max(0, target), behavior: reduced ? "auto" : "smooth" });
  }, [active]);

  // Press "/" anywhere outside a field to jump into search
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);
      if (e.key === "/" && !inField) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollTo = React.useCallback(
    (id: string, instant = false) => {
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
        window.scrollTo({
          top: Math.max(0, y),
          behavior: instant || reduced ? "auto" : "smooth",
        });
      });
      // Keep the category in the URL (shareable #anchor). replaceState does
      // not fire hashchange, so no loop with the listener below.
      const qs = window.location.search;
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${qs}#${id}`
      );
    },
    []
  );

  // Category anchors: /menu#coffee (deep link from other pages or the
  // address bar). Applies on mount and on hashchange. Because
  // content-visibility settles sizes lazily, the first correction can
  // still overshoot on a cold load — re-align on short timers.
  const reAlignTimers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  React.useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id || !menu.some((c) => c.id === id)) return;
      requestAnimationFrame(() => requestAnimationFrame(() => scrollTo(id)));
      for (const t of reAlignTimers.current) clearTimeout(t);
      reAlignTimers.current = [300, 700, 1400].map((delay) =>
        setTimeout(() => scrollTo(id, true), delay)
      );
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => {
      window.removeEventListener("hashchange", applyHash);
      for (const t of reAlignTimers.current) clearTimeout(t);
    };
  }, [scrollTo]);

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
        className="no-print lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pb-4"
      >
        {/* Mobile: horizontal chip rail under the header */}
        <div
          ref={railRef}
          className="sticky top-16 z-30 -mx-4 border-b border-linen/70 bg-cream/95 px-4 py-2.5 backdrop-blur-md lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
        >
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
            {sections.map(({ cat, idx, items: catItems }) => {
              const n = catItems.length;
              const empty = n === 0;
              const isActive = active === cat.id;
              return (
                <li key={cat.id} className="lg:list-none">
                  <button
                    type="button"
                    data-rail-id={cat.id}
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
                    {/* Editorial index (desktop rail only) — mirrors the
                        01–21 numbers in the section headers */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "tnum mr-2 hidden text-[0.65rem] font-semibold tracking-[0.14em] lg:inline",
                        isActive ? "text-caramel/90" : "text-cocoa/45"
                      )}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
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
        {/* Search + diet filter chips */}
        <div className="no-print mb-8 space-y-4">
          <div role="search" aria-label="Search the menu" className="relative max-w-md">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-cocoa/60"
              aria-hidden="true"
            />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${totalItems} items — try "paneer" or "coffee"`}
              aria-label="Search the menu by dish name"
              aria-keyshortcuts="/"
              className="h-12 w-full rounded-[12px] border border-linen bg-white pl-11 pr-11 text-sm text-espresso placeholder:text-cocoa/60 focus:border-caramel focus:outline-none focus:ring-2 focus:ring-caramel/25"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-pill text-cocoa/70 transition-colors hover:bg-linen/60 hover:text-caramel"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            ) : (
              <kbd
                aria-hidden="true"
                className="kbd-chip pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 sm:block"
              >
                /
              </kbd>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              role="group"
              aria-label="Filter by dietary preference"
              className="flex flex-wrap items-center gap-2"
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

            <span
              aria-hidden="true"
              className="hidden h-6 w-px bg-linen sm:block"
            />

            <button
              type="button"
              onClick={() => setSignatureOnly((v) => !v)}
              aria-pressed={signatureOnly}
              title="The four flagship dishes with verified prices"
              className={cn(
                "inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-sm font-medium transition-colors",
                signatureOnly
                  ? "border-caramel bg-linen text-espresso"
                  : "border-linen bg-ivory text-cocoa hover:border-caramel hover:text-caramel"
              )}
            >
              <Sparkles className="size-4 text-caramel" aria-hidden="true" />
              Signature picks
              <span className="tnum text-xs opacity-70">
                {signatureDishNames.length}
              </span>
            </button>

            <p
              aria-live="polite"
              className="tnum ml-1 text-sm text-cocoa/80"
            >
              {totalCount} of {totalItems} items
            </p>
          </div>
        </div>

        <div className="space-y-6 print:space-y-4">
          {totalCount === 0 ? (
            <div className="rounded-card border border-dashed border-linen bg-ivory p-10 text-center">
              <p className="font-display text-h3 font-medium text-espresso">
                Nothing matches that search
              </p>
              <p className="mt-2 text-sm text-cocoa">
                Try a shorter word — &ldquo;paneer&rdquo;, &ldquo;coffee&rdquo;,
                &ldquo;pasta&rdquo; — or clear the filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                  setSignatureOnly(false);
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-pill border border-linen bg-cream px-5 py-2.5 text-sm font-semibold text-caramel transition-colors hover:border-caramel"
              >
                <X className="size-4" aria-hidden="true" />
                Clear search &amp; filters
              </button>
            </div>
          ) : null}

          {sections.map(({ cat, idx, items }) => {
            const dark = cat.id === "coffee"; // espresso coffee band w/ steam
            if (items.length === 0) return null;
            return (
              <section
                key={cat.id}
                id={cat.id}
                ref={registerSection(cat.id)}
                aria-labelledby={`${cat.id}-heading`}
                className={cn(
                  "cv-auto scroll-mt-28 rounded-card p-6 sm:p-8 print:shadow-none",
                  dark
                    ? "relative overflow-hidden bg-surface-espresso shadow-lift print:bg-white"
                    : "bg-ivory shadow-card print:bg-white print:border print:border-linen"
                )}
              >
                {dark ? (
                  <div className="print:hidden">
                    <SteamBand />
                  </div>
                ) : null}
                <div className="relative">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-3">
                      {/* Editorial section number — stable across filters */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "tnum text-[0.7rem] font-semibold tracking-[0.14em]",
                          dark ? "text-butter/70" : "text-caramel/80"
                        )}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h2
                        id={`${cat.id}-heading`}
                        className={cn(
                          "font-display text-h3 font-medium print:text-espresso",
                          dark ? "text-butter" : "text-espresso"
                        )}
                      >
                        {cat.label}
                      </h2>
                    </div>
                    <span
                      className={cn(
                        "label-caps print:text-cocoa",
                        dark ? "text-cream/60" : "text-cocoa/70"
                      )}
                    >
                      {items.length} item{items.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  {cat.note ? (
                    <p
                      className={cn(
                        "mt-1 text-xs print:text-cocoa",
                        dark ? "text-cream/55" : "text-cocoa/70"
                      )}
                    >
                      {cat.note}
                    </p>
                  ) : null}

                  <div
                    className={cn(
                      "mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 print:grid-cols-2 print:gap-x-6",
                      dark ? "text-cream print:text-espresso" : ""
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
        <div className="mt-10 rounded-card bg-linen/40 p-6 sm:p-8 print:hidden">
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
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-pill px-4 py-3 text-sm font-semibold text-caramel underline-offset-4 hover:underline"
            >
              <Printer className="size-4" aria-hidden="true" />
              Print the menu
            </button>
            <ShareButton
              path="/menu"
              title="The Papilio menu"
              text="187 items — from focaccia sandwiches to filter coffee and counter desserts, at Papilio, Hanamkonda."
              label="Share the menu"
              className="no-print"
            />
            <span className="text-sm text-cocoa/80">
              {site.costForTwo.delivery}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
