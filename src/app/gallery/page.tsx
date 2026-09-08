import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal } from "@/components/site/reveal";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { galleryPhotos } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery — inside Papilio",
  description:
    "Inside Papilio, Hanamkonda: the café room, the bar, the patisserie counter and the plates in between.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — inside Papilio",
    description:
      "The room, the bar, the counter and the plates in between — photos from our café in Excise Colony, Hanamkonda.",
    url: "/gallery",
    images: [
      {
        url: "/images/og-gallery.png",
        width: 1344,
        height: 768,
        alt: "The warm Papilio café interior with hanging lamps, wooden tables and plants",
      },
    ],
  },
};

export default function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-12 pb-20 sm:px-6 lg:px-8 lg:pt-16 lg:pb-28">
      <JsonLd data={breadcrumbLd([{ name: "Gallery", path: "/gallery" }])} />
      <header className="mb-10 max-w-2xl lg:mb-14">
        <Reveal>
          <SectionEyebrow>Gallery</SectionEyebrow>
          <h1 className="font-display mt-5 text-[2.5rem] font-semibold leading-tight text-espresso sm:text-h1">
            Gallery
          </h1>
          <p className="mt-4 text-base leading-relaxed text-cocoa">
            The room, the bar, the counter and the plates in between — moments
            from our café in Excise Colony, Hanamkonda. Select any photo to see
            it larger; arrow keys move through the set.
          </p>
        </Reveal>
      </header>

      {/* Suspense boundary: GalleryGrid reads ?tag= from the URL (filter
          deep links) — the fallback mirrors the masonry shape so there is
          no layout shift when the client component streams in. */}
      <Suspense
        fallback={
          <div aria-hidden="true" className="columns-2 gap-6 sm:columns-3 lg:columns-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="mb-6 break-inside-avoid rounded-card bg-linen/30 shadow-card"
                style={{ aspectRatio: i % 3 === 0 ? "4/5" : "3/4" }}
              />
            ))}
          </div>
        }
      >
        <GalleryGrid photos={galleryPhotos} />
      </Suspense>
    </div>
  );
}
