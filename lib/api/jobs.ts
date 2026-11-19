import type { ManageJobRow } from "@/features/dashboard/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// Errors come back as HTML, never JSON — check status before parsing.
export const getJobs = async (query = ""): Promise<ManageJobRow[]> => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`, {
    method: "GET",
  })
  if (!res.ok) {
    throw new Error(`GET /jobs failed: ${res.status}`)
  }
  return res.json()
}
