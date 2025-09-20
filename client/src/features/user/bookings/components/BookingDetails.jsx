import { useParams, Link } from "@tanstack/react-router";
import { useBookingDetails } from "../hooks/useBookingDetails";

export default function BookingDetails() {
  const { bookingId } = useParams({ from: "/(user)/bookings/$bookingId/details" });
  const { booking, loading } = useBookingDetails(bookingId);

  if (loading) {
    return <p className="text-center p-8">Loading booking details...</p>;
  }

  if (!booking) {
    return <p className="text-center text-error p-8">Booking not found!</p>;
  }

  return (
    <div className="flex justify-center p-6">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold mb-4">Booking Details</h2>
          <div className="divider"></div>

          {/* PNR */}
          <p className="text-sm font-semibold mb-2">
            PNR: <span className="text-xl font-bold">{booking.pnr}</span>
          </p>

          {/* Train Info */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p>
                <span className="font-semibold">Train:</span> {booking.train.name} ({booking.train.code})
              </p>
              <p><span className="font-semibold">From:</span> {booking.source}</p>
              <p><span className="font-semibold">Departure Date:</span> {booking.departureDate}</p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="badge badge-success">{booking.status}</span>
              </p>
              <p><span className="font-semibold">To:</span> {booking.destination}</p>
              <p><span className="font-semibold">Total Amount:</span> ₹{booking.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="divider"></div>

          {/* Passengers */}
          <h3 className="text-lg font-bold">Passengers</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Seat</th>
                </tr>
              </thead>
              <tbody>
                {booking.passengers.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.seat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back Button */}
          <div className="card-actions justify-end mt-6">
            <Link to="/bookings" className="btn btn-outline">
              Back to All Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
