"use client"

import { useState } from "react"
import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Settings, Save, Bell, Shield, Globe, Database } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    siteName: "Glags Админ Панель",
    siteUrl: "https://admin.example.com",
    adminEmail: "admin@example.com",
    language: "ru",
    timezone: "Europe/Moscow",
    emailNotifications: true,
    pushNotifications: false,
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: "daily",
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    twoFactorAuth: false,
  })

  const handleSave = (section: string) => {
    toast({
      title: "Настройки сохранены",
      description: `Настройки раздела "${section}" успешно сохранены`,
    })
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
              <p className="text-muted-foreground">Управляйте настройками системы</p>
            </div>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">Общие</TabsTrigger>
              <TabsTrigger value="notifications">Уведомления</TabsTrigger>
              <TabsTrigger value="security">Безопасность</TabsTrigger>
              <TabsTrigger value="backup">Резервные копии</TabsTrigger>
              <TabsTrigger value="system">Система</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Основные настройки
                  </CardTitle>
                  <CardDescription>Основная информация о сайте и системе</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Название сайта</Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) => handleSettingChange("siteName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteUrl">URL сайта</Label>
                      <Input
                        id="siteUrl"
                        value={settings.siteUrl}
                        onChange={(e) => handleSettingChange("siteUrl", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Email администратора</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Язык</Label>
                      <Select
                        value={settings.language}
                        onValueChange={(value) => handleSettingChange("language", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ru">Русский</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Часовой пояс</Label>
                      <Select
                        value={settings.timezone}
                        onValueChange={(value) => handleSettingChange("timezone", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Moscow">Москва (UTC+3)</SelectItem>
                          <SelectItem value="Europe/London">Лондон (UTC+0)</SelectItem>
                          <SelectItem value="America/New_York">Нью-Йорк (UTC-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={() => handleSave("Общие")} className="gradient-bg hover:opacity-90">
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить изменения
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Настройки уведомлений
                  </CardTitle>
                  <CardDescription>Управляйте способами получения уведомлений</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email уведомления</Label>
                      <p className="text-sm text-muted-foreground">Получать уведомления на электронную почту</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push уведомления</Label>
                      <p className="text-sm text-muted-foreground">Получать push-уведомления в браузере</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>
                  <Button onClick={() => handleSave("Уведомления")} className="gradient-bg hover:opacity-90">
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить изменения
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Настройки безопасности
                  </CardTitle>
                  <CardDescription>Управляйте параметрами безопасности системы</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="maxLoginAttempts">Максимум попыток входа</Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        value={settings.maxLoginAttempts}
                        onChange={(e) => handleSettingChange("maxLoginAttempts", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Таймаут сессии (минуты)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Двухфакторная аутентификация</Label>
                      <p className="text-sm text-muted-foreground">Включить дополнительную защиту аккаунта</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                    />
                  </div>
                  <Button onClick={() => handleSave("Безопасность")} className="gradient-bg hover:opacity-90">
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить изменения
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Резервные копии
                  </CardTitle>
                  <CardDescription>Настройки автоматического резервного копирования</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Автоматическое резервное копирование</Label>
                      <p className="text-sm text-muted-foreground">Создавать резервные копии автоматически</p>
                    </div>
                    <Switch
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Частота резервного копирования</Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(value) => handleSettingChange("backupFrequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Каждый час</SelectItem>
                        <SelectItem value="daily">Ежедневно</SelectItem>
                        <SelectItem value="weekly">Еженедельно</SelectItem>
                        <SelectItem value="monthly">Ежемесячно</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">Создать резервную копию сейчас</Button>
                    <Button onClick={() => handleSave("Резервные копии")} className="gradient-bg hover:opacity-90">
                      <Save className="mr-2 h-4 w-4" />
                      Сохранить изменения
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Системные настройки
                  </CardTitle>
                  <CardDescription>Управляйте системными параметрами</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Режим обслуживания</Label>
                      <p className="text-sm text-muted-foreground">
                        Временно отключить доступ к сайту для пользователей
                      </p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Информация о системе</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Версия:</span>
                          <span className="font-mono">v2.1.4</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>База данных:</span>
                          <span className="font-mono">PostgreSQL 15</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Сервер:</span>
                          <span className="font-mono">Node.js 18.17</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Время работы:</span>
                          <span className="font-mono">15 дней 4 часа</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Использование ресурсов</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>CPU:</span>
                          <span className="font-mono">23%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>RAM:</span>
                          <span className="font-mono">1.2GB / 4GB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Диск:</span>
                          <span className="font-mono">45GB / 100GB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Сеть:</span>
                          <span className="font-mono">↑ 2.1MB/s ↓ 5.3MB/s</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Button onClick={() => handleSave("Система")} className="gradient-bg hover:opacity-90">
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить изменения
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
