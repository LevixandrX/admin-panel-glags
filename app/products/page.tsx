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
import { Package, Search, Filter, Plus, Star, Eye, ShoppingCart, Edit } from "lucide-react"
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

const initialProductsData = [
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
  const [products, setProducts] = useState(initialProductsData)
  const [editProduct, setEditProduct] = useState<any | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleProductCreated = (product: any) => {
    setProducts((prev) => [
      { ...product, id: Date.now() },
      ...prev,
    ])
    toast({
      title: "Товар создан",
      description: `Новый товар ${product.name} добавлен в систему`,
    })
  }

  const handleProductEdited = (product: any) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, ...product } : p)))
    toast({
      title: "Товар обновлен",
      description: `Данные товара ${product.name} обновлены`,
    })
    setIsEditDialogOpen(false)
    setEditProduct(null)
  }

  const handleProductDeleted = (product: any) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id))
    toast({
      title: "Товар удален",
      description: `Товар ${product.name} удален из системы`,
      variant: "destructive",
    })
  }

  const handleEdit = (product: any) => {
    setEditProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (product: any) => {
    handleProductDeleted(product)
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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
              <ProductCreateDialog onProductCreated={handleProductCreated} />
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
                data={filteredProducts}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>

          {/* Модальное окно редактирования товара */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Редактировать товар</DialogTitle>
                <DialogDescription>Измените данные товара</DialogDescription>
              </DialogHeader>
              {editProduct && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editProductName">Название</Label>
                      <Input
                        id="editProductName"
                        value={editProduct.name}
                        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editProductCategory">Категория</Label>
                      <Input
                        id="editProductCategory"
                        value={editProduct.category}
                        onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editProductPrice">Цена</Label>
                      <Input
                        id="editProductPrice"
                        type="number"
                        value={editProduct.price}
                        onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editProductStock">На складе</Label>
                      <Input
                        id="editProductStock"
                        type="number"
                        value={editProduct.stock}
                        onChange={(e) => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editProductStatus">Статус</Label>
                      <Select value={editProduct.status} onValueChange={(value) => setEditProduct({ ...editProduct, status: value })}>
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
                      <Label htmlFor="editProductImage">Изображение (URL)</Label>
                      <Input
                        id="editProductImage"
                        value={editProduct.image}
                        onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editProductRating">Рейтинг</Label>
                      <Input
                        id="editProductRating"
                        type="number"
                        step="0.1"
                        value={editProduct.rating}
                        onChange={(e) => setEditProduct({ ...editProduct, rating: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editProductViews">Просмотры</Label>
                      <Input
                        id="editProductViews"
                        type="number"
                        value={editProduct.views}
                        onChange={(e) => setEditProduct({ ...editProduct, views: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editProductSales">Продажи</Label>
                      <Input
                        id="editProductSales"
                        type="number"
                        value={editProduct.sales}
                        onChange={(e) => setEditProduct({ ...editProduct, sales: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={() => handleProductEdited(editProduct)} className="gradient-bg hover:opacity-90">
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
