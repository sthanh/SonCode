import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Sparkles, User } from "lucide-react"
import FullPageChatbot from "@/app/components/full-page-chatbot"

export const metadata: Metadata = {
  title: "AI Assistant | TrialMatch",
  description: "Chat with our AI assistant about clinical trials and get personalized support",
}

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
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

      <main className="flex-1 flex flex-col">
        <FullPageChatbot />
      </main>

      {/* Footer */}
      <footer className="bg-muted py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TrialMatch. All rights reserved.</p>
          <p className="mt-1">
            This platform is for informational purposes only and is not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}

