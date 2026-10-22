import Link from "next/link";
import { FiArrowRight, FiStar } from "react-icons/fi";

const featuredItems = [
  {
    id: "1",
    title: "Minimalist Wireless Headphones",
    category: "Electronics",
    price: "$199.99",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    description:
      "Active noise-cancellation with up to 40 hours of battery life and studio sound.",
  },
  {
    id: "2",
    title: "Ergonomic Mechanical Keyboard",
    category: "Accessories",
    price: "$129.50",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    description:
      "Custom tactile switches, RGB lighting, and programmable hot-swap sockets.",
  },
  {
    id: "3",
    title: "Ultra-Slim Smartwatch Pro",
    category: "Wearables",
    price: "$249.00",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    description:
      "Comprehensive health tracking, always-on AMOLED display, and 7-day battery life.",
  },
];

export default function FeaturedItems() {
  return (
    <section className="py-20 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Curated Selection
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured Products
            </p>
          </div>
          <Link
            href="/items"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View all products</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className="relative h-56 w-full overflow-hidden bg-default-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-background/90 backdrop-blur-md rounded-md text-foreground">
                  {item.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground text-lg truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                    <FiStar className="fill-amber-500" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-foreground/60 line-clamp-2 mb-6 flex-1">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <span className="text-xl font-bold text-foreground">
                    {item.price}
                  </span>
                  <Link
                    href={`/items/${item.id}`}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
