import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from "./AdminLayout";

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("7days");

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+15.3%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Total Customers",
      value: "892",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Products Sold",
      value: "3,456",
      change: "-2.4%",
      trend: "down",
      icon: Package,
    },
  ];

  const salesData = [
    { day: "Mon", revenue: 4200, orders: 45 },
    { day: "Tue", revenue: 5100, orders: 52 },
    { day: "Wed", revenue: 4800, orders: 48 },
    { day: "Thu", revenue: 6200, orders: 65 },
    { day: "Fri", revenue: 7100, orders: 72 },
    { day: "Sat", revenue: 8500, orders: 89 },
    { day: "Sun", revenue: 6800, orders: 71 },
  ];

  const topProducts = [
    { name: "Men's Winter Collection Blazer", sales: 234, revenue: 44226 },
    { name: "Women's Casual Hoodie", sales: 189, revenue: 24381 },
    { name: "Classic Checkered Shirt", sales: 156, revenue: 12324 },
    { name: "Slim Fit Casual Pants", sales: 145, revenue: 12905 },
    { name: "Cotton V-Neck T-Shirt", sales: 132, revenue: 5148 },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", amount: 347.00, status: "Delivered" },
    { id: "ORD-002", customer: "Jane Smith", amount: 218.00, status: "Processing" },
    { id: "ORD-003", customer: "Mike Johnson", amount: 159.00, status: "Shipped" },
    { id: "ORD-004", customer: "Sarah Williams", amount: 456.00, status: "Pending" },
  ];

  const maxRevenue = Math.max(...salesData.map(d => d.revenue));

  return (
    <AdminLayout>
        <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your store performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">from last period</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.map((item) => (
              <div key={item.day} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">{item.day}</div>
                <div className="flex-1">
                  <div className="h-8 bg-muted rounded-md overflow-hidden">
                    <div
                      className="h-full bg-primary flex items-center justify-end pr-2 text-xs text-primary-foreground font-medium transition-all"
                      style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                    >
                      ${item.revenue.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="w-16 text-sm text-muted-foreground text-right">
                  {item.orders} orders
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.sales} units sold
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground mt-1">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.amount.toFixed(2)}</p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Shipped"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Blazers & Jackets", sales: 324, percentage: 28 },
              { name: "T-Shirts", sales: 289, percentage: 25 },
              { name: "Casual Pants", sales: 245, percentage: 21 },
              { name: "Sweaters & Hoodies", sales: 187, percentage: 16 },
              { name: "Casual Shirts", sales: 112, percentage: 10 },
            ].map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {category.sales} sales ({category.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;