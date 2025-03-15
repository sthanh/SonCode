import { Skeleton } from "./ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

export default function SearchSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-6 w-[90%]" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </CardHeader>

          <CardContent className="pb-2">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-4 w-[30%]" />
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex justify-between mb-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-12" />
              </div>
              <Skeleton className="h-2 w-full mb-2" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

