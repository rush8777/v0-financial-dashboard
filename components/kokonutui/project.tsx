import { Search, Plus, Link2, MessageCircle } from "lucide-react"
import { useState } from "react"
import Layout from "./layout"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  title: string
  description: string
  priority: string
  category: string
  progress: number
  progressColor: string
  team: string[]
  links: number
  comments: number
}

const projects: Project[] = [
  {
    id: "MKT-101",
    title: "Draft Q3 Social Media Calendar..",
    description: "Plan posts for all platforms for the upcoming quarter.",
    priority: "Video",
    category: "Facebook",
    progress: 40,
    progressColor: "bg-red-500",
    team: ["👤", "👤", "👤", "👤"],
    links: 5,
    comments: 2,
  },
  {
    id: "DES-218",
    title: "Research Competitor Onboarding Flows",
    description: "Analyze 3-5 competitors and document their onboarding.",
    priority: "Post",
    category: "Instagram",
    progress: 40,
    progressColor: "bg-green-500",
    team: ["👤", "👤", "👤", "👤"],
    links: 5,
    comments: 2,
  },
  {
    id: "MKT-098",
    title: "Write Blog Post on \"5 Productivity Tips\"",
    description: "Final draft is complete and ready for editorial review.",
    priority: "Video",
    category: "Youtube",
    progress: 100,
    progressColor: "bg-red-500",
    team: ["👤", "👤", "👤", "👤"],
    links: 5,
    comments: 2,
  },
  {
    id: "DEV-345",
    title: "Set up new Staging Database",
    description: "Provision and configure the PostgreSQL instance for staging.",
    priority: "Image",
    category: "Instagram",
    progress: 40,
    progressColor: "bg-blue-600",
    team: ["👤", "👤", "👤", "👤"],
    links: 5,
    comments: 2,
  },
  {
    id: "DEV-340",
    title: "Implement Login Page UI",
    description: "Code the React components for the new login and registration forms.",
    priority: "Video",
    category: "Facebook",
    progress: 40,
    progressColor: "bg-red-500",
    team: ["👤", "👤", "👤", "👤"],
    links: 5,
    comments: 2,
  },
  {
    id: "MKT-567",
    title: "Create Instagram Reels Campaign",
    description: "Develop a series of engaging reels for product launch.",
    priority: "Post",
    category: "Instagram",
    progress: 75,
    progressColor: "bg-green-500",
    team: ["👤", "👤", "👤"],
    links: 3,
    comments: 8,
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Video":
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
    case "Image":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
    case "Post":
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
  }
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Facebook: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    Instagram: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    Tiktok: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
    Youtube: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  }
  return colors[category] || "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="border border-gray-200 dark:border-[#2F2F37] bg-white dark:bg-[#1F1F23] hover:shadow-md transition-shadow">
      <CardContent className="p-3 space-y-2.5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className={cn("px-2 py-0.5 rounded text-xs font-semibold", getPriorityColor(project.priority))}>
              {project.priority}
            </span>
            <span className={cn("px-2 py-0.5 rounded text-xs font-semibold", getCategoryColor(project.category))}>
              {project.category}
            </span>
          </div>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{project.id}</span>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">{project.title}</h3>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{project.description}</p>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-xs font-semibold text-gray-900 dark:text-white">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-[#2F2F37] rounded-full h-1.5">
            <div className={cn("h-1.5 rounded-full", project.progressColor)} style={{ width: `${project.progress}%` }} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-[#2F2F37]">
          <div className="flex items-center gap-0.5">
            {project.team.slice(0, 3).map((member, idx) => (
              <div key={idx} className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 -ml-1 first:ml-0" />
            ))}
            {project.team.length > 3 && (
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600 -ml-1">
                +{project.team.length - 3}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-gray-500 dark:text-gray-400">
              <Link2 className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{project.links}</span>
            </div>
            <div className="flex items-center gap-0.5 text-gray-500 dark:text-gray-400">
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{project.comments}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F12] p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Projects</h1>

          {/* Search and New Project Button */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#1F1F23] border border-gray-200 dark:border-[#2F2F37] rounded-lg pl-12 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-colors"
              />
            </div>

            {/* New Project Button */}
            <button className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" />
              New project
            </button>
          </div>
        </div>

        {/* Projects Grid - Using exact 4-column layout from original code */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-[#1F1F23] flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">No projects found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
