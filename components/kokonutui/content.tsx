import { ArrowRight, Filter, ArrowUpDown, Link2, MessageCircle, X, ChevronDown, Play, Image, FileText, Film, Users } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import CreateProjectModal from "@/components/kokonutui/create-project"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Course {
  id: number
  label: string
  icon: React.FC<{ className?: string }>
  gradient: string
}

const columns = [
  { id: "todo" },
  { id: "progress" },
  { id: "review" },
  { id: "done" },
]

const tasks = [
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
    column: "todo",
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
    column: "progress",
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
    column: "review",
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
    column: "done",
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
    column: "progress",
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

export default function CoursePage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  const platforms = ["Facebook", "Instagram", "Tiktok", "Youtube"]
  const contentTypes = ["Video", "Image", "Post"]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredTasks = tasks.filter((task) => {
    const matchesPlatform = !selectedPlatform || task.category === selectedPlatform
    const matchesContentType = !selectedContentType || task.priority === selectedContentType
    return matchesPlatform && matchesContentType
  })

  const activeFilterCount = (selectedPlatform ? 1 : 0) + (selectedContentType ? 1 : 0)

  const courses: Course[] = [
    { id: 1, label: "Video",  icon: Play,      gradient: "linear-gradient(135deg, #ef4444, #f97316, #eab308, #ef4444)" },
    { id: 2, label: "Post",   icon: FileText,  gradient: "linear-gradient(135deg, #22c55e, #14b8a6, #06b6d4, #22c55e)" },
    { id: 3, label: "Image",  icon: Image,     gradient: "linear-gradient(135deg, #8b5cf6, #ec4899, #f43f5e, #8b5cf6)" },
    { id: 4, label: "Reels",  icon: Film,      gradient: "linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6, #3b82f6)" },
    { id: 5, label: "Group",  icon: Users,     gradient: "linear-gradient(135deg, #f59e0b, #10b981, #3b82f6, #f59e0b)" },
  ]

  const lessons = [
    {
      id: 1,
      mentor: "Padhang Satrio",
      date: "2/16/2024",
      type: "UI/UX DESIGN",
      description: "Understand Of UI/UX Design",
    },
  ]

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCourse(null)
  }

  return (
    <div className="space-y-8 min-h-screen bg-gray-50 dark:bg-[#0F0F12] p-6">
      <style>{`
        @keyframes gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .card-gradient-bg {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }
      `}</style>
      {/* Course Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white flex items-center justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10">
          <div className="grid grid-cols-4 gap-4">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-12 h-12 border border-white/30 rounded" />
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-sm font-semibold tracking-widest text-purple-200 mb-2">ONLINE COURSE</p>
          <h1 className="text-4xl font-bold mb-6">Sharpen Your Skills with<br />Professional Online Courses</h1>
          <button className="bg-black hover:bg-gray-800 transition-colors text-white rounded-full px-6 py-3 font-semibold flex items-center gap-2">
            Join Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Course Progress Cards - Clickable */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {courses.map((course) => {
          const Icon = course.icon
          return (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="relative overflow-hidden p-5 rounded-lg bg-white dark:bg-[#1F1F23] border border-zinc-100 dark:border-zinc-800 shadow-sm text-left transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 flex flex-col items-center justify-center gap-3"
            >
              {/* Animated gradient background */}
              <div
                className="card-gradient-bg absolute inset-0 opacity-25 dark:opacity-30"
                style={{ background: course.gradient }}
              />

              {/* Icon */}
              <div className="relative z-10 p-3 rounded-xl bg-white/60 dark:bg-[#2F2F37]/60 backdrop-blur-sm">
                <Icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
              </div>

              {/* Label */}
              <p className="relative z-10 text-sm font-semibold text-zinc-900 dark:text-white">{course.label}</p>
            </button>
          )
        })}
      </div>

      {/* Recent Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-400 dark:text-gray-400">Recent Projects</h2>
          <button className="text-sm text-gray-400 hover:text-gray-300 font-medium flex items-center gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTasks.slice(0, 4).map((task, index) => (
            <div key={task.id} className="group relative">
              <div className="bg-[#1a1a1a] dark:bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 dark:border-gray-800 hover:border-gray-700 transition-all">
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                  {index === 0 ? (
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold text-white/20">📊</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-6xl text-gray-700">v0</div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-medium text-white mb-1 truncate">{task.title.replace(/\.\.$/, '')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {task.id === "MKT-101" ? "7d ago" : 
                     task.id === "DES-218" ? "55d ago" : 
                     task.id === "MKT-098" ? "55d ago" : "60d ago"}
                  </p>
                </div>
              </div>
              
              {/* Three dots menu */}
              <button className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col gap-1">
                  <div className="w-1 h-1 rounded-full bg-white"></div>
                  <div className="w-1 h-1 rounded-full bg-white"></div>
                  <div className="w-1 h-1 rounded-full bg-white"></div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Your Lesson */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Lesson</h2>
          <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">See all</button>
        </div>

        <div className="bg-white dark:bg-[#1F1F23] rounded-xl border border-gray-200 dark:border-[#2F2F37] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#2F2F37]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  MENTOR
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  TYPE
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  DESC
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="border-b border-gray-100 dark:border-[#2F2F37] hover:bg-gray-50 dark:hover:bg-[#2F2F37]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        {lesson.mentor.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{lesson.mentor}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{lesson.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                      {lesson.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{lesson.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#2F2F37] rounded-lg transition-colors">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        course={selectedCourse}
      />
    </div>
  )
}
