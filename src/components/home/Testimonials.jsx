import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    quote:
      "The interface is sleek and responsive. Browsing through the catalog and filtering items by category is lightning-fast.",
    author: "Sophia Ramirez",
    role: "Product Designer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Adding and managing my inventory with Firebase protected routes worked right out of the box. Super smooth UX.",
    author: "David Chen",
    role: "E-Commerce Founder",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Clean typography, reliable authentication, and rock-solid layouts across all mobile and desktop screens.",
    author: "Elena Rostova",
    role: "Frontend Engineer",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Community Feedback
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by builders & shoppers alike
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-8 rounded-2xl border border-border/60 bg-background hover:border-blue-600/30 transition-colors"
            >
              <div>
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="fill-amber-500 h-4 w-4" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed italic mb-6">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/20"
                />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {t.author}
                  </h4>
                  <p className="text-xs text-foreground/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
