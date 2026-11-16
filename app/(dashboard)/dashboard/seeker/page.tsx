import Link from "next/link"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StatCard } from "@/features/dashboard/components/StatCard"
import { seekerActivity, seekerStats } from "@/features/dashboard/data/mock"

/**
 * Figma: `02 · Job Seeker` → `Seeker / Dashboard` (12018:1236).
 * Stats row (4 × #141418 cards) + Recent Activity list.
 */
export default function SeekerDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Section - Stats Row */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {seekerStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      {/* Bottom Section: Recent Activity */}
      <Card className="bg-[#141418] text-white ring-white/6">
        <CardHeader className="px-5">
          <CardTitle className="text-base font-semibold text-white">
            Recent Activity
          </CardTitle>
          <CardAction>
            <Link
              href="/dashboard/seeker/applications"
              className="text-sm font-medium text-[#8f88ff] transition-colors hover:text-white"
            >
              View All Activity
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="px-5">
          <ul>
            {seekerActivity.map((item) => (
              <li
                key={item.text}
                className="flex items-start justify-between gap-6 border-b border-white/6 py-4 last:border-0 last:pb-0"
              >
                <span className="text-sm leading-relaxed text-white/80">
                  {item.text}
                </span>
                <span className="shrink-0 text-xs text-white/45">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
