/**
 * Gallery content — descriptive alt text and captions for every photo
 * (DESIGN.md Imagery: "Papilio patisserie counter with…", never
 * "IMG_2043"). `tall` marks portrait shots; width/height are intrinsic
 * pixels so next/image can reserve layout space.
 *
 * `tags` group photos into browsable subjects — descriptive categories
 * only (no business claims): the room, coffee & tables, the patisserie
 * and the oven. A photo may belong to more than one subject.
 */

/** Browsable photo subjects (filter chips on /gallery). */
export type GalleryTag = "room" | "coffee" | "patisserie" | "oven";

export const galleryTagLabels: { id: GalleryTag; label: string }[] = [
  { id: "room", label: "The room" },
  { id: "coffee", label: "Coffee & tables" },
  { id: "patisserie", label: "Patisserie" },
  { id: "oven", label: "From the oven" },
];

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Portrait orientation — hints ordering for the masonry columns. */
  tall?: boolean;
  /** Subjects this photo belongs to (see GalleryTag). */
  tags: GalleryTag[];
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/gallery-interior.png",
    alt: "The Papilio café interior with warm hanging lamps, wooden furniture and plants in golden afternoon light",
    caption: "The room at Papilio — warm light, wood and plants.",
    width: 1152,
    height: 864,
    tags: ["room"],
  },
  {
    src: "/images/gallery-coffee-pour.png",
    alt: "A barista pouring steamed milk into latte art at the wooden bar counter, steam rising",
    caption: "Steamed milk meeting espresso at the bar.",
    width: 864,
    height: 1152,
    tall: true,
    tags: ["coffee"],
  },
  {
    src: "/images/gallery-dessert-plate.png",
    alt: "Plated crème brûlée with fresh berries and mint on an ivory plate with a gold dessert spoon",
    caption: "Crème brûlée, plated — torched sugar and berries.",
    width: 1024,
    height: 1024,
    tags: ["patisserie"],
  },
  {
    src: "/images/gallery-seating.png",
    alt: "A quiet corner of Papilio with two armchairs, a small marble table with coffee cups and a bookshelf",
    caption: "A quiet corner for long conversations.",
    width: 768,
    height: 1344,
    tall: true,
    tags: ["room"],
  },
  {
    src: "/images/patisserie-counter.png",
    alt: "The patisserie counter at Papilio with rows of macarons, tarts, éclairs and cream desserts under warm display lighting",
    caption: "The patisserie counter — rows of macarons and cream desserts.",
    width: 1152,
    height: 864,
    tags: ["patisserie"],
  },
  {
    src: "/images/gallery-facade.png",
    alt: "The Papilio storefront on a warm evening — cream facade, wooden-framed glass door and potted plants",
    caption: "The Excise Colony storefront at dusk.",
    width: 864,
    height: 1152,
    tall: true,
    tags: ["room"],
  },
  {
    src: "/images/gallery-baking.png",
    alt: "A baker's hands piping delicate cream rosettes onto pastries in the warm Papilio kitchen",
    caption: "Piping rosettes — the patisserie at work.",
    width: 1024,
    height: 1024,
    tags: ["patisserie", "oven"],
  },
  {
    src: "/images/gallery-spread.png",
    alt: "A café table from above with two cappuccinos, a slice of cake, a plate of macarons and a small flower vase",
    caption: "A table set for two.",
    width: 1152,
    height: 864,
    tags: ["coffee"],
  },
  {
    src: "/images/patisserie-signature-cake.png",
    alt: "A whole chocolate truffle cream cake with glossy ganache drips and whipped cream swirls on a ceramic cake stand",
    caption: "The signature chocolate truffle cake.",
    width: 1024,
    height: 1024,
    tags: ["patisserie"],
  },
  {
    src: "/images/gallery-focaccia.png",
    alt: "Freshly baked golden focaccia with herbs and sea salt on a wooden board",
    caption: "Focaccia, straight from the oven.",
    width: 1152,
    height: 864,
    tags: ["oven"],
  },
  {
    src: "/images/patisserie-gifting.png",
    alt: "A Papilio gift box of assorted macarons and small patisserie tied with a caramel satin ribbon on linen",
    caption: "A gift box, ready for giving.",
    width: 1024,
    height: 1024,
    tags: ["patisserie"],
  },
];
