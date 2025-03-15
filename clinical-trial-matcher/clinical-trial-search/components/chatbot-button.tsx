"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MessageSquare, X } from "lucide-react"
import Chatbot from "@/components/chatbot"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
            <MessageSquare className="h-6 w-6" />
            <span className="sr-only">Open AI Assistant</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md md:max-w-lg w-[90vw] p-0">
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle>AI Assistant</SheetTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </SheetHeader>
          <Chatbot />
        </SheetContent>
      </Sheet>
    </div>
  )
}

