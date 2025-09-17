import { useParams, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getTrainById, bookTrain } from "../services/trainBookService";

export default function TrainBookNew() {
  const { trainId } = useParams({ from: "/(user)/trains/$trainId/book/new" });
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [booking, setBooking] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTrainById(trainId).then((data) => {
      setTrain(data);
      setLoading(false);
    });
  }, [trainId]);

  const handleBooking = async () => {
    if (!selectedCoach) return;
    setProcessing(true);
    const result = await bookTrain({
      trainId: train.code,
      coachType: selectedCoach.type,
      passengerName: "Demo Passenger", // later replace with form input
    });
    setBooking(result);
    setProcessing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading booking page...</p>
      </div>
    );
  }

  if (!train) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-error text-lg font-semibold">Train not found!</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-6">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Header */}
          <h2 className="card-title text-3xl font-bold mb-4">{train.name}</h2>
          <p className="text-sm text-gray-500 mb-6">Train No: {train.code}</p>

          {/* Train Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-semibold">Source:</span> {train.source}</p>
              <p><span className="font-semibold">Departure:</span> {train.departureTime}</p>
              <p><span className="font-semibold">Duration:</span> {train.duration}</p>
            </div>
            <div>
              <p><span className="font-semibold">Destination:</span> {train.destination}</p>
              <p><span className="font-semibold">Arrival:</span> {train.arrivalTime}</p>
            </div>
          </div>

          {/* Coach Selection */}
          {!booking && (
            <>
              <div className="mt-6">
                <label className="font-semibold block mb-2">Select Coach Type:</label>
                <select
                  className="select select-bordered w-full"
                  value={selectedCoach?.type || ""}
                  onChange={(e) => {
                    const coach = train.classes.find((c) => c.type === e.target.value);
                    setSelectedCoach(coach);
                  }}
                >
                  <option value="">-- Select Coach --</option>
                  {train.classes.map((cls) => (
                    <option key={cls.type} value={cls.type}>
                      {cls.type} (₹{cls.fare})
                    </option>
                  ))}
                </select>
              </div>

              {/* Fare Display */}
              {selectedCoach && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-lg">
                    <span className="font-semibold">Selected Coach:</span> {selectedCoach.type}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Fare:</span> ₹{selectedCoach.fare}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="card-actions justify-end mt-6">
                <Link to="/trains" className="btn btn-outline">Back</Link>
                <button
                  disabled={!selectedCoach || processing}
                  className="btn btn-primary"
                  onClick={handleBooking}
                >
                  {processing ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </>
          )}

          {/* Booking Confirmation */}
          {booking && (
            <div className="mt-6 p-4 bg-green-100 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Booking Confirmed ✅</h3>
              <p><span className="font-semibold">PNR:</span> {booking.pnr}</p>
              <p><span className="font-semibold">Passenger:</span> {booking.passenger}</p>
              <p><span className="font-semibold">Coach:</span> {booking.coachType}</p>
              <p><span className="font-semibold">Fare:</span> ₹{booking.fare}</p>
              <p><span className="font-semibold">Status:</span> {booking.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
