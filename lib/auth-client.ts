import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
// Type-only: erased at compile time — never a value import (server code would
// leak into the client bundle). Required so `role` typechecks on signUp.email.
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, useSession } = createAuthClient()
