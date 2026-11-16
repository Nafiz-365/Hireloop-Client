import { Card } from "@/components/ui/card"

/**
 * Figma stat card (all three dashboards): `#141418` panel, 262×128,
 * label over a large number, optional trend delta next to the value.
 */
export function StatCard({
  label,
  value,
  delta,
}: {
  label: string
  value: string
  delta?: string
}) {
  return (
    <Card className="gap-1.5 bg-[#141418] px-5 py-5 text-white ring-white/6">
      <span className="text-sm leading-normal text-white/55">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl leading-tight font-semibold tracking-tight">
          {value}
        </span>
        {delta ? (
          <span
            className={
              delta === "0%"
                ? "text-xs font-medium text-white/40"
                : "text-xs font-medium text-emerald-400"
            }
          >
            {delta}
          </span>
        ) : null}
      </div>
    </Card>
  )
}
