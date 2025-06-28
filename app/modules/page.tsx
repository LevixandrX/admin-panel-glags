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
import { Puzzle, Search, Filter, Plus, CheckCircle, XCircle } from "lucide-react"
import { FilterButton } from "@/components/filter-button"
import { ModuleCreateDialog } from "@/components/users-table"

const modulesData = [
  {
    id: 1,
    name: "Аналитика",
    description: "Модуль для анализа данных и создания отчетов",
    version: "1.2.0",
    status: "Активен",
    lastUpdate: "2024-03-15",
    author: "Glags Team",
  },
  {
    id: 2,
    name: "Управление пользователями",
    description: "Модуль для управления пользователями и правами",
    version: "2.0.1",
    status: "Активен",
    lastUpdate: "2024-03-14",
    author: "Glags Team",
  },
  {
    id: 3,
    name: "Интеграция с CRM",
    description: "Модуль для интеграции с CRM-системами",
    version: "1.0.0",
    status: "Неактивен",
    lastUpdate: "2024-03-10",
    author: "Glags Team",
  },
  {
    id: 4,
    name: "Маркетинг",
    description: "Модуль для управления маркетинговыми кампаниями",
    version: "1.5.2",
    status: "Активен",
    lastUpdate: "2024-03-12",
    author: "Glags Team",
  },
]

export default function ModulesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleAdd = () => {
    toast({
      title: "Добавление модуля",
      description: "Открытие формы добавления нового модуля",
    })
  }

  const handleEdit = (row: any) => {
    toast({
      title: "Редактирование модуля",
      description: `Редактирование модуля: ${row.name}`,
    })
  }

  const handleDelete = (row: any) => {
    toast({
      title: "Удаление модуля",
      description: `Модуль "${row.name}" удален`,
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
      label: "Название",
      sortable: true,
    },
    {
      key: "description",
      label: "Описание",
      sortable: true,
    },
    {
      key: "version",
      label: "Версия",
      sortable: true,
    },
    {
      key: "status",
      label: "Статус",
      sortable: true,
      render: (value) => getStatusBadge(value),
    },
    {
      key: "lastUpdate",
      label: "Последнее обновление",
      sortable: true,
    },
    {
      key: "author",
      label: "Автор",
      sortable: true,
    },
  ]

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Модули</h1>
              <p className="text-muted-foreground">Управляйте модулями и их настройками</p>
            </div>
            <div className="w-full flex justify-end sm:w-auto">
              <ModuleCreateDialog />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список модулей</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Поиск модулей..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <FilterButton />
                </div>
              </div>

              <SortableTable
                data={modulesData}
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
