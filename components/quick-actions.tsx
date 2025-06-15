"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { UserPlus, FileText, Settings, BarChart3, Shield, Bell } from "lucide-react"

const actions = [
  {
    title: "Добавить пользователя",
    description: "Создать новый аккаунт пользователя",
    icon: UserPlus,
    color: "from-blue-500 to-cyan-500",
    action: "add-user",
  },
  {
    title: "Создать отчет",
    description: "Сгенерировать аналитический отчет",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    action: "create-report",
  },
  {
    title: "Настройки системы",
    description: "Изменить параметры системы",
    icon: Settings,
    color: "from-purple-500 to-pink-500",
    action: "system-settings",
  },
  {
    title: "Просмотр аналитики",
    description: "Проверить метрики производительности",
    icon: BarChart3,
    color: "from-orange-500 to-red-500",
    action: "view-analytics",
  },
  {
    title: "Аудит безопасности",
    description: "Проверить журналы безопасности",
    icon: Shield,
    color: "from-red-500 to-pink-500",
    action: "security-audit",
  },
  {
    title: "Отправить уведомление",
    description: "Рассылка всем пользователям",
    icon: Bell,
    color: "from-indigo-500 to-purple-500",
    action: "send-notification",
  },
]

export function QuickActions() {
  const { toast } = useToast()

  const handleAction = (action: string, title: string) => {
    const messages = {
      "add-user": "Открытие формы добавления пользователя",
      "create-report": "Переход к созданию отчета",
      "system-settings": "Открытие настроек системы",
      "view-analytics": "Переход к аналитике",
      "security-audit": "Открытие журнала безопасности",
      "send-notification": "Открытие формы уведомлений",
    }

    toast({
      title: title,
      description: messages[action as keyof typeof messages] || "Выполнение действия",
    })
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Быстрые действия</CardTitle>
        <CardDescription>Часто используемые административные задачи</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={action.title}
            variant="ghost"
            className="w-full justify-start p-4 h-auto hover:bg-muted/50 transition-all duration-200 hover:scale-105 group animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => handleAction(action.action, action.title)}
          >
            <div
              className={`p-2 rounded-lg bg-gradient-to-br ${action.color} mr-3 group-hover:scale-110 transition-transform`}
            >
              <action.icon className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">{action.title}</div>
              <div className="text-sm text-muted-foreground">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
