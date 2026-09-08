"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
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
 * keys navigate. Counter uses tabular numerals.
 */
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
            sizes="(max-width: 767px) 92vw, 1000px"
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
