"use client";

import * as React from "react";
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
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-shown");
            entry.target.classList.remove("reveal-hidden");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "60px 0px" }
    );

    elements.forEach((el) => {
      el.classList.add("reveal-hidden");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <BackToTop />
      <Toaster position="bottom-center" offset={20} />
    </>
  );
}
