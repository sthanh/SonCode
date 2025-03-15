"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar } from "./ui/avatar"
import { ScrollArea } from "./ui/scroll-area"
import { Card, CardContent } from "./ui/card"
import { Sparkles, Send, User, Info, Search, FileText, Heart } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type SuggestionCategory = {
  icon: React.ReactNode
  title: string
  suggestions: string[]
}

export default function FullPageChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your clinical trial assistant. I can help answer questions about clinical trials, explain medical terms, provide emotional support, or help you find trials that might be right for you. What would you like to discuss today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent | string) => {
    if (typeof e !== 'string') {
        e.preventDefault()
    }

    const messageText = typeof e === "string" ? e : input
    if (!messageText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""
      const query = messageText.toLowerCase()

      // Simple pattern matching for demo purposes
      if (query.includes("what is a clinical trial") || query.includes("explain clinical trials")) {
        response =
          "A clinical trial is a research study that tests how well new medical approaches work in people. These studies test new methods of screening, prevention, diagnosis, or treatment of a disease. Clinical trials are conducted in phases:\n\n- Phase 1: Tests safety and side effects in a small group\n- Phase 2: Tests effectiveness and further evaluates safety\n- Phase 3: Confirms effectiveness in larger groups, compares to standard treatments\n- Phase 4: Studies the treatment after FDA approval\n\nParticipating in a clinical trial can give you access to new treatments before they're widely available, but there are also risks to consider. Would you like to know more about a specific phase or aspect of clinical trials?"
      } else if (query.includes("eligibility") || query.includes("qualify") || query.includes("can i join")) {
        response =
          "Eligibility for clinical trials depends on many factors, including:\n\n- Type and stage of disease\n- Previous treatments you've received\n- Other medical conditions you may have\n- Age and gender\n- Lab values and test results\n\nEach trial has specific criteria called 'inclusion' and 'exclusion' criteria. These are designed to identify appropriate participants and keep out those who might be harmed by the treatment or who have conditions that could affect the study results.\n\nBased on your profile information, our system can help identify trials you might qualify for, but the final determination is made by the trial's medical team after a screening visit. Would you like me to help you search for trials that might match your condition?"
      } else if (query.includes("side effect") || query.includes("risk")) {
        response =
          "All clinical trials have potential risks and benefits. Side effects vary depending on the treatment being studied. Common concerns include:\n\n- Unpleasant, serious, or even life-threatening side effects from the treatment\n- The treatment may not work for you personally\n- You might receive a placebo instead of the active treatment (in some studies)\n- Participation may require more time and attention than standard treatment, including trips to study sites, additional treatments, hospital stays, or complex dosage requirements\n\nBefore joining a trial, you'll go through a process called 'informed consent' where the research team will explain all possible side effects. It's important to discuss these with your doctor and the research team so you can make an informed decision. Is there a specific type of treatment you're concerned about?"
      } else if (
        query.includes("scared") ||
        query.includes("worried") ||
        query.includes("anxious") ||
        query.includes("nervous")
      ) {
        response =
          "It's completely normal to feel anxious or worried about clinical trials or your health journey. Many patients experience these feelings. Remember that:\n\n- Participating in a trial is voluntary, and you can withdraw at any time\n- Research teams prioritize your safety and well-being\n- You'll be closely monitored throughout the trial\n- You're not alone in this process\n\nIt might help to talk with others who have participated in clinical trials, or to bring a friend or family member to appointments to provide support. Some trials also have patient navigators who can guide you through the process.\n\nWould it help to talk about specific concerns you have? I'm here to listen and provide information that might help ease your mind."
      } else if (
        query.includes("find trial") ||
        query.includes("search for trial") ||
        query.includes("looking for trial")
      ) {
        response =
          "I'd be happy to help you search for clinical trials. To find the most relevant options, I'll need some information about:\n\n1. Your medical condition or diagnosis\n2. Your location or how far you're willing to travel\n3. Any previous treatments you've received\n4. Other relevant health information like age or comorbidities\n\nYou can provide this information now, or you can use our structured search tool at /search which allows you to enter these details and filter results. The search tool will also show you an AI-generated match score for each trial based on your profile.\n\nWould you like to tell me about your condition now, or would you prefer to use the search tool?"
      } else if (
        query.includes("how does the matching work") ||
        query.includes("match score") ||
        query.includes("ai ranking")
      ) {
        response =
          "Our AI matching system works by analyzing several factors to determine how well a trial fits your specific situation:\n\n1. It compares your medical profile (diagnosis, stage, biomarkers, etc.) against the trial's inclusion/exclusion criteria\n2. It considers your treatment history and whether it aligns with what the trial is looking for\n3. It factors in practical considerations like location and your ability to travel\n4. It evaluates the phase of the trial and its appropriateness for your situation\n\nThe system then generates a score from 1-10, with 10 being an excellent match. For each recommendation, you'll see an explanation of why the trial received that score.\n\nThis helps you focus on trials that are most relevant to you, saving you time and reducing frustration. Would you like to see some examples of how this works?"
      } else if (query.includes("thank")) {
        response =
          "You're very welcome! I'm glad I could help. Is there anything else you'd like to know about clinical trials or using our platform? I'm here to assist you with finding trials, understanding medical information, or providing support throughout your healthcare journey."
      } else {
        response =
          "Thank you for your question. I want to make sure I provide helpful information. Could you tell me more about what you're looking for? I can help with:\n\n- Explaining how clinical trials work\n- Finding trials that match your condition\n- Understanding eligibility requirements\n- Explaining medical terms or treatments\n- Addressing concerns about participation\n- Providing emotional support during your healthcare journey\n\nFeel free to ask about any of these topics or something else related to clinical trials."
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const suggestionCategories: SuggestionCategory[] = [
    {
      icon: <Search className="h-5 w-5 text-primary" />,
      title: "Finding Trials",
      suggestions: [
        "How do I find trials for my condition?",
        "What information do I need to search for trials?",
        "How does the AI matching system work?",
      ],
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: "Understanding Trials",
      suggestions: [
        "What is a clinical trial?",
        "What are the different phases of clinical trials?",
        "What are the risks and benefits of participating?",
      ],
    },
    {
      icon: <Heart className="h-5 w-5 text-primary" />,
      title: "Support & Guidance",
      suggestions: [
        "I'm nervous about joining a trial. What should I know?",
        "How do I talk to my doctor about clinical trials?",
        "What questions should I ask before participating?",
      ],
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">AI Clinical Trial Assistant</h1>
          <p className="text-muted-foreground">
            Ask questions, get support, or find clinical trials that match your needs
          </p>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-6">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col border rounded-lg overflow-hidden">
            <div className="bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  This AI assistant provides general information about clinical trials and emotional support. For
                  medical advice, please consult a healthcare professional.
                </p>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                      <Avatar className="h-8 w-8">
                        {message.role === "user" ? <User className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                      </Avatar>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <Avatar className="h-8 w-8">
                        <Sparkles className="h-5 w-5" />
                      </Avatar>
                      <div className="rounded-lg px-4 py-2 bg-muted">
                        <div className="flex space-x-2 items-center h-5">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </div>

          {/* Suggestions Panel - Hidden on mobile */}
          <div className="hidden md:block w-80">
            <div className="space-y-4">
              <h2 className="font-medium text-lg">Suggested Questions</h2>

              {suggestionCategories.map((category, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {category.icon}
                      <h3 className="font-medium">{category.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.suggestions.map((suggestion, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto py-2"
                          onClick={() => handleSendMessage(suggestion)}
                          disabled={isLoading}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium mb-2">Need more help?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  If you prefer to speak with a human, our support team is available to assist you.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

