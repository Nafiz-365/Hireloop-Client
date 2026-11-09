"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { manrope, rethinkSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

/* Figma: Frame 2147234470 — Rethink Sans heading, sub, two buttons */
export function Cta() {
  return (
    <section className="relative z-30 pt-24 xl:pt-38.25">
      <div className="mx-auto flex w-full max-w-360 flex-col items-center px-4 text-center sm:px-6 lg:px-10 xl:px-15">
        <h2
          className={cn(
            rethinkSans.className,
            "text-[36px] leading-[1.2] font-medium tracking-[-1.5px] text-white sm:text-5xl xl:text-[64px]"
          )}
        >
          Your next role is already
          <br />
          looking for you
        </h2>

        <p
          className={cn(
            manrope.className,
            "mt-4 max-w-198 text-base leading-[1.6] text-white/70 sm:text-xl"
          )}
        >
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button
            render={<Link href="/signup" />}
            nativeButton={false}
            className={cn(
              manrope.className,
              "h-14 rounded-[12px] border border-[#090a15]/10 bg-white px-6 text-lg leading-[1.45] font-semibold text-[#0b0b14] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-white hover:text-[#0b0b14]"
            )}
          >
            Create a free account
          </Button>
          <Button
            render={<Link href="/pricing" />}
            nativeButton={false}
            className={cn(
              manrope.className,
              "h-14 rounded-[12px] border border-[#d7d7d7]/30 bg-[#0e0b16] px-6 text-lg leading-[1.45] font-medium text-white shadow-none hover:bg-[#0e0b16]/90 hover:text-white"
            )}
          >
            View pricing
          </Button>
        </div>
      </div>
    </section>
  )
}
