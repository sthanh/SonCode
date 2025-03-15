'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Card, CardContent } from "@/app/components/ui/card"
import { Sparkles, Search, Filter, ArrowUpDown } from "lucide-react"
import SearchResults from "@/app/components/search-results"
import SearchFilters from "@/app/components/search-filters"
import ChatbotButton from "@/app/components/chatbot-button"
import SearchSkeleton from "@/app/components/search-skeleton"

interface Trial {
  id: string;
  title: string;
  location: string;
  phase: string;
  description: string;
  url: string;
  relevanceScore?: number;
  relevanceExplanation?: string;
}

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [phase, setPhase] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [results, setResults] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/profile');
      console.log("fetchProfile response:", response); // Added log
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Failed to fetch profile');
        // Handle the case where the profile cannot be fetched
      }
    };

    fetchProfile();
  }, []);

  const handleBasicSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setEnhanced(false);

    try {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (phase) params.append('phase', phase);
      if (status) params.append('status', status);
      if (location) params.append('location', location);
      if (distance) params.append('distance', distance);

      const response = await fetch(`/api/trials/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch initial data');
      }
      const data = await response.json();
      const trials: Trial[] = data.studies.map((study: any) => {
        const protocolSection = study.protocolSection;
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
        return {
          id,
          title,
          location,
          phase,
          status,
          condition,
          lastUpdated
        }
      });
      if (profile) {
        const rankResponse = await fetch('/api/ai/rank-trial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ profile, trials: trials })
        });

        if (rankResponse.ok) {
          const rankedTrials = await rankResponse.json();
          setResults(rankedTrials);
        } else {
          console.error("Failed to rank the trials")
          setResults(trials)
        }
      } else {
        setResults(trials);
      }

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
};

  const handleEnhancedSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setEnhanced(true);
    let enhancedQuery = keyword;

    try {
      const enhanceResponse = await fetch('/api/ai/enhance-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: keyword }),
      });

      if (enhanceResponse.ok) {
        const { enhancedQuery: aiEnhancedQuery } = await enhanceResponse.json();
        enhancedQuery = aiEnhancedQuery || keyword;
      } else {
        console.error('Failed to enhance query');
      }
    } catch (enhanceError) {
      console.error('Error enhancing query:', enhanceError);
    }


    try {
      const params = new URLSearchParams();
      if (enhancedQuery) params.append('keyword', enhancedQuery);
      if (phase) params.append('phase', phase);
      if (status) params.append('status', status);
      if (location) params.append('location', location);
      if (distance) params.append('distance', distance);

      const response = await fetch(`/api/trials/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const trials = data.map((item: any) => {
        const fields = item.protocolSection;
        return {
          id: fields.identificationModule.nctId,
          title: fields.identificationModule.officialTitle,
          location:
            fields.contactsLocationsModule.locations?.[0]?.city +
            ', ' +
            fields.contactsLocationsModule.locations?.[0]?.state,
          phase: fields.designModule?.phaseList?.phase?.[0] || 'Unknown',
          description: fields.descriptionModule.briefSummary,
          url: `https://clinicaltrials.gov/study/${fields.identificationModule.nctId}`,
        };
      });
      if (profile) {
        const rankResponse = await fetch('/api/ai/rank-trial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ profile, trials: trials })
        });

        if (rankResponse.ok) {
          const rankedTrials = await rankResponse.json();
          setResults(rankedTrials);
        } else {
          console.error("Failed to rank the trials")
          setResults(trials)
        }
      } else {
        setResults(trials)
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


    const phases = [
    { key: 'Phase 1', label: 'Phase 1' },
    { key: 'Phase 2', label: 'Phase 2' },
    { key: 'Phase 3', label: 'Phase 3' },
    { key: 'Phase 4', label: 'Phase 4' },
  ];

  const statuses = [
    { key: 'ACTIVE_NOT_RECRUITING', label: 'Active, not recruiting' },
    { key: 'COMPLETED', label: 'Completed' },
    { key: 'ENROLLING_BY_INVITATION', label: 'Enrolling by invitation' },
    { key: 'NOT_YET_RECRUITING', label: 'Not yet recruiting' },
    { key: 'RECRUITING', label: 'Recruiting' },
    { key: 'SUSPENDED', label: 'Suspended' },
    { key: 'TERMINATED', label: 'Terminated' },
    { key: 'WITHDRAWN', label: 'Withdrawn' },
    { key: 'AVAILABLE', label: 'Available' },
    { key: 'NO_LONGER_AVAILABLE', label: 'No longer available' },
    { key: 'TEMPORARILY_NOT_AVAILABLE', label: 'Temporarily not available' },
    { key: 'APPROVED_FOR_MARKETING', label: 'Approved for marketing' },
    { key: 'WITHHELD', label: 'Withheld' },
    { key: 'UNKNOWN', label: 'Unknown' },
  ];

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
            value={keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
          />
          <Button className="absolute right-1 top-1 bottom-1" onClick={handleBasicSearch}>Search</Button>
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
                  <SearchResults results={results} />
                </Suspense>
              </TabsContent>
              
              <TabsContent value="recommended" className="mt-0">
                <Suspense fallback={<SearchSkeleton />}>
                  <SearchResults results={results} filterType="recommended" />
                </Suspense>
              </TabsContent>
              
              <TabsContent value="nearby" className="mt-0">
                <Suspense fallback={<SearchSkeleton />}>
                  <SearchResults results={results} filterType="nearby" />
                </Suspense>
              </TabsContent>
              
              <TabsContent value="recruiting" className="mt-0">
                <Suspense fallback={<SearchSkeleton />}>
                  <SearchResults results={results} filterType="recruiting" />
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
  );
}

// Missing component for type checking
function User(props: any) {
  return <div {...props}></div>
}