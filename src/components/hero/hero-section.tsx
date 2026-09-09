import Image from "next/image";
import { ChevronDown, Bike, ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { RatingChip } from "@/components/site/rating-chip";
import { CtaButton } from "@/components/site/cta-button";
import { ButterflyGlyph } from "@/components/site/butterfly-glyph";
import { site, links } from "@/content/site";

/**
 * Home hero — full viewport with the golden swallowtail butterfly emblem
 * illustration on warm textured cream paper, overlaid with an aesthetic
 * gradient scrim for text legibility.
 */
export function HeroSection() {
  return (
    <section
      aria-label="Papilio — patisserie café in Hanamkonda"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden"
    >
      {/* Butterfly emblem background illustration */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-poster.png"
          alt="Swallowtail butterfly with butter-gold wings — the Papilio emblem"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[74%_center]"
        />
      </div>

      {/* Legibility scrim over the poster for the text zone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-cream/95 via-cream/70 to-cream/10 sm:from-cream/90 sm:via-cream/50"
      />

      {/* DOM text layer — never rendered inside the canvas */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <SectionEyebrow>{site.tagline}</SectionEyebrow>

          <h1 className="wordmark mt-6 text-[2.75rem] leading-none text-espresso sm:text-[3.25rem] lg:text-h1">
            Papilio
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-cocoa sm:text-lg">
            A cozy, aesthetic, premium patisserie-café in Excise Colony,
            Hanamkonda, Warangal. Est. {site.established}.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CtaButton variant="primary" href={links.swiggy}>
              <Bike className="size-4" aria-hidden="true" />
              Order on Swiggy
            </CtaButton>
            <CtaButton variant="secondary" href="/menu">
              Explore the Menu
              <ArrowRight className="size-4" aria-hidden="true" />
            </CtaButton>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <RatingChip
              platform={site.ratings.swiggy.platform}
              score={site.ratings.swiggy.score}
            />
            <RatingChip
              platform={site.ratings.zomato.platform}
              score={site.ratings.zomato.score}
            />
            <RatingChip
              platform={site.ratings.google.platform}
              score={site.ratings.google.score}
            />
          </div>
        </div>
      </div>

      {/* Scroll cue over the espresso foot of the gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center">
        <span className="label-caps flex items-center gap-2 rounded-pill bg-espresso/85 px-4 py-2 text-butter backdrop-blur-sm">
          <ButterflyGlyph variant="flat" className="size-4 opacity-80" />
          Scroll
          <ChevronDown
            className="size-4 animate-bounce motion-reduce:animate-none"
            aria-hidden="true"
          />
        </span>
      </div>
    </section>
  );
}
