import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/common/Icon"
import { interTight, manrope } from "@/lib/fonts"
import { cn } from "@/lib/utils"

/* Figma: Footer — 1320×385 card (r16) inside 60px gutters */
const columns = [
  {
    heading: "Product",
    links: ["Job discovery", "Worker AI", "Companies", "Salary data"],
  },
  {
    heading: "Navigations",
    links: ["Help center", "Career library", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Brand Guideline", "Newsroom"],
  },
]

const socials = [
  { icon: "/icons/social-facebook.svg", label: "Facebook", href: "#" },
  { icon: "/icons/social-pinterest.svg", label: "Pinterest", href: "#" },
  { icon: "/icons/social-linkedin.svg", label: "LinkedIn", href: "#" },
]

export function Footer() {
  return (
    <footer className="relative z-10 mx-auto mt-16 w-full max-w-360 px-4 sm:px-6 lg:px-10 xl:mt-30 xl:px-15">
      <div className="rounded-[16px] bg-[#010103] pt-10 pb-10">
        {/* Logo + link columns */}
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="flex max-w-[288px] flex-col gap-6">
            <Image
              src="/images/logo.png"
              alt="HireLoop"
              width={280}
              height={80}
              className="h-16 w-auto sm:h-20"
            />
            <p
              className={cn(
                manrope.className,
                "text-base leading-[1.9] text-white/50"
              )}
            >
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-18 gap-y-8">
            {columns.map((column) => (
              <div key={column.heading} className="w-40">
                <h3
                  className={cn(
                    interTight.className,
                    "text-lg leading-[1.4] font-medium text-[#5c53fe]"
                  )}
                >
                  {column.heading}
                </h3>
                <ul className="mt-6 flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className={cn(
                          manrope.className,
                          "text-base leading-[1.9] text-[#d0d5dd]/70 transition-colors hover:text-white"
                        )}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Divider row: socials · copyright */}
        <div className="mt-18 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {socials.map((social, i) => (
              <Button
                key={social.label}
                render={<a href={social.href} />}
                nativeButton={false}
                aria-label={social.label}
                className={cn(
                  "size-10 rounded-[8px] p-0 shadow-none hover:text-white",
                  i === 1
                    ? "bg-[#5c53fe] hover:bg-[#5c53fe]/90"
                    : "bg-white/5 hover:bg-white/10"
                )}
              >
                <Icon src={social.icon} size={24} />
              </Button>
            ))}
          </div>

          <div
            className={cn(
              manrope.className,
              "flex flex-col gap-1 text-base leading-[1.9] sm:flex-row sm:gap-6"
            )}
          >
            <span className="text-[#acabb2]/70">
              Copyright 2024 —Programming Hero
            </span>
            <a
              href="#"
              className="text-[#acabb2] transition-colors hover:text-white"
            >
              Terms &amp; Policy - Privacy Guideline
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
