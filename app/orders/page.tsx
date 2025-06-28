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
import { ShoppingCart, Search, Filter, Plus, Package, Truck, CheckCircle, Clock } from "lucide-react"
import { FilterButton } from "@/components/filter-button"
import { OrderCreateDialog } from "@/components/users-table"

const ordersData = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customer: "Иван Петров",
    email: "ivan@example.com",
    total: 15999,
    status: "Доставлен",
    date: "2024-01-16",
    items: 3,
    paymentMethod: "Карта",
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customer: "Мария Сидорова",
    email: "maria@example.com",
    total: 8500,
    status: "В пути",
    date: "2024-01-15",
    items: 2,
    paymentMethod: "Наличные",
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customer: "Алексей Иванов",
    email: "alex@example.com",
    total: 25000,
    status: "Обрабатывается",
    date: "2024-01-14",
    items: 5,
    paymentMethod: "Карта",
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    customer: "Елена Козлова",
    email: "elena@example.com",
    total: 12300,
    status: "Отменен",
    date: "2024-01-13",
    items: 1,
    paymentMethod: "Перевод",
  },
]

export default function OrdersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleAdd = () => {
    toast({
      title: "Создание заказа",
      description: "Открытие формы создания нового заказа",
    })
  }

  const handleEdit = (row: any) => {
    toast({
      title: "Редактирование заказа",
      description: `Редактирование заказа: ${row.orderNumber}`,
    })
  }

  const handleDelete = (row: any) => {
    toast({
      title: "Отмена заказа",
      description: `Заказ ${row.orderNumber} отменен`,
      variant: "destructive",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Доставлен":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Доставлен
          </Badge>
        )
      case "В пути":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Truck className="w-3 h-3 mr-1" />В пути
          </Badge>
        )
      case "Обрабатывается":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Обрабатывается
          </Badge>
        )
      case "Отменен":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Отменен</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const columns: TableColumn[] = [
    {
      key: "orderNumber",
      label: "Номер заказа",
      sortable: true,
      render: (value) => <span className="font-mono font-medium">{value}</span>,
    },
    {
      key: "customer",
      label: "Клиент",
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      ),
    },
    {
      key: "total",
      label: "Сумма",
      sortable: true,
      render: (value) => <span className="font-mono font-medium">{value.toLocaleString()} ₽</span>,
    },
    {
      key: "status",
      label: "Статус",
      sortable: true,
      render: (value) => getStatusBadge(value),
    },
    {
      key: "items",
      label: "Товаров",
      sortable: true,
      render: (value) => <span className="font-mono">{value}</span>,
    },
    { key: "paymentMethod", label: "Оплата", sortable: true },
    { key: "date", label: "Дата", sortable: true },
  ]

  const filteredData = ordersData.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0)
  const completedOrders = ordersData.filter((order) => order.status === "Доставлен").length
  const pendingOrders = ordersData.filter((order) => order.status === "Обрабатывается").length

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Заказы</h1>
              <p className="text-muted-foreground">Управляйте заказами и отслеживайте доставки</p>
            </div>
            <Button onClick={handleAdd} className="gradient-bg hover:opacity-90">
              <OrderCreateDialog />
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ordersData.length}</div>
                <p className="text-xs text-muted-foreground">За все время</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
                <Package className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{totalRevenue.toLocaleString()} ₽</div>
                <p className="text-xs text-muted-foreground">За месяц</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Выполнено</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{completedOrders}</div>
                <p className="text-xs text-muted-foreground">Доставленных заказов</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">В обработке</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
                <p className="text-xs text-muted-foreground">Ожидают обработки</p>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Список заказов</CardTitle>
              <CardDescription>Полная информация о заказах и их статусах</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Поиск заказов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <FilterButton />
                </div>
              </div>
              <SortableTable columns={columns} data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
