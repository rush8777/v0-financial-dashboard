"use client"

import { useState } from "react"
import {
  MessageCircle,
  ArrowUp,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: number
  text: string
  isUser: boolean
}

interface FloatingVideoChatProps {
  initialMessages?: Message[]
}

export default function FloatingVideoChat({
  initialMessages = [],
}: FloatingVideoChatProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalInput, setModalInput] = useState("")
  const [modalMessages, setModalMessages] = useState<Message[]>(initialMessages)

  const handleSendModalMessage = () => {
    if (!modalInput.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: modalInput,
      isUser: true,
    }

    setModalMessages((prev) => [...prev, userMessage])
    setModalInput("")

    // Simulated AI response
    setTimeout(() => {
      setModalMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "I'm analyzing the video content to answer your question...",
          isUser: false,
        },
      ])
    }, 1000)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="relative">
          {/* Expanded Modal */}
          {isModalOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-3 animate-in slide-in-from-bottom-2 duration-200">
              <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Video Assistant
                      </h3>
                      <p className="text-xs text-zinc-400">Active now</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-zinc-800 rounded-lg"
                  >
                    <X className="h-4 w-4 text-zinc-400" />
                  </button>
                </div>

                {/* Messages */}
                <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                  {modalMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-3",
                        msg.isUser ? "justify-end" : "justify-start"
                      )}
                    >
                      {!msg.isUser && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-white" />
                        </div>
                      )}

                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                          msg.isUser
                            ? "bg-purple-600 text-white rounded-br-sm"
                            : "bg-zinc-800 text-zinc-100 rounded-bl-sm"
                        )}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chatbar */}
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-lg">
            {!isModalOpen ? (
              <>
                <MessageCircle className="h-5 w-5 text-zinc-400" />
                <input
                  readOnly
                  placeholder="Ask a question..."
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-sm cursor-pointer"
                />
                <ArrowUp className="h-4 w-4 text-zinc-400" />
              </>
            ) : (
              <>
                <input
                  value={modalInput}
                  onChange={(e) => setModalInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendModalMessage()}
                  placeholder="Type something..."
                  className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-sm"
                  autoFocus
                />
                <button
                  onClick={handleSendModalMessage}
                  disabled={!modalInput.trim()}
                  className={cn(
                    modalInput.trim()
                      ? "text-purple-600"
                      : "opacity-50 cursor-not-allowed"
                  )}
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
