"use client"

import { useState } from "react"
import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { StatsCards } from "@/components/stats-cards"
import { UsersTable } from "@/components/users-table"
import { AnalyticsChart } from "@/components/analytics-chart"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { Users, Search, Filter, Plus, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const { toast } = useToast()

  const handleAdd = () => {
    toast({
      title: "Добавление пользователя",
      description: "Открытие формы добавления нового пользователя",
    })
  }

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Панель управления
              </h1>
              <p className="text-muted-foreground mt-2">
                Добро пожаловать! Вот что происходит с вашим бизнесом сегодня.
              </p>
            </div>
          </div>

          <StatsCards />

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AnalyticsChart />
            </div>
            <QuickActions />
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <RecentActivity />
            <UsersTable />
          </div>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
