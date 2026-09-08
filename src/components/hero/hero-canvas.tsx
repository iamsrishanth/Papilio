"use client";

import dynamic from "next/dynamic";

/**
 * Dynamic mount for Scene A — three.js loads as a separate chunk
 * (≤150KB gz budget) and only hydrates on the client. The server-rendered
 * poster beneath stays visible until the canvas paints its first frame.
 */
const PapilioHero3D = dynamic(
  () => import("@/components/hero/papilio-hero-3d"),
  { ssr: false, loading: () => null }
);

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <PapilioHero3D />
    </div>
  );
}
