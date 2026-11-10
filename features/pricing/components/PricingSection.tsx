"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/common/Icon"
import { SectionLabel } from "@/components/common/SectionLabel"
import { inter, interTight, manrope, plusJakartaSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { plans } from "../data/plans"

/* Figma: "Monthly -Yearly" — 257×59 container, white active pill (r40) */
const toggleClass =
  "flex h-[43px] items-center rounded-[40px] border px-3 text-lg leading-[1.5] font-medium tracking-[-0.02em] transition-colors"

export function PricingSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="mt-0 pt-16 pb-16 xl:mt-5 xl:pt-30 xl:pb-30">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10 xl:px-15">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionLabel>Pricing</SectionLabel>
          <h2
            className={cn(
              manrope.className,
              "max-w-122 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-white sm:text-[40px] xl:text-[48px]"
            )}
          >
            Pay for the leverage, not the listings
          </h2>
        </div>

        {/* Billing toggle */}
        <div className="mt-16 flex justify-center">
          <div
            role="group"
            aria-label="Billing period"
            className="flex items-center gap-2 rounded-[36px] border border-[#f6f6f6]/10 bg-white/15 p-2"
          >
            <button
              type="button"
              aria-pressed={!yearly}
              onClick={() => setYearly(false)}
              className={cn(
                toggleClass,
                inter.className,
                yearly
                  ? "border-[#090a15]/10 bg-[#090a15]/5 text-white"
                  : "border-[#090a15]/10 bg-white text-[#010103]"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={yearly}
              onClick={() => setYearly(true)}
              className={cn(
                toggleClass,
                inter.className,
                "gap-2 pr-2",
                yearly
                  ? "border-[#090a15]/10 bg-white text-[#010103]"
                  : "border-[#090a15]/10 bg-[#090a15]/5 text-white"
              )}
            >
              Yearly
              <span
                className={cn(
                  "flex h-8 items-center rounded-[24px] border border-[#7a7b8f]/10 bg-[#dc02ce] px-2.5 text-base leading-[1.8] tracking-[-0.2px] whitespace-nowrap text-white",
                  yearly && "shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
                )}
              >
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-[24px] border p-6",
                plan.featured
                  ? "border-white/20 bg-[#151516] shadow-[inset_0_0_32px_8px_rgba(120,120,120,0.25)]"
                  : "border-[#f6efe1]/20 bg-[#010103]"
              )}
            >
              {/* Header: icon + title · price */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-[8px] border border-[#595959]/40">
                    <Icon src={plan.icon} size={24} />
                  </span>
                  <h3
                    className={cn(
                      plusJakartaSans.className,
                      "text-xl leading-[1.4] tracking-[-0.5px] text-white sm:text-2xl"
                    )}
                  >
                    {plan.name}
                  </h3>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <span
                    className={cn(
                      plusJakartaSans.className,
                      "text-[32px] leading-[1.2] font-semibold tracking-[-0.02em] text-white xl:text-[40px]"
                    )}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      interTight.className,
                      "text-sm leading-[1.7] text-white"
                    )}
                  >
                    /month
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8 flex flex-col gap-3">
                <p
                  className={cn(
                    inter.className,
                    "text-lg leading-normal font-medium tracking-[-0.02em] text-white"
                  )}
                >
                  Start building your insights hub:
                </p>
                <ul className="flex flex-col gap-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-[6px] border border-[#f6efe1]/10 bg-[#595959]/30">
                        <Icon src="/icons/price-check.svg" size={16} />
                      </span>
                      <span
                        className={cn(
                          inter.className,
                          "text-base leading-[1.7] text-white/70"
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                render={<Link href="/pricing" />}
                nativeButton={false}
                className={cn(
                  manrope.className,
                  "mt-10 h-14 justify-between rounded-[12px] px-6 text-base leading-[1.7] font-semibold tracking-[-0.02em] shadow-none xl:mt-18",
                  plan.featured
                    ? "bg-white text-[#010103] hover:bg-white hover:text-[#010103]"
                    : "bg-[#595959]/50 text-white hover:bg-[#595959]/60 hover:text-white"
                )}
              >
                Choose This Plan
                <Icon src="/icons/arrow.svg" size={24} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
