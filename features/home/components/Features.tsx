import { Icon } from "@/components/common/Icon"
import { SectionLabel } from "@/components/common/SectionLabel"
import { interTight, manrope } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { features } from "../data/features"

/* Same gradient as the stats cards (12.22% → 177.27%) */
const boxGradient =
  "bg-[linear-gradient(180deg,#010102_12.22%,#313131_177.27%)]"

export function Features() {
  return (
    <section className="bg-[#151516] pt-16 pb-16 xl:pt-30 xl:pb-30">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10 xl:px-15">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionLabel>features job</SectionLabel>
          <h2
            className={cn(
              manrope.className,
              "max-w-122 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-white sm:text-[40px] xl:text-[48px]"
            )}
          >
            Everything you need to succeed
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-6">
              <div
                className={cn(
                  boxGradient,
                  "grid size-20 shrink-0 place-items-center rounded-[8px] border border-white/10"
                )}
              >
                <Icon src={feature.icon} size={32} />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <h3
                  className={cn(
                    interTight.className,
                    "text-lg leading-[1.4] font-medium text-white"
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    interTight.className,
                    "text-base leading-[1.65] text-white/70"
                  )}
                >
                  {feature.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
