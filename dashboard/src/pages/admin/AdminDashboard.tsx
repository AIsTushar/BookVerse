import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminLayout from "@/components/admin/AdminLayout";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: "up" | "down";
}

const StatCard = ({ title, value, change, icon, trend }: StatCardProps) => (
  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          <div className="flex items-center gap-1">
            {trend === "up" ? (
              <ArrowUpRight className="h-4 w-4 text-success" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-destructive" />
            )}
            <span className={`text-sm font-medium ${trend === "up" ? "text-success" : "text-destructive"}`}>
              {change}%
            </span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div className="p-3 bg-primary/10 rounded-xl">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const recentOrders = [
  { id: "#ORD-7821", customer: "Sarah Johnson", product: "Winter Blazer", amount: "$189.00", status: "Delivered", avatar: "SJ" },
  { id: "#ORD-7820", customer: "Michael Chen", product: "Casual Shirt", amount: "$79.00", status: "Processing", avatar: "MC" },
  { id: "#ORD-7819", customer: "Emily Davis", product: "Women's Hoodie", amount: "$129.00", status: "Shipped", avatar: "ED" },
  { id: "#ORD-7818", customer: "James Wilson", product: "Denim Jacket", amount: "$249.00", status: "Pending", avatar: "JW" },
  { id: "#ORD-7817", customer: "Priya Patel", product: "Cotton Pants", amount: "$89.00", status: "Delivered", avatar: "PP" },
];

const topProducts = [
  { name: "Men's Winter Collection Blazer", category: "Blazers & Jackets", sales: 234, revenue: "$44,226", image: "/placeholder.svg" },
  { name: "Women's Casual Hoodie", category: "Sweaters & Hoodies", sales: 189, revenue: "$24,381", image: "/placeholder.svg" },
  { name: "Classic Checkered Shirt", category: "Casual Shirts", sales: 156, revenue: "$12,324", image: "/placeholder.svg" },
  { name: "Slim Fit Casual Pants", category: "Casual Pants", sales: 143, revenue: "$12,727", image: "/placeholder.svg" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered": return "bg-success/10 text-success border-success/20";
    case "Shipped": return "bg-info/10 text-info border-info/20";
    case "Processing": return "bg-warning/10 text-warning border-warning/20";
    case "Pending": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Download Report
            </Button>
            <Button size="sm">
              <Package className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value="$124,592"
            change={12.5}
            trend="up"
            icon={<DollarSign className="h-5 w-5 text-primary" />}
          />
          <StatCard
            title="Total Orders"
            value="1,842"
            change={8.2}
            trend="up"
            icon={<ShoppingBag className="h-5 w-5 text-primary" />}
          />
          <StatCard
            title="Total Customers"
            value="12,459"
            change={5.1}
            trend="up"
            icon={<Users className="h-5 w-5 text-primary" />}
          />
          <StatCard
            title="Pending Orders"
            value="24"
            change={-3.2}
            trend="down"
            icon={<Package className="h-5 w-5 text-primary" />}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                          {order.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.product}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={`text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                      <span className="font-semibold text-sm w-20 text-right">{order.amount}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
                <CardDescription>Best sellers this month</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{product.revenue}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
                <p className="text-lg font-bold">3.24%</p>
              </div>
            </div>
          </Card>
          <Card className="border-0 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <Eye className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Page Views</p>
                <p className="text-lg font-bold">45.2K</p>
              </div>
            </div>
          </Card>
          <Card className="border-0 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <ShoppingBag className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg. Order Value</p>
                <p className="text-lg font-bold">$67.80</p>
              </div>
            </div>
          </Card>
          <Card className="border-0 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Users</p>
                <p className="text-lg font-bold">892</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
