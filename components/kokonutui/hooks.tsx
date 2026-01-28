"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  MessageCircle,
  Search,
  FileText,
  Scissors,
  Megaphone,
  Cpu,
  Play,
  Pause,
  Volume2,
  Send,
  Clock,
  Users,
  Settings2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "transcript", label: "Transcript", icon: FileText, isActive: true },
  { id: "speakers", label: "Speakers", icon: Users, isActive: false },
  { id: "meeting", label: "Meeting", icon: MessageCircle, isActive: false },
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
      "Hey Ashley, thanks for reaching out to us at Basepoint! Can you tell me a bit more about GreenLeaf and what you\'re hoping to get out of our platform?",
  },
  {
    id: 3,
    author: "Ashley Lawson",
    avatar: "AL",
    time: "0:37",
    message:
      "Of course! So I\'m Ashley, I lead GTM at GreenLeaf. We\'re building an AI-powered climate tech platform and just raised a Series A last month. We\'re looking for a CRM with integration and automation capabilities to accelerate our growth. I\'ll let Simon describe our use case in a little more depth.",
  },
  {
    id: 4,
    author: "Simon Mitchell",
    avatar: "SM",
    time: "1:04",
    message:
      "Yes, so at the moment we\'re largely relying on spreadsheets to track our prospect and customer information. It\'s a lot of manual data entry, and everyone has their own system for working with the data. It\'s resulting in a lot of inconsistencies with prospect follow-ups, meaning we\'re missing some really good opportunities.",
  },
]

const insights = {
  summary:
    "Ashley Lawson met with Dylan Parker to learn more about Basepoint. The GreenLeaf team is facing a number of inefficiencies due to their reliance on manual data entry and tools. They\'re looking for a scalable CRM with automation and integration functionality to accelerate their growth.",
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
    "GreenLeaf\'s next board meeting is in early June, and they\'re aiming to present a comprehensive summary of improvements to their GTM strategy by then. The team needs to have a new system fully implemented by the end of April.",
  decision:
    "Annual budget is approximately $10,000. Must-have features include strong integrations, automation capabilities, and Ashley appears to be the lead on this initiative and is overseeing a range of stakeholders.",
}

export default function Hooks() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState("transcript")

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">GreenLeaf // Basepoint</h1>
            <span className="px-2 py-1 text-xs font-medium bg-zinc-800 text-zinc-400 rounded">
              ★
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Apr 2</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>28min</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left & Center Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="aspect-video bg-black relative group">
                <img
                  src="/images/screenshot-202026-01-27-20122452.png"
                  alt="Video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white">
                    <Play className="h-6 w-6" />
                  </button>
                </div>
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

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-zinc-800 px-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "pb-3 text-sm font-medium transition-colors border-b-2",
                    activeTab === tab.id
                      ? "text-white border-purple-600"
                      : "text-zinc-400 border-transparent hover:text-zinc-300"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Transcript / Chat */}
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-white">
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white">{msg.author}</span>
                      <span className="text-xs text-zinc-500">{msg.time}</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Insights */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="border border-zinc-800 bg-zinc-900/50">
              <CardContent className="pt-6">
                <h3 className="text-sm font-semibold text-white mb-3">Summary</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">{insights.summary}</p>
              </CardContent>
            </Card>

            {/* Insights Sections */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Insights</h3>
              </div>

              {/* Situation */}
              <Card className="border border-zinc-800 bg-zinc-900/50">
                <CardContent className="pt-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Situation</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{insights.situation}</p>
                </CardContent>
              </Card>

              {/* Pain */}
              <Card className="border border-zinc-800 bg-zinc-900/50">
                <CardContent className="pt-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Pain</h4>
                  <ul className="space-y-2">
                    {insights.pain.map((item, idx) => (
                      <li key={idx} className="text-xs text-zinc-300 flex gap-2">
                        <span className="text-purple-400 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Impact */}
              <Card className="border border-zinc-800 bg-zinc-900/50">
                <CardContent className="pt-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Impact</h4>
                  <ul className="space-y-2">
                    {insights.impact.map((item, idx) => (
                      <li key={idx} className="text-xs text-zinc-300 flex gap-2">
                        <span className="text-purple-400 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Critical Event */}
              <Card className="border border-zinc-800 bg-zinc-900/50">
                <CardContent className="pt-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Critical Event</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{insights.criticalEvent}</p>
                </CardContent>
              </Card>

              {/* Decision */}
              <Card className="border border-zinc-800 bg-zinc-900/50">
                <CardContent className="pt-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Decision</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{insights.decision}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Calendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
