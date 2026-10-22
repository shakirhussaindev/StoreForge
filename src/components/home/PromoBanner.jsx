import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function PromoBanner() {
  return (
    <section className="py-16 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-14 sm:px-16 text-center sm:text-left text-white shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to showcase your products?
            </h2>
            <p className="mt-4 text-blue-100 text-sm sm:text-base leading-relaxed">
              Create an account now to start listing new items, managing your
              inventory, and experiencing seamless catalog exploration.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors shadow-sm"
              >
                <span>Get Started Free</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/items"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors"
              >
                Browse Items
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
