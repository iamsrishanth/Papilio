"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Copy, Link2, X } from "lucide-react";
import Image, { getImageProps } from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GalleryPhoto } from "@/content/gallery";
import { galleryTagLabels } from "@/content/gallery";
import { cn } from "@/lib/utils";

/**
 * PhotoLightbox — full-size photo viewer built on the shadcn Dialog.
 * Radix supplies the focus trap, ESC-to-close and scroll lock; arrow
 * keys navigate; a filmstrip of thumbnails (sm+) offers direct jumps.
 * Counter uses tabular numerals. The photo's subject tags render as
 * small butter-on-espresso chips under the caption, and two quiet
 * clipboard actions close the footer: "copy caption" (for crediting
 * a repost) and "copy link" (the /gallery?tag=…&photo=n deep link
 * that reopens this exact photo) — both confirm inline.
 */
/** Shared sizes — the preload mirrors the live <Image> exactly. */
const LIGHTBOX_SIZES = "(max-width: 767px) 92vw, 1000px";

export function PhotoLightbox({
  photos,
  index,
  onIndexChange,
  shareUrl,
  className,
}: {
  photos: GalleryPhoto[];
  /** null = closed; otherwise the index of the open photo. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
  /** Deep link for the open photo (?tag=…&photo=n); renders the
   * "Copy link" action when provided. */
  shareUrl?: string | null;
  className?: string;
}) {
  const open = index !== null;
  const total = photos.length;

  // Keep the last photo rendered during the close animation.
  const [lastIndex, setLastIndex] = React.useState(0);
  React.useEffect(() => {
    if (index !== null) setLastIndex(index);
  }, [index]);

  const activeIndex =
    index !== null ? index : Math.min(lastIndex, Math.max(total - 1, 0));
  const photo = photos[activeIndex];

  const goPrev = React.useCallback(() => {
    if (index === null || total === 0) return;
    onIndexChange((index - 1 + total) % total);
  }, [index, total, onIndexChange]);

  const goNext = React.useCallback(() => {
    if (index === null || total === 0) return;
    onIndexChange((index + 1) % total);
  }, [index, total, onIndexChange]);

  // Preload the NEIGHBOURING photos (next AND previous) with the exact
  // optimized URL/sizes the <Image> below will request (getImageProps
  // mirrors its loader), so arrow-key and swipe navigation swaps
  // instantly in BOTH directions instead of re-fetching. Implemented
  // as <link rel=preload as=image imagesrcset/imagesizes> — set via
  // setAttribute because the .imageSrcSet IDL property is not honored
  // for dynamically inserted links (verified in Chromium). Links are
  // removed on cleanup; the fetched variants stay in the HTTP cache.
  React.useEffect(() => {
    if (index === null || total < 2) return;
    const links: HTMLLinkElement[] = [];
    const neighbours = [
      (index + 1) % total,
      (index - 1 + total) % total,
    ];
    for (const n of neighbours) {
      const next = photos[n];
      if (!next || n === index) continue;
      const { props } = getImageProps({
        src: next.src,
        alt: "",
        width: next.width,
        height: next.height,
        sizes: LIGHTBOX_SIZES,
      });
      const srcSet = typeof props.srcSet === "string" ? props.srcSet : "";
      const link = document.createElement("link");
      link.setAttribute("rel", "preload");
      link.setAttribute("as", "image");
      if (typeof props.src === "string") {
        // href doubles as the fallback for engines without imagesrcset
        link.setAttribute("href", props.src);
      }
      if (srcSet) {
        link.setAttribute("imagesrcset", srcSet);
        link.setAttribute("imagesizes", LIGHTBOX_SIZES);
      }
      document.head.appendChild(link);
      links.push(link);
    }
    return () => {
      for (const link of links) link.remove();
    };
  }, [index, photos, total]);

  // Touch swipe — horizontal flicks navigate, vertical drags keep
  // scrolling the dialog. 48px threshold with a 64px vertical gate.
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || index === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dy) < 64) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  // Copy actions — clipboard API with a hidden-textarea fallback for
  // non-secure contexts. Inline confirmations revert after ~2s.
  const [captionCopied, setCaptionCopied] = React.useState(false);
  const [linkCopied, setLinkCopied] = React.useState(false);
  const captionTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const linkTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // A fresh photo means a fresh clipboard confirmation state.
  React.useEffect(() => {
    setCaptionCopied(false);
    setLinkCopied(false);
  }, [activeIndex]);

  React.useEffect(() => {
    return () => {
      if (captionTimer.current) clearTimeout(captionTimer.current);
      if (linkTimer.current) clearTimeout(linkTimer.current);
    };
  }, []);

  const writeClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  const copyCaption = async () => {
    if (!photo) return;
    try {
      await writeClipboard(photo.caption);
      setCaptionCopied(true);
      if (captionTimer.current) clearTimeout(captionTimer.current);
      captionTimer.current = setTimeout(() => setCaptionCopied(false), 2000);
    } catch {
      // Clipboard blocked — keep the label unchanged, no false feedback.
    }
  };

  // Copy deep link — mirrors the caption action's confirmation swap.
  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await writeClipboard(shareUrl);
      setLinkCopied(true);
      if (linkTimer.current) clearTimeout(linkTimer.current);
      linkTimer.current = setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard blocked — keep the label unchanged, no false feedback.
    }
  };

  // Filmstrip wayfinding: keep the ACTIVE thumbnail in view — the
  // strip overflows on narrow viewports, and arrow-key navigation
  // could otherwise move the active thumb off-screen. Computed
  // scrollLeft (centered) instead of scrollIntoView so no ancestor
  // (the dialog, the page) gets scrolled as a side effect. Honors
  // prefers-reduced-motion with an instant jump.
  const stripRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (index === null) return;
    const nav = stripRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLButtonElement>(
      "button[aria-current=\"true\"]"
    );
    if (!active) return;
    const target =
      active.offsetLeft + active.offsetWidth / 2 - nav.clientWidth / 2;
    // Clamp to the REAL scroll range — scrollWidth alone would let the
    // guard below compare against values the browser will never keep.
    const max = Math.max(0, nav.scrollWidth - nav.clientWidth);
    const clamped = Math.max(0, Math.min(target, max));
    if (Math.abs(nav.scrollLeft - clamped) < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nav.scrollTo({ left: clamped, behavior: reduced ? "auto" : "smooth" });
  }, [index, activeIndex]);

  if (!photo) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onIndexChange(null);
      }}
    >
      <DialogContent
        showCloseButton={false}
        onKeyDown={handleKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={cn(
          "flex max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] flex-col items-center gap-4 overflow-y-auto rounded-card border-linen bg-surface-espresso p-4 text-cream shadow-modal sm:max-w-[1080px] sm:p-6",
          className
        )}
      >
        <DialogClose
          aria-label="Close"
          className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-pill text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
        >
          <X className="size-5" aria-hidden="true" />
        </DialogClose>

        <div className="flex min-h-0 w-full items-center justify-center">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={LIGHTBOX_SIZES}
            // The open photo is the page's main content (and, for
            // ?photo= deep links, the LCP) — load it eagerly; the
            // retained photo during the close animation is already
            // in cache.
            priority={open}
            className="h-auto max-h-[60vh] w-auto max-w-full rounded-card object-contain sm:max-h-[68vh]"
          />
        </div>

        <div
          aria-live="polite"
          className="flex w-full flex-col items-center gap-3"
        >
          <DialogTitle className="text-center text-base font-medium leading-relaxed text-cream">
            {photo.caption}
          </DialogTitle>

          {/* Subject tags — small butter-on-espresso chips (the lightbox
              surface is deep espresso, so butter accents are DESIGN.md
              legal). Informative only; same labels as the filter. */}
          {photo.tags.length > 0 ? (
            <ul
              className="flex flex-wrap items-center justify-center gap-1.5"
              aria-label="Photo subjects"
            >
              {photo.tags.map((t) => {
                const label =
                  galleryTagLabels.find(({ id }) => id === t)?.label ?? t;
                return (
                  <li
                    key={t}
                    className="rounded-pill border border-cream/20 bg-cream/10 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-butter/80 uppercase"
                  >
                    {label}
                  </li>
                );
              })}
            </ul>
          ) : null}

          <DialogDescription className="sr-only">
            {photo.alt}
          </DialogDescription>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="flex size-11 items-center justify-center rounded-pill border border-cream/25 text-cream transition-colors hover:border-butter hover:text-butter"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <span className="tnum text-sm text-butter">
              {activeIndex + 1} / {total}
            </span>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="flex size-11 items-center justify-center rounded-pill border border-cream/25 text-cream transition-colors hover:border-butter hover:text-butter"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Filmstrip — direct jumps to any photo. Desktop/tablet
              affordance (mobile keeps swipe + arrows; the strip would
              crowd the 390px dialog). Active thumb: butter ring; the
              row scrolls horizontally if the viewport is narrow. */}
          <nav
            ref={stripRef}
            aria-label="Jump to a photo"
            className="hidden w-full justify-center gap-2 overflow-x-auto pt-1 sm:flex"
          >
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => onIndexChange(i)}
                aria-label={`Open photo ${i + 1} of ${total}`}
                aria-current={i === activeIndex || undefined}
                className={cn(
                  "relative size-14 shrink-0 overflow-hidden rounded-tag border transition-opacity",
                  i === activeIndex
                    ? "border-butter opacity-100"
                    : "border-cream/25 opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
                {i === activeIndex ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-tag ring-1 ring-butter ring-offset-0"
                  />
                ) : null}
              </button>
            ))}
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* Explains what "Copy link" does without cluttering the
                visible label (screen readers get the full sentence). */}
            <p id="lightbox-copy-link-hint" className="sr-only">
              Copies a link that reopens this exact photo in the gallery.
            </p>
            <button
              type="button"
              onClick={copyCaption}
              aria-live="polite"
              {...(captionCopied
                ? { "aria-label": "Caption copied" }
                : {})}
              className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-cream/25 px-4 py-2 text-xs font-semibold text-cream/70 transition-colors hover:border-butter hover:text-butter"
            >
              {captionCopied ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                <Copy className="size-3.5" aria-hidden="true" />
              )}
              {captionCopied ? "Copied" : "Copy caption"}
            </button>

            {shareUrl ? (
              <button
                type="button"
                onClick={copyLink}
                aria-live="polite"
                aria-describedby="lightbox-copy-link-hint"
                {...(linkCopied ? { "aria-label": "Link copied" } : {})}
                className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-cream/25 px-4 py-2 text-xs font-semibold text-cream/70 transition-colors hover:border-butter hover:text-butter"
              >
                {linkCopied ? (
                  <Check className="size-3.5" aria-hidden="true" />
                ) : (
                  <Link2 className="size-3.5" aria-hidden="true" />
                )}
                {linkCopied ? "Copied" : "Copy link"}
              </button>
            ) : null}
          </div>

          <p
            className="text-[0.7rem] font-semibold tracking-wide text-cream/45 uppercase sm:hidden"
          >
            Swipe to browse
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
