import Link from "next/link"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Progress } from "./ui/progress"
import { Bookmark, MapPin, Calendar, ArrowRight, Info } from "lucide-react"

interface Trial {
  id: string;
  title: string;
  location?: string; // This will need to be extracted
  phase?: string;     // This will need to be extracted
  status?: string;
  condition?: string; // This will need to be extracted
  relevanceScore?: number;
  relevanceExplanation?: string;
  lastUpdated?: string;
}

interface SearchResultsProps {
  filterType?: "all" | "recommended" | "nearby" | "recruiting";
  results?: Trial[];
}

export default function SearchResults({ filterType = "all", results = [] }: SearchResultsProps) {
  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No trials found matching your criteria.</p>
        <Button variant="outline" className="mt-4">
          Adjust Filters
        </Button>
      </div>
    );
  }

  const filteredResults = results.filter((trial) => {
    if (filterType === "all") return true;
    // Assuming 'recommended', 'nearby', and 'recruiting' are boolean flags in the API response.  Adjust as necessary.
    // These are placeholders, adjust the logic based on the actual API response and ranking
    if (filterType === "recommended") return trial.relevanceScore && trial.relevanceScore > 7;
    if (filterType === "nearby") return trial.location && trial.location.includes("NY"); // Example: NY trials
    if (filterType === "recruiting") return trial.status === "RECRUITING";
    return true;
  });

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground mb-4">Showing {filteredResults.length} trials matching your search</p>

      {filteredResults.map((trial) => {
        const protocolSection = trial.protocolSection;
        const id = protocolSection?.identificationModule?.nctId;
        const title = protocolSection?.identificationModule?.briefTitle || protocolSection?.identificationModule?.officialTitle || "No title provided";
        const status = protocolSection?.statusModule?.overallStatus || protocolSection?.statusModule?.lastKnownStatus || "Unknown status";
        const phase = protocolSection?.designModule?.phases?.[0] || "Unknown phase";
        const condition = protocolSection?.conditionsModule?.conditions?.[0] || "No condition provided"; // Taking the first condition
        const lastUpdated = protocolSection?.statusModule?.lastUpdatePostDateStruct?.date;

        let location = "Location not provided";
        const locations = protocolSection?.contactsLocationsModule?.locations;
        if (locations && locations.length > 0) {
          const firstLocation = locations[0];
          location = [firstLocation.facility, firstLocation.city, firstLocation.state, firstLocation.country]
            .filter(Boolean)
            .join(', ');
        }


        return (
        <Card key={id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={status === "RECRUITING" ? "default" : "secondary"}>{status}</Badge>
                  <Badge variant="outline">{phase}</Badge>
                  <span className="text-xs text-muted-foreground">ID: {id}</span>
                </div>
                <Link href={`/trial/${id}`} className="hover:underline">
                  <h3 className="text-xl font-semibold">{title}</h3>
                </Link>
                <p className="text-muted-foreground mt-1">{condition}</p>
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
                <span>{location}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Updated: {lastUpdated || "Unknown"}</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-medium">Match Score</span>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <span className="text-lg font-bold text-primary">{trial.relevanceScore ? `${trial.relevanceScore}/10` : "N/A"}</span>
              </div>
              <Progress value={trial.relevanceScore ? trial.relevanceScore * 10 : 0} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">{trial.relevanceExplanation || "No match reason provided"}</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              View Summary
            </Button>
            <Link href={`/trial/${id}`}>
              <Button size="sm">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )})}

      <div className="mt-8 text-center">
        <Button variant="outline">Load More Trials</Button>
      </div>
    </div>
  )
}

