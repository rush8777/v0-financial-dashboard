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

      {/* Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Projects</h2>
          <div className="flex items-center gap-3">
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                  activeFilterCount > 0
                    ? "bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300"
                    : "bg-white dark:bg-[#1F1F23] border-gray-200 dark:border-[#2F2F37] hover:bg-gray-50 dark:hover:bg-[#2F2F37] text-gray-700 dark:text-gray-300"
                )}
              >
                <Filter className="w-4 h-4" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-purple-600 text-white text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isFilterOpen && "rotate-180")} />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#1F1F23] border border-gray-200 dark:border-[#2F2F37] rounded-xl shadow-lg shadow-black/10 dark:shadow-black/30 z-50 p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Filters</span>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={() => { setSelectedPlatform(null); setSelectedContentType(null) }}
                        className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                      >
                        <X className="w-3 h-3" />
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Platform */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Platform</p>
                    <div className="flex flex-wrap gap-1.5">
                      {platforms.map((platform) => (
                        <button
                          key={platform}
                          onClick={() => setSelectedPlatform(selectedPlatform === platform ? null : platform)}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium transition-all",
                            selectedPlatform === platform
                              ? getCategoryColor(platform) + " ring-2 ring-offset-1 dark:ring-offset-[#1F1F23] ring-current"
                              : "bg-gray-100 dark:bg-[#2F2F37] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#3F3F47]"
                          )}
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <hr className="border-gray-200 dark:border-[#2F2F37]" />

                  {/* Content Type */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Content Type</p>
                    <div className="flex flex-wrap gap-1.5">
                      {contentTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedContentType(selectedContentType === type ? null : type)}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium transition-all",
                            selectedContentType === type
                              ? getPriorityColor(type) + " ring-2 ring-offset-1 dark:ring-offset-[#1F1F23] ring-current"
                              : "bg-gray-100 dark:bg-[#2F2F37] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#3F3F47]"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#1F1F23] border border-gray-200 dark:border-[#2F2F37] hover:bg-gray-50 dark:hover:bg-[#2F2F37] text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
          </div>
        </div>

        {/* Kanban Board - Changed to 4 columns with smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="space-y-3">
                {filteredTasks
                  .filter((task) => task.column === column.id)
                  .map((task) => (
                    <Card key={task.id} className="border border-gray-200 dark:border-[#2F2F37] bg-white dark:bg-[#1F1F23] hover:shadow-md transition-shadow">
                      <CardContent className="p-3 space-y-2.5">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className={cn("px-2 py-0.5 rounded text-xs font-semibold", getPriorityColor(task.priority))}>
                              {task.priority}
                            </span>
                            <span className={cn("px-2 py-0.5 rounded text-xs font-semibold", getCategoryColor(task.category))}>
                              {task.category}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{task.id}</span>
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">{task.title}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{task.description}</p>

                        {/* Progress */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="text-xs font-semibold text-gray-900 dark:text-white">{task.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-[#2F2F37] rounded-full h-1.5">
                            <div className={cn("h-1.5 rounded-full", task.progressColor)} style={{ width: `${task.progress}%` }} />
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-[#2F2F37]">
                          <div className="flex items-center gap-0.5">
                            {task.team.slice(0, 3).map((member, idx) => (
                              <div key={idx} className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 -ml-1 first:ml-0" />
                            ))}
                            {task.team.length > 3 && (
                              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600 -ml-1">
                                +{task.team.length - 3}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5 text-gray-500 dark:text-gray-400">
                              <Link2 className="w-3.5 h-3.5" />
                              <span className="text-xs font-medium">{task.links}</span>
                            </div>
                            <div className="flex items-center gap-0.5 text-gray-500 dark:text-gray-400">
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span className="text-xs font-medium">{task.comments}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
