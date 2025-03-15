import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Find the <span className="text-primary">perfect clinical trial</span> for your unique journey
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our AI-powered platform matches you with clinical trials based on your detailed medical history,
              empowering you to make informed decisions about your healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn How It Works
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center text-sm text-muted-foreground">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-2">Free</span>
              No credit card required. Start finding trials in minutes.
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 shadow-lg">
              <img
                src="/placeholder.svg"
                alt="Clinical trial search platform interface"
                className="rounded-lg shadow-md w-full"
                style={{ height: '500px', width: '600px' }}
              />
              <div className="absolute -bottom-6 -right-6 bg-background rounded-lg p-4 shadow-lg max-w-xs">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 rounded-full p-2">
                    <span className="text-primary text-lg font-bold">9.5</span>
                  </div>
                  <div>
                    <p className="font-medium">Trial Match Score</p>
                    <p className="text-sm text-muted-foreground">
                      This trial targets your specific condition and genetic markers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

