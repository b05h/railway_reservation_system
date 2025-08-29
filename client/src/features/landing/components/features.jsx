import { Search, Ticket, CalendarCheck } from "lucide-react";

const features = [
  {
    title: "Search Trains",
    description: "Find available trains across routes and dates.",
    icon: Search,
  },
  {
    title: "Book Tickets",
    description: "Reserve seats with just a few clicks.",
    icon: Ticket,
  },
  {
    title: "Manage Bookings",
    description: "View, modify, or cancel existing reservations.",
    icon: CalendarCheck,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="card bg-neutral text-neutral-content shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary-content" />
                  </div>
                  <h3 className="card-title text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm opacity-80">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
