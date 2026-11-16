import type { Metadata } from "next"

import { requireRole } from "@/features/dashboard/guard"

export const metadata: Metadata = {
  title: "Seeker Dashboard | HireLoop",
}

export default async function SeekerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await requireRole("seeker")
  return <>{children}</>
}
