import Link from "next/link"
import { Button } from "./components/ui/button"
import { Search, Sparkles, Heart, User, Database } from "lucide-react"
import HeroSection from "./components/hero-section"
import FeatureCard from "./components/feature-card"
import { ThemeProvider } from "./components/theme-provider"

export default function HomePage() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme-preference">
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TrialMatch</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/search" className="text-foreground hover:text-primary transition-colors">
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
              <Link href="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Features Section */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">How TrialMatch Helps You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Search className="h-10 w-10 text-primary" />}
                  title="Smart Trial Search"
                  description="Find clinical trials tailored to your specific medical history and needs with our AI-powered search engine."
                />
                <FeatureCard
                  icon={<Sparkles className="h-10 w-10 text-primary" />}
                  title="AI-Driven Matching"
                  description="Our platform ranks trials on a 1-10 scale based on relevance to your profile, highlighting the best matches."
                />
                <FeatureCard
                  icon={<Heart className="h-10 w-10 text-primary" />}
                  title="Supportive AI Chatbot"
                  description="Get answers to your questions, emotional support, and help understanding medical terms from our friendly AI assistant."
                />
                <FeatureCard
                  icon={<User className="h-10 w-10 text-primary" />}
                  title="Personalized Profiles"
                  description="Create a detailed medical profile manually or by uploading documents that our AI can analyze for you."
                />
                <FeatureCard
                  icon={<Database className="h-10 w-10 text-primary" />}
                  title="Comprehensive Database"
                  description="Access trials from ClinicalTrials.gov and other research databases all in one place."
                />
                <FeatureCard
                  icon={<Sparkles className="h-10 w-10 text-primary" />}
                  title="Plain Language Summaries"
                  description="Understand complex trial information with our AI-generated plain language summaries and explanations."
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to find the right clinical trial?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join TrialMatch today and let our AI help you navigate the complex world of clinical trials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/search">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Explore Trials
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-lg font-bold">TrialMatch</span>
                </div>
                <p className="text-muted-foreground">
                  Empowering patients and caregivers with personalized clinical trial information.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-4">Platform</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/search" className="text-muted-foreground hover:text-foreground">
                      Find Trials
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/chatbot" className="text-muted-foreground hover:text-foreground">
                      AI Assistant
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-foreground">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                      Resources
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
              <p>© {new Date().getFullYear()} TrialMatch. All rights reserved.</p>
              <p className="mt-2 text-sm">
                This platform is for informational purposes only and is not a substitute for professional medical
                advice.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

