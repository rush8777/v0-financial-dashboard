"use client"

import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

// Sample data - replace with your actual data
const emotionalData = [
  { time: "00:00", intensity: 45, emotion: "neutral" },
  { time: "00:05", intensity: 32, emotion: "neutral" },
  { time: "00:10", intensity: 68, emotion: "surprise" },
  { time: "00:15", intensity: 91, emotion: "excitement" },
  { time: "00:20", intensity: 40, emotion: "calm" },
  { time: "00:25", intensity: 55, emotion: "interest" },
  { time: "00:30", intensity: 78, emotion: "joy" },
  { time: "00:35", intensity: 23, emotion: "sadness" },
  { time: "00:40", intensity: 62, emotion: "surprise" },
  { time: "00:45", intensity: 85, emotion: "excitement" },
  { time: "00:50", intensity: 48, emotion: "neutral" },
  { time: "00:55", intensity: 70, emotion: "interest" },
  { time: "01:00", intensity: 38, emotion: "calm" },
]

// Find peaks (highest intensity points)
const findPeaks = (data: typeof emotionalData, threshold = 75) => {
  return data.filter((point) => point.intensity >= threshold)
}

// Find drops (lowest intensity points)
const findDrops = (data: typeof emotionalData, threshold = 35) => {
  return data.filter((point) => point.intensity <= threshold)
}

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg p-3">
        <p className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
          {data.time}
        </p>
        <p className="text-xs text-gray-600 dark:text-zinc-400 mb-1">
          Intensity: <span className="font-semibold text-purple-600 dark:text-purple-400">{data.intensity}</span>
        </p>
        <p className="text-xs text-gray-600 dark:text-zinc-400 capitalize">
          Emotion: <span className="font-semibold text-gray-900 dark:text-white">{data.emotion}</span>
        </p>
      </div>
    )
  }
  return null
}

interface EmotionalIntensityChartProps {
  data?: typeof emotionalData
  isDark?: boolean
}

export default function EmotionalIntensityChart({ 
  data = emotionalData, 
  isDark = true 
}: EmotionalIntensityChartProps) {
  const peaks = findPeaks(data)
  const drops = findDrops(data)

  return (
    <div className={`rounded-xl border p-6 ${
      isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-gray-200"
    }`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className={`text-lg font-semibold mb-1 ${
          isDark ? "text-white" : "text-gray-900"
        }`}>
          Emotional Intensity Timeline
        </h3>
        <p className={`text-sm ${
          isDark ? "text-zinc-400" : "text-gray-500"
        }`}>
          Video emotional analysis over time
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className={`h-4 w-4 ${
            isDark ? "text-green-400" : "text-green-600"
          }`} />
          <span className={`text-xs ${
            isDark ? "text-zinc-400" : "text-gray-600"
          }`}>
            Peaks ({peaks.length})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingDown className={`h-4 w-4 ${
            isDark ? "text-red-400" : "text-red-600"
          }`} />
          <span className={`text-xs ${
            isDark ? "text-zinc-400" : "text-gray-600"
          }`}>
            Drops ({drops.length})
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#27272a" : "#e5e7eb"}
              vertical={false}
            />
            
            <XAxis
              dataKey="time"
              stroke={isDark ? "#71717a" : "#9ca3af"}
              tick={{ fill: isDark ? "#71717a" : "#6b7280", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: isDark ? "#27272a" : "#e5e7eb" }}
            />
            
            <YAxis
              domain={[0, 100]}
              stroke={isDark ? "#71717a" : "#9ca3af"}
              tick={{ fill: isDark ? "#71717a" : "#6b7280", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: isDark ? "#27272a" : "#e5e7eb" }}
              label={{
                value: "Intensity",
                angle: -90,
                position: "insideLeft",
                style: {
                  fill: isDark ? "#71717a" : "#6b7280",
                  fontSize: 11,
                },
              }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* Main line */}
            <Line
              type="monotone"
              dataKey="intensity"
              stroke="#a855f7"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#a855f7",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />

            {/* Highlight peaks with green dots */}
            {peaks.map((peak, index) => (
              <ReferenceDot
                key={`peak-${index}`}
                x={peak.time}
                y={peak.intensity}
                r={5}
                fill={isDark ? "#22c55e" : "#16a34a"}
                stroke={isDark ? "#86efac" : "#22c55e"}
                strokeWidth={2}
              />
            ))}

            {/* Highlight drops with red dots */}
            {drops.map((drop, index) => (
              <ReferenceDot
                key={`drop-${index}`}
                x={drop.time}
                y={drop.intensity}
                r={5}
                fill={isDark ? "#ef4444" : "#dc2626"}
                stroke={isDark ? "#fca5a5" : "#ef4444"}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Moments */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className={`rounded-lg p-3 ${
          isDark ? "bg-green-500/10 border border-green-500/20" : "bg-green-50 border border-green-200"
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className={`h-4 w-4 ${
              isDark ? "text-green-400" : "text-green-600"
            }`} />
            <span className={`text-xs font-semibold ${
              isDark ? "text-green-400" : "text-green-700"
            }`}>
              Highest Peak
            </span>
          </div>
          {peaks.length > 0 && (
            <>
              <p className={`text-sm font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                {Math.max(...peaks.map(p => p.intensity))}
              </p>
              <p className={`text-xs ${
                isDark ? "text-zinc-400" : "text-gray-600"
              }`}>
                at {peaks.find(p => p.intensity === Math.max(...peaks.map(p => p.intensity)))?.time}
              </p>
            </>
          )}
        </div>

        <div className={`rounded-lg p-3 ${
          isDark ? "bg-red-500/10 border border-red-500/20" : "bg-red-50 border border-red-200"
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className={`h-4 w-4 ${
              isDark ? "text-red-400" : "text-red-600"
            }`} />
            <span className={`text-xs font-semibold ${
              isDark ? "text-red-400" : "text-red-700"
            }`}>
              Lowest Drop
            </span>
          </div>
          {drops.length > 0 && (
            <>
              <p className={`text-sm font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                {Math.min(...drops.map(d => d.intensity))}
              </p>
              <p className={`text-xs ${
                isDark ? "text-zinc-400" : "text-gray-600"
              }`}>
                at {drops.find(d => d.intensity === Math.min(...drops.map(d => d.intensity)))?.time}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
