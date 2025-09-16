import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8 max-w-2xl mx-auto">


      {/* About */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-700 leading-relaxed">
          This Railway Reservation System is a DBMS mini project designed to
          handle train bookings, cancellations, and schedule management. It
          demonstrates practical database concepts like relational schemas,
          SQL queries, and user role management while simulating a real-world
          railway reservation workflow.
        </p>
      </div>

      {/* Features */}
      <div className="bg-green-50 shadow rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">✨ Features</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Search trains by route and date</li>
          <li>View schedules and seat availability</li>
          <li>Book and cancel tickets</li>
          <li>Passenger & admin login</li>
        </ul>
      </div>

      {/* Technologies */}
      <div className="bg-yellow-50 shadow rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">🛠️ Tech Stack</h2>
        <p className="text-gray-700">
          React + Tailwind CSS (frontend), Node.js / Express (backend),
          MySQL / PostgreSQL (database), Git & GitHub (version control).
        </p>
      </div>

      {/* Team */}
      <div className="bg-purple-50 shadow rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">👥 Team</h2>
        <p className="text-gray-700">
          Athul · Jil · Bhavana · Gopika · Sandra
        </p>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        © Railway Reservation System – DBMS Mini Project
      </p>
    </div>
  );
}
