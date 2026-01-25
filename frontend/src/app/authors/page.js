"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, BookOpen } from "lucide-react";
import Image from "next/image";

function AuthorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data - replace with API call
  const authors = [
    {
      id: 1,
      name: "হুমায়ূন আহমেদ",
      nameEn: "Humayun Ahmed",
      image: "/images/author1.png",
      booksCount: 245,
      bio: "বাংলাদেশের অন্যতম জনপ্রিয় লেখক, নাট্যকার এবং চলচ্চিত্র নির্মাতা।",
    },
    {
      id: 2,
      name: "রবীন্দ্রনাথ ঠাকুর",
      nameEn: "Rabindranath Tagore",
      image: "/images/author2.png",
      booksCount: 189,
      bio: "বিশ্বকবি, নোবেল পুরস্কার বিজয়ী বাঙালি কবি এবং সাহিত্যিক।",
    },
    {
      id: 3,
      name: "কাজী নজরুল ইসলাম",
      nameEn: "Kazi Nazrul Islam",
      image: "/images/author3.png",
      booksCount: 156,
      bio: "বিদ্রোহী কবি, বাংলাদেশের জাতীয় কবি।",
    },
    {
      id: 4,
      name: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
      nameEn: "Bankim Chandra Chattopadhyay",
      image: "/images/author4.png",
      booksCount: 98,
      bio: "বন্দে মাতরম রচয়িতা, ঊনবিংশ শতাব্দীর অন্যতম প্রধান বাংলা লেখক।",
    },
    {
      id: 5,
      name: "শরৎচন্দ্র চট্টোপাধ্যায়",
      nameEn: "Sarat Chandra Chattopadhyay",
      image: "/images/author5.png",
      booksCount: 142,
      bio: "বাংলা সাহিত্যের অন্যতম জনপ্রিয় ঔপন্যাসিক।",
    },
    {
      id: 6,
      name: "শীর্ষেন্দু মুখোপাধ্যায়",
      nameEn: "Shirshendu Mukhopadhyay",
      image: "/images/author6.png",
      booksCount: 87,
      bio: "সমসাময়িক বাংলা সাহিত্যের একজন প্রখ্যাত লেখক।",
    },
    {
      id: 7,
      name: "সুনীল গঙ্গোপাধ্যায়",
      nameEn: "Sunil Gangopadhyay",
      image: "/images/author7.png",
      booksCount: 134,
      bio: "বিংশ শতাব্দীর অন্যতম শ্রেষ্ঠ বাংলা সাহিত্যিক।",
    },
    {
      id: 8,
      name: "মুহম্মদ জাফর ইকবাল",
      nameEn: "Muhammad Zafar Iqbal",
      image: "/images/author8.png",
      booksCount: 95,
      bio: "বিজ্ঞান কথাসাহিত্যিক, শিশুসাহিত্যিক এবং শিক্ষাবিদ।",
    },
    {
      id: 9,
      name: "আনিসুল হক",
      nameEn: "Anisul Hoque",
      image: "/images/author9.png",
      booksCount: 67,
      bio: "সমসাময়িক বাংলাদেশী সাহিত্যিক এবং সাংবাদিক।",
    },
    {
      id: 10,
      name: "সৈয়দ মুজতবা আলী",
      nameEn: "Syed Mujtaba Ali",
      image: "/images/author10.png",
      booksCount: 53,
      bio: "বাংলা সাহিত্যের অন্যতম রম্য রচয়িতা এবং ভ্রমণ লেখক।",
    },
    {
      id: 11,
      name: "তারাশঙ্কর বন্দ্যোপাধ্যায়",
      nameEn: "Tarashankar Bandyopadhyay",
      image: "/images/author11.png",
      booksCount: 78,
      bio: "বাংলা সাহিত্যের অন্যতম প্রধান কথাসাহিত্যিক।",
    },
    {
      id: 12,
      name: "মানিক বন্দ্যোপাধ্যায়",
      nameEn: "Manik Bandopadhyay",
      image: "/images/author12.png",
      booksCount: 62,
      bio: "বাংলা কথাসাহিত্যের অন্যতম জনপ্রিয় ঔপন্যাসিক।",
    },
  ];

  const filteredAuthors = authors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.nameEn.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredAuthors.length / 12);
  const startIndex = (currentPage - 1) * 12;
  const paginatedAuthors = filteredAuthors.slice(startIndex, startIndex + 12);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Authors</h1>
          <p className="mb-6 text-gray-600">
            Discover books from your favorite authors
          </p>

          {/* Search Bar */}
          <div className="max-w-md">
            <div className="relative">
              <input
                type="search"
                placeholder="Search authors..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Authors Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedAuthors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.id}`}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Author Image */}
                  <div className="mb-4 h-32 w-32 overflow-hidden rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 transition-transform group-hover:scale-105">
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-3xl font-bold text-emerald-600">
                        {author.name[0]}
                      </span>
                      {/* <Image src={author.image} alt={author.name} fill className="object-cover" /> */}
                    </div>
                  </div>

                  {/* Author Info */}
                  <h3 className="mb-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
                    {author.name}
                  </h3>
                  <p className="mb-3 text-sm text-gray-500">{author.nameEn}</p>

                  {/* Books Count */}
                  <div className="mb-3 flex items-center gap-2 text-emerald-600">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {author.booksCount} Books
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {author.bio}
                  </p>
                </div>
              </div>

              {/* View Books Button */}
              <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 text-center transition-colors group-hover:bg-emerald-50">
                <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                  View Books →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredAuthors.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No authors found matching `{searchQuery}`
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
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
        )}
      </div>
    </div>
  );
}

export default AuthorsPage;
