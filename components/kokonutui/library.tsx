import { Search, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Layout from "@/components/Layout"

interface Chat {
  id: string
  name: string
  project?: string
  updatedAt: string
  hasProject: boolean
}

const chats: Chat[] = [
  {
    id: "1",
    name: "Connections page design",
    project: "v0-financial-dashboard",
    updatedAt: "37m ago",
    hasProject: true,
  },
  {
    id: "2",
    name: "rush8777/v0-financial-dashboard",
    project: "v0-financial-dashboard",
    updatedAt: "5d ago",
    hasProject: true,
  },
  {
    id: "3",
    name: "Live code editor",
    updatedAt: "29d ago",
    hasProject: false,
  },
  {
    id: "4",
    name: "Shadcn/ui Button Group",
    updatedAt: "29d ago",
    hasProject: false,
  },
  {
    id: "5",
    name: "Futuristic hero section",
    updatedAt: "48d ago",
    hasProject: false,
  },
  {
    id: "6",
    name: "Create React header",
    updatedAt: "54d ago",
    hasProject: false,
  },
  {
    id: "7",
    name: "Import from GitHub",
    project: "v0-prompt-it",
    updatedAt: "55d ago",
    hasProject: true,
  },
  {
    id: "8",
    name: "OmniLead SaaS platform",
    updatedAt: "57d ago",
    hasProject: false,
  },
]

// ChatRow component matching the exact structure from "My Chats Section"
function ChatRow({ chat, index }: { chat: any; index: number }) {
  return (
    <div className="group hover:bg-gray-50 dark:hover:bg-[#2F2F37]/50 transition-colors">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Left - Chat Icon and Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className="flex-shrink-0">
            {chat.hasProject ? (
              <div className="w-5 h-5 rounded-full bg-white dark:bg-white flex items-center justify-center">
                <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-dashed border-gray-400 dark:border-gray-600" />
            )}
          </div>

          {/* Name */}
          <h3 className="text-sm font-normal text-gray-900 dark:text-white truncate">
            {chat.name}
          </h3>
        </div>

        {/* Middle - Project */}
        <div className="flex-shrink-0 min-w-[200px]">
          {chat.hasProject && chat.project && (
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
              <span className="text-sm">{chat.project}</span>
            </div>
          )}
        </div>

        {/* Right - Time and Status */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Time */}
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {chat.updatedAt}
          </span>

          {/* Status Dot */}
          <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
        </div>
      </div>
    </div>
  )
}

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (chat.project && chat.project.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="px-6 py-6 border-b border-[#2F2F37]">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Library</h1>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1F1F23] border border-[#2F2F37] rounded-lg pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors"
              />
            </div>

            {/* Filter Button */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-[#1F1F23] border border-[#2F2F37] hover:bg-[#2F2F37] rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="12" y2="18" />
                </svg>
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="px-6 py-4 border-b border-[#2F2F37] bg-[#0F0F12]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-5" /> {/* Spacer for icon */}
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Name</span>
            </div>
            <div className="min-w-[200px]">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Project</span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-400 transition-colors">
                Updated
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="w-2" /> {/* Spacer for status dot */}
            </div>
          </div>
        </div>

        {/* Chat List */}
        <div className="divide-y divide-[#2F2F37]">
          {filteredChats.map((chat, index) => (
            <ChatRow key={chat.id} chat={chat} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1F1F23] flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-1">No chats found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
