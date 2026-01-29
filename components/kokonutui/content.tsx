import { ArrowRight, ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react"
import Image from "next/image"

export default function () {
  const courses = [
    { id: 1, title: "UI/UX Design", watched: 2, total: 8, icon: "🎨" },
    { id: 2, title: "Branding", watched: 3, total: 8, icon: "💼" },
    { id: 3, title: "Front End", watched: 6, total: 12, icon: "💻" },
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

      {/* Course Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-[#1F1F23] rounded-xl p-4 border border-gray-200 dark:border-[#2F2F37]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="text-2xl">{course.icon}</div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{course.watched}/{course.total}watched</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{course.title}</p>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-[#0F0F12] rounded">
                <MapPin className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="w-full bg-gray-200 dark:bg-[#0F0F12] rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${(course.watched / course.total) * 100}%` }}
              />
            </div>
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
