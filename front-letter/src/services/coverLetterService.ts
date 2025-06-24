// services/coverLetterService.ts
import axios from "axios"
import type { CLGenerationForm } from "@/schemas/coverLetterSchema"


export const generateCoverLetter = async (data: CLGenerationForm) => {
  const fd = new FormData()
  if (data.resume) fd.append("resume", data.resume)
  fd.append("jobPosting", data.jobPosting)
  fd.append("userRequests", data.userRequests ?? "")
  const res = await axios.post("/api/cover-letter/generate", fd)
  return res.data
}
