import type { Metadata } from "next"

import { JobPostForm } from "@/features/dashboard/components/JobPostForm"

export const metadata: Metadata = {
  title: "Post a New Job | HireLoop",
}

/**
 * Figma: `hireloop.fig` → Hireloop 2.0 → `Add New Job` (recruiter).
 * Reached from the dashboard "Create Job Post" CTA and the sidebar
 * "Add Job" entry. Guarded by the recruiter layout's `requireRole`.
 */
export default function AddJobPage() {
  return <JobPostForm />
}
