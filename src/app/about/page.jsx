import Link from "next/link";
import {
  FiCheckCircle,
  FiShield,
  FiZap,
  FiPackage,
  FiArrowRight,
} from "react-icons/fi";

export const metadata = {
  title: "About Us | StoreForge",
  description:
    "Learn more about StoreForge, our mission, and our product catalog platform.",
};

export default function AboutPage() {
  const highlights = [
    {
      icon: FiZap,
      title: "Fast & Modern Stack",
      desc: "Built on Next.js App Router with server-driven performance, instant search, and client-side transitions.",
    },
    {
      icon: FiShield,
      title: "Secure Authentication",
      desc: "Protected administrative routes secured by Firebase Auth, supporting both Google and email sessions.",
    },
    {
      icon: FiPackage,
      title: "Dynamic Catalog Management",
      desc: "Effortlessly create, inspect, and remove items with persistent local storage and real-time updates.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-500/10 mb-4">
          About StoreForge
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Empowering Seamless Product Exploration
        </h1>
        <p className="mt-6 text-base sm:text-lg text-foreground/70 leading-relaxed">
          StoreForge is a modern catalog and inventory showcase platform
          designed to make item discovery, multi-faceted filtering, and catalog
          management effortless and responsive across every device.
        </p>
      </div>

      {/* Story & Image Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Our Mission & Vision
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
            We built StoreForge with a simple goal: provide a unified,
            performant, and intuitive interface for showcasing high-demand gear
            and everyday tools. Whether you are browsing through curated
            electronics or organizing newly added products, every touchpoint is
            engineered for clarity.
          </p>
          <div className="space-y-3 pt-2">
            {[
              "Streamlined item management with role-aware routes",
              "Instant search with multi-field filtering capabilities",
              "Production-ready responsiveness from mobile to desktop",
            ].map((point, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-foreground/80"
              >
                <FiCheckCircle className="h-5 w-5 text-blue-600 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-lg aspect-4/3 bg-default-100">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
              alt="StoreForge Team Collaboration"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="mb-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-foreground">Core Pillars</h3>
          <p className="mt-2 text-sm text-foreground/60">
            Engineered with a focus on UI consistency and reliable state
            handling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl border border-border/60 bg-background shadow-xs hover:border-blue-600/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl border border-border/60 bg-default-50 p-8 sm:p-12 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-foreground">
          Explore Our Catalog
        </h3>
        <p className="mt-2 text-sm text-foreground/60 max-w-md mx-auto mb-6">
          Check out our latest products or sign in to start managing catalog
          listings.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/items"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <span>Browse Products</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/items/add"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/80 bg-background text-sm font-medium hover:bg-default-100 transition-colors"
          >
            <span>Add an Item</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
