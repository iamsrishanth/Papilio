import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Array<{ path: string; priority: number; freq: string }> = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/menu", priority: 0.9, freq: "weekly" },
    { path: "/patisserie", priority: 0.8, freq: "monthly" },
    { path: "/gallery", priority: 0.6, freq: "monthly" },
    { path: "/story", priority: 0.5, freq: "yearly" },
    { path: "/visit", priority: 0.8, freq: "monthly" },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: r.priority,
  }));
}
