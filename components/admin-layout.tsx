"use client"

import type React from "react"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { SidebarProvider, useSidebar } from "./sidebar-provider"
import { PageTransition } from "./page-transition"
import { cn } from "@/lib/utils"
import { DialogTitle } from "@/components/ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"

interface AdminLayoutProps {
  children: React.ReactNode
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { collapsed } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <div className="flex h-screen overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div 
        className="hidden md:block relative"
        style={{ 
          width: collapsed ? '64px' : '256px',
          transition: 'width 0.3s ease-in-out'
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-64"
          hideCloseButton={isMobile}
          mobileCloseButton={isMobile ? (
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="absolute right-4 top-4 z-50 flex items-center justify-center rounded-md bg-background p-2 shadow-md md:hidden"
            >
              <Menu className="h-7 w-7" />
              <span className="sr-only">Закрыть меню</span>
            </button>
          ) : null}
        >
          <SheetTitle className="sr-only">Навигация</SheetTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <PageTransition>{children}</PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  )
}
