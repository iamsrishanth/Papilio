"use client";

import dynamic from "next/dynamic";

const BackToTop = dynamic(
  () => import("@/components/site/back-to-top").then((m) => m.BackToTop),
  { ssr: false }
);

const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((m) => m.Toaster),
  { ssr: false }
);

export function ClientProviders() {
  return (
    <>
      <BackToTop />
      <Toaster position="bottom-center" offset={20} />
    </>
  );
}
