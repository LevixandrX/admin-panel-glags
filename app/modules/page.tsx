import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { SortableTable, type TableColumn } from "@/components/sortable-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Puzzle, Search, Filter, Plus, CheckCircle, XCircle, Clock, Settings } from "lucide-react"

const modulesData = [
  {
    id: 1,
    name: "User Management",
    description: "Manage user accounts, roles, and permissions",
    version: "2.1.4",
    status: "Active",
    category: "Core",
    lastUpdated: "2024-01-15",
    dependencies: ["Authentication", "Database"],
    size: "2.3 MB",
    enabled: true,
  },
  {
    id: 2,
    name: "Analytics Dashboard",
    description: "Advanced analytics and reporting tools",
    version: "1.8.2",
    status: "Active",
    category: "Analytics",
    lastUpdated: "2024-01-14",
    dependencies: ["Charts", "Database"],
    size: "4.1 MB",
    enabled: true,
  },
  {
    id: 3,
    name: "Email Notifications",
    description: "Send automated email notifications",
    version: "1.5.0",
    status: "Inactive",
    category: "Communication",
    lastUpdated: "2024-01-10",
    dependencies: ["SMTP", "Templates"],
    size: "1.2 MB",
    enabled: false,
  },
  {
    id: 4,
    name: "File Manager",
    description: "Upload, organize, and manage files",
    version: "3.0.1",
    status: "Active",
    category: "Storage",
    lastUpdated: "2024-01-16",
    dependencies: ["Storage", "Security"],
    size: "3.7 MB",
    enabled: true,
  },
  {
    id: 5,
    name: "Payment Gateway",
    description: "Process payments and manage transactions",
    version: "2.4.0",
    status: "Pending Update",
    category: "Finance",
    lastUpdated: "2024-01-12",
    dependencies: ["Security", "Database"],
    size: "5.2 MB",
    enabled: true,
  },
  {
    id: 6,
    name: "Chat Support",
    description: "Real-time customer support chat",
    version: "1.3.1",
    status: "Active",
    category: "Communication",
    lastUpdated: "2024-01-13",
    dependencies: ["WebSocket", "Database"],
    size: "2.8 MB",
    enabled: true,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
        </Badge>
      )
    case "Inactive":
      return (
        <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
          <XCircle className="w-3 h-3 mr-1" />
          Inactive
        </Badge>
      )
    case "Pending Update":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          Pending Update
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getCategoryBadge = (category: string) => {
  const colors = {
    Core: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Analytics: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    Communication: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Storage: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    Finance: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
}

const columns: TableColumn[] = [
  {
    key: "name",
    label: "Module",
    sortable: true,
    render: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-muted-foreground">{row.description}</div>
      </div>
    ),
  },
  { key: "version", label: "Version", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => getStatusBadge(value),
  },
  {
    key: "category",
    label: "Category",
    sortable: true,
    render: (value) => getCategoryBadge(value),
  },
  { key: "size", label: "Size", sortable: true },
  { key: "lastUpdated", label: "Last Updated", sortable: true },
  {
    key: "enabled",
    label: "Enabled",
    sortable: false,
    render: (value) => <Switch checked={value} />,
  },
]

export default function ModulesPage() {
  const handleEdit = (row: any) => {
    console.log("Configure module:", row)
  }

  const handleDelete = (row: any) => {
    console.log("Uninstall module:", row)
  }

  const totalModules = modulesData.length
  const activeModules = modulesData.filter((module) => module.status === "Active").length
  const pendingUpdates = modulesData.filter((module) => module.status === "Pending Update").length

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Modules</h1>
              <p className="text-muted-foreground">Manage system modules and extensions</p>
            </div>
            <Button className="gradient-bg hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Install Module
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
                <Puzzle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalModules}</div>
                <p className="text-xs text-muted-foreground">Installed modules</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{activeModules}</div>
                <p className="text-xs text-muted-foreground">Currently running</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Updates</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{pendingUpdates}</div>
                <p className="text-xs text-muted-foreground">Need updates</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Module categories</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search modules..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Modules Table */}
          <Card>
            <CardHeader>
              <CardTitle>Installed Modules</CardTitle>
              <CardDescription>
                Manage your system modules, enable/disable features, and check for updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SortableTable columns={columns} data={modulesData} onEdit={handleEdit} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
