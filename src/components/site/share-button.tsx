"use client";

import * as React from "react";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/**
 * ShareButton — native Web Share sheet when available, otherwise a
 * clipboard copy with a sonner toast. Rendered as a quiet tertiary
 * pill (never a primary CTA — DESIGN.md's one-filled-button rule).
 */
export function ShareButton({
  path,
  title,
  text,
  label = "Share",
  copiedToast = "Link copied — share it wherever you like",
  failedToast = "Couldn't copy the link — the address bar still works",
  className,
}: {
  /** Absolute path on this site, e.g. "/menu". */
  path: string;
  title: string;
  text: string;
  label?: string;
  copiedToast?: string;
  failedToast?: string;
  className?: string;
}) {
  const onShare = async () => {
    const url = `${window.location.origin}${path}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return; // the OS sheet closing is its own confirmation
      } catch (err) {
        // User dismissed the sheet — that is not an error worth a toast.
        if (err instanceof DOMException && err.name === "AbortError") return;
        // Real share failures (e.g. no handler) fall through to clipboard.
      }
    }
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for non-secure contexts (plain HTTP)
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      toast.success(copiedToast, { description: url });
    } catch {
      toast.error(failedToast);
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-pill px-4 py-3 text-sm font-semibold text-caramel underline-offset-4 hover:underline",
        className
      )}
    >
      <Share2 className="size-4" aria-hidden="true" />
      {label}
    </button>
  );
}
