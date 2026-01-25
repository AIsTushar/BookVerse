"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CategoriesListSection() {
  const categories = [
    { id: 1, name: "Thriller", image: "/images/Thriller.png" },
    { id: 2, name: "Fiction", image: "/images/Fiction.png" },
    { id: 3, name: "Non-fiction", image: "/images/Non-fiction.png" },
    { id: 4, name: "Authors", image: "/images/Authors.png" },
    { id: 5, name: "Publications", image: "/images/Publications.png" },
    { id: 6, name: "Books", image: "/images/Books.png" },
  ];

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Book Categories
          </h2>
          <Link
            href={"/books"}
            className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            See All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          {/* Scroll Buttons */}
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

          {/* Categories Grid/Slider */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/books/?${category.name.toLowerCase()}`}
      className="group flex shrink-0 flex-col items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-32 w-32 overflow-hidden rounded-full bg-linear-to-br from-emerald-50 to-emerald-100">
        {/* Placeholder for image with hover animation */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-emerald-100 transition-transform duration-500 ${
            isHovered ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <span className="font-medium text-emerald-600">
            {category.name[0]}
          </span>
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center bg-emerald-200 transition-transform duration-500 ${
            isHovered ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <span className="font-medium text-emerald-700">
            {category.name[0]}
          </span>
        </div>
        {/* When you have actual images, replace the divs above with: */}
        {/* <Image src={category.image} alt={category.name} fill className="object-cover" /> */}
      </div>
      <p className="text-sm font-medium text-gray-700 transition-colors group-hover:text-emerald-600">
        {category.name}
      </p>
    </Link>
  );
}

export default CategoriesListSection;
