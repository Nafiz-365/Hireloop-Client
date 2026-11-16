import type { Metadata } from "next"

import { AuthForm } from "@/features/auth/components/AuthForm"

export const metadata: Metadata = {
  title: "Sign in | HireLoop",
  description: "Sign in to your HireLoop account to continue your job search.",
}

export default function LoginPage() {
  return <AuthForm mode="signin" />
}
