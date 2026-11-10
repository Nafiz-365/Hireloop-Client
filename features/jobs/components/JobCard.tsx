import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/common/Icon"
import { inter, interTight, manrope } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import type { JobTag } from "../types"

const defaultTags: JobTag[] = [
  { icon: "/icons/jc-location.svg", text: "New York, USA" },
  { icon: "/icons/jc-briefcase.svg", text: "Hybrid" },
  { icon: "/icons/jc-dollar.svg", text: "€25–€40/hour" },
]

export interface JobCardProps {
  title?: string
  description?: string
  tags?: JobTag[]
  applyHref?: string
}

export function JobCard({
  title = "Frontend Developer",
  description = "Showcase your commitment to diversity and inclusion by highlighting initiatives",
  tags = defaultTags,
  applyHref = "/jobs",
}: JobCardProps) {
  return (
    <article className="flex flex-col rounded-[24px] bg-[#151516] pt-8 pr-6 pb-6 pl-6 xl:h-90">
      <div className="flex flex-col gap-3">
        <h3
          className={cn(
            inter.className,
            "text-[26px] leading-[1.3] font-medium tracking-tighter text-white sm:text-[32px]"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            inter.className,
            "text-base leading-[1.7] tracking-[-0.02em] text-white/60"
          )}
        >
          {description}
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
        render={<Link href={applyHref} />}
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
