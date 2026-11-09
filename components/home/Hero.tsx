import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icon } from "./Icon"
import { inter, manrope, spaceMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

/* Figma: Frame 1 — 784×64, #101010, stroke #ffffff@0.20, r16 */
const searchFieldClass = cn(
  inter.className,
  "h-9 w-full min-w-0 flex-1 border-0 bg-transparent px-0 text-base leading-[1.7] text-white shadow-none placeholder:text-white/80 focus-visible:ring-0 focus-visible:ring-offset-0 md:text-base"
)

export function Hero() {
  return (
    <section className="pt-32 pb-16 sm:pt-40 xl:pt-68 xl:pb-71">
      <div className="mx-auto flex w-full max-w-360 flex-col items-center px-4 sm:px-6 lg:px-10 xl:px-15">
        {/* Badge — line · pill · line */}
        <div className="flex items-center justify-center">
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-[linear-gradient(90deg,#010123_0%,#a8a8a8_100%)] md:block"
          />
          <div className="rounded-[24px] bg-[linear-gradient(180deg,#a8a8a8_0%,rgba(153,153,153,0)_100%)] p-px">
            <div className="flex h-12 items-center gap-4 rounded-[23px] bg-[linear-gradient(180deg,#474747_-169.32%,#010102_100%)] px-5 shadow-[inset_0_0_6px_6px_rgba(0,0,0,0.1)] sm:px-6">
              <Icon
                src="/icons/badge-jobs.svg"
                size={24}
                className="shrink-0"
              />
              <span
                className={cn(
                  spaceMono.className,
                  "text-base leading-[1.2] whitespace-nowrap text-white sm:text-lg xl:text-xl"
                )}
              >
                50,000+ new jobs this month
              </span>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-[linear-gradient(90deg,#a8a8a8_0%,#010123_100%)] md:block"
          />
        </div>

        {/* Title */}
        <div className="mt-8 flex max-w-196 flex-col items-center gap-4 text-center">
          <h1
            className={cn(
              manrope.className,
              "text-[36px] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-5xl xl:text-[56px]"
            )}
          >
            Find Your Dream Job Today
          </h1>
          <p
            className={cn(
              manrope.className,
              "text-base leading-[1.6] text-white/70 sm:text-xl"
            )}
          >
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>
        </div>

        {/* Search — Figma: Frame 2147234454 */}
        <form
          action="/jobs"
          className="mt-10 flex w-full max-w-196 flex-col gap-3 rounded-[16px] border border-white/20 bg-[#101010] p-3 sm:mt-12 sm:h-16 sm:flex-row sm:items-center sm:gap-6 sm:py-0 sm:pr-2 sm:pl-6"
        >
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Icon
              src="/icons/hero-search.svg"
              size={24}
              className="shrink-0 opacity-90"
            />
            <Input
              name="q"
              placeholder="Job tilte, skill or company"
              aria-label="Job title, skill or company"
              className={searchFieldClass}
            />
          </div>

          <span
            aria-hidden="true"
            className="hidden h-6 w-px bg-white/20 sm:block"
          />

          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Icon
              src="/icons/hero-location.svg"
              size={24}
              className="shrink-0 opacity-90"
            />
            <Input
              name="location"
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className={searchFieldClass}
            />
          </div>

          <Button
            type="submit"
            aria-label="Search"
            className="size-12 shrink-0 rounded-[12px] bg-[#5c53fe] p-0 shadow-none hover:bg-[#5c53fe]/90 sm:size-12"
          >
            <Icon src="/icons/btn-search.svg" size={24} />
          </Button>
        </form>

        {/* Trending */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          <span
            className={cn(
              manrope.className,
              "text-center text-base leading-[1.3] text-white/70"
            )}
          >
            Trending Position
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trending.map((label) => (
              <span
                key={label}
                className={cn(
                  manrope.className,
                  "flex h-8 items-center rounded-[24px] border border-white/10 bg-[#1a1a1b] px-3 text-sm leading-normal whitespace-nowrap text-white"
                )}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
