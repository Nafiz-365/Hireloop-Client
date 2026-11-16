"use client"

import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { DashboardSidebar, type DashboardUser } from "./DashboardSidebar"

/**
 * Dashboard chrome — shadcn `Sidebar` primitives around the Figma
 * `HL 2.0/Sidebar` design:
 *
 * - `SidebarProvider` owns the state: mobile opens the built-in left Sheet
 *   (below `md`, 768px — the component's own breakpoint), desktop is fixed at
 *   248px (`--sidebar-width` override; `SIDEBAR_WIDTH` default is 16rem).
 * - `SidebarTrigger` renders only below `md` — the Figma sidebar has no
 *   desktop collapse, so `collapsible="offcanvas"` stays unreachable there
 *   (Ctrl/Cmd+B is the component's built-in shortcut).
 * - Content area sits in `SidebarInset` on `#0e0e11` with a 56px top bar
 *   (Figma search input `#0c0c0f`).
 */
export function DashboardShell({
  user,
  children,
}: {
  user: DashboardUser
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "15.5rem" } as React.CSSProperties}
      className={cn("bg-[#0e0e11] text-white", inter.className)}
    >
      <Sidebar side="left">
        <DashboardSidebar user={user} />
      </Sidebar>

      <SidebarInset className="bg-[#0e0e11]">
        {/* Top bar — Figma: 56px, search input 320×36 `#0c0c0f` */}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-white/6 bg-[#0e0e11]/95 px-4 backdrop-blur sm:px-6">
          <SidebarTrigger className="shrink-0 text-white hover:bg-white/10 hover:text-white md:hidden" />

          <div className="relative w-full max-w-80">
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40"
            />
            <Input
              type="search"
              placeholder="Search..."
              aria-label="Search"
              className="h-9 rounded-[10px] border-white/8 bg-[#0c0c0f] pr-4 pl-9 text-sm text-white placeholder:text-white/40 focus-visible:border-[#5c53fe] focus-visible:ring-[3px] focus-visible:ring-[#5c53fe]/25"
            />
          </div>
        </header>

        <main className="mx-auto w-full max-w-295 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
