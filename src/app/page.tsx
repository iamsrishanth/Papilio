import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Instagram,
  MapPin,
  MessageCircle,
  Quote,
  Star,
} from "lucide-react";
import { HeroSection } from "@/components/hero/hero-section";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { RatingChip } from "@/components/site/rating-chip";
import { CtaButton } from "@/components/site/cta-button";
import { Reveal } from "@/components/site/reveal";
import { DishCard } from "@/components/menu/dish-card";
import { HoursCard } from "@/components/site/hours-card";
import { site, links, whatsappLink, whatsappMessages } from "@/content/site";
import { verifiedQuotes } from "@/content/reviews";
import { menu, signatureDishNames, type MenuItem } from "@/content/menu";
import { galleryPhotos } from "@/content/gallery";

// The four flagship dishes with verified prices (PROMPT.md §8)
const signatureImages: Record<string, { src: string; alt: string }> = {
  "Chicken & Avocado Salad": {
    src: "/images/dish-salad.png",
    alt: "Chicken and avocado salad with cherry tomatoes and roasted peppers at Papilio",
  },
  "Buttermilk Chicken Wrap": {
    src: "/images/dish-wrap.png",
    alt: "Buttermilk chicken wrap served with fries at Papilio",
  },
  "Cottage Crunch Wrap": {
    src: "/images/dish-cottage-wrap.png",
    alt: "Crispy cottage cheese wrap with golden fries at Papilio",
  },
  "Double Trouble Chicken Burger": {
    src: "/images/dish-burger.png",
    alt: "Double Trouble chicken burger with skinny fries and cheese dip at Papilio",
  },
};

const allItems: MenuItem[] = menu.flatMap((c) => c.items);
const signatureItems = signatureDishNames
  .map((name) => allItems.find((i) => i.name === name))
  .filter((i): i is MenuItem => Boolean(i));

const heroQuote = verifiedQuotes[1]; // "peaceful atmosphere" Google review
const shortQuote = verifiedQuotes[0]; // "Excellent ambience and tasty food."

// Four representative café moments for the feed strip + an espresso
// “Follow” tile that ends the row (existing assets, descriptive alt from
// content/gallery.ts — never claimed as literal IG posts; the copy stays
// neutral: "moments from the café").
const feedPhotoSrcs = [
  "/images/gallery-interior.png",
  "/images/gallery-coffee-pour.png",
  "/images/patisserie-counter.png",
  "/images/gallery-baking.png",
];
const feedPhotos = feedPhotoSrcs
  .map((src) => galleryPhotos.find((p) => p.src === src))
  .filter((p): p is (typeof galleryPhotos)[number] => Boolean(p));

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ------------------------------------------------ Signature strip */}
      <section
        aria-labelledby="signature-heading"
        className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <Reveal className="max-w-2xl">
          <SectionEyebrow>From the kitchen</SectionEyebrow>
          <h2
            id="signature-heading"
            className="font-display mt-5 text-h2 font-semibold text-espresso"
          >
            Signature dishes
          </h2>
          <p className="mt-3 text-base leading-relaxed text-cocoa">
            The plates our diners keep coming back for — priced as listed on
            Swiggy.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signatureItems.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.07} className="h-full flex flex-col">
              <DishCard
                item={item}
                image={signatureImages[item.name]}
                className="h-full"
                href={`/menu?q=${encodeURIComponent(item.name)}`}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-caramel link-underline"
          >
            See the full menu — 21 sections, 187 items
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:transform-none motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-linen sm:block"
          />
          <Link
            href="/menu?signature=1"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa link-underline hover:text-caramel"
          >
            Filter the menu to these four
            <ArrowRight
              className="size-4 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------ Ratings band */}
      <section
        aria-labelledby="ratings-heading"
        className="mx-auto w-full max-w-[1200px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"
      >
        <Reveal>
          <div className="card-dark relative overflow-hidden rounded-card bg-surface-espresso p-8 text-cream sm:p-10 lg:p-12">
          {/* butter wing accent — the one decorative curve per page */}
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-butter/10 blur-2xl"
          />
          <h2 id="ratings-heading" className="sr-only">
            Ratings and reviews
          </h2>

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <RatingChip
                  platform={site.ratings.swiggy.platform}
                  score={site.ratings.swiggy.score}
                  count={site.ratings.swiggy.count}
                />
                <RatingChip
                  platform={site.ratings.zomato.platform}
                  score={site.ratings.zomato.score}
                  count={site.ratings.zomato.count}
                />
                <RatingChip
                  platform={site.ratings.google.platform}
                  score={site.ratings.google.score}
                  count={site.ratings.google.count}
                />
              </div>

              <figure className="mt-6">
                <Quote
                  className="size-6 text-butter/70"
                  aria-hidden="true"
                />
                <blockquote className="font-display mt-3 text-lg italic leading-relaxed text-cream/90 sm:text-xl">
                  {heroQuote.quote}
                </blockquote>
                <figcaption className="label-caps mt-3 text-butter/80">
                  {heroQuote.source}
                </figcaption>
              </figure>

              {/* Second verified guest line, quieter register */}
              <figure className="mt-6 max-w-xl border-t border-cream/10 pt-5">
                <blockquote className="font-display text-base italic leading-relaxed text-cream/75">
                  &ldquo;{shortQuote.quote}&rdquo;
                </blockquote>
                <figcaption className="label-caps mt-2 text-cream/50">
                  {shortQuote.source}
                </figcaption>
              </figure>

              <p className="mt-6 flex items-center gap-2 text-sm text-cream/70">
                <Star
                  className="size-4 fill-butter text-butter"
                  aria-hidden="true"
                />
                {site.ratings.heroStatLine} · {site.costForTwo.dineIn}
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <CtaButton
                variant="secondary"
                href={links.swiggy}
                className="border-cream/25 bg-transparent text-cream hover:border-butter hover:text-butter"
              >
                <Bike className="size-4" aria-hidden="true" />
                Order on Swiggy
              </CtaButton>
              <CtaButton
                variant="secondary"
                href={links.zomato}
                className="border-cream/25 bg-transparent text-cream hover:border-butter hover:text-butter"
              >
                Order on Zomato
              </CtaButton>
            </div>
          </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------ Patisserie teaser */}
      <section
        aria-labelledby="patisserie-heading"
        className="mx-auto w-full max-w-[1200px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"
      >
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          <Reveal className="relative min-h-[280px] overflow-hidden rounded-card lg:col-span-7">
            <Image
              src="/images/patisserie-signature-cake.png"
              alt="Chocolate truffle cream cake with whipped cream swirls from the Papilio patisserie counter"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover rounded-tl-card rounded-tr-card rounded-bl-card rounded-br-[110px]"
            />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center rounded-card bg-linen/50 p-8 lg:col-span-5 lg:p-10">
            <SectionEyebrow className="bg-ivory">Patisserie</SectionEyebrow>
            <h2
              id="patisserie-heading"
              className="font-display mt-5 text-h2 font-semibold text-espresso"
            >
              Cakes, counter desserts &amp; gifting
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cocoa">
              The patisserie half of Papilio — 28 counter desserts and whole
              cakes from our counter, celebration cakes made to order, and
              gift boxes worth giving. Follow the cakes and gifting highlights
              on our feed.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <CtaButton variant="secondary" href="/patisserie">
                Explore the patisserie
                <ArrowRight className="size-4" aria-hidden="true" />
              </CtaButton>
              <a
                href={whatsappLink(whatsappMessages.cake)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-pill px-4 py-3 text-sm font-semibold text-caramel underline-offset-4 hover:underline"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp us for custom cakes
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ From the feed */}
      <section
        aria-labelledby="feed-heading"
        className="mx-auto w-full max-w-[1200px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"
      >
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-xl">
            <SectionEyebrow>From the café</SectionEyebrow>
            <h2
              id="feed-heading"
              className="font-display mt-5 text-h2 font-semibold text-espresso"
            >
              Follow the café
            </h2>
            <p className="mt-3 text-base leading-relaxed text-cocoa">
              New cakes at the counter, the day&rsquo;s bakes and quiet corners
              of the room — our {site.igCommunity} sees them first.
            </p>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2.5 text-sm font-semibold text-caramel link-underline"
            aria-label={`${site.instagramHandle} — Papilio on Instagram`}
          >
            <Instagram className="size-4" aria-hidden="true" />
            {site.instagramHandle}
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {feedPhotos.map((photo) => (
              <li key={photo.src}>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`See more on Instagram — ${photo.caption}`}
                  className="group relative block aspect-square overflow-hidden rounded-card bg-linen/40 shadow-card transition-shadow duration-300 hover:shadow-lift motion-reduce:transition-none"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:transform-none motion-reduce:transition-none"
                  />
                  {/* Caption scrim — cream text on an espresso gradient at
                      the foot of the tile; reveals on hover AND keyboard
                      focus (the aria-label already carries the caption for
                      AT). */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-espresso/80 via-espresso/35 to-transparent px-3.5 pt-10 pb-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  >
                    <span className="line-clamp-2 text-xs font-medium leading-snug text-cream">
                      {photo.caption}
                    </span>
                  </span>
                  {/* Outbound arrow — same grammar as the follow tile
                      (butter on espresso), announcing the Instagram
                      destination on hover/focus. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-pill bg-espresso/60 text-butter opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
              </li>
            ))}
            {/* Follow tile — deep espresso card closing the strip (matches
                the chip-rating grammar: espresso surface, butter accents,
                DESIGN.md-legal). */}
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow Papilio on Instagram — ${site.instagramHandle}`}
                className="group relative flex aspect-square flex-col items-center justify-center gap-3 rounded-card bg-espresso p-4 pb-6 text-center shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                {/* Hover arrow — quiet top-right affordance that slides in
                    on hover (the outbound signal), butter on espresso. */}
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-pill bg-cream/10 text-butter opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                >
                  <ArrowUpRight className="size-4" />
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full bg-cream/10 transition-transform duration-300 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                >
                  <Instagram className="size-6 text-butter" />
                </span>
                <span className="font-display text-lg leading-snug text-cream">
                  Follow
                </span>
                <span className="label-caps text-butter/80">
                  {site.instagramHandle}
                </span>
              </a>
            </li>
          </ul>
        </Reveal>
      </section>

      {/* ------------------------------------------------ Visit band */}
      <section
        aria-labelledby="visit-heading"
        className="mx-auto w-full max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"
      >
        <div className="rounded-card bg-linen/40 p-8 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <SectionEyebrow className="bg-ivory">Visit</SectionEyebrow>
              <h2
                id="visit-heading"
                className="font-display mt-5 text-h2 font-semibold text-espresso"
              >
                Find us in Excise Colony
              </h2>
              <address className="mt-5 flex items-start gap-2.5 text-base not-italic leading-relaxed text-cocoa">
                <MapPin className="mt-1 size-5 shrink-0 text-caramel" aria-hidden="true" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </address>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <CtaButton variant="primary" href={links.maps}>
                  <MapPin className="size-4" aria-hidden="true" />
                  Get directions
                </CtaButton>
                <CtaButton variant="secondary" href="/visit">
                  Plan your visit
                  <ArrowRight className="size-4" aria-hidden="true" />
                </CtaButton>
              </div>
              <Link
                href="/visit#faq"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cocoa link-underline hover:text-caramel"
              >
                <MessageCircle
                  className="size-4 text-caramel"
                  aria-hidden="true"
                />
                Hours, bookings &amp; other common questions
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <HoursCard />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
