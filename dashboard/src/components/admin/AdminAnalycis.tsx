import { useState, useEffect } from "react";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from "./AdminLayout";

// Mock API with realistic data
const fetchStats = async (year: string) => {
  const dataByYear: Record<string, any> = {
    "2024": {
      stats: {
        totalUsers: 1280,
        totalOrders: 3420,
        totalDeliveredOrders: 3210,
        totalRevenue: 187500,
      },
      chart: {
        year: "2024",
        monthlyRevenue: [
          12000, 13500, 11800, 14200, 16000, 18500, 19200, 21000, 17800, 16500,
          15200, 14800,
        ],
      },
    },
    "2025": {
      stats: {
        totalUsers: 2150,
        totalOrders: 5890,
        totalDeliveredOrders: 5620,
        totalRevenue: 312400,
      },
      chart: {
        year: "2025",
        monthlyRevenue: [
          22000, 24500, 23000, 26000, 28500, 31000, 33000, 35200, 32000, 29800,
          27500, 26100,
        ],
      },
    },
    "2026": {
      stats: {
        totalUsers: 2840,
        totalOrders: 7620,
        totalDeliveredOrders: 7100,
        totalRevenue: 428900,
      },
      chart: {
        year: "2026",
        monthlyRevenue: [
          32000, 35000, 38500, 41000, 44200, 47500, 51000, 53200, 49800, 46500,
          43200, 41000,
        ],
      },
    },
  };

  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    success: true,
    message: "Stats retrieved successfully",
    data: dataByYear[year] || dataByYear["2026"],
  };
};

const AdminAnalytics = () => {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalDeliveredOrders: 0,
    totalRevenue: 0,
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>(
    Array(12).fill(0),
  );
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const response = await fetchStats(selectedYear);
        if (response.success) {
          setStatsData(response.data.stats);
          setMonthlyRevenue(response.data.chart.monthlyRevenue);
        }
      } catch (error) {
        console.error("Failed to load stats:", error);
        setStatsData({
          totalUsers: 0,
          totalOrders: 0,
          totalDeliveredOrders: 0,
          totalRevenue: 0,
        });
        setMonthlyRevenue(Array(12).fill(0));
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [selectedYear]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const maxRevenue = Math.max(...monthlyRevenue, 1);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Track your store performance
            </p>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : formatCurrency(statsData.totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : statsData.totalOrders.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : statsData.totalUsers.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Delivered Orders
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading
                  ? "..."
                  : statsData.totalDeliveredOrders.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart - FIXED */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Monthly Revenue</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Year:</span>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-16 w-16 flex flex-col justify-between text-right pr-4">
                {[4, 3, 2, 1, 0].map((value) => (
                  <div key={value} className="text-xs text-muted-foreground">
                    {formatCurrency((maxRevenue / 4) * value)}
                  </div>
                ))}
              </div>

              {/* Chart container */}
              <div className="ml-16 h-64">
                {loading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-muted-foreground">
                      Loading chart...
                    </div>
                  </div>
                ) : maxRevenue === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-muted-foreground">
                      No revenue data for {selectedYear}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-end justify-between px-4 pt-8 pb-6">
                    {months.map((month, index) => {
                      const revenue = monthlyRevenue[index] || 0;
                      // Calculate height as percentage of maxRevenue
                      const heightPercent = (revenue / maxRevenue) * 100;

                      return (
                        <div
                          key={month}
                          className="flex flex-col items-center justify-end flex-1 h-full px-1"
                        >
                          {/* Bar */}
                          <div
                            className="w-full bg-emerald-500 rounded-t transition-all duration-300 hover:bg-emerald-600 relative group"
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
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
