import {
  Instrument_Sans,
  Inter,
  Inter_Tight,
  Manrope,
  Plus_Jakarta_Sans,
  Rethink_Sans,
  Space_Mono,
} from "next/font/google"

/**
 * Fonts used across the HireLoop homepage (Figma: `hireloop.fig` → Design → Homepage).
 *
 * - Manrope            → H1 (Bold 56), section H2s (SemiBold 48), hero sub, buttons, footer
 * - Instrument Sans    → stats heading (Medium 40), "View all job open" (Medium 18)
 * - Space Mono         → section eyebrow labels (Regular 20)
 * - Plus Jakarta Sans  → stat numbers (SemiBold 56), price titles/amounts
 * - Inter Tight        → stat labels, feature titles, job tags, price duration, footer heads
 * - Inter              → toggle, job card copy, pricing feature copy
 * - Rethink Sans       → CTA heading (Medium 64)
 *
 * The search inputs use Satoshi in Figma, which is not a Google Font — Inter is the
 * closest available substitute.
 */
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
})

export const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
})

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
})

export const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink-sans",
  display: "swap",
})
