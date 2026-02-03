import { Search, Plus, MoreVertical } from "lucide-react"
import { useState } from "react"
import Layout from "@/components/Layout"

interface Project {
  id: string
  name: string
  lastModified: string
  thumbnail?: string
  hasContent: boolean
}

const projects: Project[] = [
  {
    id: "1",
    name: "v0-financial-dashboard",
    lastModified: "7d ago",
    hasContent: true,
  },
  {
    id: "2",
    name: "v0-ai-prompt",
    lastModified: "55d ago",
    hasContent: false,
  },
  {
    id: "3",
    name: "v0-prompt-it",
    lastModified: "55d ago",
    hasContent: false,
  },
  {
    id: "4",
    name: "v0-perplexity-ui-design",
    lastModified: "61d ago",
    hasContent: false,
  },
  {
    id: "5",
    name: "v0-cyberpunk-dashboard-design",
    lastModified: "60d ago",
    hasContent: false,
  },
  {
    id: "6",
    name: "v0-instrincl",
    lastModified: "61d ago",
    hasContent: false,
  },
]

function ProjectCard({ project }: { project: Project }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="group relative">
      {/* Card Preview */}
      <div className="aspect-[4/3] rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden mb-3 relative hover:border-[#3A3A3A] transition-colors cursor-pointer">
        {project.hasContent ? (
          <div className="w-full h-full bg-white p-4">
            {/* Financial Dashboard Preview */}
            <div className="text-[8px] space-y-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-gray-400 text-[6px]">OVERVIEW</p>
                  <p className="text-xs font-semibold">Accounts</p>
                  <p className="text-xl font-bold">$26,640.25</p>
                  <p className="text-gray-500 text-[7px]">Total Balance</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[6px] mb-1">Recent Transactions</p>
                  <div className="space-y-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between gap-2 text-[6px]">
                        <span className="text-gray-600">Transaction {i + 1}</span>
                        <span className="text-red-500">-$0.00</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-[#2A2A2A]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Avatar */}
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>

          {/* Project Info */}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-white truncate">{project.name}</h3>
            <p className="text-xs text-gray-500">{project.lastModified}</p>
          </div>
        </div>

        {/* Menu Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsMenuOpen(!isMenuOpen)
          }}
          className="p-1.5 hover:bg-[#2A2A2A] rounded-md transition-colors flex-shrink-0"
        >
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-[calc(100%-2rem)] mt-1 w-48 bg-[#1F1F23] border border-[#2F2F37] rounded-lg shadow-lg shadow-black/30 py-1 z-50">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#2F2F37] transition-colors">
              Open
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#2F2F37] transition-colors">
              Rename
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#2F2F37] transition-colors">
              Duplicate
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#2F2F37] transition-colors">
              Share
            </button>
            <div className="border-t border-[#2F2F37] my-1"></div>
            <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-[#2F2F37] transition-colors">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function ProjectsView() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">Projects</h1>

          {/* Search and New Project Button */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3A3A3A] transition-colors"
              />
            </div>

            {/* New Project Button */}
            <button className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-100 text-black rounded-lg font-medium transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" />
              New project
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-1">No projects found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
