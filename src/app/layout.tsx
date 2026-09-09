import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/site/skip-link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ClientProviders } from "@/components/site/client-providers";
import { site, links, SITE_URL } from "@/content/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  title: {
    default: "Papilio — Patisserie | Café in Hanamkonda, Warangal",
    template: "%s · Papilio",
  },
  description:
    "Papilio is a cozy patisserie-café in Excise Colony, Hanamkonda, Warangal — cakes and counter desserts, coffee, pizza, pasta and more. Rated 4.3★ by 1,300+ diners. Open daily 8:00 AM – 10:30 PM.",
  keywords: [
    "café in Hanamkonda",
    "patisserie Warangal",
    "Excise Colony café",
    "Papilio café",
    "cakes Hanamkonda",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Papilio — Patisserie | Café in Hanamkonda, Warangal",
    description:
      "A cozy, aesthetic, premium patisserie-café in Excise Colony, Hanamkonda. Rated 4.3★ by 1,300+ diners. Open daily 8:00 AM – 10:30 PM.",
    url: "/",
    siteName: "Papilio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/og-cover-lockup.png",
        width: 1440,
        height: 720,
        alt: "The Papilio swallowtail butterfly glyph on a warm cream-to-espresso backdrop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Papilio — Patisserie | Café in Hanamkonda, Warangal",
    description:
      "A cozy, aesthetic, premium patisserie-café in Excise Colony, Hanamkonda. Rated 4.3★ by 1,300+ diners.",
    images: ["/images/og-cover-lockup.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#faf3e8",
  width: "device-width",
  initialScale: 1,
};

/** CafeOrCoffeeShop structured data — every page (PROMPT.md §10). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "PAPILIO",
  alternateName: "Papilio",
  description:
    "Patisserie-led café in Excise Colony, Hanamkonda — cakes, counter desserts, coffee, pizza, pasta and continental fare.",
  url: SITE_URL,
  telephone: site.phone,
  image: `${SITE_URL}/images/og-cover-lockup.png`,
  priceRange: "₹₹",
  servesCuisine: [...site.cuisines],
  address: {
    "@type": "PostalAddress",
    streetAddress: "H.No. 2-7-741, Excise Colony",
    addressLocality: "Hanamkonda",
    addressRegion: "Telangana",
    postalCode: "506370",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: site.hours.opens,
    closes: site.hours.closes,
  },
  sameAs: [site.instagram, links.swiggy, links.zomato],
  hasMenu: `${SITE_URL}/menu`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SkipLink />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <ClientProviders />
      </body>
    </html>
  );
}
