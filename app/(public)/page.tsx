import Image from "next/image"

import { Hero } from "@/features/home/components/Hero"
import { Stats } from "@/features/home/components/Stats"
import { JobsPreview } from "@/features/jobs/components/JobsPreview"
import { Features } from "@/features/home/components/Features"
import { PricingSection } from "@/features/pricing/components/PricingSection"
import { Cta } from "@/features/home/components/Cta"
import { Footer } from "@/components/layout/Footer"

/**
 * Figma: Design → Homepage (12022:10424, 1440×5466, #010103).
 *
 * Layer order mirrors the Figma children stack (back → front):
 *   globe composite → sections → purple glow → footer → grid veil → CTA content.
 */
export default function Page() {
  return (
    <main className="relative isolate -mt-22 overflow-x-clip bg-[#010103] text-white sm:-mt-26">
      {/* Hero composite background (Figma "Group 1": magenta/purple glows + globe) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto w-full"
      >
        <Image
          src="/images/globe.png"
          alt=""
          width={1440}
          height={1882}
          priority
          className="h-auto w-full"
        />
      </div>

      <div className="relative z-10">
        <Hero />
        <Stats />
        <JobsPreview />
        <Features />
        <PricingSection />

        {/* CTA + footer block (Figma y4502–5466) */}
        <div className="relative isolate mt-0 overflow-hidden xl:mt-5">
          {/* Purple radial glow (Figma ELLIPSE 12022:10749) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 z-0 h-260 w-374 max-w-none -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse 42.72% 42.72% at 50% 0%, rgba(92,83,254,1) 0%, rgba(92,83,254,0.6) 29%, rgba(92,83,254,0.5) 52%, rgba(92,83,254,0) 100%)",
              clipPath: "ellipse(54% 50% at 50% 50%)",
            }}
          />

          <Cta />
          <Footer />

          {/* BG grid veil (Figma "BG Grid": lines + dark gradient, 0.5 opacity
              baked into the PNG alpha) — sits above the footer, below the CTA */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
          >
            <Image
              src="/images/cta-bg.png"
              alt=""
              width={1440}
              height={964}
              unoptimized
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
