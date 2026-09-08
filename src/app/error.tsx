"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { ButterflyGlyph } from "@/components/site/butterfly-glyph";
import { CtaButton } from "@/components/site/cta-button";
import { SectionEyebrow } from "@/components/site/section-eyebrow";

/**
 * Root error boundary — renders inside the site chrome (header, footer).
 * "Try again" (reset) is the single filled CTA; home is the secondary
 * escape. The error is logged for observability, never rendered raw.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[papilio] route error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
      <div className="flex size-16 items-center justify-center rounded-full bg-linen/70 sm:size-20">
        <ButterflyGlyph
          variant="flat"
          decorative
          className="size-9 sm:size-11"
        />
      </div>

      <SectionEyebrow className="mt-8">Something went wrong</SectionEyebrow>
      <h1 className="font-display mt-5 max-w-xl text-[2.5rem] font-semibold leading-tight text-espresso sm:text-h1">
        The chrysalis needs a moment
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-cocoa">
        We hit an unexpected snag loading this page. Trying again usually
        sorts it out.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <CtaButton variant="primary" onClick={reset}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Try again
        </CtaButton>
        <CtaButton variant="secondary" href="/">
          Back to home
        </CtaButton>
      </div>
    </div>
  );
}
