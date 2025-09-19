import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearch } from "@tanstack/react-router";

export default function PaymentPage() {
  const { trainId } = useParams({ from: "/(user)/trains/$trainId/book/payment" });
  const search = useSearch({ from: "/(user)/trains/$trainId/book/payment" });
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(10); // 10 minutes
  const [method, setMethod] = useState(null);
  const [message, setMessage] = useState("");

  const passengers = search.passengers ? JSON.parse(search.passengers) : [];
  const bookingId = search.bookingId;

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      navigate({
        to: "/trains/$trainId/book/passengers",
        params: { trainId },
        search: {
          coachType: search.coachType,
          passengers: search.passengers,
        },
      });
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, trainId, navigate, search]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handlePayment = () => {
    if (!method) {
      setMessage("⚠️ Please select a payment method!");
      return;
    }
    setMessage("✅ Payment Successful!");
    setTimeout(() => {
      navigate({
        to: "/bookings/$bookingId/details",
        params: { bookingId },
      });
    }, 1500);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>
      <p className="text-sm text-gray-500 mb-2">
        Train ID: {trainId} | Booking ID: {bookingId}
      </p>
      <p className="text-error font-semibold mb-4">
        Payment Time Left: {formatTime(timeLeft)}
      </p>

      <h3 className="text-lg font-semibold mb-2">Passenger Details</h3>
      <ul className="list-disc pl-6 mb-4">
        {passengers.map((p, idx) => (
          <li key={idx}>
            {p.name} ({p.age}, {p.gender})
          </li>
        ))}
      </ul>

      <div className="form-control mb-6">
        <label className="label font-semibold">Select Payment Method</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="method"
              value="GPay"
              checked={method === "GPay"}
              onChange={() => setMethod("GPay")}
              className="radio radio-primary"
            />
            GPay
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="method"
              value="Paytm"
              checked={method === "Paytm"}
              onChange={() => setMethod("Paytm")}
              className="radio radio-primary"
            />
            Paytm
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn btn-primary" onClick={handlePayment}>
          Payment Done
        </button>
      </div>

      {message && <p className="mt-4 text-center font-semibold">{message}</p>}
    </div>
  );
}
