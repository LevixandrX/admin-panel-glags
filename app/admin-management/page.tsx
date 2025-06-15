import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { SortableTable, type TableColumn } from "@/components/sortable-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Search, Filter, Plus, Users, Crown, Key, UserCheck } from "lucide-react"

const adminData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Super Admin",
    department: "IT",
    status: "Active",
    lastLogin: "2024-01-16 09:30",
    permissions: ["Full Access", "User Management", "System Config"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Admin",
    department: "Operations",
    status: "Active",
    lastLogin: "2024-01-16 08:15",
    permissions: ["User Management", "Reports", "Analytics"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@company.com",
    role: "Moderator",
    department: "Support",
    status: "Inactive",
    lastLogin: "2024-01-14 16:45",
    permissions: ["Content Management", "User Support"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@company.com",
    role: "Admin",
    department: "Finance",
    status: "Active",
    lastLogin: "2024-01-16 10:20",
    permissions: ["Financial Reports", "User Management"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.wilson@company.com",
    role: "Super Admin",
    department: "Security",
    status: "Active",
    lastLogin: "2024-01-16 07:00",
    permissions: ["Full Access", "Security Management", "Audit Logs"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const getRoleBadge = (role: string) => {
  switch (role) {
    case "Super Admin":
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <Crown className="w-3 h-3 mr-1" />
          Super Admin
        </Badge>
      )
    case "Admin":
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          <Shield className="w-3 h-3 mr-1" />
          Admin
        </Badge>
      )
    case "Moderator":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <Key className="w-3 h-3 mr-1" />
          Moderator
        </Badge>
      )
    default:
      return <Badge variant="secondary">{role}</Badge>
  }
}

const getStatusBadge = (status: string) => {
  return status === "Active" ? (
    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
      <UserCheck className="w-3 h-3 mr-1" />
      Active
    </Badge>
  ) : (
    <Badge variant="secondary">Inactive</Badge>
  )
}

const columns: TableColumn[] = [
  {
    key: "name",
    label: "Admin",
    sortable: true,
    render: (value, row) => (
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.avatar || "/placeholder.svg"} alt={value} />
          <AvatarFallback>
            {value
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    label: "Role",
    sortable: true,
    render: (value) => getRoleBadge(value),
  },
  { key: "department", label: "Department", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => getStatusBadge(value),
  },
  { key: "lastLogin", label: "Last Login", sortable: true },
  {
    key: "permissions",
    label: "Permissions",
    sortable: false,
    render: (value) => (
      <div className="flex flex-wrap gap-1">
        {value.slice(0, 2).map((permission: string, index: number) => (
          <Badge key={index} variant="outline" className="text-xs">
            {permission}
          </Badge>
        ))}
        {value.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{value.length - 2} more
          </Badge>
        )}
      </div>
    ),
  },
]

export default function AdminManagementPage() {
  const handleEdit = (row: any) => {
    console.log("Edit admin:", row)
  }

  const handleDelete = (row: any) => {
    console.log("Delete admin:", row)
  }

  const totalAdmins = adminData.length
  const activeAdmins = adminData.filter((admin) => admin.status === "Active").length
  const superAdmins = adminData.filter((admin) => admin.role === "Super Admin").length

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Management</h1>
              <p className="text-muted-foreground">Manage administrator accounts and permissions</p>
            </div>
            <Button className="gradient-bg hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Add Admin
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAdmins}</div>
                <p className="text-xs text-muted-foreground">Administrator accounts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Admins</CardTitle>
                <UserCheck className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{activeAdmins}</div>
                <p className="text-xs text-muted-foreground">Currently active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
                <Crown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{superAdmins}</div>
                <p className="text-xs text-muted-foreground">Full access accounts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Departments</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Admin departments</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search administrators..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Admin Table */}
          <Card>
            <CardHeader>
              <CardTitle>Administrator Accounts</CardTitle>
              <CardDescription>Manage administrator accounts, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <SortableTable columns={columns} data={adminData} onEdit={handleEdit} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
