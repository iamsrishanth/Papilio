"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveal — a subtle scroll-into-view fade-up (opacity + 18px translate,
 * 500ms, once). Under prefers-reduced-motion the content renders
 * statically with no animation. Applied sparingly to section headers
 * and card grids — never to the hero (LCP) or the 3D canvas.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "figure" | "li";
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const Tag = motion[as] as React.ElementType;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </Tag>
  );
}
