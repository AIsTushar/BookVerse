"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import BookCard from "@/components/BookCard";

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      image: "/images/Thriller.png",
      title: "বাংলাদেশের রাজনীতি ও অর্থনীতি",
      author: "রেহমান সোবহান",
      price: 650,
      discountedPrice: 520,
      discountPercentage: 20,
    },
    {
      id: 2,
      image: "/images/Thriller.png",
      title: "অর্থনীতির কথা",
      author: "আবুল বারকাত",
      price: 450,
      discountedPrice: 360,
      discountPercentage: 20,
    },
    {
      id: 3,
      image: "/images/Thriller.png",
      title: "বাংলাদেশের ইতিহাস",
      author: "সালাহউদ্দিন আহমেদ",
      price: 550,
      discountedPrice: 0,
      discountPercentage: 0,
    },
    {
      id: 4,
      image: "/images/Thriller.png",
      title: "রাজনীতির পাঠশালা",
      author: "মুহাম্মদ হাবিবুর রহমান",
      price: 380,
      discountedPrice: 0,
      discountPercentage: 0,
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const addToCart = (id: string) => {
    // Add to cart logic here
    console.log("Added to cart:", id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <Heart className="mx-auto mb-4 h-24 w-24 text-gray-300" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Your wishlist is empty
            </h2>
            <p className="mb-6 text-gray-600">Save your favorite books here!</p>
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="mt-2 text-gray-600">
              {wishlistItems.length} items saved
            </p>
          </div>
          <button
            onClick={() => {
              wishlistItems.forEach((item: any) => addToCart(item.id));
            }}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            <ShoppingCart className="h-5 w-5" />
            Add All to Cart
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {wishlistItems.map((book: any) => (
            <div
              key={book.id}
              className="group relative overflow-hidden rounded-xl"
            >
              <BookCard book={book} />

              {/* Remove wishlist button stays */}
              <button
                onClick={() => removeFromWishlist(book.id)}
                className="absolute top-2 right-2 z-20 rounded-full bg-white/90 p-2 shadow-md transition-colors hover:bg-red-500 hover:text-white"
              >
                <Heart className="h-4 w-4 fill-current" />
              </button>

              {/* Glass Overlay */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-white/10 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" />

              {/* Centered Add to Cart */}
              <button
                onClick={() => addToCart(book.id)}
                className="absolute inset-0 z-20 flex scale-90 items-center justify-center opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
              >
                <span className="flex items-center gap-2 rounded-xl bg-emerald-600/90 px-6 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-sm hover:bg-emerald-700">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
