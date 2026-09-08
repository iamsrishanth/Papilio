"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CopyButton — copies text to the clipboard with an inline "Copied"
 * confirmation (icon + label swap, reverts after ~2s). Falls back to a
 * hidden textarea when the Clipboard API is unavailable (non-secure
 * contexts). Never a primary CTA — render it as a quiet tertiary pill.
 */
export function CopyButton({
  text,
  label = "Copy address",
  copiedLabel = "Copied",
  className,
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-secure contexts (plain HTTP)
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
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — keep the label unchanged, no false feedback.
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-live="polite"
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-pill border border-linen bg-transparent px-5 py-3 text-sm font-semibold text-cocoa transition-colors hover:border-caramel hover:text-caramel",
        copied && "border-caramel text-caramel",
        className
      )}
      {...(copied ? { "aria-label": `${copiedLabel} — ${label}` } : {})}
    >
      {copied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      {copied ? copiedLabel : label}
    </button>
  );
}
