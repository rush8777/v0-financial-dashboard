"use client"

import React from "react"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "video-chat", label: "Video Chat", isActive: true },
  { id: "clip-search", label: "Clip Search", isActive: false },
  { id: "transcription", label: "Video Transcription", isActive: false },
  { id: "editor", label: "Video Editor", isActive: false },
  { id: "marketer", label: "Video Marketer", isActive: false, badge: "Agent" },
  { id: "hardware", label: "AI Hardware", isActive: false, badge: "Agent" },
]

const questions = [
  "What are Dr. Ford's classic lines in Westworld?",
  "Which architectural styles appear in Westworld?",
]

export default function Hooks() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
        {/* Tab Navigation */}
        <div className="pt-6 px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2",
                  tab.isActive
                    ? "bg-zinc-900 dark:bg-zinc-800 text-white"
                    : "bg-white dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                )}
              >
                {tab.label}
                {tab.badge && (
                  <span className="ml-1 px-2 py-0.5 text-xs rounded bg-purple-500/20 text-purple-400">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Questions */}
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                  Ask me about your videos.
                </h1>

                {/* Question Input Box */}
                <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-zinc-600 dark:text-zinc-400 mt-1 flex-shrink-0" />
                      <div className="space-y-3 w-full">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          Count all the fight scenes and describe them.
                        </p>
                        <div className="space-y-2">
                          {questions.map((q, idx) => (
                            <button
                              key={idx}
                              className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Another Example */}
                <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium">
                        Count all the fight scenes and describe them.
                      </p>
                      <svg
                        className="w-5 h-5 text-zinc-600 dark:text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4"
                        />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Video Player */}
              <div className="flex items-center justify-center">
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 dark:bg-black shadow-2xl">
                  {/* Video Thumbnail */}
                  <div className="relative w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/screenshot-202026-01-27-20122452.png"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-70"
                    />
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                      {/* Top Controls */}
                      <div className="flex justify-between items-start">
                        {/* Title/Metadata */}
                        <div className="text-white text-xs tracking-widest">
                          <p>EXECUTIVE PRODUCER</p>
                          <p className="font-light">JONATHAN NOLAN</p>
                        </div>
                      </div>

                      {/* Bottom Controls */}
                      <div className="space-y-3">
                        {/* Play/Pause */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="h-5 w-5" />
                            ) : (
                              <Play className="h-5 w-5" />
                            )}
                          </button>

                          {/* Progress Bar */}
                          <div className="flex-1 flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-zinc-600 rounded-full overflow-hidden">
                              <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
                            </div>
                          </div>

                          {/* Volume */}
                          <button className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                            <Volume2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
