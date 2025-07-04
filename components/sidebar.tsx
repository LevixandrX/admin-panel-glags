"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "@/components/sidebar-provider"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart3,
  Shield,
  Package,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Calendar,
  Warehouse,
  UserCog,
  Puzzle,
  FileIcon as FileTemplate,
} from "lucide-react"

const navigationItems = [
  { key: "dashboard", href: "/", icon: LayoutDashboard, badge: null, label: "Панель управления" },
  { key: "users", href: "/users", icon: Users, badge: "12", label: "Пользователи" },
  { key: "warehouse", href: "/warehouse", icon: Warehouse, badge: "156", label: "Склад" },
  { key: "adminManagement", href: "/admin-management", icon: UserCog, badge: "8", label: "Админы" },
  { key: "modules", href: "/modules", icon: Puzzle, badge: null, label: "Модули" },
  { key: "templates", href: "/templates", icon: FileTemplate, badge: "24", label: "Шаблоны" },
  { key: "products", href: "/products", icon: Package, badge: null, label: "Товары" },
  { key: "orders", href: "/orders", icon: CreditCard, badge: "3", label: "Заказы" },
  { key: "analytics", href: "/analytics", icon: BarChart3, badge: null, label: "Аналитика" },
  { key: "messages", href: "/messages", icon: MessageSquare, badge: "5", label: "Сообщения" },
  { key: "calendar", href: "/calendar", icon: Calendar, badge: null, label: "Календарь" },
  { key: "reports", href: "/reports", icon: FileText, badge: null, label: "Отчеты" },
  { key: "security", href: "/security", icon: Shield, badge: null, label: "Безопасность" },
  { key: "settings", href: "/settings", icon: Settings, badge: null, label: "Настройки" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { collapsed, toggleCollapsed } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-card/50 backdrop-blur-sm border-r overflow-x-hidden",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between px-4 py-5 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Glags Admin
            </h1>
          </div>
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="h-8 w-8 hover:bg-primary/10 transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <nav className="flex-1 px-2 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.key} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full relative group",
                  collapsed ? "h-12 w-12 p-0 mx-auto flex items-center justify-center" : "justify-start gap-3 px-3",
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "hover:bg-primary/10",
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed ? "mx-auto" : "")} />
                {!collapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border shadow-lg">
                    <div className="flex items-center gap-2">
                      {item.label}
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User section at bottom */}
      <div className="p-4 border-t">
        {!collapsed ? (
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              А
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Администратор</p>
              <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto">
            А
          </div>
        )}
      </div>
    </div>
  )
}
