"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { initialItems } from "@/data/items";
import {
  FiSearch,
  FiStar,
  FiFilter,
  FiRotateCcw,
  FiArrowRight,
} from "react-icons/fi";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  // Load items from localStorage or seed initial data
  useEffect(() => {
    const stored = localStorage.getItem("storeforge_items");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        setItems(initialItems);
      }
    } else {
      localStorage.setItem("storeforge_items", JSON.stringify(initialItems));
      setItems(initialItems);
    }
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(items.map((item) => item.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  // Combined filtering: Search + Category + Price Range
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Search Query Match
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Category Filter
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      // 3. Price Range Filter
      let matchesPrice = true;
      const numPrice = Number(item.price);
      if (priceRange === "under100") {
        matchesPrice = numPrice < 100;
      } else if (priceRange === "100to200") {
        matchesPrice = numPrice >= 100 && numPrice <= 200;
      } else if (priceRange === "above200") {
        matchesPrice = numPrice > 200;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [items, searchTerm, selectedCategory, priceRange]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setPriceRange("All");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Explore Products
        </h1>
        <p className="mt-2 text-sm sm:text-base text-foreground/60">
          Find your next piece of gear with instant search and multi-parameter
          filtering.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-10 rounded-2xl border border-border/60 bg-background p-4 sm:p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 h-4 w-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, description, or keyword..."
              className="w-full rounded-xl border border-border/80 bg-background pl-10 pr-4 py-2.5 text-sm text-foreground outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
            />
          </div>

          {/* Filter 1: Category */}
          <div className="lg:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Filter 2: Price Range */}
          <div className="lg:col-span-3">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition cursor-pointer"
            >
              <option value="All">Price: All Ranges</option>
              <option value="under100">Under $100</option>
              <option value="100to200">$100 - $200</option>
              <option value="above200">Above $200</option>
            </select>
          </div>

          {/* Reset Action */}
          <div className="lg:col-span-1 flex items-center justify-end">
            <button
              onClick={handleResetFilters}
              title="Reset Filters"
              className="w-full h-full min-h-[42px] inline-flex items-center justify-center rounded-xl border border-border/80 hover:bg-default-100 text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
            >
              <FiRotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filter Stats Feedback */}
        <div className="flex items-center justify-between text-xs text-foreground/50 pt-2 border-t border-border/40">
          <span>
            Showing{" "}
            <strong className="text-foreground">{filteredItems.length}</strong>{" "}
            of {items.length} items
          </span>
          {(searchTerm ||
            selectedCategory !== "All" ||
            priceRange !== "All") && (
            <span className="text-blue-600 font-medium">Filters active</span>
          )}
        </div>
      </div>

      {/* Items Responsive Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              {/* Product Card Image & Badge */}
              <div className="relative h-48 w-full overflow-hidden bg-default-100">
                <img
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&auto=format&fit=crop&q=80"
                  }
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-background/90 backdrop-blur-md rounded-md text-foreground shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Product Card Content */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-medium text-amber-500 shrink-0 mt-0.5">
                    <FiStar className="fill-amber-500 h-3.5 w-3.5" />
                    <span>{item.rating || "4.5"}</span>
                  </div>
                </div>

                {/* Short Description (1-2 lines) */}
                <p className="text-xs sm:text-sm text-foreground/60 line-clamp-2 leading-relaxed flex-1 mb-5">
                  {item.shortDescription}
                </p>

                {/* Price and CTA Button */}
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <span className="text-lg font-bold text-foreground">
                    ${Number(item.price).toFixed(2)}
                  </span>

                  <Link
                    href={`/items/${item.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <span>View Details</span>
                    <FiArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Filter State */
        <div className="text-center py-20 rounded-2xl border border-dashed border-border/80 bg-background/50">
          <FiFilter className="mx-auto h-10 w-10 text-foreground/30 mb-3" />
          <h3 className="text-lg font-semibold text-foreground">
            No matching items found
          </h3>
          <p className="text-sm text-foreground/50 max-w-sm mx-auto mt-1 mb-5">
            We couldn&apos;t find any products matching your current search query or
            active filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
