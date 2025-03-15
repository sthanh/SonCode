"use client"

import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent } from "../../components/ui/card"
import {
  Sparkles,
  ArrowLeft,
  MapPin,
  Calendar,
  FileText,
  Users,
  Bookmark,
  Share2,
  ExternalLink,
  Info,
  CheckCircle,
  XCircle,
  User,
} from "lucide-react"
import TrialChatbot from "../../components/trial-chatbot"
import TrialPhaseIndicator from "../../components/trial-phase-indicator"

export default function TrialDetailPageClient({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the trial data based on the ID
  const trial = {
    id: params.id,
    title: "Study of Pembrolizumab Plus Lenvatinib Versus Chemotherapy for Endometrial Cancer",
    phase: "Phase 3",
    phaseNumber: 3,
    condition: "Endometrial Cancer",
    sponsor: "Merck Sharp & Dohme LLC",
    location: "Memorial Sloan Kettering Cancer Center, New York, NY",
    distance: "5 miles away",
    status: "Recruiting",
    matchScore: 9.5,
    matchReason:
      "This trial targets your specific cancer type (Endometrial Cancer) and aligns with your previous treatment history. The eligibility criteria match your profile, including your age and disease stage.",
    lastUpdated: "2023-11-15",
    startDate: "2020-01-15",
    estimatedCompletion: "2024-12-31",
    description:
      "This is a study of pembrolizumab (KEYTRUDA®) in combination with lenvatinib (LENVIMA®) compared to chemotherapy for the treatment of advanced endometrial cancer. Participants will be randomly assigned to receive either pembrolizumab and lenvatinib, or chemotherapy. The primary study hypothesis is that pembrolizumab in combination with lenvatinib is more effective than chemotherapy for the treatment of advanced endometrial cancer.",
    phaseDescription:
      "Phase 3 trials test the safety and effectiveness of a treatment in larger groups of people (1,000-3,000) and compare the new treatment to commonly used treatments. This phase confirms effectiveness, monitors side effects, and collects information that will allow the treatment to be used safely.",
    currentPhase: {
      name: "Phase 3",
      status: "Active",
      startDate: "2020-01-15",
      estimatedCompletion: "2024-12-31",
      participants: 827,
      targetParticipants: 1000,
      primaryEndpoint: "Progression-Free Survival (PFS)",
      secondaryEndpoints: ["Overall Survival (OS)", "Objective Response Rate (ORR)", "Quality of Life Measures"],
    },
    previousPhases: [
      {
        name: "Phase 2",
        status: "Completed",
        startDate: "2018-03-10",
        completionDate: "2019-11-30",
        participants: 124,
        results: "Showed promising efficacy with manageable safety profile",
      },
      {
        name: "Phase 1",
        status: "Completed",
        startDate: "2017-05-22",
        completionDate: "2018-02-15",
        participants: 45,
        results: "Established safety profile and recommended Phase 2 dose",
      },
    ],
    interventions: [
      {
        type: "Drug",
        name: "Pembrolizumab",
        description: "200 mg intravenously (IV) every 3 weeks (Q3W)",
      },
      {
        type: "Drug",
        name: "Lenvatinib",
        description: "20 mg orally once daily (QD)",
      },
      {
        type: "Drug",
        name: "Chemotherapy",
        description: "Treatment of physician's choice: doxorubicin OR paclitaxel",
      },
    ],
    eligibility: {
      inclusion: [
        "Histologically confirmed diagnosis of endometrial carcinoma",
        "Advanced or recurrent endometrial carcinoma",
        "Measurable disease as per RECIST 1.1",
        "ECOG performance status of 0 or 1",
        "Adequate organ function",
      ],
      exclusion: [
        "Prior systemic anticancer therapy for advanced endometrial carcinoma",
        "Active autoimmune disease requiring systemic treatment",
        "Active central nervous system metastases",
        "History of interstitial lung disease",
        "Uncontrolled hypertension",
      ],
    },
    contacts: [
      {
        role: "Principal Investigator",
        name: "Dr. Jane Smith",
        phone: "212-555-1234",
        email: "smith@example.com",
      },
      {
        role: "Study Coordinator",
        name: "John Doe",
        phone: "212-555-5678",
        email: "doe@example.com",
      },
    ],
    publications: [
      {
        title: "Pembrolizumab plus Lenvatinib in Advanced Endometrial Cancer",
        authors: "Smith J, et al.",
        journal: "New England Journal of Medicine",
        year: 2022,
        url: "#",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TrialMatch</span>
          </Link>
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
        <div className="mb-8">
          <Link href="/search" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to search results
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant={trial.status === "Recruiting" ? "default" : "secondary"}>{trial.status}</Badge>
                <Badge variant="outline">{trial.phase}</Badge>
                <span className="text-sm text-muted-foreground">ID: {trial.id}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{trial.title}</h1>
              <p className="text-muted-foreground mt-1">{trial.condition}</p>
              <p className="text-sm mt-2">Sponsor: {trial.sponsor}</p>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <Button variant="outline" size="sm">
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on ClinicalTrials.gov
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p>{trial.location}</p>
                <p className="text-sm text-muted-foreground">{trial.distance}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Timeline</span>
                </div>
                <p>Start: {trial.startDate}</p>
                <p className="text-sm text-muted-foreground">Est. completion: {trial.estimatedCompletion}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Last Updated</span>
                </div>
                <p>{trial.lastUpdated}</p>
                <p className="text-sm text-muted-foreground">Information verified</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-xl font-semibold">AI Match Analysis</h2>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary mr-2">{trial.matchScore}/10</span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Progress value={trial.matchScore * 10} className="h-2 mb-4" />
            <p className="text-muted-foreground mb-4">{trial.matchReason}</p>
            <div className="text-sm">
              <p className="font-medium mb-2">Key matching factors:</p>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Cancer type matches your diagnosis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Previous treatment history aligns with eligibility</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Trial location is within your preferred distance</span>
                </li>
                <li className="flex items-center">
                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span>Recent lab values need verification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trial Phase Visualization */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Trial Phase Information</h2>
          <TrialPhaseIndicator currentPhase={trial.phaseNumber} status={trial.status} />
          <div className="mt-4 bg-muted/30 rounded-lg p-4">
            <p className="text-muted-foreground">{trial.phaseDescription}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Current Phase Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{trial.currentPhase.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span>{trial.currentPhase.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Completion:</span>
                    <span>{trial.currentPhase.estimatedCompletion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Participants:</span>
                    <span>
                      {trial.currentPhase.participants} of {trial.currentPhase.targetParticipants}
                    </span>
                  </div>
                  <div className="pt-2">
                    <span className="text-muted-foreground">Primary Endpoint:</span>
                    <p className="font-medium mt-1">{trial.currentPhase.primaryEndpoint}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Secondary Endpoints:</span>
                    <ul className="mt-1 space-y-1">
                      {trial.currentPhase.secondaryEndpoints.map((endpoint, index) => (
                        <li key={index}>{endpoint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Previous Phases</h3>
                <div className="space-y-4">
                  {trial.previousPhases.map((phase, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{phase.name}</h4>
                        <Badge variant="outline">{phase.status}</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>
                            {phase.startDate} to {phase.completionDate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Participants:</span>
                          <span>{phase.participants}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Results:</span>
                          <p className="mt-1">{phase.results}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="chat">Ask AI About This Trial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground">{trial.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Interventions</h2>
              <div className="space-y-4">
                {trial.interventions.map((intervention, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{intervention.type}</Badge>
                      <h3 className="font-medium">{intervention.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{intervention.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="eligibility" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Inclusion Criteria</h2>
              <ul className="space-y-2">
                {trial.eligibility.inclusion.map((criterion, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Exclusion Criteria</h2>
              <ul className="space-y-2">
                {trial.eligibility.exclusion.map((criterion, index) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="locations">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Memorial Sloan Kettering Cancer Center</h3>
                <p className="text-sm">1275 York Avenue, New York, NY 10065</p>
                <p className="text-sm text-muted-foreground mb-2">5 miles from your location</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50">
                    Recruiting
                  </Badge>
                  <span className="text-sm text-muted-foreground">Contact: Dr. Jane Smith</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Dana-Farber Cancer Institute</h3>
                <p className="text-sm">450 Brookline Avenue, Boston, MA 02215</p>
                <p className="text-sm text-muted-foreground mb-2">220 miles from your location</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50">
                    Recruiting
                  </Badge>
                  <span className="text-sm text-muted-foreground">Contact: Dr. Robert Johnson</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">MD Anderson Cancer Center</h3>
                <p className="text-sm">1515 Holcombe Blvd, Houston, TX 77030</p>
                <p className="text-sm text-muted-foreground mb-2">1,500 miles from your location</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50">
                    Recruiting
                  </Badge>
                  <span className="text-sm text-muted-foreground">Contact: Dr. Maria Garcia</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contacts">
            <div className="space-y-4">
              {trial.contacts.map((contact, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-1">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{contact.role}</p>
                  <div className="space-y-1 text-sm">
                    <p>Phone: {contact.phone}</p>
                    <p>Email: {contact.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="publications">
            <div className="space-y-4">
              {trial.publications.map((publication, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-1">{publication.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{publication.authors}</p>
                  <p className="text-sm mb-2">
                    {publication.journal}, {publication.year}
                  </p>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href={publication.url}>
                      View Publication
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="bg-background border rounded-lg">
              <TrialChatbot trial={trial} />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex justify-center">
          <div className="max-w-md w-full bg-muted/50 rounded-lg p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Interested in this trial?</h2>
            <p className="text-muted-foreground mb-4">
              Contact the research team to learn more about this study and find out if you might qualify. Our AI
              assistant can also help answer your questions.
            </p>
            <div className="space-y-3">
              <Button className="w-full">Contact Research Team</Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  const chatTab = document.querySelector('[data-value="chat"]') as HTMLElement
                  if (chatTab) chatTab.click()
                }}
              >
                Ask AI Assistant
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                This platform is for informational purposes only and is not a substitute for professional medical
                advice.
              </p>
            </div>
          </div>
        </div>
      </main>

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

