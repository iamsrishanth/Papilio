/**
 * Papilio — verified business data (single source of truth).
 *
 * Every fact below is tagged to its source in PROMPT.md §8 / §9.1.
 * Do not add unverified claims here — see PROMPT.md §9.2 for the
 * fill-before-ship policy.
 */

// TODO: replace with the production domain before ship.
export const SITE_URL = "http://localhost:3000";

export const site = {
  /** Wordmark is all-caps "PAPILIO"; running text uses "Papilio". */
  name: "PAPILIO",
  runningName: "Papilio",
  /** Verified IG bio positioning. */
  tagline: "Patisserie | Café",
  established: "October 2023",
  url: SITE_URL,

  // Contact & location [VERIFIED-Zomato/Swiggy/RG]
  phone: "+919000316366",
  phoneDisplay: "+91 90003 16366",
  whatsappNumber: "919000316366",
  address: {
    line1: "H.No. 2-7-741, Excise Colony",
    line2: "Hanamkonda, Warangal, Telangana 506370",
  },
  fullAddress:
    "H.No. 2-7-741, Excise Colony, Hanamkonda, Warangal, Telangana 506370",
  geo: { lat: 17.9962, lng: 79.5379 },

  // Hours [RESOLVED §9.1 — RG refreshed Aug 2026 + Swiggy closing time]
  hours: {
    display: "8:00 AM – 10:30 PM",
    days: "Open all seven days",
    opens: "08:00",
    closes: "22:30",
    note: "Kitchen/counter may observe festival variations — call to confirm.",
  },

  // Ratings [VERIFIED-Swiggy / Zomato / Google via RG]
  ratings: {
    swiggy: { score: "4.3", count: "1.3K+ ratings", platform: "Swiggy" },
    zomato: { score: "4.3", count: "995 ratings", platform: "Zomato" },
    google: { score: "4.1", count: "532 ratings", platform: "Google" },
    /** Swiggy + Zomato agree at 4.3 — hero stat. */
    heroStat: "4.3★ · 1,300+ ratings",
    heroStatLine: "Rated 4.3★ by 1,300+ diners on Swiggy",
  },

  // Cost [VERIFIED-Swiggy (delivery) / District (dine-in)] — different scopes
  costForTwo: {
    dineIn: "₹800 for two (dine-in)",
    delivery: "₹250 for two (delivery)",
  },

  // Trust [VERIFIED-Swiggy footer / RG / District]
  fssai: "FSSAI Lic. No. 23626018000482",
  facilities: [
    "Dine-in",
    "Takeaway",
    "Delivery",
    "Parking",
    "Wheelchair accessible",
    "Cards accepted",
  ],

  // Cuisine [VERIFIED-Zomato/RG union]
  cuisines: [
    "Café",
    "Coffee",
    "Pizza",
    "Pasta",
    "Burger",
    "Italian",
    "Continental",
    "Desserts",
  ],
  priceRange: "₹₹",

  // Community [VERIFIED-IG]
  instagram: "https://www.instagram.com/papiliocafe.in/",
  instagramHandle: "@papiliocafe.in",
  igCommunity: "1.4K Instagram community",
  igPosts: "238 posts",
} as const;

// ---------------------------------------------------------------- Deep links

export const links = {
  swiggy: "https://www.swiggy.com/rest772389",
  zomato: "https://www.zomato.com/hanamkonda/restaurants?q=Papilio",
  /** Verified Maps link from the IG bio. */
  maps: "https://maps.app.goo.gl/1XtNY2A9b6VQUNMj7",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=17.9962,79.5379",
  mapsEmbed:
    "https://www.google.com/maps?q=17.9962,79.5379&z=17&output=embed",
  phone: `tel:${site.phone}`,
} as const;

/** Build a WhatsApp deep link with prefilled text. */
export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const whatsappMessages = {
  general: "Hi Papilio! I'd like to make an enquiry.",
  cake: "Hi Papilio! I'd like to enquire about a custom/celebration cake.",
  gifting: "Hi Papilio! I'd like to enquire about a gifting order.",
  booking: "Hi Papilio! I'd like to make a booking.",
} as const;

// ---------------------------------------------------------------- Navigation

export const navItems = [
  { href: "/menu", label: "Menu" },
  { href: "/patisserie", label: "Patisserie" },
  { href: "/gallery", label: "Gallery" },
  { href: "/story", label: "Story" },
  { href: "/visit", label: "Visit" },
] as const;
