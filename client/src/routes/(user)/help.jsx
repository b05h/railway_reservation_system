import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/help")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-center mb-6">
        ❓ Help & Support
      </h1>

      <p className="text-gray-700 text-center mb-8">
        Need assistance with our Railway Reservation System?  
        Check out the FAQs below or reach out via the Contact page.
      </p>

      {/* FAQ Section */}
      <div className="space-y-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">🔍 How can I search for trains?</h2>
          <p className="text-gray-700">
            Go to the <strong>Search Trains</strong> page, enter your source,
            destination, and travel date, then click on <em>Search</em>. The
            system will display available trains.
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">🎫 How do I book a ticket?</h2>
          <p className="text-gray-700">
            Once you find a suitable train, click on <strong>Book</strong>,
            select your preferred class/seat, and confirm your reservation.
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">❌ Can I cancel my booking?</h2>
          <p className="text-gray-700">
            Yes. Go to the <strong>My Bookings</strong> section, select the
            ticket you want to cancel, and click <em>Cancel</em>. Refunds will
            follow the project’s cancellation policy.
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">👤 Do I need an account?</h2>
          <p className="text-gray-700">
            Yes. Passengers must create an account to book and manage tickets,
            while administrators can log in with special privileges to manage
            train schedules and reservations.
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">⚙️ What technologies are used?</h2>
          <p className="text-gray-700">
            The system is built using <strong>React + Tailwind CSS</strong> for
            frontend, <strong>Node.js / Express</strong> for backend, and
            <strong>MySQL / PostgreSQL</strong> for database.
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-8">
        © Railway Reservation System – DBMS Mini Project
      </p>
    </div>
  );
}
