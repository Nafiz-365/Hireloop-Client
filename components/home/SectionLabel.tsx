import { spaceMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"

/**
 * Figma eyebrow: 8×8 #5c53fe square · label · 8×8 square.
 * Used above every section H2 (Smart job discovery / features job / Pricing).
 */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <span aria-hidden="true" className="size-2 shrink-0 bg-[#5c53fe]" />
      <span
        className={cn(
          spaceMono.className,
          "text-center text-lg leading-[1.2] whitespace-nowrap text-white/80 sm:text-xl"
        )}
      >
        {children}
      </span>
      <span aria-hidden="true" className="size-2 shrink-0 bg-[#5c53fe]" />
    </div>
  )
}
