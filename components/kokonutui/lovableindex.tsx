"use client"

import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/kokonutui/lovablechat";
import ChatInput from "@/components/kokonutui/lovablechatinput";


interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Yes, and it's growing fast. AI is now being used in IT service desks to resolve common issues like password resets, software installs, or even basic network troubleshooting — all without needing a human agent.",
    isUser: false,
  },
  {
    id: 2,
    content: "So it's like a chatbot?",
    isUser: true,
  },
  {
    id: 3,
    content: "Exactly — but smarter than the old-school kind. It connects with internal systems, understands natural language better, and can even take real actions. For example, if someone says \"My VPN won't connect,\" the AI can check their user permissions, test the network status, and either fix the issue or escalate it.",
    isUser: false,
  },
  {
    id: 4,
    content: "What about more complex stuff? Like debugging custom software issues?",
    isUser: true,
  },
  {
    id: 5,
    content: "That's where things get trickier. AI can assist by analyzing logs, suggesting possible root causes based on past incidents, and even matching bugs to known solutions in documentation. But for now, human engineers still handle most of the deeper investigations.",
    isUser: false,
  },
  {
    id: 6,
    content: "Makes sense. So how do companies train these systems?",
    isUser: true,
  },
  {
    id: 7,
    content: "They usually start with historical support tickets, internal documentation, and system logs. The more structured and clean the data is, the better. Some companies also train models on specific terminology or workflows unique to their setup.",
    isUser: false,
  },
  {
    id: 8,
    content: "Can AI also help prevent tickets in the first place?",
    isUser: true,
  },
  {
    id: 9,
    content: "Absolutely. Predictive analytics is a big part of this. AI can detect early warning signs — like system slowness, disk space getting low, or repetitive failures — and alert IT teams before users even notice a problem. In some cases, it can automatically trigger a fix.",
    isUser: false,
  },
  {
    id: 10,
    content: "That sounds great, but I imagine there are challenges too?",
    isUser: true,
  },
  {
    id: 11,
    content: "For sure. AI models can be biased if the training data is incomplete. There's also the risk of over-automation — for example, an automated system rebooting servers unnecessarily. And sometimes, users just want to talk to a real person, not a bot.",
    isUser: false,
  },
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (content: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      content,
      isUser: true,
    };
    setMessages([...messages, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: "Thank you for your message. I'm here to help with any questions you might have about AI and technology.",
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        <div className="max-w-2xl mx-auto">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              showActions={!message.isUser && index === messages.length - 1}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="sticky bottom-0 bg-black pb-3 pt-2 px-3 border-t border-zinc-800/50">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Index;
