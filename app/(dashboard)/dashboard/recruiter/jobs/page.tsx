import type { Metadata } from "next"

import { ManageJobs } from "@/features/dashboard/components/ManageJobs"

export const metadata: Metadata = {
  title: "Manage Jobs | HireLoop",
}

export default function ManageJobsPage() {
  return <ManageJobs />
}
