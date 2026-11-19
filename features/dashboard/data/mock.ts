/**
 * Static mock content for the dashboard home screens.
 *
 * Text is decoded from Figma `hireloop.fig` → Hireloop 2.0:
 *   - Seeker    → section `02 · Job Seeker`    (frame 12018:1236)
 *   - Recruiter → section `03 · Recruiter`     (frame 12018:2202)
 *   - Admin     → section `04 · Admin Console` (frame 12018:3084)
 *
 * The homepage follows the same pattern (static mock data first); a content
 * API comes later.
 */

/* ── Seeker ─────────────────────────────────────────────────────────────── */

export const seekerStats = [
  { label: "Saved Jobs", value: "12" },
  { label: "Applications Submitted", value: "24" },
  { label: "Interviews Scheduled", value: "3" },
  { label: "Offers Received", value: "1" },
]

export const seekerActivity = [
  {
    text: "Application for Senior Product Designer at TechFlow updated to 'Under Review'",
    time: "2 hours ago",
  },
  {
    text: "New Job Alert: Lead Frontend Engineer at FinGrid matches your profile.",
    time: "5 hours ago",
  },
  {
    text: "You have a new message from Sarah Jenkins (Hiring Manager at CloudOps).",
    time: "1 day ago",
  },
]

/* ── Recruiter ──────────────────────────────────────────────────────────── */

export const recruiterStats = [
  { label: "Total Job Posts", value: "48" },
  { label: "Total Applicants", value: "1,284" },
  { label: "Active Jobs", value: "18" },
  { label: "Jobs Closed", value: "32" },
]

export type ApplicationRow = {
  candidate: string
  role: string
  date: string
  experience: string
  status: "Interviewing" | "New" | "Reviewing" | "Rejected"
}

export const recruiterApplications: ApplicationRow[] = [
  {
    candidate: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    candidate: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    candidate: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    candidate: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
]

/* ── Admin ──────────────────────────────────────────────────────────────── */

export const adminStats = [
  { label: "Total Users", value: "124,892", delta: "12%" },
  { label: "Total Recruiters", value: "12,405", delta: "8%" },
  { label: "Total Companies", value: "4,281", delta: "0%" },
  { label: "Jobs Posted", value: "8,920", delta: "24%" },
  { label: "Platform Revenue", value: "$245,800", delta: "18.5%" },
]

export type TransactionRow = {
  user: string
  org: string
  plan: string
  txn: string
  amount: string
  date: string
  status: "Success" | "Pending" | "Failed"
}

export const adminTransactions: TransactionRow[] = [
  {
    user: "marcus.k@techcorp.io",
    org: "TechCorp Inc.",
    plan: "Enterprise Monthly",
    txn: "#TXN-902341",
    amount: "$1,299.00",
    date: "Oct 24, 2023, 14:20",
    status: "Success",
  },
  {
    user: "sarah.l@creativestudio.com",
    org: "Creative Studio",
    plan: "Professional Annual",
    txn: "#TXN-882103",
    amount: "$499.00",
    date: "Oct 24, 2023, 11:05",
    status: "Success",
  },
  {
    user: "j.doe@freelance.org",
    org: "Independent",
    plan: "Starter Monthly",
    txn: "#TXN-774129",
    amount: "$49.00",
    date: "Oct 23, 2023, 16:45",
    status: "Pending",
  },
  {
    user: "admin@retailglobal.net",
    org: "Retail Global",
    plan: "Enterprise Annual",
    txn: "#TXN-552014",
    amount: "$1,099.00",
    date: "Oct 23, 2023, 09:12",
    status: "Failed",
  },
]
