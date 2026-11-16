import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { DashboardShell } from "@/components/layout/DashboardShell"
import { normalizeRole } from "@/features/dashboard/data/nav"
import { auth } from "@/lib/auth"

/**
 * Dashboard shell + session guard.
 *
 * Every route under (dashboard) requires a server session — no middleware.ts,
 * better-auth's server API reads the session cookie straight from `headers()`.
 * The role itself is enforced per role segment (see dashboard/<role>/layout.tsx);
 * here we only build the shell with the signed-in user's identity.
 */
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) redirect("/login")

  const user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image ?? null,
    // Accounts created before the role field existed fall back to seeker.
    role: normalizeRole(session.user.role),
  }

  return <DashboardShell user={user}>{children}</DashboardShell>
}
