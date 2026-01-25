"use client";

import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  CircleUserRound,
  Search,
  Menu,
  X,
  User,
  Package,
  LogOut,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { signOut } from "next-auth/react";

const NavOptions = [
  { title: "Home", url: "/" },
  { title: "All", url: "/books" },
  { title: "Thriller", url: "/books/?thriller" },
  { title: "Fiction", url: "/books/?fiction" },
  { title: "Non-fiction", url: "/books/?non-fiction" },
  { title: "Authors", url: "/authors" },
  { title: "Publications", url: "/publications" },
];

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const user = useAppSelector(selectCurrentUser);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }

    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileDropdownOpen]);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      {/* Top Nav Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <Link
              href={"/"}
              className="text-xl font-bold text-emerald-600 hover:text-emerald-700 sm:text-2xl"
            >
              Book Shop
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mx-4 hidden max-w-2xl flex-1 md:block">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for books, authors, publishers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href={"/wishlist"}
              className="hidden flex-col items-center gap-1 text-gray-700 transition-colors hover:text-emerald-600 sm:flex"
            >
              <Heart className="h-5 w-5" />
              <span className="text-xs">Wishlist</span>
            </Link>

            <Link
              href={"/cart"}
              className="relative flex flex-col items-center gap-1 text-gray-700 transition-colors hover:text-emerald-600"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden text-xs sm:inline">Cart</span>
              <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                0
              </span>
            </Link>

            {/* Profile Button with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              {user?.role ? (
                <>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex flex-col items-center gap-1 text-gray-700 transition-colors hover:text-emerald-600"
                  >
                    <CircleUserRound className="h-5 w-5" />
                    <span className="hidden text-xs sm:inline">Account</span>
                  </button>

                  {/* Profile Dropdown Modal */}
                  {profileDropdownOpen && (
                    <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                      <div className="py-1">
                        <Link
                          href="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <User className="h-4 w-4" />
                          Profile
                        </Link>
                        <Link
                          href="/orders"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <Package className="h-4 w-4" />
                          Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <Heart className="h-4 w-4" />
                          Wishlist
                        </Link>
                        <hr className="my-1 border-gray-200" />
                        <button
                          onClick={() => signOut()}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition-colors hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={"/signup"}
                  className="flex flex-col items-center gap-1 text-gray-700 transition-colors hover:text-emerald-600"
                >
                  <CircleUserRound className="h-5 w-5" />
                  <span className="hidden text-xs sm:inline">Account</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <input
              type="search"
              placeholder="Search books, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 border-t border-gray-100 py-3 lg:flex lg:justify-center">
          {NavOptions.map((item) => (
            <Link
              href={item.url}
              key={item.title}
              className="text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-emerald-600"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Menu - Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 bottom-0 left-0 w-64 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Menu</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-1 transition-colors hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <nav className="space-y-1">
                {NavOptions.map((item) => (
                  <Link
                    href={item.url}
                    key={item.title}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
