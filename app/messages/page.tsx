"use client"

import { useState } from "react"
import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Search, Send, Plus, Users, Clock, CheckCircle } from "lucide-react"

const messagesData = [
  {
    id: 1,
    sender: "Иван Петров",
    email: "ivan@example.com",
    subject: "Вопрос по заказу",
    message: "Здравствуйте! Когда будет доставлен мой заказ ORD-2024-001?",
    time: "10:30",
    date: "2024-01-16",
    status: "Новое",
    priority: "Высокий",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    sender: "Мария Сидорова",
    email: "maria@example.com",
    subject: "Возврат товара",
    message: "Хочу вернуть товар, который не подошел по размеру.",
    time: "09:15",
    date: "2024-01-16",
    status: "В работе",
    priority: "Средний",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    sender: "Алексей Иванов",
    email: "alex@example.com",
    subject: "Техническая поддержка",
    message: "Не могу войти в личный кабинет, помогите пожалуйста.",
    time: "08:45",
    date: "2024-01-15",
    status: "Отвечено",
    priority: "Низкий",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function MessagesPage() {
  const { toast } = useToast()
  const [selectedMessage, setSelectedMessage] = useState(messagesData[0])
  const [replyText, setReplyText] = useState("")

  const handleReply = () => {
    if (replyText.trim()) {
      toast({
        title: "Ответ отправлен",
        description: `Ответ отправлен пользователю ${selectedMessage.sender}`,
      })
      setReplyText("")
    }
  }

  const handleNewMessage = () => {
    toast({
      title: "Новое сообщение",
      description: "Открытие формы создания нового сообщения",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Новое":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Новое</Badge>
      case "В работе":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">В работе</Badge>
      case "Отвечено":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Отвечено</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Высокий":
        return <Badge variant="destructive">Высокий</Badge>
      case "Средний":
        return <Badge variant="secondary">Средний</Badge>
      case "Низкий":
        return <Badge variant="outline">Низкий</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Сообщения</h1>
              <p className="text-muted-foreground">Управляйте сообщениями от пользователей</p>
            </div>
            <div className="w-full flex justify-end sm:w-auto">
              <Button onClick={handleNewMessage} className="gradient-bg hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Новое сообщение
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Всего сообщений</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{messagesData.length}</div>
                <p className="text-xs text-muted-foreground">За сегодня</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Новые</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {messagesData.filter((m) => m.status === "Новое").length}
                </div>
                <p className="text-xs text-muted-foreground">Требуют ответа</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">В работе</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {messagesData.filter((m) => m.status === "В работе").length}
                </div>
                <p className="text-xs text-muted-foreground">Обрабатываются</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Отвечено</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {messagesData.filter((m) => m.status === "Отвечено").length}
                </div>
                <p className="text-xs text-muted-foreground">Завершено</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Messages List */}
            <Card>
              <CardHeader>
                <CardTitle>Входящие сообщения</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Поиск сообщений..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {messagesData.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-l-4 ${
                        selectedMessage.id === message.id ? "bg-muted/50 border-l-primary" : "border-l-transparent"
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                          <AvatarFallback>
                            {message.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">{message.sender}</p>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{message.subject}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            {getStatusBadge(message.status)}
                            {getPriorityBadge(message.priority)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Message Detail */}
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedMessage.avatar || "/placeholder.svg"} alt={selectedMessage.sender} />
                        <AvatarFallback>
                          {selectedMessage.sender
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                        <CardDescription>
                          От: {selectedMessage.sender} ({selectedMessage.email})
                        </CardDescription>
                        <div className="flex items-center space-x-2 mt-2">
                          {getStatusBadge(selectedMessage.status)}
                          {getPriorityBadge(selectedMessage.priority)}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedMessage.date} в {selectedMessage.time}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p>{selectedMessage.message}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Ответить</h4>
                    <textarea
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={4}
                      placeholder="Введите ваш ответ..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Сохранить черновик</Button>
                      <Button onClick={handleReply} className="gradient-bg hover:opacity-90">
                        <Send className="mr-2 h-4 w-4" />
                        Отправить ответ
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
