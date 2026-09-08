/**
 * Route-level skeleton for client-side navigations to /gallery — mirrors
 * the header + CSS-columns masonry (mixed aspect ratios, matching the
 * inner Suspense fallback in gallery/page.tsx). aria-hidden: transient
 * chrome, never announced.
 */
export default function GalleryLoading() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[1200px] px-4 pt-12 pb-20 sm:px-6 lg:px-8 lg:pt-16 lg:pb-28"
    >
      {/* Header */}
      <div className="mb-10 max-w-2xl lg:mb-14">
        <div className="h-5 w-28 animate-pulse rounded-pill bg-linen/60" />
        <div className="mt-5 h-14 w-52 animate-pulse rounded-card bg-linen/50" />
        <div className="mt-5 h-4 w-full max-w-md animate-pulse rounded-tag bg-linen/40" />
      </div>

      {/* Chip row */}
      <div className="mb-8 flex flex-wrap gap-2">
        {[64, 96, 128, 88].map((w, i) => (
          <div
            key={i}
            style={{ width: w }}
            className="h-10 animate-pulse rounded-pill bg-ivory"
          />
        ))}
      </div>

      {/* Masonry placeholders */}
      <div className="columns-2 gap-6 sm:columns-3 lg:columns-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="mb-6 break-inside-avoid animate-pulse rounded-card bg-linen/30 shadow-card"
            style={{ aspectRatio: i % 3 === 0 ? "4/5" : "3/4" }}
          />
        ))}
      </div>
    </div>
  );
}
