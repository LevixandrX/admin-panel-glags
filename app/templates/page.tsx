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
import { FileText, Search, Filter, Plus } from "lucide-react"
import { FilterButton } from "@/components/filter-button"

const templatesData = [
  {
    id: 1,
    name: "Стандартный шаблон",
    description: "Базовый шаблон для всех страниц",
    type: "Страница",
    status: "Активен",
    lastUpdate: "2024-03-15",
    author: "Glags Team",
  },
  {
    id: 2,
    name: "Шаблон блога",
    description: "Шаблон для страниц блога",
    type: "Блог",
    status: "Активен",
    lastUpdate: "2024-03-14",
    author: "Glags Team",
  },
  {
    id: 3,
    name: "Шаблон магазина",
    description: "Шаблон для страниц магазина",
    type: "Магазин",
    status: "Неактивен",
    lastUpdate: "2024-03-10",
    author: "Glags Team",
  },
  {
    id: 4,
    name: "Шаблон портфолио",
    description: "Шаблон для страниц портфолио",
    type: "Портфолио",
    status: "Активен",
    lastUpdate: "2024-03-12",
    author: "Glags Team",
  },
]

export default function TemplatesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleAdd = () => {
    toast({
      title: "Добавление шаблона",
      description: "Открытие формы добавления нового шаблона",
    })
  }

  const handleEdit = (row: any) => {
    toast({
      title: "Редактирование шаблона",
      description: `Редактирование шаблона: ${row.name}`,
    })
  }

  const handleDelete = (row: any) => {
    toast({
      title: "Удаление шаблона",
      description: `Шаблон "${row.name}" удален`,
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
      key: "type",
      label: "Тип",
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Шаблоны</h1>
              <p className="text-muted-foreground">Управляйте шаблонами сайта</p>
            </div>
            <Button onClick={handleAdd} className="gradient-bg hover:opacity-90">
              <Plus />
              Добавить шаблон
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список шаблонов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Поиск шаблонов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <FilterButton />
                </div>
              </div>

              <SortableTable
                data={templatesData}
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
