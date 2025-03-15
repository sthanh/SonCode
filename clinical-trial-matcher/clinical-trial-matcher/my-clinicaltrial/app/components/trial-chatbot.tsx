"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Send, User, Info } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface TrialChatbotProps {
  trial: any // In a real app, you would define a proper type for the trial
}

export default function TrialChatbot({ trial }: TrialChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hi there! I'm your AI assistant for the trial: "${trial.title}". You can ask me specific questions about this trial, such as eligibility criteria, treatment details, or what to expect if you participate. How can I help you today?`,
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response based on the specific trial
    setTimeout(() => {
      let response = ""
      const query = input.toLowerCase()

      // Trial-specific responses
      if (query.includes("eligibility") || query.includes("qualify") || query.includes("can i join")) {
        response = `For this ${trial.phase} trial of ${trial.title}, key eligibility criteria include:\n\n- ${trial.eligibility.inclusion.join("\n- ")}\n\nHowever, you would not qualify if any of these apply:\n\n- ${trial.eligibility.exclusion.join("\n- ")}\n\nBased on the information in your profile, you appear to be a good match for this trial, but the final determination would be made by the research team after a screening visit.`
      } else if (
        query.includes("treatment") ||
        query.includes("drug") ||
        query.includes("intervention") ||
        query.includes("medication")
      ) {
        const interventions = trial.interventions.map((i: any) => `${i.name} (${i.description})`).join(", ")
        response = `This trial is studying ${interventions}. The experimental arm combines pembrolizumab (an immunotherapy) with lenvatinib (a targeted therapy), while the control arm receives standard chemotherapy. If you participate, you would be randomly assigned to one of these treatment groups.`
      } else if (query.includes("side effect") || query.includes("risk") || query.includes("safety")) {
        response = `Common side effects for the treatments in this trial include:\n\n- For pembrolizumab: fatigue, rash, diarrhea, and potential immune-related adverse events\n- For len  For pembrolizumab: fatigue, rash, diarrhea, and potential immune-related adverse events\n- For lenvatinib: hypertension, diarrhea, decreased appetite, and fatigue\n- For chemotherapy: hair loss, nausea, fatigue, and decreased blood counts

The research team will monitor you closely for any side effects if you participate. Before joining, you'll go through an informed consent process where all potential risks will be explained in detail. Remember that all treatments have potential side effects, and the study is designed to evaluate both the effectiveness and safety of these combinations.`
      } else if (query.includes("location") || query.includes("where") || query.includes("site")) {
        response = `This trial is being conducted at multiple locations, including:\n\n1. Memorial Sloan Kettering Cancer Center in New York, NY (5 miles from your location)\n2. Dana-Farber Cancer Institute in Boston, MA (220 miles away)\n3. MD Anderson Cancer Center in Houston, TX (1,500 miles away)\n\nBased on your profile, the Memorial Sloan Kettering site would be most convenient for you. Would you like contact information for that location?`
      } else if (query.includes("phase") || query.includes("stage of research")) {
        response = `This is a ${trial.phase} clinical trial. ${trial.phaseDescription}\n\nThe trial is currently in the ${trial.currentPhase.status} stage with ${trial.currentPhase.participants} of ${trial.currentPhase.targetParticipants} planned participants enrolled. It began on ${trial.currentPhase.startDate} and is estimated to complete by ${trial.currentPhase.estimatedCompletion}.`
      } else if (
        query.includes("contact") ||
        query.includes("who should i talk to") ||
        query.includes("get in touch")
      ) {
        const contact = trial.contacts[0]
        response = `The primary contact for this trial is ${contact.name}, who serves as the ${contact.role}. You can reach them at:\n\nPhone: ${contact.phone}\nEmail: ${contact.email}\n\nWould you like me to help you prepare some questions to ask when you contact them?`
      } else if (query.includes("how long") || query.includes("duration") || query.includes("time commitment")) {
        response = `This trial started on ${trial.startDate} and is estimated to complete by ${trial.estimatedCompletion}. However, individual participation length may vary depending on how you respond to treatment.\n\nTypically, you would receive pembrolizumab every 3 weeks and take lenvatinib daily (if assigned to that arm). Follow-up visits would continue for a period after treatment to monitor long-term outcomes. The exact schedule would be provided by the research team during the informed consent process.`
      } else if (query.includes("results") || query.includes("findings") || query.includes("successful")) {
        response = `This trial is still ongoing, so final results are not yet available. However, the previous Phase 2 study (completed in ${trial.previousPhases[0].completionDate}) showed promising efficacy with a manageable safety profile.\n\nThe current Phase 3 study is measuring outcomes like Progression-Free Survival (PFS) and Overall Survival (OS) to determine if the combination of pembrolizumab and lenvatinib is more effective than standard chemotherapy for endometrial cancer.\n\nResults will likely be published after the trial completes in ${trial.currentPhase.estimatedCompletion}.`
      } else {
        response = `Thank you for your question about this ${trial.phase} trial studying ${trial.title}. To give you the most accurate information, I'd like to make sure I understand what you're asking about. Are you interested in:\n\n- Eligibility requirements\n- Treatment details\n- Potential side effects\n- Trial locations\n- Timeline and commitment\n- How to contact the research team\n\nFeel free to ask about any of these topics or something else related to this specific trial.`
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

  return (
    <div className="flex flex-col h-[600px]">
      <div className="bg-muted/30 p-4 rounded-t-lg">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
          <p className="text-sm text-muted-foreground">
            This AI assistant can answer questions specifically about the trial: "{trial.title}". The information is
            based on the trial details and general medical knowledge. For medical advice, please consult a healthcare
            professional.
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
            placeholder="Ask about this specific trial..."
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
        <div className="flex items-center justify-center mt-3">
          <div className="text-xs text-muted-foreground text-center max-w-md">
            <p>Try asking: "What are the eligibility criteria?" or "What are the potential side effects?"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

