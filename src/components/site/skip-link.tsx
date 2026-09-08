/**
 * Skip link — first focusable element on every page (a11y).
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-pill focus:bg-caramel focus:px-5 focus:py-3 focus:text-white focus:label-caps focus:shadow-modal"
    >
      Skip to content
    </a>
  );
}
