import { Request } from "express";
import { prisma } from "../../../utils/prisma";

const getStats = async (req: Request) => {
  const { year } = req.query;
  const currentYear = year || new Date().getFullYear();

  // Dates for chart
  const startOfYear = new Date(Number(currentYear), 0, 1);
  const endOfYear = new Date(Number(currentYear), 11, 31, 23, 59, 59, 999);

  const [
    totalUsers,
    totalOrders,
    totalDeliveredOrders,
    totalRevenueAgg,
    monthlyRevenue,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "USER" } }),

    prisma.order.count(),

    prisma.order.count({ where: { status: "DELIVERED" } }),

    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: "DELIVERED" },
    }),

    // Monthly revenue for chart
    prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        status: "DELIVERED",
        createdAt: { gte: startOfYear, lte: endOfYear },
      },
      _sum: { totalAmount: true },
    }),
  ]);

  const revenueByMonth = Array(12).fill(0);
  monthlyRevenue.forEach((item) => {
    const month = item.createdAt.getMonth();
    revenueByMonth[month] += item._sum.totalAmount || 0;
  });

  return {
    stats: {
      totalUsers,
      totalOrders,
      totalDeliveredOrders,
      totalRevenue: totalRevenueAgg._sum.totalAmount || 0,
    },
    chart: {
      year: currentYear,
      monthlyRevenue: revenueByMonth,
    },
  };
};

export const DashboardServices = {
  getStats,
};
