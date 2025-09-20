import { useState, useEffect } from "react";
import { useParams, useSearch, useNavigate } from "@tanstack/react-router";
import { getSavedPassengers } from "../services/passengersService";

export default function PassengersPage() {
  const { trainId } = useParams({ from: "/(user)/trains/$trainId/book/passengers" });
  const search = useSearch({ from: "/(user)/trains/$trainId/book/passengers" });
  const navigate = useNavigate();

  const savedPassengers = getSavedPassengers();

  // Restore from search params OR start fresh
  const [passengers, setPassengers] = useState(
    search.passengers ? JSON.parse(search.passengers) : [{ name: "", age: "", gender: "Male" }]
  );

  // Sync passengers into search params
  useEffect(() => {
    navigate({
      search: (prev) => ({
        ...prev,
        passengers: JSON.stringify(passengers),
      }),
      replace: true,
    });
  }, [passengers, navigate]);

  // Actions
  const addPassenger = () => setPassengers([...passengers, { name: "", age: "", gender: "Male" }]);
  const removePassenger = (index) =>
    setPassengers(passengers.filter((_, i) => i !== index));
  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };
  const autofillPassenger = (index, passengerId) => {
    const selected = savedPassengers.find((p) => p.id === parseInt(passengerId));
    if (selected) {
      updatePassenger(index, "name", selected.name);
      updatePassenger(index, "age", selected.age);
      updatePassenger(index, "gender", selected.gender);
    }
  };
  // ✅ Passenger Form View
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Add Passenger Details</h2>
      <p className="text-sm text-gray-500 mb-6">
        Train ID: {trainId} | Coach: {search.coachType}
      </p>

      {passengers.map((p, index) => (
        <div key={index} className="mb-6 border p-4 rounded-lg bg-hunter-900 text-cream relative">
          {passengers.length > 1 && (
            <button
              type="button"
              className="absolute top-2 right-2 btn btn-xs btn-error"
              onClick={() => removePassenger(index)}
            >
              ✖
            </button>
          )}

          <div className="form-control mb-3">
            <label className="label font-semibold">Select Saved Passenger</label>
            <select
              className="select select-bordered w-full"
              onChange={(e) => autofillPassenger(index, e.target.value)}
              defaultValue=""
            >
              <option value="">-- Choose Saved Passenger --</option>
              {savedPassengers.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.name} ({sp.age}, {sp.gender})
                </option>
              ))}
            </select>
          </div>

          <div className="form-control mb-3">
            <label className="label font-semibold">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={p.name}
              onChange={(e) => updatePassenger(index, "name", e.target.value)}
            />
          </div>

          <div className="form-control mb-3">
            <label className="label font-semibold">Age</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={p.age}
              onChange={(e) => updatePassenger(index, "age", e.target.value)}
            />
          </div>

          <div className="form-control mb-3">
            <label className="label font-semibold">Gender</label>
            <select
              className="select select-bordered w-full"
              value={p.gender}
              onChange={(e) => updatePassenger(index, "gender", e.target.value)}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      ))}

      <button className="btn btn-secondary mb-4 w-full" onClick={addPassenger}>
        ➕ Add Another Passenger
      </button>

      <div className="flex justify-end gap-4">
        <button className="btn btn-outline"
            onClick={() => {
            navigate({
              to: "/trains/$trainId/book/new"
            });
        }}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate({
              to: "/trains/$trainId/book/payment",
              params: { trainId },
              search: {
                coachType: search.coachType,
                passengers: JSON.stringify(passengers),
                bookingId: "B1001",
              },
            });
          }}
        >
          Go to Payment
        </button>
      </div>
    </div>
  );
}
