"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "বাংলাদেশের রাজনীতি ও অর্থনীতি",
      author: "রেহমান সোবহান",
      price: 650,
      discountedPrice: 520,
      quantity: 2,
      image: "/images/book1.png",
    },
    {
      id: 2,
      title: "অর্থনীতির কথা",
      author: "আবুল বারকাত",
      price: 450,
      discountedPrice: 360,
      quantity: 1,
      image: "/images/book2.png",
    },
    {
      id: 3,
      title: "বাংলাদেশের ইতিহাস",
      author: "সালাহউদ্দিন আহমেদ",
      price: 550,
      discountedPrice: 0,
      quantity: 1,
      image: "/images/book3.png",
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getItemPrice = (item) =>
    item.discountedPrice > 0 ? item.discountedPrice : item.price;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0,
  );
  const shippingCost = subtotal > 500 ? 0 : 60;
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <ShoppingBag className="mx-auto mb-4 h-24 w-24 text-gray-300" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mb-6 text-gray-600">Add some books to get started!</p>
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
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Section - Cart Items */}
          <div className="lg:w-2/3">
            <div className="divide-y rounded-lg bg-white shadow-sm">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex gap-4">
                    {/* Book Image */}
                    <Link href={`/books/${item.id}`} className="shrink-0">
                      <div className="flex h-32 w-24 items-center justify-center rounded bg-linear-to-br from-emerald-100 to-emerald-50">
                        <span className="text-xs text-gray-400">Cover</span>
                      </div>
                    </Link>

                    {/* Book Details */}
                    <div className="min-w-0 flex-1">
                      <Link href={`/books/${item.id}`}>
                        <h3 className="mb-1 font-semibold text-gray-900 hover:text-emerald-600">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="mb-3 text-sm text-gray-600">
                        {item.author}
                      </p>

                      <div className="flex items-center justify-between text-gray-500">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-emerald-600">
                              ৳{getItemPrice(item) * item.quantity}
                            </span>
                            {item.discountedPrice > 0 && (
                              <span className="text-sm text-gray-400 line-through">
                                ৳{item.price * item.quantity}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="mt-2 ml-auto flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Link
              href="/books"
              className="mt-4 inline-block font-medium text-emerald-600 hover:text-emerald-700"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-20 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? "FREE" : `৳${shippingCost}`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-gray-500">
                    Add ৳{500 - subtotal} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between border-t pt-3 text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-emerald-600">৳{total}</span>
                </div>
              </div>

              <button className="mb-3 w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition-colors hover:bg-emerald-700">
                Proceed to Checkout
              </button>

              <div className="mt-4 border-t pt-4">
                <h3 className="mb-2 font-semibold text-gray-900">We Accept:</h3>
                <div className="flex gap-2">
                  <div className="rounded border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-500">
                    Cash on Delivery
                  </div>
                  <div className="rounded border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-500">
                    bKash
                  </div>
                  <div className="rounded border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-500">
                    Nagad
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
