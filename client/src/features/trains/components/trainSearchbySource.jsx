// src/features/trains/components/TrainSearchBySource.jsx
import { useSearch, Link } from "@tanstack/react-router";

export default function TrainSearchBySource() {
  const search = useSearch({ from: "/(user)/trains/search" });

  const mockTrains = [
    {
      code: "12345",
      name: "Express A",
      source: "Station X",
      destination: "Station Y",
      departureTime: "08:00",
      arrivalTime: "12:00",
      duration: "4h",
      classes: ["Sleeper", "AC", "General"],
    },
    {
      code: "67890",
      name: "Express B",
      source: "Station X",
      destination: "Station Y",
      departureTime: "14:00",
      arrivalTime: "18:30",
      duration: "4h 30m",
      classes: ["AC", "General"],
    },
  ];

  const filteredTrains = mockTrains.filter(
    (t) =>
      t.source.toLowerCase() === search.source?.toLowerCase() &&
      t.destination.toLowerCase() === search.destination?.toLowerCase()
  );

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

      {filteredTrains.length === 0 ? (
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
              {filteredTrains.map((train) => (
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
                      to={`/trains/${train.code}`}
                      className="btn btn-sm btn-outline"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/trains/${train.code}/book`}
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
