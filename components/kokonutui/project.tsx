"use client"

import { useState } from "react"
import { Grid3x3, LayoutList, Calendar, Baseline as Timeline, Users, MessageSquare, Filter, ArrowUpDown, FolderOpen, Plus, Link2, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "overview", label: "Overview", icon: Grid3x3 },
  { id: "board", label: "Board", icon: LayoutList },
  { id: "list", label: "List", icon: LayoutList },
]

const tasks = [
  {
    id: "MKT-101",
    title: "Draft Q3 Social Media Calendar..",
    description: "Plan posts for all platforms for the upcoming quarter.",
    priority: "High",
    category: "Marketing",
    progress: 40,
    progressColor: "bg-red-500",
    team: ["👤", "👤", "👤", "👤"],
    links: 5,
    comments: 2,
    column: "todo",
  },
  {
    id: "DES-218",
    title: "Research Competitor Onboarding Flows",
    description: "Analyze 3-5 competitors and document their onboarding.",
    priority: "Low",
    category: "Figma Design",
    progress: 40,
    progressColor: "bg-green-500",
    team: ["👤", "👤", "👤", "👤"],
    links: 5,
    comments: 2,
    column: "progress",
  },
  {
    id: "MKT-098",
    title: "Write Blog Post on \"5 Productivity Tips\"",
    description: "Final draft is complete and ready for editorial review.",
    priority: "Medium",
    category: "Content",
    progress: 100,
    progressColor: "bg-red-500",
    team: ["👤", "👤", "👤", "👤"],
    links: 5,
    comments: 2,
    column: "review",
  },
  {
    id: "DEV-345",
    title: "Set up new Staging Database",
    description: "Provision and configure the PostgreSQL instance for staging.",
    priority: "Medium",
    category: "Backend",
    progress: 40,
    progressColor: "bg-blue-600",
    team: ["👤", "👤", "👤", "👤"],
    links: 5,
    comments: 2,
    column: "todo",
  },
  {
    id: "DEV-340",
    title: "Implement Login Page UI",
    description: "Code the React components for the new login and registration forms.",
    priority: "Medium",
    category: "Figma Design",
    progress: 40,
    progressColor: "bg-red-500",
    team: ["👤", "👤", "👤", "👤"],
    links: 5,
    comments: 2,
    column: "progress",
  },
  {
    id: "A-500",
    title: "Create Icons for Navigation Bar",
    description: "All icons have been approved and exported as SVG.",
    priority: "Medium",
    category: "Figma Design",
    progress: 100,
    progressColor: "bg-orange-500",
    team: ["👤", "👤", "👤", "👤"],
    links: 5,
    comments: 2,
    column: "review",
  },
]

const columns = [
  { id: "todo", title: "To Do", count: 2 },
  { id: "progress", title: "In progress", count: 2 },
  { id: "review", title: "In Review", count: 2 },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
    case "Medium":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
    case "Low":
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
  }
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Marketing: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    "Figma Design": "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    Backend: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
    Content: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  }
  return colors[category] || "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
}

export default function Project() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Projects</h1>

        {/* Tab Navigation */}
        <div className="flex items-center gap-8 border-b border-gray-200 dark:border-[#1F1F23] overflow-x-auto pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium whitespace-nowrap pb-2 transition-colors border-b-2",
                  activeTab === tab.id
                    ? "text-gray-900 dark:text-white border-gray-900 dark:border-white"
                    : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#1F1F23] border border-gray-200 dark:border-[#2F2F37] hover:bg-gray-50 dark:hover:bg-[#2F2F37] text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#1F1F23] border border-gray-200 dark:border-[#2F2F37] hover:bg-gray-50 dark:hover:bg-[#2F2F37] text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors">
          <ArrowUpDown className="w-4 h-4" />
          Sort
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#1F1F23] border border-gray-200 dark:border-[#2F2F37] hover:bg-gray-50 dark:hover:bg-[#2F2F37] text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors">
          <FolderOpen className="w-4 h-4" />
          Group
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-dashed border-gray-300 dark:border-[#2F2F37]">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {column.title} <span className="text-gray-500">{column.count}</span>
              </h2>
              <div className="flex items-center gap-2">
                <button className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-4">
              {tasks
                .filter((task) => task.column === column.id)
                .map((task) => (
                  <Card key={task.id} className="border border-gray-200 dark:border-[#2F2F37] hover:shadow-md transition-shadow">
                    <CardContent className="p-4 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={cn("px-2 py-1 rounded text-xs font-semibold", getPriorityColor(task.priority))}>
                            {task.priority}
                          </span>
                          <span className={cn("px-2 py-1 rounded text-xs font-semibold", getCategoryColor(task.category))}>
                            {task.category}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{task.id}</span>
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{task.title}</h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{task.description}</p>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="text-xs font-semibold text-gray-900 dark:text-white">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-[#1F1F23] rounded-full h-1.5">
                          <div className={cn("h-1.5 rounded-full", task.progressColor)} style={{ width: `${task.progress}%` }} />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-[#1F1F23]">
                        <div className="flex items-center gap-1">
                          {task.team.map((member, idx) => (
                            <div key={idx} className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 -ml-1" />
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                            <Link2 className="w-4 h-4" />
                            <span className="text-xs font-medium">{task.links}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">{task.comments}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
