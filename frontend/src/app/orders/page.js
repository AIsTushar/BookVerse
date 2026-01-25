"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Clock, CheckCircle, XCircle, Eye } from "lucide-react";

function OrdersPage() {
  const [orders] = useState([
    {
      id: "ORD-2026-001",
      date: "January 20, 2026",
      status: "delivered",
      total: 1400,
      items: [
        {
          id: 1,
          title: "বাংলাদেশের রাজনীতি ও অর্থনীতি",
          author: "রেহমান সোবহান",
          quantity: 2,
          price: 520,
        },
        {
          id: 2,
          title: "অর্থনীতির কথা",
          author: "আবুল বারকাত",
          quantity: 1,
          price: 360,
        },
      ],
    },
    {
      id: "ORD-2026-002",
      date: "January 18, 2026",
      status: "processing",
      total: 550,
      items: [
        {
          id: 3,
          title: "বাংলাদেশের ইতিহাস",
          author: "সালাহউদ্দিন আহমেদ",
          quantity: 1,
          price: 550,
        },
      ],
    },
    {
      id: "ORD-2026-003",
      date: "January 15, 2026",
      status: "shipped",
      total: 760,
      items: [
        {
          id: 4,
          title: "রাজনীতির পাঠশালা",
          author: "মুহাম্মদ হাবিবুর রহমান",
          quantity: 2,
          price: 380,
        },
      ],
    },
    {
      id: "ORD-2025-004",
      date: "December 28, 2025",
      status: "cancelled",
      total: 450,
      items: [
        {
          id: 5,
          title: "সমাজতত্ত্ব পরিচিতি",
          author: "আনিসুজ্জামান",
          quantity: 1,
          price: 450,
        },
      ],
    },
  ]);

  const getStatusConfig = (status) => {
    const configs = {
      delivered: {
        label: "Delivered",
        color: "text-green-600 bg-green-50",
        icon: CheckCircle,
      },
      shipped: {
        label: "Shipped",
        color: "text-blue-600 bg-blue-50",
        icon: Package,
      },
      processing: {
        label: "Processing",
        color: "text-yellow-600 bg-yellow-50",
        icon: Clock,
      },
      cancelled: {
        label: "Cancelled",
        color: "text-red-600 bg-red-50",
        icon: XCircle,
      },
    };
    return configs[status] || configs.processing;
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <Package className="mx-auto mb-4 h-24 w-24 text-gray-300" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              No orders yet
            </h2>
            <p className="mb-6 text-gray-600">
              Start shopping to see your orders here!
            </p>
            <Link
              href="/books"
              className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={order.id}
                className="overflow-hidden rounded-lg bg-white shadow-sm"
              >
                {/* Order Header */}
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-semibold text-gray-900">
                          {order.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-semibold text-gray-900">
                          {order.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-semibold text-emerald-600">
                          ৳{order.total}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${statusConfig.color}`}
                      >
                        <StatusIcon className="h-4 w-4" />
                        {statusConfig.label}
                      </span>
                      <Link
                        href={`/orders/${order.id}`}
                        className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded bg-linear-to-br from-emerald-100 to-emerald-50">
                          <span className="text-xs text-gray-400">Cover</span>
                        </div>
                        <div className="flex-1">
                          <Link href={`/books/${item.id}`}>
                            <h3 className="mb-1 font-medium text-gray-900 hover:text-emerald-600">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="mb-1 text-sm text-gray-600">
                            {item.author}
                          </p>
                          <p className="text-sm text-gray-700">
                            Quantity: {item.quantity} × ৳{item.price} ={" "}
                            <span className="font-semibold">
                              ৳{item.quantity * item.price}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3 border-t border-gray-200 pt-4">
                    {order.status === "delivered" && (
                      <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
                        Write a Review
                      </button>
                    )}
                    {order.status === "processing" && (
                      <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">
                        Cancel Order
                      </button>
                    )}
                    <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                      Order Again
                    </button>
                    <Link
                      href={`/orders/${order.id}`}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
