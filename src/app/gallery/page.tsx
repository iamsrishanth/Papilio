import type { Metadata } from "next";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
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
    images: ["/images/og-cover.png"],
  },
};

export default function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-12 pb-20 sm:px-6 lg:px-8 lg:pt-16 lg:pb-28">
      <header className="mb-10 max-w-2xl lg:mb-14">
        <SectionEyebrow>Gallery</SectionEyebrow>
        <h1 className="font-display mt-5 text-[2.5rem] font-semibold leading-tight text-espresso sm:text-h1">
          Gallery
        </h1>
        <p className="mt-4 text-base leading-relaxed text-cocoa">
          The room, the bar, the counter and the plates in between — moments
          from our café in Excise Colony, Hanamkonda. Select any photo to see
          it larger; arrow keys move through the set.
        </p>
      </header>

      <GalleryGrid photos={galleryPhotos} />
    </div>
  );
}
