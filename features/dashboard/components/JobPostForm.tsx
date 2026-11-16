"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

/**
 * Figma: `hireloop.fig` → Hireloop 2.0 → `Add New Job` — "Post a New Job".
 * Layout: breadcrumb + heading + Publish Job, then the Figma split
 * "Main Content Layout (Form 60% + Live Preview 40%)".
 *
 * Deliberately simple: one `values` state, explicit per-field onChange, no
 * backend — submitting validates and shows a demo success banner. A content
 * API comes in a later phase (same pattern as the homepage mock data).
 */

const categories = [
  { value: "engineering-tech", label: "Engineering & Tech" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "finance", label: "Finance" },
  { value: "operations", label: "Operations" },
  { value: "customer-support", label: "Customer Support" },
]

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const

const frequencies = ["per hour", "per day", "per month", "per year"]

type FormValues = {
  jobTitle: string
  companyName: string
  jobCategory: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  jobTitle: "",
  companyName: "",
  jobCategory: "",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "",
  responsibilities: "",
  qualifications: "",
}

/* Figma dashboard tokens — same treatment as the recruiter home cards. */
const fieldClass = cn(
  "h-10 w-full rounded-[10px] border-white/10 bg-[#0c0c0f] px-3.5 text-sm text-white shadow-none placeholder:text-white/35",
  "focus-visible:border-[#5c53fe] focus-visible:ring-[#5c53fe]/30",
  "aria-invalid:border-[#ff6b7a] aria-invalid:ring-[#ff6b7a]/25"
)

const labelClass = "text-sm font-medium text-white/70"

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  const required: (keyof FormValues)[] = [
    "jobTitle",
    "companyName",
    "jobCategory",
    "jobType",
    "location",
    "responsibilities",
    "qualifications",
  ]

  for (const key of required) {
    if (!String(values[key]).trim()) {
      errors[key] = "This field is required."
    }
  }

  if (values.minSalary && values.maxSalary) {
    if (Number(values.minSalary) > Number(values.maxSalary)) {
      errors.maxSalary = "Max salary must be greater than or equal to min."
    }
  }

  return errors
}

export function JobPostForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "ok">("idle")

  /* One handler for every plain input/textarea/radio — the field name is the
     state key, so adding a field never adds boilerplate. Select and Checkbox
     wire the same setter through their own change callbacks. */
  function onField(name: keyof FormValues) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [name]: e.target.value }))
      setStatus("idle")
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // No content API yet — demo publish: confirm, then clear the form.
    setStatus("ok")
    formRef.current?.reset()
    setValues(initialValues)

    // console.log("Demo publish:", values)
  }

  const salary = formatSalary(values)

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-6"
    >
      {/* Breadcrumb + heading + publish action */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-white/50"
          >
            <Link
              href="/dashboard/recruiter/jobs"
              className="transition-colors hover:text-white"
            >
              Manage Jobs
            </Link>
            <ChevronRightIcon className="size-3.5" aria-hidden="true" />
            <span className="font-medium text-white/80">
              Create New Listing
            </span>
          </nav>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Post a New Job
          </h1>
          <p className="text-sm text-white/60">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>

        <Button
          type="submit"
          className="h-9 rounded-[10px] bg-[#5c53fe] px-4 text-white hover:bg-[#4a42f0]"
        >
          Publish Job
        </Button>
      </header>

      {status === "ok" && (
        <p
          role="status"
          className="rounded-[12px] border border-[#5c53fe]/40 bg-[#5c53fe]/10 px-4 py-3 text-sm text-white/80"
        >
          Job published — this is a demo form, nothing was saved yet.
        </p>
      )}

      {Object.keys(errors).length > 0 && (
        <p
          role="alert"
          className="rounded-[12px] border border-[#ff6b7a]/40 bg-[#ff6b7a]/10 px-4 py-3 text-sm text-[#ff8a96]"
        >
          Please fix the highlighted fields and try again.
        </p>
      )}

      {/* Figma: Main Content Layout (Form 60% + Live Preview 40%) */}
      <div className="grid items-start gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-6">
          {/* 1. Basic Information */}
          <Card className="bg-[#141418] text-white ring-white/6">
            <CardHeader className="px-5">
              <CardTitle className="text-base font-semibold text-white">
                1. Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-5 pb-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="jobTitle" className={labelClass}>
                  Job Title <span aria-hidden="true">*</span>
                </Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="Frontend Developer"
                  aria-invalid={errors.jobTitle ? true : undefined}
                  className={fieldClass}
                  onChange={onField("jobTitle")}
                />
                {errors.jobTitle && <FieldError>{errors.jobTitle}</FieldError>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="companyName" className={labelClass}>
                    Company Name <span aria-hidden="true">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="HirePulse Network"
                    aria-invalid={errors.companyName ? true : undefined}
                    className={fieldClass}
                    onChange={onField("companyName")}
                  />
                  {errors.companyName && (
                    <FieldError>{errors.companyName}</FieldError>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="jobCategory" className={labelClass}>
                    Job Category <span aria-hidden="true">*</span>
                  </Label>
                  <Select
                    name="jobCategory"
                    value={values.jobCategory || null}
                    items={categories}
                    onValueChange={(value) => {
                      setValues((prev) => ({
                        ...prev,
                        jobCategory: String(value ?? ""),
                      }))
                      setStatus("idle")
                    }}
                  >
                    <SelectTrigger
                      id="jobCategory"
                      aria-invalid={errors.jobCategory ? true : undefined}
                      className={cn(
                        fieldClass,
                        "aria-invalid:border-[#ff6b7a] aria-invalid:ring-[#ff6b7a]/25"
                      )}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#151516] text-white ring-white/10">
                      {categories.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value}
                          className="focus:bg-white/10 focus:text-white"
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.jobCategory && (
                    <FieldError>{errors.jobCategory}</FieldError>
                  )}
                </div>
              </div>

              <fieldset className="flex flex-col gap-2">
                <legend className={`${labelClass} mb-2`}>
                  Job Type <span aria-hidden="true">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map((type) => (
                    <label key={type} className="cursor-pointer">
                      <input
                        type="radio"
                        name="jobType"
                        value={type}
                        defaultChecked={type === initialValues.jobType}
                        onChange={onField("jobType")}
                        className="peer sr-only"
                      />
                      <span className="flex h-9 items-center rounded-[10px] border border-white/10 bg-[#0c0c0f] px-4 text-sm text-white/70 transition-colors peer-checked:border-[#5c53fe] peer-checked:bg-[#5c53fe]/15 peer-checked:text-[#8f88ff] peer-hover:border-white/25">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </CardContent>
          </Card>

          {/* 2. Location, Compensation & Timeline */}
          <Card className="bg-[#141418] text-white ring-white/6">
            <CardHeader className="px-5">
              <CardTitle className="text-base font-semibold text-white">
                2. Location, Compensation &amp; Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-5 pb-5">
              <div className="flex items-start gap-3 rounded-[10px] border border-white/10 bg-[#0c0c0f] p-3.5">
                <Checkbox
                  id="isRemote"
                  name="isRemote"
                  checked={values.isRemote}
                  onCheckedChange={(checked) => {
                    setValues((prev) => ({
                      ...prev,
                      isRemote: checked === true,
                    }))
                    setStatus("idle")
                  }}
                  className="mt-0.5 border-white/25 data-checked:border-[#5c53fe] data-checked:bg-[#5c53fe]"
                />
                <div className="flex flex-col gap-0.5">
                  <Label
                    htmlFor="isRemote"
                    className="text-sm font-medium text-white"
                  >
                    Remote Work Allowed
                  </Label>
                  <p className="text-xs text-white/50">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="location" className={labelClass}>
                    Job Location{" "}
                    <span className="text-xs font-normal text-white/40">
                      Required
                    </span>
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="New York, USA"
                    aria-invalid={errors.location ? true : undefined}
                    className={fieldClass}
                    onChange={onField("location")}
                  />
                  {errors.location && (
                    <FieldError>{errors.location}</FieldError>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="deadline" className={labelClass}>
                    Application Deadline
                  </Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    className={cn(fieldClass, "scheme-dark")}
                    onChange={onField("deadline")}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="minSalary" className={labelClass}>
                    Min Salary / Rate
                  </Label>
                  <Input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    min={0}
                    placeholder="25"
                    className={fieldClass}
                    onChange={onField("minSalary")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="maxSalary" className={labelClass}>
                    Max Salary / Rate
                  </Label>
                  <Input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    min={0}
                    placeholder="40"
                    aria-invalid={errors.maxSalary ? true : undefined}
                    className={fieldClass}
                    onChange={onField("maxSalary")}
                  />
                  {errors.maxSalary && (
                    <FieldError>{errors.maxSalary}</FieldError>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="frequency" className={labelClass}>
                    Frequency
                  </Label>
                  <Select
                    name="frequency"
                    value={values.frequency || null}
                    items={frequencies.map((f) => ({ value: f, label: f }))}
                    onValueChange={(value) => {
                      setValues((prev) => ({
                        ...prev,
                        frequency: String(value ?? ""),
                      }))
                      setStatus("idle")
                    }}
                  >
                    <SelectTrigger id="frequency" className={fieldClass}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#151516] text-white ring-white/10">
                      {frequencies.map((frequency) => (
                        <SelectItem
                          key={frequency}
                          value={frequency}
                          className="focus:bg-white/10 focus:text-white"
                        >
                          {frequency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Responsibilities & Requirements */}
          <Card className="bg-[#141418] text-white ring-white/6">
            <CardHeader className="px-5">
              <CardTitle className="text-base font-semibold text-white">
                3. Responsibilities &amp; Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-5 pb-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="responsibilities" className={labelClass}>
                  Key Responsibilities <span aria-hidden="true">*</span>
                </Label>
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  rows={5}
                  placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences…"
                  aria-invalid={errors.responsibilities ? true : undefined}
                  className={cn(fieldClass, "h-auto min-h-32 py-2.5")}
                  onChange={onField("responsibilities")}
                />
                {errors.responsibilities && (
                  <FieldError>{errors.responsibilities}</FieldError>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="qualifications" className={labelClass}>
                  Qualifications &amp; Requirements{" "}
                  <span aria-hidden="true">*</span>
                </Label>
                <Textarea
                  id="qualifications"
                  name="qualifications"
                  rows={5}
                  placeholder="3+ years of experience with React, TypeScript…"
                  aria-invalid={errors.qualifications ? true : undefined}
                  className={cn(fieldClass, "h-auto min-h-32 py-2.5")}
                  onChange={onField("qualifications")}
                />
                {errors.qualifications && (
                  <FieldError>{errors.qualifications}</FieldError>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Figma: Live Preview 40% */}
        <aside className="lg:sticky lg:top-6">
          <Card className="bg-[#141418] text-white ring-white/6">
            <CardHeader className="px-5">
              <CardTitle className="text-base font-semibold text-white">
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-5 pb-5">
              <div className="flex flex-wrap gap-2">
                <Badge>
                  {values.jobCategory
                    ? categoryLabel(values.jobCategory)
                    : "Category"}
                </Badge>
                <Badge>{values.jobType}</Badge>
                {values.isRemote && <Badge tone="accent">Remote</Badge>}
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-white">
                  {values.jobTitle || "Untitled position"}
                </h2>
                <p className="text-sm text-white/60">
                  {[
                    values.companyName || "Company",
                    values.location || "Location",
                  ].join(" · ")}
                </p>
              </div>

              {(salary || values.deadline) && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70">
                  {salary && <span>{salary}</span>}
                  {values.deadline && <span>Closes {values.deadline}</span>}
                </div>
              )}

              <hr className="border-white/10" />

              <PreviewSection
                title="Key Responsibilities"
                body={values.responsibilities}
              />
              <PreviewSection
                title="Qualifications & Requirements"
                body={values.qualifications}
              />
            </CardContent>
          </Card>
        </aside>
      </div>
    </form>
  )
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-sm text-[#ff8a96]">
      {children}
    </p>
  )
}

function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode
  tone?: "default" | "accent"
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "accent"
          ? "bg-[#5c53fe]/15 text-[#8f88ff]"
          : "bg-white/10 text-white/70"
      )}
    >
      {children}
    </span>
  )
}

function PreviewSection({ title, body }: { title: string; body: string }) {
  if (!body.trim()) return null
  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed whitespace-pre-wrap text-white/60">
        {body}
      </p>
    </div>
  )
}

function categoryLabel(value: string) {
  return categories.find((category) => category.value === value)?.label ?? value
}

function formatSalary(values: FormValues) {
  const { minSalary, maxSalary, frequency } = values
  if (!minSalary && !maxSalary) return ""

  const range =
    minSalary && maxSalary
      ? `$${minSalary} – $${maxSalary}`
      : minSalary
        ? `From $${minSalary}`
        : `Up to $${maxSalary}`

  return frequency ? `${range} ${frequency}` : range
}
