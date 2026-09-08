import { cn } from "@/lib/utils";

/**
 * badge-label — linen pill for section eyebrows and dietary tags.
 */
export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label-caps inline-flex items-center rounded-pill bg-linen px-3 py-1.5 text-espresso",
        className
      )}
    >
      {children}
    </span>
  );
}
