/**
 * Placeholder for a dashboard route that is mapped in the sidebar but not
 * built yet (later phases). Rendered by the per-role `[...rest]` catch-all so
 * every nav link resolves instead of 404-ing.
 */
export function PlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[14px] border border-dashed border-white/10 bg-[#141418] px-6 py-20 text-center">
      <h1 className="text-lg font-semibold text-white">Coming soon</h1>
      <p className="max-w-md text-sm leading-relaxed text-white/50">
        This screen is mapped in the sidebar and guarded by your role — the
        content itself lands in the next build phase.
      </p>
    </div>
  )
}
