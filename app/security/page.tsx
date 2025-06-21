"use client"

import { useState } from "react"
import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Shield, AlertTriangle, Lock, Eye, UserX, Key, Activity, Globe, Plus, Search, Clock } from "lucide-react"

const securityLogs = [
  {
    id: 1,
    event: "Успешный вход",
    user: "admin@example.com",
    ip: "192.168.1.100",
    location: "Москва, Россия",
    timestamp: "2024-01-16 10:30:15",
    severity: "Информация",
    details: "Успешная аутентификация пользователя",
  },
  {
    id: 2,
    event: "Неудачная попытка входа",
    user: "unknown@hacker.com",
    ip: "45.123.45.67",
    location: "Неизвестно",
    timestamp: "2024-01-16 09:45:22",
    severity: "Предупреждение",
    details: "Попытка входа с неверными учетными данными",
  },
  {
    id: 3,
    event: "Изменение пароля",
    user: "user@example.com",
    ip: "192.168.1.105",
    location: "Москва, Россия",
    timestamp: "2024-01-16 08:15:30",
    severity: "Информация",
    details: "Пользователь изменил пароль",
  },
  {
    id: 4,
    event: "Подозрительная активность",
    user: "test@example.com",
    ip: "123.45.67.89",
    location: "Китай",
    timestamp: "2024-01-15 23:45:10",
    severity: "Критично",
    details: "Множественные попытки доступа к административным функциям",
  },
]

const blockedIPs = [
  {
    id: 1,
    ip: "45.123.45.67",
    reason: "Множественные неудачные попытки входа",
    blockedAt: "2024-01-16 09:50:00",
    expiresAt: "2024-01-17 09:50:00",
    attempts: 15,
  },
  {
    id: 2,
    ip: "123.45.67.89",
    reason: "Подозрительная активность",
    blockedAt: "2024-01-15 23:50:00",
    expiresAt: "Постоянно",
    attempts: 25,
  },
]

const securityRules = [
  {
    id: 1,
    name: "Блокировка по IP после неудачных попыток",
    description: "Автоматически блокировать IP после 5 неудачных попыток входа",
    enabled: true,
    category: "Аутентификация",
  },
  {
    id: 2,
    name: "Двухфакторная аутентификация",
    description: "Требовать 2FA для всех администраторов",
    enabled: true,
    category: "Аутентификация",
  },
  {
    id: 3,
    name: "Мониторинг подозрительной активности",
    description: "Отслеживать необычные паттерны поведения пользователей",
    enabled: true,
    category: "Мониторинг",
  },
  {
    id: 4,
    name: "Автоматическое резервное копирование",
    description: "Создавать резервные копии каждые 6 часов",
    enabled: false,
    category: "Резервное копирование",
  },
]

export default function SecurityPage() {
  const { toast } = useToast()
  const [isAddRuleDialogOpen, setIsAddRuleDialogOpen] = useState(false)
  const [isBlockIPDialogOpen, setIsBlockIPDialogOpen] = useState(false)
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    category: "Аутентификация",
    enabled: true,
  })
  const [blockIPData, setBlockIPData] = useState({
    ip: "",
    reason: "",
    duration: "24h",
  })

  const handleToggleRule = (ruleId: number) => {
    toast({
      title: "Правило обновлено",
      description: "Настройки безопасности изменены",
    })
  }

  const handleAddRule = () => {
    if (newRule.name && newRule.description) {
      toast({
        title: "Правило добавлено",
        description: `Новое правило безопасности "${newRule.name}" создано`,
      })
      setNewRule({
        name: "",
        description: "",
        category: "Аутентификация",
        enabled: true,
      })
      setIsAddRuleDialogOpen(false)
    }
  }

  const handleBlockIP = () => {
    if (blockIPData.ip && blockIPData.reason) {
      toast({
        title: "IP заблокирован",
        description: `IP адрес ${blockIPData.ip} добавлен в черный список`,
      })
      setBlockIPData({
        ip: "",
        reason: "",
        duration: "24h",
      })
      setIsBlockIPDialogOpen(false)
    }
  }

  const handleUnblockIP = (ip: string) => {
    toast({
      title: "IP разблокирован",
      description: `IP адрес ${ip} удален из черного списка`,
    })
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Критично":
        return <Badge variant="destructive">Критично</Badge>
      case "Предупреждение":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Предупреждение
          </Badge>
        )
      case "Информация":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Информация</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      Аутентификация: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Мониторинг: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Резервное копирование": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Безопасность</h1>
              <p className="text-muted-foreground">Мониторинг и управление безопасностью системы</p>
            </div>
          </div>

          {/* Security Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Уровень безопасности</CardTitle>
                <Shield className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Высокий</div>
                <p className="text-xs text-muted-foreground">Все системы защищены</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Активные угрозы</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">2</div>
                <p className="text-xs text-muted-foreground">Требуют внимания</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Заблокированных IP</CardTitle>
                <UserX className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{blockedIPs.length}</div>
                <p className="text-xs text-muted-foreground">В черном списке</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">События за день</CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{securityLogs.length}</div>
                <p className="text-xs text-muted-foreground">Зарегистрировано событий</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="logs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="logs">Журнал событий</TabsTrigger>
              <TabsTrigger value="blocked">Заблокированные IP</TabsTrigger>
              <TabsTrigger value="rules">Правила безопасности</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            <TabsContent value="logs" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Журнал событий безопасности</CardTitle>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input placeholder="Поиск событий..." className="pl-10 w-64" />
                      </div>
                      <Button variant="outline">Экспорт</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {securityLogs.map((log) => (
                    <div key={log.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{log.event}</h4>
                          <p className="text-sm text-muted-foreground">{log.details}</p>
                        </div>
                        {getSeverityBadge(log.severity)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {log.user}
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-3 w-3 mr-1" />
                          {log.ip}
                        </div>
                        <div className="flex items-center">
                          <Activity className="h-3 w-3 mr-1" />
                          {log.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {log.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blocked" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Заблокированные IP адреса</CardTitle>
                    <Dialog open={isBlockIPDialogOpen} onOpenChange={setIsBlockIPDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="gradient-bg hover:opacity-90">
                          <Plus />
                          Заблокировать IP
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Блокировка IP адреса</DialogTitle>
                          <DialogDescription>Добавить IP адрес в черный список</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="blockIP">IP адрес</Label>
                            <Input
                              id="blockIP"
                              placeholder="192.168.1.100"
                              value={blockIPData.ip}
                              onChange={(e) => setBlockIPData({ ...blockIPData, ip: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="blockReason">Причина блокировки</Label>
                            <Input
                              id="blockReason"
                              placeholder="Подозрительная активность"
                              value={blockIPData.reason}
                              onChange={(e) => setBlockIPData({ ...blockIPData, reason: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="blockDuration">Длительность</Label>
                            <Select
                              value={blockIPData.duration}
                              onValueChange={(value) => setBlockIPData({ ...blockIPData, duration: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1h">1 час</SelectItem>
                                <SelectItem value="24h">24 часа</SelectItem>
                                <SelectItem value="7d">7 дней</SelectItem>
                                <SelectItem value="30d">30 дней</SelectItem>
                                <SelectItem value="permanent">Постоянно</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsBlockIPDialogOpen(false)}>
                              Отмена
                            </Button>
                            <Button onClick={handleBlockIP} className="gradient-bg hover:opacity-90">
                              Заблокировать
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blockedIPs.map((blocked) => (
                    <div key={blocked.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium font-mono">{blocked.ip}</h4>
                          <p className="text-sm text-muted-foreground">{blocked.reason}</p>
                        </div>
                        <Badge variant="destructive">Заблокирован</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <span className="font-medium">Заблокирован:</span> {blocked.blockedAt}
                        </div>
                        <div>
                          <span className="font-medium">Истекает:</span> {blocked.expiresAt}
                        </div>
                        <div>
                          <span className="font-medium">Попыток:</span> {blocked.attempts}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleUnblockIP(blocked.ip)}>
                        Разблокировать
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rules" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Правила безопасности</CardTitle>
                    <Dialog open={isAddRuleDialogOpen} onOpenChange={setIsAddRuleDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="gradient-bg hover:opacity-90">
                          <Plus />
                          Добавить правило
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Новое правило безопасности</DialogTitle>
                          <DialogDescription>Создать новое правило для системы безопасности</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="ruleName">Название правила</Label>
                            <Input
                              id="ruleName"
                              placeholder="Введите название правила"
                              value={newRule.name}
                              onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ruleDescription">Описание</Label>
                            <Input
                              id="ruleDescription"
                              placeholder="Описание правила"
                              value={newRule.description}
                              onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ruleCategory">Категория</Label>
                            <Select
                              value={newRule.category}
                              onValueChange={(value) => setNewRule({ ...newRule, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Аутентификация">Аутентификация</SelectItem>
                                <SelectItem value="Мониторинг">Мониторинг</SelectItem>
                                <SelectItem value="Резервное копирование">Резервное копирование</SelectItem>
                                <SelectItem value="Доступ">Доступ</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={newRule.enabled}
                              onCheckedChange={(checked) => setNewRule({ ...newRule, enabled: checked })}
                            />
                            <Label>Включить правило</Label>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsAddRuleDialogOpen(false)}>
                              Отмена
                            </Button>
                            <Button onClick={handleAddRule} className="gradient-bg hover:opacity-90">
                              Создать правило
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {securityRules.map((rule) => (
                    <div key={rule.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{rule.name}</h4>
                          <p className="text-sm text-muted-foreground">{rule.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getCategoryBadge(rule.category)}
                          <Switch checked={rule.enabled} onCheckedChange={() => handleToggleRule(rule.id)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Настройки аутентификации
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Принудительная смена пароля</Label>
                        <p className="text-sm text-muted-foreground">Требовать смену пароля каждые 90 дней</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Сложные пароли</Label>
                        <p className="text-sm text-muted-foreground">
                          Требовать минимум 8 символов с цифрами и спецсимволами
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Блокировка после неудачных попыток</Label>
                        <p className="text-sm text-muted-foreground">Блокировать аккаунт после 5 неудачных попыток</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Таймаут сессии (минуты)</Label>
                      <Input id="sessionTimeout" type="number" defaultValue="30" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Мониторинг и уведомления
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email уведомления о безопасности</Label>
                        <p className="text-sm text-muted-foreground">
                          Отправлять уведомления о подозрительной активности
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Логирование всех действий</Label>
                        <p className="text-sm text-muted-foreground">Записывать все действия пользователей в журнал</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Автоматическое сканирование угроз</Label>
                        <p className="text-sm text-muted-foreground">Проверять систему на наличие угроз каждый час</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alertEmail">Email для уведомлений</Label>
                      <Input id="alertEmail" type="email" defaultValue="security@example.com" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      API и доступ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Ограничение API запросов</Label>
                        <p className="text-sm text-muted-foreground">Лимит 1000 запросов в час на IP</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>HTTPS принудительно</Label>
                        <p className="text-sm text-muted-foreground">Перенаправлять все HTTP запросы на HTTPS</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>CORS защита</Label>
                        <p className="text-sm text-muted-foreground">Ограничить доступ к API с внешних доменов</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allowedDomains">Разрешенные домены</Label>
                      <Input id="allowedDomains" placeholder="example.com, api.example.com" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Резервное копирование
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Автоматическое резервное копирование</Label>
                        <p className="text-sm text-muted-foreground">Создавать резервные копии каждые 6 часов</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Шифрование резервных копий</Label>
                        <p className="text-sm text-muted-foreground">Шифровать все резервные копии AES-256</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backupRetention">Хранить резервные копии (дни)</Label>
                      <Input id="backupRetention" type="number" defaultValue="30" />
                    </div>
                    <Button className="w-full">Создать резервную копию сейчас</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
