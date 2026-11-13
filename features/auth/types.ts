export type AuthMode = "signin" | "signup"

export type AuthFieldName =
  "name" | "email" | "password" | "confirmPassword" | "role"

export type AuthValues = Record<string, string>

export type AuthFieldErrors = Partial<Record<AuthFieldName, string>>

export interface AuthFieldConfig {
  name: AuthFieldName
  label: string
  type: "text" | "email" | "password"
  placeholder: string
  autoComplete: string
}
