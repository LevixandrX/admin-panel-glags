"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Edit, Trash2, Plus, Search, UserPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  avatar?: string
  phone?: string
  department?: string
}

const users: User[] = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    role: "Администратор",
    status: "Активный",
    phone: "+7 (999) 123-45-67",
    department: "ИТ",
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "maria@example.com",
    role: "Пользователь",
    status: "Активный",
    phone: "+7 (999) 234-56-78",
    department: "Продажи",
  },
  {
    id: 3,
    name: "Алексей Иванов",
    email: "alex@example.com",
    role: "Модератор",
    status: "Неактивный",
    phone: "+7 (999) 345-67-89",
    department: "Поддержка",
  },
  {
    id: 4,
    name: "Елена Козлова",
    email: "elena@example.com",
    role: "Пользователь",
    status: "Активный",
    phone: "+7 (999) 456-78-90",
    department: "Маркетинг",
  },
]

export function UserCreateDialog({
  triggerText = "Добавить пользователя",
  defaultRole = "Пользователь",
  defaultStatus = "Активный",
  onUserCreated,
}: {
  triggerText?: string
  defaultRole?: string
  defaultStatus?: string
  onUserCreated?: (user: any) => void
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: defaultRole,
    department: "",
    status: defaultStatus,
  })

  const handleCreateUser = () => {
    if (newUser.name && newUser.email) {
      toast({
        title: "Пользователь создан",
        description: `Новый пользователь ${newUser.name} добавлен в систему`,
      })
      if (onUserCreated) onUserCreated(newUser)
      setNewUser({
        name: "",
        email: "",
        phone: "",
        role: defaultRole,
        department: "",
        status: defaultStatus,
      })
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-bg hover:opacity-90">
          <UserPlus />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый пользователь</DialogTitle>
          <DialogDescription>Создайте новый аккаунт пользователя в системе</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Имя</Label>
              <Input
                id="userName"
                placeholder="Введите имя"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                type="email"
                placeholder="user@example.com"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userPhone">Телефон</Label>
              <Input
                id="userPhone"
                placeholder="+7 (999) 123-45-67"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userDepartment">Отдел</Label>
              <Input
                id="userDepartment"
                placeholder="Название отдела"
                value={newUser.department}
                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userRole">Роль</Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Администратор">Администратор</SelectItem>
                  <SelectItem value="Модератор">Модератор</SelectItem>
                  <SelectItem value="Пользователь">Пользователь</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="userStatus">Статус</Label>
              <Select value={newUser.status} onValueChange={(value) => setNewUser({ ...newUser, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Активный">Активный</SelectItem>
                  <SelectItem value="Неактивный">Неактивный</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateUser} className="gradient-bg hover:opacity-90">
              Создать пользователя
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function AdminCreateDialog({
  triggerText = "Добавить администратора",
  defaultRole = "Администратор",
  defaultStatus = "Активный",
  onAdminCreated,
}: {
  triggerText?: string
  defaultRole?: string
  defaultStatus?: string
  onAdminCreated?: (admin: any) => void
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    status: defaultStatus,
    accessLevel: "Обычный",
    note: "",
  })

  const handleCreateAdmin = () => {
    if (newAdmin.name && newAdmin.email) {
      toast({
        title: "Администратор создан",
        description: `Новый администратор ${newAdmin.name} добавлен в систему`,
      })
      if (onAdminCreated) onAdminCreated(newAdmin)
      setNewAdmin({
        name: "",
        email: "",
        phone: "",
        department: "",
        status: defaultStatus,
        accessLevel: "Обычный",
        note: "",
      })
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-bg hover:opacity-90">
          <UserPlus />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый администратор</DialogTitle>
          <DialogDescription>Создайте нового администратора системы</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adminName">Имя</Label>
              <Input
                id="adminName"
                placeholder="Введите имя"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email</Label>
              <Input
                id="adminEmail"
                type="email"
                placeholder="admin@example.com"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adminPhone">Телефон</Label>
              <Input
                id="adminPhone"
                placeholder="+7 (999) 123-45-67"
                value={newAdmin.phone}
                onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminDepartment">Отдел</Label>
              <Input
                id="adminDepartment"
                placeholder="Название отдела"
                value={newAdmin.department}
                onChange={(e) => setNewAdmin({ ...newAdmin, department: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adminStatus">Статус</Label>
              <Select value={newAdmin.status} onValueChange={(value) => setNewAdmin({ ...newAdmin, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Активный">Активный</SelectItem>
                  <SelectItem value="Неактивный">Неактивный</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminAccessLevel">Уровень доступа</Label>
              <Select value={newAdmin.accessLevel} onValueChange={(value) => setNewAdmin({ ...newAdmin, accessLevel: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Обычный">Обычный</SelectItem>
                  <SelectItem value="Главный">Главный</SelectItem>
                  <SelectItem value="Технический">Технический</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="adminNote">Примечание</Label>
            <Input
              id="adminNote"
              placeholder="Дополнительная информация"
              value={newAdmin.note}
              onChange={(e) => setNewAdmin({ ...newAdmin, note: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateAdmin} className="gradient-bg hover:opacity-90">
              Создать администратора
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ProductCreateDialog({
  triggerText = "Добавить товар",
  onProductCreated,
}: {
  triggerText?: string
  onProductCreated?: (product: any) => void
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "В наличии",
    image: "",
  })

  const handleCreateProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price) {
      toast({
        title: "Товар создан",
        description: `Новый товар ${newProduct.name} добавлен в систему`,
      })
      if (onProductCreated) onProductCreated(newProduct)
      setNewProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        status: "В наличии",
        image: "",
      })
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-bg hover:opacity-90">
          <Plus />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый товар</DialogTitle>
          <DialogDescription>Добавьте новый товар в систему</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Название</Label>
              <Input
                id="productName"
                placeholder="Введите название"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productCategory">Категория</Label>
              <Input
                id="productCategory"
                placeholder="Категория товара"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productPrice">Цена</Label>
              <Input
                id="productPrice"
                type="number"
                placeholder="Цена, ₽"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productStock">На складе</Label>
              <Input
                id="productStock"
                type="number"
                placeholder="Количество"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productStatus">Статус</Label>
              <Select value={newProduct.status} onValueChange={(value) => setNewProduct({ ...newProduct, status: value })}>
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
              <Label htmlFor="productImage">Изображение (URL)</Label>
              <Input
                id="productImage"
                placeholder="Ссылка на изображение"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateProduct} className="gradient-bg hover:opacity-90">
              Создать товар
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ModuleCreateDialog({
  triggerText = "Добавить модуль",
  onModuleCreated,
}: {
  triggerText?: string
  onModuleCreated?: (module: any) => void
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [newModule, setNewModule] = useState({
    name: "",
    description: "",
    version: "",
    status: "Активен",
    author: "",
  })

  const handleCreateModule = () => {
    if (newModule.name && newModule.version) {
      toast({
        title: "Модуль создан",
        description: `Новый модуль ${newModule.name} добавлен в систему`,
      })
      if (onModuleCreated) onModuleCreated(newModule)
      setNewModule({
        name: "",
        description: "",
        version: "",
        status: "Активен",
        author: "",
      })
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-bg hover:opacity-90">
          <Plus />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый модуль</DialogTitle>
          <DialogDescription>Добавьте новый модуль в систему</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="moduleName">Название</Label>
            <Input
              id="moduleName"
              placeholder="Введите название модуля"
              value={newModule.name}
              onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="moduleDescription">Описание</Label>
            <Input
              id="moduleDescription"
              placeholder="Описание модуля"
              value={newModule.description}
              onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="moduleVersion">Версия</Label>
              <Input
                id="moduleVersion"
                placeholder="1.0.0"
                value={newModule.version}
                onChange={(e) => setNewModule({ ...newModule, version: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moduleStatus">Статус</Label>
              <Select value={newModule.status} onValueChange={(value) => setNewModule({ ...newModule, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Активен">Активен</SelectItem>
                  <SelectItem value="Неактивен">Неактивен</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="moduleAuthor">Автор</Label>
            <Input
              id="moduleAuthor"
              placeholder="Автор модуля"
              value={newModule.author}
              onChange={(e) => setNewModule({ ...newModule, author: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateModule} className="gradient-bg hover:opacity-90">
              Создать модуль
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function TemplateCreateDialog({
  triggerText = "Добавить шаблон",
  onTemplateCreated,
}: {
  triggerText?: string
  onTemplateCreated?: (template: any) => void
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    type: "Страница",
    status: "Активен",
    author: "",
  })

  const handleCreateTemplate = () => {
    if (newTemplate.name && newTemplate.type) {
      toast({
        title: "Шаблон создан",
        description: `Новый шаблон ${newTemplate.name} добавлен в систему`,
      })
      if (onTemplateCreated) onTemplateCreated(newTemplate)
      setNewTemplate({
        name: "",
        description: "",
        type: "Страница",
        status: "Активен",
        author: "",
      })
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-bg hover:opacity-90">
          <Plus />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый шаблон</DialogTitle>
          <DialogDescription>Добавьте новый шаблон в систему</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="templateName">Название</Label>
            <Input
              id="templateName"
              placeholder="Введите название шаблона"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="templateDescription">Описание</Label>
            <Input
              id="templateDescription"
              placeholder="Описание шаблона"
              value={newTemplate.description}
              onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="templateType">Тип</Label>
              <Select value={newTemplate.type} onValueChange={(value) => setNewTemplate({ ...newTemplate, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Страница">Страница</SelectItem>
                  <SelectItem value="Блог">Блог</SelectItem>
                  <SelectItem value="Магазин">Магазин</SelectItem>
                  <SelectItem value="Портфолио">Портфолио</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="templateStatus">Статус</Label>
              <Select value={newTemplate.status} onValueChange={(value) => setNewTemplate({ ...newTemplate, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Активен">Активен</SelectItem>
                  <SelectItem value="Неактивен">Неактивен</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="templateAuthor">Автор</Label>
            <Input
              id="templateAuthor"
              placeholder="Автор шаблона"
              value={newTemplate.author}
              onChange={(e) => setNewTemplate({ ...newTemplate, author: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateTemplate} className="gradient-bg hover:opacity-90">
              Создать шаблон
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function OrderCreateDialog({
  triggerText = "Создать заказ",
  onOrderCreated,
}: {
  triggerText?: string
  onOrderCreated?: (order: any) => void
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [newOrder, setNewOrder] = useState({
    orderNumber: "",
    customer: "",
    email: "",
    total: "",
    status: "Обрабатывается",
    items: "",
    paymentMethod: "Карта",
    date: "",
  })

  const handleCreateOrder = () => {
    if (newOrder.orderNumber && newOrder.customer && newOrder.total) {
      toast({
        title: "Заказ создан",
        description: `Новый заказ ${newOrder.orderNumber} добавлен в систему`,
      })
      if (onOrderCreated) onOrderCreated(newOrder)
      setNewOrder({
        orderNumber: "",
        customer: "",
        email: "",
        total: "",
        status: "Обрабатывается",
        items: "",
        paymentMethod: "Карта",
        date: "",
      })
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-bg hover:opacity-90">
          <Plus />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый заказ</DialogTitle>
          <DialogDescription>Создайте новый заказ</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Номер заказа</Label>
              <Input
                id="orderNumber"
                placeholder="ORD-2024-005"
                value={newOrder.orderNumber}
                onChange={(e) => setNewOrder({ ...newOrder, orderNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderDate">Дата</Label>
              <Input
                id="orderDate"
                type="date"
                value={newOrder.date}
                onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Клиент</Label>
              <Input
                id="customer"
                placeholder="Имя клиента"
                value={newOrder.customer}
                onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={newOrder.email}
                onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total">Сумма</Label>
              <Input
                id="total"
                type="number"
                placeholder="Сумма, ₽"
                value={newOrder.total}
                onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="items">Товаров</Label>
              <Input
                id="items"
                type="number"
                placeholder="Количество товаров"
                value={newOrder.items}
                onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Оплата</Label>
              <Select value={newOrder.paymentMethod} onValueChange={(value) => setNewOrder({ ...newOrder, paymentMethod: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Карта">Карта</SelectItem>
                  <SelectItem value="Наличные">Наличные</SelectItem>
                  <SelectItem value="Перевод">Перевод</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select value={newOrder.status} onValueChange={(value) => setNewOrder({ ...newOrder, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Доставлен">Доставлен</SelectItem>
                  <SelectItem value="В пути">В пути</SelectItem>
                  <SelectItem value="Обрабатывается">Обрабатывается</SelectItem>
                  <SelectItem value="Отменен">Отменен</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateOrder} className="gradient-bg hover:opacity-90">
              Создать заказ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function MessageCreateDialog({
  triggerText = "Новое сообщение",
  onMessageCreated,
}: {
  triggerText?: string
  onMessageCreated?: (message: any) => void
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    sender: "",
    email: "",
    subject: "",
    message: "",
    priority: "Средний",
  })

  const handleCreateMessage = () => {
    if (newMessage.sender && newMessage.subject && newMessage.message) {
      toast({
        title: "Сообщение создано",
        description: `Новое сообщение от ${newMessage.sender} создано`,
      })
      if (onMessageCreated) onMessageCreated(newMessage)
      setNewMessage({
        sender: "",
        email: "",
        subject: "",
        message: "",
        priority: "Средний",
      })
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-bg hover:opacity-90">
          <Plus />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новое сообщение</DialogTitle>
          <DialogDescription>Создайте новое сообщение для пользователя</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sender">Отправитель</Label>
              <Input
                id="sender"
                placeholder="Имя отправителя"
                value={newMessage.sender}
                onChange={(e) => setNewMessage({ ...newMessage, sender: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={newMessage.email}
                onChange={(e) => setNewMessage({ ...newMessage, email: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Тема</Label>
            <Input
              id="subject"
              placeholder="Тема сообщения"
              value={newMessage.subject}
              onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Сообщение</Label>
            <Input
              id="message"
              placeholder="Текст сообщения"
              value={newMessage.message}
              onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Приоритет</Label>
            <Select value={newMessage.priority} onValueChange={(value) => setNewMessage({ ...newMessage, priority: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Высокий">Высокий</SelectItem>
                <SelectItem value="Средний">Средний</SelectItem>
                <SelectItem value="Низкий">Низкий</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateMessage} className="gradient-bg hover:opacity-90">
              Создать сообщение
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function UsersTable() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Пользователь",
    department: "",
    status: "Активный",
  })

  const handleCreateUser = () => {
    if (newUser.name && newUser.email) {
      toast({
        title: "Пользователь создан",
        description: `Новый пользователь ${newUser.name} добавлен в систему`,
      })
      setNewUser({
        name: "",
        email: "",
        phone: "",
        role: "Пользователь",
        department: "",
        status: "Активный",
      })
      setIsCreateDialogOpen(false)
    }
  }

  const handleEdit = (user: User) => {
    toast({
      title: "Редактирование пользователя",
      description: `Открытие формы редактирования: ${user.name}`,
    })
  }

  const handleDelete = (user: User) => {
    toast({
      title: "Пользователь удален",
      description: `Пользователь ${user.name} удален из системы`,
      variant: "destructive",
    })
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Поиск пользователей..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-bg hover:opacity-90">
              <UserPlus />
              Добавить пользователя
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новый пользователь</DialogTitle>
              <DialogDescription>Создайте новый аккаунт пользователя в системе</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Имя</Label>
                  <Input
                    id="userName"
                    placeholder="Введите имя"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    placeholder="user@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userPhone">Телефон</Label>
                  <Input
                    id="userPhone"
                    placeholder="+7 (999) 123-45-67"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userDepartment">Отдел</Label>
                  <Input
                    id="userDepartment"
                    placeholder="Название отдела"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userRole">Роль</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Администратор">Администратор</SelectItem>
                      <SelectItem value="Модератор">Модератор</SelectItem>
                      <SelectItem value="Пользователь">Пользователь</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userStatus">Статус</Label>
                  <Select value={newUser.status} onValueChange={(value) => setNewUser({ ...newUser, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Активный">Активный</SelectItem>
                      <SelectItem value="Неактивный">Неактивный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleCreateUser} className="gradient-bg hover:opacity-90">
                  Создать пользователя
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-[600px] w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Пользователь</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Отдел</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      {user.phone && <div className="text-xs text-muted-foreground">{user.phone}</div>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === "Администратор" ? "default" : "secondary"}>{user.role}</Badge>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "Активный" ? "default" : "secondary"}>{user.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(user)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Редактировать
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(user)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Удалить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
