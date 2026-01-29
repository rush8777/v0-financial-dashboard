'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Send, Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: string
}

export default function Post() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'This design system is amazing! Love the components.',
      isUser: false,
      timestamp: '10:32 AM',
    },
    {
      id: 2,
      text: 'Thank you! We put a lot of effort into making it intuitive.',
      isUser: true,
      timestamp: '10:35 AM',
    },
    {
      id: 3,
      text: 'Can you share more about the color tokens?',
      isUser: false,
      timestamp: '10:38 AM',
    },
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: inputValue,
          isUser: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
      setInputValue('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Image Card - Left Side */}
          <div className="lg:col-span-2">
            <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden h-full flex flex-col">
              <div className="relative overflow-hidden bg-gradient-to-br from-purple-400 to-blue-500 aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                  alt="Design System"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-colors">
                  <Heart className="h-5 w-5 text-white fill-white" />
                </button>
              </div>
              <CardContent className="flex-1 flex flex-col p-4">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Design System Components</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-1 mb-4">
                  Comprehensive collection of reusable components and design tokens for building consistent, modern interfaces across your projects.
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                    <Heart className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">247</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                    <MessageCircle className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">89</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                    <Share2 className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">34</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface - Right Side */}
          <div className="lg:col-span-3">
            <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden h-full flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Comments</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{messages.length} messages</p>
                </div>
                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                  <MoreHorizontal className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn('flex', message.isUser ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={cn(
                        'max-w-xs lg:max-w-sm px-4 py-2.5 rounded-lg',
                        message.isUser
                          ? 'bg-purple-600 text-white rounded-br-none'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-bl-none'
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className={cn(
                        'text-xs mt-1 block',
                        message.isUser ? 'text-purple-200' : 'text-zinc-500 dark:text-zinc-400'
                      )}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend()
                    }}
                    placeholder="Add a comment..."
                    className="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    className="p-2.5 bg-purple-600 hover:bg-purple-700 dark:hover:bg-purple-500 text-white rounded-lg transition-colors flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Press Enter to send</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
