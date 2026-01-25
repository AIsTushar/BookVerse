import { useState } from "react";
import { Search, Filter, Download, Eye, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from "@/components/admin/AdminLayout";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: string;
  payment: string;
}

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      customer: "John Doe",
      date: "2024-01-25",
      items: 3,
      total: 347.00,
      status: "Delivered",
      payment: "Paid",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      customer: "Jane Smith",
      date: "2024-01-24",
      items: 2,
      total: 218.00,
      status: "Processing",
      payment: "Paid",
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      customer: "Mike Johnson",
      date: "2024-01-23",
      items: 1,
      total: 159.00,
      status: "Shipped",
      payment: "Paid",
    },
    {
      id: "4",
      orderNumber: "ORD-2024-004",
      customer: "Sarah Williams",
      date: "2024-01-22",
      items: 4,
      total: 456.00,
      status: "Pending",
      payment: "Pending",
    },
    {
      id: "5",
      orderNumber: "ORD-2024-005",
      customer: "David Brown",
      date: "2024-01-21",
      items: 2,
      total: 298.00,
      status: "Cancelled",
      payment: "Refunded",
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Delivered: "bg-green-100 text-green-800",
      Processing: "bg-blue-100 text-blue-800",
      Shipped: "bg-purple-100 text-purple-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getPaymentColor = (payment: string) => {
    const colors: Record<string, string> = {
      Paid: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Refunded: "bg-gray-100 text-gray-800",
    };
    return colors[payment] || "bg-gray-100 text-gray-800";
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
        <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage and track customer orders</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4 font-medium">Order</th>
              <th className="text-left p-4 font-medium">Customer</th>
              <th className="text-left p-4 font-medium">Date</th>
              <th className="text-left p-4 font-medium">Items</th>
              <th className="text-left p-4 font-medium">Total</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Payment</th>
              <th className="w-[50px] p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No orders found</p>
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{order.orderNumber}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">{order.items}</td>
                  <td className="p-4 font-medium">${order.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentColor(order.payment)}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDetailOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p className="font-medium">{selectedOrder?.customer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{selectedOrder?.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder?.status || "")}`}>
                  {selectedOrder?.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentColor(selectedOrder?.payment || "")}`}>
                  {selectedOrder?.payment}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Order Summary</p>
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span>Items ({selectedOrder?.items})</span>
                  <span>${selectedOrder?.total.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${selectedOrder?.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </AdminLayout>
  );
};

export default AdminOrders;