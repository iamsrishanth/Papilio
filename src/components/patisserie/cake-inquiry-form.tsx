"use client";

import * as React from "react";
import { CakeSlice, MessageCircle, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { CtaButton } from "@/components/site/cta-button";
import { whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * CakeInquiryForm — a message composer, not a form backend.
 *
 * The café's verified instruction for custom cakes is "DM us for orders
 * and bookings" over WhatsApp; this widget just helps a guest compose
 * that message (occasion, date, servings, notes) before it opens the
 * wa.me thread. Nothing is submitted, stored or sent from the site —
 * the button is simply a deep link with the composed text prefilled.
 *
 * All fields are optional: the base greeting always stands alone, so
 * the send action is never blocked. No lead times, flavours or price
 * claims are offered — those are worked out in the conversation.
 */

/** Occasions are generic inquiry categories, not product claims. */
const occasions = ["Birthday", "Anniversary", "Celebration", "Other"] as const;

/** "14 Sep 2026" — en-IN short; falls back to the raw input value. */
function formatFriendlyDate(value: string): string | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  try {
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

const baseGreeting =
  "Hi Papilio! I'd like to enquire about a custom cake.";

export function CakeInquiryForm({
  className,
  validCakes = [],
}: {
  className?: string;
  /** Whole-cake names (from the menu module) that /patisserie?cake=
   * may prefill — anything else in the URL is ignored. */
  validCakes?: string[];
}) {
  const [occasion, setOccasion] = React.useState<string | null>(null);
  const [date, setDate] = React.useState("");
  const [serves, setServes] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [cakeInMind, setCakeInMind] = React.useState<string | null>(null);

  // Deep link: /patisserie?cake=<name> (the “Ask about this cake” links
  // on the whole-cake cards above) seeds a removable “cake in mind”
  // chip — the one line the guest already knows. STICKY by design: an
  // absent param never clears the chip (late router re-reads can't undo
  // it), and an invalid name is ignored rather than guessed. A NEW
  // valid name replaces the chip — that click is fresh intent.
  const searchParams = useSearchParams();
  const cakeParam = searchParams.get("cake");
  const validCakesKey = validCakes.join("|");
  React.useEffect(() => {
    if (!cakeParam) return;
    const wanted = cakeParam.trim().toLowerCase();
    const match = validCakesKey
      .split("|")
      .find((n) => n.toLowerCase() === wanted);
    if (match) setCakeInMind(match);
  }, [cakeParam, validCakesKey]);

  // Past dates make no sense for an inquiry — gate the picker at today.
  const today = React.useMemo(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  // The exact message that will open in WhatsApp.
  const message = React.useMemo(() => {
    const lines = [baseGreeting];
    if (cakeInMind) lines.push(`Cake in mind: ${cakeInMind}`);
    if (occasion) lines.push(`Occasion: ${occasion}`);
    const friendly = formatFriendlyDate(date);
    if (friendly) lines.push(`Date needed: ${friendly}`);
    const servesNum = Number.parseInt(serves, 10);
    if (Number.isFinite(servesNum) && servesNum > 0) {
      lines.push(`Serves: ${servesNum}`);
    }
    const trimmed = notes.trim();
    if (trimmed) lines.push(`Notes: ${trimmed}`);
    return lines.join("\n");
  }, [cakeInMind, occasion, date, serves, notes]);

  const inputClasses =
    "h-11 w-full rounded-tag border border-linen bg-ivory px-3.5 text-sm text-espresso placeholder:text-cocoa/50 transition-colors focus-visible:border-caramel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel/30";

  return (
    <div
      className={cn(
        "rounded-card border border-linen bg-ivory p-6 shadow-card sm:p-8",
        className
      )}
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* ------------------------------------------- Fields */}
        <div className="space-y-6">
          {/* Seeded from ?cake= — removable so the deep link can be
              undone without clearing what the guest has typed. Label
              and name are stacked deliberately: cake names stay on one
              clean line at 390px instead of breaking mid-name. */}
          {cakeInMind ? (
            <div
              role="group"
              aria-label="Cake in mind"
              className="flex items-center gap-3 rounded-pill border border-linen bg-linen/50 py-1.5 pl-4 pr-1"
            >
              <CakeSlice
                className="size-4 shrink-0 text-caramel"
                aria-hidden="true"
              />
              <p className="min-w-0 flex-1 py-1">
                <span className="label-caps block text-cocoa/85">
                  Cake in mind
                </span>
                <span className="font-display block truncate text-[0.95rem] font-medium text-espresso">
                  {cakeInMind}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setCakeInMind(null)}
                aria-label="Remove cake in mind"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-pill text-cocoa/70 transition-colors hover:bg-ivory hover:text-caramel"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}

          <fieldset>
            <legend className="mb-2.5 text-sm font-semibold text-espresso">
              The occasion
              <span className="ml-1.5 text-xs font-normal text-cocoa/85">
                optional
              </span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {occasions.map((o) => {
                const active = occasion === o;
                return (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setOccasion(active ? null : o)}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-pill border px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "border-caramel bg-linen text-espresso"
                        : "border-linen bg-ivory text-cocoa hover:border-caramel hover:text-caramel"
                    )}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cake-date"
                className="mb-1.5 block text-sm font-semibold text-espresso"
              >
                Date needed
                <span className="ml-1.5 text-xs font-normal text-cocoa/85">
                  optional
                </span>
              </label>
              <input
                id="cake-date"
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={cn(inputClasses, "tnum")}
              />
            </div>
            <div>
              <label
                htmlFor="cake-serves"
                className="mb-1.5 block text-sm font-semibold text-espresso"
              >
                Roughly serves
                <span className="ml-1.5 text-xs font-normal text-cocoa/85">
                  optional
                </span>
              </label>
              <input
                id="cake-serves"
                type="number"
                inputMode="numeric"
                min={1}
                max={999}
                placeholder="e.g. 12"
                value={serves}
                onChange={(e) => {
                  // Keep digits only — the message guards the value too.
                  setServes(e.target.value.replace(/[^0-9]/g, "").slice(0, 3));
                }}
                className={cn(inputClasses, "tnum")}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="cake-notes"
              className="mb-1.5 block text-sm font-semibold text-espresso"
            >
              Anything else
              <span className="ml-1.5 text-xs font-normal text-cocoa/85">
                optional
              </span>
            </label>
            <textarea
              id="cake-notes"
              rows={3}
              placeholder="Design thoughts, flavours you love, pickup time…"
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 500))}
              className={cn(inputClasses, "h-auto resize-y py-2.5")}
            />
            <p className="tnum mt-1.5 text-right text-xs text-cocoa/75">
              {notes.length}/500
            </p>
          </div>
        </div>

        {/* ------------------------------------------- Live preview */}
        <div className="flex flex-col">
          <p className="label-caps mb-2.5 text-cocoa">
            What opens in WhatsApp
          </p>
          <div className="relative flex-1 rounded-card bg-surface-espresso p-5 shadow-card">
            {/* butter wing glow — same CSS-only ambience as the page's
                espresso surfaces */}
            <div
              aria-hidden="true"
              className="absolute -top-2 -right-2 h-16 w-16 rounded-full bg-butter/10 blur-xl"
            />
            <p
              aria-hidden="true"
              className="text-[0.65rem] font-semibold tracking-wider text-butter/70 uppercase"
            >
              To Papilio · +91 90003 16366
            </p>
            {/* aria-hidden: the preview mirrors fields the user just
                typed — a live region would chatter on every keystroke.
                Screen-reader users can navigate here like any text. */}
            <pre
              aria-hidden="true"
              className="mt-2.5 whitespace-pre-wrap font-sans text-sm leading-relaxed break-words text-cream/90"
            >
              {message}
            </pre>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-cocoa/80">
            Opens WhatsApp with this message prefilled — nothing is sent
            from the site. Details like design, flavours and pricing are
            worked out in the conversation.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-linen pt-6">
        {/* The page's single filled primary action (the band above now
            links here with a quiet secondary). */}
        <CtaButton variant="primary" href={whatsappLink(message)}>
          <MessageCircle className="size-4" aria-hidden="true" />
          Send inquiry on WhatsApp
        </CtaButton>
        {(cakeInMind || occasion || date || serves || notes.trim()) && (
          <button
            type="button"
            onClick={() => {
              setCakeInMind(null);
              setOccasion(null);
              setDate("");
              setServes("");
              setNotes("");
            }}
            className="inline-flex min-h-11 items-center rounded-pill px-4 py-2 text-sm font-semibold text-cocoa transition-colors hover:text-caramel"
          >
            Clear fields
          </button>
        )}
      </div>
    </div>
  );
}
