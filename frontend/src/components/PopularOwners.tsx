import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

function PopularOwners({ title, link, owners }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          <Link
            href={link}
            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
          >
            See All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {owners.map((owner) => (
            <Link
              key={owner.id}
              href={`${link}/${owner.id}`}
              className="flex flex-col items-center gap-3 p-6 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-linear-to-br from-emerald-50 to-emerald-100">
                {/* Placeholder for circular image */}
                <div className="w-full h-full flex items-center justify-center bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                  <span className="text-emerald-600 font-bold text-xl">
                    {owner.name[0]}
                  </span>
                </div>
                {/* Replace with actual image when available: */}
                {/* <Image src={owner.image} alt={owner.name} fill className="object-cover" /> */}
              </div>
              <p className="text-sm font-medium text-gray-700 text-center group-hover:text-emerald-600 transition-colors line-clamp-2">
                {owner.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularOwners;
