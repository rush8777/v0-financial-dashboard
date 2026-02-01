"use client"

import React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  MessageCircle,
  FileText,
  Search,
  Scissors,
  Megaphone,
  Cpu,
  Play,
  Volume2,
  Clock,
  Users,
  Settings2,
  Calendar,
  Sun,
  Moon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import VideoAnalytics from "@/components/kokonutui/video-analytics"
import FloatingVideoChat from "@/components/kokonutui/floating-chat-bar"
import ChatMessage from "@/components/kokonutui/lovablechat"
import ChatInput from "@/components/kokonutui/lovablechatinput"

const toptabs = [
  { id: "video-chat", label: "Video Chat", icon: MessageCircle },
  { id: "statistics", label: "Statistics", icon: Search },
  { id: "transcription", label: "Video Transcription", icon: FileText },
  { id: "editor", label: "Video Editor", icon: Scissors },
  { id: "marketer", label: "Video Marketer", icon: Megaphone, badge: "Agent" },
  { id: "hardware", label: "AI Hardware", icon: Cpu, badge: "Agent" },
]

const tabs = [
  { id: "transcript", label: "Transcript" },
  { id: "speakers", label: "Speakers" },
  { id: "meeting", label: "Meeting" },
]

const chatMessages = [
  {
    id: 1,
    author: "Ashley Lawson",
    avatar: "AL",
    time: "0:18",
    message: "Hey Dylan, great to meet you!",
  },
  {
    id: 2,
    author: "Dylan Parker",
    avatar: "DP",
    time: "0:25",
    message:
      "Hey Ashley, thanks for reaching out to us at Basepoint! Can you tell me a bit more about GreenLeaf and what you're hoping to get out of our platform?",
  },
  {
    id: 3,
    author: "Ashley Lawson",
    avatar: "AL",
    time: "0:37",
    message:
      "Of course! So I'm Ashley, I lead GTM at GreenLeaf. We're building an AI-powered climate tech platform and just raised a Series A last month. We're looking for a CRM with integration and automation capabilities to accelerate our growth. I'll let Simon describe our use case in a little more depth.",
  },
  {
    id: 4,
    author: "Simon Mitchell",
    avatar: "SM",
    time: "1:04",
    message:
      "Yes, so at the moment we're largely relying on spreadsheets to track our prospect and customer information. It's a lot of manual data entry, and everyone has their own system for working with the data. It's resulting in a lot of inconsistencies with prospect follow-ups, meaning we're missing some really good opportunities.",
  },
]

const insights = {
  summary:
    "Ashley Lawson met with Dylan Parker to learn more about Basepoint. The GreenLeaf team is facing a number of inefficiencies due to their reliance on manual data entry and tools. They're looking for a scalable CRM with automation and integration functionality to accelerate their growth.",
  situation:
    "Ashley Lawson is the GTM Manager at GreenLeaf, a rapidly scaling tech startup that raised a Series A. The team currently uses spreadsheets to track prospect and customer information, which are poorly integrated with their other tools. They rely on manual processes for data management and follow-ups, which are creating bottlenecks.",
  pain: [
    "Disconnected tools are leading to data silos and loss of key information.",
    "Manual processes are resulting in inconsistent follow-ups and lost deals, while reducing time available for strategic growth initiatives.",
  ],
  impact: [
    "Urgent need for repeatable, optimized workflows to support rapid growth.",
    "Establishing a single source of truth their customer and product data is crucial for alignment between teams.",
    "Building out a comprehensive GTM motion is important to help the team scale.",
  ],
  criticalEvent:
    "GreenLeaf's next board meeting is in early June, and they're aiming to present a comprehensive summary of improvements to their GTM strategy by then. The team needs to have a new system fully implemented by the end of April.",
  decision:
    "Annual budget is approximately $10,000. Must-have features include strong integrations, automation capabilities, and Ashley appears to be the lead on this initiative and is overseeing a range of stakeholders.",
}

const currentProject = {
  name: "GreenLeaf Project",
  lastModified: "2023-10-01",
  duration: "28:14",
}

export default function Streamline() {
  const [isDark, setIsDark] = useState(true)
  const [activeTab, setActiveTab] = useState("transcript")
  const [activeTopTab, setActiveTopTab] = useState("video-chat")
  const [editorMessages, setEditorMessages] = useState([
    { id: 1, content: "Hi! I'm your AI video editor assistant. How can I help you edit this video today?", isUser: false },
  ])

  const handleSendMessage = (message: string) => {
    // Add user message
    setEditorMessages(prev => [...prev, { id: Date.now(), content: message, isUser: true }])
    
    // Simulate AI response
    setTimeout(() => {
      setEditorMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        content: "I understand you want to edit the video. I can help you with trimming, adding captions, extracting clips, and more. What would you like to do?", 
        isUser: false 
      }])
    }, 1000)
  }

  return (
    <div className={cn("min-h-screen py-6 px-4", isDark ? "bg-zinc-950" : "bg-gray-50")}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-gray-900")}>
              GreenLeaf // Basepoint
            </h1>

            {/* Right side: star + theme toggle */}
            <div className="flex items-center gap-2">
              <button
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded transition-colors",
                  isDark
                    ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    : "bg-gray-100 border border-gray-200 text-gray-500 hover:bg-gray-200"
                )}
              >
                ★
              </button>

              {/* Theme toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  isDark
                    ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                )}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className={cn("flex items-center gap-4 text-sm", isDark ? "text-zinc-400" : "text-gray-500")}>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{currentProject?.lastModified}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{currentProject?.duration}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex justify-center">
          <div className={cn("inline-flex items-center gap-1.5 p-1 rounded-lg", isDark ? "bg-transparent" : "bg-gray-100")}>
            {toptabs.map((toptab) => {
              const Icon = toptab.icon
              const isActive = activeTopTab === toptab.id
              return (
                <button
                  key={toptab.id}
                  onClick={() => setActiveTopTab(toptab.id)}
                  className={cn(
                    "px-3 py-2 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap",
                    isActive
                      ? isDark
                        ? "bg-zinc-800 text-white shadow-lg"
                        : "bg-white text-gray-900 shadow"
                      : isDark
                        ? "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {toptab.label}
                  {toptab.badge && (
                    <span className={cn(
                      "ml-0.5 px-1.5 py-0.5 text-[10px] rounded-md font-semibold",
                      isDark ? "bg-purple-500/30 text-purple-300" : "bg-purple-100 text-purple-600"
                    )}>
                      {toptab.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        {activeTopTab === "statistics" ? (
          <div className="lg:col-span-5">
            <VideoAnalytics />
          </div>
        ) : activeTopTab === "editor" ? (
          /* Video Editor Chat Interface */
          <div className="max-w-4xl mx-auto">
            <div className={cn("rounded-2xl border p-8 min-h-[600px] flex flex-col", 
              isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-gray-200"
            )}>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto mb-6 space-y-4">
                {editorMessages.map((msg) => (
                  <ChatMessage 
                    key={msg.id} 
                    content={msg.content} 
                    isUser={msg.isUser}
                    showActions={!msg.isUser}
                  />
                ))}
              </div>
              
              {/* Chat Input */}
              <div className="mt-auto">
                <ChatInput onSend={handleSendMessage} />
              </div>
            </div>
          </div>
        ) : (
          /* Original Video Chat View */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left & Center */}
            <div className="lg:col-span-3 space-y-6">

              {/* Video Player */}
              <Card className={cn("overflow-hidden", isDark ? "border-zinc-800 bg-zinc-900/50" : "border-gray-200 bg-white")}>
                <div className="aspect-video bg-black relative group">
                  <img
                    src="/images/design-mode/Screenshot%202025-05-08%20133020(1).png"
                    alt="Video"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white">
                      <Play className="h-6 w-6" />
                    </button>
                  </div>
                  {/* Controls bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/50 to-transparent">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-zinc-400">09:18</span>
                      <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-purple-600" />
                      </div>
                      <span className="text-xs text-zinc-400">28:14</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-white/10 rounded text-white">
                        <Play className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded text-white">
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded text-white ml-auto">
                        <Settings2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Lower Tabs */}
              <div className={cn("flex items-center gap-6 px-0 border-b", isDark ? "border-zinc-800" : "border-gray-200")}>
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "pb-3 text-sm font-medium transition-colors border-b-2",
                        isActive
                          ? isDark
                            ? "text-white border-purple-600"
                            : "text-gray-900 border-purple-600"
                          : isDark
                            ? "text-zinc-400 border-transparent hover:text-zinc-300"
                            : "text-gray-500 border-transparent hover:text-gray-700"
                      )}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              {/* Transcript */}
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-white">
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>{msg.author}</span>
                        <span className={cn("text-xs", isDark ? "text-zinc-500" : "text-gray-400")}>{msg.time}</span>
                      </div>
                      <p className={cn("text-sm leading-relaxed", isDark ? "text-zinc-300" : "text-gray-600")}>{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-2 space-y-6">

              {/* Summary Card */}
              <Card className={cn(isDark ? "border-zinc-800 bg-zinc-900/50" : "border-gray-200 bg-white")}>
                <CardContent className="pt-6">
                  <h2 className={cn("text-sm font-semibold mb-3", isDark ? "text-white" : "text-gray-900")}>{insights.summary && "Summary"}</h2>
                  <p className={cn("text-sm leading-relaxed", isDark ? "text-zinc-300" : "text-gray-600")}>{insights.summary}</p>
                </CardContent>
              </Card>

              {/* Insights */}
              <div className="space-y-4">
                <h3 className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>Insights</h3>

                <Card className={cn(isDark ? "border-zinc-800 bg-zinc-900/50" : "border-gray-200 bg-gray-50")}>
                  <CardContent className="pt-6 space-y-6">

                    <div>
                      <h4 className={cn("text-sm font-semibold mb-2", isDark ? "text-white" : "text-gray-900")}>Situation</h4>
                      <p className={cn("text-xs leading-relaxed", isDark ? "text-zinc-300" : "text-gray-600")}>{insights.situation}</p>
                    </div>

                    <div>
                      <h4 className={cn("text-sm font-semibold mb-2", isDark ? "text-white" : "text-gray-900")}>Pain</h4>
                      <ul className="space-y-2">
                        {insights.pain.map((item, idx) => (
                          <li key={idx} className={cn("text-xs flex gap-2", isDark ? "text-zinc-300" : "text-gray-600")}>
                            <span className={cn("flex-shrink-0", isDark ? "text-purple-400" : "text-purple-500")}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className={cn("text-sm font-semibold mb-2", isDark ? "text-white" : "text-gray-900")}>Impact</h4>
                      <ul className="space-y-2">
                        {insights.impact.map((item, idx) => (
                          <li key={idx} className={cn("text-xs flex gap-2", isDark ? "text-zinc-300" : "text-gray-600")}>
                            <span className={cn("flex-shrink-0", isDark ? "text-purple-400" : "text-purple-500")}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className={cn("text-sm font-semibold mb-2", isDark ? "text-white" : "text-gray-900")}>Critical Event</h4>
                      <p className={cn("text-xs leading-relaxed", isDark ? "text-zinc-300" : "text-gray-600")}>{insights.criticalEvent}</p>
                    </div>

                    <div>
                      <h4 className={cn("text-sm font-semibold mb-2", isDark ? "text-white" : "text-gray-900")}>Decision</h4>
                      <p className={cn("text-xs leading-relaxed", isDark ? "text-zinc-300" : "text-gray-600")}>{insights.decision}</p>
                    </div>

                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {activeTopTab !== "editor" && (
        <FloatingVideoChat
          initialMessages={[
            {
              id: 1,
              text: "What were the main pain points discussed in this meeting?",
              isUser: true,
            },
            {
              id: 2,
              text: "Disconnected tools, manual processes, and inconsistent follow-ups.",
              isUser: false,
            },
          ]}
        />
      )}
    </div>
  )
}
