import { headers } from "next/headers"
import { redirect } from "next/navigation"

import {
  normalizeRole,
  roleHome,
  type Role,
} from "@/features/dashboard/data/nav"
import { auth } from "@/lib/auth"

/**
 * Server-side guard for a dashboard role segment
 * (`app/(dashboard)/dashboard/<role>/layout.tsx`).
 *
 * - no session          → /login
 * - signed in as another role → that role's dashboard home (no dead URLs)
 */
export async function requireRole(role: Role): Promise<void> {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) redirect("/login")

  const actual = normalizeRole(session.user.role)
  if (actual !== role) redirect(roleHome[actual])
}
