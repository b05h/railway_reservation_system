import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useGetBookingsByUserId } from "../services/bookingService";

export default function BookingList({ userId }) {
  // 🔹 Use the custom hook
  const { resolve: loadBookings, data: bookings = [], isLoading, isError } =
    useGetBookingsByUserId(userId);

  // 🔹 Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Load bookings when component mounts or userId changes
  useState(() => {
    loadBookings();
  }, [userId]);

  // 🔹 Filtering logic
  const filteredBookings = bookings.filter((b) => {
    let matches = true;

    if (statusFilter !== "all" && b.status.toLowerCase() !== statusFilter.toLowerCase()) {
      matches = false;
    }

    if (dateFilter && b.departureDate !== dateFilter) {
      matches = false;
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const combined = `${b.pnr} ${b.source} ${b.destination}`.toLowerCase();
      if (!combined.includes(term)) {
        matches = false;
      }
    }

    return matches;
  });

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2">Fetching your bookings...</p>
      </div>
    );
  }

  if (isError && bookings.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 font-semibold">
          Failed to fetch bookings. Showing fallback/demo data.
        </p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-xl font-semibold">No bookings found.</p>
        <p>Start by searching for a train and booking a ticket!</p>
      </div>
    );
  }

  return (
    <div>
      {/* 🔹 Filter + Search Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by PNR, Source, Destination..."
          className="input input-bordered w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="date"
          className="input input-bordered w-full md:w-1/4"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* 🔹 Bookings List */}
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      {filteredBookings.length === 0 ? (
        <p className="text-gray-500">No bookings match your filters.</p>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.bookingId} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl">
                  {booking.train.name} ({booking.train.code})
                </h3>
                <p className="text-sm text-gray-500">PNR: {booking.pnr}</p>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <span className="font-semibold">From:</span> {booking.source}
                  </p>
                  <p>
                    <span className="font-semibold">To:</span> {booking.destination}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span> {booking.departureDate}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`badge ${
                        booking.status.toLowerCase() === "confirmed"
                          ? "badge-success"
                          : booking.status.toLowerCase() === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to="/bookings/$bookingId/details"
                    params={{ bookingId: booking.bookingId }}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
