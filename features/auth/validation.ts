import type {
  AuthFieldErrors,
  AuthFieldName,
  AuthMode,
  AuthValues,
} from "./types"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const ROLE_VALUES = ["seeker", "recruiter", "admin"] as const

export function validateAuthForm(
  mode: AuthMode,
  values: AuthValues
): AuthFieldErrors {
  const errors: AuthFieldErrors = {}
  const read = (key: AuthFieldName) => (values[key] ?? "").trim()
  const name = read("name")
  const email = read("email")
  const password = values.password ?? ""
  const confirmPassword = values.confirmPassword ?? ""

  if (mode === "signup" && !name) {
    errors.name = "Please enter your full name."
  }

  if (!email) {
    errors.email = "Please enter your email address."
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address."
  }

  if (!password) {
    errors.password = "Please enter your password."
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters."
  }

  if (mode === "signup") {
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password."
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match."
    }

    const role = read("role")
    if (!role) {
      errors.role = "Please choose an account type."
    } else if (!(ROLE_VALUES as readonly string[]).includes(role)) {
      errors.role = "Invalid account type."
    }
  }

  return errors
}
