import type { Metadata } from "next";
import Image from "next/image";
import { Instagram, Quote } from "lucide-react";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal } from "@/components/site/reveal";
import { WingUnfold } from "@/components/story/wing-unfold";
import { StoryTimeline } from "@/components/story/story-timeline";
import { ButterflyGlyph } from "@/components/site/butterfly-glyph";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import {
  storyIntro,
  storyChapters,
  storyFounders,
  storyTimeline,
  unfoldCopy,
} from "@/content/story";
import { pressLine, ownerVoiceLine } from "@/content/reviews";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our story — est. October 2023",
  description:
    "Papilio opened in Excise Colony, Hanamkonda in October 2023 — a patisserie-led café by Radha Suvidha and Chef Siddhartha Reddy. The room, the craft, and a 1.4K-strong community.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: "Our story — est. October 2023",
    description:
      "From chrysalis to butterfly: the story of Papilio, a patisserie-led café in Excise Colony, Hanamkonda.",
    url: "/story",
    images: [
      {
        url: "/images/og-story.png",
        width: 1344,
        height: 768,
        alt: "Freshly baked golden focaccia with herbs on a wooden board in warm bakery light",
      },
    ],
  },
};

/** Chapter photography — rounded-card frames, descriptive alt text. */
const chapterImages = {
  room: {
    src: "/images/gallery-interior.png",
    alt: "The Papilio café interior with warm hanging lamps, wooden furniture and plants in golden afternoon light",
    width: 1152,
    height: 864,
  },
  craft: {
    src: "/images/gallery-focaccia.png",
    alt: "Freshly baked golden focaccia with herbs and sea salt on a wooden board",
    width: 1152,
    height: 864,
  },
} as const;

/** Editorial chapter divider — hairlines + the line-art glyph (decorative). */
function DividerGlyph() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-4 pb-4"
    >
      <span className="h-px w-16 bg-linen" />
      <ButterflyGlyph variant="line" className="size-5 opacity-70" decorative />
      <span className="h-px w-16 bg-linen" />
    </div>
  );
}

export default function StoryPage() {
  const room = storyChapters.find((c) => c.id === "room");
  const craft = storyChapters.find((c) => c.id === "craft");
  const founders = storyChapters.find((c) => c.id === "founders");

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbLd([{ name: "Story", path: "/story" }])} />
      {/* ------------------------------------------------ Header */}
      <header className="pt-12 pb-10 max-w-2xl lg:pt-16">
        <Reveal>
          <SectionEyebrow>Our story</SectionEyebrow>
          <h1 className="font-display mt-5 text-[2.5rem] font-semibold leading-tight text-espresso sm:text-h1">
            From chrysalis to butterfly
          </h1>
          {storyIntro.map((paragraph, i) => (
            <p
              key={paragraph}
              className={cn(
                "mt-4 text-base leading-relaxed text-cocoa",
                i === 0 && "drop-cap"
              )}
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </header>

      {/* ------------------------------------------------ The room */}
      {room ? (
        <section aria-labelledby="room-heading" className="pb-16 lg:pb-24">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionEyebrow>{room.eyebrow}</SectionEyebrow>
              <h2
                id="room-heading"
                className="font-display mt-5 text-h2 font-semibold text-espresso"
              >
                {room.heading}
              </h2>
              {room.paragraphs.map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={cn(
                    "mt-4 text-base leading-relaxed text-cocoa",
                    i === 0 && "drop-cap"
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <figure className="overflow-hidden rounded-card bg-linen/40 shadow-card lg:col-span-5">
              <Image
                src={chapterImages.room.src}
                alt={chapterImages.room.alt}
                width={chapterImages.room.width}
                height={chapterImages.room.height}
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="h-auto w-full object-cover"
              />
            </figure>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------ Divider */}
      <DividerGlyph />

      {/* ------------------------------------------------ The craft */}
      {craft ? (
        <section aria-labelledby="craft-heading" className="pb-16 lg:pb-24">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <figure className="order-last overflow-hidden rounded-card bg-linen/40 shadow-card lg:order-first lg:col-span-5">
              <Image
                src={chapterImages.craft.src}
                alt={chapterImages.craft.alt}
                width={chapterImages.craft.width}
                height={chapterImages.craft.height}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="h-auto w-full object-cover"
              />
            </figure>
            <div className="lg:col-span-7">
              <SectionEyebrow>{craft.eyebrow}</SectionEyebrow>
              <h2
                id="craft-heading"
                className="font-display mt-5 text-h2 font-semibold text-espresso"
              >
                {craft.heading}
              </h2>
              {craft.paragraphs.map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={cn(
                    "mt-4 text-base leading-relaxed text-cocoa",
                    i === 0 && "drop-cap"
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------ Divider */}
      <DividerGlyph />

      {/* ------------------------------------------------ The founders */}
      {founders ? (
        <section aria-labelledby="founders-heading" className="pb-16 lg:pb-24">
          <div className="max-w-2xl">
            <SectionEyebrow>{founders.eyebrow}</SectionEyebrow>
            <h2
              id="founders-heading"
              className="font-display mt-5 text-h2 font-semibold text-espresso"
            >
              {founders.heading}
            </h2>
            {founders.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-base leading-relaxed text-cocoa"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-2xl">
            {storyFounders.map((founder) => (
              <li
                key={founder.name}
                className="group rounded-card bg-ivory p-5 shadow-card transition-shadow duration-300 hover:shadow-lift motion-reduce:transition-none"
              >
                <p className="font-display text-h3 font-medium text-espresso">
                  {founder.name}
                </p>
                <p className="label-caps mt-1.5 text-caramel">{founder.role}</p>
                <a
                  href={founder.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cocoa transition-colors hover:text-caramel hover:underline"
                  aria-label={`${founder.name} on Instagram — ${founder.instagramHandle}`}
                >
                  <Instagram className="size-4 text-caramel transition-transform duration-300 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:transform-none" aria-hidden="true" />
                  {founder.instagramHandle}
                </a>
              </li>
            ))}
          </ul>

          {/* Owner reply — verbatim voice anchor (DESIGN.md Voice & Copy) */}
          <figure className="mt-8 max-w-2xl border-l-2 border-caramel/60 pl-5">
            <blockquote className="text-base italic leading-relaxed text-cocoa">
              &ldquo;{ownerVoiceLine}&rdquo;
            </blockquote>
            <figcaption className="label-caps mt-2 text-caramel">
              The caf&eacute;&rsquo;s own reply to a guest review
            </figcaption>
          </figure>
        </section>
      ) : null}

      {/* ------------------------------------------------ The unfold (CSS 3D, scroll-driven) */}
      <WingUnfold
        scrollHint={unfoldCopy.hint}
        footer={
          <p className="text-base leading-relaxed text-cocoa">
            {unfoldCopy.outro}
          </p>
        }
      >
        <h2 className="font-display text-h2 font-semibold text-espresso">
          {unfoldCopy.heading}
        </h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-cocoa">
          {unfoldCopy.subline}
        </p>
      </WingUnfold>

      {/* ------------------------------------------------ Pull-quote */}
      <section aria-label="Words from the launch reel" className="pb-16 lg:pb-24">
        <figure className="relative mx-auto max-w-3xl rounded-card bg-linen/40 px-8 py-10 text-center sm:px-12">
          <Quote className="mx-auto size-7 text-caramel" aria-hidden="true" />
          <blockquote className="font-display mt-4 text-xl italic leading-relaxed text-espresso sm:text-2xl">
            &ldquo;{pressLine.quote}&rdquo;
          </blockquote>
          <figcaption className="label-caps mt-4 text-cocoa">
            {pressLine.source}
          </figcaption>
        </figure>
      </section>

      {/* ------------------------------------------------ Timeline strip */}
      <section
        aria-labelledby="timeline-heading"
        className="pb-20 lg:pb-28"
      >
        <div className="max-w-2xl">
          <SectionEyebrow>Milestones</SectionEyebrow>
          <h2
            id="timeline-heading"
            className="font-display mt-5 text-h2 font-semibold text-espresso"
          >
            The story so far
          </h2>
        </div>

        <StoryTimeline milestones={storyTimeline} />

        <p className="mt-12 text-sm text-cocoa/70">
          Papilio — {site.tagline}, Excise Colony, Hanamkonda. Established{" "}
          {site.established}.
        </p>
      </section>
    </div>
  );
}
