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
import { MoreHorizontal, Edit, Trash2, Plus, Search } from "lucide-react"
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
              <Plus className="mr-2 h-4 w-4" />
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

      <div className="rounded-md border">
        <Table>
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
