"use client";

import * as React from "react";
import Image from "next/image";
import {
  Armchair,
  CakeSlice,
  Coffee,
  Croissant,
  LayoutGrid,
} from "lucide-react";
import type { GalleryPhoto, GalleryTag } from "@/content/gallery";
import { galleryTagLabels } from "@/content/gallery";
import { PhotoLightbox } from "@/components/gallery/photo-lightbox";
import { cn } from "@/lib/utils";

/**
 * GalleryGrid — CSS-columns masonry with a CSS-only hover parallax
 * (scale 1.02 + slight lift, disabled under prefers-reduced-motion).
 * Subject filter chips narrow the set (counts derive from the data);
 * the lightbox navigates within the filtered set. Clicking a photo
 * opens the PhotoLightbox; state lives here so the page itself stays
 * a server component.
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
      </div>

      {/* ---------------------------------------------- Masonry */}
      <div className={cn("columns-2 gap-6 sm:columns-3 lg:columns-4", className)}>
        {filtered.map((photo, index) => (
          <figure key={photo.src} className="mb-6 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View larger: ${photo.caption}`}
              className="group block w-full overflow-hidden rounded-card bg-linen/40 shadow-card transition-shadow duration-300 hover:shadow-lift motion-reduce:transition-none"
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
      />
    </>
  );
}
