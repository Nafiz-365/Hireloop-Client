"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import {
  publicNav,
  roleHome,
  roleNav,
  type NavItem,
  type Role,
} from "@/features/dashboard/data/nav"

export type DashboardUser = {
  name: string
  email: string
  image: string | null
  role: Role
}

/* First letter of the display name — fallback when there's no provider photo. */
function userInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?"
}

/**
 * One nav group (label + menu). Figma `HL 2.0/Sidebar` nav item (State=
 * Active/Default): 224×34, Inter Medium 13, default `#a1a4aa`, active
 * `#f4f4f5` on `#232327` with a 2×16 `#5c53fe` indicator on the left edge —
 * rendered through shadcn's `SidebarMenuButton` (`isActive` → `data-active`).
 */
function SidebarNav({
  label,
  items,
  homeHref,
  pathname,
  onLinkClick,
  dimmed = false,
}: {
  label: string
  items: NavItem[]
  homeHref: string
  pathname: string
  onLinkClick: () => void
  dimmed?: boolean
}) {
  /* Longest match wins so `…/jobs/new` lights up "Add Job" only — not both
     it and the shorter "Manage Jobs" prefix (`…/jobs`). The dashboard home
     stays exact-match so its sub-routes never light it up. */
  const activeHref = items.reduce<string>((best, item) => {
    const match =
      item.href === homeHref
        ? pathname === homeHref
        : pathname === item.href || pathname.startsWith(item.href + "/")
    return match && item.href.length > best.length ? item.href : best
  }, "")

  return (
    <SidebarGroup className="gap-1 p-0">
      <SidebarGroupLabel
        className={cn(
          "h-auto px-2.5 pb-1 text-[11px] font-medium tracking-[0.06em] uppercase",
          dimmed ? "text-white/35" : "text-white/40"
        )}
      >
        {label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {items.map((item) => {
            const active = item.href === activeHref
            const Icon = item.icon

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={active}
                  aria-current={active ? "page" : undefined}
                  render={<Link href={item.href} onClick={onLinkClick} />}
                  className={cn(
                    "h-8.5 gap-2.5 rounded-[8px] px-2.5 text-[13px] font-medium [&_svg]:size-4.5!",
                    active
                      ? "bg-[#232327] text-[#f4f4f5] hover:bg-[#232327] hover:text-[#f4f4f5]"
                      : "text-[#a1a4aa] hover:bg-white/5 hover:text-white"
                  )}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-[1px] bg-[#5c53fe]"
                    />
                  )}
                  <Icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

/**
 * Role-based sidebar content (Figma `HL 2.0/Sidebar`, three Role variants)
 * on shadcn `Sidebar*` primitives: brand + identity card in the header, the
 * role nav and the spec-required public links in the content, Log out in the
 * footer. Rendered inside `SidebarProvider` — below `md` it lives in the
 * component's built-in left Sheet.
 */
export function DashboardSidebar({ user }: { user: DashboardUser }) {
  const pathname = usePathname()
  const router = useRouter()
  const { setOpenMobile } = useSidebar()

  /* Any navigation inside the sidebar closes the mobile Sheet (no-op on
     desktop — openMobile state is unused there). */
  const closeMobile = () => setOpenMobile(false)

  async function handleSignOut() {
    // better-auth clears the client session cache, then we land on the homepage.
    await authClient.signOut()
    closeMobile()
    router.push("/")
  }

  return (
    /* `contents` keeps header/content/footer as the flex children of the
       sidebar (or the Sheet's inner div) while Inter follows into the Sheet's
       portal, which sits outside the provider's DOM tree. Closing the mobile
       Sheet happens in each link's onClick — real anchors fire it on Enter too. */
    <div className={cn("contents", inter.className)}>
      {/* Brand — Figma: logo + wordmark */}
      <SidebarHeader className="gap-4 px-3 py-5">
        <Link
          href="/"
          aria-label="HireLoop home"
          onClick={closeMobile}
          className="flex items-center px-2"
        >
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            className="h-7 w-auto"
          />
        </Link>

        {/* Identity — Figma: #141416 card, avatar 32, name 14 semibold, role pill */}
        <div className="flex items-start gap-3 rounded-[12px] bg-[#141416] p-3">
          <Avatar size="sm" className="shrink-0 border border-white/10">
            <AvatarImage src={user.image ?? undefined} alt="" />
            <AvatarFallback className="bg-[#5c53fe]/15 font-medium text-[#5c53fe]">
              {userInitial(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm leading-tight font-semibold text-[#f4f4f5]">
              {user.name}
            </p>
            <p className="truncate text-xs leading-tight text-[#a1a4aa]">
              {user.email}
            </p>
            <span className="mt-1.5 inline-block rounded-full bg-[#5c53fe]/15 px-2 py-0.5 text-[11px] leading-none font-medium text-[#8f88ff] capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Role navigation + spec-required public links */}
      <SidebarContent className="gap-4 px-3 pt-1 pb-4">
        <SidebarNav
          label="Menu"
          items={roleNav[user.role]}
          homeHref={roleHome[user.role]}
          pathname={pathname}
          onLinkClick={closeMobile}
        />
        <SidebarNav
          label="Explore"
          items={publicNav}
          homeHref={roleHome[user.role]}
          pathname={pathname}
          onLinkClick={closeMobile}
          dimmed
        />
      </SidebarContent>

      {/* Logout — spec: ends the session and redirects to the homepage */}
      <SidebarFooter className="px-3 pb-5">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-[10px] bg-[#fafafa] text-[13px] font-medium text-[#0b0b0c] transition-colors hover:bg-white"
        >
          <LogOutIcon className="size-4" />
          Log out
        </button>
      </SidebarFooter>
    </div>
  )
}
