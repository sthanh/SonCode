import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Search, Filter, ArrowUpDown } from "lucide-react"
import SearchResults from "@/components/search-results"
import SearchFilters from "@/components/search-filters"
import ChatbotButton from "@/components/chatbot-button"
import SearchSkeleton from "@/components/search-skeleton"

export const metadata: Metadata = {
  title: "Find Clinical Trials | TrialMatch",
  description: "Search for clinical trials that match your medical profile and needs",
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TrialMatch</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/search" className="text-primary font-medium">
              Find Trials
            </Link>
            <Link href="/how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <span className="sr-only">Profile</span>
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Clinical Trials</h1>
            <p className="text-muted-foreground">Search for trials that match your medical profile and needs</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="mr-2">
              <Filter className="mr-2 h-4 w-4" />
              Saved Searches
            </Button>
            <Button>
              <Sparkles className="mr-2 h-4 w-4" />
              AI Recommendations
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by condition, treatment, or keyword (e.g., 'breast cancer', 'immunotherapy')"
            className="pl-10 py-6 text-lg"
          />
          <Button className="absolute right-1 top-1 bottom-1">Search</Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <SearchFilters />
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Trials</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby</TabsTrigger>
                  <TabsTrigger value="recruiting">Recruiting</TabsTrigger>
                </TabsList>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort by: Relevance
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <Suspense fallback={<SearchSkeleton />}>
                  <SearchResults />
                </Suspense>
              </TabsContent>

              <TabsContent value="recommended" className="mt-0">
                <Suspense fallback={<SearchSkeleton />}>
                  <SearchResults filterType="recommended" />
                </Suspense>
              </TabsContent>

              <TabsContent value="nearby" className="mt-0">
                <Suspense fallback={<SearchSkeleton />}>
                  <SearchResults filterType="nearby" />
                </Suspense>
              </TabsContent>

              <TabsContent value="recruiting" className="mt-0">
                <Suspense fallback={<SearchSkeleton />}>
                  <SearchResults filterType="recruiting" />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Chatbot Button */}
      <ChatbotButton />

      {/* Footer */}
      <footer className="bg-muted py-6 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TrialMatch. All rights reserved.</p>
          <p className="mt-2">
            This platform is for informational purposes only and is not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Missing component for type checking
function User(props: any) {
  return <div {...props} />
}

