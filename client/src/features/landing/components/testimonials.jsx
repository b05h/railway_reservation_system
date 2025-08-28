const testimonials = [
  {
    quote: "Booking was super quick and easy!",
    user: "Alice Johnson",
    role: "Traveler",
    photoUrl: "/images/alice.jpg",
  },
  {
    quote: "Great interface and reliable service.",
    user: "Bob Smith",
    role: "Commuter",
    photoUrl: "/images/bob.jpg",
  },
  {
    quote: "I love how simple everything is.",
    user: "Clara Zhao",
    role: "Frequent Booker",
    photoUrl: "/images/clara.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Users Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-lg p-6 flex flex-col items-center text-center"
            >
              {t.photoUrl && (
                <img
                  src={t.photoUrl}
                  alt={t.user}
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
              )}
              <p className="italic">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 font-semibold">{t.user}</p>
              {t.role && <p className="text-sm text-gray-500">{t.role}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
