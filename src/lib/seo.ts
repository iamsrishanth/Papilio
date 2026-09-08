import { SITE_URL } from "@/content/site";

/**
 * SEO structured-data helpers. All URLs are absolute (schema.org requires
 * absolute item URLs for BreadcrumbList).
 */

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...items.map((entry, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: entry.name,
        item: `${SITE_URL}${entry.path}`,
      })),
    ],
  };
}
