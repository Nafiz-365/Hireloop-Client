import type { Metadata } from "next"

import { requireRole } from "@/features/dashboard/guard"

export const metadata: Metadata = {
  title: "Recruiter Dashboard | HireLoop",
}

export default async function RecruiterDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await requireRole("recruiter")
  return <>{children}</>
}
