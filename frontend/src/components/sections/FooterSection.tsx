import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

function FooterSection() {
  const footerLinks = {
    categories: [
      { name: "Thriller", url: "/books/?thriller" },
      { name: "Fiction", url: "/books/?fiction" },
      { name: "Non-fiction", url: "/books/?non-fiction" },
      { name: "All Books", url: "/books" },
    ],
    quickLinks: [
      { name: "Authors", url: "/authors" },
      { name: "Publications", url: "/publications" },
      { name: "About Us", url: "/#" },
      { name: "Contact", url: "/#" },
    ],
    support: [
      { name: "Privacy Policy", url: "/#" },
      { name: "Terms & Conditions", url: "/#" },
      { name: "Shipping Info", url: "/#" },
      { name: "Return Policy", url: "/#" },
    ],
  };

  return (
    <footer className="bg-gray-900 pt-4 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link
              href={"/"}
              className="mb-4 inline-block text-2xl font-bold text-emerald-500 hover:text-emerald-400"
            >
              বুকশপ
            </Link>
            <p className="mb-6 text-sm leading-relaxed">
              বুকশপ is a leading online book selling platform in Bangladesh. We
              offer thousands of islamic, general and academic books at a
              discounted price. We provide good packaging with low shipping cost
              all over Bangladesh.
            </p>
            <div className="flex gap-4">
              <Link
                href={"https://www.facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-emerald-600"
              >
                <FaFacebook className="h-5 w-5" />
              </Link>
              <Link
                href={"https://www.instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-emerald-600"
              >
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link
                href={"https://www.youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-emerald-600"
              >
                <FaYoutube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Book Selling. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Developed by{" "}
              <Link
                href="https://github.com/AIsTushar"
                className="font-bold text-gray-100 underline"
              >
                Azizul I. Tushar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
