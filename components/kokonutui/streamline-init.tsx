"use client"

import { useState } from "react"
import { 
  Upload, 
  FolderOpen, 
  Clock, 
  PlayCircle,
  ChevronRight,
  Film,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RecentProject {
  id: string
  name: string
  path: string
  thumbnail?: string
  duration?: string
  lastOpened: string
}

const recentProjects: RecentProject[] = [
  {
    id: "1",
    name: "GreenLeaf // Basepoint",
    path: "D:\\video_projects\\greenleaf",
    duration: "28:14",
    lastOpened: "2 hours ago"
  },
  {
    id: "2",
    name: "Q4 Sales Review",
    path: "D:\\video_projects\\q4_sales",
    duration: "15:42",
    lastOpened: "Yesterday"
  },
  {
    id: "3",
    name: "Product Demo Call",
    path: "D:\\video_projects\\demo",
    duration: "42:18",
    lastOpened: "3 days ago"
  },
]

export default function VideoProjectInit() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [showMore, setShowMore] = useState(false)

  const handleImportVideo = () => {
    // Trigger file input or open file dialog
    console.log("Import video clicked")
  }

  const handleOpenProject = (projectId: string) => {
    console.log("Opening project:", projectId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Film className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-br from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-tight">
              VideoLens
            </h1>
          </div>
          <p className="text-zinc-400 text-lg font-light tracking-wide">
            AI-Powered Video Analysis Platform
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Section - Start Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Start
              </h2>
              
              <div className="space-y-3">
                {/* Import Video - Primary Action */}
                <button
                  onClick={handleImportVideo}
                  className={cn(
                    "w-full group relative overflow-hidden",
                    "bg-gradient-to-r from-purple-600 to-blue-600",
                    "hover:from-purple-500 hover:to-blue-500",
                    "text-white font-semibold",
                    "px-6 py-4 rounded-xl",
                    "transition-all duration-300",
                    "shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40",
                    "transform hover:scale-[1.02]",
                    "flex items-center gap-3"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Upload className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 text-left flex-1">Import Video</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary Actions */}
                <button
                  className={cn(
                    "w-full group",
                    "bg-zinc-800/50 hover:bg-zinc-800",
                    "backdrop-blur-sm",
                    "border border-zinc-700/50 hover:border-zinc-600",
                    "text-zinc-300 hover:text-white",
                    "px-6 py-3.5 rounded-xl",
                    "transition-all duration-200",
                    "flex items-center gap-3"
                  )}
                >
                  <FolderOpen className="w-5 h-5" />
                  <span className="text-left flex-1 font-medium">Open Project Folder</span>
                </button>

                <button
                  className={cn(
                    "w-full group",
                    "bg-zinc-800/50 hover:bg-zinc-800",
                    "backdrop-blur-sm",
                    "border border-zinc-700/50 hover:border-zinc-600",
                    "text-zinc-300 hover:text-white",
                    "px-6 py-3.5 rounded-xl",
                    "transition-all duration-200",
                    "flex items-center gap-3"
                  )}
                >
                  <PlayCircle className="w-5 h-5" />
                  <span className="text-left flex-1 font-medium">Start from URL</span>
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-8 p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30 backdrop-blur-sm">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Supports MP4, MOV, AVI, WebM formats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>AI transcription in 50+ languages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Automatic speaker identification</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Recent Projects */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent Projects
              </h2>
              {recentProjects.length > 3 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showMore ? "Show Less" : "Show More..."}
                </button>
              )}
            </div>

            <div className="space-y-2">
              {recentProjects.slice(0, showMore ? recentProjects.length : 3).map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => handleOpenProject(project.id)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={cn(
                    "w-full group relative",
                    "bg-zinc-800/30 hover:bg-zinc-800/60",
                    "backdrop-blur-sm",
                    "border border-zinc-700/30 hover:border-zinc-600/50",
                    "rounded-xl p-4",
                    "transition-all duration-200",
                    "text-left",
                    "transform hover:scale-[1.01]",
                    hoveredProject === project.id && "shadow-lg shadow-purple-500/10"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.5s ease-out forwards",
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail Placeholder */}
                    <div className="w-20 h-14 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <Film className="w-6 h-6 text-zinc-600" />
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                          {project.name}
                        </h3>
                        {project.duration && (
                          <span className="text-xs text-zinc-500 flex-shrink-0">
                            {project.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 truncate mb-1">
                        {project.path}
                      </p>
                      <p className="text-xs text-zinc-600">
                        {project.lastOpened}
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <ChevronRight 
                      className={cn(
                        "w-5 h-5 text-zinc-600 flex-shrink-0 transition-all",
                        hoveredProject === project.id && "text-purple-400 translate-x-1"
                      )}
                    />
                  </div>
                </button>
              ))}

              {/* Empty State */}
              {recentProjects.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/30 mb-4">
                    <Clock className="w-8 h-8 text-zinc-600" />
                  </div>
                  <p className="text-zinc-500 text-sm">
                    No recent projects yet
                  </p>
                  <p className="text-zinc-600 text-xs mt-1">
                    Import a video to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-zinc-600 text-xs">
            Keyboard Shortcuts: <kbd className="px-2 py-1 bg-zinc-800/50 rounded text-zinc-400 font-mono">Ctrl+O</kbd> Open • 
            <kbd className="px-2 py-1 bg-zinc-800/50 rounded text-zinc-400 font-mono ml-2">Ctrl+I</kbd> Import
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
