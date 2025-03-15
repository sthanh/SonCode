"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Send, User } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm your clinical trial assistant. I can help answer questions about clinical trials, explain medical terms, or provide emotional support during your healthcare journey. How can I help you today?",
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

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      // Simple pattern matching for demo purposes
      if (input.toLowerCase().includes("what is a clinical trial")) {
        response =
          "A clinical trial is a research study that tests how well new medical approaches work in people. These studies test new methods of screening, prevention, diagnosis, or treatment of a disease. Clinical trials can help doctors understand how to treat a particular disease or condition better."
      } else if (input.toLowerCase().includes("eligibility") || input.toLowerCase().includes("qualify")) {
        response =
          "Eligibility for clinical trials depends on many factors, including the type and stage of disease, previous treatments, and your overall health. Each trial has specific criteria called 'inclusion' and 'exclusion' criteria. Based on your profile information, our system can help identify trials you might qualify for, but the final determination is made by the trial's medical team."
      } else if (input.toLowerCase().includes("side effect") || input.toLowerCase().includes("risk")) {
        response =
          "All clinical trials have potential risks and benefits. Side effects vary depending on the treatment being studied. Before joining a trial, you'll go through a process called 'informed consent' where the research team will explain all possible side effects. It's important to discuss these with your doctor and the research team so you can make an informed decision."
      } else if (
        input.toLowerCase().includes("scared") ||
        input.toLowerCase().includes("worried") ||
        input.toLowerCase().includes("anxious")
      ) {
        response =
          "It's completely normal to feel anxious or worried about clinical trials or your health journey. Many patients experience these feelings. Remember that participating in a trial is voluntary, and you can take your time to make decisions. Would it help to talk about specific concerns you have? I'm here to listen and provide information that might help ease your mind."
      } else {
        response =
          "Thank you for your question. While I aim to be helpful, I want to make sure I provide accurate information. This is an area where speaking with a healthcare professional would be beneficial. They can provide personalized guidance based on your specific situation. Is there something else I can help with regarding clinical trials?"
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
    <div className="flex flex-col h-[80vh]">
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
                  <p className="text-sm">{message.content}</p>
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
        <p className="text-xs text-muted-foreground mt-2 text-center">
          This AI assistant provides general information and support. For medical advice, please consult a healthcare
          professional.
        </p>
      </div>
    </div>
  )
}

