import { Icon } from "./Icon"
import { instrumentSans, interTight, plusJakartaSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

/* Figma: Frame 2147234448 — heading + 4× Stats cards (312×254, r16) */
const stats = [
  { icon: "/icons/stat-job-search.svg", value: "50K", label: "Active Jobs" },
  { icon: "/icons/stat-ranking.svg", value: "12K", label: "Companies" },
  { icon: "/icons/stat-job-man.svg", value: "2M", label: "Job Seekers" },
  {
    icon: "/icons/stat-star.svg",
    value: "97%",
    label: "Satisfication Rate",
  },
]

/* Figma: GRADIENT_LINEAR #010102 → #313131, 12.22% → 177.27% (top → bottom) */
const cardGradient =
  "bg-[linear-gradient(180deg,#010102_12.22%,#313131_177.27%)]"

export function Stats() {
  return (
    <section className="pt-16 pb-16 xl:pt-18 xl:pb-18">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10 xl:px-15">
        <h2
          className={cn(
            instrumentSans.className,
            "mx-auto max-w-150 text-center text-[28px] leading-[1.3] font-medium tracking-[-1px] text-white/70 sm:text-[32px] xl:text-[40px]"
          )}
        >
          Assisting over 15,000 job seekers find their dream positions.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                cardGradient,
                "flex min-h-64 flex-col rounded-[16px] border border-white/10 p-6"
              )}
            >
              <Icon src={stat.icon} size={24} />
              <div className="mt-auto flex flex-col gap-4">
                <span
                  className={cn(
                    plusJakartaSans.className,
                    "text-[40px] leading-[1.15] font-semibold tracking-[-0.02em] text-white xl:text-[56px]"
                  )}
                >
                  {stat.value}
                </span>
                <span
                  className={cn(
                    interTight.className,
                    "text-lg leading-[1.65] text-white"
                  )}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
