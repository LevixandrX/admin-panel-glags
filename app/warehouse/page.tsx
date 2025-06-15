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
import { Package, Search, Filter, Plus, AlertTriangle } from "lucide-react"
import { FilterButton } from "@/components/filter-button"

const warehouseData = [
  {
    id: 1,
    name: "Беспроводные наушники",
    category: "Электроника",
    quantity: 150,
    location: "A-12",
    status: "В наличии",
    lastUpdated: "2024-03-15",
  },
  {
    id: 2,
    name: "Игровая мышь",
    category: "Электроника",
    quantity: 5,
    location: "B-03",
    status: "Мало на складе",
    lastUpdated: "2024-03-14",
  },
  {
    id: 3,
    name: "Офисное кресло",
    category: "Мебель",
    quantity: 0,
    location: "C-45",
    status: "Нет в наличии",
    lastUpdated: "2024-03-13",
  },
  {
    id: 4,
    name: "Подставка для ноутбука",
    category: "Аксессуары",
    quantity: 75,
    location: "D-22",
    status: "В наличии",
    lastUpdated: "2024-03-12",
  },
]

export default function WarehousePage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleAdd = () => {
    toast({
      title: "Добавление товара",
      description: "Открытие формы добавления нового товара на склад",
    })
  }

  const handleEdit = (row: any) => {
    toast({
      title: "Редактирование товара",
      description: `Редактирование товара: ${row.name}`,
    })
  }

  const handleDelete = (row: any) => {
    toast({
      title: "Удаление товара",
      description: `Товар "${row.name}" удален со склада`,
      variant: "destructive",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "В наличии":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">В наличии</Badge>
      case "Мало на складе":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Мало на складе
          </Badge>
        )
      case "Нет в наличии":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Нет в наличии</Badge>
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
      key: "category",
      label: "Категория",
      sortable: true,
    },
    {
      key: "quantity",
      label: "Количество",
      sortable: true,
    },
    {
      key: "location",
      label: "Местоположение",
      sortable: true,
    },
    {
      key: "status",
      label: "Статус",
      sortable: true,
      render: (value) => getStatusBadge(value),
    },
    {
      key: "lastUpdated",
      label: "Последнее обновление",
      sortable: true,
    },
  ]

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Склад</h1>
              <p className="text-muted-foreground">Управляйте товарами, их количеством и местоположением</p>
            </div>
            <Button onClick={handleAdd} className="gradient-bg hover:opacity-90">
              <Plus />
              Добавить товар
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список товаров на складе</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <FilterButton />
                </div>
              </div>

              <SortableTable
                data={warehouseData}
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
