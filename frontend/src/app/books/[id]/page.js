"use client";

import { useParams } from "next/navigation";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, ChevronRight } from "lucide-react";

function BookDetailPage() {
  const params = useParams();
  const id = params.id;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mock data - replace with API call using params.id
  const book = {
    id: 1,
    title: "বাংলাদেশের রাজনীতি ও অর্থনীতি",
    author: "রেহমান সোবহান",
    publication: "প্রথমা প্রকাশন",
    category: "রাজনীতি ও সমাজ",
    pages: 352,
    coverType: "Paperback",
    edition: "1st Edition",
    publishedDate: "February 2020",
    language: "Bengali",
    description:
      "বাংলাদেশের রাজনীতি ও অর্থনীতি নিয়ে একটি বিস্তৃত আলোচনা। এই বইটিতে লেখক দেশের রাজনৈতিক ও অর্থনৈতিক পরিস্থিতি বিশ্লেষণ করেছেন। স্বাধীনতা-উত্তর বাংলাদেশের অর্থনৈতিক নীতিমালা, রাজনৈতিক দলগুলোর ভূমিকা এবং দেশের সামগ্রিক উন্নয়নের গতিপথ নিয়ে আলোকপাত করা হয়েছে। লেখক তার দীর্ঘ অভিজ্ঞতা ও গবেষণার আলোকে বিভিন্ন অর্থনৈতিক সংকট ও তার সমাধান নিয়ে বিস্তারিত আলোচনা করেছেন। এটি যেকোনো রাজনীতি ও অর্থনীতি বিষয়ে আগ্রহী পাঠকদের জন্য একটি অবশ্যপাঠ্য বই।",
    price: 650,
    discountedPrice: 520,
    discountPercentage: 20,
    image: "/images/book-detail.png",
    averageRating: 4.83,
    totalReviews: 8,
    ratingDistribution: {
      5: 5,
      4: 0,
      3: 2,
      2: 1,
      1: 0,
    },
  };

  const relatedBooks = [
    {
      id: 2,
      title: "অর্থনীতির কথা",
      author: "আবুল বারকাত",
      price: 450,
      discountedPrice: 360,
      image: "/images/related1.png",
    },
    {
      id: 3,
      title: "বাংলাদেশের ইতিহাস",
      author: "সালাহউদ্দিন আহমেদ",
      price: 550,
      discountedPrice: 440,
      image: "/images/related2.png",
    },
    {
      id: 4,
      title: "রাজনীতির পাঠশালা",
      author: "মুহাম্মদ হাবিবুর রহমান",
      price: 380,
      discountedPrice: 0,
      image: "/images/related3.png",
    },
  ];

  const reviews = [
    {
      id: 1,
      userName: "আহমেদ হাসান",
      rating: 5,
      date: "January 15, 2026",
      comment:
        "অসাধারণ একটি বই। রাজনীতি ও অর্থনীতি নিয়ে এত সহজভাবে লেখা বই আগে পড়িনি।",
    },
    {
      id: 2,
      userName: "ফাতিমা খান",
      rating: 5,
      date: "January 10, 2026",
      comment: "খুবই তথ্যবহুল এবং বিশ্লেষণধর্মী। সবার পড়া উচিত।",
    },
    {
      id: 3,
      userName: "রফিক উল্লাহ",
      rating: 4,
      date: "January 5, 2026",
      comment: "ভালো বই, তবে কিছু জায়গায় আরো বিস্তারিত হলে ভালো হতো।",
    },
  ];

  const hasDiscount =
    book.discountedPrice > 0 && book.discountedPrice < book.price;
  const displayPrice = hasDiscount ? book.discountedPrice : book.price;
  const descriptionLimit = 200;
  const isLongDescription = book.description.length > descriptionLimit;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Section - Book Details (3/4 width) */}
          <div className="lg:w-3/4">
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 md:flex-row">
                {/* Book Image */}
                <div className="shrink-0 md:w-1/3">
                  <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-linear-to-br from-emerald-100 to-emerald-50">
                    {hasDiscount && (
                      <div className="absolute top-3 left-3 z-10 rounded bg-red-500 px-3 py-1 text-sm font-bold text-white">
                        {book.discountPercentage}% OFF
                      </div>
                    )}
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-gray-400">Book Cover</span>
                      {/* <Image src={book.image} alt={book.title} fill className="object-cover" /> */}
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div className="md:w-2/3">
                  <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                    {book.title}
                  </h1>

                  <div className="mb-6 space-y-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">Author:</span>{" "}
                      <Link
                        href={`/authors/${1}`}
                        className="text-emerald-600 hover:underline"
                      >
                        {book.author}
                      </Link>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Publication:</span>{" "}
                      <Link
                        href={`/publications/${1}`}
                        className="text-emerald-600 hover:underline"
                      >
                        {book.publication}
                      </Link>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Category:</span>{" "}
                      {book.category}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Pages:</span> {book.pages}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Cover Type:</span>{" "}
                      {book.coverType}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Edition:</span>{" "}
                      {book.edition}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">First Published:</span>{" "}
                      {book.publishedDate}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Language:</span>{" "}
                      {book.language}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Description
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {showFullDescription || !isLongDescription
                        ? book.description
                        : `${book.description.substring(0, descriptionLimit)}...`}
                    </p>
                    {isLongDescription && (
                      <button
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                        className="mt-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        {showFullDescription ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </div>

                  {/* Price and Actions */}
                  <div className="border-t pt-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-3xl font-bold text-emerald-600">
                        ৳{displayPrice}
                      </span>
                      {hasDiscount && (
                        <>
                          <span className="text-xl text-gray-400 line-through">
                            ৳{book.price}
                          </span>
                          <span className="rounded bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
                            Save ৳{book.price - book.discountedPrice}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700">
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                      </button>
                      <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-emerald-600 px-6 py-3 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50">
                        <Heart className="h-5 w-5" />
                        Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Ratings & Reviews
              </h2>

              <div className="mb-8 flex flex-col gap-8 md:flex-row">
                {/* Average Rating */}
                <div className="text-center md:w-1/3 md:text-left">
                  <div className="mb-2 text-5xl font-bold text-gray-900">
                    {book.averageRating}
                  </div>
                  <div className="mb-2 flex items-center justify-center gap-1 md:justify-start">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(book.averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {book.totalReviews} reviews
                  </p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2 md:w-2/3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex w-20 items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <div className="h-2 flex-1 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-yellow-400"
                          style={{
                            width: `${(book.ratingDistribution[rating] / book.totalReviews) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-8 text-sm text-gray-600">
                        {book.ratingDistribution[rating]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write Review Button */}
              <button
                onClick={() => setShowReviewModal(true)}
                className="mb-6 w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 md:w-auto"
              >
                Write a Review
              </button>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 pb-6 last:border-0"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {review.userName}
                        </p>
                        <div className="mt-1 flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>

              {/* Review Pagination */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setReviewPage(Math.max(1, reviewPage - 1))}
                  disabled={reviewPage === 1}
                  className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button className="rounded-lg bg-emerald-600 px-4 py-2 text-white">
                  1
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                  2
                </button>
                <button
                  onClick={() => setReviewPage(reviewPage + 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Related Books (1/4 width) */}
          <div className="lg:w-1/4">
            <div className="sticky top-32 rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-bold text-gray-900">Related Books</h3>
              <div className="mb-4 space-y-4">
                {relatedBooks.map((relatedBook) => (
                  <Link
                    key={relatedBook.id}
                    href={`/books/${relatedBook.id}`}
                    className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded bg-linear-to-br from-emerald-100 to-emerald-50">
                      <span className="text-xs text-gray-400">Cover</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900">
                        {relatedBook.title}
                      </h4>
                      <p className="mb-1 text-xs text-gray-500">
                        {relatedBook.author}
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-emerald-600">
                          ৳{relatedBook.discountedPrice || relatedBook.price}
                        </span>
                        {relatedBook.discountedPrice > 0 && (
                          <span className="text-xs text-gray-400 line-through">
                            ৳{relatedBook.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`/books?category=${book.category}`}
                className="block w-full rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                View All in {book.category}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
