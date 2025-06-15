import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: "Иван Петров",
    action: "Создал новый аккаунт пользователя",
    time: "2 минуты назад",
    type: "user",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    user: "Мария Сидорова",
    action: "Обновила инвентарь товаров",
    time: "5 минут назад",
    type: "product",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    user: "Система",
    action: "Резервное копирование завершено успешно",
    time: "10 минут назад",
    type: "system",
    avatar: null,
  },
  {
    id: 4,
    user: "Алексей Иванов",
    action: "Сгенерировал месячный отчет",
    time: "15 минут назад",
    type: "report",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    user: "Елена Козлова",
    action: "Изменила настройки безопасности",
    time: "1 час назад",
    type: "security",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const typeColors = {
  user: "bg-blue-500",
  product: "bg-green-500",
  system: "bg-gray-500",
  report: "bg-purple-500",
  security: "bg-red-500",
}

export function RecentActivity() {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Последняя активность</CardTitle>
        <CardDescription>Последние действия и системные события</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                {activity.avatar ? (
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center text-white text-sm font-bold">
                    С
                  </div>
                )}
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 ${typeColors[activity.type as keyof typeof typeColors]} rounded-full border-2 border-background`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.action}</p>
              </div>

              <div className="text-xs text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
