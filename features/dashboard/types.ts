/**
 * Shared dashboard types — the one home for shapes used by more than one
 * file (previously `FormValues` lived inside `JobPostForm.tsx` and
 * `ManageJobRow` inside `ManageJobs.tsx`).
 */

export type JobStatus = "Active" | "Closed" | "Draft"

/** The exact payload the Add Job page posts via `createJob()`. */
export type FormValues = {
  jobTitle: string
  companyName: string
  jobCategory: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
  status: JobStatus
  applicants: number
  datePosted: string
}

/** A Manage Jobs row: what the Add Job page stores plus listing metadata. */
export type ManageJobRow = FormValues & {
  _id: string
  ref: string
}

export type StatusFilter = "All" | JobStatus
