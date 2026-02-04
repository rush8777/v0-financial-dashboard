"use client"

import React from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Users, MapPin, Tag, TrendingUp } from "lucide-react"

// Sample data structure
const defaultDemographicData = {
  ageGroups: [
    { label: "13–17", value: 8 },
    { label: "18–24", value: 38 },
    { label: "25–34", value: 42 },
    { label: "35–44", value: 14 },
    { label: "45+", value: 6 },
  ],
  gender: [
    { label: "Male", value: 62 },
    { label: "Female", value: 34 },
    { label: "Other / Unknown", value: 4 },
  ],
  locations: [
    { label: "India", value: 28 },
    { label: "USA", value: 22 },
    { label: "UK", value: 11 },
    { label: "Canada", value: 9 },
    { label: "Australia", value: 7 },
    { label: "Germany", value: 5 },
    { label: "Others", value: 18 },
  ],
  interests: [
    "Tech",
    "AI Tools",
    "Startups",
    "Content Creation",
    "Productivity",
    "Design",
    "Marketing",
    "SaaS",
  ],
}

// Color palettes
const GENDER_COLORS = {
  Male: "#3b82f6",      // Blue
  Female: "#ec4899",    // Pink
  "Other / Unknown": "#8b5cf6", // Purple
}

const AGE_COLOR = "#6366f1" // Indigo
const LOCATION_COLOR = "#10b981" // Emerald

// Custom tooltip for charts
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-3">
        <p className="text-xs font-semibold text-white mb-1">
          {data.payload.label || data.name}
        </p>
        <p className="text-xs text-zinc-400">
          <span className="font-semibold text-purple-400">{data.value}%</span>
        </p>
      </div>
    )
  }
  return null
}

// Custom label for pie chart
const renderCustomLabel = (entry: any) => {
  return `${entry.value}%`
}

interface AudienceDemographicsProps {
  data?: typeof defaultDemographicData
  showEmptyState?: boolean
}

export default function AudienceDemographics({
  data = defaultDemographicData,
  showEmptyState = false,
}: AudienceDemographicsProps) {
  // Empty state
  if (showEmptyState || !data) {
    return (
      <div className="rounded-xl border p-12 bg-zinc-900/50 border-zinc-800">
        <div className="text-center">
          <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Not Enough Data Yet
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            We're analyzing your audience demographics. Check back after you have more
            engagement on your content.
          </p>
        </div>
      </div>
    )
  }

  const totalAudience = data.ageGroups.reduce((sum, group) => sum + group.value, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border p-6 bg-zinc-900/50 border-zinc-800">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Audience Demographics</h2>
        </div>
        <p className="text-sm text-zinc-400">
          AI-powered insights about who engages with your content
        </p>
      </div>

      {/* Age Distribution */}
      <div className="rounded-xl border p-6 bg-zinc-900/50 border-zinc-800">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-1">Age Distribution</h3>
          <p className="text-xs text-zinc-400">
            Age groups based on engagement patterns and comment analysis
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.ageGroups}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
              <XAxis
                type="number"
                stroke="#71717a"
                tick={{ fill: "#71717a", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "#27272a" }}
                domain={[0, 50]}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis
                type="category"
                dataKey="label"
                stroke="#71717a"
                tick={{ fill: "#71717a", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#27272a" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill={AGE_COLOR}
                radius={[0, 8, 8, 0]}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insight */}
        <div className="mt-4 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <p className="text-xs text-indigo-400">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            Your primary audience is{" "}
            <span className="font-semibold">
              {data.ageGroups.reduce((max, group) => 
                group.value > max.value ? group : max
              ).label}
            </span>
            {" "}with{" "}
            <span className="font-semibold">
              {Math.max(...data.ageGroups.map(g => g.value))}%
            </span>
            {" "}of your audience
          </p>
        </div>
      </div>

      {/* Gender Distribution */}
      <div className="rounded-xl border p-6 bg-zinc-900/50 border-zinc-800">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-1">Gender Distribution</h3>
          <p className="text-xs text-zinc-400">
            Inferred from engagement patterns and user interactions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Pie Chart */}
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.gender}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={renderCustomLabel}
                  labelLine={false}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {data.gender.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={GENDER_COLORS[entry.label as keyof typeof GENDER_COLORS]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {data.gender.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-700"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: GENDER_COLORS[item.label as keyof typeof GENDER_COLORS],
                    }}
                  />
                  <span className="text-sm font-medium text-white">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-purple-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Locations */}
      <div className="rounded-xl border p-6 bg-zinc-900/50 border-zinc-800">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Top Locations</h3>
          </div>
          <p className="text-xs text-zinc-400">
            Geographic distribution of your audience based on engagement data
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.locations}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="#71717a"
                tick={{ fill: "#71717a", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "#27272a" }}
              />
              <YAxis
                stroke="#71717a"
                tick={{ fill: "#71717a", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "#27272a" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill={LOCATION_COLOR}
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Location Stats */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {data.locations.slice(0, 4).map((location, index) => (
            <div
              key={location.label}
              className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700"
            >
              <p className="text-xs text-zinc-400 mb-1">#{index + 1}</p>
              <p className="text-sm font-semibold text-white">{location.label}</p>
              <p className="text-xs text-emerald-400 font-medium">{location.value}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Interests */}
      <div className="rounded-xl border p-6 bg-zinc-900/50 border-zinc-800">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Tag className="w-4 h-4 text-pink-400" />
            <h3 className="text-lg font-semibold text-white">Audience Interests</h3>
          </div>
          <p className="text-xs text-zinc-400">
            Topics and themes your audience engages with most
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.interests.map((interest, index) => (
            <div
              key={interest}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 cursor-pointer group"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: "fadeIn 0.5s ease-out forwards",
              }}
            >
              <span className="text-sm font-medium text-purple-300 group-hover:text-purple-200 transition-colors">
                {interest}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <p className="text-xs text-purple-400">
            💡 <span className="font-semibold">Content Strategy Tip:</span> Create more content
            around these topics to maximize engagement with your existing audience
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
