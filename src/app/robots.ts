import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * robots.txt — allow standard crawlers plus AI crawlers
 * (GPTBot / ClaudeBot / PerplexityBot — AI-crawler surface for a
 * local business, per PROMPT.md §10).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot"],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
