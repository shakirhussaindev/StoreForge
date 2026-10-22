"use client";

import Link from "next/link";
import { FiArrowRight, FiPackage } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-[340px] w-[600px] rounded-full bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-transparent blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 text-xs sm:text-sm font-medium mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Next-Gen Product Catalog</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight sm:leading-tight">
          Discover Premium Items <br className="hidden sm:inline" />
          <span className="text-blue-600">Built for Modern Living</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Explore a handpicked collection of top-rated items, filter by your
          favorite categories, and manage products with a fast, modern workflow.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA */}
          <Link
            href="/items"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm sm:text-base hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5"
          >
            <span>Explore All Items</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>

          {/* Secondary Action */}
          <Link
            href={user ? "/items/add" : "/register"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-border/80 bg-background text-foreground font-semibold text-sm sm:text-base hover:bg-default-100 transition-colors"
          >
            <FiPackage className="h-4 w-4 text-foreground/60" />
            <span>{user ? "Add a Product" : "Create Account"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
