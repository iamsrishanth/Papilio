import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/content/faq";

/**
 * FaqAccordion — Radix accordion restyled onto the Papilio card system
 * (ivory card, linen hairlines, Playfair questions, caramel chevron).
 * Keyboard + screen-reader accessible out of the box via Radix.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="rounded-card bg-ivory p-2 shadow-card sm:p-4"
    >
      {faqs.map((faq, i) => (
        <AccordionItem
          key={faq.q}
          value={`faq-${i}`}
          className="border-linen last:border-b-0"
        >
          <AccordionTrigger className="rounded-[10px] px-3 py-4 font-display text-[1.1rem] font-medium leading-snug text-espresso hover:no-underline hover:text-caramel sm:text-[1.15rem]">
            <span className="flex items-baseline gap-3">
              <span className="tnum text-xs font-semibold text-caramel" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              {faq.q}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-5 pl-10 text-sm leading-relaxed text-cocoa sm:text-[0.95rem]">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
