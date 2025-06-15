import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { SortableTable, type TableColumn } from "@/components/sortable-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Filter, Plus, Mail, MessageSquare, FileImage, Code } from "lucide-react"

const templatesData = [
  {
    id: 1,
    name: "Welcome Email",
    description: "Email template for new user registration",
    type: "Email",
    category: "User Onboarding",
    status: "Active",
    lastModified: "2024-01-15",
    author: "Sarah Johnson",
    usage: 1250,
    size: "12 KB",
  },
  {
    id: 2,
    name: "Invoice Template",
    description: "Professional invoice template for billing",
    type: "Document",
    category: "Finance",
    status: "Active",
    lastModified: "2024-01-14",
    author: "Mike Davis",
    usage: 890,
    size: "25 KB",
  },
  {
    id: 3,
    name: "Password Reset",
    description: "Email template for password reset requests",
    type: "Email",
    category: "Security",
    status: "Active",
    lastModified: "2024-01-13",
    author: "Emily Chen",
    usage: 456,
    size: "8 KB",
  },
  {
    id: 4,
    name: "Newsletter Template",
    description: "Monthly newsletter template",
    type: "Email",
    category: "Marketing",
    status: "Draft",
    lastModified: "2024-01-12",
    author: "John Smith",
    usage: 0,
    size: "18 KB",
  },
  {
    id: 5,
    name: "Report Template",
    description: "Standard report template for analytics",
    type: "Document",
    category: "Reports",
    status: "Active",
    lastModified: "2024-01-16",
    author: "Robert Wilson",
    usage: 234,
    size: "32 KB",
  },
  {
    id: 6,
    name: "SMS Notification",
    description: "SMS template for urgent notifications",
    type: "SMS",
    category: "Notifications",
    status: "Active",
    lastModified: "2024-01-11",
    author: "Sarah Johnson",
    usage: 678,
    size: "2 KB",
  },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Email":
      return <Mail className="w-4 h-4" />
    case "SMS":
      return <MessageSquare className="w-4 h-4" />
    case "Document":
      return <FileImage className="w-4 h-4" />
    default:
      return <Code className="w-4 h-4" />
  }
}

const getTypeBadge = (type: string) => {
  const colors = {
    Email: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    SMS: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Document: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  }

  return (
    <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
      {getTypeIcon(type)}
      <span className="ml-1">{type}</span>
    </Badge>
  )
}

const getStatusBadge = (status: string) => {
  return status === "Active" ? (
    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
  ) : (
    <Badge variant="secondary">Draft</Badge>
  )
}

const columns: TableColumn[] = [
  {
    key: "name",
    label: "Template",
    sortable: true,
    render: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-muted-foreground">{row.description}</div>
      </div>
    ),
  },
  {
    key: "type",
    label: "Type",
    sortable: true,
    render: (value) => getTypeBadge(value),
  },
  { key: "category", label: "Category", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => getStatusBadge(value),
  },
  { key: "author", label: "Author", sortable: true },
  {
    key: "usage",
    label: "Usage",
    sortable: true,
    render: (value) => <span className="font-mono">{value.toLocaleString()}</span>,
  },
  { key: "size", label: "Size", sortable: true },
  { key: "lastModified", label: "Last Modified", sortable: true },
]

export default function TemplatesPage() {
  const handleEdit = (row: any) => {
    console.log("Edit template:", row)
  }

  const handleDelete = (row: any) => {
    console.log("Delete template:", row)
  }

  const totalTemplates = templatesData.length
  const activeTemplates = templatesData.filter((template) => template.status === "Active").length
  const totalUsage = templatesData.reduce((sum, template) => sum + template.usage, 0)

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
              <p className="text-muted-foreground">Manage email, document, and notification templates</p>
            </div>
            <Button className="gradient-bg hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTemplates}</div>
                <p className="text-xs text-muted-foreground">Available templates</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Templates</CardTitle>
                <Mail className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{activeTemplates}</div>
                <p className="text-xs text-muted-foreground">Currently in use</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
                <MessageSquare className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{totalUsage.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Times used</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <FileImage className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">Template categories</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search templates..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Templates Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Templates</CardTitle>
              <CardDescription>Manage your email, document, and notification templates</CardDescription>
            </CardHeader>
            <CardContent>
              <SortableTable columns={columns} data={templatesData} onEdit={handleEdit} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
