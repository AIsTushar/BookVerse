"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "@/components/BookCard";

interface Book {
  id: number;
  image: string;
  title: string;
  author: string;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
}

interface ProductListByCategoryProps {
  title: string;
  category: string;
}

function ProductListByCategory({
  title,
  category,
}: ProductListByCategoryProps) {
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
  ];

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {title}
          </h2>
          <Link
            href={`/books/?${category}`}
            className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            See All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductListByCategory;
