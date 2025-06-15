"use client"

import { useState } from "react"
import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { SortableTable, type TableColumn } from "@/components/sortable-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { UserCog, Search, Filter, Plus, Shield, Mail, Phone, Users, UserPlus } from "lucide-react"
import { FilterButton } from "@/components/filter-button"

const adminData = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    role: "Главный администратор",
    status: "Активен",
    lastLogin: "2024-03-15 14:30",
    phone: "+7 (999) 123-45-67",
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "maria@example.com",
    role: "Администратор",
    status: "Активен",
    lastLogin: "2024-03-15 13:45",
    phone: "+7 (999) 234-56-78",
  },
  {
    id: 3,
    name: "Алексей Иванов",
    email: "alexey@example.com",
    role: "Модератор",
    status: "Неактивен",
    lastLogin: "2024-03-14 18:20",
    phone: "+7 (999) 345-67-89",
  },
  {
    id: 4,
    name: "Елена Смирнова",
    email: "elena@example.com",
    role: "Администратор",
    status: "Активен",
    lastLogin: "2024-03-15 10:15",
    phone: "+7 (999) 456-78-90",
  },
]

export default function AdminManagementPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleAdd = () => {
    toast({
      title: "Добавление администратора",
      description: "Открытие формы добавления нового администратора",
    })
  }

  const handleEdit = (row: any) => {
    toast({
      title: "Редактирование администратора",
      description: `Редактирование администратора: ${row.name}`,
    })
  }

  const handleDelete = (row: any) => {
    toast({
      title: "Удаление администратора",
      description: `Администратор "${row.name}" удален`,
      variant: "destructive",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Активен":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Активен</Badge>
      case "Неактивен":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Неактивен</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const columns: TableColumn[] = [
    {
      key: "name",
      label: "Имя",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "role",
      label: "Роль",
      sortable: true,
    },
    {
      key: "status",
      label: "Статус",
      sortable: true,
      render: (value) => getStatusBadge(value),
    },
    {
      key: "lastLogin",
      label: "Последний вход",
      sortable: true,
    },
    {
      key: "phone",
      label: "Телефон",
      sortable: true,
    },
  ]

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Управление админами</h1>
              <p className="text-muted-foreground">Управляйте администраторами и их правами</p>
            </div>
            <Button onClick={handleAdd} className="gradient-bg hover:opacity-90">
              <UserPlus/>
              Добавить администратора
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список администраторов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Поиск администраторов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <FilterButton />
                </div>
              </div>

              <SortableTable
                data={adminData}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
