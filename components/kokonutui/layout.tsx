"use client"

import type { ReactNode } from "react"
import Sidebar from "./sidebar"
import TopNav from "./top-nav"
import { useTheme } from "next-themes"
import { useEffect, useState, createContext, useContext } from "react"

interface LayoutProps {
  children: ReactNode
}

interface SidebarContextType {
  isSidebarExpanded: boolean
  setIsSidebarExpanded: (expanded: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebarContext must be used within Layout")
  }
  return context
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SidebarContext.Provider value={{ isSidebarExpanded, setIsSidebarExpanded }}>
      <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
        <Sidebar />
        <div className="w-full flex flex-1 flex-col">
          <header className="h-12 border-b border-gray-200 dark:border-[#1F1F23]">
            <TopNav />
          </header>
          <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">{children}</main>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}
