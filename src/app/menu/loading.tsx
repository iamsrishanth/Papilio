/**
 * Route-level skeleton for client-side navigations to /menu — mirrors
 * the page shape (header, search field, chip row, section cards) so the
 * swap-in reads as progressive loading, not a blank flash. Shape matches
 * the inner Suspense fallback in menu/page.tsx. aria-hidden: transient
 * chrome, never announced.
 */
export default function MenuLoading() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <div className="h-5 w-36 animate-pulse rounded-pill bg-linen/60" />
        <div className="mt-5 h-14 w-56 animate-pulse rounded-card bg-linen/50" />
        <div className="mt-5 h-4 w-full max-w-md animate-pulse rounded-tag bg-linen/40" />
      </div>

      {/* Search + filter chrome */}
      <div className="space-y-6">
        <div className="h-12 max-w-md animate-pulse rounded-[12px] border border-linen bg-white/60" />
        <div className="flex flex-wrap gap-2">
          {[48, 64, 88, 60, 104].map((w, i) => (
            <div
              key={i}
              style={{ width: w }}
              className="h-10 animate-pulse rounded-pill bg-ivory"
            />
          ))}
        </div>

        {/* Section cards */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-44 animate-pulse rounded-card bg-ivory/70 shadow-card"
          />
        ))}
      </div>
    </div>
  );
}
