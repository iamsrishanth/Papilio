import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, MessageCircle, Quote } from "lucide-react";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { ButterflyGlyph } from "@/components/site/butterfly-glyph";
import { CtaButton } from "@/components/site/cta-button";
import { Reveal } from "@/components/site/reveal";
import { DishCard } from "@/components/menu/dish-card";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { menu, type MenuItem } from "@/content/menu";
import { site, whatsappLink, whatsappMessages } from "@/content/site";

const cakes = menu.find((c) => c.id === "cakes")?.items ?? [];
const counterDesserts = menu.find((c) => c.id === "counter-desserts")?.items ?? [];
const patisserieItems: MenuItem[] = [...cakes, ...counterDesserts];

/** The three photos we have for this page, keyed to menu item names. */
const patisserieImages: Record<string, { src: string; alt: string }> = {
  "Chocolate Truffle Cake": {
    src: "/images/patisserie-signature-cake.png",
    alt: "Whole chocolate truffle cream cake with glossy ganache drips and whipped cream swirls on a ceramic cake stand",
  },
  "Vanilla Bean Cream Cake": {
    src: "/images/patisserie-celebration.png",
    alt: "Cream-frosted celebration cake with delicate piped borders and dried flowers",
  },
  "Nutella Sea Salt Macaron": {
    src: "/images/patisserie-counter.png",
    alt: "The Papilio patisserie counter with rows of macarons, tarts, éclairs and cream desserts under warm display lighting",
  },
};

/** Featured cakes and counter desserts (names from the menu module). */
const featuredNames = [
  "Chocolate Truffle Cake",
  "Vanilla Bean Cream Cake",
  "Nutella Sea Salt Macaron",
  "Red Velvet Cake",
  "Crème Brûlée",
  "Tiramisu",
  "Blueberry Cheesecake",
  "Choco Lava Cake",
  "Butter Croissant",
];

const featuredItems = featuredNames
  .map((name) => patisserieItems.find((i) => i.name === name))
  .filter((i): i is MenuItem => Boolean(i));

export const metadata: Metadata = {
  title: "Patisserie — cakes, custom orders & gifting",
  description:
    "The patisserie half of Papilio in Hanamkonda: four whole cakes and 28 counter desserts on the menu, custom and celebration cakes made to order, and gifting enquiries over WhatsApp.",
  alternates: { canonical: "/patisserie" },
  openGraph: {
    title: "The Papilio patisserie — cakes, custom orders & gifting",
    description:
      "Cakes, custom celebration orders and gifting from our patisserie counter in Hanamkonda, Warangal.",
    url: "/patisserie",
    images: [
      {
        url: "/images/og-patisserie.png",
        width: 1344,
        height: 768,
        alt: "The Papilio patisserie counter with macarons, tarts, éclairs and a chocolate cream cake",
      },
    ],
  },
};

export default function PatisseriePage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbLd([{ name: "Patisserie", path: "/patisserie" }])} />
      {/* ------------------------------------------------ Header */}
      <header className="relative pt-12 pb-10 max-w-2xl lg:pt-16">
        <ButterflyGlyph
          variant="line"
          className="absolute right-0 top-14 hidden size-14 animate-drift sm:block"
        />
        <Reveal>
          <SectionEyebrow>Patisserie</SectionEyebrow>
          <h1 className="font-display mt-5 text-[2.5rem] font-semibold leading-tight text-espresso sm:text-h1">
            Patisserie
          </h1>
          <p className="mt-4 text-base leading-relaxed text-cocoa">
            Cakes and gifting are the standing highlights of our own Instagram
            feed. On the menu, that half of Papilio shows up as{" "}
            {counterDesserts.length} counter desserts and {cakes.length} whole
            cakes — this page is a slow walk along that counter.
          </p>
        </Reveal>
      </header>

      {/* ------------------------------------------------ Signature cakes & counter desserts */}
      <section
        aria-labelledby="signature-heading"
        className="pb-16 lg:pb-24"
      >
        <div className="max-w-2xl">
          <SectionEyebrow>From the counter</SectionEyebrow>
          <h2
            id="signature-heading"
            className="font-display mt-5 text-h2 font-semibold text-espresso"
          >
            Signature cakes &amp; counter desserts
          </h2>
          <p className="mt-3 text-base leading-relaxed text-cocoa">
            A few of the {counterDesserts.length + cakes.length} patisserie
            items on our menu — every one carries the FSSAI veg marker, and
            prices are listed only where verified on Swiggy.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06} className="h-full">
              <DishCard
                item={item}
                image={patisserieImages[item.name]}
                priority={i === 0}
                className="h-full"
                href={`/menu?q=${encodeURIComponent(item.name)}`}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/menu#counter-desserts"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-caramel link-underline"
          >
            See every dessert on the full menu
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:transform-none motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------ Custom & celebration cakes */}
      <section
        aria-labelledby="custom-heading"
        className="pb-16 lg:pb-24"
      >
        <Reveal>
          <div className="relative overflow-hidden rounded-card bg-surface-espresso p-8 text-cream shadow-card sm:p-10 lg:p-12">
          {/* butter wing glow — CSS-only ambience */}
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-butter/10 blur-2xl"
          />
          <div className="relative max-w-2xl">
            <h2
              id="custom-heading"
              className="font-display text-h2 font-semibold text-cream"
            >
              Custom &amp; celebration cakes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              Celebration cakes are planned and baked to order — tell us the
              occasion and the day, and we will work out the rest with you.
            </p>

            <figure className="mt-8 border-l-2 border-butter/60 pl-5">
              <Quote className="size-5 text-butter/80" aria-hidden="true" />
              <blockquote className="font-display mt-2 text-lg italic leading-relaxed text-cream/90">
                &ldquo;DM us for orders and bookings&rdquo;
              </blockquote>
              <figcaption className="label-caps mt-2 text-butter/80">
                from our Instagram bio
              </figcaption>
            </figure>

            <div className="mt-8">
              <CtaButton
                variant="primary"
                href={whatsappLink(whatsappMessages.cake)}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp us for a custom cake
              </CtaButton>
            </div>
          </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------ Gifting */}
      <section
        aria-labelledby="gifting-heading"
        className="pb-20 lg:pb-28"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="overflow-hidden rounded-card shadow-card lg:col-span-5">
            <Image
              src="/images/patisserie-gifting.png"
              alt="A Papilio gift box of assorted macarons and small patisserie tied with a caramel satin ribbon on linen"
              width={1024}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 lg:pl-4">
            <SectionEyebrow>Gifting</SectionEyebrow>
            <h2
              id="gifting-heading"
              className="font-display mt-5 text-h2 font-semibold text-espresso"
            >
              Sweet things, wrapped
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cocoa">
              Gifting is the other standing highlight on our Instagram feed.
              For birthdays, thank-yous and just-because days, message us with
              the occasion and we will plan it with you.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <CtaButton
                variant="secondary"
                href={whatsappLink(whatsappMessages.gifting)}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Enquire about gifting
              </CtaButton>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-pill px-4 py-3 text-sm font-semibold text-caramel underline-offset-4 hover:underline"
              >
                <Instagram className="size-4" aria-hidden="true" />
                <span>
                  See the feed — <span className="tnum">{site.instagramHandle}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
