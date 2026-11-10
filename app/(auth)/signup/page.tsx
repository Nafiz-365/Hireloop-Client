import type { Metadata } from "next"

import { AuthForm } from "@/features/auth/components/AuthForm"

export const metadata: Metadata = {
  title: "Sign up | HireLoop",
  description:
    "Create a free HireLoop account and start receiving job matches tomorrow morning.",
}

export default function SignupPage() {
  return <AuthForm mode="signup" />
}
