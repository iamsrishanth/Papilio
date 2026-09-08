"use client";

import * as React from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/content/gallery";
import { PhotoLightbox } from "@/components/gallery/photo-lightbox";
import { cn } from "@/lib/utils";

/**
 * GalleryGrid — CSS-columns masonry with a CSS-only hover parallax
 * (scale 1.02 + slight lift, disabled under prefers-reduced-motion).
 * Clicking a photo opens the PhotoLightbox; state lives here so the
 * page itself stays a server component.
 */
export function GalleryGrid({
  photos,
  className,
}: {
  photos: GalleryPhoto[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <>
      <div className={cn("columns-2 gap-6 sm:columns-3 lg:columns-4", className)}>
        {photos.map((photo, index) => (
          <figure key={photo.src} className="mb-6 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View larger: ${photo.caption}`}
              className="group block w-full overflow-hidden rounded-card shadow-card transition-shadow duration-300 hover:shadow-lift motion-reduce:transition-none"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                priority={index < 2}
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
        photos={photos}
        index={openIndex}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}
