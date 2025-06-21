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
import { Package, Search, Filter, Plus, Star, Eye, ShoppingCart } from "lucide-react"
import { FilterButton } from "@/components/filter-button"

const productsData = [
  {
    id: 1,
    name: "Беспроводные наушники",
    category: "Электроника",
    price: 8999,
    stock: 150,
    status: "В наличии",
    rating: 4.5,
    views: 1250,
    sales: 89,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Игровая мышь",
    category: "Электроника",
    price: 4550,
    stock: 5,
    status: "Мало на складе",
    rating: 4.8,
    views: 890,
    sales: 156,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Офисное кресло",
    category: "Мебель",
    price: 29999,
    stock: 0,
    status: "Нет в наличии",
    rating: 4.2,
    views: 456,
    sales: 23,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Подставка для ноутбука",
    category: "Аксессуары",
    price: 3500,
    stock: 75,
    status: "В наличии",
    rating: 4.0,
    views: 234,
    sales: 67,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function ProductsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleAdd = () => {
    toast({
      title: "Добавление товара",
      description: "Открытие формы добавления нового товара",
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
      description: `Товар "${row.name}" удален`,
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
      key: "price",
      label: "Цена",
      sortable: true,
      render: (value) => `${value.toLocaleString()} ₽`,
    },
    {
      key: "stock",
      label: "На складе",
      sortable: true,
    },
    {
      key: "status",
      label: "Статус",
      sortable: true,
      render: (value) => getStatusBadge(value),
    },
    {
      key: "rating",
      label: "Рейтинг",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
          {value}
        </div>
      ),
    },
    {
      key: "views",
      label: "Просмотры",
      sortable: true,
    },
    {
      key: "sales",
      label: "Продажи",
      sortable: true,
    },
  ]

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Товары</h1>
              <p className="text-muted-foreground">Управляйте товарами, их ценами и наличием</p>
            </div>
            <div className="w-full flex justify-end sm:w-auto">
              <Button onClick={handleAdd} className="gradient-bg hover:opacity-90">
                <Plus />
                Добавить товар
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список товаров</CardTitle>
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
                data={productsData}
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
