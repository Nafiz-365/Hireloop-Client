import * as React from "react"

const MOBILE_BREAKPOINT = 768

/*
 * Subscribes to the `md:` breakpoint that the shadcn Sidebar uses
 * (`max-width: 767px` ⇒ mobile, `min-width: 768px` ⇒ desktop sidebar).
 *
 * Implemented with `useSyncExternalStore` instead of the registry's
 * useState-in-effect version: the server snapshot is `false` (desktop layout),
 * the client re-reads the real width after hydration — no cascading renders.
 */
function subscribe(callback: () => void) {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

function getSnapshot() {
  return window.innerWidth < MOBILE_BREAKPOINT
}

function getServerSnapshot() {
  return false
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
