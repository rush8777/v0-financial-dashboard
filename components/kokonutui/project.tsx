"use client"

import { useState } from "react"
import { Grid3x3, LayoutList, Calendar, Users, MessageSquare, Filter, ArrowUpDown, FolderOpen, Plus, Link2, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "overview", label: "Overview", icon: Grid3x3 },
  { id: "board", label: "Board", icon: LayoutList },
  { id: "list", label: "List", icon: LayoutList },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "timeline", label: "Time-line", icon: Calendar },
  { id: "workload", label: "Workload", icon: Users },
  { id: "message", label: "Message", icon: MessageSquare },
]

const columns = [
  { id: "todo", title: "To Do", count: 2 },
  { id: "inprogress", title: "In progress", count: 2 },
  { id: "inreview", title: "In Review", count: 2 },
]

const tasks = [
  {
    id: "MKT-101",
    title: "Draft Q3 Social Media Calend..",
    priority: "High",
    category: "Marketing",
    description: "Plan posts for all platforms for the upcoming quarter.",
    progress: 40,
    team: ["👨‍💼", "👩‍💼", "👨‍💻", "👩‍🎨"],
    links: 5,
    comments: 2,
    column: "todo",
  },
  {
    id: "DES-218",
    title: "Research Competitor Onboarding Flows",
    priority: "Low",
    category: "Figma Design",
    description: "Analyze 3-5 competitors and document their onboarding.",
    progress: 40,
    team: ["👨‍💼", "👩‍💼", "👨‍💻", "👩‍🎨"],
    links: 5,
    comments: 2,
    column: "inprogress",
  },
  {
    id: "MKT-098",
    title: 'Write Blog Post on "5 Productivity Tips"',
    priority: "Medium",
    category: "Content",
    description: "Final draft is complete and ready for editorial review.",
    progress: 100,
    team: ["👨‍💼", "👩‍💼", "👨‍💻", "👩‍🎨"],
    links: 5,
    comments: 2,
    column: "inreview",
  },
  {
    id: "DEV-345",
    title: "Set up new Staging Database",
    priority: "Medium",
    category: "Backend",
    description: "Provision and configure the PostgreSQL instance for staging.",
    progress: 40,
    team: ["👨‍💼", "👩‍💼", "👨‍💻", "👩‍🎨"],
    links: 5,
    comments: 2,
    column: "todo",
  },
  {
    id: "DEV-340",
    title: "Implement Login Page UI",
    priority: "Medium",
    category: "Figma Design",
    description: "Code the React components for the new login and registration forms.",
    progress: 40,
    team: ["👨‍💼", "👩‍💼", "👨‍💻", "👩‍🎨"],
    links: 5,
    comments: 2,
    column: "inprogress",
  },
  {
    id: "A-500",
    title: "Create Icons for Navigation Bar",
    priority: "Medium",
    category: "Figma Design",
    description: "All icons have been approved and exported as SVG.",
    progress: 100,
    team: ["👨‍💼", "👩‍💼", "👨‍💻", "👩‍🎨"],
    links: 5,
    comments: 2,
    column: "inreview",
  },
]

interface TaskCardProps {
  task: (typeof tasks)[0]
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="mb-4 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn(
                  "px-2 py-0.5 text-xs font-semibold rounded",
                  task.priority === "High" && "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
                  task.priority === "Medium" && "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
                  task.priority === "Low" && "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
                )}>
                  {task.priority}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                  {task.category}
                </span>
              </div>
              <p className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">{task.id}</p>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-2">{task.title}</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">{task.description}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 h-2 rounded-full"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {task.team.map((member, i) => (
                  <div key={i} className="text-lg">
                    {member}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors text-zinc-600 dark:text-zinc-400">
                <Link2 className="h-4 w-4" />
              </button>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">{task.links}</span>
              <button className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors text-zinc-600 dark:text-zinc-400">
                <MessageCircle className="h-4 w-4" />
              </button>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">{task.comments}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Project() {
  const [activeTab, setActiveTab] = useState("board")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">My Task</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-8 border-b border-gray-200 dark:border-zinc-700 overflow-x-auto pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-1 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                activeTab === tab.id
                  ? "text-gray-900 dark:text-white border-purple-600"
                  : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
          <ArrowUpDown className="h-4 w-4" />
          Sort
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
          <FolderOpen className="h-4 w-4" />
          Group
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.column === column.id)
          return (
            <div key={column.id} className="space-y-3">
              <div className="flex items-center justify-between px-3 py-2 border-b-2 border-dashed border-zinc-300 dark:border-zinc-600">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {column.title} {column.count}
                </h2>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded">
                    <span className="text-gray-400">···</span>
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded text-gray-600 dark:text-gray-400">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
