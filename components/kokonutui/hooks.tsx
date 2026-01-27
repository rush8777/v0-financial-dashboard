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
  X,
  Edit2,
  Share2,
  MoreHorizontal,
  Copy,
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalInput, setModalInput] = useState("")
  const [modalMessages, setModalMessages] = useState<Array<{ id: number; text: string; isUser: boolean }>>([])
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Count all the fight scenes and describe them.",
      isUser: true,
    },
  ])

  const handleSendModalMessage = () => {
    if (modalInput.trim()) {
      setModalMessages([...modalMessages, { id: modalMessages.length + 1, text: modalInput, isUser: true }])
      setModalInput("")
    }
  }

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: chatInput, isUser: true }])
      setChatInput("")
    }
  }

  return (
    <div className="min-h-screen  py-8 px-4 flex flex-col items-center text-primary">
      {/* Insights Heading */}
      <div className="mb-6 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-white">{"HOOKS"}</h1>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 max-w-4xl w-full overflow-x-auto">
        <div className="flex items-center justify-center gap-1.5 flex-nowrap px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                className={cn(
                  "px-3 py-2 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap flex-shrink-0",
                  tab.isActive
                    ? "bg-zinc-800 text-white shadow-lg"
                    : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
                {tab.badge && (
                  <span className="ml-0.5 px-1 py-0.5 text-xs rounded bg-purple-500/30 text-purple-300">
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
                      onClick={() => setIsModalOpen(true)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage()
                      }}
                      placeholder="Ask about your videos..."
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
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
                      src="/images/lay.png"
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

      {/* Floating Chat Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setIsModalOpen(false)} />
      )}
      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <Card className="bg-zinc-900 w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="border-b border-zinc-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-white">New AI chat</h3>
                <div className="px-2 py-1 rounded-md bg-zinc-800 text-xs text-zinc-300 border border-zinc-700">
                  Private
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-zinc-200">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-zinc-200">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-zinc-200">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-zinc-200">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-zinc-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Modal Content Area */}
            <CardContent className="p-0 flex flex-col h-[calc(80vh-120px)]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {modalMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="space-y-3">
                      <p className="text-sm text-zinc-400">Start a conversation</p>
                      <p className="text-xs text-zinc-500">Ask anything about your content or workflows</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {modalMessages.map((msg) => (
                      <div key={msg.id} className="flex justify-end">
                        <div className="max-w-md bg-purple-600/20 border border-purple-500/30 rounded-lg px-4 py-3">
                          <p className="text-sm text-white">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-zinc-700 p-4 space-y-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white">
                      K
                    </div>
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                      L
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400">Kevin x Louise</span>
                  <button className="ml-auto text-zinc-400 hover:text-zinc-300">
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex items-end gap-2">
                  <input
                    type="text"
                    value={modalInput}
                    onChange={(e) => setModalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendModalMessage()
                    }}
                    placeholder="Ask AI anything"
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleSendModalMessage}
                    className="p-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Gemini 3 Pro</span>
                  <span className="px-1.5 py-0.5 bg-zinc-800 rounded text-purple-400">Beta</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
