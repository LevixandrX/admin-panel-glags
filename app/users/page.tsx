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
import { Users, Search, Plus, UserPlus, Edit } from "lucide-react"
import { FilterButton } from "@/components/filter-button"
import { UserCreateDialog } from "@/components/users-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialUsersData = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    role: "Администратор",
    status: "Активен",
    lastLogin: "2024-03-15 14:30",
    phone: "+7 (999) 123-45-67",
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "maria@example.com",
    role: "Модератор",
    status: "Активен",
    lastLogin: "2024-03-15 12:15",
    phone: "+7 (999) 234-56-78",
  },
  {
    id: 3,
    name: "Алексей Иванов",
    email: "alexey@example.com",
    role: "Пользователь",
    status: "Неактивен",
    lastLogin: "2024-03-14 18:45",
    phone: "+7 (999) 345-67-89",
  },
  {
    id: 4,
    name: "Елена Смирнова",
    email: "elena@example.com",
    role: "Пользователь",
    status: "Активен",
    lastLogin: "2024-03-15 09:20",
    phone: "+7 (999) 456-78-90",
  },
]

export default function UsersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState(initialUsersData)
  const [editUser, setEditUser] = useState<any | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleUserCreated = (user: any) => {
    setUsers((prev) => [
      { ...user, id: Date.now(), lastLogin: "-" },
      ...prev,
    ])
    toast({
      title: "Пользователь создан",
      description: `Новый пользователь ${user.name} добавлен в систему`,
    })
  }

  const handleUserEdited = (user: any) => {
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...user } : u)))
    toast({
      title: "Пользователь обновлен",
      description: `Данные пользователя ${user.name} обновлены`,
    })
    setIsEditDialogOpen(false)
    setEditUser(null)
  }

  const handleUserDeleted = (user: any) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id))
    toast({
      title: "Пользователь удален",
      description: `Пользователь ${user.name} удален из системы`,
      variant: "destructive",
    })
  }

  const handleEdit = (user: any) => {
    setEditUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (user: any) => {
    handleUserDeleted(user)
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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone && user.phone.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Пользователи</h1>
              <p className="text-muted-foreground">Управляйте пользователями и их правами</p>
            </div>
            <div className="w-full flex justify-end sm:w-auto">
              <UserCreateDialog onUserCreated={handleUserCreated} />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список пользователей</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Поиск пользователей..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <FilterButton />
                </div>
              </div>

              <SortableTable
                data={filteredUsers}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>

          {/* Модальное окно редактирования пользователя */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Редактировать пользователя</DialogTitle>
                <DialogDescription>Измените данные пользователя</DialogDescription>
              </DialogHeader>
              {editUser && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editUserName">Имя</Label>
                      <Input
                        id="editUserName"
                        value={editUser.name}
                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editUserEmail">Email</Label>
                      <Input
                        id="editUserEmail"
                        value={editUser.email}
                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editUserPhone">Телефон</Label>
                      <Input
                        id="editUserPhone"
                        value={editUser.phone}
                        onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editUserRole">Роль</Label>
                      <Select value={editUser.role} onValueChange={(value) => setEditUser({ ...editUser, role: value })}>
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editUserStatus">Статус</Label>
                      <Select value={editUser.status} onValueChange={(value) => setEditUser({ ...editUser, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Активен">Активен</SelectItem>
                          <SelectItem value="Неактивен">Неактивен</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editUserLastLogin">Последний вход</Label>
                      <Input
                        id="editUserLastLogin"
                        value={editUser.lastLogin}
                        onChange={(e) => setEditUser({ ...editUser, lastLogin: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={() => handleUserEdited(editUser)} className="gradient-bg hover:opacity-90">
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
