import type { Metadata } from "next"
import TrialDetailPageClient from "./TrialDetailPageClient"

export const metadata: Metadata = {
  title: "Trial Details | TrialMatch",
  description: "Detailed information about a specific clinical trial",
}

export default function TrialDetailPage({ params }: { params: { id: string } }) {
  return <TrialDetailPageClient params={params} />
}

