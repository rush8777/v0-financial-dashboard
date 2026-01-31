"use client"

import { useState } from "react"

interface RecentProject {
  id: string
  name: string
  path: string
  duration?: string
}

const recentProjects: RecentProject[] = [
  {
    id: "1",
    name: "social media platform",
    path: "D:\\web_dev",
    duration: "28min"
  },
  {
    id: "2",
    name: "chat",
    path: "D:\\",
    duration: "15min"
  },
  {
    id: "3",
    name: "chat",
    path: "D:\\web_dev\\chat",
    duration: "42min"
  },
]

interface StreamlineInitProps {
  onProjectSelect: (projectId: string) => void
  onCreateNew: () => void
}

export default function StreamlineInit({ onProjectSelect, onCreateNew }: StreamlineInitProps) {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Centered Card */}
      <div className="p-3 rounded-lg bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800 shadow-sm backdrop-blur-xl text-left active:scale-95 min-h-[400px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-normal text-[#CCCCCC] mb-2">
            Streamline
          </h1>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section - Start */}
          <div>
            <h2 className="text-sm text-[#CCCCCC] mb-4">
              Start
            </h2>
            
            <div className="space-y-3">
              {/* Create New Streamline Button */}
              <button
                onClick={onCreateNew}
                className="w-full text-left px-4 py-3 bg-[#0E639C] hover:bg-[#1177BB] text-white text-sm rounded transition-colors flex items-center gap-3"
              >
                <span className="text-lg">✨</span>
                <span>Create New Streamline</span>
              </button>
              {/* Import Video Button */}
              <button
                onClick={() => console.log("Import video clicked")}
                className="w-full text-left px-4 py-3 bg-[#0E639C] hover:bg-[#1177BB] text-white text-sm rounded transition-colors flex items-center gap-3"
              >
                <span className="text-lg">📁</span>
                <span>Import Video</span>
              </button>
            </div>
          </div>

          {/* Right Section - Recent Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm text-[#CCCCCC]">
                Recent Projects
              </h2>
              {recentProjects.length > 3 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-xs text-[#CCCCCC] hover:text-white transition-colors"
                >
                  {showMore ? "Show Less" : "Show More..."}
                </button>
              )}
            </div>

            <div className="space-y-1">
              {recentProjects.slice(0, showMore ? recentProjects.length : 3).map((project) => (
                <button
                  key={project.id}
                  onClick={() => onProjectSelect(project.id)}
                  className="w-full text-left px-2 py-2 hover:bg-[#2A2D2E] rounded transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-sm text-[#CCCCCC] truncate">
                        {project.name}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="text-xs text-[#858585]">
                        {project.path}
                      </p>
                    </div>
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
