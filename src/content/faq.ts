import { site } from "./site";

/**
 * Visit-page FAQ — every question is answerable from verified data
 * (content/site.ts, content/menu.ts). Answers interpolate the same
 * values the footer and JSON-LD use, so NAP stays single-source.
 */

export type Faq = {
  q: string;
  a: string;
};

export const visitFaqs: Faq[] = [
  {
    q: "What are your opening hours?",
    a: `We are open all seven days, ${site.hours.display}. The kitchen and counter may observe festival variations on rare days — call ${site.phoneDisplay} to confirm before a long trip.`,
  },
  {
    q: "Where exactly is the café?",
    a: `${site.fullAddress}. The entrance is on the ground floor; “Get directions” on this page opens Google Maps with the exact pin.`,
  },
  {
    q: "How do I book a table?",
    a: `WhatsApp us on ${site.phoneDisplay} and we will confirm your booking. The same number takes calls.`,
  },
  {
    q: "Do you make custom or celebration cakes?",
    a: `Yes — celebration cakes are made to order. Message us on WhatsApp, or DM on Instagram (${site.instagramHandle}), which is where the cake highlights live.`,
  },
  {
    q: "Is there parking and wheelchair access?",
    a: `Yes. Dine-in, takeaway and delivery are all available, with parking, wheelchair accessibility and cards accepted.`,
  },
  {
    q: "Can I order Papilio to my door?",
    a: `We are on Swiggy and Zomato — ${site.costForTwo.delivery} on the apps. The “Order to your door” band on this page links straight to both.`,
  },
  {
    q: "What does a meal for two cost?",
    a: `Around ${site.costForTwo.dineIn} at the table, and ${site.costForTwo.delivery} when ordered through the delivery apps.`,
  },
  {
    q: "Are there enough vegetarian options?",
    a: `Plenty — 173 of the 187 items on our menu are vegetarian, and every single item carries an FSSAI veg, non-veg or egg marker.`,
  },
];

/** Same questions as plain strings for the FAQPage JSON-LD block. */
export const visitFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: visitFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
