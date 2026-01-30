"use client"

import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Share2 } from "lucide-react";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  showActions?: boolean;
}

const ChatMessage = ({ content, isUser, showActions = false }: ChatMessageProps) => {
  if (isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div className="bg-zinc-800 text-white px-5 py-3 rounded-3xl max-w-md text-sm leading-relaxed">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="text-zinc-300 text-sm leading-[1.75] max-w-2xl">
        {content}
      </div>
      {showActions && (
        <div className="flex items-center gap-1 mt-3">
          <button className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
            <Copy className="w-4 h-4 text-zinc-400" />
          </button>
          <button className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
            <ThumbsUp className="w-4 h-4 text-zinc-400" />
          </button>
          <button className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
            <ThumbsDown className="w-4 h-4 text-zinc-400" />
          </button>
          <button className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
            <RotateCcw className="w-4 h-4 text-zinc-400" />
          </button>
          <button className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
            <Share2 className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
