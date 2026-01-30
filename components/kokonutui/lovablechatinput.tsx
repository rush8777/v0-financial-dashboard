"use client"

import { useState } from "react";
import { Paperclip, Globe, Lightbulb, MoreHorizontal, ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            className="w-full bg-transparent text-white placeholder:text-zinc-500 resize-none outline-none text-xs px-2 py-1.5 min-h-[20px] max-h-24"
            rows={1}
          />
          <div className="flex items-center justify-between mt-1.5 px-0.5">
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className="p-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <Paperclip className="w-4 h-4 text-zinc-400" />
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-xs text-zinc-400">Deep Search</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-xs text-zinc-400">Reason</span>
              </button>
              <button
                type="button"
                className="p-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-purple-600"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </form>
      <p className="text-center text-[10px] text-zinc-500 mt-2">
        AI can make mistakes. Please double-check responses.
      </p>
    </div>
  );
};

export default ChatInput;
