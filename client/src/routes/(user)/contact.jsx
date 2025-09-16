import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-center mb-6">
        📞 Contact Us
      </h1>

      {/* Info Section */}
      <p className="text-gray-700 text-center mb-6">
        Have questions or feedback about our Railway Reservation System?  
        Feel free to reach out to us!
      </p>

      {/* Contact Form */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              rows="4"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Type your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Team Contact Info */}
      <div className="bg-blue-50 shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">👥 Project Team</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Athul – athul@example.com</li>
          <li>Jil – jil@example.com</li>
          <li>Bhavana – bhavana@example.com</li>
          <li>Gopika – gopika@example.com</li>
          <li>Sandra – sandra@example.com</li>
        </ul>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        © Railway Reservation System – DBMS Mini Project
      </p>
    </div>
  );
}
