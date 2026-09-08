import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { ButterflyGlyph } from "@/components/site/butterfly-glyph";
import { CtaButton } from "@/components/site/cta-button";
import { SectionEyebrow } from "@/components/site/section-eyebrow";

/**
 * Custom 404 — a Papilio-styled dead end. The butterfly drifts gently
 * (killed by the global reduced-motion rule); copy stays calm and
 * helpful; ONE filled CTA (home), menu as the secondary pill.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
      <div className="animate-drift motion-reduce:animate-none">
        <ButterflyGlyph
          variant="line"
          strokeWidth={1.2}
          className="size-16 text-caramel sm:size-20"
        />
      </div>

      <SectionEyebrow className="mt-8">404 — page not found</SectionEyebrow>
      <h1 className="font-display mt-5 max-w-xl text-[2.5rem] font-semibold leading-tight text-espresso sm:text-h1">
        This page has fluttered away
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-cocoa">
        The link you followed leads to a leaf that isn&rsquo;t on this branch.
        The coffee, however, is still warm in Excise Colony.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <CtaButton variant="primary" href="/">
          <Home className="size-4" aria-hidden="true" />
          Back to home
        </CtaButton>
        <CtaButton variant="secondary" href="/menu">
          Explore the menu
          <ArrowRight className="size-4" aria-hidden="true" />
        </CtaButton>
      </div>

      <p className="mt-10 text-sm text-cocoa/70">
        Open daily 8:00 AM – 10:30 PM ·{" "}
        <Link
          href="/visit"
          className="font-semibold text-caramel link-underline"
        >
          Find the café
        </Link>
      </p>
    </div>
  );
}
