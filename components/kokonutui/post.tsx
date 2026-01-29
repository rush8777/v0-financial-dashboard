'use client'

import { useState } from 'react'
import { 
  Send, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Bookmark,
  Calendar,
  Users,
  FileText,
  Edit2,
  Megaphone,
  Clock,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const toptabs = [
  { id: "post-chat", label: "Post Chat", icon: MessageCircle, isActive: true },
  { id: "statistics", label: "Statistics", icon: BarChart3, isActive: false },
  { id: "content-analysis", label: "Content Analysis", icon: FileText, isActive: false },
  { id: "editor", label: "Post Editor", icon: Edit2, isActive: false },
  { id: "marketer", label: "Social Marketer", icon: Megaphone, isActive: false, badge: "Agent" },
  { id: "scheduler", label: "Post Scheduler", icon: Clock, isActive: false, badge: "Agent" },
]

export default function Post() {
  const [isLiked, setIsLiked] = useState(false)
  const [activeTopTab, setActiveTopTab] = useState("post-chat")

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Design System Campaign</h1>
            <span className="px-2 py-1 text-xs font-medium bg-zinc-800 text-zinc-400 rounded">
              ★
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Jan 15</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>2.4K engagements</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-1.5 p-1 rounded-lg">
            {toptabs.map((toptab) => {
              const Icon = toptab.icon
              return (
                <button
                  key={toptab.id}
                  onClick={() => setActiveTopTab(toptab.id)}
                  className={cn(
                    "px-3 py-2 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap",
                    activeTopTab === toptab.id
                      ? "bg-zinc-800 text-white shadow-lg"
                      : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {toptab.label}
                  {toptab.badge && (
                    <span className="ml-0.5 px-1.5 py-0.5 text-[10px] rounded-md bg-purple-500/30 text-purple-300 font-semibold">
                      {toptab.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Instagram-Style Card - Left Side */}
          <div className="lg:col-span-2">
            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
              {/* Instagram Header */}
              <div className="bg-zinc-900/50 px-4 py-3 flex items-center justify-between border-b border-zinc-800/50">
                <div className="flex items-center gap-3">
                  {/* Brand Icon */}
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">D</span>
                  </div>
                  {/* Brand Info */}
                  <div>
                    <div className="text-sm font-semibold text-white">Design System</div>
                    <div className="text-xs text-zinc-400">Promoted by sponsor</div>
                  </div>
                </div>
                {/* Menu Dots */}
                <div className="text-white">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <circle cx="10" cy="4" r="1.5" />
                    <circle cx="10" cy="10" r="1.5" />
                    <circle cx="10" cy="16" r="1.5" />
                  </svg>
                </div>
              </div>

              {/* Post Content - Main Image Area */}
              <div className="relative bg-gradient-to-br from-purple-600 via-purple-600 to-purple-600 h-[400px] flex flex-col items-center justify-center p-8">
                {/* Geometric Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute border-white/20"
                        style={{
                          width: '200%',
                          height: '200%',
                          border: '1px solid',
                          transform: `rotate(${i * 30}deg)`,
                          left: '-50%',
                          top: '-50%'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Headline Text */}
                <div className="relative z-10 text-center mb-8">
                  <h3 className="text-5xl sm:text-6xl font-black text-white leading-tight whitespace-pre-line">
                    {'HELLO\nCREATORS,\nGOODBYE\nCHAOS!'}
                  </h3>
                </div>

                {/* Subtext */}
                <div className="relative z-10 text-center">
                  <p className="text-base sm:text-lg font-medium text-white/90 whitespace-pre-line">
                    {'The best analytics\nplatform for content'}
                  </p>
                </div>
              </div>

              {/* Instagram Footer - Action Buttons */}
              <div className="bg-zinc-900/50 px-4 py-3 flex items-center justify-between border-t border-zinc-800/50">
                <div className="flex items-center gap-4">
                  {/* Heart */}
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="text-white hover:text-zinc-300 transition-colors"
                  >
                    <Heart className={cn("h-6 w-6", isLiked && "fill-red-500 text-red-500")} />
                  </button>
                  {/* Comment */}
                  <button className="text-white hover:text-zinc-300 transition-colors">
                    <MessageCircle className="h-6 w-6" />
                  </button>
                  {/* Share */}
                  <button className="text-white hover:text-zinc-300 transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
                {/* Bookmark */}
                <button className="text-white hover:text-zinc-300 transition-colors">
                  <Bookmark className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Insights Accordion - Right Side */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white">Post Insights</h3>
                <p className="text-xs text-zinc-400 mt-1">AI-generated analysis of post performance</p>
              </div>
              
              <Accordion
                type="single"
                collapsible
                defaultValue="summary"
                className="w-full"
              >
                <AccordionItem value="summary" className="border-zinc-800">
                  <AccordionTrigger className="text-sm font-medium text-white hover:text-purple-400 py-3">
                    Summary
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-zinc-300 leading-relaxed pb-4">
                    This promotional post for a design system received strong engagement with 2.4K interactions. 
                    The bold typography and clean messaging resonated well with the creative community, driving 
                    significant comment activity and shares.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="audience" className="border-zinc-800">
                  <AccordionTrigger className="text-sm font-medium text-white hover:text-purple-400 py-3">
                    Audience Insights
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-zinc-300 leading-relaxed pb-4">
                    Primary engagement from designers and creative professionals aged 25-40. High save rate 
                    indicates strong intent to reference later. Geographic concentration in US (45%), EU (30%), 
                    and Asia (25%).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="performance" className="border-zinc-800">
                  <AccordionTrigger className="text-sm font-medium text-white hover:text-purple-400 py-3">
                    Content Performance
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-zinc-300 pb-4">
                    <ul className="space-y-2">
                      <li className="flex gap-2">
                        <span className="text-purple-400">•</span>
                        <span>Strong visual hierarchy with bold typography drove 40% higher engagement than average</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-400">•</span>
                        <span>Purple gradient background aligned with brand recognition, increasing shares by 25%</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-400">•</span>
                        <span>Call-to-action clarity resulted in 18% higher click-through rate</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="engagement" className="border-zinc-800">
                  <AccordionTrigger className="text-sm font-medium text-white hover:text-purple-400 py-3">
                    Engagement Metrics
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-zinc-300 pb-4">
                    <ul className="space-y-2">
                      <li className="flex gap-2">
                        <span className="text-purple-400">•</span>
                        <span>Comments focused on design quality and component requests (78% positive)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-400">•</span>
                        <span>High bookmark rate (18%) suggests professional use case</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-400">•</span>
                        <span>Peak engagement in first 2 hours, indicating strong follower base</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sentiment" className="border-zinc-800">
                  <AccordionTrigger className="text-sm font-medium text-white hover:text-purple-400 py-3">
                    Sentiment Analysis
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-zinc-300 leading-relaxed pb-4">
                    92% positive sentiment in comments. Main themes: appreciation for design quality, requests 
                    for more information, interest in collaboration. Minimal negative feedback focused on pricing 
                    inquiries rather than product criticism.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recommendations" className="border-zinc-800">
                  <AccordionTrigger className="text-sm font-medium text-white hover:text-purple-400 py-3">
                    Recommendations
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-zinc-300 leading-relaxed pb-4">
                    The bold headline format and clean aesthetic performed exceptionally well. Consider A/B testing 
                    similar layouts with different color schemes. The 'sponsored' tag didn't negatively impact 
                    engagement - maintain transparency in future campaigns. Optimal posting time appears to be 
                    10-11 AM EST for maximum reach.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
