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
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            className="w-full bg-transparent text-white placeholder:text-zinc-500 resize-none outline-none text-sm px-3 py-2 min-h-[24px] max-h-32"
            rows={1}
          />
          <div className="flex items-center justify-between mt-2 px-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2.5 rounded-xl hover:bg-zinc-800/50 transition-colors"
              >
                <Paperclip className="w-5 h-5 text-zinc-400" />
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <Globe className="w-4 h-4 text-zinc-400" />
                <span className="text-sm text-zinc-400">Deep Search</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <Lightbulb className="w-4 h-4 text-zinc-400" />
                <span className="text-sm text-zinc-400">Reason</span>
              </button>
              <button
                type="button"
                className="p-2.5 rounded-xl hover:bg-zinc-800/50 transition-colors"
              >
                <MoreHorizontal className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-purple-600"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </form>
      <p className="text-center text-xs text-zinc-500 mt-3">
        AI can make mistakes. Please double-check responses.
      </p>
    </div>
  );
};

export default ChatInput;
