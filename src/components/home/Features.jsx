import { FiFilter, FiShield, FiZap, FiShoppingBag } from "react-icons/fi";

const features = [
  {
    icon: FiFilter,
    title: "Instant Multi-Filter",
    description:
      "Search and filter through products seamlessly by category, price, and custom tags.",
  },
  {
    icon: FiShield,
    title: "Firebase Auth Security",
    description:
      "Robust authentication system supporting both Google Sign-In and secure email/password sessions.",
  },
  {
    icon: FiZap,
    title: "Blazing Fast App Router",
    description:
      "Built on Next.js App Router for optimal rendering speed, SEO, and smooth navigation.",
  },
  {
    icon: FiShoppingBag,
    title: "Product Management",
    description:
      "Protected administrative routes allowing verified users to add, review, and delete items effortlessly.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Why Choose StoreForge
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need in a modern catalog
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl border border-border/60 bg-background hover:border-blue-600/40 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
