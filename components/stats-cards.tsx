import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

const stats = [
  {
    title: "Всего пользователей",
    value: "2,543",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    description: "Активных пользователей в этом месяце",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Выручка",
    value: "₽1,234,567",
    change: "+8%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "Общая выручка за месяц",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Заказы",
    value: "1,234",
    change: "-3%",
    changeType: "negative" as const,
    icon: ShoppingCart,
    description: "Обработанных заказов",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Рост",
    value: "23.5%",
    change: "+5%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "Темп роста",
    color: "from-purple-500 to-pink-500",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up min-w-0 max-w-full"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}
          />

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center text-xs font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {stat.change}
              </div>
              <span className="text-xs text-muted-foreground">с прошлого месяца</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
