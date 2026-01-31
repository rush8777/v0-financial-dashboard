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
  Pause,
  Volume2,
  Send,
  Clock,
  Users,
  Settings2,
  X,
  Edit2,
  Copy,
  Share2,
  MoreHorizontal,
  ArrowUp,
  Paperclip,
  ImageIcon,
  Plus,
  ArrowRight,
} from "lucide-react"
import { CarTaxiFrontIcon as ChartNoAxesColumnIncreasing } from "lucide-react"
import { cn } from "@/lib/utils"
import VideoAnalytics from "@/components/kokonutui/video-analytics"
import FloatingVideoChat from "@/components/kokonutui/floating-chat-bar"

const toptabs = [
  { id: "video-chat", label: "Video Chat", icon: MessageCircle, isActive: true },
  { id: "statistics", label: "Statistics", icon: Search, isActive: false },
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

interface RecentProject {
  id: string
  name: string
  duration: string
  lastModified: string
}

const recentProjects: RecentProject[] = [
  {
    id: "1",
    name: "GreenLeaf // Basepoint",
    duration: "28min",
    lastModified: "Apr 2"
  },
  {
    id: "2",
    name: "Acme Corp Onboarding",
    duration: "15min",
    lastModified: "Mar 28"
  },
  {
    id: "3",
    name: "TechFlow Sales Pitch",
    duration: "42min",
    lastModified: "Mar 15"
  },
]

export default function Streamline() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState("transcript")
  const [activeTopTab, setActiveTopTab] = useState("video-chat")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [showProjectList, setShowProjectList] = useState(false)

  const currentProject = selectedProject 
    ? recentProjects.find(p => p.id === selectedProject) || recentProjects[0]
    : null

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId)
  }

  const handleBackToSelector = () => {
    setSelectedProject(null)
  }

  // Initial Selector View
  if (!selectedProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Streamline</h1>
            <p className="text-zinc-400">Select a recent project or create a new streamline</p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section - Create New */}
            <div>
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                Start New
              </h2>
              
              <button
                onClick={() => handleProjectSelect("new")}
                className="w-full group relative px-6 py-8 bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col items-center gap-3">
                  <Plus className="h-8 w-8" />
                  <div>
                    <p className="font-semibold">Create New Streamline</p>
                    <p className="text-xs text-purple-200 mt-1">Start a fresh project</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Right Section - Recent Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  Recent Projects
                </h2>
              </div>

              <div className="space-y-2">
                {recentProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectSelect(project.id)}
                    className="w-full text-left px-4 py-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-purple-500/50 rounded-lg transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          {project.duration} • {project.lastModified}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-purple-400 transition-colors flex-shrink-0 ml-2" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Project Interface View
  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToSelector}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                title="Back to project selector"
              >
                <ArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {currentProject?.name}
                </h1>
              </div>
            </div>
            <button className="px-3 py-1 text-xs font-medium bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 transition-colors">
              ★
            </button>
          </div>

          <div className="flex items-center gap-4 text-sm text-zinc-400">
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
          <div className="inline-flex items-center gap-1.5  p-1 rounded-lg">
            {toptabs.map((toptab) => {
              const Icon = toptab.icon
              return (
                <button
                  key={toptab.id}
                  onClick={() => setActiveTopTab(toptab.id)}
                  className={cn(
                    "px-3 py-2 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap",
                    activeTopTab === toptab.id
                      ? "bg-zinc-800 text-white shadow-lg"
                      : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {toptab.label}
                  {toptab.badge && (
                    <span className="ml-0.5 px-1.5 py-0.5 text-[10px] rounded-md bg-purple-500/30 text-purple-300 font-semibold">
                      {toptab.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Grid with Conditional Rendering */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {activeTopTab === "statistics" ? (
            // Statistics View - Full Width
            <div className="lg:col-span-5">
              <VideoAnalytics />
            </div>
          ) : (
            // Video Chat View - Original Layout
            <>
              {/* Left & Center Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Video Player */}
                <Card className="border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                  <div className="aspect-video bg-black relative group">
                    <img
                      src="/images/design-mode/Screenshot%202025-05-08%20133020(1).png"
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
              <div className="lg:col-span-2 space-y-6">
                {/* Summary Card */}
                <Card className="border border-zinc-800 ">
                  <CardContent className="pt-6">
                    <h2 className="text-sm font-semibold text-white mb-3">Summary</h2>
                    <p className="text-sm text-zinc-300 leading-relaxed">{insights.summary}</p>
                  </CardContent>
                </Card>

                {/* Insights Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Insights</h3>
                  </div>

                  <Card className="border border-zinc-800 bg-zinc-900/50">
                    <CardContent className="pt-6 space-y-6">
                      {/* Situation */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Situation</h4>
                        <p className="text-xs text-zinc-300 leading-relaxed">{insights.situation}</p>
                      </div>

                      {/* Pain */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Pain</h4>
                        <ul className="space-y-2">
                          {insights.pain.map((item, idx) => (
                            <li key={idx} className="text-xs text-zinc-300 flex gap-2">
                              <span className="text-purple-400 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impact */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Impact</h4>
                        <ul className="space-y-2">
                          {insights.impact.map((item, idx) => (
                            <li key={idx} className="text-xs text-zinc-300 flex gap-2">
                              <span className="text-purple-400 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Critical Event */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Critical Event</h4>
                        <p className="text-xs text-zinc-300 leading-relaxed">{insights.criticalEvent}</p>
                      </div>

                      {/* Decision */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Decision</h4>
                        <p className="text-xs text-zinc-300 leading-relaxed">{insights.decision}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

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
