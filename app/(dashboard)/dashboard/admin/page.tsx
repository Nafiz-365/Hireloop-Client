import Link from "next/link"
import { ChevronDownIcon, DownloadIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatCard } from "@/features/dashboard/components/StatCard"
import { adminStats, adminTransactions } from "@/features/dashboard/data/mock"
import { primaryButtonClass } from "@/features/dashboard/ui"
import { cn } from "@/lib/utils"

const statusClass: Record<string, string> = {
  Success: "bg-emerald-500/15 text-emerald-400",
  Pending: "bg-amber-500/15 text-amber-400",
  Failed: "bg-red-500/15 text-red-400",
}

/**
 * Figma: `04 · Admin Console` → `Admin / Dashboard Overview` (12018:3084).
 * Header (title + range/export controls) + 5 metric cards + transactions table.
 */
export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Real-time platform performance and growth metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 gap-2 rounded-[10px] border-white/10 bg-[#141418] px-3 text-white hover:bg-white/5"
          >
            Last 30 Days
            <ChevronDownIcon className="size-4" />
          </Button>
          <Button className={primaryButtonClass}>
            <DownloadIcon className="size-4" />
            Export Report
          </Button>
        </div>
      </header>

      {/* Metric cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {adminStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            delta={stat.delta}
          />
        ))}
      </section>

      {/* Recent Subscription Transactions */}
      <Card className="bg-[#141418] text-white ring-white/6">
        <CardHeader className="px-5">
          <CardTitle className="text-base font-semibold text-white">
            Recent Subscription Transactions
          </CardTitle>
          <CardAction>
            <Link
              href="/dashboard/admin/payments"
              className="text-sm font-medium text-[#8f88ff] transition-colors hover:text-white"
            >
              View All Activity
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="px-5 pb-1">
          <Table className="[&_tr]:border-white/6">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-white/50">
                  User / Recruiter
                </TableHead>
                <TableHead className="text-white/50">Plan Type</TableHead>
                <TableHead className="text-white/50">Transaction ID</TableHead>
                <TableHead className="text-white/50">Amount</TableHead>
                <TableHead className="text-white/50">Date</TableHead>
                <TableHead className="text-white/50">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminTransactions.map((row) => (
                <TableRow key={row.txn} className="hover:bg-white/3">
                  <TableCell className="px-3 py-3.5">
                    <span className="block font-medium text-white">
                      {row.user}
                    </span>
                    <span className="block text-xs text-white/50">
                      {row.org}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 py-3.5 text-white/70">
                    {row.plan}
                  </TableCell>
                  <TableCell className="px-3 py-3.5 font-mono text-xs text-white/70">
                    {row.txn}
                  </TableCell>
                  <TableCell className="px-3 py-3.5 text-white/70">
                    {row.amount}
                  </TableCell>
                  <TableCell className="px-3 py-3.5 text-white/70">
                    {row.date}
                  </TableCell>
                  <TableCell className="px-3 py-3.5">
                    <Badge
                      className={cn(
                        "border-transparent",
                        statusClass[row.status]
                      )}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
