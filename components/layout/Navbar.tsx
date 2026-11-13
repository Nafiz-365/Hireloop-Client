"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LogOutIcon, MenuIcon, XIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { instrumentSans, manrope } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/companies", label: "Company" },
  { href: "/pricing", label: "Pricing" },
]

/* Figma: Geist Regular 16 / 1.8 / -0.2px, #FFFFFF */
const linkClass =
  "whitespace-nowrap text-base leading-[1.8] tracking-[-0.2px] transition-colors hover:text-white/70"

/* Figma: 18 / 1.45 labels. "Sign In" has its fill hidden in the design, so it
   renders as text only — hover follows the HL/Menu white-overlay treatment. */
const signInClass = cn(
  manrope.className,
  "rounded-[12px] bg-transparent px-6 text-lg leading-[1.45] font-semibold text-[#5c53fe] hover:bg-white/5"
)

const getStartedClass = cn(
  instrumentSans.className,
  "rounded-[12px] border-[rgba(9,10,21,0.1)] bg-[#5c53fe] px-6 text-lg leading-[1.45] font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#5c53fe] hover:text-white"
)

/* First letter of the display name — fallback when there's no provider photo
   (email/password signup has no image; Google/GitHub load AvatarImage). */
function userInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?"
}

type SessionUser = NonNullable<
  ReturnType<typeof authClient.useSession>["data"]
>["user"]

/* Avatar-only trigger → dropdown with identity (name / email / role badge) and
   Sign Out. Shared by the desktop cluster and the mobile bar (Option A — same
   interaction on both breakpoints). */
function UserMenu({
  user,
  onSignOut,
}: {
  user: SessionUser
  onSignOut: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Account menu"
        className="flex cursor-pointer items-center rounded-full p-1.5 text-white transition-colors outline-none hover:bg-white/10 focus-visible:bg-white/10"
      >
        <Avatar size="sm" className="border border-white/15">
          <AvatarImage src={user.image ?? undefined} alt="" />
          <AvatarFallback className="bg-[#5c53fe]/15 font-medium text-[#5c53fe]">
            {userInitial(user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-64 border border-white/10 bg-[#1e1e21] p-1.5 text-white shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-center gap-3 px-2 py-2.5">
          <Avatar className="shrink-0 border border-white/15">
            <AvatarImage src={user.image ?? undefined} alt="" />
            <AvatarFallback className="bg-[#5c53fe]/15 font-medium text-[#5c53fe]">
              {userInitial(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm leading-normal font-medium text-white">
              {user.name}
            </p>
            <p className="truncate text-xs leading-normal text-white/60">
              {user.email}
            </p>
            {"role" in user && user.role ? (
              <span className="mt-1.5 inline-block rounded-full bg-[#5c53fe]/15 px-2 py-0.5 text-[11px] leading-normal font-medium text-[#5c53fe] capitalize">
                {user.role}
              </span>
            ) : null}
          </div>
        </div>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          onClick={onSignOut}
          className="gap-2.5 rounded-[8px] px-2.5 py-2 text-sm text-white/80 focus:bg-white/10 focus:text-white"
        >
          <LogOutIcon className="size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { data: session, isPending } = authClient.useSession()

  const handleSignOut = async () => {
    await authClient.signOut()
    setOpen(false)
    // better-auth clears the client session cache — state re-renders logged-out.
  }

  return (
    <nav className="z-30 flex h-18 w-full items-center justify-between rounded-[16px] bg-[#222222] py-2 pr-2 pl-6">
      <Link href="/" className="shrink-0" aria-label="HireLoop home">
        <Image
          src="/images/logo.png"
          alt="HireLoop"
          width={154}
          height={44}
          priority
          className="h-9 w-auto sm:h-11"
        />
      </Link>

      {/* Desktop — Figma nav-bar: links · divider · actions */}
      <div className="hidden h-14 items-center gap-6 lg:flex">
        <ul className="flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  linkClass,
                  pathname.startsWith(link.href) && "text-[#5c53fe]"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <span aria-hidden="true" className="h-6 w-px bg-[#a8a8a8]/40" />

        {isPending ? (
          /* Session still loading — keep the slot blank so "Sign In" doesn't flash. */
          <div className="flex h-full items-center gap-4" aria-hidden="true" />
        ) : session?.user ? (
          <UserMenu user={session.user} onSignOut={handleSignOut} />
        ) : (
          <>
            <div className="flex h-full items-center gap-4">
              <Button
                render={<Link href="/login" />}
                nativeButton={false}
                className={cn(signInClass, "h-14")}
              >
                Sign In
              </Button>
              <Button
                render={<Link href="/signup" />}
                nativeButton={false}
                className={cn(getStartedClass, "h-13")}
              >
                Get Started
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Mobile / tablet — avatar menu (Option A: same dropdown as desktop) + burger */}
      <div className="flex items-center gap-1 lg:hidden">
        {!isPending && session?.user && (
          <UserMenu user={session.user} onSignOut={handleSignOut} />
        )}

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-10 rounded-[12px] text-white hover:bg-white/10 hover:text-white"
              />
            }
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>

          <SheetContent
            showCloseButton={false}
            side="right"
            className={cn(
              "w-76 gap-0 border-white/10 bg-[#1e1e21] p-6 text-white shadow-[0_12px_32px_rgba(0,0,0,0.45)] sm:max-w-76",
              manrope.className
            )}
          >
            <SheetClose className="absolute top-3 right-3 grid size-8 place-items-center rounded-[8px] text-white/70 transition-colors hover:bg-white/10 hover:text-white">
              <XIcon className="size-4" />
              <span className="sr-only">Close menu</span>
            </SheetClose>

            <SheetHeader className="sr-only">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-1 flex-col justify-between gap-6">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-[6px] px-2.5 py-2.5 text-sm leading-[1.7] text-[#d4d4d8] transition-colors hover:bg-white/10 hover:text-white",
                        pathname.startsWith(link.href) &&
                          "bg-white/5 text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Account actions live in the avatar dropdown — the sheet is
                navigation only when logged in. */}
              {!isPending && !session?.user && (
                <div className="flex flex-col gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-full bg-white/10"
                  />
                  <div className="flex flex-col gap-3">
                    <Button
                      render={
                        <Link href="/login" onClick={() => setOpen(false)} />
                      }
                      nativeButton={false}
                      className={cn(signInClass, "h-13 w-full")}
                    >
                      Sign In
                    </Button>
                    <Button
                      render={
                        <Link href="/signup" onClick={() => setOpen(false)} />
                      }
                      nativeButton={false}
                      className={cn(getStartedClass, "h-13 w-full")}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
