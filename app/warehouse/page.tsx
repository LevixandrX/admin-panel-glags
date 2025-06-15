import { RouteGuard } from "@/components/route-guard"
import { AdminLayout } from "@/components/admin-layout"
import { SortableTable, type TableColumn } from "@/components/sortable-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Search, Filter, Plus, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const warehouseData = [
  {
    id: 1,
    itemCode: "WH-001",
    itemName: "Wireless Headphones",
    category: "Electronics",
    quantity: 150,
    location: "A-1-01",
    status: "In Stock",
    lastUpdated: "2024-01-15",
    supplier: "TechCorp",
    unitPrice: 89.99,
  },
  {
    id: 2,
    itemCode: "WH-002",
    itemName: "Gaming Mouse",
    category: "Electronics",
    quantity: 5,
    location: "A-1-02",
    status: "Low Stock",
    lastUpdated: "2024-01-14",
    supplier: "GameTech",
    unitPrice: 45.5,
  },
  {
    id: 3,
    itemCode: "WH-003",
    itemName: "Office Chair",
    category: "Furniture",
    quantity: 0,
    location: "B-2-01",
    status: "Out of Stock",
    lastUpdated: "2024-01-13",
    supplier: "FurniCorp",
    unitPrice: 299.99,
  },
  {
    id: 4,
    itemCode: "WH-004",
    itemName: "Laptop Stand",
    category: "Accessories",
    quantity: 75,
    location: "A-3-01",
    status: "In Stock",
    lastUpdated: "2024-01-16",
    supplier: "AccessoryPlus",
    unitPrice: 35.0,
  },
  {
    id: 5,
    itemCode: "WH-005",
    itemName: "Bluetooth Speaker",
    category: "Electronics",
    quantity: 25,
    location: "A-1-03",
    status: "In Stock",
    lastUpdated: "2024-01-15",
    supplier: "AudioTech",
    unitPrice: 129.99,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "In Stock":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          In Stock
        </Badge>
      )
    case "Low Stock":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Low Stock
        </Badge>
      )
    case "Out of Stock":
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <Clock className="w-3 h-3 mr-1" />
          Out of Stock
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const columns: TableColumn[] = [
  { key: "itemCode", label: "Item Code", sortable: true },
  { key: "itemName", label: "Item Name", sortable: true },
  { key: "category", label: "Category", sortable: true },
  {
    key: "quantity",
    label: "Quantity",
    sortable: true,
    render: (value) => <span className="font-mono">{value}</span>,
  },
  { key: "location", label: "Location", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => getStatusBadge(value),
  },
  { key: "supplier", label: "Supplier", sortable: true },
  {
    key: "unitPrice",
    label: "Unit Price",
    sortable: true,
    render: (value) => <span className="font-mono">${value}</span>,
  },
]

export default function WarehousePage() {
  const handleEdit = (row: any) => {
    console.log("Edit:", row)
  }

  const handleDelete = (row: any) => {
    console.log("Delete:", row)
  }

  const totalItems = warehouseData.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockItems = warehouseData.filter((item) => item.quantity <= 10).length
  const outOfStockItems = warehouseData.filter((item) => item.quantity === 0).length

  return (
    <RouteGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Warehouse Management</h1>
              <p className="text-muted-foreground">Track and manage your inventory items</p>
            </div>
            <Button className="gradient-bg hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalItems}</div>
                <p className="text-xs text-muted-foreground">Items in warehouse</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
                <p className="text-xs text-muted-foreground">Items need restocking</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                <Clock className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
                <p className="text-xs text-muted-foreground">Items unavailable</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Product categories</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search items..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Warehouse Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Complete list of all warehouse items with stock levels and locations</CardDescription>
            </CardHeader>
            <CardContent>
              <SortableTable columns={columns} data={warehouseData} onEdit={handleEdit} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </RouteGuard>
  )
}
