import type { Metadata } from "next"

import { requireRole } from "@/features/dashboard/guard"

export const metadata: Metadata = {
  title: "Admin Console | HireLoop",
}

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await requireRole("admin")
  return <>{children}</>
}
