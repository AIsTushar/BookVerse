"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, BookOpen, Building2 } from "lucide-react";
import Image from "next/image";

function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data - replace with API call
  const publications = [
    {
      id: 1,
      name: "প্রথমা প্রকাশন",
      nameEn: "Prothoma Prokashan",
      image: "/images/pub1.png",
      booksCount: 523,
      description:
        "বাংলাদেশের অন্যতম প্রধান প্রকাশনা সংস্থা, মানসম্পন্ন বই প্রকাশে নিবেদিত।",
      established: "2000",
    },
    {
      id: 2,
      name: "অন্যপ্রকাশ",
      nameEn: "Onnoprokash",
      image: "/images/pub2.png",
      booksCount: 412,
      description: "গুণমানসম্পন্ন সাহিত্য ও জ্ঞানমূলক বই প্রকাশে অগ্রণী।",
      established: "1995",
    },
    {
      id: 3,
      name: "সময় প্রকাশন",
      nameEn: "Somoy Prokashon",
      image: "/images/pub3.png",
      booksCount: 387,
      description: "আধুনিক বাংলা সাহিত্য ও জনপ্রিয় বই প্রকাশনায় দক্ষ।",
      established: "2005",
    },
    {
      id: 4,
      name: "আদর্শ প্রকাশনী",
      nameEn: "Adarsha Prokashoni",
      image: "/images/pub4.png",
      booksCount: 298,
      description: "শিক্ষামূলক ও পাঠ্যপুস্তক প্রকাশনায় বিশেষায়িত।",
      established: "1985",
    },
    {
      id: 5,
      name: "কাকলী প্রকাশনী",
      nameEn: "Kakoli Prokashoni",
      image: "/images/pub5.png",
      booksCount: 345,
      description: "শিশু-কিশোর সাহিত্য ও গল্পের বই প্রকাশনায় নিবেদিত।",
      established: "1998",
    },
    {
      id: 6,
      name: "মাওলা ব্রাদার্স",
      nameEn: "Mawla Brothers",
      image: "/images/pub6.png",
      booksCount: 456,
      description: "ইসলামী বই ও ধর্মীয় সাহিত্য প্রকাশনায় অগ্রগামী।",
      established: "1980",
    },
    {
      id: 7,
      name: "পাঞ্জেরী পাবলিকেশন্স",
      nameEn: "Panjeri Publications",
      image: "/images/pub7.png",
      booksCount: 389,
      description:
        "শিক্ষামূলক গাইড বই ও পরীক্ষা প্রস্তুতি বই প্রকাশনায় বিশেষজ্ঞ।",
      established: "1999",
    },
    {
      id: 8,
      name: "বাংলা একাডেমি",
      nameEn: "Bangla Academy",
      image: "/images/pub8.png",
      booksCount: 634,
      description: "বাংলা ভাষা ও সাহিত্যের উন্নয়নে নিবেদিত জাতীয় প্রতিষ্ঠান।",
      established: "1955",
    },
    {
      id: 9,
      name: "শুদ্ধস্বর",
      nameEn: "Shuddhashar",
      image: "/images/pub9.png",
      booksCount: 267,
      description: "সমসাময়িক সাহিত্য ও গবেষণামূলক বই প্রকাশনায় সক্রিয়।",
      established: "2010",
    },
    {
      id: 10,
      name: "রকমারি পাবলিশার্স",
      nameEn: "Rokomari Publishers",
      image: "/images/pub10.png",
      booksCount: 178,
      description: "নতুন লেখকদের বই প্রকাশে উৎসাহী আধুনিক প্রকাশনী।",
      established: "2015",
    },
    {
      id: 11,
      name: "আগামী প্রকাশনী",
      nameEn: "Agami Prokashoni",
      image: "/images/pub11.png",
      booksCount: 421,
      description: "সাহিত্য, ইতিহাস ও সংস্কৃতি বিষয়ক বই প্রকাশনায় দক্ষ।",
      established: "1986",
    },
    {
      id: 12,
      name: "ঐতিহ্য",
      nameEn: "Oitijjhyo",
      image: "/images/pub12.png",
      booksCount: 312,
      description: "ঐতিহ্যবাহী বাংলা সাহিত্য ও লোকসংস্কৃতি বিষয়ক প্রকাশনা।",
      established: "1990",
    },
  ];

  const filteredPublications = publications.filter(
    (pub) =>
      pub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.nameEn.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPublications.length / 12);
  const startIndex = (currentPage - 1) * 12;
  const paginatedPublications = filteredPublications.slice(
    startIndex,
    startIndex + 12,
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Publications
          </h1>
          <p className="mb-6 text-gray-600">
            Explore books from leading publishers
          </p>

          {/* Search Bar */}
          <div className="max-w-md">
            <div className="relative">
              <input
                type="search"
                placeholder="Search publications..."
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

        {/* Publications Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedPublications.map((publication) => (
            <Link
              key={publication.id}
              href={`/publications/${publication.id}`}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="p-6">
                {/* Publication Logo/Image */}
                <div className="mb-4 flex h-32 w-full items-center justify-center rounded-lg bg-linear-to-br from-emerald-100 to-emerald-50 transition-transform group-hover:scale-105">
                  <Building2 className="h-16 w-16 text-emerald-600" />
                  {/* <Image src={publication.image} alt={publication.name} fill className="object-contain p-4" /> */}
                </div>

                {/* Publication Info */}
                <h3 className="mb-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
                  {publication.name}
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  {publication.nameEn}
                </p>

                {/* Stats */}
                <div className="mb-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <BookOpen className="h-4 w-4" />
                    <span className="font-medium">
                      {publication.booksCount} Books
                    </span>
                  </div>
                  <span className="text-gray-500">
                    Est. {publication.established}
                  </span>
                </div>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-gray-600">
                  {publication.description}
                </p>
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
        {filteredPublications.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No publications found matching `{searchQuery}`
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

export default PublicationsPage;
