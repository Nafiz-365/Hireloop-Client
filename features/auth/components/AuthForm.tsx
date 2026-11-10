"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { SectionLabel } from "@/components/common/SectionLabel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { inter, interTight, manrope } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import type {
  AuthFieldConfig,
  AuthFieldErrors,
  AuthFieldName,
  AuthMode,
  AuthValues,
} from "../types"
import { validateAuthForm } from "../validation"

const fieldsByMode: Record<AuthMode, AuthFieldConfig[]> = {
  signin: [
    {
      name: "email",
      label: "Email address",
      type: "email",
      placeholder: "you@example.com",
      autoComplete: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      autoComplete: "current-password",
    },
  ],
  signup: [
    {
      name: "name",
      label: "Full name",
      type: "text",
      placeholder: "Jane Doe",
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email address",
      type: "email",
      placeholder: "you@example.com",
      autoComplete: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "At least 8 characters",
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: "Confirm password",
      type: "password",
      placeholder: "Re-enter your password",
      autoComplete: "new-password",
    },
  ],
}

const copyByMode = {
  signin: {
    eyebrow: "Sign in",
    title: "Welcome back",
    sub: "Pick up where you left off — your saved jobs and matches are waiting.",
    submit: "Sign in",
    pending: "Signing in…",
    success:
      "Sign-in data collected — check the browser console. Authentication will be wired up later.",
    altPrompt: "New to HireLoop?",
    altAction: "Create an account",
    altHref: "/signup",
  },
  signup: {
    eyebrow: "Sign up",
    title: "Create your account",
    sub: "Build a profile in three minutes and start receiving matches tomorrow morning.",
    submit: "Create account",
    pending: "Creating account…",
    success:
      "Sign-up data collected — check the browser console. Authentication will be wired up later.",
    altPrompt: "Already have an account?",
    altAction: "Sign in",
    altHref: "/login",
  },
} satisfies Record<AuthMode, Record<string, string>>

/* Figma hero search: #101010, stroke #ffffff@0.20, r16 — reused for auth fields. */
const inputClass = cn(
  inter.className,
  "h-12 rounded-[16px] border-white/20 bg-[#101010] px-4 text-base leading-[1.7] text-white shadow-none placeholder:text-white/40 md:text-base dark:bg-[#101010]",
  "focus-visible:border-[#5c53fe] focus-visible:ring-[#5c53fe]/30",
  "aria-invalid:border-[#ff6b7a] aria-invalid:ring-[#ff6b7a]/25"
)

const submitClass = cn(
  manrope.className,
  "h-13 w-full rounded-[12px] border border-[#090a15]/10 bg-[#5c53fe] px-4 text-lg leading-[1.45] font-semibold text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#6a61ff] hover:text-white focus-visible:ring-[#5c53fe]/40"
)

const toggleClass = cn(
  manrope.className,
  "bg-transparent p-0 text-base leading-[1.6] font-semibold text-[#5c53fe] hover:bg-transparent hover:text-[#6a61ff]"
)

/**
 * Single integration point for better-auth (see `lib/auth-client.ts`).
 */
async function handleSubmit(mode: AuthMode, values: AuthValues): Promise<void> {
  // Placeholder until auth is wired up — swap for authClient.signIn/signUp.
  console.log(`[auth:${mode}] collected form data`, values)
  await Promise.resolve()
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [errors, setErrors] = useState<AuthFieldErrors>({})
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle")
  const [pending, setPending] = useState(false)
  const [revealed, setRevealed] = useState<
    Partial<Record<AuthFieldName, boolean>>
  >({})

  const copy = copyByMode[mode]
  const fields = fieldsByMode[mode]

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const values = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as AuthValues

    const nextErrors = validateAuthForm(mode, values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error")
      return
    }

    setPending(true)
    await handleSubmit(mode, values)
    setPending(false)
    setStatus("ok")
  }

  return (
    <main className="relative isolate overflow-x-clip bg-[#010103] text-white">
      {/* Purple glow behind the card — same treatment as the homepage CTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-140 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(92,83,254,0.35)_0%,rgba(92,83,254,0)_100%)]"
      />

      <section className="relative z-10 flex min-h-[calc(100svh-6rem)] items-center justify-center px-4 py-14 sm:px-6 sm:py-16">
        <div className="w-full max-w-125 rounded-[24px] border border-white/10 bg-[#151516] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45)] sm:p-9">
          <div className="flex flex-col items-center text-center">
            <SectionLabel>{copy.eyebrow}</SectionLabel>
            <h1
              className={cn(
                manrope.className,
                "mt-5 text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-4xl"
              )}
            >
              {copy.title}
            </h1>
            <p
              className={cn(
                manrope.className,
                "mt-3 text-base leading-[1.6] text-white/70"
              )}
            >
              {copy.sub}
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="mt-8 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-4">
              {fields.map((field) => {
                const error = errors[field.name]
                const isPassword = field.type === "password"
                const show = Boolean(revealed[field.name])

                return (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label
                      htmlFor={`auth-${field.name}`}
                      className={cn(
                        interTight.className,
                        "text-sm leading-normal font-medium text-white/70"
                      )}
                    >
                      {field.label}
                    </label>

                    <div className="relative">
                      <Input
                        id={`auth-${field.name}`}
                        name={field.name}
                        type={isPassword && show ? "text" : field.type}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        aria-invalid={error ? true : undefined}
                        className={cn(
                          inputClass,
                          isPassword && "pr-12",
                          error &&
                            "border-[#ff6b7a] focus-visible:border-[#ff6b7a] focus-visible:ring-[#ff6b7a]/25"
                        )}
                      />

                      {isPassword && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={show ? "Hide password" : "Show password"}
                          aria-pressed={show}
                          onClick={() =>
                            setRevealed((prev) => ({
                              ...prev,
                              [field.name]: !prev[field.name],
                            }))
                          }
                          className="absolute top-1/2 right-2.5 -translate-y-1/2 text-white/50 hover:bg-white/10 hover:text-white"
                        >
                          {show ? (
                            <EyeOffIcon className="size-4" />
                          ) : (
                            <EyeIcon className="size-4" />
                          )}
                        </Button>
                      )}
                    </div>

                    {error && (
                      <p
                        role="alert"
                        className={cn(
                          inter.className,
                          "text-sm leading-[1.5] text-[#ff8a96]"
                        )}
                      >
                        {error}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {status === "error" && (
              <p
                role="status"
                className={cn(
                  inter.className,
                  "rounded-[12px] border border-[#ff6b7a]/40 bg-[#ff6b7a]/10 px-4 py-3 text-sm leading-[1.5] text-[#ff8a96]"
                )}
              >
                Please fix the highlighted fields and try again.
              </p>
            )}

            {status === "ok" && (
              <p
                role="status"
                className={cn(
                  inter.className,
                  "rounded-[12px] border border-[#5c53fe]/40 bg-[#5c53fe]/10 px-4 py-3 text-sm leading-[1.5] text-white/80"
                )}
              >
                {copy.success}
              </p>
            )}

            <Button type="submit" disabled={pending} className={submitClass}>
              {pending ? copy.pending : copy.submit}
            </Button>
          </form>

          {/* Toggle between the two pages */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-center">
            <span
              className={cn(
                manrope.className,
                "text-sm leading-[1.6] text-white/70"
              )}
            >
              {copy.altPrompt}
            </span>
            <Button
              render={<Link href={copy.altHref} />}
              nativeButton={false}
              className={toggleClass}
            >
              {copy.altAction}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
