"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  BanIcon,
  EllipsisIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  RotateCcwIcon,
  Trash2Icon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  categories,
  categoryLabel,
  FormValues,
} from "@/features/dashboard/components/JobPostForm"

import { cn } from "@/lib/utils"
import { getJobs } from "@/lib/api/jobs"

type ManageJobRow = FormValues & {
  _id: string
  ref: string
  status: "Active" | "Closed" | "Draft"
  applicants: number
  datePosted: string
}

type StatusFilter = "All" | ManageJobRow["status"]

const statusFilters: StatusFilter[] = ["All", "Active", "Closed", "Draft"]

const statusClass: Record<ManageJobRow["status"], string> = {
  Active: "bg-emerald-500/15 text-emerald-400",
  Closed: "bg-white/10 text-white/50",
  Draft: "bg-amber-500/15 text-amber-400",
}

const filterItems = [{ value: "all", label: "All Categories" }, ...categories]

const itemClass =
  "gap-2.5 rounded-[8px] px-2.5 py-2 text-sm text-white/80 focus:bg-white/10 focus:text-white"

// Fetch jobs from the API
export function ManageJobs() {
  useEffect(() => {
    // Define an asynchronous function to fetch jobs
    async function fetchJobs() {
      const jobs = await getJobs()
      setRows(jobs)
    }
    // Execute the fetch function.
    fetchJobs()
  }, [])

  const [rows, setRows] = useState<ManageJobRow[]>([])
  const [status, setStatus] = useState<StatusFilter>("All")
  const [category, setCategory] = useState("all")

  /* Chip counts reflect the category filter (so numbers always match the
     rows on screen); the status filter narrows the visible table only. */
  const categoryRows =
    category === "all"
      ? rows
      : rows.filter((row) => row.jobCategory === category)

  const counts: Record<StatusFilter, number> = {
    All: categoryRows.length,
    Active: categoryRows.filter((row) => row.status === "Active").length,
    Closed: categoryRows.filter((row) => row.status === "Closed").length,
    Draft: categoryRows.filter((row) => row.status === "Draft").length,
  }

  const visible =
    status === "All"
      ? categoryRows
      : categoryRows.filter((row) => row.status === status)

  /* Plan usage counts every active post, regardless of the current view. */
  const activeCount = rows.filter((row) => row.status === "Active").length

  function toggleStatus(id: string) {
    setRows((prev) =>
      prev.map((row): ManageJobRow =>
        row._id === id
          ? {
              ...row,
              status: row.status === "Closed" ? "Active" : "Closed",
            }
          : row
      )
    )
  }

  function deleteRow(row: ManageJobRow) {
    if (window.confirm(`Delete "${row.jobTitle}"? This cannot be undone.`)) {
      setRows((prev) => prev.filter((r) => r._id !== row._id))
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Manage Jobs
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Oversee all your active listings and historical job posts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            render={<Link href="/dashboard/recruiter/jobs/new" />}
            nativeButton={false}

            className="h-9 gap-2 rounded-[10px] bg-[#5c53fe] px-4 text-white hover:bg-[#4a42f0]"
          >
            <PlusIcon className="size-4" />
            Post New Job
          </Button>
        </div>
      </header>

      {/* Filters: status chips (Figma "Active (128)" style) + category select */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filter by status"
          className="flex flex-wrap items-center gap-2"
        >
          {statusFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={status === filter}
              onClick={() => setStatus(filter)}
              className={cn(
                "flex h-9 items-center rounded-[10px] border border-white/10 bg-[#0c0c0f] px-4 text-sm text-white/70 transition-colors hover:border-white/25",
                status === filter &&
                  "border-[#5c53fe] bg-[#5c53fe]/15 text-[#8f88ff]"
              )}
            >
              {filter} ({counts[filter]})
            </button>
          ))}
        </div>

        <Select
          value={category}
          items={filterItems}
          onValueChange={(value) => setCategory(String(value ?? "all"))}
        >
          <SelectTrigger
            aria-label="Filter by category"
            className="h-9 rounded-[10px] border-white/10 bg-[#0c0c0f] px-3.5 text-sm text-white"
          >
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-[#151516] text-white ring-white/10">
            {filterItems.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="focus:bg-white/10 focus:text-white"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table: Category/Type drop below lg; the container scrolls as a net */}
      <Card className="bg-[#141418] text-white ring-white/6">
        <CardContent className="px-5 pb-1">
          <Table className="min-w-120 lg:min-w-180 [&_tr]:border-white/6">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-white/50">Job Title</TableHead>
                <TableHead className="hidden text-white/50 lg:table-cell">
                  Category
                </TableHead>
                <TableHead className="hidden text-white/50 lg:table-cell">
                  Type
                </TableHead>
                <TableHead className="text-white/50">Applicants</TableHead>
                <TableHead className="text-white/50">Date Posted</TableHead>
                <TableHead className="text-white/50">Status</TableHead>
                <TableHead className="text-right text-white/50">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.length === 0 ? (
                <TableRow key="no-results" className="hover:bg-transparent">
                  <TableCell
                    colSpan={7}
                    className="px-3 py-10 text-center text-white/50"
                  >
                    No jobs match the current filters.
                  </TableCell>
                </TableRow>
              ) : (
                visible.map((row) => (
                  <TableRow key={row._id} className="hover:bg-white/3">
                    <TableCell className="px-3 py-3.5">
                      <span className="block font-medium text-white">
                        {row.jobTitle}
                      </span>
                      <span className="block text-xs text-white/50">
                        Ref: {row.ref}
                      </span>
                    </TableCell>
                    <TableCell className="hidden px-3 py-3.5 text-white/70 lg:table-cell">
                      {categoryLabel(row.jobCategory)}
                    </TableCell>
                    <TableCell className="hidden px-3 py-3.5 text-white/70 lg:table-cell">
                      {row.jobType}
                    </TableCell>
                    <TableCell className="px-3 py-3.5 whitespace-nowrap text-white/70">
                      {row.applicants}
                    </TableCell>
                    <TableCell className="px-3 py-3.5 whitespace-nowrap text-white/70">
                      {row.datePosted}
                    </TableCell>
                    <TableCell className="px-3 py-3.5">
                      <Badge
                        className={cn(
                          "border-transparent",
                          statusClass[row.status]
                        )}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3 py-3.5 text-right">
                      <RowActions
                        row={row}
                        onToggleStatus={toggleStatus}
                        onDelete={deleteRow}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function RowActions({
  row,
  onToggleStatus,
  onDelete,
}: {
  row: ManageJobRow
  onToggleStatus: (id: string) => void
  onDelete: (row: ManageJobRow) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Actions for ${row.jobTitle}`}
        className="flex size-8 items-center justify-center rounded-[8px] text-white/60 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:bg-white/10"
      >
        <EllipsisIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52 border border-white/10 bg-[#1e1e21] p-1.5 text-white shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
      >
        {/* No edit route yet — `?edit=` is a no-op placeholder until it exists */}
        <DropdownMenuItem
          render={
            <Link href={`/dashboard/recruiter/jobs/new?edit=${row._id}`} />
          }
          className={itemClass}
        >
          <PencilIcon className="size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link href="/dashboard/recruiter/applications" />}
          className={itemClass}
        >
          <EyeIcon className="size-4" />
          View Applicants
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onToggleStatus(row._id)}
          className={itemClass}
        >
          {row.status === "Closed" ? (
            <RotateCcwIcon className="size-4" />
          ) : (
            <BanIcon className="size-4" />
          )}
          {row.status === "Closed" ? "Reopen" : "Close"}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete(row)}
          className="gap-2.5 rounded-[8px] px-2.5 py-2 text-sm"
        >
          <Trash2Icon className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
