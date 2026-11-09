"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { JobCard } from "./JobCard"
import { SectionLabel } from "./SectionLabel"
import { instrumentSans, manrope } from "@/lib/fonts"
import { cn } from "@/lib/utils"

/* Figma: Frame 2147234472 — label + H2, 6 Job List Cards, centered CTA */
export function Jobs() {
  return (
    <section className="pt-16 pb-16 xl:pt-30 xl:pb-30">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10 xl:px-15">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionLabel>Smart job discovery</SectionLabel>
          <h2
            className={cn(
              manrope.className,
              "max-w-122 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-white sm:text-[40px] xl:text-[48px]"
            )}
          >
            The roles you&apos;d never find by searching
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <JobCard key={i} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            render={<Link href="/jobs" />}
            nativeButton={false}
            className={cn(
              instrumentSans.className,
              "h-14 rounded-[12px] border border-[#090a15]/10 bg-white px-6 text-lg leading-[1.45] font-medium text-[#0b0b14] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-white hover:text-[#0b0b14]"
            )}
          >
            View all job open
          </Button>
        </div>
      </div>
    </section>
  )
}
