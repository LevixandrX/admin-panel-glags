"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved !== null) {
      setCollapsed(JSON.parse(saved))
    }
  }, [])

  // Save state to localStorage
  const handleSetCollapsed = (newCollapsed: boolean) => {
    setCollapsed(newCollapsed)
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newCollapsed))
  }

  const toggleCollapsed = () => {
    handleSetCollapsed(!collapsed)
  }

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed: handleSetCollapsed, toggleCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
