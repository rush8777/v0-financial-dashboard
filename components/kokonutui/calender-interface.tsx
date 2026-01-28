"use client"

import React, { useState } from "react"
import {
  Calendar as CalendarIcon,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react"
import { cn } from "@/lib/utils"

const events = [
  { id: 1, title: "Monday standup", time: "9:00 AM", day: "Mon", color: "bg-zinc-800" },
  { id: 2, title: "Deep work", time: "9:00 AM", day: "Wed", color: "bg-blue-700", duration: 3 },
  { id: 3, title: "One-on-one with Eva", time: "10:00 AM", day: "Tue", color: "bg-pink-800" },
  { id: 4, title: "Design sync", time: "10:30 AM", day: "Wed", color: "bg-blue-900" },
  { id: 5, title: "Friday standup", time: "9:00 AM", day: "Fri", color: "bg-zinc-800" },
  { id: 6, title: "Olivia x Riley", time: "10:00 AM", day: "Fri", color: "bg-purple-800" },
  { id: 7, title: "Content planning", time: "11:00 AM", day: "Mon", color: "bg-blue-900" },
  { id: 8, title: "House inspection", time: "11:00 AM", day: "Sat", color: "bg-red-900", hasIndicator: true },
  { id: 9, title: "Lunch with Olivia", time: "12:00 PM", day: "Thu", color: "bg-green-800", hasIndicator: true },
  { id: 10, title: "SEO planning", time: "1:30 PM", day: "Wed", color: "bg-purple-900" },
  { id: 11, title: "Product demo", time: "1:30 PM", day: "Fri", color: "bg-purple-900", duration: 2 },
  { id: 12, title: "Ava's engagement...", time: "9:00 AM", day: "Sun", color: "bg-purple-900", hasIndicator: true },
  { id: 13, title: "Catch up w/ Alex", time: "3:30 PM", day: "Tue", color: "bg-purple-900" },
  { id: 14, title: "Meetup event", time: "3:00 PM", day: "Wed", color: "bg-yellow-900" },
]

const events = [
  { id: 1, title: "Monday standup", time: "9:00 AM", day: "Mon", color: "bg-zinc-800" },
  { id: 2, title: "Deep work", time: "9:00 AM", day: "Wed", color: "bg-blue-700", duration: 3 },
  { id: 3, title: "One-on-one with Eva", time: "10:00 AM", day: "Tue", color: "bg-pink-800" },
  { id: 4, title: "Design sync", time: "10:30 AM", day: "Wed", color: "bg-blue-900" },
  { id: 5, title: "Friday standup", time: "9:00 AM", day: "Fri", color: "bg-zinc-800" },
  { id: 6, title: "Olivia x Riley", time: "10:00 AM", day: "Fri", color: "bg-purple-800" },
  { id: 7, title: "Content planning", time: "11:00 AM", day: "Mon", color: "bg-blue-900" },
  { id: 8, title: "House inspection", time: "11:00 AM", day: "Sat", color: "bg-red-900", hasIndicator: true },
  { id: 9, title: "Lunch with Olivia", time: "12:00 PM", day: "Thu", color: "bg-green-800", hasIndicator: true },
  { id: 10, title: "SEO planning", time: "1:30 PM", day: "Wed", color: "bg-purple-900" },
  { id: 11, title: "Product demo", time: "1:30 PM", day: "Fri", color: "bg-purple-900", duration: 2 },
  { id: 12, title: "Ava's engagement...", time: "9:00 AM", day: "Sun", color: "bg-purple-900", hasIndicator: true },
  { id: 13, title: "Catch up w/ Alex", time: "3:30 PM", day: "Tue", color: "bg-purple-900" },
  { id: 14, title: "Meetup event", time: "3:00 PM", day: "Wed", color: "bg-yellow-900" },
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const dayNumbers = [6, 7, 8, 9, 10, 11, 12]

const timeSlots = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 8 // Start from 8 AM
  const period = hour >= 12 ? "PM" : "AM"
  const displayHour = hour > 12 ? hour - 12 : hour
  return `${displayHour} ${period}`
})

export default function AICalendar() {
  const [activeView, setActiveView] = useState("week")
  const [currentTime] = useState("2:30 PM")

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Main Content */}
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">Calendar</h1>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-medium bg-zinc-800 text-white rounded-lg">
                  All events
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-300 rounded-lg">
                  Shared
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-300 rounded-lg">
                  Public
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-300 rounded-lg">
                  Archived
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-12 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                  ⌘K
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="border-b border-zinc-800 bg-zinc-950/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-xs text-zinc-500 uppercase">Jan</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">10</span>
              </div>
            </div>
            <div className="text-sm text-zinc-400">
              <span className="text-white font-medium">January 2025</span>
              <span className="mx-2">•</span>
              <span>Jan 1, 2025 - Jan 31, 2025</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <Search className="h-4 w-4 text-zinc-400" />
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <ChevronLeft className="h-4 w-4 text-zinc-400" />
            </button>
            <button className="px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors">
              Today
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg">
              <span className="text-sm text-white">Week view</span>
              <MoreVertical className="h-4 w-4 text-zinc-400" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
              <Plus className="h-4 w-4" />
              Add event
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-[1200px]">
            {/* Day Headers */}
            <div className="grid grid-cols-8 border-b border-zinc-800 bg-zinc-950/30 sticky top-0 z-10">
              <div className="p-4" />
              {weekDays.map((day, idx) => (
                <div key={day} className="p-4 text-center">
                  <div className="text-xs text-zinc-500 mb-1">{day}</div>
                  <div
                    className={cn(
                      "text-lg font-semibold inline-flex items-center justify-center w-8 h-8 rounded-full",
                      idx === 4 ? "bg-purple-600 text-white" : "text-white"
                    )}
                  >
                    {dayNumbers[idx]}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="relative">
              {timeSlots.map((time, idx) => (
                <div key={time} className="grid grid-cols-8 border-b border-zinc-800">
                  <div className="p-4 text-right">
                    <span className="text-xs text-zinc-500">{time}</span>
                  </div>
                  {weekDays.map((day) => (
                    <div
                      key={`${day}-${time}`}
                      className="relative border-l border-zinc-800 min-h-[80px] hover:bg-zinc-900/30 transition-colors"
                    />
                  ))}
                </div>
              ))}

              {/* Current Time Indicator */}
              <div className="absolute left-0 right-0 z-20 pointer-events-none" style={{ top: "35%" }}>
                <div className="flex items-center">
                  <div className="w-[calc(100%/8)] text-right pr-4">
                    <span className="text-xs font-medium text-red-500">{currentTime}</span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <div className="flex-1 h-[2px] bg-red-500/50" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 5px, rgb(239 68 68 / 0.5) 5px, rgb(239 68 68 / 0.5) 10px)' }} />
                  </div>
                </div>
              </div>

              {/* Events */}
              {events.map((event) => {
                const dayIndex = weekDays.indexOf(event.day)
                const timeIndex = event.time.includes("AM")
                  ? parseInt(event.time) - 8
                  : parseInt(event.time) + 4
                const duration = event.duration || 1

                return (
                  <div
                    key={event.id}
                    className={cn(
                      "absolute rounded-lg p-3 text-white cursor-pointer hover:opacity-90 transition-opacity",
                      event.color
                    )}
                    style={{
                      left: `${((dayIndex + 1) / 8) * 100}%`,
                      top: `${timeIndex * 80}px`,
                      width: `${100 / 8 - 1}%`,
                      height: `${duration * 80 - 8}px`,
                      marginLeft: "0.5%",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{event.title}</p>
                        <p className="text-xs text-white/70 mt-0.5">{event.time}</p>
                      </div>
                      {event.hasIndicator && (
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
