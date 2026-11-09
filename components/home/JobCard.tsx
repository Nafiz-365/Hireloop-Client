"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Icon } from "./Icon"
import { inter, interTight, manrope } from "@/lib/fonts"
import { cn } from "@/lib/utils"

/* Figma: Job List Card (master) — 424×363, #151516, r24. All six homepage
   instances share the default content (no overrides). */
const tags = [
  { icon: "/icons/jc-location.svg", text: "New York, USA" },
  { icon: "/icons/jc-briefcase.svg", text: "Hybrid" },
  { icon: "/icons/jc-dollar.svg", text: "€25–€40/hour" },
]

export function JobCard() {
  return (
    <article className="flex flex-col rounded-[24px] bg-[#151516] pt-8 pr-6 pb-6 pl-6 xl:h-90">
      <div className="flex flex-col gap-3">
        <h3
          className={cn(
            inter.className,
            "text-[26px] leading-[1.3] font-medium tracking-tighter text-white sm:text-[32px]"
          )}
        >
          Frontend Developer
        </h3>
        <p
          className={cn(
            inter.className,
            "text-base leading-[1.7] tracking-[-0.02em] text-white/60"
          )}
        >
          Showcase your commitment to diversity and inclusion by highlighting
          initiatives
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.text}
            className={cn(
              interTight.className,
              "flex h-9 items-center gap-2 rounded-[24px] bg-[#1f1f1f] px-3 text-sm leading-[1.7] font-medium tracking-[0.08em] whitespace-nowrap text-white"
            )}
          >
            <Icon src={tag.icon} size={16} className="shrink-0" />
            {tag.text}
          </span>
        ))}
      </div>

      <Button
        render={<Link href="/jobs" />}
        nativeButton={false}
        className={cn(
          manrope.className,
          "mt-8 h-14 w-fit gap-2 rounded-[12px] bg-transparent px-6 text-base leading-[1.7] font-semibold tracking-[-0.02em] text-white shadow-none hover:bg-white/5 hover:text-white"
        )}
      >
        Apply Now
        <Icon src="/icons/arrow.svg" size={24} />
      </Button>
    </article>
  )
}
