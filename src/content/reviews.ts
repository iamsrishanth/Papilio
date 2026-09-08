/**
 * Verified review quotes and press lines (PROMPT.md §8).
 * Verbatim — do not edit.
 */

export type VerifiedQuote = {
  quote: string;
  source: string;
};

export const verifiedQuotes: VerifiedQuote[] = [
  {
    quote: "Excellent ambience and tasty food.",
    source: "Google review, via Restaurant Guru",
  },
  {
    quote:
      "The food tasted fresh and flavorful, especially the snacks and coffee which were served beautifully… peaceful atmosphere… a perfect spot to hang out with friends or spend some quality time alone.",
    source: "Google review, via Restaurant Guru",
  },
];

export const pressLine: VerifiedQuote = {
  quote:
    "New premium cafe in Warangal… best cafe vibes with authentic ambiance and pleasant music… perfect place to vibe with your friends and family",
  source: "Launch reel, October 2023",
};

/** Owner reply tone anchor (DESIGN.md Voice & Copy) — verbatim. */
export const ownerVoiceLine =
  "Really happy to know you had such a good experience at PAPILIO… we always want people to feel relaxed, comfortable, and enjoy good food with a peaceful vibe";
