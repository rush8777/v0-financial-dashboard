import { ArrowRight, ChevronLeft, ChevronRight, Heart, MapPin, TrendingUp, TrendingDown } from "lucide-react"
import Image from "next/image"

export default function () {
  const courses = [
    { 
      id: 1, 
      title: "UI/UX Design", 
      watched: 2, 
      total: 8, 
      icon: "🎨",
      percentage: 25,
      trend: "+12%",
      trendUp: true
    },
    { 
      id: 2, 
      title: "Branding", 
      watched: 3, 
      total: 8, 
      icon: "💼",
      percentage: 38,
      trend: "+8%",
      trendUp: true
    },
    { 
      id: 3, 
      title: "Front End", 
      watched: 6, 
      total: 12, 
      icon: "💻",
      percentage: 50,
      trend: "+15%",
      trendUp: true
    },
  ]

  const continueCourses = [
    {
      id: 1,
      title: "Beginner's Guide to Becoming a Professional Front-End Developer",
      category: "FRONT END",
      mentor: "Leonardo samsul",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Optimizing User Experience with the Best UI/UX Design",
      category: "UI/UX DESIGN",
      mentor: "Bayu Salto",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Reviving and Refresh Company Image",
      category: "BRANDING",
      mentor: "Padhang Satrio",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    },
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

  return (
    <div className="space-y-8">
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

      {/* Course Progress Cards - New Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="p-4 rounded-lg bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800 shadow-sm backdrop-blur-xl"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">{course.title}</p>
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">{course.percentage}%</h3>
              </div>
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <span className="text-2xl">{course.icon}</span>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                {course.watched} of {course.total} watched
              </p>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5">
                <div
                  className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${course.percentage}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {course.trend} vs last week
            </p>
          </div>
        ))}
      </div>

      {/* Continue Watching */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Continue Watching</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {continueCourses.map((course) => (
            <div key={course.id} className="flex flex-col">
              <div className="relative mb-4 rounded-xl overflow-hidden group">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors">
                  <Heart className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-semibold text-purple-600 bg-white/90 px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">{course.title}</h3>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gray-200 dark:border-[#2F2F37]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  {course.mentor.charAt(0)}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{course.mentor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Lesson */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Lesson</h2>
          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">See all</button>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#1F1F23]">
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
                <tr key={lesson.id} className="border-b border-gray-100 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors">
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
                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
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
    </div>
  )
}
