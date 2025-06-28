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
import { Package, Search, Filter, Plus, AlertTriangle, Edit } from "lucide-react"
import { FilterButton } from "@/components/filter-button"
import { ProductCreateDialog } from "@/components/users-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialWarehouseData = [
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
  const [warehouse, setWarehouse] = useState(initialWarehouseData)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleProductCreated = (item: any) => {
    setWarehouse((prev) => [
      { ...item, id: Date.now(), lastUpdated: new Date().toISOString().slice(0, 10) },
      ...prev,
    ])
    toast({
      title: "Товар добавлен на склад",
      description: `Товар ${item.name} добавлен на склад`,
    })
  }

  const handleProductEdited = (item: any) => {
    setWarehouse((prev) => prev.map((p) => (p.id === item.id ? { ...p, ...item } : p)))
    toast({
      title: "Товар обновлен",
      description: `Данные товара ${item.name} обновлены`,
    })
    setIsEditDialogOpen(false)
    setEditItem(null)
  }

  const handleProductDeleted = (item: any) => {
    setWarehouse((prev) => prev.filter((p) => p.id !== item.id))
    toast({
      title: "Товар удален со склада",
      description: `Товар ${item.name} удален со склада`,
      variant: "destructive",
    })
  }

  const handleEdit = (item: any) => {
    setEditItem(item)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (item: any) => {
    handleProductDeleted(item)
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

  const filteredWarehouse = warehouse.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Склад</h1>
              <p className="text-muted-foreground">Управляйте товарами, их количеством и местоположением</p>
            </div>
            <div className="w-full flex justify-end sm:w-auto">
              <ProductCreateDialog triggerText="Добавить товар на склад" onProductCreated={handleProductCreated} />
            </div>
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
                data={filteredWarehouse}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>

          {/* Модальное окно редактирования товара на складе */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Редактировать товар на складе</DialogTitle>
                <DialogDescription>Измените данные товара</DialogDescription>
              </DialogHeader>
              {editItem && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editItemName">Название</Label>
                      <Input
                        id="editItemName"
                        value={editItem.name}
                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editItemCategory">Категория</Label>
                      <Input
                        id="editItemCategory"
                        value={editItem.category}
                        onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editItemQuantity">Количество</Label>
                      <Input
                        id="editItemQuantity"
                        type="number"
                        value={editItem.quantity}
                        onChange={(e) => setEditItem({ ...editItem, quantity: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editItemLocation">Местоположение</Label>
                      <Input
                        id="editItemLocation"
                        value={editItem.location}
                        onChange={(e) => setEditItem({ ...editItem, location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editItemStatus">Статус</Label>
                      <Select value={editItem.status} onValueChange={(value) => setEditItem({ ...editItem, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="В наличии">В наличии</SelectItem>
                          <SelectItem value="Мало на складе">Мало на складе</SelectItem>
                          <SelectItem value="Нет в наличии">Нет в наличии</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editItemLastUpdated">Последнее обновление</Label>
                      <Input
                        id="editItemLastUpdated"
                        value={editItem.lastUpdated}
                        onChange={(e) => setEditItem({ ...editItem, lastUpdated: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={() => handleProductEdited(editItem)} className="gradient-bg hover:opacity-90">
                      Сохранить
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
