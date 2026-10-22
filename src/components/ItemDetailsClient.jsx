"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { initialItems } from "@/data/items";
import {
  FiArrowLeft,
  FiStar,
  FiCheckCircle,
  FiTag,
  FiShield,
  FiTruck,
  FiArrowRight,
  FiPackage,
} from "react-icons/fi";

export default function ItemDetailsClient({ id }) {
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let allItems = initialItems;
    const stored = localStorage.getItem("storeforge_items");

    if (stored) {
      try {
        allItems = JSON.parse(stored);
      } catch {
        allItems = initialItems;
      }
    }

    const currentItem = allItems.find((i) => String(i.id) === String(id));
    setItem(currentItem || null);

    if (currentItem) {
      const related = allItems
        .filter(
          (i) =>
            i.category === currentItem.category &&
            String(i.id) !== String(currentItem.id),
        )
        .slice(0, 3);

      if (related.length < 3) {
        const others = allItems
          .filter(
            (i) =>
              String(i.id) !== String(currentItem.id) &&
              !related.some((r) => r.id === i.id),
          )
          .slice(0, 3 - related.length);
        setRelatedItems([...related, ...others]);
      } else {
        setRelatedItems(related);
      }
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-sm text-foreground/60">
          Loading item details...
        </p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <FiPackage className="mx-auto h-16 w-16 text-foreground/30 mb-4" />
        <h1 className="text-2xl font-bold text-foreground">Item Not Found</h1>
        <p className="mt-2 text-sm text-foreground/60 mb-6">
          The product you are looking for does not exist or may have been
          removed.
        </p>
        <Link
          href="/items"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span>Back to All Items</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span>Back to Items</span>
        </button>
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        <div className="lg:col-span-6 overflow-hidden rounded-3xl border border-border/60 bg-default-100 shadow-sm">
          <div className="relative aspect-4/3 w-full overflow-hidden">
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1000&auto=format&fit=crop&q=80"
              }
              alt={item.title}
              className="h-full w-full object-cover"
            />
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold bg-background/90 backdrop-blur-md rounded-lg text-foreground shadow-sm">
              {item.category}
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
                <FiStar className="fill-amber-500 h-3.5 w-3.5" />
                <span>{item.rating || "4.8"} Rating</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                <FiCheckCircle className="h-3.5 w-3.5" />
                <span>In Stock & Ready to Ship</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {item.title}
            </h1>

            <div className="mt-4 flex items-baseline gap-4">
              <span className="text-3xl font-extrabold text-blue-600">
                ${Number(item.price).toFixed(2)}
              </span>
              <span className="text-xs text-foreground/50">
                Taxes & standard shipping calculated at checkout
              </span>
            </div>
          </div>

          <div className="border-t border-border/40 pt-4">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
              Description
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
              {item.fullDescription || item.shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 p-3 rounded-xl border border-border/60 bg-background text-xs text-foreground/80">
              <FiTruck className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Fast 2-3 Day Delivery</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl border border-border/60 bg-background text-xs text-foreground/80">
              <FiShield className="h-4 w-4 text-blue-600 shrink-0" />
              <span>1-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl border border-border/60 bg-background text-xs text-foreground/80">
              <FiTag className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Category: {item.category}</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl border border-border/60 bg-background text-xs text-foreground/80">
              <FiCheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Authentic Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="rounded-3xl border border-border/60 bg-background p-6 sm:p-10 mb-16 shadow-sm">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Key Specifications
        </h2>
        {item.specifications && item.specifications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {item.specifications.map((spec, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border/40 bg-default-50 text-sm text-foreground/80"
              >
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between p-3 rounded-xl bg-default-50 border border-border/40">
              <span className="text-foreground/50">Category</span>
              <span className="font-medium text-foreground">
                {item.category}
              </span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-default-50 border border-border/40">
              <span className="text-foreground/50">Price</span>
              <span className="font-medium text-foreground">
                ${Number(item.price).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedItems.length > 0 && (
        <div className="border-t border-border/40 pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                You might also like
              </h2>
              <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                Related Products
              </p>
            </div>
            <Link
              href="/items"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>View all</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedItems.map((rel) => (
              <div
                key={rel.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="relative h-44 w-full overflow-hidden bg-default-100">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-xs font-medium bg-background/90 rounded text-foreground">
                    {rel.category}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-semibold text-foreground text-base truncate mb-1">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-foreground/60 line-clamp-2 mb-4 flex-1">
                    {rel.shortDescription}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border/40">
                    <span className="text-base font-bold text-foreground">
                      ${Number(rel.price).toFixed(2)}
                    </span>
                    <Link
                      href={`/items/${rel.id}`}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
