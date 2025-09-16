import { useParams, Link } from "@tanstack/react-router";

export default function TrainDetail() {
  const { trainId } = useParams({ from: "/(user)/trains/$trainId" });

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
      source: "Station M",
      destination: "Station N",
      departureTime: "14:00",
      arrivalTime: "18:30",
      duration: "4h 30m",
      classes: ["AC", "General"],
    },
  ];

  const train = mockTrains.find((t) => t.code === trainId);

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

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <span className="font-semibold">Source:</span> {train.source}
              </p>
              <p>
                <span className="font-semibold">Departure:</span>{" "}
                {train.departureTime}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {train.duration}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Destination:</span>{" "}
                {train.destination}
              </p>
              <p>
                <span className="font-semibold">Arrival:</span>{" "}
                {train.arrivalTime}
              </p>
              <p>
                <span className="font-semibold">Classes:</span>{" "}
                {train.classes?.join(", ")}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="card-actions justify-end mt-6">
            <Link to="/trains" className="btn btn-outline">
              Back to Train List
            </Link>
            <Link to={`/trains/${train.code}/schedule`} className="btn btn-info">
              View Schedule
            </Link>
            <Link to={`/trains/${train.code}/book`} className="btn btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
