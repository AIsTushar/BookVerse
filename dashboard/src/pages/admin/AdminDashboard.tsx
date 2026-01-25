import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  MoreHorizontal,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from "@/components/admin/AdminLayout";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-xl">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

const recentOrders = [
  {
    id: "#ORD-7821",
    customer: "Sarah Johnson",
    product: "Winter Blazer",
    amount: "$189.00",
    status: "Delivered",
    avatar: "SJ",
  },
  {
    id: "#ORD-7820",
    customer: "Michael Chen",
    product: "Casual Shirt",
    amount: "$79.00",
    status: "Processing",
    avatar: "MC",
  },
  {
    id: "#ORD-7819",
    customer: "Emily Davis",
    product: "Women's Hoodie",
    amount: "$129.00",
    status: "Shipped",
    avatar: "ED",
  },
  {
    id: "#ORD-7818",
    customer: "James Wilson",
    product: "Denim Jacket",
    amount: "$249.00",
    status: "Pending",
    avatar: "JW",
  },
  {
    id: "#ORD-7817",
    customer: "Priya Patel",
    product: "Cotton Pants",
    amount: "$89.00",
    status: "Delivered",
    avatar: "PP",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-success/10 text-success border-success/20";
    case "Shipped":
      return "bg-info/10 text-info border-info/20";
    case "Processing":
      return "bg-warning/10 text-warning border-warning/20";
    case "Pending":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

// Mock API function for chart data
const fetchChartData = async (year: string) => {
  const dataByYear: Record<string, any> = {
    "2024": {
      monthlyRevenue: [
        12000, 13500, 11800, 14200, 16000, 18500, 19200, 21000, 17800, 16500,
        15200, 14800,
      ],
    },
    "2025": {
      monthlyRevenue: [
        22000, 24500, 23000, 26000, 28500, 31000, 33000, 35200, 32000, 29800,
        27500, 26100,
      ],
    },
    "2026": {
      monthlyRevenue: [
        32000, 35000, 38500, 41000, 44200, 47500, 51000, 53200, 49800, 46500,
        43200, 41000,
      ],
    },
  };

  await new Promise((resolve) => setTimeout(resolve, 300));
  return dataByYear[year] || dataByYear["2026"];
};

const AdminDashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>([]);
  const [chartLoading, setChartLoading] = useState(true);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // This would come from your backend API
  const backendData = {
    success: true,
    message: "Stats retrieved successfully",
    data: {
      stats: {
        totalUsers: 2,
        totalOrders: 0,
        totalDeliveredOrders: 0,
        totalRevenue: 0,
      },
      chart: {
        year: "2026",
        monthlyRevenue: Array(12).fill(0),
      },
    },
  };

  useEffect(() => {
    const loadChartData = async () => {
      setChartLoading(true);
      const data = await fetchChartData(selectedYear);
      setMonthlyRevenue(data.monthlyRevenue);
      setChartLoading(false);
    };

    loadChartData();
  }, [selectedYear]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statsData = backendData.data.stats;
  const maxRevenue = Math.max(...monthlyRevenue, 1);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your store overview.
            </p>
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
            value={formatCurrency(statsData.totalRevenue)}
            icon={<DollarSign className="h-5 w-5 text-primary" />}
          />
          <StatCard
            title="Total Orders"
            value={statsData.totalOrders.toLocaleString()}
            icon={<ShoppingBag className="h-5 w-5 text-primary" />}
          />
          <StatCard
            title="Total Customers"
            value={statsData.totalUsers.toLocaleString()}
            icon={<Users className="h-5 w-5 text-primary" />}
          />
          <StatCard
            title="Delivered Orders"
            value={statsData.totalDeliveredOrders.toLocaleString()}
            icon={<Package className="h-5 w-5 text-primary" />}
          />
        </div>

        {/* Side-by-side Section: Chart (2/3) + Orders (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart - Takes 2/3 width */}
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Monthly Revenue
                </CardTitle>
                <CardDescription>Revenue overview by month</CardDescription>
              </div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {chartLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-3">
                      Loading chart data...
                    </p>
                  </div>
                </div>
              ) : maxRevenue === 0 ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    No revenue data available for {selectedYear}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Chart container */}
                  <div className="relative">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-right pr-4">
                      {[4, 3, 2, 1, 0].map((value) => (
                        <div
                          key={value}
                          className="text-xs text-muted-foreground"
                        >
                          {formatCurrency((maxRevenue / 4) * value)}
                        </div>
                      ))}
                    </div>

                    {/* Chart bars */}
                    <div className="ml-16 h-64">
                      <div className="h-full flex items-end justify-between px-4 pt-8 pb-6">
                        {months.map((month, index) => {
                          const revenue = monthlyRevenue[index] || 0;
                          const heightPercent = (revenue / maxRevenue) * 100;

                          return (
                            <div
                              key={month}
                              className="flex flex-col items-center justify-end flex-1 h-full px-1"
                            >
                              {/* Bar */}
                              <div
                                className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t transition-all duration-300 hover:from-emerald-600 hover:to-emerald-500 relative group"
                                style={{
                                  height: `${heightPercent}%`,
                                  minHeight: revenue > 0 ? "4px" : "0",
                                }}
                              >
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                  {formatCurrency(revenue)}
                                </div>
                              </div>

                              {/* Month label */}
                              <div className="mt-2 text-xs text-muted-foreground">
                                {month}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Total:{" "}
                      <span className="font-semibold text-foreground">
                        {formatCurrency(
                          monthlyRevenue.reduce((a, b) => a + b, 0),
                        )}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Peak month: {months[monthlyRevenue.indexOf(maxRevenue)]}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders - Takes 1/3 width */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Recent Orders
                </CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {recentOrders.length > 0 ? (
                <div className="space-y-0">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                            {order.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">
                            {order.customer}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {order.product}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium px-2 py-0.5 ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </Badge>
                        <span className="font-semibold text-sm">
                          {order.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No recent orders found
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
