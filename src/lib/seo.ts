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

/**
 * ImageObject ItemList for the gallery — every photo with its verified
 * caption (name), descriptive alt (description) and intrinsic pixel
 * size. No creator/license fields: the photography is representative
 * placeholder art until the client's own feed photos are swapped in.
 */
export function galleryImagesLd(
  photos: { src: string; alt: string; caption: string; width: number; height: number }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: photos.map((photo, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "ImageObject",
        contentUrl: `${SITE_URL}${photo.src}`,
        name: photo.caption,
        description: photo.alt,
        width: photo.width,
        height: photo.height,
      },
    })),
  };
}
