// src/features/trains/components/TrainSearchBySource.jsx
import { useSearch, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getTrainsByRoute } from "../services/trainService";

export default function TrainSearchBySource() {
  const search = useSearch({ from: "/(user)/trains/search" });
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTrainsByRoute(search.source, search.destination).then((data) => {
      setTrains(data);
      setLoading(false);
    });
  }, [search.source, search.destination]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Trains from {search.source} to {search.destination}
        </h2>
        <Link to="/trains" className="btn btn-outline btn-sm">
          ← Back
        </Link>
      </div>

      {loading ? (
        <p>Loading trains...</p>
      ) : trains.length === 0 ? (
        <p className="text-error">No trains found for this route.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Train No</th>
                <th>Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Duration</th>
                <th>Classes</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trains.map((train) => (
                <tr key={train.code}>
                  <td>{train.code}</td>
                  <td>{train.name}</td>
                  <td>{train.source}</td>
                  <td>{train.destination}</td>
                  <td>{train.departureTime}</td>
                  <td>{train.arrivalTime}</td>
                  <td>{train.duration}</td>
                  <td>{train.classes.join(", ")}</td>
                  <td className="flex gap-2 justify-center">
                    <Link
                      to={`/trains/${train.code}/details`}
                      className="btn btn-sm btn-outline"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/trains/${train.code}/book/new`}
                      className="btn btn-sm btn-primary"
                    >
                      Book Now
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
