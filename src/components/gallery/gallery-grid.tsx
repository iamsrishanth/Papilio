"use client";

import * as React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Armchair,
  CakeSlice,
  Coffee,
  Croissant,
  LayoutGrid,
  Maximize2,
} from "lucide-react";
import type { GalleryPhoto, GalleryTag } from "@/content/gallery";
import { galleryTagLabels } from "@/content/gallery";
import { PhotoLightbox } from "@/components/gallery/photo-lightbox";
import { cn } from "@/lib/utils";

/**
 * GalleryGrid — CSS-columns masonry with a CSS-only hover parallax
 * (scale 1.02 + slight lift, disabled under prefers-reduced-motion).
 * Subject filter chips narrow the set (counts derive from the data);
 * the lightbox navigates within the filtered set. Both the tag AND the
 * open photo are deep-linkable (/gallery?tag=patisserie&photo=2) and
 * synced to the address bar without history entries, mirroring the
 * menu's filter deep links. Keyboard "g" opens the lightbox (the
 * gallery sibling of the menu's "/" search focus). Clicking a photo
 * opens the PhotoLightbox; state lives here so the page itself stays a
 * server component.
 */

type TagFilter = "all" | GalleryTag;

const tagIcons: Record<TagFilter, React.ElementType> = {
  all: LayoutGrid,
  room: Armchair,
  coffee: Coffee,
  patisserie: CakeSlice,
  oven: Croissant,
};

export function GalleryGrid({
  photos,
  className,
}: {
  photos: GalleryPhoto[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [tag, setTag] = React.useState<TagFilter>("all");
  // Guards the URL-sync effect: it must not run with pre-seed state on
  // mount (a stripped "all/null" write races the router reading the
  // deep-link params, then the seed would re-read the STRIPPED URL and
  // undo itself). Only interaction-driven changes sync to the URL.
  const [seeded, setSeeded] = React.useState(false);
  const searchParams = useSearchParams();

  // Deep link: /gallery?tag=patisserie seeds the filter; ?photo=<n> also
  // opens the lightbox on photo n of that filtered set (indexes are
  // relative to the set the tag selects). STICKY by design: absent
  // params never reset state, so late router re-reads (hydration
  // reconcile, effect re-runs with an already-synced URL) can't undo a
  // seeded or interaction-set value; present-but-invalid values are
  // still corrected (unknown tag → All, out-of-range photo → closed).
  React.useEffect(() => {
    const t = searchParams.get("tag");
    let nextTag: TagFilter | null = null;
    if (t !== null) {
      const known = galleryTagLabels.some(({ id }) => id === t);
      nextTag = known ? (t as TagFilter) : "all";
      setTag(nextTag);
    }

    const raw = searchParams.get("photo");
    if (raw !== null) {
      const effective: TagFilter = nextTag ?? tag;
      const count =
        effective === "all"
          ? photos.length
          : photos.filter((p) => p.tags.includes(effective)).length;
      const n = Number.parseInt(raw, 10);
      setOpenIndex(Number.isInteger(n) && n >= 0 && n < count ? n : null);
    }

    setSeeded(true);
  }, [searchParams, photos, tag]);

  // Shareable state: keep the address bar in sync (tag + open photo —
  // they compose: ?tag=patisserie&photo=2) without creating history
  // entries (replaceState, not router.push). Skipped until the deep-link
  // seed has committed — see the `seeded` note above.
  React.useEffect(() => {
    if (!seeded || typeof window === "undefined") return;
    const params: string[] = [];
    if (tag !== "all") params.push(`tag=${tag}`);
    if (openIndex !== null) params.push(`photo=${openIndex}`);
    const qs = params.length > 0 ? `?${params.join("&")}` : "";
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${qs}${window.location.hash}`
    );
  }, [seeded, tag, openIndex]);

  const filtered =
    tag === "all" ? photos : photos.filter((p) => p.tags.includes(tag));
  const total = photos.length;

  // Derived per render — 11 photos, negligible cost (and the React
  // Compiler owns memoization).
  const tagCounts: Record<TagFilter, number> = {
    all: total,
    room: 0,
    coffee: 0,
    patisserie: 0,
    oven: 0,
  };
  for (const p of photos) {
    for (const t of p.tags) tagCounts[t] += 1;
  }

  const chips: { id: TagFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...galleryTagLabels,
  ];

  // Keyboard "g" opens the lightbox on the first photo of the current
  // filter — the gallery sibling of the menu's "/" search focus (hint
  // chip rendered beside the filters). Skips modifier combos and any
  // context where the keystroke is text (inputs, textareas, selects,
  // contenteditable), and does nothing while the dialog is open.
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "g" && event.key !== "G") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const el = document.activeElement;
      if (
        el instanceof HTMLElement &&
        (el.isContentEditable ||
          el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT")
      ) {
        return;
      }
      if (openIndex !== null || filtered.length === 0) return;
      event.preventDefault();
      setOpenIndex(0);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, filtered.length]);

  // Canonical share URL for the currently open photo (composes with
  // the active tag, e.g. /gallery?tag=patisserie&photo=2) — handed to
  // the lightbox's "Copy link" action. Absolute, so the copied link is
  // paste-ready in chats. SSR renders a closed lightbox, so this is
  // only computed client-side where a photo is open.
  const shareUrl =
    openIndex !== null
      ? `${typeof window === "undefined" ? "http://localhost:3000" : window.location.origin}${window.location.pathname}${tag === "all" ? "?" : `?tag=${tag}&`}photo=${openIndex}`
      : null;

  return (
    <>
      {/* ---------------------------------------------- Subject filter */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="Filter photos by subject"
          className="flex flex-wrap items-center gap-2"
        >
          {chips.map(({ id, label }) => {
            const isOn = tag === id;
            const Icon = tagIcons[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTag(id)}
                aria-pressed={isOn}
                className={cn(
                  "inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-sm font-medium transition-colors",
                  isOn
                    ? "border-espresso bg-espresso text-cream"
                    : "border-linen bg-ivory text-cocoa hover:border-caramel hover:text-caramel"
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
                <span className="tnum text-xs opacity-70">{tagCounts[id]}</span>
              </button>
            );
          })}
        </div>

          <p aria-live="polite" className="tnum ml-1 text-sm text-cocoa/80">
            {filtered.length} of {total} photos
          </p>

          {/* Keyboard affordance — mirrors the menu search's "/" hint. */}
          <p className="hidden items-center gap-1.5 text-xs text-cocoa/60 sm:flex">
            Press
            <kbd className="kbd-chip" aria-hidden="true">
              G
            </kbd>
            to open the lightbox
          </p>
        </div>

        {total > 0 && tag !== "all" ? (
          <p className="sr-only" aria-live="polite">
            Filtered to {galleryTagLabels.find(({ id }) => id === tag)?.label}{" "}
            — {filtered.length} photos. The address bar link shares this view.
          </p>
        ) : null}

      {/* ---------------------------------------------- Masonry */}
      <div className={cn("columns-2 gap-6 sm:columns-3 lg:columns-4", className)}>
        {filtered.map((photo, index) => (
          <figure key={photo.src} className="mb-6 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View larger: ${photo.caption}`}
              className="group relative block w-full overflow-hidden rounded-card bg-linen/40 shadow-card transition-shadow duration-300 hover:shadow-lift motion-reduce:transition-none"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                priority={index < 2 && tag === "all"}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full rounded-card object-cover transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
              />
              {/* Expand affordance — signals that the photo opens the
                  lightbox. Pointer-events-none so the click stays on the
                  photo; hidden on touch (no hover), where the whole
                  figure is a direct tap target anyway. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-pill bg-cream/90 text-espresso opacity-0 shadow-card backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
              >
                <Maximize2 className="size-4" />
              </span>
            </button>
            <figcaption className="mt-2.5 text-sm leading-relaxed text-cocoa">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <PhotoLightbox
        photos={filtered}
        index={openIndex}
        onIndexChange={setOpenIndex}
        shareUrl={shareUrl}
      />
    </>
  );
}
