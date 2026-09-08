"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Copy, X } from "lucide-react";
import Image, { getImageProps } from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GalleryPhoto } from "@/content/gallery";
import { cn } from "@/lib/utils";

/**
 * PhotoLightbox — full-size photo viewer built on the shadcn Dialog.
 * Radix supplies the focus trap, ESC-to-close and scroll lock; arrow
 * keys navigate. Counter uses tabular numerals. A quiet "copy caption"
 * pill puts the caption on the clipboard (handy for crediting a photo
 * when reposting) with an inline confirmation swap.
 */
/** Shared sizes — the preload mirrors the live <Image> exactly. */
const LIGHTBOX_SIZES = "(max-width: 767px) 92vw, 1000px";

export function PhotoLightbox({
  photos,
  index,
  onIndexChange,
  className,
}: {
  photos: GalleryPhoto[];
  /** null = closed; otherwise the index of the open photo. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
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

  // Preload the NEXT photo with the exact optimized URL/sizes the
  // <Image> below will request (getImageProps mirrors its loader), so
  // arrow-key and swipe navigation swaps instantly instead of
  // re-fetching. Implemented as <link rel=preload as=image
  // imagesrcset/imagesizes> — set via setAttribute because the
  // .imageSrcSet IDL property is not honored for dynamically inserted
  // links (verified in Chromium). The link is removed on cleanup; the
  // fetched variant stays in the HTTP cache.
  React.useEffect(() => {
    if (index === null || total < 2) return;
    const next = photos[(index + 1) % total];
    if (!next) return;
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
    return () => {
      link.remove();
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

  // Copy caption — clipboard API with a hidden-textarea fallback for
  // non-secure contexts. Inline confirmation reverts after ~2s.
  const [captionCopied, setCaptionCopied] = React.useState(false);
  // A fresh photo means a fresh clipboard confirmation state.
  React.useEffect(() => {
    setCaptionCopied(false);
  }, [activeIndex]);
  const captionTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (captionTimer.current) clearTimeout(captionTimer.current);
    };
  }, []);

  const copyCaption = async () => {
    if (!photo) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(photo.caption);
      } else {
        const ta = document.createElement("textarea");
        ta.value = photo.caption;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCaptionCopied(true);
      if (captionTimer.current) clearTimeout(captionTimer.current);
      captionTimer.current = setTimeout(() => setCaptionCopied(false), 2000);
    } catch {
      // Clipboard blocked — keep the label unchanged, no false feedback.
    }
  };

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
