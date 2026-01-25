import Link from "next/link";

function BookCard({ book }) {
  const hasDiscount =
    book.discountedPrice > 0 && book.discountedPrice < book.price;
  const displayPrice = hasDiscount ? book.discountedPrice : book.price;

  return (
    <Link
      href={`/books/${book.id}`}
      className="group w-48 shrink-0 overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
        {/* Discount Badge */}
        {book.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 z-10 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
            {book.discountPercentage}% OFF
          </div>
        )}

        {/* Book Cover Placeholder */}
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-emerald-100 to-emerald-50 transition-transform duration-300 group-hover:scale-105">
          <span className="text-sm text-gray-400">Book Cover</span>
          {/* Replace with actual image: */}
          {/* <Image src={book.image} alt={book.title} fill className="object-cover" /> */}
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-emerald-600">
          {book.title}
        </h3>
        <p className="mb-3 text-xs text-gray-500">{book.author}</p>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-emerald-600">
            ৳{displayPrice}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ৳{book.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
