"use client";

import { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import BookCard from "@/components/BookCard";

function BooksPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity");

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedPublications, setSelectedPublications] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  // Mock data - replace with API calls
  const publications = [
    { id: 1, name: "Penguin Random House" },
    { id: 2, name: "HarperCollins" },
    { id: 3, name: "Simon & Schuster" },
    { id: 4, name: "Macmillan Publishers" },
    { id: 5, name: "Hachette Book Group" },
    { id: 6, name: "Scholastic" },
    { id: 7, name: "Pearson Education" },
  ];

  const categories = [
    { id: 1, name: "Thriller" },
    { id: 2, name: "Fiction" },
    { id: 3, name: "Non-fiction" },
    { id: 4, name: "Mystery" },
    { id: 5, name: "Romance" },
    { id: 6, name: "Science Fiction" },
    { id: 7, name: "Biography" },
  ];

  const authors = [
    { id: 1, name: "F. Scott Fitzgerald" },
    { id: 2, name: "Harper Lee" },
    { id: 3, name: "George Orwell" },
    { id: 4, name: "Jane Austen" },
    { id: 5, name: "J.D. Salinger" },
    { id: 6, name: "Ernest Hemingway" },
    { id: 7, name: "Mark Twain" },
  ];

  const books = [
    {
      id: 1,
      image: "/images/Thriller.png",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 499,
      discountedPrice: 399,
      discountPercentage: 20,
    },
    {
      id: 2,
      image: "/images/Thriller.png",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 599,
      discountedPrice: 499,
      discountPercentage: 17,
    },
    {
      id: 3,
      image: "/images/Thriller.png",
      title: "1984",
      author: "George Orwell",
      price: 450,
      discountedPrice: 0,
      discountPercentage: 0,
    },
    {
      id: 4,
      image: "/images/Thriller.png",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 550,
      discountedPrice: 450,
      discountPercentage: 18,
    },
    {
      id: 5,
      image: "/images/Thriller.png",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: 499,
      discountedPrice: 399,
      discountPercentage: 20,
    },
    {
      id: 6,
      image: "/images/Thriller.png",
      title: "The Old Man and the Sea",
      author: "Ernest Hemingway",
      price: 399,
      discountedPrice: 299,
      discountPercentage: 25,
    },
  ];

  const totalPages = 5; // This would come from API

  const toggleSelection = (id, selectedList, setSelectedList) => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter((item) => item !== id));
    } else {
      setSelectedList([...selectedList, id]);
    }
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([priceRange[0], value]);
    setMaxPrice(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900">All Books</h1>
          <p className="text-gray-600">Showing {books.length} results</p>
        </div>

        {/* Sort and Filter Controls */}
        <div className="mb-6 flex items-center justify-between">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 lg:hidden"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>

          {/* Sort Dropdown */}
          <div className="ml-auto">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden w-64 shrink-0 space-y-4 lg:block">
            {/* Price Range Filter */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">Price Range</h3>
              <div className="space-y-4 text-gray-600">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={handlePriceRangeChange}
                  className="w-full accent-emerald-600"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
                    placeholder="Min"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
                    placeholder="Max"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Publication Filter */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">Publication</h3>
              <div className="max-h-48 space-y-2 overflow-y-auto">
                {publications.map((pub) => (
                  <label
                    key={pub.id}
                    className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPublications.includes(pub.id)}
                      onChange={() =>
                        toggleSelection(
                          pub.id,
                          selectedPublications,
                          setSelectedPublications,
                        )
                      }
                      className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">{pub.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">Category</h3>
              <div className="max-h-48 space-y-2 overflow-y-auto">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() =>
                        toggleSelection(
                          cat.id,
                          selectedCategories,
                          setSelectedCategories,
                        )
                      }
                      className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Author Filter */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">Author</h3>
              <div className="max-h-48 space-y-2 overflow-y-auto">
                {authors.map((author) => (
                  <label
                    key={author.id}
                    className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAuthors.includes(author.id)}
                      onChange={() =>
                        toggleSelection(
                          author.id,
                          selectedAuthors,
                          setSelectedAuthors,
                        )
                      }
                      className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">{author.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filters Sidebar */}
          {mobileFiltersOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <div
                className="fixed top-0 bottom-0 left-0 w-80 overflow-y-auto bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="rounded-lg p-1 transition-colors hover:bg-gray-100"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Price Range Filter */}
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="mb-4 font-semibold text-gray-900">
                        Price Range
                      </h3>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={maxPrice}
                          onChange={handlePriceRangeChange}
                          className="w-full accent-emerald-600"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={minPrice}
                            onChange={(e) =>
                              setMinPrice(parseInt(e.target.value) || 0)
                            }
                            placeholder="Min"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) =>
                              setMaxPrice(parseInt(e.target.value) || 0)
                            }
                            placeholder="Max"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Publication Filter */}
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="mb-4 font-semibold text-gray-900">
                        Publication
                      </h3>
                      <div className="max-h-48 space-y-2 overflow-y-auto">
                        {publications.map((pub) => (
                          <label
                            key={pub.id}
                            className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-white"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPublications.includes(pub.id)}
                              onChange={() =>
                                toggleSelection(
                                  pub.id,
                                  selectedPublications,
                                  setSelectedPublications,
                                )
                              }
                              className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-700">
                              {pub.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="mb-4 font-semibold text-gray-900">
                        Category
                      </h3>
                      <div className="max-h-48 space-y-2 overflow-y-auto">
                        {categories.map((cat) => (
                          <label
                            key={cat.id}
                            className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-white"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(cat.id)}
                              onChange={() =>
                                toggleSelection(
                                  cat.id,
                                  selectedCategories,
                                  setSelectedCategories,
                                )
                              }
                              className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-700">
                              {cat.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Author Filter */}
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="mb-4 font-semibold text-gray-900">
                        Author
                      </h3>
                      <div className="max-h-48 space-y-2 overflow-y-auto">
                        {authors.map((author) => (
                          <label
                            key={author.id}
                            className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-white"
                          >
                            <input
                              type="checkbox"
                              checked={selectedAuthors.includes(author.id)}
                              onChange={() =>
                                toggleSelection(
                                  author.id,
                                  selectedAuthors,
                                  setSelectedAuthors,
                                )
                              }
                              className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-700">
                              {author.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Books Grid */}
          <div className="flex-1">
            <div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`rounded-lg px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-emerald-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
