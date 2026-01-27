"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Play,
  Pause,
  Volume2,
  Send,
  MessageCircle,
  Search,
  FileText,
  Scissors,
  Megaphone,
  Cpu,
} from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "video-chat", label: "Video Chat", icon: MessageCircle, isActive: true },
  { id: "clip-search", label: "Clip Search", icon: Search, isActive: false },
  {
    id: "transcription",
    label: "Video Transcription",
    icon: FileText,
    isActive: false,
  },
  { id: "editor", label: "Video Editor", icon: Scissors, isActive: false },
  {
    id: "marketer",
    label: "Video Marketer",
    icon: Megaphone,
    isActive: false,
    badge: "Agent",
  },
  { id: "hardware", label: "AI Hardware", icon: Cpu, isActive: false, badge: "Agent" },
]

const suggestedQuestions = [
  "What are Dr. Ford's classic lines in Westworld?",
  "Which architectural styles appear in Westworld?",
]

export default function Hooks() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Count all the fight scenes and describe them.",
      isUser: true,
    },
  ])

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: chatInput, isUser: true }])
      setChatInput("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-8 px-4 flex flex-col items-center">
      {/* Tab Navigation */}
      <div className="mb-8 max-w-4xl w-full">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2.5",
                  tab.isActive
                    ? "bg-zinc-800 text-white shadow-lg"
                    : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.badge && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs rounded bg-purple-500/30 text-purple-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-4xl w-full">
        <Card className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Column - Chat Interface */}
              <div className="flex flex-col h-full min-h-96 border-r border-zinc-800 lg:border-r-0">
                {/* Header */}
                <div className="p-6 border-b border-zinc-800">
                  <h2 className="text-xl font-semibold text-white">Ask me about your videos.</h2>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col justify-center items-start space-y-3 h-full">
                      <div className="space-y-2 w-full">
                        <p className="text-sm font-medium text-zinc-300">Suggested questions:</p>
                        {suggestedQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setMessages([
                                { id: 1, text: q, isUser: true },
                              ])
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-md text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-all"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {messages.map((msg) => (
                        <div key={msg.id} className="flex justify-end">
                          <div className="max-w-xs lg:max-w-md bg-zinc-800 rounded-lg px-4 py-2.5">
                            <p className="text-sm text-zinc-100">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Chat Input */}
                <div className="border-t border-zinc-800 p-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage()
                      }}
                      placeholder="Ask about your videos..."
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Video Player */}
              <div className="flex items-center justify-center p-6">
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-xl">
                  {/* Video Thumbnail */}
                  <div className="relative w-full h-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/screenshot-202026-01-27-20122452.png"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />

                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                      {/* Top Section */}
                      <div className="flex justify-between items-start">
                        <div className="text-white text-xs tracking-widest opacity-75">
                          <p>EXECUTIVE PRODUCER</p>
                          <p className="font-light">JONATHAN NOLAN</p>
                        </div>
                      </div>

                      {/* Bottom Controls */}
                      <div className="space-y-3">
                        {/* Play/Pause and Progress */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </button>

                          {/* Progress Bar */}
                          <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-purple-600" />
                          </div>

                          {/* Volume */}
                          <button className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
