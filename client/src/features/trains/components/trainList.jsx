import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export default function TrainListPage() {
  const search = useSearch({ from: "/trains/search" }); // ✅ read query params
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrains() {
      try {
        const res = await fetch(
          `/api/trains/search?source=${search.source}&destination=${search.destination}`
        );
        const data = await res.json();
        setTrains(data);
      } catch (err) {
        console.error("Error fetching trains", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrains();
  }, [search.source, search.destination]);

  if (loading) return <p>Loading...</p>;
  if (trains.length === 0) return <p>No trains found</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Trains from {search.source} → {search.destination}
      </h2>

      <div className="space-y-4">
        {trains.map((train) => (
          <div key={train.id} className="card bg-base-100 shadow-md p-4">
            <h3 className="text-lg font-semibold">{train.name}</h3>
            <p>Train No: {train.code}</p>
            <p>Departure: {train.departureTime}</p>
            <p>Arrival: {train.arrivalTime}</p>
            <Link
              to={`/trains/${train.code}`}
              className="btn btn-primary btn-sm mt-2"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
