"use client"

import { useState } from "react"
import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { SortableTable, type TableColumn } from "@/components/sortable-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import { Package, Search, Filter, Plus, Star, Eye, ShoppingCart } from "lucide-react"

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
  const { t } = useLanguage()
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
      label: "Товар",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <img src={row.image || "/placeholder.svg"} alt={value} className="w-10 h-10 rounded-lg object-cover" />
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{row.category}</div>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      label: "Цена",
      sortable: true,
      render: (value) => <span className="font-mono">{value.toLocaleString()} ₽</span>,
    },
    {
      key: "stock",
      label: "Остаток",
      sortable: true,
      render: (value) => <span className="font-mono">{value}</span>,
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
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "sales",
      label: "Продажи",
      sortable: true,
      render: (value) => <span className="font-mono">{value}</span>,
    },
  ]

  const filteredData = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Товары</h1>
              <p className="text-muted-foreground">Управляйте каталогом товаров</p>
            </div>
            <Button onClick={handleAdd} className="gradient-bg hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Добавить товар
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Всего товаров</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productsData.length}</div>
                <p className="text-xs text-muted-foreground">В каталоге</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Общие просмотры</CardTitle>
                <Eye className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {productsData.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">За месяц</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Общие продажи</CardTitle>
                <ShoppingCart className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {productsData.reduce((sum, p) => sum + p.sales, 0)}
                </div>
                <p className="text-xs text-muted-foreground">За месяц</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Средний рейтинг</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {(productsData.reduce((sum, p) => sum + p.rating, 0) / productsData.length).toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">Из 5.0</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск товаров..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Фильтр
            </Button>
          </div>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Каталог товаров</CardTitle>
              <CardDescription>Полный список товаров с информацией о наличии и продажах</CardDescription>
            </CardHeader>
            <CardContent>
              <SortableTable columns={columns} data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
