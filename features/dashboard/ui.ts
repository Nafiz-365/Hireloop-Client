/**
 * Shared dashboard class constants — Figma tokens that would otherwise be
 * copy-pasted across screens. Merge with `cn()` so a call-site override
 * passed last wins.
 */

/** Primary purple CTA (Figma `#5c53fe`), used on all three dashboards. */
export const primaryButtonClass =
  "h-9 gap-2 rounded-[10px] bg-[#5c53fe] px-4 text-white hover:bg-[#4a42f0]"
