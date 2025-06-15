"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const chartData = [
  { month: "Янв", revenue: 400000, users: 240 },
  { month: "Фев", revenue: 300000, users: 139 },
  { month: "Мар", revenue: 200000, users: 980 },
  { month: "Апр", revenue: 278000, users: 390 },
  { month: "Май", revenue: 189000, users: 480 },
  { month: "Июн", revenue: 239000, users: 380 },
]

export function AnalyticsChart() {
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue))

  return (
    <Card className="chart-container animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Аналитика выручки
        </CardTitle>
        <CardDescription>Месячная выручка и рост пользователей за последние 6 месяцев</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {chartData.map((data, index) => (
            <div key={data.month} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium">{data.month}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${(data.revenue / maxRevenue) * 100}%`,
                        animationDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                  <div className="text-sm font-medium w-20 text-right">₽{data.revenue.toLocaleString()}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{data.users} пользователей</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span>+12.5% с прошлого периода</span>
          </div>
          <div className="text-muted-foreground">
            Итого: ₽{chartData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
