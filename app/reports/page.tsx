"use client"

import { useState } from "react"
import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { FileText, Download, Plus, Calendar, TrendingUp, Package, Eye, Filter, BarChart, Search } from "lucide-react"
import { FilterButton } from "@/components/filter-button"

const reportsData = [
  {
    id: 1,
    name: "Отчет по продажам за месяц",
    type: "Продажи",
    period: "Январь 2024",
    status: "Готов",
    createdDate: "2024-01-15",
    size: "2.3 MB",
    format: "PDF",
    author: "Система",
    downloads: 45,
  },
  {
    id: 2,
    name: "Аналитика пользователей",
    type: "Пользователи",
    period: "Декабрь 2023",
    status: "Готов",
    createdDate: "2024-01-10",
    size: "1.8 MB",
    format: "Excel",
    author: "Мария Сидорова",
    downloads: 23,
  },
  {
    id: 3,
    name: "Финансовый отчет Q4",
    type: "Финансы",
    period: "Q4 2023",
    status: "Обрабатывается",
    createdDate: "2024-01-16",
    size: "0 MB",
    format: "PDF",
    author: "Алексей Иванов",
    downloads: 0,
  },
  {
    id: 4,
    name: "Отчет по складским остаткам",
    type: "Склад",
    period: "На 15.01.2024",
    status: "Готов",
    createdDate: "2024-01-15",
    size: "956 KB",
    format: "CSV",
    author: "Система",
    downloads: 12,
  },
]

const reportTemplates = [
  {
    id: 1,
    name: "Отчет по продажам",
    description: "Детальная аналитика продаж за выбранный период",
    category: "Продажи",
    fields: ["Период", "Категории товаров", "Менеджеры"],
  },
  {
    id: 2,
    name: "Пользовательская активность",
    description: "Статистика активности и поведения пользователей",
    category: "Пользователи",
    fields: ["Период", "Сегменты пользователей", "Метрики"],
  },
  {
    id: 3,
    name: "Финансовая отчетность",
    description: "Доходы, расходы и прибыль за период",
    category: "Финансы",
    fields: ["Период", "Статьи доходов/расходов", "Валюта"],
  },
  {
    id: 4,
    name: "Складские операции",
    description: "Движение товаров и остатки на складе",
    category: "Склад",
    fields: ["Период", "Склады", "Категории товаров"],
  },
]

export default function ReportsPage() {
  const { toast } = useToast()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [reportConfig, setReportConfig] = useState({
    name: "",
    template: "",
    period: "",
    format: "PDF",
    includeCharts: true,
    includeDetails: true,
    recipients: "",
  })
  const [searchQuery, setSearchQuery] = useState("")

  const handleCreateReport = () => {
    if (reportConfig.name && reportConfig.template && reportConfig.period) {
      toast({
        title: "Отчет создается",
        description: `Отчет "${reportConfig.name}" добавлен в очередь генерации`,
      })
      setReportConfig({
        name: "",
        template: "",
        period: "",
        format: "PDF",
        includeCharts: true,
        includeDetails: true,
        recipients: "",
      })
      setIsCreateDialogOpen(false)
    }
  }

  const handleDownload = (report: any) => {
    toast({
      title: "Скачивание отчета",
      description: `Скачивание файла: ${report.name}`,
    })
  }

  const handleView = (report: any) => {
    toast({
      title: "Просмотр отчета",
      description: `Открытие отчета: ${report.name}`,
    })
  }

  const handleDelete = (report: any) => {
    toast({
      title: "Отчет удален",
      description: `Отчет "${report.name}" удален`,
      variant: "destructive",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Готов":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Готов</Badge>
      case "Обрабатывается":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Обрабатывается
          </Badge>
        )
      case "Ошибка":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Ошибка</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      Продажи: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Пользователи: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Финансы: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Склад: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Отчеты</h1>
              <p className="text-muted-foreground">Создавайте и управляйте отчетами</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-bg hover:opacity-90">
                  <Plus />
                  Создать отчет
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Создание нового отчета</DialogTitle>
                  <DialogDescription>Выберите шаблон и настройте параметры отчета</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="reportName">Название отчета</Label>
                    <Input
                      id="reportName"
                      placeholder="Введите название отчета"
                      value={reportConfig.name}
                      onChange={(e) => setReportConfig({ ...reportConfig, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template">Шаблон отчета</Label>
                    <Select
                      value={reportConfig.template}
                      onValueChange={(value) => {
                        setReportConfig({ ...reportConfig, template: value })
                        setSelectedTemplate(value)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите шаблон отчета" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.name}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedTemplate && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Описание шаблона</CardTitle>
                      </CardHeader>
                      <CardContent>{reportTemplates.find((t) => t.name === selectedTemplate)?.description}</CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="period">Период</Label>
                      <Select
                        value={reportConfig.period}
                        onValueChange={(value) => setReportConfig({ ...reportConfig, period: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите период" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Сегодня</SelectItem>
                          <SelectItem value="yesterday">Вчера</SelectItem>
                          <SelectItem value="week">Эта неделя</SelectItem>
                          <SelectItem value="month">Этот месяц</SelectItem>
                          <SelectItem value="quarter">Этот квартал</SelectItem>
                          <SelectItem value="year">Этот год</SelectItem>
                          <SelectItem value="custom">Произвольный период</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="format">Формат файла</Label>
                      <Select
                        value={reportConfig.format}
                        onValueChange={(value) => setReportConfig({ ...reportConfig, format: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PDF">PDF</SelectItem>
                          <SelectItem value="Excel">Excel</SelectItem>
                          <SelectItem value="CSV">CSV</SelectItem>
                          <SelectItem value="Word">Word</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Дополнительные параметры</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="includeCharts"
                          checked={reportConfig.includeCharts}
                          onChange={(e) => setReportConfig({ ...reportConfig, includeCharts: e.target.checked })}
                          className="rounded"
                        />
                        <Label htmlFor="includeCharts">Включить графики и диаграммы</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="includeDetails"
                          checked={reportConfig.includeDetails}
                          onChange={(e) => setReportConfig({ ...reportConfig, includeDetails: e.target.checked })}
                          className="rounded"
                        />
                        <Label htmlFor="includeDetails">Включить детальные данные</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipients">Получатели (email)</Label>
                    <Input
                      id="recipients"
                      placeholder="email1@example.com, email2@example.com"
                      value={reportConfig.recipients}
                      onChange={(e) => setReportConfig({ ...reportConfig, recipients: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleCreateReport} className="gradient-bg hover:opacity-90">
                      Создать отчет
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
                <CardTitle className="text-sm font-medium">Всего отчетов</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.length}</div>
                <p className="text-xs text-muted-foreground">Созданных отчетов</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Готовых отчетов</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {reportsData.filter((r) => r.status === "Готов").length}
                </div>
                <p className="text-xs text-muted-foreground">Доступны для скачивания</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Скачиваний</CardTitle>
                <Download className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {reportsData.reduce((sum, r) => sum + r.downloads, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Всего скачиваний</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Шаблонов</CardTitle>
                <Package className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{reportTemplates.length}</div>
                <p className="text-xs text-muted-foreground">Доступных шаблонов</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Reports List */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Созданные отчеты</CardTitle>
                    <FilterButton />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Поиск отчетов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  {reportsData.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{report.name}</h4>
                          <p className="text-sm text-muted-foreground">{report.period}</p>
                        </div>
                        <div className="flex space-x-2">
                          {getTypeBadge(report.type)}
                          {getStatusBadge(report.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Создан: {report.createdDate}
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          Формат: {report.format}
                        </div>
                        <div className="flex items-center">
                          <Package className="h-3 w-3 mr-1" />
                          Размер: {report.size}
                        </div>
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          Скачиваний: {report.downloads}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {report.status === "Готов" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => handleView(report)}>
                              <Eye className="mr-1 h-3 w-3" />
                              Просмотр
                            </Button>
                            <Button size="sm" onClick={() => handleDownload(report)}>
                              <Download className="mr-1 h-3 w-3" />
                              Скачать
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleDelete(report)}>
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Report Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Шаблоны отчетов</CardTitle>
                <CardDescription>Доступные шаблоны для создания отчетов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportTemplates.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      {getTypeBadge(template.category)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs font-medium">Поля отчета:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.fields.map((field) => (
                          <Badge key={field} variant="outline" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => {
                        setReportConfig({ ...reportConfig, template: template.name })
                        setSelectedTemplate(template.name)
                        setIsCreateDialogOpen(true)
                      }}
                    >
                      Использовать шаблон
                    </Button>
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
