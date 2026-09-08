import type { Metadata } from "next";
import { Bike, Check, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { CtaButton } from "@/components/site/cta-button";
import { CopyButton } from "@/components/site/copy-button";
import { ShareButton } from "@/components/site/share-button";
import { Reveal } from "@/components/site/reveal";
import { HoursCard } from "@/components/site/hours-card";
import { MapEmbed } from "@/components/site/map-embed";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { site, links, whatsappLink, whatsappMessages } from "@/content/site";
import { visitFaqs, visitFaqJsonLd } from "@/content/faq";

export const metadata: Metadata = {
  title: "Visit — Excise Colony, Hanamkonda",
  description:
    "Papilio, H.No. 2-7-741, Excise Colony, Hanamkonda, Warangal — open all seven days, 8:00 AM to 10:30 PM. Get directions, call, or WhatsApp us for a booking.",
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Visit Papilio — Excise Colony, Hanamkonda",
    description:
      "Find us in Excise Colony, Hanamkonda — open daily 8:00 AM to 10:30 PM, with dine-in, takeaway and delivery.",
    url: "/visit",
    images: [
      {
        url: "/images/og-visit.png",
        width: 1344,
        height: 768,
        alt: "The warm Papilio café facade glowing in the evening light",
      },
    ],
  },
};

export default function VisitPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <JsonLd data={visitFaqJsonLd} />
      <JsonLd data={breadcrumbLd([{ name: "Visit", path: "/visit" }])} />
      {/* ------------------------------------------------ Header */}
      <header className="pt-12 pb-10 max-w-2xl lg:pt-16">
        <Reveal>
          <SectionEyebrow>Visit</SectionEyebrow>
          <h1 className="font-display mt-5 text-[2.5rem] font-semibold leading-tight text-espresso sm:text-h1">
            Visit us
          </h1>
          <p className="mt-4 text-base leading-relaxed text-cocoa">
            We are at {site.address.line1}, Hanamkonda — open all seven days,{" "}
            {site.hours.display}. Dine-in, takeaway and delivery.
          </p>
        </Reveal>
      </header>

      {/* ------------------------------------------------ Address + map */}
      <section aria-labelledby="location-heading" className="pb-16 lg:pb-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-center rounded-card bg-ivory p-8 shadow-card lg:col-span-5">
            <h2
              id="location-heading"
              className="font-display text-h2 font-semibold text-espresso"
            >
              Excise Colony, Hanamkonda
            </h2>

            <address className="mt-5 flex items-start gap-2.5 text-base not-italic leading-relaxed text-cocoa">
              <MapPin
                className="mt-1 size-5 shrink-0 text-caramel"
                aria-hidden="true"
              />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </address>

            <a
              href={links.phone}
              className="mt-4 inline-flex items-center gap-2.5 text-base font-semibold text-espresso link-underline hover:text-caramel"
            >
              <Phone className="size-4 text-caramel" aria-hidden="true" />
              <span className="tnum">{site.phoneDisplay}</span>
            </a>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <CtaButton variant="primary" href={links.maps}>
                <MapPin className="size-4" aria-hidden="true" />
                Get directions
              </CtaButton>
              <CtaButton variant="secondary" href={links.phone}>
                <Phone className="size-4" aria-hidden="true" />
                Call the café
              </CtaButton>
              <CopyButton text={site.fullAddress} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-linen/70 pt-4">
              <ShareButton
                path="/visit"
                title="Visit Papilio — Excise Colony, Hanamkonda"
                text="Papilio, H.No. 2-7-741, Excise Colony, Hanamkonda — open daily 8:00 AM to 10:30 PM."
                label="Share this page"
                className="-ml-4 text-sm"
              />
            </div>
          </div>

          <MapEmbed className="lg:col-span-7" />
        </div>
      </section>

      {/* ------------------------------------------------ Hours, facilities, contact */}
      <section
        aria-label="Hours, facilities and contact"
        className="grid grid-cols-1 gap-6 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24"
      >
        <HoursCard className="lg:col-span-4" />

        <div className="rounded-card bg-ivory p-6 shadow-card lg:col-span-4">
          <h2 className="label-caps text-cocoa">Facilities</h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {site.facilities.map((facility) => (
              <li
                key={facility}
                className="inline-flex items-center gap-1.5 rounded-pill bg-linen px-3.5 py-2 text-sm text-espresso"
              >
                <Check
                  className="size-4 shrink-0 text-caramel"
                  aria-hidden="true"
                />
                {facility}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-cocoa/80">
            {site.hours.days}, {site.hours.display}. {site.hours.note}
          </p>
        </div>

        <div className="rounded-card bg-ivory p-6 shadow-card lg:col-span-4">
          <h2 className="label-caps text-cocoa">Contact</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-1">
              <a
                href={links.phone}
                className="flex min-h-11 flex-1 items-center gap-3 rounded-pill px-1 py-1 text-espresso transition-colors hover:text-caramel"
              >
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linen"
                  aria-hidden="true"
                >
                  <Phone className="size-4 text-caramel" />
                </span>
                <span className="text-sm font-semibold">
                  <span className="tnum">{site.phoneDisplay}</span>
                </span>
              </a>
              <CopyButton
                text={site.phoneDisplay}
                label="Copy phone number"
                copiedLabel="Phone number copied"
                iconOnly
                className="ml-1 shrink-0"
              />
            </li>
            <li>
              <a
                href={whatsappLink(whatsappMessages.booking)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 rounded-pill px-1 py-1 text-espresso transition-colors hover:text-caramel"
              >
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linen"
                  aria-hidden="true"
                >
                  <MessageCircle className="size-4 text-caramel" />
                </span>
                <span className="text-sm font-semibold">
                  WhatsApp us for a booking
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 rounded-pill px-1 py-1 text-espresso transition-colors hover:text-caramel"
              >
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linen"
                  aria-hidden="true"
                >
                  <Instagram className="size-4 text-caramel" />
                </span>
                <span className="text-sm font-semibold">
                  Instagram — {site.instagramHandle}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ FAQ */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="scroll-mt-24 pb-16 lg:pb-24"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <SectionEyebrow>Good to know</SectionEyebrow>
            <h2
              id="faq-heading"
              className="font-display mt-5 text-h2 font-semibold text-espresso"
            >
              Frequently asked
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cocoa">
              The questions guests ask us most — hours, bookings, cakes and
              getting here. Anything else, WhatsApp or call us on{" "}
              <span className="tnum font-semibold">{site.phoneDisplay}</span>.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <FaqAccordion faqs={visitFaqs} />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ Delivery band */}
      <section aria-labelledby="delivery-heading" className="pb-16 lg:pb-24">
        <div className="relative overflow-hidden rounded-card bg-surface-espresso p-8 text-cream shadow-card sm:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-butter/10 blur-2xl"
          />
          <div className="relative max-w-2xl">
            <h2
              id="delivery-heading"
              className="font-display text-h2 font-semibold text-cream"
            >
              Order to your door
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              Prefer the sofa? Papilio is on Swiggy and Zomato —{" "}
              {site.costForTwo.delivery} on the delivery apps,{" "}
              {site.costForTwo.dineIn.replace(" (dine-in)", "")} at the table.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
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
      </section>

      {/* ------------------------------------------------ Trust line */}
      <p className="pb-20 text-center text-xs text-cocoa/70 lg:pb-28">
        {site.fssai}
      </p>
    </div>
  );
}
