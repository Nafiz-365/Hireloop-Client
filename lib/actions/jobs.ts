import { FormValues } from "@/features/dashboard/components/JobPostForm"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// The API answers errors with HTML (Express error page), never JSON — so
// check status first or `res.json()` throws "Unexpected token '<'".
async function readJson(res: Response, method: string, path: string) {
  if (!res.ok) {
    throw new Error(`${method} ${path} failed: ${res.status}`)
  }
  return res.json()
}

export const createJob = async (data: FormValues) => {
  const path = "/jobs"
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return readJson(res, "POST", path)
}

export const deleteJob = async (jobId: string) => {
  const path = `/jobs/${jobId}`
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return readJson(res, "DELETE", path)
}
