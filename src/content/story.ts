import { site } from "./site";

/**
 * Story page content — the narrative of the café, built only from
 * verified facts (see content/site.ts and content/reviews.ts for the
 * tagged sources). Craft and room language reuse the menu's own words
 * and verified review phrases.
 */

export type StoryChapter = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
};

export type StoryFounder = {
  name: string;
  role: string;
};

export type StoryMilestone = {
  label: string;
  title: string;
  detail: string;
};

/** Header intro — est. October 2023, Excise Colony, two crafts. */
export const storyIntro: string[] = [
  "Papilio opened its doors in October 2023, in Excise Colony, Hanamkonda. It was — and is — a two-craft idea: a patisserie and a café under one warm roof.",
  "The name is Latin for swallowtail butterfly, and the story of the place unfolds the way a butterfly does — patiently, then all at once.",
];

/** Narrative chapters: the room, the craft, the founders. */
export const storyChapters: StoryChapter[] = [
  {
    id: "room",
    eyebrow: "The room",
    heading: "A room people describe by feeling",
    paragraphs: [
      "From the opening month, guests have reached for the same few words — cozy, aesthetic, Instagram-worthy decor, a peaceful atmosphere. That is the language of a room that works.",
      "It is set for unhurried hours: coffee with a book, brunch dates with friends, one last dessert from the counter before heading home.",
    ],
  },
  {
    id: "craft",
    eyebrow: "The craft",
    heading: "One menu, two counters",
    paragraphs: [
      "The kitchen side leans continental and reads the way a kitchen thinks — focaccia sandwiches, porcini mushrooms grilled with cheddar, harissa paneer carrying the heat.",
      "The patisserie side is cream and patience: macarons, éclairs, tarts and celebration cakes, with whipped-cream patisserie running through the café's own Instagram feed.",
    ],
  },
  {
    id: "founders",
    eyebrow: "The founders",
    heading: "Two crafts, one roof",
    paragraphs: [
      "Papilio was opened in October 2023 by Radha Suvidha and Chef Siddhartha Reddy — patisserie and kitchen, respectively, as the café's own Instagram bio introduces them.",
      "The tagline there is the shortest version of this story: Patisserie | Café.",
    ],
  },
];

/** Founders, per the café's own Instagram bio. */
export const storyFounders: StoryFounder[] = [
  { name: "Radha Suvidha", role: "Patisserie" },
  { name: "Chef Siddhartha Reddy", role: "Kitchen" },
];

/** Milestones: opening → community → ratings (values from site.ts). */
export const storyTimeline: StoryMilestone[] = [
  {
    label: site.established,
    title: "Papilio opens in Excise Colony",
    detail:
      "H.No. 2-7-741, Excise Colony, Hanamkonda — the doors open on a patisserie-led café.",
  },
  {
    label: site.igCommunity,
    title: `${site.igPosts} and counting`,
    detail:
      "Cakes, gifting and whipped-cream patisserie, shared from @papiliocafe.in.",
  },
  {
    label: "1,300+ ratings",
    title: "4.3★ across Swiggy & Zomato",
    detail: "Rated by diners on both platforms since opening — 4.3★ on each.",
  },
];

/** Copy for the scroll-driven wing unfold section. */
export const unfoldCopy = {
  heading: "Chrysalis to butterfly",
  subline:
    "A café opens the way a butterfly does — slowly, then all at once. Keep scrolling, and the wings open with the page.",
  outro:
    "That is the pace we try to keep — dough given time to rise, custard torched under a glass sugar top, and a room meant for lingering.",
  hint: "Scroll to unfold",
};
