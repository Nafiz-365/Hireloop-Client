import Link from "next/link"
import { headers } from "next/headers"

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
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/features/dashboard/components/StatCard"
import {
  recruiterApplications,
  recruiterStats,
} from "@/features/dashboard/data/mock"
import { auth } from "@/lib/auth"
import { primaryButtonClass } from "@/features/dashboard/ui"
import { cn } from "@/lib/utils"

const statusClass: Record<string, string> = {
  Interviewing: "bg-[#5c53fe]/15 text-[#8f88ff]",
  New: "bg-sky-500/15 text-sky-400",
  Reviewing: "bg-amber-500/15 text-amber-400",
  Rejected: "bg-white/10 text-white/50",
}

/**
 * Figma: `03 · Recruiter` → `Recruiter / Dashboard` (12018:2202).
 * Greeting + stats (4 cards) + Recent Applications table + Create Job Post CTA.
 */
export default async function RecruiterDashboardPage() {
  // Guarded by the recruiter layout — fetch once more for the greeting name.
  const session = await auth.api.getSession({ headers: await headers() })
  const firstName = session?.user.name.split(" ")[0] ?? "there"

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Welcome back, {firstName}
        </h1>
        <Button
          render={<Link href="/dashboard/recruiter/jobs/new" />}
          nativeButton={false}
          className={primaryButtonClass}
        >
          Create Job Post
        </Button>
      </header>

      {/* Stats row */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {recruiterStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      {/* Recent Applications */}
      <Card className="bg-[#141418] text-white ring-white/6">
        <CardHeader className="px-5">
          <CardTitle className="text-base font-semibold text-white">
            Recent Applications
          </CardTitle>
          <CardAction>
            <Link
              href="/dashboard/recruiter/applications"
              className="text-sm font-medium text-[#8f88ff] transition-colors hover:text-white"
            >
              View all
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="px-5 pb-1">
          <Table className="[&_tr]:border-white/6">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-white/50">Candidate Name</TableHead>
                <TableHead className="text-white/50">Role</TableHead>
                <TableHead className="text-white/50">Date Applied</TableHead>
                <TableHead className="text-white/50">Experience</TableHead>
                <TableHead className="text-white/50">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recruiterApplications.map((row) => (
                <TableRow key={row.candidate} className="hover:bg-white/3">
                  <TableCell className="px-3 py-3.5 font-medium text-white">
                    {row.candidate}
                  </TableCell>
                  <TableCell className="px-3 py-3.5 text-white/70">
                    {row.role}
                  </TableCell>
                  <TableCell className="px-3 py-3.5 text-white/70">
                    {row.date}
                  </TableCell>
                  <TableCell className="px-3 py-3.5 text-white/70">
                    {row.experience}
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
