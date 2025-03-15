import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bookmark, MapPin, Calendar, ArrowRight, Info } from "lucide-react"

interface SearchResultsProps {
  filterType?: "all" | "recommended" | "nearby" | "recruiting"
}

export default function SearchResults({ filterType = "all" }: SearchResultsProps) {
  // Mock data - in a real app, this would come from an API call
  const trials = [
    {
      id: "NCT04276441",
      title: "Study of Pembrolizumab Plus Lenvatinib Versus Chemotherapy for Endometrial Cancer",
      phase: "Phase 3",
      condition: "Endometrial Cancer",
      location: "Memorial Sloan Kettering Cancer Center, New York, NY",
      distance: "5 miles away",
      status: "Recruiting",
      matchScore: 9.5,
      matchReason: "Targets your specific cancer type and previous treatment history",
      lastUpdated: "2023-11-15",
      isRecommended: true,
      isNearby: true,
    },
    {
      id: "NCT03914612",
      title: "Olaparib With or Without Atezolizumab in Treating Patients With Advanced BRCA1/2 Mutated Cancer",
      phase: "Phase 2",
      condition: "BRCA-Mutated Breast Cancer",
      location: "Dana-Farber Cancer Institute, Boston, MA",
      distance: "350 miles away",
      status: "Recruiting",
      matchScore: 8.7,
      matchReason: "Matches your BRCA mutation status and treatment history",
      lastUpdated: "2023-10-22",
      isRecommended: true,
      isNearby: false,
    },
    {
      id: "NCT04191135",
      title:
        "A Study of Multiple Immunotherapy-Based Treatment Combinations in Participants With Metastatic Non-small Cell Lung Cancer",
      phase: "Phase 1/2",
      condition: "Non-small Cell Lung Cancer",
      location: "MD Anderson Cancer Center, Houston, TX",
      distance: "1,500 miles away",
      status: "Active, not recruiting",
      matchScore: 7.2,
      matchReason: "Targets your cancer type but not currently recruiting",
      lastUpdated: "2023-09-30",
      isRecommended: false,
      isNearby: false,
    },
    {
      id: "NCT04209660",
      title: "Study of Cabozantinib in Combination With Atezolizumab to Treat Advanced Renal Cell Carcinoma",
      phase: "Phase 3",
      condition: "Renal Cell Carcinoma",
      location: "Johns Hopkins University, Baltimore, MD",
      distance: "200 miles away",
      status: "Recruiting",
      matchScore: 6.8,
      matchReason: "Similar to your condition but not an exact match",
      lastUpdated: "2023-12-01",
      isRecommended: false,
      isNearby: false,
    },
  ]

  // Filter trials based on the selected tab
  const filteredTrials = trials.filter((trial) => {
    if (filterType === "all") return true
    if (filterType === "recommended") return trial.isRecommended
    if (filterType === "nearby") return trial.isNearby
    if (filterType === "recruiting") return trial.status === "Recruiting"
    return true
  })

  if (filteredTrials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No trials found matching your criteria.</p>
        <Button variant="outline" className="mt-4">
          Adjust Filters
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground mb-4">Showing {filteredTrials.length} trials matching your search</p>

      {filteredTrials.map((trial) => (
        <Card key={trial.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={trial.status === "Recruiting" ? "default" : "secondary"}>{trial.status}</Badge>
                  <Badge variant="outline">{trial.phase}</Badge>
                  <span className="text-xs text-muted-foreground">ID: {trial.id}</span>
                </div>
                <Link href={`/trials/${trial.id}`} className="hover:underline">
                  <h3 className="text-xl font-semibold">{trial.title}</h3>
                </Link>
                <p className="text-muted-foreground mt-1">{trial.condition}</p>
              </div>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Bookmark className="h-5 w-5" />
                <span className="sr-only">Save trial</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{trial.location}</span>
                <span className="ml-1 text-xs">({trial.distance})</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Updated: {trial.lastUpdated}</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-medium">Match Score</span>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <span className="text-lg font-bold text-primary">{trial.matchScore}/10</span>
              </div>
              <Progress value={trial.matchScore * 10} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">{trial.matchReason}</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              View Summary
            </Button>
            <Link href={`/trials/${trial.id}`}>
              <Button size="sm">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}

      <div className="mt-8 text-center">
        <Button variant="outline">Load More Trials</Button>
      </div>
    </div>
  )
}

