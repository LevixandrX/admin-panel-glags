"use client"

import { useState } from "react"
import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, Users, MapPin } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Встреча с командой разработки",
    date: "2024-01-16",
    time: "10:00",
    duration: "2 часа",
    type: "Встреча",
    attendees: ["Иван Петров", "Мария Сидорова"],
    location: "Конференц-зал А",
    description: "Обсуждение планов на следующий спринт",
    priority: "Высокий",
  },
  {
    id: 2,
    title: "Презентация для клиента",
    date: "2024-01-17",
    time: "14:30",
    duration: "1 час",
    type: "Презентация",
    attendees: ["Алексей Иванов", "Елена Козлова"],
    location: "Онлайн",
    description: "Демонстрация нового функционала",
    priority: "Средний",
  },
  {
    id: 3,
    title: "Планерка отдела продаж",
    date: "2024-01-18",
    time: "09:00",
    duration: "30 минут",
    type: "Планерка",
    attendees: ["Команда продаж"],
    location: "Офис",
    description: "Еженедельная планерка",
    priority: "Низкий",
  },
]

export default function CalendarPage() {
  const { toast } = useToast()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    type: "Встреча",
    attendees: "",
    location: "",
    description: "",
    priority: "Средний",
  })

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      toast({
        title: "Событие создано",
        description: `Событие "${newEvent.title}" добавлено в календарь`,
      })
      setNewEvent({
        title: "",
        date: "",
        time: "",
        duration: "",
        type: "Встреча",
        attendees: "",
        location: "",
        description: "",
        priority: "Средний",
      })
      setIsCreateDialogOpen(false)
    }
  }

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event)
    toast({
      title: "Редактирование события",
      description: `Открытие формы редактирования: ${event.title}`,
    })
  }

  const handleDeleteEvent = (event: any) => {
    toast({
      title: "Событие удалено",
      description: `Событие "${event.title}" удалено из календаря`,
      variant: "destructive",
    })
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

  const getTypeBadge = (type: string) => {
    const colors = {
      Встреча: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Презентация: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Планерка: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    }
    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-muted"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayEvents = events.filter((event) => event.date === dateStr)

      days.push(
        <div key={day} className="h-24 border border-muted p-1 overflow-hidden">
          <div className="font-medium text-sm mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="text-xs p-1 rounded bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 truncate"
                onClick={() => handleEditEvent(event)}
              >
                {event.time} {event.title}
              </div>
            ))}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Календарь</h1>
              <p className="text-muted-foreground">Управляйте событиями и встречами</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-bg hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Создать событие
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Новое событие</DialogTitle>
                  <DialogDescription>Создайте новое событие в календаре</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Название события</Label>
                    <Input
                      id="title"
                      placeholder="Введите название события"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Дата</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Время</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Тип события</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Встреча">Встреча</SelectItem>
                          <SelectItem value="Презентация">Презентация</SelectItem>
                          <SelectItem value="Планерка">Планерка</SelectItem>
                          <SelectItem value="Конференция">Конференция</SelectItem>
                          <SelectItem value="Обучение">Обучение</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Приоритет</Label>
                      <Select
                        value={newEvent.priority}
                        onValueChange={(value) => setNewEvent({ ...newEvent, priority: value })}
                      >
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Продолжительность</Label>
                    <Input
                      id="duration"
                      placeholder="например: 1 час, 30 минут"
                      value={newEvent.duration}
                      onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Место проведения</Label>
                    <Input
                      id="location"
                      placeholder="Конференц-зал, Онлайн, Офис"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendees">Участники</Label>
                    <Input
                      id="attendees"
                      placeholder="Имена участников через запятую"
                      value={newEvent.attendees}
                      onChange={(e) => setNewEvent({ ...newEvent, attendees: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      placeholder="Дополнительная информация о событии"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleCreateEvent} className="gradient-bg hover:opacity-90">
                      Создать событие
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Сегодня событий</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Запланировано на сегодня</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Эта неделя</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">12</div>
                <p className="text-xs text-muted-foreground">Событий на неделе</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Участники</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">28</div>
                <p className="text-xs text-muted-foreground">Уникальных участников</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Встречи</CardTitle>
                <MapPin className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">8</div>
                <p className="text-xs text-muted-foreground">Очных встреч</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Calendar Grid */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-0 mb-2">
                    {["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"].map((day) => (
                      <div
                        key={day}
                        className="h-8 flex items-center justify-center font-medium text-sm border border-muted"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-0">{renderCalendar()}</div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Ближайшие события</CardTitle>
                <CardDescription>События на следующие дни</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex space-x-1">
                        {getTypeBadge(event.type)}
                        {getPriorityBadge(event.priority)}
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {event.date} в {event.time}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {Array.isArray(event.attendees) ? event.attendees.join(", ") : event.attendees}
                      </div>
                    </div>
                    <p className="text-sm mt-2">{event.description}</p>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                        Редактировать
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteEvent(event)}>
                        Удалить
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
