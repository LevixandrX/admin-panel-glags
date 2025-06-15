"use client"
import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { BarChart3, TrendingUp, Users, DollarSign, Download, RefreshCw } from "lucide-react"

const analyticsData = {
  revenue: [
    { month: "Янв", value: 45000, growth: 12 },
    { month: "Фев", value: 52000, growth: 15 },
    { month: "Мар", value: 48000, growth: -8 },
    { month: "Апр", value: 61000, growth: 27 },
    { month: "Май", value: 55000, growth: -10 },
    { month: "Июн", value: 67000, growth: 22 },
  ],
  userGrowth: [
    { month: "Янв", users: 1200, newUsers: 150 },
    { month: "Фев", users: 1350, newUsers: 180 },
    { month: "Мар", users: 1480, newUsers: 130 },
    { month: "Апр", users: 1650, newUsers: 170 },
    { month: "Май", users: 1820, newUsers: 170 },
    { month: "Июн", users: 2000, newUsers: 180 },
  ],
  topProducts: [
    { name: "Беспроводные наушники", sales: 156, revenue: 1404000 },
    { name: "Игровая мышь", sales: 134, revenue: 609700 },
    { name: "Клавиатура", sales: 98, revenue: 686000 },
    { name: "Монитор", sales: 67, revenue: 1340000 },
    { name: "Веб-камера", sales: 45, revenue: 315000 },
  ],
}

export default function AnalyticsPage() {
  const { toast } = useToast()

  const handleExport = () => {
    toast({
      title: "Экспорт данных",
      description: "Аналитические данные экспортированы в CSV",
    })
  }

  const handleRefresh = () => {
    toast({
      title: "Обновление данных",
      description: "Данные аналитики обновлены",
    })
  }

  const totalRevenue = analyticsData.revenue.reduce((sum, item) => sum + item.value, 0)
  const totalUsers = analyticsData.userGrowth[analyticsData.userGrowth.length - 1].users
  const avgGrowth = analyticsData.revenue.reduce((sum, item) => sum + item.growth, 0) / analyticsData.revenue.length

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Аналитика</h1>
              <p className="text-muted-foreground">Подробная аналитика и статистика бизнеса</p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Обновить
              </Button>
              <Button onClick={handleExport} className="gradient-bg hover:opacity-90">
                <Download className="mr-2 h-4 w-4" />
                Экспорт
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} ₽</div>
                <p className="text-xs text-muted-foreground">За 6 месяцев</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Всего пользователей</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Активных пользователей</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Средний рост</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgGrowth.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Ежемесячно</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">Средняя конверсия</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Динамика выручки</CardTitle>
                <CardDescription>Месячная выручка за последние 6 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.revenue.map((item, index) => {
                    const maxValue = Math.max(...analyticsData.revenue.map((d) => d.value))
                    const width = (item.value / maxValue) * 100

                    return (
                      <div key={item.month} className="flex items-center space-x-4">
                        <div className="w-12 text-sm font-medium">{item.month}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${width}%` }}
                              />
                            </div>
                            <div className="text-sm font-medium w-20 text-right">{item.value.toLocaleString()} ₽</div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.growth > 0 ? "+" : ""}
                            {item.growth}% к предыдущему месяцу
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* User Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Рост пользователей</CardTitle>
                <CardDescription>Общее количество и новые пользователи</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.userGrowth.map((item, index) => (
                    <div key={item.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <div className="font-medium">{item.month}</div>
                        <div className="text-sm text-muted-foreground">+{item.newUsers} новых</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{item.users.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">всего</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Топ товары</CardTitle>
              <CardDescription>Самые продаваемые товары за месяц</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.sales} продаж</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{product.revenue.toLocaleString()} ₽</div>
                      <div className="text-sm text-muted-foreground">выручка</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
