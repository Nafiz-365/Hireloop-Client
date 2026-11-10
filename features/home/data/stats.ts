export interface StatItem {
  icon: string
  value: string
  label: string
}

export const stats: StatItem[] = [
  { icon: "/icons/stat-job-search.svg", value: "50K", label: "Active Jobs" },
  { icon: "/icons/stat-ranking.svg", value: "12K", label: "Companies" },
  { icon: "/icons/stat-job-man.svg", value: "2M", label: "Job Seekers" },
  {
    icon: "/icons/stat-star.svg",
    value: "97%",
    label: "Satisfaction Rate",
  },
]
