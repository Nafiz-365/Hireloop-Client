import type { JobItem } from "../types"

export const mockJobs: JobItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: `job-${i + 1}`,
  title: "Frontend Developer",
  description:
    "Showcase your commitment to diversity and inclusion by highlighting initiatives",
  tags: [
    { icon: "/icons/jc-location.svg", text: "New York, USA" },
    { icon: "/icons/jc-briefcase.svg", text: "Hybrid" },
    { icon: "/icons/jc-dollar.svg", text: "€25–€40/hour" },
  ],
  applyUrl: "/jobs",
}))
