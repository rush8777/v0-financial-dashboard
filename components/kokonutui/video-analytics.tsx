"use client"

import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { TrendingUp, AlertCircle, MessageCircle, HelpCircle, ThumbsUp } from "lucide-react"

// Mock data for Sentiment Pulse
const sentimentData = [
  { time: "0:00", positive: 85, negative: 15 },
  { time: "1:00", positive: 78, negative: 22 },
  { time: "2:00", positive: 82, negative: 18 },
  { time: "3:00", positive: 88, negative: 12 },
  { time: "4:00", positive: 91, negative: 9 },
  { time: "5:00", positive: 89, negative: 11 },
  { time: "6:00", positive: 84, negative: 16 },
  { time: "7:00", positive: 87, negative: 13 },
  { time: "8:00", positive: 86, negative: 14 },
  { time: "9:00", positive: 90, negative: 10 },
  { time: "10:00", positive: 92, negative: 8 },
]

// Mock data for Emotion Radar
const emotionData = [
  { subject: "Hype", A: 92 },
  { subject: "Skepticism", A: 45 },
  { subject: "Humor", A: 78 },
  { subject: "Anger", A: 12 },
  { subject: "Curiosity", A: 88 },
  { subject: "Trust", A: 76 },
]

// Topic data for Topic Galaxy visualization
const topicTags = [
  { name: "Pricing", volume: 45, color: "bg-blue-500" },
  { name: "Audio Quality", volume: 38, color: "bg-purple-500" },
  { name: "Feature Request", volume: 52, color: "bg-pink-500" },
  { name: "Performance", volume: 41, color: "bg-green-500" },
  { name: "Documentation", volume: 33, color: "bg-yellow-500" },
  { name: "Bugs", volume: 28, color: "bg-red-500" },
  { name: "UI/UX", volume: 35, color: "bg-indigo-500" },
  { name: "Integration", volume: 29, color: "bg-teal-500" },
]

// Mock top comments
const topComments = [
  {
    id: "1",
    author: "Tech Enthusiast",
    avatar: "TE",
    content: "The production quality of this video is absolutely insane! The cinematography and editing are top-tier.",
    likes: 2847,
    intent: "positive",
  },
  {
    id: "2",
    author: "Critical Viewer",
    avatar: "CV",
    content: "Great video, but the pacing felt a bit slow in the middle section. Still enjoyed it overall.",
    likes: 1234,
    intent: "criticism",
  },
  {
    id: "3",
    author: "Question Asker",
    avatar: "QA",
    content: "How much did this project cost to produce? Would love to know the budget breakdown.",
    likes: 891,
    intent: "question",
  },
  {
    id: "4",
    author: "Supporter",
    avatar: "SU",
    content: "This is why you're the best YouTube channel out there. Keep up the amazing work!",
    likes: 3102,
    intent: "positive",
  },
  {
    id: "5",
    author: "Skeptic",
    avatar: "SK",
    content: "Some of the claims seem exaggerated. Do you have sources for these statistics?",
    likes: 756,
    intent: "criticism",
  },
]

const sentimentConfig = {
  positive: { label: "Positive", color: "hsl(142 72% 29%)" },
  negative: { label: "Negative", color: "hsl(0 84% 60%)" },
}

const emotionConfig = {
  A: { label: "Sentiment Level", color: "hsl(262 80% 50%)" },
}

export default function VideoAnalytics() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Sentiment Score */}
        <div className={cn(
          "p-4 rounded-lg",
          "bg-white dark:bg-zinc-900/70",
          "border border-zinc-100 dark:border-zinc-800",
          "shadow-sm backdrop-blur-xl"
        )}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">Net Sentiment Score</p>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">82%</h3>
            </div>
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">+5% vs last video</p>
        </div>

        {/* Engagement Velocity */}
        <div className={cn(
          "p-4 rounded-lg",
          "bg-white dark:bg-zinc-900/70",
          "border border-zinc-100 dark:border-zinc-800",
          "shadow-sm backdrop-blur-xl"
        )}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">Engagement Velocity</p>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">450</h3>
            </div>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">comments/hr</p>
        </div>

        {/* Toxicity Alert */}
        <div className={cn(
          "p-4 rounded-lg",
          "bg-white dark:bg-zinc-900/70",
          "border border-zinc-100 dark:border-zinc-800",
          "shadow-sm backdrop-blur-xl"
        )}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">Toxicity Alert</p>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">3</h3>
            </div>
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <p className="text-xs text-red-600 dark:text-red-400">Bots Detected</p>
        </div>

        {/* Question Density */}
        <div className={cn(
          "p-4 rounded-lg",
          "bg-white dark:bg-zinc-900/70",
          "border border-zinc-100 dark:border-zinc-800",
          "shadow-sm backdrop-blur-xl"
        )}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">Question Density</p>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">12%</h3>
            </div>
            <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
              <HelpCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">of comments</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Pulse Chart */}
        <div className={cn(
          "p-6 rounded-lg",
          "bg-white dark:bg-zinc-900/70",
          "border border-zinc-100 dark:border-zinc-800",
          "shadow-sm backdrop-blur-xl"
        )}>
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Sentiment Pulse</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Positive vs. Negative sentiment over video duration</p>
          </div>
          <ChartContainer config={sentimentConfig} className="h-72 w-full">
            <LineChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
              <XAxis dataKey="time" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="var(--color-positive)" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="var(--color-negative)" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>

        {/* Emotion Radar Chart */}
        <div className={cn(
          "p-6 rounded-lg",
          "bg-white dark:bg-zinc-900/70",
          "border border-zinc-100 dark:border-zinc-800",
          "shadow-sm backdrop-blur-xl"
        )}>
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Emotion Radar</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Emotional attributes detected in comments</p>
          </div>
          <ChartContainer config={emotionConfig} className="h-72 w-full">
            <RadarChart data={emotionData}>
              <PolarGrid className="stroke-zinc-200 dark:stroke-zinc-800" />
              <PolarAngleAxis dataKey="subject" className="text-xs" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
              <Radar name="Sentiment" dataKey="A" stroke="var(--color-A)" fill="var(--color-A)" fillOpacity={0.6} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ChartContainer>
        </div>
      </div>

      {/* Engagement Breakdown */}
      <div className={cn(
        "p-6 rounded-lg",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "shadow-sm backdrop-blur-xl"
      )}>
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">Engagement Breakdown</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Last 7 days analysis</p>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors">
            View Report
          </button>
        </div>

        {/* Bubble Visualization */}
        <div className="flex items-center justify-center gap-12 mb-12 min-h-64">
          {/* Likes Bubble */}
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">48%</div>
                <div className="text-xs text-blue-100 mt-1">Likes</div>
              </div>
            </div>
          </div>

          {/* Comments Bubble */}
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-3 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">32%</div>
                <div className="text-xs text-emerald-100 mt-1">Comments</div>
              </div>
            </div>
          </div>

          {/* Shares Bubble */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-pink-300 to-pink-500 flex items-center justify-center mb-2 shadow-md">
              <div className="text-center">
                <div className="text-xl font-bold text-white">13%</div>
                <div className="text-xs text-pink-100">Shares</div>
              </div>
            </div>
          </div>

          {/* Views Bubble */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
              <div className="text-center">
                <div className="text-lg font-bold text-white">7%</div>
                <div className="text-xs text-amber-100 mt-0.5">Views</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">Likes</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">12,847 reactions</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">Comments</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">8,234 messages</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-pink-500 flex-shrink-0 mt-1.5" />
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">Shares</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">3,456 times</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">Views</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">1,789 incremental</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Comments */}
      <div className={cn(
        "p-6 rounded-lg",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "shadow-sm backdrop-blur-xl"
      )}>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Top Comments</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Most impactful comments from your audience</p>
        </div>
        <div className="space-y-3">
          {topComments.map((comment) => (
            <div
              key={comment.id}
              className={cn(
                "p-4 rounded-lg",
                "bg-zinc-50 dark:bg-zinc-800/50",
                "border border-zinc-100 dark:border-zinc-700",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors duration-200"
              )}
            >
              <div className="flex gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                  "bg-zinc-200 dark:bg-zinc-700 text-sm font-medium",
                  "text-zinc-900 dark:text-white"
                )}>
                  {comment.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-white">
                      {comment.author}
                    </h4>
                    <div className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      comment.intent === "positive" && "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
                      comment.intent === "criticism" && "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
                      comment.intent === "question" && "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    )}>
                      {comment.intent === "positive" && "Positive"}
                      {comment.intent === "criticism" && "Criticism"}
                      {comment.intent === "question" && "Question"}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2 line-clamp-2">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                    <button className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {comment.likes.toLocaleString()}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
