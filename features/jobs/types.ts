export interface JobTag {
  icon: string
  text: string
}

export interface JobItem {
  id: string
  title: string
  description: string
  tags: JobTag[]
  applyUrl: string
}
