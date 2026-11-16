import {
  BanknoteIcon,
  BookmarkIcon,
  BriefcaseIcon,
  Building2Icon,
  BuildingIcon,
  CreditCardIcon,
  FilePlusIcon,
  FileTextIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  TagIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

export type Role = "seeker" | "recruiter" | "admin"

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

/**
 * Role → sidebar navigation.
 *
 * Figma: `hireloop.fig` → Hireloop 2.0 → `HL 2.0/Sidebar` (12018:4552), which
 * ships one component with three variants (`Role=Seeker|Recruiter|Admin`).
 * Labels and routes follow the variant nav lists; routes match the spec in
 * `Project requirements.md` (Seeker / Recruiter / Admin dashboard sections).
 */
export const roleNav: Record<Role, NavItem[]> = {
  seeker: [
    {
      href: "/dashboard/seeker",
      label: "Dashboard",
      icon: LayoutDashboardIcon,
    },
    { href: "/dashboard/seeker/jobs", label: "Jobs", icon: BriefcaseIcon },
    {
      href: "/dashboard/seeker/saved",
      label: "Saved Jobs",
      icon: BookmarkIcon,
    },
    {
      href: "/dashboard/seeker/applications",
      label: "Applications",
      icon: FileTextIcon,
    },
    {
      href: "/dashboard/seeker/billing",
      label: "Billing",
      icon: CreditCardIcon,
    },
    {
      href: "/dashboard/seeker/settings",
      label: "Settings",
      icon: SettingsIcon,
    },
  ],
  recruiter: [
    {
      href: "/dashboard/recruiter",
      label: "Dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      href: "/dashboard/recruiter/company",
      label: "My Company",
      icon: Building2Icon,
    },
    {
      href: "/dashboard/recruiter/jobs/new",
      label: "Add Job",
      icon: FilePlusIcon,
    },
    {
      href: "/dashboard/recruiter/jobs",
      label: "Manage Jobs",
      icon: BriefcaseIcon,
    },
    {
      href: "/dashboard/recruiter/applications",
      label: "Applications",
      icon: FileTextIcon,
    },
    {
      href: "/dashboard/recruiter/billing",
      label: "Billing",
      icon: CreditCardIcon,
    },
    {
      href: "/dashboard/recruiter/settings",
      label: "Settings",
      icon: SettingsIcon,
    },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboardIcon },
    { href: "/dashboard/admin/users", label: "Users", icon: UsersIcon },
    {
      href: "/dashboard/admin/companies",
      label: "Companies",
      icon: BuildingIcon,
    },
    { href: "/dashboard/admin/jobs", label: "Jobs", icon: BriefcaseIcon },
    {
      href: "/dashboard/admin/payments",
      label: "Payments",
      icon: BanknoteIcon,
    },
    {
      href: "/dashboard/admin/settings",
      label: "Settings",
      icon: SettingsIcon,
    },
  ],
}

/**
 * Public-site links inside the sidebar — required by `Project requirements.md`
 * (Dashboard Requirements → Layouts). The Figma sidebar omits these; the spec
 * wins, the Figma nav-item styling is kept.
 */
export const publicNav: NavItem[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/jobs", label: "Browse Jobs", icon: BriefcaseIcon },
  { href: "/companies", label: "Companies", icon: BuildingIcon },
  { href: "/pricing", label: "Pricing", icon: TagIcon },
]

/** Dashboard home for each role — where guards send users. */
export const roleHome: Record<Role, string> = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
}

/**
 * Existing accounts (created before the role field existed) have no `role`
 * stored — fall back to seeker instead of blocking the dashboard.
 */
export function normalizeRole(role: string | null | undefined): Role {
  return role === "recruiter" || role === "admin" ? role : "seeker"
}
