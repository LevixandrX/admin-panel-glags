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
import { UserCog, Search, Filter, Plus, Shield, Mail, Phone, Users, UserPlus, Edit } from "lucide-react"
import { FilterButton } from "@/components/filter-button"
import { AdminCreateDialog } from "@/components/users-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialAdminData = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    role: "Главный администратор",
    status: "Активен",
    lastLogin: "2024-03-15 14:30",
    phone: "+7 (999) 123-45-67",
    accessLevel: "Главный",
    note: "",
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "maria@example.com",
    role: "Администратор",
    status: "Активен",
    lastLogin: "2024-03-15 13:45",
    phone: "+7 (999) 234-56-78",
    accessLevel: "Обычный",
    note: "",
  },
  {
    id: 3,
    name: "Алексей Иванов",
    email: "alexey@example.com",
    role: "Модератор",
    status: "Неактивен",
    lastLogin: "2024-03-14 18:20",
    phone: "+7 (999) 345-67-89",
    accessLevel: "Технический",
    note: "",
  },
  {
    id: 4,
    name: "Елена Смирнова",
    email: "elena@example.com",
    role: "Администратор",
    status: "Активен",
    lastLogin: "2024-03-15 10:15",
    phone: "+7 (999) 456-78-90",
    accessLevel: "Обычный",
    note: "",
  },
]

export default function AdminManagementPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [admins, setAdmins] = useState(initialAdminData)
  const [editAdmin, setEditAdmin] = useState<any | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleAdminCreated = (admin: any) => {
    setAdmins((prev) => [
      { ...admin, id: Date.now(), lastLogin: "-" },
      ...prev,
    ])
    toast({
      title: "Администратор создан",
      description: `Новый администратор ${admin.name} добавлен в систему`,
    })
  }

  const handleAdminEdited = (admin: any) => {
    setAdmins((prev) => prev.map((a) => (a.id === admin.id ? { ...a, ...admin } : a)))
    toast({
      title: "Администратор обновлен",
      description: `Данные администратора ${admin.name} обновлены`,
    })
    setIsEditDialogOpen(false)
    setEditAdmin(null)
  }

  const handleAdminDeleted = (admin: any) => {
    setAdmins((prev) => prev.filter((a) => a.id !== admin.id))
    toast({
      title: "Администратор удален",
      description: `Администратор ${admin.name} удален из системы`,
      variant: "destructive",
    })
  }

  const handleEdit = (admin: any) => {
    setEditAdmin(admin)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (admin: any) => {
    handleAdminDeleted(admin)
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
      key: "accessLevel",
      label: "Доступ",
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

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (admin.phone && admin.phone.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Управление админами</h1>
              <p className="text-muted-foreground">Управляйте администраторами и их правами</p>
            </div>
            <div className="w-full flex justify-end sm:w-auto">
              <AdminCreateDialog onAdminCreated={handleAdminCreated} />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список администраторов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Поиск администраторов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <FilterButton />
                </div>
              </div>

              <SortableTable
                data={filteredAdmins}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>

          {/* Модальное окно редактирования администратора */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Редактировать администратора</DialogTitle>
                <DialogDescription>Измените данные администратора</DialogDescription>
              </DialogHeader>
              {editAdmin && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editAdminName">Имя</Label>
                      <Input
                        id="editAdminName"
                        value={editAdmin.name}
                        onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editAdminEmail">Email</Label>
                      <Input
                        id="editAdminEmail"
                        value={editAdmin.email}
                        onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editAdminPhone">Телефон</Label>
                      <Input
                        id="editAdminPhone"
                        value={editAdmin.phone}
                        onChange={(e) => setEditAdmin({ ...editAdmin, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editAdminRole">Роль</Label>
                      <Select value={editAdmin.role} onValueChange={(value) => setEditAdmin({ ...editAdmin, role: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Главный администратор">Главный администратор</SelectItem>
                          <SelectItem value="Администратор">Администратор</SelectItem>
                          <SelectItem value="Модератор">Модератор</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editAdminStatus">Статус</Label>
                      <Select value={editAdmin.status} onValueChange={(value) => setEditAdmin({ ...editAdmin, status: value })}>
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
                      <Label htmlFor="editAdminAccessLevel">Доступ</Label>
                      <Select value={editAdmin.accessLevel} onValueChange={(value) => setEditAdmin({ ...editAdmin, accessLevel: value })}>
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
                    <Label htmlFor="editAdminNote">Примечание</Label>
                    <Input
                      id="editAdminNote"
                      value={editAdmin.note}
                      onChange={(e) => setEditAdmin({ ...editAdmin, note: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={() => handleAdminEdited(editAdmin)} className="gradient-bg hover:opacity-90">
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
