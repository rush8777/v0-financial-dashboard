"use client"

import React from "react"

import {
  BarChart2,
  Building2,
  Folder,
  Users2,
  Boxes,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
  ChevronDown,
} from "lucide-react"

import { Home } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { useSidebarContext } from "./layout"

// Recent chats data from library.tsx
const recentChats = [
  {
    id: "1",
    name: "Draft Q3 Social Media Calendar",
    platform: "Facebook",
    updatedAt: "20h ago",
  },
  {
    id: "2",
    name: "Research Competitor Onboarding Flows",
    platform: "Instagram",
    updatedAt: "5d ago",
  },
  {
    id: "3",
    name: 'Write Blog Post on "5 Productivity Tips"',
    platform: "Youtube",
    updatedAt: "29d ago",
  },
  {
    id: "4",
    name: "Set up new Staging Database",
    platform: "Instagram",
    updatedAt: "29d ago",
  },
  {
    id: "5",
    name: "Implement Login Page UI",
    platform: "Facebook",
    updatedAt: "29d ago",
  },
]

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRecentsOpen, setIsRecentsOpen] = useState(true)
  const { isSidebarExpanded, setIsSidebarExpanded } = useSidebarContext()

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={`flex items-center rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23] ${
          isSidebarExpanded ? "px-2 py-1 justify-start" : "px-2 py-1 justify-center"
        }`}
        title={isSidebarExpanded ? "" : children?.toString()}
      >
        <Icon className="h-3.5 w-3.5 flex-shrink-0" />
        {isSidebarExpanded && <span className="ml-2 text-xs">{children}</span>}
      </Link>
    )
  }

  function RecentChatItem({ chat }: { chat: typeof recentChats[0] }) {
    return (
      <Link
        href={`/chat/${chat.id}`}
        onClick={handleNavigation}
        className={`flex items-center gap-2 rounded-md transition-colors text-gray-400 dark:text-gray-400 hover:text-gray-100 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-[#1F1F23] ${
          isSidebarExpanded ? "px-2 py-1.5" : "px-2 py-1.5 justify-center"
        }`}
        title={chat.name}
      >
        {/* Dashed Circle Icon */}
        <div className="w-4 h-4 rounded-full border border-dashed border-gray-500 dark:border-gray-500 flex-shrink-0"></div>
        {isSidebarExpanded && (
          <span className="text-xs truncate flex-1">{chat.name}</span>
        )}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] bg-white dark:bg-[#0F0F12] transform transition-all duration-200 ease-in-out
                lg:translate-x-0 lg:static border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0 w-56" : "-translate-x-full w-56"}
                ${isSidebarExpanded ? "lg:w-56" : "lg:w-16"}
            `}
      >
        <div className="h-full flex flex-col">
          <div className={`flex items-center justify-between border-b border-gray-200 dark:border-[#1F1F23] ${isSidebarExpanded ? "h-12 px-4" : "h-12 px-2"}`}>
            {isSidebarExpanded && (
              <Link
                href="https://kokonutui.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 flex-1"
              >
                <Image
                  src="https://kokonutui.com/logo.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="flex-shrink-0 hidden dark:block"
                />
                <Image
                  src="https://kokonutui.com/logo-black.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="flex-shrink-0 block dark:hidden"
                />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  KokonutUI
                </span>
              </Link>
            )}
            {!isSidebarExpanded && (
              <Image
                src="https://kokonutui.com/logo.svg"
                alt="Logo"
                width={20}
                height={20}
                className="flex-shrink-0 hidden dark:block mx-auto"
              />
            )}
            <button
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-md transition-colors text-gray-600 dark:text-gray-400 hidden lg:flex flex-shrink-0"
            >
              <ChevronLeft className={`h-3.5 w-3.5 transition-transform ${!isSidebarExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3">
            <div className={`space-y-4 ${isSidebarExpanded ? "px-3" : "px-2"}`}>
              <div>
                {isSidebarExpanded && (
                  <div className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Overview
                  </div>
                )}
                <div className="space-y-0.5">
                  <NavItem href="#" icon={Home}>
                    Home
                  </NavItem>
                  <NavItem href="#" icon={BarChart2}>
                    Analytics
                  </NavItem>
                  <NavItem href="/library" icon={Building2}>
                    Library
                  </NavItem>
                  <NavItem href="/project" icon={Folder}>
                    Projects
                  </NavItem>
                </div>
              </div>

              {/* Recents Section */}
              <div>
                {isSidebarExpanded ? (
                  <button
                    onClick={() => setIsRecentsOpen(!isRecentsOpen)}
                    className="w-full flex items-center justify-between px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <span>Recents</span>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${
                        !isRecentsOpen ? "-rotate-90" : ""
                      }`}
                    />
                  </button>
                ) : null}
                {isRecentsOpen && (
                  <div className="space-y-0.5">
                    {recentChats.map((chat) => (
                      <RecentChatItem key={chat.id} chat={chat} />
                    ))}
                  </div>
                )}
              </div>

              <div>
                {isSidebarExpanded && (
                  <div className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Team
                  </div>
                )}
                <div className="space-y-0.5">
                    
                  <NavItem href="/connections" icon={Boxes}>
                    Connections
                  </NavItem>
                  <NavItem href="#" icon={MessagesSquare}>
                    Chat
                  </NavItem>
                  
                </div>
              </div>
            </div>
          </div>

          <div className={`border-t border-gray-200 dark:border-[#1F1F23] ${isSidebarExpanded ? "px-3 py-3" : "px-2 py-3"}`}>
            <div className="space-y-0.5">
              <NavItem href="#" icon={Settings}>
                Settings
              </NavItem>
              <NavItem href="#" icon={HelpCircle}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
