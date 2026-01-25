"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  Calendar,
  ChevronLeft,
  Download,
} from "lucide-react";

function OrderDetailPage({ params }) {
  // Mock data - replace with API call using params.id
  const order = {
    id: "ORD-2026-001",
    orderDate: "January 20, 2026",
    status: "delivered",
    deliveryDate: "January 23, 2026",
    trackingNumber: "TRK123456789BD",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid",

    shippingAddress: {
      name: "আহমেদ হাসান",
      phone: "+880 1712-345678",
      email: "ahmed.hasan@example.com",
      address: "House 12, Road 5, Dhanmondi",
      city: "Dhaka",
      postalCode: "1205",
    },

    items: [
      {
        id: 1,
        title: "বাংলাদেশের রাজনীতি ও অর্থনীতি",
        author: "রেহমান সোবহান",
        quantity: 2,
        price: 520,
        image: "/images/book1.png",
      },
      {
        id: 2,
        title: "অর্থনীতির কথা",
        author: "আবুল বারকাত",
        quantity: 1,
        price: 360,
        image: "/images/book2.png",
      },
    ],

    pricing: {
      subtotal: 1400,
      shipping: 60,
      discount: 0,
      total: 1460,
    },

    timeline: [
      {
        status: "Order Placed",
        date: "January 20, 2026 - 10:30 AM",
        completed: true,
      },
      {
        status: "Order Confirmed",
        date: "January 20, 2026 - 11:15 AM",
        completed: true,
      },
      {
        status: "Processing",
        date: "January 21, 2026 - 09:00 AM",
        completed: true,
      },
      {
        status: "Shipped",
        date: "January 21, 2026 - 05:30 PM",
        completed: true,
      },
      {
        status: "Out for Delivery",
        date: "January 23, 2026 - 08:00 AM",
        completed: true,
      },
      {
        status: "Delivered",
        date: "January 23, 2026 - 02:45 PM",
        completed: true,
      },
    ],
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: "text-green-600 bg-green-50",
      shipped: "text-blue-600 bg-blue-50",
      processing: "text-yellow-600 bg-yellow-50",
      cancelled: "text-red-600 bg-red-50",
    };
    return colors[status] || colors.processing;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/orders"
          className="mb-6 inline-flex items-center gap-2 font-medium text-emerald-600 hover:text-emerald-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        {/* Order Header */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Order Details
              </h1>
              <p className="text-gray-600">Order ID: {order.id}</p>
            </div>
            <div className="flex gap-3">
              <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${getStatusColor(order.status)}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                <Download className="h-4 w-4" />
                Invoice
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold text-gray-900">{order.orderDate}</p>
              </div>
            </div>
            {order.deliveryDate && (
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Delivered On</p>
                  <p className="font-semibold text-gray-900">
                    {order.deliveryDate}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Tracking Number</p>
                <p className="font-semibold text-gray-900">
                  {order.trackingNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Order Timeline */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Order Timeline
              </h2>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200"></div>

                <div className="space-y-6">
                  {order.timeline.map((item, index) => (
                    <div key={index} className="relative flex gap-4">
                      {/* Timeline Dot */}
                      <div
                        className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                          item.completed
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                        )}
                      </div>

                      {/* Timeline Content */}
                      <div className="flex-1 pb-6">
                        <h3
                          className={`font-semibold ${
                            item.completed ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {item.status}
                        </h3>
                        <p
                          className={`text-sm ${
                            item.completed ? "text-gray-600" : "text-gray-400"
                          }`}
                        >
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Items Ordered
              </h2>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex gap-4">
                      <Link href={`/books/${item.id}`} className="shrink-0">
                        <div className="flex h-28 w-20 items-center justify-center rounded bg-linear-to-br from-emerald-100 to-emerald-50">
                          <span className="text-xs text-gray-400">Cover</span>
                        </div>
                      </Link>
                      <div className="flex-1">
                        <Link href={`/books/${item.id}`}>
                          <h3 className="mb-1 font-semibold text-gray-900 hover:text-emerald-600">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="mb-2 text-sm text-gray-600">
                          {item.author}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-700">
                            Quantity: {item.quantity}
                          </p>
                          <p className="font-bold text-emerald-600">
                            ৳{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 space-y-3 border-t pt-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ৳{order.pricing.subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {order.pricing.shipping === 0
                      ? "FREE"
                      : `৳${order.pricing.shipping}`}
                  </span>
                </div>
                {order.pricing.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -৳{order.pricing.discount}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-3 text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-emerald-600">
                    ৳{order.pricing.total}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <MapPin className="h-5 w-5 text-emerald-600" />
                Shipping Address
              </h2>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-gray-900">
                  {order.shippingAddress.name}
                </p>
                <p className="text-gray-700">{order.shippingAddress.address}</p>
                <p className="text-gray-700">
                  {order.shippingAddress.city} -{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <div className="mt-3 space-y-1 border-t pt-3">
                  <p className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4" />
                    {order.shippingAddress.phone}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4" />
                    {order.shippingAddress.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <CreditCard className="h-5 w-5 text-emerald-600" />
                Payment Information
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-semibold text-gray-900">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="font-semibold text-green-600">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Need Help?
              </h2>
              <div className="space-y-3">
                <button className="w-full rounded-lg bg-emerald-600 py-2 font-medium text-white transition-colors hover:bg-emerald-700">
                  Contact Support
                </button>
                <button className="w-full rounded-lg border border-gray-300 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  Order Again
                </button>
                {order.status === "delivered" && (
                  <button className="w-full rounded-lg border border-emerald-600 py-2 font-medium text-emerald-600 transition-colors hover:bg-emerald-50">
                    Write a Review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
